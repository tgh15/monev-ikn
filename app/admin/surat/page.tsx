'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight, X, Mail } from 'lucide-react';

export default function PerjalananDinas() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showSuratForm, setShowSuratForm] = useState(false);
    const [participants, setParticipants] = useState(['Ahmad Surya', 'Budi Santoso']);
    const [newParticipant, setNewParticipant] = useState('');
    const itemsPerPage = 5;

    const stats = [
        { label: 'Perjalanan Dinas Aktif', value: 12, bgColor: 'bg-blue-50', iconColor: 'bg-blue-100', textColor: 'text-blue-600' },
        { label: 'Telah Disetujui', value: 8, bgColor: 'bg-green-50', iconColor: 'bg-green-100', textColor: 'text-green-600' },
        { label: 'Menunggu Persetujuan', value: 3, bgColor: 'bg-orange-50', iconColor: 'bg-orange-100', textColor: 'text-orange-600' },
        { label: 'Ditolak', value: 1, bgColor: 'bg-red-50', iconColor: 'bg-red-100', textColor: 'text-red-600' },
    ];

    const allTravels = [
        { no: '001/SPPD/VI/2023', tanggal: '10 Jun 2023', perihal: 'Perjalanan Dinas ke Jakarta', tujuan: 'Jakarta', file: 'surat_jakarta.pdf' },
        { no: '002/SPPD/VII/2023', tanggal: '15 Jul 2023', perihal: 'Perjalanan Dinas ke Bandung', tujuan: 'Bandung', file: 'surat_bandung.pdf' },
        { no: '003/SPPD/VII/2023', tanggal: '18 Okt 2023', perihal: 'Perjalanan Dinas ke Surabaya', tujuan: 'Surabaya', file: 'surat_surabaya.pdf' },
        { no: '004/SPPD/VII/2023', tanggal: '20 Okt 2023', perihal: 'Perjalanan Dinas ke Yogyakarta', tujuan: 'Yogyakarta', file: 'surat_yogyakarta.pdf' },
        { no: '005/SPPD/VII/2023', tanggal: '25 Okt 2023', perihal: 'Perjalanan Dinas ke Semarang', tujuan: 'Semarang', file: 'surat_semarang.pdf' },
        { no: '006/SPPD/VII/2023', tanggal: '28 Okt 2023', perihal: 'Perjalanan Dinas ke Bali', tujuan: 'Bali', file: 'surat_bali.pdf' },
    ];

    const totalPages = Math.ceil(allTravels.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTravels = allTravels.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleAddParticipant = () => {
        if (newParticipant.trim()) {
            setParticipants([...participants, newParticipant.trim()]);
            setNewParticipant('');
        }
    };

    const handleRemoveParticipant = (index: number) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    return (
        <div>


            {/* Content */}
            <div className="p-8">
                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <Mail className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Surat</h2>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No Surat</label>
                            <input
                                type="text"
                                placeholder="Masukkan nomor surat"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Surat</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Perihal Surat</label>
                        <input
                            type="text"
                            placeholder="Masukkan perihal surat"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kota Tujuan</label>
                            <input
                                type="text"
                                placeholder="Masukkan kota tujuan"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Berangkat</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kembali</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Surat (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Partisipan</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Masukkan nama partisipan"
                                value={newParticipant}
                                onChange={(e) => setNewParticipant(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddParticipant}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                Tambah
                            </button>
                        </div>

                        <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Daftar Partisipan:</p>
                            <div className="flex flex-wrap gap-2">
                                {participants.map((participant, index) => (
                                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                                        <span>{participant}</span>
                                        <button
                                            onClick={() => handleRemoveParticipant(index)}
                                            className="hover:bg-blue-200 rounded-full p-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
                        Simpan Surat
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">No Surat</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Perihal</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Tujuan</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">File</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentTravels.map((travel, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-800">{indexOfFirstItem + index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.no}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.tanggal}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.perihal}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.tujuan}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{travel.file}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="bg-blue-900 text-white px-3 py-1 rounded text-xs hover:bg-blue-800 transition">
                                                    Unduh
                                                </button>
                                                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition">
                                                    Edit
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