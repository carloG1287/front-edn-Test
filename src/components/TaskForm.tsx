import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

interface Project {
  id: number;
  name: string;
}

const TaskForm: React.FC = () => {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (projectId === null) {
      alert('Please select a project');
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        projectId,
        name,
        description,
      });
      console.log('Task created:', response.data);
      setProjectId(null);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="project-select">Select a project:</label>
        <select
          id="project-select"
          value={projectId !== null ? projectId : ''}
          onChange={(e) => setProjectId(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <label htmlFor="name-input">Task name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
        />
        <label htmlFor="description-input">Task description:</label>
        <input
          id="description-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TaskForm;