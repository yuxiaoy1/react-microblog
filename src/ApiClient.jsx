export default class ApiClient {
  constructor() {
    this.base_url = 'http://127.0.0.1:5000/api'
  }

  async request(options) {
    let response = await this._request(options)
    if (response.status === 401 && options.url !== '/tokens') {
      const refreshResponse = await this.put('/tokens', {
        access_token: localStorage.getItem('accessToken'),
      })
      if (refreshResponse.ok) {
        localStorage.setItem('accessToken', refreshResponse.body.access_token)
        response = await this._request(options)
      }
    }

    return response
  }

  async _request({ url, method, headers, body, query = {} }) {
    let _query = new URLSearchParams(query).toString()
    if (_query !== '') {
      _query = '?' + _query
    }

    let response
    try {
      response = await fetch(this.base_url + url + _query, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          ...headers,
        },
        credentials: url === '/tokens' ? 'include' : 'omit',
        body: body ? JSON.stringify(body) : null,
      })
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        async json() {
          return {
            code: 500,
            message: 'The server is unresponsive',
            description: error.toString(),
          }
        },
      }
    }

    const { ok, status } = response
    return { ok, status, body: status !== 204 ? await response.json() : null }
  }

  async get(url, query, options) {
    return this.request({ method: 'GET', url, query, ...options })
  }

  async post(url, body, options) {
    return this.request({ method: 'POST', url, body, ...options })
  }

  async put(url, body, options) {
    return this.request({ method: 'PUT', url, body, ...options })
  }

  async delete(url, options) {
    return this.request({ method: 'DELETE', url, ...options })
  }

  async login(username, password) {
    const response = await this.post('/tokens', null, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password),
      },
    })
    if (!response.ok) {
      return response.status === 401 ? 'fail' : 'error'
    }
    localStorage.setItem('accessToken', response.body.access_token)
    return 'ok'
  }

  async logout() {
    await this.delete('/tokens')
    localStorage.removeItem('accessToken')
  }

  isAuthenticated() {
    return localStorage.getItem('accessToken') !== null
  }
}
