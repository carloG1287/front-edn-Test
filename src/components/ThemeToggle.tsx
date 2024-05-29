import React from 'react';
import { Button } from '@mui/material';
import { useThemeContext } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <Button onClick={toggleDarkMode}>
      {darkMode ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
    </Button>
  );
};

export default ThemeToggle;