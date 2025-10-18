'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Home, Building2, Wallet, TrendingUp, FileText, Settings, Bell, Search, Menu, X, DollarSign, AlertCircle } from 'lucide-react';

export default function Dashboard() {
    const realisasiAnggaranData = [
        { bulan: 'Jan', anggaran: 450000000, realisasi: 380000000 },
        { bulan: 'Feb', anggaran: 450000000, realisasi: 420000000 },
        { bulan: 'Mar', anggaran: 450000000, realisasi: 435000000 },
        { bulan: 'Apr', anggaran: 450000000, realisasi: 425000000 },
        { bulan: 'Mei', anggaran: 450000000, realisasi: 440000000 },
        { bulan: 'Jun', anggaran: 450000000, realisasi: 445000000 },
    ];

    const trendPenyerapanData = [
        { bulan: 'Jan', persentase: 84 },
        { bulan: 'Feb', persentase: 93 },
        { bulan: 'Mar', persentase: 97 },
        { bulan: 'Apr', persentase: 94 },
        { bulan: 'Mei', persentase: 98 },
        { bulan: 'Jun', persentase: 99 },
    ];

    const bidangAnggaranData = [
        { name: 'Pendidikan', value: 1500000000 },
        { name: 'Kesehatan', value: 1200000000 },
        { name: 'Infrastruktur', value: 1000000000 },
        { name: 'Sosial', value: 800000000 },
        { name: 'Administrasi', value: 500000000 },
    ];

    const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a'];

    const stats = [
        {
            title: 'Total Anggaran',
            value: 'Rp 5,4 M',
            change: 'Tahun 2025',
            icon: Wallet,
            color: 'bg-blue-600',
            subtitle: 'APBD Tahunan'
        },
        {
            title: 'Realisasi Anggaran',
            value: 'Rp 2,6 M',
            change: '+12% dari bulan lalu',
            icon: DollarSign,
            color: 'bg-green-600',
            subtitle: 'Total terpakai'
        },
        {
            title: 'Persentase Serapan',
            value: '48.7%',
            change: '+3.2% dari target',
            icon: TrendingUp,
            color: 'bg-purple-600',
            subtitle: 'Semester I'
        },
        {
            title: 'Sisa Anggaran',
            value: 'Rp 2,8 M',
            change: '51.3% tersisa',
            icon: AlertCircle,
            color: 'bg-amber-600',
            subtitle: '6 bulan tersisa'
        },
    ];

    const pengajuanTerbaru = [
        {
            kode: 'PGJ-2025-001',
            dinas: 'Dinas Pendidikan',
            kegiatan: 'Renovasi SD Negeri 5',
            nominal: 'Rp 450.000.000',
            status: 'Disetujui'
        },
        {
            kode: 'PGJ-2025-002',
            dinas: 'Dinas Kesehatan',
            kegiatan: 'Pengadaan Alat Medis',
            nominal: 'Rp 320.000.000',
            status: 'Proses'
        },
        {
            kode: 'PGJ-2025-003',
            dinas: 'Dinas PU',
            kegiatan: 'Pembangunan Jalan Lingkar',
            nominal: 'Rp 850.000.000',
            status: 'Review'
        },
        {
            kode: 'PGJ-2025-004',
            dinas: 'Dinas Sosial',
            kegiatan: 'Bantuan Sosial Warga',
            nominal: 'Rp 180.000.000',
            status: 'Disetujui'
        },
    ];

    const menuItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: Building2, label: 'Dinas/OPD', active: false },
        { icon: Wallet, label: 'Anggaran', active: false },
        { icon: FileText, label: 'Laporan', active: false },
        { icon: TrendingUp, label: 'Analisis', active: false },
        { icon: Settings, label: 'Pengaturan', active: false },
    ];

    const formatCurrency = (value: number) => {
        return `${(value / 1000000).toFixed(0)}M`;
    };

    return (
        <>
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{stat.title}</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                        <p className="text-xs text-gray-600 mb-2">{stat.subtitle}</p>
                                        <p className="text-sm text-blue-600 font-medium">{stat.change}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                                        <stat.icon className="text-white" size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Realisasi Anggaran */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Realisasi vs Anggaran</h3>
                                <p className="text-sm text-gray-500">Perbandingan bulanan (dalam Juta Rupiah)</p>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={realisasiAnggaranData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="bulan" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
                                    <Tooltip
                                        formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)} Juta`}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    />
                                    <Bar dataKey="anggaran" fill="#93c5fd" name="Anggaran" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="realisasi" fill="#2563eb" name="Realisasi" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Trend Penyerapan */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Trend Penyerapan Anggaran</h3>
                                <p className="text-sm text-gray-500">Persentase penyerapan per bulan</p>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={trendPenyerapanData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="bulan" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="persentase"
                                        stroke="#7c3aed"
                                        strokeWidth={3}
                                        dot={{ fill: '#7c3aed', r: 5 }}
                                        activeDot={{ r: 7 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Pengajuan Terbaru */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
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
                            </div>
                        </div>

                        {/* Distribusi per Bidang */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Alokasi per Bidang</h3>
                                <p className="text-sm text-gray-500">Distribusi anggaran</p>
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={bidangAnggaranData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {bidangAnggaranData.map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => `Rp ${(value / 1000000000).toFixed(1)} M`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-3">
                                {bidangAnggaranData.map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: COLORS[idx] }}></div>
                                            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">Rp {(cat.value / 1000000000).toFixed(1)} M</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}