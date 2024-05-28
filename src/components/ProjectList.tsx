import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';
import ProjectDeleteButton from '../components/ProjectDeleteButton';

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  deletedAt: string | null;
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

    const getStatus = (project: Project): string => {
        const activeTasks = project.tasks.filter(task => !task.deletedAt);

        if (activeTasks.length === 0) {
            return 'No tasks';
        } else if (activeTasks.every(task => task.isCompleted)) {
            return 'Completed';
        } else {
            return 'In Progress';
        }
    };

    const handleDeleteSuccess = () => {
        
        axios.get(`${BACKEND_URL}/projects`)
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                setError('Error fetching projects');
            });
    };

    return (
        <ul>
            {projects.map(project => (
                <li key={project.id}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                    <span>{getStatus(project)}</span>

                    <ProjectDeleteButton projectId={project.id} onDeleteSuccess={handleDeleteSuccess} />

                    <ul>
                        {project.tasks
                            .filter(task => !task.deletedAt)
                            .map(task => (
                                <li key={task.id}>
                                    {task.name} - {task.isCompleted ? 'Completed' : 'Pending'}
                                </li>
                            ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default ProjectsList;
