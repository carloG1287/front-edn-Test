import React from 'react';
import { Container } from '@mui/material';
import ProjectsList from '../components/ProjectList';
import BackgroundEffect from '../components/BackgroundEffect';

const ProjectsPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <BackgroundEffect />

      <ProjectsList />
    </Container>
  );
};

export default ProjectsPage;