import axios, { AxiosError, AxiosInstance } from 'axios';


// Create a custom axios instance
export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 15000,
});