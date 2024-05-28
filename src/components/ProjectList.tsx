import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/projects`)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching projects');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
          <ul>
            {project.tasks.map(task => (
              <li key={task.id}>
                {task.description} - {task.isCompleted ? 'Completed' : 'Pending'}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
