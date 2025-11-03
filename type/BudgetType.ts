export interface Summary {
    usedAmount: number;
    totalAmount_selesai: number;
    totalAmount_proses_pertanggungjawaban: number;
    totalAmount_belum_selesai: number;
    count_selesai: number,
    count_proses_pertanggungjawaban: number,
    count_belum_selesai: number
}

export interface Budget {
    _id: string;
    fiscalYear: string;
    name: string;
    totalAmount: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    summary: Summary
}
