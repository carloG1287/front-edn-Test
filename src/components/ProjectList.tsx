import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';
import ProjectDeleteButton from '../components/ProjectDeleteButton';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Divider,
} from '@mui/material';

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  deletedAt: string | null;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/projects`)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching projects');
        setLoading(false);
      });
  }, [update]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const getStatus = (project: Project): string => {
    const activeTasks = project.tasks.filter(task => !task.deletedAt);

    if (activeTasks.length === 0) {
      return 'No tasks';
    } else if (activeTasks.every(task => task.isCompleted)) {
      return 'Completed';
    } else {
      return 'In Progress';
    }
  };

  const handleDeleteSuccess = () => {
    setUpdate(!update); 
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <List>
        {projects.map(project => (
          <Box key={project.id} mb={2}>
            <ListItem>
              <ListItemText
                primary={
                  <Link to={`/projects/${project.id}`} style={linkStyle}>
                    <Typography variant="h6" color="primary">{project.name}</Typography>
                  </Link>
                }
                secondary={getStatus(project)}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ProjectDeleteButton projectId={project.id} onDeleteSuccess={handleDeleteSuccess} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <List component="div" disablePadding>
              {project.tasks
                .filter(task => !task.deletedAt)
                .map(task => (
                  <ListItem key={task.id} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={task.name}
                      secondary={task.isCompleted ? 'Completed' : 'Pending'}
                    />
                  </ListItem>
                ))}
            </List>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ProjectsList;