import { Budget } from "@/type/BudgetType";
import api from "../axios";

// {
//     "fiscalYear":"2025",
//     "name": "Anggaran Awal",
//     "totalAmount": 5100000000,
//     "description": "Inisiasi anggaran belanja 2025"
// }

export async function getBudget(id: string) {
    try {
        const res = await api.get<Budget>(`/monev/budget/${id}`);
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export interface UpdateBudgetProps {
    id: string,
    name: string,
    plannedAmount: number,
    description: string
}

export async function updateBudget({ id, name, plannedAmount, description }: UpdateBudgetProps) {
    try {
        const res = await api.put<Budget>('/monev/budget/' + id, {
            name, totalAmount: plannedAmount, description
        })
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}