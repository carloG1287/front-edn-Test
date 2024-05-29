import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useThemeContext } from '../components/ThemeProvider';
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';

interface Project {
  id: number;
  name: string;
}

interface TaskFormProps {
  onClose: () => void;
  projectId: number;
  projectName: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, projectId, projectName }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>({
    id: projectId,
    name: projectName,
  });
  const { darkMode } = useThemeContext();

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
    if (selectedProject === null) {
      alert('Please select a project');
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        projectId: selectedProject.id,
        name,
        description,
      });
      console.log('Task created:', response.data);
      setName('');
      setDescription('');
      setSelectedProject(null);
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: '400px',
        maxWidth: '90%',
      }}
    >
     <Typography variant="h4" color={darkMode ? 'white' : 'inherit'}>
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
    </Box>
  );
};

export default TaskForm;