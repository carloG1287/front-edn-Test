import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  taskId: number;
  onDeleteSuccess: () => void;
}

const TaskDeleteButton: React.FC<Props> = ({ taskId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks/${taskId}/delete`);
      console.log('Task deleted:', response.data);
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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

export default TaskDeleteButton;