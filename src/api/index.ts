import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { get } = useLocalStorage();

export const api = axios.create({ 
    baseURL: "34.201.146.137:5000"
});

api.interceptors.request.use((request) => {
    request.headers['x-session-id'] = get('access_token');
    return request;
});