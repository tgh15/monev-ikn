import api from "../axios";

export async function login(data: { email: string; password: string }) {
    try {
        const res = await api.post("/auth/login", data);
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function checkLogin() {
    try {
        const res = await api.get("/auth/check-auth", { withCredentials: true });
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function logoutApi() {
    try {
        const res = await api.post("/auth/logout", {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}