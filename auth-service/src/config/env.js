require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27018/taskmaster',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
};
