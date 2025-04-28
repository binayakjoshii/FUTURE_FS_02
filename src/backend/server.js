const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ➡️ Added this route for browser direct visit
app.get('/', (req, res) => {
  res.send('Server is working! Weather API is ready 🚀');
});

// API endpoint to fetch weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query; // Get the city from the query parameters
  const apiKey = process.env.API_KEY; // Fetch the API key from environment variables

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found' });
  }

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Fetch weather data from the weather API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    res.json(response.data); // Send the weather data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
