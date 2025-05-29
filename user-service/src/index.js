const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());

connectDB();

app.use('/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`User service a correr na porta ${PORT}`);
});
