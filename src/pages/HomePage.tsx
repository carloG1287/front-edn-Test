import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const Homepage: React.FC = () => {
  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h2" gutterBottom align="center">
          Welcome to the Project Management App
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" component={Link} to="/projects" color="primary">
              View Projects
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to="/projects/create" color="primary">
              Create Project
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to="/tasks/create" color="primary">
              Create Task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage;