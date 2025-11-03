export interface ExpenditureCategoryRef {
    _id: string;
    name: string;
}

export interface Expenditure {
    _id: string;
    categoryId: ExpenditureCategoryRef;
    title: string;
    description: string;
    amount: number;
    status: "selesai" | "pending" | "draft" | string; // bisa disesuaikan dengan enum di backend
    expenditureDate: string; // ISO date string
    attachments: string[]; // bisa diganti jadi objek jika nanti menyimpan file metadata
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Jika hasilnya berupa array
export type ExpenditureList = Expenditure[];
