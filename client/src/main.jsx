import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

// Create a root using createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the App component to the root
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
