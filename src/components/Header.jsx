import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Spinner,
  Image,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useUser } from '../contexts/UserProvider'

export default function Header() {
  const { user, logout } = useUser()

  return (
    <Navbar bg="light" sticky="top" className="Header">
      <Container>
        <Navbar.Brand>Microblog</Navbar.Brand>
        <Nav>
          <div className="justify-content-end">
            {user === undefined ? (
              <Spinner animation="border" />
            ) : (
              <>
                {user !== null && (
                  <NavDropdown
                    title={
                      <Image src={user.avatar_url + '&s=32'} roundedCircle />
                    }
                    align="end"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/user/' + user.username}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  )
}
