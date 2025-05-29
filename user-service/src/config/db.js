const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao ligar à base de dados:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
