import api from "../axios";
import { ExpenditureList } from "@/type/ExpenditureType";

export async function getExpenditure(categoryId?: string) {
    try {
        let res
        if (categoryId) {
            res = await api.get<ExpenditureList>(`/monev/expenditure?categoryId=${categoryId}`);
        } else {
            res = await api.get<ExpenditureList>(`/monev/expenditure`);
        }
        return res.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
}

// export async function getExpenditureByCategoryId(categoryId: string) {
//     try {
//         const res = await api.get<ExpenditureList>(`/monev/expenditure?categoryId=${categoryId}`);
//         return res.data;
//     } catch (error) {
//         throw error; // Rethrow the error to be handled by the caller
//     }
// }

interface CreateExpenditureProps {
    categoryId: string,
    title: string,
    description: string,
    amount: string,
    status: string,
    expenditureDate: string,
}
export async function createExpenditure(data: CreateExpenditureProps) {
    try {
        const res = await api.post(`/monev/expenditure`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

interface UpdateExpenditureProps {
    _id: string,
    title: string,
    description: string,
    amount: number,
    status: string,
    expenditureDate: string,
}

export async function updateExpenditure(data: UpdateExpenditureProps) {
    try {
        const res = await api.put(`/monev/expenditure/${data._id}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteExpenditure(id: string) {
    try {
        const res = await api.delete('/monev/expenditure/' + id)
        return res.data
    } catch (error) {
        throw error
    }
}