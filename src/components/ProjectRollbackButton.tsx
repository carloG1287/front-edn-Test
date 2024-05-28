import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';

interface Props {
  projectId: number;
  onRollbackSuccess: () => void;
}

const ProjectRollbackButton: React.FC<Props> = ({ projectId, onRollbackSuccess }) => {
  const handleRollback = () => {
    axios.post(`${BACKEND_URL}/projects/${projectId}/rollback`)
      .then(response => {
        console.log('Rollback successful:', response.data);
        onRollbackSuccess();
      })
      .catch(error => {
        console.error('Error rolling back:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="warning"
      startIcon={<RestoreIcon />}
      onClick={handleRollback}
    >
      Rollback
    </Button>
  );
};

export default ProjectRollbackButton;
