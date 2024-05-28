import React from 'react';
import { Link } from 'react-router-dom';
import ProjectsList from '../components/ProjectList';

const ProjectsPage: React.FC = () => {
  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/create">Create New Project</Link>
      <ProjectsList />
    </div>
  );
};

export default ProjectsPage;
