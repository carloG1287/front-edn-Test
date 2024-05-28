import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Button
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default ProjectDeleteButton;