// src/App.jsx


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FeedbackForm from './components/FeedbackForm'; // Assuming you have this component already
import AdminDashboard from './components/AdminDashboard'; // Assuming you have this component already
import AboutUs from './components/AboutUs'; // Assuming you have this component already
import ContactUs from './components/ContactUs'; // Assuming you have this component already

function App() {
  return (
    <div id="root" className="d-flex flex-column min-vh-100">
      <Router>
        <NavigationBar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
