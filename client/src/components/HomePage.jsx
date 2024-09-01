// src/pages/Home.jsx

import HeroSection from '../components/HeroSection';
import Statistics from '../components/Statistics';

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <section className="py-5" style={{ backgroundColor: '#142850', color: '#ffffff' }}>
        <div className="container text-center">
          <h2 className="display-4 mb-4">About King Salman Specialist Hospital</h2>
          <p className="lead mb-4">
            King Salman Specialist Hospital in Hail represents a significant leap in healthcare delivery, offering advanced medical services across 55 clinics in 48 specialties, including oncology, cardiology, neurology, and more. Our goal is to provide comprehensive care to all citizens, reduce referrals, and improve overall health outcomes.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5" style={{ backgroundColor: '', color: '#1e3a8a' }}>
        <div className="container text-center">
          <h2 className="display-4 mb-4">Our Specialized Services</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#142850', color: '#ffffff' }}>
                <h3 className="h5">Oncology</h3>
                <p>Advanced cancer treatment and care facilities.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#142850', color: '#ffffff' }}>
                <h3 className="h5">Cardiology</h3>
                <p>State-of-the-art cardiac care services and interventions.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#142850', color: '#ffffff' }}>
                <h3 className="h5">Neurology</h3>
                <p>Comprehensive neurological care and rehabilitation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{ backgroundColor: '', color: '#ffffff' }}>
        <Statistics years={5} clinics={55} specialties={48} beds={500} />
      </section>

      {/* Call to Action Section */}
      <section className="py-5" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>
        <div className="container text-center">
          <h2 className="display-4 mb-4">Join Us in Advancing Healthcare</h2>
          <p className="lead mb-4">Contact us today to learn more about how King Salman Specialist Hospital is transforming healthcare in Hail and beyond.</p>
          <a href="/contact-us" className="btn btn-lg" style={{ backgroundColor: '#4ade80', color: '#ffffff', borderColor: '#4ade80' }}>Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
