import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TaskPage from './pages/TaskPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" Component={HomePage} />
        <Route path="/projects/create" Component={ProjectForm} />
        <Route path="/projects" Component={ProjectsPage} />
        <Route path="/projects/:id" Component={ProjectDetailPage} />
        <Route path="/tasks" Component={TaskPage} />
        <Route path="/tasks/create" Component={TaskForm} />
      </Routes>
    </Router>

 
);
}

export default App;
