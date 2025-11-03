import { Summary } from "./BudgetType";

export interface Category {
    _id: string;
    budgetId: string;
    name: string;
    plannedAmount: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    summary: Summary;
}
