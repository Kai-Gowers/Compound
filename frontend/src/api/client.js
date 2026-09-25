import axios from 'axios';

export const api = axios.create({ baseURL: '/api', withCredentials: true });

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest = error.config?.url?.startsWith('/auth');

        if (error.response?.status === 401 && !isAuthRequest) {
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);