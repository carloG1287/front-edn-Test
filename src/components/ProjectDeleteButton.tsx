import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

interface Props {
  projectId: number;
  onDeleteSuccess: () => void;
}

const ProjectDeleteButton: React.FC<Props> = ({ projectId, onDeleteSuccess }) => {
  const handleDelete = () => {
    axios.delete(`${BACKEND_URL}/projects/${projectId}`)
      .then(response => {
        console.log('Project deleted successfully:', response.data);
        onDeleteSuccess();
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default ProjectDeleteButton;
