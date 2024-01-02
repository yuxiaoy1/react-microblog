import { Image, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TimeAgo from './TimeAgo'

export default function Post({ post }) {
  return (
    <Stack direction='horizontal' gap={3} className='Post'>
      <Image src={post.author.avatar_url + '&s=48'} />
      <div>
        <Link to={'/user/' + post.author.username}>{post.author.username}</Link>{' '}
        &mdash; <TimeAgo isoDate={post.timestamp} />
        <br />
        {post.text}
      </div>
    </Stack>
  )
}
