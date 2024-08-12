const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Import routes
const noticesRoutes = require('./routes/noticeRoutes');

// Use routes
app.use('/api', noticesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
