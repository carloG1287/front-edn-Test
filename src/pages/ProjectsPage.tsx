import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import ProjectsList from '../components/ProjectList';

const ProjectsPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Your Projects
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can view and manage your projects. Click on a project to see details or create a new one.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/projects/create"
        sx={{ mt: 2, mb: 4 }}
      >
        Create New Project
      </Button>
      <ProjectsList />
    </Container>
  );
};

export default ProjectsPage;