// src/components/ContactUs.jsx


import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ContactUs() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h2>Contact Us</h2>
          <p>If you have any questions or need further information, please feel free to contact us.</p>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
