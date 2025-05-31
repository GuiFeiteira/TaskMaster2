import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', task);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create New Task
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              select
              label="Priority"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              margin="normal"
              required
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/tasks')}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Task
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTask; 