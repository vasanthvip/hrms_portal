import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEmployees = () => api.get('employees/');
export const getDepartments = () => api.get('departments/');
export const getAttendance = () => api.get('attendance/');
export const getLeaves = () => api.get('leaves/');
export const createEmployee = (data) => api.post('employees/', data);
export const updateEmployee = (id, data) => api.put(`employees/${id}/`, data);
export const deleteEmployee = (id) => api.delete(`employees/${id}/`);

export default api;
