const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const OAUTH_API_URL = process.env.OAUTH_API_URL;
const DATA_ENDPOINT_URL = process.env.DATA_ENDPOINT_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vote POC Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Main voting endpoint
app.post('/vote', async (req, res) => {
  try {
    // Step 1: Get token from OAuth API
    console.log('Getting token from OAuth API...');
    const tokenResponse = await axios.post(OAUTH_API_URL, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const token = tokenResponse.data.data.access_token;
    
    console.log('Sending email and eventId to data endpoint...');
    const sendResponse = await axios.post(DATA_ENDPOINT_URL, {
      email: "maham@govotr.com",
      eventId: "68d123b4b40f3ddbee731a36"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const url = sendResponse.data.data.url;

    // Step 3: Return the URL from the data endpoint
    res.json({
      success: true,
      message: 'Vote process completed successfully',
      url: url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in vote process:', error);
      
    // Handle different types of errors
    if (error.response) {
      // External API error - send the API error message
      const apiError = error.response.data;
      const errorMessage = apiError?.error || apiError?.message || 'Unknown API error';
      
      res.status(error.response.status).json({
        success: false,
        message: errorMessage,
        error: apiError,
        timestamp: new Date().toISOString()
      });
    } else if (error.request) {
      // Network error
      res.status(500).json({
        success: false,
        message: 'Network error - unable to reach external services',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      // Other error
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vote POC Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🗳️  Vote endpoint: http://localhost:${PORT}/vote`);
});

module.exports = app;
