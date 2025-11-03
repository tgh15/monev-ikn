// pages/index.js
'use client'
import { useState } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Activity, ActivityIcon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import StatisticsCard from '@/components/stats';
import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '@/lib/api/statistics';
import { getCategories } from '@/lib/api/category';
import { formatCurrency, getPercentage } from '@/lib/utils';
import ExpenditureTable from '@/components/expenditures/expenditures-table';
import AlokasiAnggaranPerKlasifikasi from '@/components/stats/alokasi-anggaran-perklasifikasi';
import CapaianRealisasiPerKlasifikasi from '@/components/stats/capaian-realisasi-perklasifikasi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function TransparencyLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const budgetId: string = '68f8d279a2d46b54a73a1c08'
    const { data: statistics } = useQuery({
        queryKey: ['statistics'],
        queryFn: () => getStatistics(budgetId)
    })
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(budgetId)
    })



    const monthlySpendingData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
            {
                label: 'Realisasi Anggaran',
                data: [120, 135, 128, 145, 160, 155, 170, 165, 180, 175],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Target Anggaran',
                data: [130, 130, 130, 140, 150, 150, 160, 160, 170, 170],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };



    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    return (
        <>
            <Head>
                <title>SIPANDA - Sistem Pengelolaan Anggaran dan Dana Terpadu</title>
                <meta name="description" content="Platform digital terintegrasi untuk pengelolaan dan transparansi anggaran yang akuntabel, efisien, dan dapat diakses oleh publik secara real-time" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen w-full bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <ActivityIcon className="text-white text-xl" />
                                        </div>
                                        <span className="ml-3 text-xl font-bold text-gray-900">SIPANDA</span>
                                    </div>
                                </div>
                                <nav className="hidden md:ml-10 md:flex space-x-8">
                                    <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Beranda</a>
                                    <a href="#statistik" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Statistik</a>
                                    <a href="#proyek" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Proyek</a>
                                    <a href="#laporan" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Laporan</a>
                                    <a href="#kontak" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Kontak</a>
                                </nav>
                            </div>
                            {/* <div className="hidden md:flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari proyek..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Search className="absolute left-3 top-3 text-gray-400" />
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
                                    <Download className="mr-2" />
                                    Unduh Laporan
                                </button>
                            </div> */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-700 hover:text-blue-600 p-2"
                                >
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-200">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Beranda</a>
                                <a href="#statistik" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Statistik</a>
                                <a href="#proyek" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Proyek</a>
                                <a href="#laporan" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Laporan</a>
                                <a href="#kontak" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Kontak</a>
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="hero bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 grid-cols-2 gap-4">
                        {/* <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Portal Transparansi Anggaran
                            </h1>
                            <p className="text-xl mb-8 text-blue-100">
                                Keterbukaan informasi pengelolaan anggaran untuk masyarakat yang lebih baik
                            </p>
                            <div className="flex justify-center space-x-4">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="2024">Tahun 2024</option>
                                    <option value="2023">Tahun 2023</option>
                                    <option value="2022">Tahun 2022</option>
                                </select>
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition flex items-center">
                                    <Filter className="mr-2" />
                                    Filter Data
                                </button>
                            </div>
                        </div> */}
                        <div className='col-span-2 flex flex-col justify-center'>
                            <h1 className="text-4xl text-center md:text-left md:text-5xl font-bold mb-4">
                                Sistem Pengelolaan Anggaran dan Dana Terpadu
                            </h1>
                            <p className='text-center md:text-left '>Platform digital terintegrasi untuk pengelolaan dan transparansi anggaran yang akuntabel, efisien, dan dapat diakses oleh publik secara real-time.</p>
                        </div>
                        <div className='flex md:justify-end justify-center col-span-2 md:col-span-1 min-h-90'>
                            {/* <Image src={'/gue.png'} width={300} height={500} alt='foto' /> */}
                        </div>
                    </div>
                </section>

                {/* Statistics Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {statistics && (
                        <StatisticsCard statistics={statistics} />
                    )}
                </div>
                {/* Charts Section */}
                <section id="statistik" className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualisasi Data Anggaran</h2>
                            <p className="text-gray-600">Pantau penggunaan anggaran Direktorat</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Pie Chart */}
                            <AlokasiAnggaranPerKlasifikasi categories={categories} />

                            {/* Line Chart */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Realisasi vs Prognosis</h3>
                                <div className="h-80">
                                    <Line
                                        data={monthlySpendingData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context) {
                                                            let label = context.dataset.label || '';
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            label += 'Rp ' + formatNumber(Number(context.parsed) * 1000000000);
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    ticks: {
                                                        callback: function (value) {
                                                            return 'Rp ' + (Number(value) / 1000) + 'T';
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <CapaianRealisasiPerKlasifikasi categories={categories} />
                        </div>
                    </div>
                </section>

                {/* Recent Transactions */}
                <section id="proyek" className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ExpenditureTable />
                    </div>
                </section>

                {/* Achievement Section */}
                {/* <section className="py-12 grid place-content-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">

                    <Link href={'/admin'} className='bg-blue-700 transition-all hover:bg-blue-800 w-max p-4 rounded-xl shadow-2xl font-bold cursor-pointer flex gap-2 items-center'>Masuk Dashboard <ArrowRight /> </Link>
                </section> */}

                {/* Footer */}
                <footer id="kontak" className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <Activity className="text-white text-xl" />
                                    </div>
                                    <span className="ml-3 text-xl font-bold">SiPanda</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Platform digital terintegrasi untuk pengelolaan dan transparansi anggaran yang akuntabel, efisien, dan dapat diakses oleh publik secara real-time.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li><Link href="/admin" className="hover:text-white transition">Dashboard</Link></li>
                                    {/* <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                                    <li><a href="#" className="hover:text-white transition">FAQ</a></li> */}
                                </ul>
                            </div>
                            {/* <div>
                                <h3 className="text-lg font-semibold mb-4">Dokumen</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Laporan Tahunan</a></li>
                                    <li><a href="#" className="hover:text-white transition">APBD</a></li>
                                    <li><a href="#" className="hover:text-white transition">Laporan Keuangan</a></li>
                                    <li><a href="#" className="hover:text-white transition">Audit BPK</a></li>
                                </ul>
                            </div> */}
                            {/* <div>
                                <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>Jl. Pemerintah No. 1</li>
                                    <li>Kota Administrasi, 12345</li>
                                    <li>email@pemerintah.go.id</li>
                                    <li>(021) 1234-5678</li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                            <p>&copy; 2025 Pemerintah Kota. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}