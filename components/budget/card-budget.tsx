import { formatCurrency, getPercentage } from "@/lib/utils";
import EditBudget from "./edit-budget";
import { AlertCircle, EllipsisVertical, ExternalLink, Link2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DeleteCategory from "./delete-category";

interface BudgetCardProps {
    id: string;
    title: string;
    description: string;
    total: number;
    used?: number;
    background?: string
    summary: {
        usedAmount: number;
        totalAmount_selesai: number;
        totalAmount_proses_pertanggungjawaban: number;
        totalAmount_belum_selesai: number;
    };
    showAlert?: boolean;
    isBudget?: boolean
}

export default function BudgetCard({ id, title, description, total, used, summary, showAlert, background, isBudget }: BudgetCardProps) {
    const usedPercentage = getPercentage(Number(used), Number(total));
    const remaining = Number(total) - Number(used);

    return (
        <div className={`${background} bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative`}>
            <div className="flex absolute top-4 right-4 gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            size="icon"
                        >
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <EditBudget category={{ id, title, description, total }} isBudget={isBudget} />
                        {!isBudget && (
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Link href={`/admin/monev/${id}`} className="w-full">Detail</Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        </DropdownMenuItem>
                        <DeleteCategory category_id={id} />

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>

            {/* Total Budget */}
            <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatCurrency(Number(total))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Total Anggaran</span>
                    {showAlert && parseFloat(usedPercentage) > 100 && (
                        <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-xs font-medium">Over Budget</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Terpakai</span>
                    <span className="text-sm font-semibold text-emerald-600">
                        {formatCurrency(Number(used))} ({usedPercentage}%)
                    </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(parseFloat(usedPercentage), 100)}%` }}
                    />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    Sisa: {formatCurrency(remaining)}
                </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                {/* {breakdown.map((item, index) => ( */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold text-rose-600`}>
                            {getPercentage(summary?.totalAmount_selesai, total)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`bg-gradient-to-r from-rose-400 to-rose-600 h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(Number(getPercentage(summary.totalAmount_selesai, total)), 100)}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                        Selesai dipertanggungjawabkan
                    </p>
                    <p className="text-xs font-medium text-gray-900">
                        {formatCurrency(summary.totalAmount_selesai)}
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold text-blue-600`}>
                            {getPercentage(summary?.totalAmount_proses_pertanggungjawaban, total)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(Number(getPercentage(summary.totalAmount_proses_pertanggungjawaban, total)), 100)}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                        Proses pertanggungjawaban
                    </p>
                    <p className="text-xs font-medium text-gray-900">
                        {formatCurrency(summary.totalAmount_proses_pertanggungjawaban)}
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold text-amber-600`}>
                            {getPercentage(summary?.totalAmount_belum_selesai, total)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`bg-gradient-to-r from-amber-400 to-amber-600 h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(Number(getPercentage(summary.totalAmount_belum_selesai, total)), 100)}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                        Belum dipertanggungjawabkan
                    </p>
                    <p className="text-xs font-medium text-gray-900">
                        {formatCurrency(summary.totalAmount_belum_selesai)}
                    </p>
                </div>
                {/* ))} */}
            </div>
        </div>
    );
};