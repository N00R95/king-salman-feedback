// src/components/HeroSection.jsx

import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const HeroSection = React.memo(({ backgroundImage, heading, subheading, content }) => (
  <div
    className="d-flex align-items-center justify-content-center position-relative"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      height: '80vh', // Adjusted to not exceed nav alignment
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#1C2F41',
      width: '100%', // Ensure it aligns with the navbar
      overflow: 'hidden', // Prevent content overflow
    }}
  >
    {/* Overlay for better text contrast */}
    <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(234, 240, 255, 0.85)' }}></div> {/* Adjusted overlay transparency */}

    {/* Content */}
    <div className="position-relative text-center z-1 p-4" style={{ maxWidth: '800px' }}> {/* Centered and limited width */}
      <h1 className="display-4 fw-bold">
        <span style={{ color: '#14A39A' }}>King Salman</span> {/* Coloring "King Salman" */}
        {` ${heading}`}
      </h1>
      <p className="mt-3 lead">{subheading}</p>
      <p className="mt-4">{content}</p>
      
      {/* "Take Feedback" Button */}
      <a 
        href="/feedback" 
        className="btn btn-lg mt-3" 
        style={{ backgroundColor: '#14A39A', color: '#ffffff', borderColor: '#14A39A' }}
      >
        Take Feedback
      </a>
    </div>
  </div>
));

HeroSection.propTypes = {
  backgroundImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  content: PropTypes.string,
};

HeroSection.defaultProps = {
  backgroundImage: 'https://www.alyaum.com/uploads/images/2020/04/10/801853.jpg', // Replace with an appropriate hospital image
  heading: ' Specialist Hospital ',
  subheading: 'Opening of a New Era in Healthcare in Hail',
  content: `where innovation meets excellence. With a 500-bed capacity and over 55 specialized clinics, we are committed to providing world-class healthcare services to the community, ensuring quality, accessibility, and comprehensive care for all.`,
};

export default HeroSection;
