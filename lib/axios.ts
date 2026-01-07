// lib/axios.ts
import axios from "axios";
import { toast } from "sonner";

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
            window.location.href = "/auth";
        }
        return Promise.reject(error);
    },
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            console.warn("Unauthorized");
            toast.error("Akses ditolak: Anda tidak memiliki izin untuk melakukan aksi ini.");
        }
        return Promise.reject(error);
    },
);

export default api;
