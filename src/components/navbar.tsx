import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Project´s Management App
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/projects">
            Project List
          </Button>
          <Button color="inherit" component={Link} to="/projects/create">
            Create Project
          </Button>
          <Button color="inherit" component={Link} to="/tasks/create">
            Create Task
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
