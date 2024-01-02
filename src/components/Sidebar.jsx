import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <Navbar className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          feed
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/explore">
          explore
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  )
}
