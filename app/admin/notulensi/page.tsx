'use client';

import { useState, ChangeEvent } from 'react';
import { Upload, FileText } from 'lucide-react';

export default function Notulensi() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const notulensiData = [
        {
            no: 1,
            judul: 'Rapat Koordinasi Triwulan I',
            tanggal: '15 Jan 2023',
            file: 'notulensi_rapat_januari.pdf'
        },
        {
            no: 2,
            judul: 'Rapat Evaluasi Program',
            tanggal: '28 Feb 2023',
            file: 'notulensi_evaluasi_februari.pdf'
        },
    ];

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div>


            {/* Content */}
            <div className="p-8">
                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <FileText className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Notulensi</h2>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Judul Notulensi
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan judul notulensi"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tanggal Kegiatan
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Upload Area */}
                    <div className="mb-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-900 p-4 rounded-full">
                                    <Upload className="text-white" size={32} />
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Seret dan lepas file notulensi di sini atau klik untuk mengunggah
                            </p>
                            <label className="inline-block">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <span className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition cursor-pointer inline-block">
                                    Unggah File
                                </span>
                            </label>
                            <p className="text-sm text-gray-500 mt-2">
                                Format file: PDF (maks. 10MB)
                            </p>
                            {selectedFile && (
                                <p className="text-sm text-green-600 mt-2">
                                    File dipilih: {selectedFile.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Judul Notulensi</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">File</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {notulensiData.map((item) => (
                                    <tr key={item.no} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-800">{item.no}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{item.judul}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{item.tanggal}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{item.file}</td>
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
                </div>
            </div>
        </div>
    );
}