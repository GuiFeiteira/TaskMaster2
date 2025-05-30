require('dotenv').config();

const decodeBase64 = (str) => {
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Error decoding base64:', error);
    return str;
  }
};

module.exports = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://mongodb:27017/taskmaster',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretosecretkeymegacomplicado'
};
