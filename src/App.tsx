import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Navbar from './components/navbar';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" Component={HomePage} />
        <Route path="/projects/create" Component={ProjectForm} />
        <Route path="/projects" Component={ProjectsPage} />
        <Route path="/projects/:id" Component={ProjectDetailPage} />
      </Routes>
    </Router>

 
);
}

export default App;
