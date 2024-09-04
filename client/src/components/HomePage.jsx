// src/pages/Home.jsx


import HeroSection from "../components/HeroSection";
import Statistics from "../components/Statistics";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalAlt, faRibbon, faBrain, faSyringe } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <section className="py-5" style={{ backgroundColor: '#0155A5', color: '#ffffff', padding: '3rem 0', margin: '0' }}>
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-4" style={{ fontSize: '2.5rem' }}>About King Salman Specialist Hospital</h2> {/* Bold and larger font size */}
          <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
            <FontAwesomeIcon icon={faHospitalAlt} style={{ marginRight: '10px', color: '#14A39A'}} />
            King Salman Specialist Hospital in Hail represents a significant leap in healthcare delivery, offering advanced medical services across 55 clinics in 48 specialties, including oncology, cardiology, neurology, and more. Our goal is to provide comprehensive care to all citizens, reduce referrals, and improve overall health outcomes.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-5"
        style={{ backgroundColor: "#DBE5FF", color: "#1C2F41", padding: '3rem 0', margin: '0' }} // Consistent padding and margin
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Heading Column */}
            <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
              <h2 className="display-4 fw-bold mb-4" style={{ fontSize: '2.5rem' }}>Our Specialized Services</h2> {/* Bold and larger font size */}
            </div>

            {/* Boxes Column */}
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div
                    className="p-4 rounded shadow-sm text-center position-relative"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#1C2F41",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Icon on the top left */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={faRibbon} style={{ fontSize: "1.5rem", color: "#14A39A" }} />
                    </div>
                    <h3 className="h5 mt-3 fw-bold">Oncology</h3> {/* Bold heading */}
                    <p>Advanced cancer treatment and care facilities.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div
                    className="p-4 rounded shadow-sm text-center position-relative"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#1C2F41",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Icon on the top left */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      <i className="bi bi-heart-pulse-fill" style={{ fontSize: "1.5rem", color: "#14A39A" }}></i>
                    </div>
                    <h3 className="h5 mt-3 fw-bold">Cardiology</h3> {/* Bold heading */}
                    <p>State-of-the-art cardiac care services and interventions.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div
                    className="p-4 rounded shadow-sm text-center position-relative"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#1C2F41",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Icon on the top left */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={faBrain} style={{ fontSize: "1.5rem", color: "#14A39A" }} />
                    </div>
                    <h3 className="h5 mt-3 fw-bold">Neurology</h3> {/* Bold heading */}
                    <p>Comprehensive neurological care and rehabilitation.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div
                    className="p-4 rounded shadow-sm text-center position-relative"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#1C2F41",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Icon on the top left */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={faSyringe} style={{ fontSize: "1.5rem", color: "#14A39A" }} />
                    </div>
                    <h3 className="h5 mt-3 fw-bold">General Surgery</h3> {/* Bold heading */}
                    <p>High-quality surgical procedures with modern facilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className="py-5"
        style={{ backgroundColor: "#EAF0FF", color: "#1C2F41", padding: '3rem 0', margin: '0' }} // Consistent padding and margin
      >
        <Statistics years={5} clinics={55} specialties={48} beds={500} />
      </section>

      {/* Call to Action Section */}
      <section
  className="py-5"
  style={{ backgroundColor: "#DBE5FF", color: "#1C2F41", padding: '3rem 0', margin: '0' }} // Updated background color and text color
>
  <div className="container text-center">
    <h2 className="display-4 mb-4 fw-bold" style={{ fontSize: '2.5rem' }}>
      Join Us in Advancing Healthcare
    </h2> {/* Bold and larger font size */}
    <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
      Contact us today to learn more about how King Salman Specialist Hospital is transforming healthcare in Hail and beyond.
    </p>
    <a
      href="/contact-us"
      className="btn btn-lg"
      style={{
        backgroundColor: "#14A39A", // Updated button color
        color: "#ffffff",
        borderColor: "#14A39A", // Updated button border color
      }}
    >
      Contact Us
    </a>
  </div>
</section>

    </div>
  );
};

export default Home;
