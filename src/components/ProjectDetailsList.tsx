import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import ProjectRollbackButton from '../components/ProjectRollbackButton';
import TaskDeleteButton from '../components/TaskDeleteButton';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

  const handleRollbackSuccess = () => {
    fetchProject();
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
      <Typography variant="h4" gutterBottom>{project.name}</Typography>
      <List>
        {project.tasks.filter(task => task.deletedAt === null).map(task => (
          <React.Fragment key={task.id}>
            <ListItem>
              <ListItemText
                primary={task.name}
                secondary={task.description}
              />
              <ListItemSecondaryAction>
                {!task.isCompleted ? (
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton
                        edge="end"
                        aria-label="complete"
                        color="primary"
                        onClick={() => handleTaskCompletion(task.id)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <TaskDeleteButton taskId={task.id} onDeleteSuccess={handleDeleteSuccess} />
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Completed
                  </Typography>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box mt={2}>
        <ProjectRollbackButton projectId={project.id} onRollbackSuccess={handleRollbackSuccess} />
      </Box>
    </Box>
  );
};

export default ProjectDetailList;