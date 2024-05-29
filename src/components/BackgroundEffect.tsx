import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider'; // Importa el contexto de tema desde el archivo adecuado
import '../styles/BackgroundEffect.css'; // Asegúrate de importar tu archivo CSS

const BackgroundEffect: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext is undefined');
  }

  const { darkMode } = context;

  return (
    <div className={`background-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="background-overlay"></div>
    </div>
  );
};

export default BackgroundEffect;