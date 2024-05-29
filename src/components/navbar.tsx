import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../components/ThemeProvider';

const Navbar: React.FC = () => {
  const { toggleDarkMode, darkMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: darkMode ? 'white' : 'black' }}>
          Project's Management App
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" component={Link} to="/" sx={{ color: darkMode ? 'white' : 'black' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/projects" sx={{ color: darkMode ? 'white' : 'black' }}>
            Project List
          </Button>
          <Button color="inherit" component={Link} to="/projects/create" sx={{ color: darkMode ? 'white' : 'black' }}>
            Create Project
          </Button>
          <Button color="inherit" onClick={handleMenuClick} sx={{ color: darkMode ? 'white' : 'black' }}>
            Theme
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;