const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// View engine setup (optional, for EJS rendering)
app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static('public'));

// Enable CORS for all origins
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// API routes
app.use('/api/auth', require('./routes/auth'));

// Serve React build static files
app.use(express.static(path.join(__dirname, 'build')));

// Redirect all non-API routes to React's index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Optional root health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
