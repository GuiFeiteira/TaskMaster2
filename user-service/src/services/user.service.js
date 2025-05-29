const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Email já está em uso');
  }

  const user = new User(data);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new Error('Utilizador não encontrado');
  }
  return user;
};

const updateUser = async (id, data) => {
  // If email is being updated, check if it's already in use
  if (data.email) {
    const existingUser = await User.findOne({ email: data.email, _id: { $ne: id } });
    if (existingUser) {
      throw new Error('Email já está em uso');
    }
  }

  // If password is being updated, hash it
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new Error('Utilizador não encontrado');
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('Utilizador não encontrado');
  }
  return { message: 'Utilizador removido com sucesso' };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
