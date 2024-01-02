import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useApi } from '../contexts/ApiProvider'
import More from './More'
import Post from './Post'
import Write from './Write'

function getUrl(content) {
  let url
  switch (content) {
    case 'feed':
    case undefined:
      url = '/feed'
      break
    case 'explore':
      url = '/posts'
      break
    default:
      url = `/users/${content}/posts`
      break
  }

  return url
}

export default function Posts({ content, write }) {
  const [posts, setPosts] = useState()
  const [pagination, setPagination] = useState()
  const api = useApi()
  const url = getUrl(content)
  useEffect(() => {
    ;(async () => {
      const response = await api.get(url)
      if (response.ok) {
        setPosts(response.body.data)
        setPagination(response.body.pagination)
      } else {
        setPosts(null)
      }
    })()
  }, [api])

  const loadNextPage = async () => {
    const response = await api.get(url, {
      after: posts[posts.length - 1].timestamp,
    })
    if (response.ok) {
      setPosts([...posts, ...response.body.data])
      setPagination(response.body.pagination)
    }
  }

  const showPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  return (
    <>
      {write && <Write showPost={showPost} />}
      {posts === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {posts === null ? (
            <p>Coundn't retrieve blog posts.</p>
          ) : (
            <>
              {posts.length === 0 ? (
                <p>There is no blog posts.</p>
              ) : (
                <>
                  {posts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                  <More pagination={pagination} loadNextPage={loadNextPage} />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
