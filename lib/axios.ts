// lib/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
