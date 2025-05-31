import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [isAuthenticated, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async () => {
    try {
      await axios.post('/api/tasks', newTask);
      setOpenDialog(false);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

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

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Tasks
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Task
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3}>
          <List>
            {tasks.map((task) => (
              <ListItem key={task._id} divider>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {task.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            select
            label="Priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            margin="normal"
            required
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList; 