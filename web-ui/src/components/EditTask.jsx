import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch task details
  useEffect(() => {
    if (!token || !taskId) {
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Format date for input[type=date]
        const taskData = response.data;
        if (taskData.dueDate) {
            taskData.dueDate = new Date(taskData.dueDate).toISOString().split('T')[0];
        }
        setTask(taskData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to load task.');
        setLoading(false);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchTask();
  }, [taskId, token, navigate]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !taskId) return;

    setSubmitting(true);
    try {
      await axios.put(`/api/tasks/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/tasks'); // Redirect to tasks list after successful edit
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !loading) {
      return (
          <Container maxWidth="md" sx={{ mt: 4 }}>
              <Alert severity="error">{error}</Alert>
          </Container>
      );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Task Title"
          name="title"
          autoFocus
          value={task.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="dueDate"
          label="Due Date"
          name="dueDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={task.dueDate}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="priority"
          label="Priority"
          name="priority"
          select
          value={task.priority}
          onChange={handleChange}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : 'Update Task'}
        </Button>
      </Box>
    </Container>
  );
};

export default EditTask; 