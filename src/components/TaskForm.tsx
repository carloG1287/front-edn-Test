import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Modal,
  Fade
} from '@mui/material';

interface Project {
  id: number;
  name: string;
}

const TaskForm: React.FC = () => {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (projectId === null) {
      alert('Please select a project');
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        projectId,
        name,
        description,
      });
      console.log('Task created:', response.data);
      setProjectId(null);
      setName('');
      setDescription('');
      setSelectedProject(null);
      setOpenModal(true);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Autocomplete
            disablePortal
            id="project-select"
            options={projects}
            getOptionLabel={(option) => option.name}
            sx={{ mb: 3 }}
            value={selectedProject}
            onChange={(event, newValue) => {
              setSelectedProject(newValue);
              setProjectId(newValue ? newValue.id : null);
            }}
            renderInput={(params) => <TextField {...params} label="Select a project" required />}
          />
          <TextField
            id="name-input"
            label="Task name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
            required
            sx={{ mb: 3 }}
          />
          <TextField
            id="description-input"
            label="Task description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create
          </Button>
        </Box>
      </Paper>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Task created successfully!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default TaskForm;