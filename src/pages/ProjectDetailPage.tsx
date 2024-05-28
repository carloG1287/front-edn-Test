import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetailList from '../components/ProjectDetailsList';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <ProjectDetailList projectId={Number(id)} />
    </div>
  );
};

export default ProjectDetailPage;
