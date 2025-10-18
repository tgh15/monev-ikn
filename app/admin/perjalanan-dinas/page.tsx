'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PerjalananDinas() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const stats = [
        { label: 'Perjalanan Dinas Aktif', value: 12, bgColor: 'bg-blue-50', iconColor: 'bg-blue-100', textColor: 'text-blue-600' },
        { label: 'Telah Disetujui', value: 8, bgColor: 'bg-green-50', iconColor: 'bg-green-100', textColor: 'text-green-600' },
        { label: 'Menunggu Persetujuan', value: 3, bgColor: 'bg-orange-50', iconColor: 'bg-orange-100', textColor: 'text-orange-600' },
        { label: 'Ditolak', value: 1, bgColor: 'bg-red-50', iconColor: 'bg-red-100', textColor: 'text-red-600' },
    ];

    const allTravels = [
        { no: 'SPD/2023/0001', tujuan: 'Jakarta', tanggalBerangkat: '10 Okt 2023', tanggalKembali: '15 Okt 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0002', tujuan: 'Bandung', tanggalBerangkat: '12 Okt 2023', tanggalKembali: '14 Okt 2023', status: 'Menunggu' },
        { no: 'SPD/2023/0003', tujuan: 'Surabaya', tanggalBerangkat: '18 Okt 2023', tanggalKembali: '22 Okt 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0004', tujuan: 'Yogyakarta', tanggalBerangkat: '20 Okt 2023', tanggalKembali: '23 Okt 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0005', tujuan: 'Semarang', tanggalBerangkat: '25 Okt 2023', tanggalKembali: '27 Okt 2023', status: 'Menunggu' },
        { no: 'SPD/2023/0006', tujuan: 'Bali', tanggalBerangkat: '28 Okt 2023', tanggalKembali: '02 Nov 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0007', tujuan: 'Medan', tanggalBerangkat: '05 Nov 2023', tanggalKembali: '08 Nov 2023', status: 'Ditolak' },
        { no: 'SPD/2023/0008', tujuan: 'Makassar', tanggalBerangkat: '10 Nov 2023', tanggalKembali: '13 Nov 2023', status: 'Menunggu' },
        { no: 'SPD/2023/0009', tujuan: 'Palembang', tanggalBerangkat: '15 Nov 2023', tanggalKembali: '18 Nov 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0010', tujuan: 'Balikpapan', tanggalBerangkat: '20 Nov 2023', tanggalKembali: '23 Nov 2023', status: 'Disetujui' },
        { no: 'SPD/2023/0011', tujuan: 'Manado', tanggalBerangkat: '25 Nov 2023', tanggalKembali: '28 Nov 2023', status: 'Menunggu' },
        { no: 'SPD/2023/0012', tujuan: 'Pontianak', tanggalBerangkat: '01 Des 2023', tanggalKembali: '04 Des 2023', status: 'Disetujui' },
    ];

    const totalPages = Math.ceil(allTravels.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTravels = allTravels.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getStatusStyle = (status: string) => {
        if (status === 'Disetujui') return 'bg-green-100 text-green-700';
        if (status === 'Menunggu') return 'bg-orange-100 text-orange-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <div>


            {/* Content */}
            <div className="p-8">
                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="text-blue-600">✈️</div>
                    <h2 className="text-xl font-semibold text-gray-800">Perjalanan Dinas</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className={`${stat.bgColor} rounded-lg p-6 shadow-sm`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 text-sm">{stat.label}</div>
                                </div>
                                <div className={`${stat.iconColor} p-3 rounded-lg`}>
                                    {index === 0 && <span className="text-blue-600 text-xl">✈️</span>}
                                    {index === 1 && <span className="text-green-600 text-xl">✓</span>}
                                    {index === 2 && <span className="text-orange-600 text-xl">🕐</span>}
                                    {index === 3 && <span className="text-red-600 text-xl">✕</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Perjalanan Dinas</h3>
                        <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2">
                            <Plus size={18} />
                            Tambah Baru
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No. SPD</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tujuan</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Berangkat</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Kembali</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentTravels.map((travel, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.no}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.tujuan}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.tanggalBerangkat}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.tanggalKembali}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(travel.status)}`}>
                                                {travel.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded transition">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="text-orange-600 hover:bg-orange-50 p-2 rounded transition">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="text-red-600 hover:bg-red-50 p-2 rounded transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allTravels.length)} dari {allTravels.length} data
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded border flex items-center gap-1 ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-3 py-1 rounded ${currentPage === index + 1
                                            ? 'bg-blue-900 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded border flex items-center gap-1 ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}