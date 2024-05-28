import axios from 'axios';
import BACKEND_URL from '../config';

const api = axios.create({
  baseURL: BACKEND_URL,
});

export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching projects');
  }
};

export const createProject = async (name: string) => {
  try {
    const response = await api.post('/projects', { name });
    return response.data;
  } catch (error) {
    throw new Error('Error creating project');
  }
};

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (description: string) => {
  try {
    const response = await api.post('/tasks', { description });
    return response.data;
  } catch (error) {
    throw new Error('Error creating task');
  }
};

export const markTaskAsCompleted = async (taskId: number) => {
  try {
    const response = await api.post(`/tasks/${taskId}/complete`);
    return response.data;
  } catch (error) {
    throw new Error('Error marking task as completed');
  }
};

export default api;
