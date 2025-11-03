'use client'
import AddCategory from '@/components/budget/add-category';
import BudgetCard from '@/components/budget/card-budget';
import AddBudget from '@/components/budget/add-budget';
import { getBudget } from '@/lib/api/budget';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@/components/ui/loading';
import { getCategories } from '@/lib/api/category';

const budgetId: string = '68f8d279a2d46b54a73a1c08'

// Main Component
export default function MonevPage() {
    // const budget = await getBudget('68f8d279a2d46b54a73a1c08')
    const { data: budget, isLoading: loadingBudget } = useQuery({
        queryKey: ['budget'],
        queryFn: () => getBudget(budgetId)
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(budgetId)
    })

    if (loadingBudget) return <LoadingPage />

    if (!budget) return

    return (
        <div className="flex-1 overflow-auto bg-gray-50">
            <div className=" mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            Monitoring & Evaluasi Anggaran
                        </h1>
                        <p className="text-sm text-gray-500">
                            Pantau realisasi dan pertanggungjawaban anggaran
                        </p>
                    </div>

                    <AddBudget />
                </div>
                {/* Budget Cards Grid */}
                <BudgetCard
                    id={budget._id}
                    title={budget.name}
                    description={budget.description}
                    background='bg-yellow-100/30'
                    total={budget.totalAmount}
                    used={budget.summary.usedAmount}
                    summary={budget.summary}
                    isBudget={true}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                    {categories && categories.map((category, index) => (
                        <BudgetCard
                            id={category._id}
                            key={index}
                            title={category.name}
                            description={category.description}
                            total={category.plannedAmount}
                            used={category.summary.usedAmount}
                            summary={category.summary}
                            isBudget={false}
                        />
                    ))}

                    <AddCategory budgetId={budget._id} />
                </div>

                {/* Legend */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex flex-wrap items-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-600" />
                            <span className="text-gray-600">Selesai dipertanggungjawabkan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
                            <span className="text-gray-600">Proses pertanggungjawaban</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
                            <span className="text-gray-600">Belum dipertanggungjawabkan</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}