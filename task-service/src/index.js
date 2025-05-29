require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task.routes');
const { port, mongoUri } = require('./config/env');

const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Task service conectado ao MongoDB');
    app.listen(port, () => console.log(`Task service rodando na porta ${port}`));
  })
  .catch(err => console.error('Erro na conexão com MongoDB:', err));
