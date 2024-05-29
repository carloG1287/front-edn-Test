import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import BackgroundEffect from '../components/BackgroundEffect';
import { useThemeContext } from '../components/ThemeProvider';

const Homepage: React.FC = () => {
  const { darkMode } = useThemeContext();

  return (
    <Container>
      <BackgroundEffect />
      <Box mt={8}>
        <Typography variant="h2" gutterBottom align="center" color={darkMode ? 'white' : 'inherit'}>
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage;