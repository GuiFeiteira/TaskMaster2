import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<TaskList />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;