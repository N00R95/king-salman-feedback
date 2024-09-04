// src/components/Footer.jsx

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Import the logo

const Footer = ({ links, contactInfo, copyright }) => (
  <footer className="footer mt-auto pt-4 pb-3" style={{ backgroundColor: '#0155A5', color: '#FFFFFF' }}>
    <Container>
      <Row className="align-items-center text-center text-md-start mb-4">
        {/* Logo and Hospital Name */}
        <Col md={4} className="d-flex flex-column align-items-center align-items-md-start mb-3 mb-md-0">
          <img
            src={logo}
            alt="King Salman Hospital Logo"
            style={{ width: '60px', height: '60px', marginBottom: '10px' }}
          />
          <h6 className="text-uppercase fw-bold mb-0" style={{ fontSize: '1rem' }}>King Salman Hospital</h6>
        </Col>

        {/* Quick Links */}
        <Col md={4} className="mb-3 mb-md-0">
          <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '1rem' }}>Quick Links</h6>
          <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-white text-decoration-none" aria-label={link.name}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        {/* Contact Information */}
        <Col md={4}>
          <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '1rem' }}>Contact Us</h6>
          <address style={{ fontSize: '0.9rem' }}>
            <strong>{contactInfo.name}</strong>
            <br />
            {contactInfo.address}
            <br />
            Hours: Open 24 hours
            <br />
            Phone: <a href={`tel:${contactInfo.phone}`} className="text-white text-decoration-none">{contactInfo.phone}</a>
            <br />
            Email: <a href={`mailto:${contactInfo.email}`} className="text-white text-decoration-none">{contactInfo.email}</a>
          </address>
        </Col>
      </Row>

      {/* Copyright */}
      <Row>
        <Col className="text-center">
          <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} {copyright}. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  contactInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  copyright: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  links: [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'AdminDashboard', path: '/admin' },
  ],
  contactInfo: {
    name: 'King Salman Hospital',
    address: 'masyaf district، ala ud din al hanfi rd, Hail 55471',
    email: 'info@kingsalmanhospital.com',
    phone: '016 236 2222',
  },
  copyright: 'King Salman Hospital',
};

export default Footer;
