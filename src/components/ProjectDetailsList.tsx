import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import TaskDeleteButton from '../components/TaskDeleteButton';
import PencilMenu from '../components/PencilMenu';
import BackgroundEffect from '../components/BackgroundEffect';
import { useThemeContext } from '../components/ThemeProvider';

import {
  Box,
  CircularProgress,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  deletedAt: string | null;
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

const ProjectDetailList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { darkMode } = useThemeContext();
  
  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = () => {
    axios.get(`${BACKEND_URL}/projects/${projectId}`)
      .then(response => {
        setProject(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching project details');
        setLoading(false);
      });
  };

  const handleTaskCompletion = (taskId: number) => {
    axios.post(`${BACKEND_URL}/tasks/${taskId}/complete`)
      .then(response => {
        setProject(prevProject => {
          if (prevProject) {
            return {
              ...prevProject,
              tasks: prevProject.tasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: true } : task
              )
            };
          }
          return prevProject;
        });
      })
      .catch(error => {
        console.error('Error completing task:', error);
      });
  };

  const handleDeleteSuccess = () => {
    fetchProject();
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" variant="h6">{error}</Typography>;
  }

  if (!project) {
    return <Typography color="error" variant="h6">Project not found</Typography>;
  }

  return (
    <Box mt={4}>
      <BackgroundEffect />
      <Typography variant="h4" color={darkMode ? 'white' : 'inherit' } gutterBottom align="center">
   Project Name: {project.name}
</Typography>

      <Grid container spacing={3}>
  {project.tasks.filter(task => task.deletedAt === null).map(task => (
    <Grid item xs={12} sm={6} md={6} key={task.id}>
      <Card sx={{ backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
        <CardContent>
          <Typography variant="h6">{task.name}</Typography>
          <Box mt={1}>
            <Typography variant="body1">
              {truncateDescription(task.description, 100)}
            </Typography>
          </Box>
          <Divider />
          <Grid container justifyContent="space-between">
            <Grid item>
              {!task.isCompleted ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleTaskCompletion(task.id)}
                >
                  Complete
                </Button>
              ) : (
                <Typography variant="body2" color="primary">
                  Completed
                  <DoneIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
                </Typography>
              )}
            </Grid>
            <Grid item>
              <TaskDeleteButton taskId={task.id} onDeleteSuccess={handleDeleteSuccess} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      <Box mt={2}>
        <PencilMenu projectId={project.id} onRollbackSuccess={handleDeleteSuccess} />
      </Box>
    </Box>
  );
};

export default ProjectDetailList;