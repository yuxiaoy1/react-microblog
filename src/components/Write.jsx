import { useState, useEffect, useRef } from 'react'
import { Stack, Image, Form } from 'react-bootstrap'
import InputField from '../components/InputField'
import { useApi } from '../contexts/ApiProvider'
import { useUser } from '../contexts/UserProvider'

export default function Write({ showPost }) {
  const [formErrors, setFormErrors] = useState({})
  const textField = useRef()
  const api = useApi()
  const { user } = useUser()

  useEffect(() => {
    textField.current.focus()
  }, [])

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const response = await api.post('/posts', {
      text: textField.current.value,
    })
    if (response.ok) {
      showPost(response.body)
      textField.current.value = ''
    }
  }

  return (
    <Stack direction="horizontal" gap={3} className="Write">
      <Image src={user.avatar_url + '&s=64'} roundedCircle />
      <Form onSubmit={onSubmit}>
        <InputField
          name="text"
          placeholder="What's on your mind?"
          error={formErrors.text}
          fieldRef={textField}
        />
      </Form>
    </Stack>
  )
}
