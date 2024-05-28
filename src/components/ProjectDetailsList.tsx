import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import ProjectRollbackButton from '../components/ProjectRollbackButton';

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

const ProjectDetailList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/projects/${projectId}`)
      .then(response => {
        setProject(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching project details');
        setLoading(false);
      });
  }, [projectId]);

  const handleTaskCompletion = (taskId: number) => {
    axios.post(`${BACKEND_URL}/tasks/${taskId}/complete`)
      .then(response => {
        setProject(prevProject => {
          if (prevProject) {
            return {
              ...prevProject,
              tasks: prevProject.tasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: true } : task
              )
            };
          }
          return prevProject;
        });
      })
      .catch(error => {
        console.error('Error completing task:', error);
      });
  };

  const handleRollbackSuccess = () => {
    fetchProject();
  };

  const fetchProject = () => {
    axios.get(`${BACKEND_URL}/projects/${projectId}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        setError('Error fetching project details');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {project.tasks.map(task => (
          <li key={task.id}>
            {task.description} - {task.isCompleted ? 'Completed' : 'Pending'}
            {!task.isCompleted && (
              <button onClick={() => handleTaskCompletion(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
      <ProjectRollbackButton projectId={project.id} onRollbackSuccess={handleRollbackSuccess} />
    </div>
  );
};

export default ProjectDetailList;
