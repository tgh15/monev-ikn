import { Budget } from "@/type/BudgetType";
import api from "../axios";
import { Category } from "@/type/CategoryType";

export async function getCategory(id: string) {
    try {
        const res = await api.get<Category>(`/monev/category/${id}`);
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function getCategories(budgetId: string) {
    try {
        const res = await api.get<Category[]>(`/monev/category?budgetId=${budgetId}`);
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

interface CreateCategoryProps {
    budgetId: string,
    name: string,
    plannedAmount: number,
    description?: string
}

export async function createCategory({ budgetId, name, plannedAmount, description }: CreateCategoryProps) {
    try {
        const res = await api.post<Category>(`/monev/category/`, {
            budgetId, name, plannedAmount, description
        });
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export interface UpdateCategoryProps {
    id: string
    name: string
    plannedAmount: number
    description: string
}

export async function updateCategory({ id, name, plannedAmount, description }: UpdateCategoryProps) {
    try {
        const res = await api.put<Category>('/monev/category/' + id, {
            name, plannedAmount, description
        })
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function deleteCategory(category_id: string) {
    try {
        const res = await api.delete('/monev/category/' + category_id)
        return res.data
    } catch (error) {
        throw error
    }
}