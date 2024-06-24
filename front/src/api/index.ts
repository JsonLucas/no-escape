import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { get } = useLocalStorage();

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use((request) => {
    request.headers['x-access-token'] = get('accessToken');
    return request;
});