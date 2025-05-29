require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3003,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27018/taskmaster',
  JWT_SECRET: process.env.JWT_SECRET || 'umaChaveSecretaSuperSegura',
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://user-service:3002'
}; 