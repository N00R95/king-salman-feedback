import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function ContactUs() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to handle form submission status
  const [submitted, setSubmitted] = useState(false);

  // State to handle input validation
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // If no errors, proceed to submit
    setErrors({});

    // Create a form and append form data for submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/your-email@example.com'; // Replace with your email

    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit(); // Submit form via FormSubmit
    
    // Display thank you message and reset form
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  // Form validation function
  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <h2 className="display-4 fw-bold mb-4">Contact Us</h2>
          <p className="lead mb-4">
            If you have any questions or need further information, please feel free to contact us. Our team is here to assist you.
          </p>
          
          {/* Show a success message upon form submission */}
          {submitted && <p className="text-success mb-4">Thank you for your message! ❤️ We will get back to you soon.</p>}

          {/* Disable form after submission */}
          {!submitted && (
            <Form onSubmit={handleSubmit} className="text-start">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="Enter your message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  isInvalid={!!errors.message}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button 
                type="submit" 
                className="btn-lg" 
                style={{ backgroundColor: '#14A39A', color: '#ffffff', borderColor: '#14A39A' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
