import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Project Management App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/projects">View Projects</Link>
          </li>
          <li>
            <Link to="/projects/create">Create Project</Link>
          </li>
          <li>
            <Link to="/tasks/create">Create Task</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;