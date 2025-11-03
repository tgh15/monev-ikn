'use client'
import { formatCurrency } from "@/lib/utils";
import { Budget } from "@/type/BudgetType";
import { CheckCircle, Clock, DollarSign, Users, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

interface StatisticsCardProps {
    statistics: Budget;
};

export default function StatisticsCard({ statistics }: StatisticsCardProps) {
    const [animatedNumbers, setAnimatedNumbers] = useState({
        totalBudget: 0,
        projectsCompleted: 0,
        activeProjects: 0,
        citizensServed: 0
    });

    // console.log(statistics)

    // Animasi angka
    useEffect(() => {
        const targetNumbers = {
            totalBudget: statistics.totalAmount,
            projectsCompleted: statistics.summary.count_selesai,
            activeProjects: statistics.summary.count_proses_pertanggungjawaban,
            citizensServed: 153400
        };

        const duration = 2000;
        const steps = 60;
        const increment = {
            totalBudget: targetNumbers.totalBudget / steps,
            projectsCompleted: targetNumbers.projectsCompleted / steps,
            activeProjects: targetNumbers.activeProjects / steps,
            citizensServed: targetNumbers.citizensServed / steps
        };

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                setAnimatedNumbers({
                    totalBudget: Math.floor(increment.totalBudget * currentStep),
                    projectsCompleted: Math.floor(increment.projectsCompleted * currentStep),
                    activeProjects: Math.floor(increment.activeProjects * currentStep),
                    citizensServed: Math.floor(increment.citizensServed * currentStep)
                });
            } else {
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    return (
        <section className="py-12 -mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wallet className="text-blue-600 text-2xl" />
                        </div>

                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Total Anggaran</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(animatedNumbers.totalBudget)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Tahun Anggaran 2025</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="text-green-600 text-2xl" />
                        </div>
                        {/* <span className="text-green-500 text-sm font-medium flex items-center">
                            <TrendingUp className="mr-1" />
                            +8.3%
                        </span> */}
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Kegiatan Selesai</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(animatedNumbers.projectsCompleted)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Hingga saat ini</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="text-yellow-600 text-2xl" />
                        </div>
                        <span className="text-yellow-500 text-sm font-medium">On Progress</span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Kegiatan Berlangsung</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(animatedNumbers.activeProjects)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Sedang dikerjakan</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="text-purple-600 text-2xl" />
                        </div>
                        {/* <span className="text-green-500 text-sm font-medium flex items-center">
                            <TrendingUp className="mr-1" />
                            +15.2%
                        </span> */}
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Reforestasi & Rehabilitasi</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(animatedNumbers.citizensServed)}Ha
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Lahan</p>
                </div>
            </div>
        </section>
    )
} 