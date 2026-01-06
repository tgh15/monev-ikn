// lib/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true, // ⬅️ penting agar cookie ikut terkirim
});

// Optional: Interceptor response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized");
        }
        return Promise.reject(error);
    }
);

export default api;
