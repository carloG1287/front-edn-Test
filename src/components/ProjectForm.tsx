import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';  

function ProjectForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post(`${BACKEND_URL}/projects`, { name })
      .then(response => {
        console.log('Project created:', response.data);
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
      
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ProjectForm;
