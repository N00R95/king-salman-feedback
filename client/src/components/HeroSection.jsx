// src/components/HeroSection.jsx

import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const HeroSection = React.memo(({ backgroundImage, logoImage, heading, subheading, content }) => (
  <div
    className="d-flex align-items-center justify-content-center position-relative"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff'  // Ensuring text is white
    }}
  >
    {/* Overlay for better text contrast */}
    <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>

    {/* Content */}
    <div className="position-relative text-center z-1 p-4">
      <img src={logoImage} alt="MOH Logo" className="mb-4 mx-auto d-block" style={{ width: '150px' }} />
      <h1 className="display-4 fw-bold">{heading}</h1>
      <p className="mt-3 lead">{subheading}</p>
      <p className="mt-4">{content}</p>
    </div>
  </div>
));

HeroSection.propTypes = {
  backgroundImage: PropTypes.string,
  logoImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  content: PropTypes.string,
};

HeroSection.defaultProps = {
  backgroundImage: 'https://placehold.co/1920x1080', // Replace with an appropriate hospital image
  logoImage: 'https://placehold.co/150x150', // Replace with the hospital or MOH logo
  heading: 'King Salman Specialist Hospital Launched',
  subheading: 'Opening of a New Era in Healthcare in Hail',
  content: `The Emir of Hail, His Royal Highness Abdulaziz bin Saad bin Abdulaziz, alongside the Health Minister Dr. Tawfiq Al Rabiah, will launch the first phase of King Salman Specialist Hospital in Hail. This new facility is set to become a cornerstone of healthcare excellence, featuring 500 beds and a range of specialized clinics, including oncology, cardiology, and neurology.`,
};

export default HeroSection;
