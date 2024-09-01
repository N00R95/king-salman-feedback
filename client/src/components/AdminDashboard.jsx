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
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register required components for charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

function AdminDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageScores, setAverageScores] = useState({
    Cleanliness: 0,
    'Staff Helpfulness': 0,
    'Room Environment': 0,
    'Outpatient Process': 0,
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
    };
    const scoreCounts = {
      Cleanliness: 0,
      'Staff Helpfulness': 0,
      'Room Environment': 0,
      'Outpatient Process': 0,
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
      if (feedback[3] !== undefined && typeof feedback[3] === 'number') {
        scoreSums['Room Environment'] += feedback[3];
        scoreCounts['Room Environment']++;
      }
      if (feedback[5] !== undefined && typeof feedback[5] === 'number') {
        scoreSums['Outpatient Process'] += feedback[5];
        scoreCounts['Outpatient Process']++;
      }
    });

    // Calculate average scores safely
    const averages = {
      Cleanliness: scoreCounts['Cleanliness'] ? (scoreSums['Cleanliness'] / scoreCounts['Cleanliness']).toFixed(1) : 0,
      'Staff Helpfulness': scoreCounts['Staff Helpfulness'] ? (scoreSums['Staff Helpfulness'] / scoreCounts['Staff Helpfulness']).toFixed(1) : 0,
      'Room Environment': scoreCounts['Room Environment'] ? (scoreSums['Room Environment'] / scoreCounts['Room Environment']).toFixed(1) : 0,
      'Outpatient Process': scoreCounts['Outpatient Process'] ? (scoreSums['Outpatient Process'] / scoreCounts['Outpatient Process']).toFixed(1) : 0,
    };

    setAverageScores(averages);
    console.log('Calculated Average Scores:', averages); // Debug: Check average scores
  }, []);

  const calculateKeyMetrics = useCallback((feedbackData) => {
    const totalFeedbacks = feedbackData.length;
    const totalScoreSum = Object.values(averageScores).reduce((acc, score) => acc + parseFloat(score), 0);
    const overallAverage = (totalScoreSum / Object.keys(averageScores).length).toFixed(1);
    
    // Identify areas for improvement (average score < 4)
    const areasForImprovement = Object.keys(averageScores).filter(key => averageScores[key] < 4);

    setKeyMetrics({
      totalFeedbacks,
      overallAverage,
      areasForImprovement,
    });

    console.log('Calculated Key Metrics:', keyMetrics); // Debug: Check key metrics
  }, [averageScores]);

  useEffect(() => {
    // Fetch feedback data from local storage
    const storedFeedback = localStorage.getItem('feedbackData');
    
    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback);
      console.log('Parsed Feedback Data:', parsedFeedback); // Debug: Check parsed data
      
      setFeedbackData(parsedFeedback);
      calculateAverageScores(parsedFeedback);
      calculateKeyMetrics(parsedFeedback);
    } else {
      console.log('No feedback data found in local storage.');
    }
  }, [calculateAverageScores, calculateKeyMetrics]);

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

  const dataPie = {
    labels: Object.keys(averageScores),
    datasets: [
      {
        label: 'Feedback Distribution',
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
        data: Object.values(averageScores),
      },
    ],
  };

  const dataLine = {
    labels: Object.keys(averageScores),
    datasets: [
      {
        label: 'Trends in Feedback Over Time',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(averageScores), // Placeholder data for trends
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

      {/* Pie Chart for Feedback Distribution */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3 shadow-sm">
            <Pie data={dataPie} options={{ ...options, title: { ...options.title, text: 'Feedback Distribution' } }} />
          </Card>
        </Col>
      </Row>

      {/* Line Chart for Feedback Trends */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3 shadow-sm">
            <Line data={dataLine} options={{ ...options, title: { ...options.title, text: 'Feedback Trends Over Time' } }} />
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
                  <th>Cleanliness</th>
                  <th>Staff Helpfulness</th>
                  <th>Room Environment</th>
                  <th>Outpatient Process</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{feedback[1]}</td>
                    <td>{feedback[2]}</td>
                    <td>{feedback[3]}</td>
                    <td>{feedback[5]}</td>
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
