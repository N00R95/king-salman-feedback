// src/components/AdminDashboard.jsx

import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components for charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageScores, setAverageScores] = useState({
    Cleanliness: 0,
    'Staff Helpfulness': 0,
    'Room Environment': 0,
    'Outpatient Process': 0,
    'Waiting Time': 0,
  });
  const [keyMetrics, setKeyMetrics] = useState({
    totalFeedbacks: 0,
    overallAverage: 0,
    areasForImprovement: [],
  });

  const calculateAverageScores = useCallback((feedbackData) => {
    const scoreSums = {
      Cleanliness: 0,
      'Staff Helpfulness': 0,
      'Room Environment': 0,
      'Outpatient Process': 0,
      'Waiting Time': 0,
    };
    const scoreCounts = {
      Cleanliness: 0,
      'Staff Helpfulness': 0,
      'Room Environment': 0,
      'Outpatient Process': 0,
      'Waiting Time': 0,
    };

    feedbackData.forEach((feedback) => {
      if (feedback[1] !== undefined && typeof feedback[1] === 'number') {
        scoreSums['Cleanliness'] += feedback[1];
        scoreCounts['Cleanliness']++;
      }
      if (feedback[2] !== undefined && typeof feedback[2] === 'number') {
        scoreSums['Staff Helpfulness'] += feedback[2];
        scoreCounts['Staff Helpfulness']++;
      }
      if (feedback.patientType === 'Inpatient') {
        if (feedback[3] !== undefined && typeof feedback[3] === 'string') {
          const roomEnvironmentRating = {
            Excellent: 5,
            Good: 4,
            Fair: 3,
            Poor: 2,
          }[feedback[3]] || 0;
          scoreSums['Room Environment'] += roomEnvironmentRating;
          scoreCounts['Room Environment']++;
        }
        if (feedback[4] && feedback[4] !== 'None') {
          scoreCounts['Room Environment']++;
        }
      }
      if (feedback.patientType === 'Outpatient') {
        if (feedback[5] !== undefined && typeof feedback[5] === 'string') {
          const outpatientProcessRating = feedback[5] === 'Yes' ? 5 : 1;
          scoreSums['Outpatient Process'] += outpatientProcessRating;
          scoreCounts['Outpatient Process']++;
        }
        if (feedback[6] !== undefined && typeof feedback[6] === 'string') {
          const waitingTimeRating = {
            'Less than 30 minutes': 5,
            '30-60 minutes': 3,
            'More than 1 hour': 1,
          }[feedback[6]] || 0;
          scoreSums['Waiting Time'] += waitingTimeRating;
          scoreCounts['Waiting Time']++;
        }
      }
    });

    const averages = {
      Cleanliness: scoreCounts['Cleanliness'] ? (scoreSums['Cleanliness'] / scoreCounts['Cleanliness']).toFixed(1) : 0,
      'Staff Helpfulness': scoreCounts['Staff Helpfulness'] ? (scoreSums['Staff Helpfulness'] / scoreCounts['Staff Helpfulness']).toFixed(1) : 0,
      'Room Environment': scoreCounts['Room Environment'] ? (scoreSums['Room Environment'] / scoreCounts['Room Environment']).toFixed(1) : 0,
      'Outpatient Process': scoreCounts['Outpatient Process'] ? (scoreSums['Outpatient Process'] / scoreCounts['Outpatient Process']).toFixed(1) : 0,
      'Waiting Time': scoreCounts['Waiting Time'] ? (scoreSums['Waiting Time'] / scoreCounts['Waiting Time']).toFixed(1) : 0,
    };

    setAverageScores(averages);
    console.log('Calculated Average Scores:', averages); // Debug: Check average scores
  }, []);

  const calculateKeyMetrics = useCallback(() => {
    const totalFeedbacks = feedbackData.length;
    const totalScoreSum = Object.values(averageScores).reduce((acc, score) => acc + parseFloat(score), 0);
    const overallAverage = (totalScoreSum / Object.keys(averageScores).length).toFixed(1);

    const areasForImprovement = Object.keys(averageScores).filter(key => averageScores[key] < 4);

    setKeyMetrics({
      totalFeedbacks,
      overallAverage,
      areasForImprovement,
    });
  }, [feedbackData, averageScores]);

  useEffect(() => {
    // Fetch feedback data from local storage
    const storedFeedback = localStorage.getItem('feedbackData');

    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback);
      console.log('Parsed Feedback Data:', parsedFeedback); // Debug: Check parsed data

      setFeedbackData(parsedFeedback);
    } else {
      console.log('No feedback data found in local storage.');
    }
  }, []);

  useEffect(() => {
    if (feedbackData.length > 0) {
      calculateAverageScores(feedbackData);
    }
  }, [feedbackData, calculateAverageScores]);

  useEffect(() => {
    calculateKeyMetrics();
  }, [averageScores, calculateKeyMetrics]);

  const dataBar = {
    labels: Object.keys(averageScores),
    datasets: [
      {
        label: 'Average Feedback Scores',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(averageScores),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Average Feedback Scores',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
        suggestedMax: 5,
      },
    },
  };

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>

      {/* Key Metrics Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Total Feedback Submissions</h5>
            <p className="display-6">{keyMetrics.totalFeedbacks}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Overall Average Score</h5>
            <p className="display-6">{keyMetrics.overallAverage}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Areas for Improvement</h5>
            <ul>
              {keyMetrics.areasForImprovement.length > 0 ? (
                keyMetrics.areasForImprovement.map((area, index) => <li key={index}>{area}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Average Scores */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3 shadow-sm">
            <Bar data={dataBar} options={options} />
          </Card>
        </Col>
      </Row>

      {/* Feedback Data Table */}
      <Row>
        <Col>
          <Card className="p-3 shadow-sm">
            <h5>Detailed Feedback Entries</h5>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Type</th>
                  <th>Cleanliness</th>
                  <th>Staff Helpfulness</th>
                  <th>Room Environment (Inpatients)</th>
                  <th>Outpatient Process (Outpatients)</th>
                  <th>Issues with Food/Medication (Inpatients)</th>
                  <th>Waiting Time (Outpatients)</th>
                  <th>Additional Comments</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{feedback.patientType}</td>
                    <td>{feedback[1]}</td>
                    <td>{feedback[2]}</td>
                    <td>{feedback.patientType === 'Inpatient' ? feedback[3] : 'N/A'}</td>
                    <td>{feedback.patientType === 'Outpatient' ? feedback[5] : 'N/A'}</td>
                    <td>{feedback.patientType === 'Inpatient' ? (feedback[4]?.Food ? 'Food' : '') + (feedback[4]?.Medication ? ' Medication' : '') || 'None' : 'N/A'}</td>
                    <td>{feedback.patientType === 'Outpatient' ? feedback[6] : 'N/A'}</td>
                    <td>{feedback[7] || 'No comments'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
