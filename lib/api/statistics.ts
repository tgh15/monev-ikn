import { Budget } from "@/type/BudgetType";
import api from "../axios";

export async function getStatistics(id: string) {
    try {
        const res = await api.get<Budget>(`/statistics?budgetId=${id}`);
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}