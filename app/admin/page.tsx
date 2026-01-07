'use client';

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getBudget } from '@/lib/api/budget';
import StatisticsCard from '@/components/stats';
import { getStatistics } from '@/lib/api/statistics';
import AlokasiAnggaranPerKlasifikasi from '@/components/stats/alokasi-anggaran-perklasifikasi';
import { getCategories } from '@/lib/api/category';
import CapaianRealisasiPerKlasifikasi from '@/components/stats/capaian-realisasi-perklasifikasi';
import ExpenditureTable from '@/components/expenditures/expenditures-table';

export default function Dashboard() {
    const budgetId: string = '68f8d279a2d46b54a73a1c08'
    const { data: statistics } = useQuery({
        queryKey: ['statistics'],
        queryFn: () => getStatistics(budgetId)
    })
    const { data: budget, isLoading: loadingBudget } = useQuery({
        queryKey: ['budget'],
        queryFn: () => getBudget(budgetId)
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(budgetId)
    })

    if (!budget) return
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

    return (
        <>
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {statistics && (
                        <StatisticsCard statistics={statistics} />
                    )}

                    {/* Charts */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Realisasi Anggaran */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <CapaianRealisasiPerKlasifikasi categories={categories} />
                        </div>

                        {/* Trend Penyerapan */}
                        {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Realisasi vs Prognosis</h3>
                                <p className="text-sm text-gray-500">Persentase penyerapan per bulan</p>
                            </div>

                        </div> */}
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Pengajuan Terbaru */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
                            {/* <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Pengajuan Anggaran Terbaru</h3>
                                <p className="text-sm text-gray-500">Daftar pengajuan yang sedang diproses</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kode</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dinas/OPD</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kegiatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nominal</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {pengajuanTerbaru.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.kode}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{item.dinas}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.kegiatan}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.nominal}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${item.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                                                        item.status === 'Proses' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                            <ExpenditureTable />
                        </div>

                        {/* Distribusi per Bidang */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <AlokasiAnggaranPerKlasifikasi categories={categories} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}