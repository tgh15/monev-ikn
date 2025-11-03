'use client'
import BudgetCard from "@/components/budget/card-budget";
import ExpenditureTable from "@/components/expenditures/expenditures-table";
import LoadingPage from "@/components/ui/loading";
import { getCategory } from "@/lib/api/category";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function CategoryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(id)
    })

    if (!data) return null
    if (isLoading) return <LoadingPage />

    return (
        <div className="flex-1 overflow-auto bg-gray-50">
            <div className=" mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            Detail Penggunaan Anggaran
                        </h1>
                        <p className="text-sm text-gray-500">

                        </p>
                    </div>
                </div>
                <BudgetCard description={data.description} id={data._id} title={data.name} total={data.plannedAmount} used={data.summary.usedAmount} summary={data.summary} />
                <ExpenditureTable id={id} />
            </div>
        </div>
    )
}
