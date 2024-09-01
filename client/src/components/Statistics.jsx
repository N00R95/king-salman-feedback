// src/components/Statistics.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Statistics = ({ years, clinics, specialties, beds }) => {
  const [displayYears, setDisplayYears] = useState(0);
  const [displayClinics, setDisplayClinics] = useState(0);
  const [displaySpecialties, setDisplaySpecialties] = useState(0);
  const [displayBeds, setDisplayBeds] = useState(0);

  useEffect(() => {
    const incrementNumbers = (finalValue, setFunction) => {
      let currentValue = 0;
      const increment = finalValue / 200; // Slow down the increment
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(interval);
        }
        setFunction(Math.round(currentValue));
      }, 30); // Slower effect
    };

    incrementNumbers(years, setDisplayYears);
    incrementNumbers(clinics, setDisplayClinics);
    incrementNumbers(specialties, setDisplaySpecialties);
    incrementNumbers(beds, setDisplayBeds);
  }, [years, clinics, specialties, beds]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 bold" style={{ color: '#1e3a8a' }}>Hospital Statistics</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
            <h3 className="h5 mb-3">Years in Operation</h3>
            <p className="display-4" style={{ color: '#4ade80' }}>{displayYears}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
            <h3 className="h5 mb-3">Clinics</h3>
            <p className="display-4" style={{ color: '#4ade80' }}>{displayClinics}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
            <h3 className="h5 mb-3">Specialties</h3>
            <p className="display-4" style={{ color: '#4ade80' }}>{displaySpecialties}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
            <h3 className="h5 mb-3">Bed Capacity</h3>
            <p className="display-4" style={{ color: '#4ade80' }}>{displayBeds}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  years: PropTypes.number.isRequired,
  clinics: PropTypes.number.isRequired,
  specialties: PropTypes.number.isRequired,
  beds: PropTypes.number.isRequired,
};

export default Statistics;
