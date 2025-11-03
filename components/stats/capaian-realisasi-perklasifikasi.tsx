'use client'

import { getPercentage } from "@/lib/utils";
import { Category } from "@/type/CategoryType";
import { Bar } from "react-chartjs-2";
interface CapaianRealisasiPerKlasifikasiProps {
    categories?: Category[]
}
export default function CapaianRealisasiPerKlasifikasi({ categories }: CapaianRealisasiPerKlasifikasiProps) {
    const departmentComparisonData = {
        labels: categories?.map(category => category.name),
        datasets: [
            {
                label: 'Kegiatan Selesai (%)',
                data: categories?.map(category => getPercentage(category.summary.totalAmount_selesai, category.plannedAmount)),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Kegiatan Berlangsung (%)',
                data: categories?.map(category => getPercentage(category.summary.totalAmount_proses_pertanggungjawaban, category.plannedAmount)),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
            },
        ],
    };
    return (
        <div className="bg-gray-50 rounded-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capaian Realisasi per Klasifikasi Rincian Output</h3>
            <div className="h-80">
                <Bar
                    data={departmentComparisonData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    callback: function (value) {
                                        return value + '%';
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}