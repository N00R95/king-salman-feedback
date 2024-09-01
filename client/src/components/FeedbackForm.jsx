// src/components/FeedbackForm.jsx

import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Typography, Rating, FormControlLabel, RadioGroup, Radio, Checkbox, FormGroup } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function FeedbackForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedbackData, setFeedbackData] = useState({});
  const [patientType, setPatientType] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission status

  const commonQuestions = [
    { id: 1, text: 'How would you rate the cleanliness of the hospital?', type: 'rating', required: true },
    { id: 2, text: 'Were the staff members courteous and helpful?', type: 'rating', required: true },
  ];

  const inpatientQuestions = [
    { id: 3, text: 'How was your room environment?', type: 'radio', options: ['Excellent', 'Good', 'Fair', 'Poor'], required: true },
    { id: 4, text: 'Did you have any issues with food or medication?', type: 'checkbox', options: ['Food', 'Medication', 'None'] },
  ];

  const outpatientQuestions = [
    { id: 5, text: 'Was the outpatient process smooth?', type: 'radio', options: ['Yes', 'No'], required: true },
    { id: 6, text: 'How long was your waiting time?', type: 'radio', options: ['Less than 30 minutes', '30-60 minutes', 'More than 1 hour'], required: true },
  ];

  const additionalQuestions = [
    { id: 7, text: 'Please provide any additional comments:', type: 'text', required: false },
  ];

  const questions = patientType === 'Inpatient'
    ? [...commonQuestions, ...inpatientQuestions, ...additionalQuestions]
    : [...commonQuestions, ...outpatientQuestions, ...additionalQuestions];

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsLastQuestion(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsLastQuestion(false);
    }
  };

  const handleChange = (e) => {
    const { value, type, name, checked } = e.target;
    if (type === 'checkbox') {
      setFeedbackData((prevData) => ({
        ...prevData,
        [name]: { ...prevData[name], [value]: checked },
      }));
    } else {
      setFeedbackData({
        ...feedbackData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRatingChange = (event, newValue) => {
    const questionId = questions[currentQuestionIndex].id;
    setFeedbackData({
      ...feedbackData,
      [questionId]: newValue,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: '' }));
  };

  const handlePatientTypeChange = (event) => {
    setPatientType(event.target.value);
    setFeedbackData({});
    setCurrentQuestionIndex(0);
  };

  const validateCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = feedbackData[currentQuestion.id];

    if (currentQuestion.required && (!currentAnswer || (typeof currentAnswer === 'object' && Object.values(currentAnswer).every(v => !v)))) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [currentQuestion.id]: 'This field is required',
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateCurrentQuestion()) {
      const existingFeedback = JSON.parse(localStorage.getItem('feedbackData')) || [];
      existingFeedback.push(feedbackData);
      localStorage.setItem('feedbackData', JSON.stringify(existingFeedback));
      setIsSubmitted(true); // Set submission status to true
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {isSubmitted ? (
        <div className="text-center">
          <Typography variant="h4" gutterBottom>
            Thank you for your feedback! <span role="img" aria-label="thank you">🙏</span>
          </Typography>
          <Typography variant="h6">
            Your feedback matters! <span role="img" aria-label="heart">❤️</span>
          </Typography>
        </div>
      ) : (
        <>
          <Typography variant="h4" gutterBottom align="center" className="mb-4">
            <span role="img" aria-label="clipboard">📝</span> Patient Feedback Form
          </Typography>

          <Container className="shadow p-5 rounded bg-white" style={{ maxWidth: '600px' }}>
            {!patientType ? (
              <Form>
                <Form.Group as={Row} controlId="patientType" className="mb-3">
                  <Form.Label as="legend" column sm={12} className="text-center">
                    Select Patient Type
                  </Form.Label>
                  <Col sm={12} className="d-flex justify-content-center">
                    <Form.Check
                      type="radio"
                      label="Inpatient"
                      name="patientType"
                      id="inpatient"
                      value="Inpatient"
                      onChange={handlePatientTypeChange}
                      className="me-4"
                    />
                    <Form.Check
                      type="radio"
                      label="Outpatient"
                      name="patientType"
                      id="outpatient"
                      value="Outpatient"
                      onChange={handlePatientTypeChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">{questions[currentQuestionIndex].text}</Form.Label>

                  {questions[currentQuestionIndex].type === 'rating' && (
                    <Rating
                      name={questions[currentQuestionIndex].id.toString()}
                      value={feedbackData[questions[currentQuestionIndex].id] || 0}
                      onChange={handleRatingChange}
                      precision={1}
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      className="d-flex justify-content-center my-3"
                    />
                  )}

                  {questions[currentQuestionIndex].type === 'radio' && (
                    <RadioGroup
                      name={questions[currentQuestionIndex].id.toString()}
                      value={feedbackData[questions[currentQuestionIndex].id] || ''}
                      onChange={handleChange}
                    >
                      {questions[currentQuestionIndex].options.map((option, index) => (
                        <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                  )}

                  {questions[currentQuestionIndex].type === 'checkbox' && (
                    <FormGroup>
                      {questions[currentQuestionIndex].options.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          control={<Checkbox onChange={handleChange} name={questions[currentQuestionIndex].id.toString()} value={option} />}
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  )}

                  {questions[currentQuestionIndex].type === 'text' && (
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name={questions[currentQuestionIndex].id.toString()}
                      value={feedbackData[questions[currentQuestionIndex].id] || ''}
                      onChange={handleChange}
                      placeholder="Type your comments here..."
                      isInvalid={!!errors[questions[currentQuestionIndex].id]}
                    />
                  )}
                </Form.Group>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>
                  {isLastQuestion ? (
                    <Button variant="success" onClick={handleSubmit}>
                      Submit <span role="img" aria-label="checkmark">✅</span>
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Container>
        </>
      )}
    </div>
  );
}

export default FeedbackForm;
