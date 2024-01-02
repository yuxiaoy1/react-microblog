import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Body from '../components/Body'
import { Form, Button } from 'react-bootstrap'
import InputField from '../components/InputField'
import { useUser } from '../contexts/UserProvider'
import { useFlash } from '../contexts/FlashProvider'

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({})
  const usernameField = useRef()
  const passwordField = useRef()
  const { login } = useUser()
  const flash = useFlash()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const username = usernameField.current.value
    const password = passwordField.current.value

    const errors = {}
    if (!username) {
      errors.username = 'Username must not be empty.'
    }
    if (!password) {
      errors.password = 'Password must not be empty.'
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    const result = await login(username, password)
    if (result === 'fail') {
      flash('Invalid username or password', 'danger')
    } else if (result === 'ok') {
      const next = location.state?.next || '/'
      navigate(next)
    }
  }

  useEffect(() => {
    usernameField.current.focus()
  }, [usernameField])

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username"
          label="Username or email address"
          error={formErrors.username}
          fieldRef={usernameField}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <Button varian="primary" type="submit">
          Login
        </Button>
      </Form>
      <hr />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </Body>
  )
}
