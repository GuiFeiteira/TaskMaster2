const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/jwt');
const User = require('../models/user.model');

const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    console.log('Existing user:', existingUser);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    console.log('Hashed password created');

    // Create new user
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    await user.save();
    console.log('User saved:', user);

    // Generate token
    const token = signToken({ userId: user._id, email: user.email });
    console.log('Token generated');
    return { token, user: { id: user._id, name: user.name, email: user.email } };
  } catch (err) {
    console.error('Error in registerUser:', err);
    throw err;
  }
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
