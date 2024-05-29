import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';
import ProjectDeleteButton from '../components/ProjectDeleteButton';
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Divider,
  Card,
  CardContent,
  Menu,
  MenuItem,
  CardHeader,
  Grid,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useThemeContext } from '../components/ThemeProvider';

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
  const { darkMode } = useThemeContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Box mt={4}>
       <Typography variant="h4" color={darkMode ? 'white' : 'inherit' } gutterBottom align="center">
        Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card variant="outlined" style={{ backgroundColor: darkMode ? 'rgb(30, 41, 59)' : 'rgb(248, 250, 252)', color: darkMode ? 'white' : 'black' }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={(event) => handleMenuOpen(event, project.id)}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Link to={`/projects/${project.id}`} style={linkStyle}>
                    <Typography variant="h6" color="primary">
                      {project.name}
                    </Typography>
                  </Link>
                }
                subheader={getStatus(project)}
              />
              <CardContent>
              </CardContent>
            </Card>
            <Divider />
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ProjectDeleteButton projectId={selectedProjectId!} onDeleteSuccess={handleDeleteSuccess} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProjectsList;