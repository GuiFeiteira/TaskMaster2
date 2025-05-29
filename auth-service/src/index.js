const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { port, mongoUri } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
