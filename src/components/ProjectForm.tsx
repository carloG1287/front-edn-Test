import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import BackgroundEffect from '../components/BackgroundEffect';
import { useThemeContext } from '../components/ThemeProvider';

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false); 
  const { darkMode } = useThemeContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post(`${BACKEND_URL}/projects`, { name })
      .then(response => {
        console.log('Project created:', response.data);
        setOpen(true); 
        setName(''); 
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <Box mt={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <BackgroundEffect />
      <Typography variant="h4" color={darkMode ? 'white' : 'inherit' } gutterBottom align="center">
        Create Project
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Project Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
          fullWidth 
          style={{ marginBottom: 16 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Project Created Successfully
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Your project has been created successfully.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 3 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectForm;