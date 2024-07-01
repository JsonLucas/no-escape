import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { get } = useLocalStorage();

export const api = axios.create({ 
    baseURL: import.meta.env.ENVIRONMENT === 'production' 
    ? import.meta.env.REACT_APP_API_URL 
    : import.meta.env.VITE_API_URL 
});

api.interceptors.request.use((request) => {
    request.headers['x-session-id'] = get('access_token');
    return request;
});