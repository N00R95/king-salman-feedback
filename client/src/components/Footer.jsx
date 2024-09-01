// src/components/Footer.jsx


import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ links, socialMediaLinks, contactInfo, copyright }) => (
  <footer className="footer mt-auto pt-2 pb-1" style={{ background: 'linear-gradient(to right, #142850, #3ba67a)' }}>
    <Container>
      <Row className="mb-2">
        <Col md={4}>
          <h6 className="text-uppercase" style={{ fontSize: '0.85rem' }}>Quick Links</h6>
          <ul className="list-unstyled" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-white text-decoration-none" aria-label={link.name}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        <Col md={4}>
          <h6 className="text-uppercase" style={{ fontSize: '0.85rem' }}>Contact Us</h6>
          <address style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            <strong>{contactInfo.name}</strong>
            <br />
            {contactInfo.address}
            <br />
            Email: <a href={`mailto:${contactInfo.email}`} className="text-white text-decoration-none">{contactInfo.email}</a>
            <br />
            Phone: <a href={`tel:${contactInfo.phone}`} className="text-white text-decoration-none">{contactInfo.phone}</a>
          </address>
        </Col>

        <Col md={4} className="text-center">
          <h6 className="text-uppercase" style={{ fontSize: '0.85rem' }}>Follow Us</h6>
          <div>
            {socialMediaLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
                aria-label={`Follow us on ${social.platform}`}
              >
                <FontAwesomeIcon icon={social.icon} size="lg" />
              </a>
            ))}
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <p className="text-muted small mb-0" style={{ fontSize: '0.7rem' }}>
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
  socialMediaLinks: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
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
    { name: 'About Us', path: '/about-us' },
    { name: 'Services', path: '/services' },
    { name: 'Departments', path: '/departments' },
    { name: 'Contact Us', path: '/contact-us' },
  ],
  socialMediaLinks: [
    { platform: 'Facebook', url: 'https://www.facebook.com', icon: faFacebook },
    { platform: 'Twitter', url: 'https://www.twitter.com', icon: faTwitter },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com', icon: faLinkedin },
    { platform: 'Instagram', url: 'https://www.instagram.com', icon: faInstagram },
  ],
  contactInfo: {
    name: 'King Salman Hospital',
    address: '1234 Street Name, City, State, Zip Code',
    email: 'info@kingsalmanhospital.com',
    phone: '(123) 456-7890',
  },
  copyright: 'King Salman Hospital',
};

export default Footer;
