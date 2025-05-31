import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    if (!token) {
      console.log('No token available, skipping fetchTasks');
      setTasks([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setError(null);
      const response = await axios.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks.');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
      setError(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteTask = async (taskId) => {
    if (!token) return;
    try {
        await axios.delete(`/api/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
        console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
        {isAuthenticated && (
           <Button
             variant="contained"
             color="primary"
             onClick={() => navigate('/tasks/create')}
           >
             New Task
           </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {tasks.length === 0 ? (
              <ListItem>
                <ListItemText primary={isAuthenticated ? "No tasks found. Create your first task!" : "Please log in to view tasks."} />
              </ListItem>
            ) : (
              tasks.map((task) => (
                <ListItem
                  key={task._id}
                  divider
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={task.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {task.description}
                        </Typography>
                        <br />
                        Due: {formatDate(task.dueDate)}
                      </>
                    }
                  />
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(task._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default TaskList;