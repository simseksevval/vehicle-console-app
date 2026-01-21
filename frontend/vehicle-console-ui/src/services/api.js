import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Settings API
export const getSettings = () => api.get('/settings');
export const getSetting = (id) => api.get(`/settings/${id}`);
export const updateSetting = (id, data) => api.put(`/settings/${id}`, data);

// Routes API
export const getRoutes = () => api.get('/routes');
export const getActiveRoute = () => api.get('/routes/active');
export const getRoute = (id) => api.get(`/routes/${id}`);

export default api;