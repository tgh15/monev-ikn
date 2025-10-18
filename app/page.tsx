// pages/index.js
'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Activity, ActivityIcon, ArrowBigRight, ArrowRight, Award, CheckCircle, ChevronRight, Clock, DollarSign, Download, Filter, Menu, Search, TrendingUp, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function TransparencyLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2024');
    const [searchQuery, setSearchQuery] = useState('');
    const [animatedNumbers, setAnimatedNumbers] = useState({
        totalBudget: 0,
        projectsCompleted: 0,
        activeProjects: 0,
        citizensServed: 0
    });

    // Data untuk grafik
    const budgetAllocationData = {
        labels: ['Pendidikan', 'Kesehatan', 'Infrastruktur', 'Sosial', 'Keamanan', 'Lainnya'],
        datasets: [
            {
                label: 'Alokasi Anggaran (Miliar Rupiah)',
                data: [450, 380, 520, 290, 340, 180],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(147, 51, 234, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(107, 114, 128, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(251, 146, 60)',
                    'rgb(147, 51, 234)',
                    'rgb(236, 72, 153)',
                    'rgb(107, 114, 128)'
                ],
                borderWidth: 2,
            },
        ],
    };

    const monthlySpendingData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
            {
                label: 'Realisasi Anggaran',
                data: [120, 135, 128, 145, 160, 155, 170, 165, 180, 175, 190, 185],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Target Anggaran',
                data: [130, 130, 130, 140, 150, 150, 160, 160, 170, 170, 180, 180],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const departmentComparisonData = {
        labels: ['Dinas Pendidikan', 'Dinas Kesehatan', 'Dinas PU', 'Dinas Sosial', 'Dinas Perhubungan'],
        datasets: [
            {
                label: 'Anggaran Digunakan (%)',
                data: [78, 82, 75, 88, 71],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Target Penggunaan (%)',
                data: [80, 80, 80, 80, 80],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
            },
        ],
    };

    // Animasi angka
    useEffect(() => {
        const targetNumbers = {
            totalBudget: 2160000000000,
            projectsCompleted: 342,
            activeProjects: 128,
            citizensServed: 1250000
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const recentTransactions = [
        { id: 1, department: 'Dinas Pendidikan', project: 'Renovasi SD Negeri 01', amount: 250000000, date: '2024-01-15', status: 'completed' },
        { id: 2, department: 'Dinas Kesehatan', project: 'Pengadaan Alkes Puskesmas', amount: 180000000, date: '2024-01-14', status: 'completed' },
        { id: 3, department: 'Dinas PU', project: 'Perbaikan Jalan Protokol', amount: 450000000, date: '2024-01-13', status: 'in-progress' },
        { id: 4, department: 'Dinas Sosial', project: 'Bantuan Sosial Warga', amount: 120000000, date: '2024-01-12', status: 'completed' },
        { id: 5, department: 'Dinas Perhubungan', project: 'Pengadaan Bus Sekolah', amount: 320000000, date: '2024-01-11', status: 'in-progress' },
    ];

    return (
        <>
            <Head>
                <title>Portal Transparansi Anggaran - Pemerintah Kota</title>
                <meta name="description" content="Portal transparansi anggaran pemerintah kota untuk keterbukaan informasi publik" />
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
                            <div className="hidden md:flex items-center space-x-4">
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
                            </div>
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
                        <div className='flex md:justify-end justify-center col-span-2 md:col-span-1'>
                            <Image src={'/gue.png'} width={300} height={500} alt='foto' />
                        </div>
                    </div>
                </section>

                {/* Statistics Cards */}
                <section className="py-12 -mt-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <DollarSign className="text-blue-600 text-2xl" />
                                    </div>
                                    <span className="text-green-500 text-sm font-medium flex items-center">
                                        <TrendingUp className="mr-1" />
                                        +12.5%
                                    </span>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-1">Total Anggaran</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(animatedNumbers.totalBudget)}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Tahun Anggaran {selectedYear}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="text-green-600 text-2xl" />
                                    </div>
                                    <span className="text-green-500 text-sm font-medium flex items-center">
                                        <TrendingUp className="mr-1" />
                                        +8.3%
                                    </span>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-1">Proyek Selesai</h3>
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
                                <h3 className="text-gray-600 text-sm mb-1">Proyek Berjalan</h3>
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
                                    <span className="text-green-500 text-sm font-medium flex items-center">
                                        <TrendingUp className="mr-1" />
                                        +15.2%
                                    </span>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-1">Warga Terlayani</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatNumber(animatedNumbers.citizensServed)}+
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Penerima manfaat</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Charts Section */}
                <section id="statistik" className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualisasi Data Anggaran</h2>
                            <p className="text-gray-600">Pantau real-time penggunaan anggaran pemerintah</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Pie Chart */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alokasi Anggaran per Sektor</h3>
                                <div className="h-80">
                                    <Pie
                                        data={budgetAllocationData}
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
                                                            let label = context.label || '';
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            label += 'Rp ' + formatNumber(context.parsed * 1000000000);
                                                            return label;
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Line Chart */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Realisasi vs Target Bulanan</h3>
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
                                                            label += 'Rp ' + formatNumber(context.parsed * 1000000000);
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
                                                            return 'Rp ' + (value / 1000) + 'T';
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-gray-50 rounded-xl p-6 lg:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Capaian Anggaran per Dinas</h3>
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
                        </div>
                    </div>
                </section>

                {/* Recent Transactions */}
                <section id="proyek" className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Transaksi Terkini</h2>
                                <p className="text-gray-600">Pantau penggunaan anggaran secara real-time</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                                Lihat Semua
                                <ChevronRight className="ml-1" />
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dinas</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyek</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {transaction.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {transaction.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {transaction.project}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatCurrency(transaction.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {transaction.status === 'completed' ? 'Selesai' : 'Berjalan'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                                                    Detail
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievement Section */}
                <section className="py-12 grid place-content-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Pencapaian Kami</h2>
                            <p className="text-blue-100">Komitmen kami untuk transparansi dan akuntabilitas</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="text-4xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sertifikasi ISO 9001</h3>
                                <p className="text-blue-100">Sistem manajemen mutu terstandar internasional</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="text-4xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Audit Bersih</h3>
                                <p className="text-blue-100">5 tahun berturut-turut tanpa temuan signifikan</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="text-4xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Efisiensi 95%</h3>
                                <p className="text-blue-100">Penggunaan anggaran yang optimal dan tepat sasaran</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white">
                        <h1 className='font-bold text-blue-950'>Masuk Ke Dashboard</h1>
                    </div> */}
                    <Link href={'/admin'} className='bg-blue-700 transition-all hover:bg-blue-800 w-max p-4 rounded-xl shadow-2xl font-bold cursor-pointer flex gap-2 items-center'>Masuk Dashboard <ArrowRight /> </Link>
                </section>

                {/* Footer */}
                <footer id="kontak" className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <Activity className="text-white text-xl" />
                                    </div>
                                    <span className="ml-3 text-xl font-bold">SiPanda</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Portal transparansi anggaran pemerintah untuk keterbukaan informasi publik.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
                                    <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                                    <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Dokumen</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Laporan Tahunan</a></li>
                                    <li><a href="#" className="hover:text-white transition">APBD</a></li>
                                    <li><a href="#" className="hover:text-white transition">Laporan Keuangan</a></li>
                                    <li><a href="#" className="hover:text-white transition">Audit BPK</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>Jl. Pemerintah No. 1</li>
                                    <li>Kota Administrasi, 12345</li>
                                    <li>email@pemerintah.go.id</li>
                                    <li>(021) 1234-5678</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                            <p>&copy; 2024 Pemerintah Kota. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}