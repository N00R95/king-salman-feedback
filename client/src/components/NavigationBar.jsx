// src/components/NavigationBar.jsx

import { useEffect, useState } from 'react'; // Import React hooks for adding shadow on scroll
import logo from '../assets/logo.png'; // Corrected import statement
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const [navbarShadow, setNavbarShadow] = useState(false);

  // Add shadow effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`navbar mb-0 ${navbarShadow ? 'shadow-sm' : ''}`} // Apply shadow class based on scroll
      style={{ backgroundColor: '#EAF0FF', transition: 'box-shadow 0.3s ease-in-out' }} // Smooth shadow transition
    >
      <Container className="px-0">
        {/* Logo with correct import */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={logo} // Correctly using the imported logo
            alt="Logo"
            style={{ width: '60px', height: '60px', marginRight: '15px' }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1C2F41' }}>King Salman Hospital</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ fontSize: '1.2rem', marginRight: '1rem' }}> {/* Adjusted margin to move links to the right */}
            <Nav.Link
              as={NavLink}
              exact="true"
              to="/"
              className="mx-3 nav-link"
              activeClassName="active"
            >
              Home
            </Nav.Link>
            {/* Uncomment if needed */}
            {/* <Nav.Link
              as={NavLink}
              to="/about-us"
              className="mx-3 nav-link"
              activeClassName="active"
            >
              About Us
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="/contact-us"
              className="mx-3 nav-link"
              activeClassName="active"
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/feedback"
              className="mx-3 nav-link"
              activeClassName="active"
            >
              Feedback
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/admin"
              className="mx-3 nav-link"
              activeClassName="active"
            >
              AdminDashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
