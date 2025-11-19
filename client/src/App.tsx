import axios from 'axios';
const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor to handle auth errors
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/users/register', userData),
    login: (credentials) => api.post('/users/login', credentials),
    getProfile: () => api.get('/users/profile'),
};
// Posts API calls
export const postsAPI = {
    getAll: (params) => api.get('/posts', { params }),
    getById: (id) => api.get(`/posts/${id}`),
    create: (postData) => api.post('/posts', postData),
    update: (id, postData) => api.put(`/posts/${id}`, postData),
    delete: (id) => api.delete(`/posts/${id}`),
};
// Health check
export const healthAPI = {
    check: () => api.get('/health'),
};
export default api;
