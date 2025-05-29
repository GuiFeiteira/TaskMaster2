const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/jwt');
const User = require('../models/user.model');

const registerUser = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email já está em uso');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword
  });

  await user.save();

  // Generate token
  const token = signToken({ userId: user._id, email: user.email });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciais inválidas');
  }

  const token = signToken({ userId: user._id, email: user.email });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};

module.exports = { registerUser, authenticateUser };
