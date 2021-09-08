import axios from 'axios';

export const api = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    return instance;
};

export default api;
