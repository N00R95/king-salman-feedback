// src/components/NavigationBar.jsx


import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar mb-4">
    <Container>
      <Navbar.Brand as={Link} to="/">
        King Salman Hospital
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
          <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
          <Nav.Link as={Link} to="/admin">AdminDashboard</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
