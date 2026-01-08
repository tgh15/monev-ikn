'use client'
import { JSX, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Image, File, Edit, Trash } from 'lucide-react';
import ExpendituresAdd from './expenditures-add';
import { useQuery } from '@tanstack/react-query';
import { getExpenditure } from '@/lib/api/expenditure';
import LoadingPage from '../ui/loading';
import ExpenditureEdit from './expenditures-edit';
import ExpenditureDelete from './expenditure-delete';

interface ExpenditureProps {
    id?: string
}

export default function ExpenditureTable({ id }: ExpenditureProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['expenditure'],
        queryFn: () => getExpenditure(id)
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Belum Ada Pengeluaran
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-sm">
                    Mulai catat pengeluaran Anda untuk kategori ini agar lebih mudah mengelola keuangan
                </p>
                {id && (
                    <ExpendituresAdd id={id} />
                )}
            </div>
        );
    }

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Fungsi untuk navigasi halaman
    const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToPrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    // Formatters
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    // Badge status
    type StatusType = 'selesai' | 'proses_pertanggungjawaban' | 'belum_selesai';
    const getStatusBadge = (status: StatusType) => {
        const styles: Record<StatusType, string> = {
            selesai: 'bg-red-100 text-red-800',
            proses_pertanggungjawaban: 'bg-blue-100 text-blue-800',
            belum_selesai: 'bg-yellow-100 text-yellow-800',
        };

        const labels: Record<StatusType, string> = {
            selesai: 'Selesai',
            proses_pertanggungjawaban: 'Proses',
            belum_selesai: 'Belum Selesai',
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    // File icon
    const getFileIcon = (fileType: string): JSX.Element => {
        if (fileType === 'pdf') return <FileText className="w-4 h-4" />;
        if (['jpg', 'jpeg', 'png'].includes(fileType)) return <Image className="w-4 h-4" />;
        return <File className="w-4 h-4" />;
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Data Pengeluaran</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} dari {data.length} data
                        </p>
                    </div>
                    {id && (
                        <ExpendituresAdd id={id} />
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                {id && (
                                    <>
                                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lampiran</th> */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.map((item, index) => {
                                return (

                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{indexOfFirstItem + index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            {item.description && (
                                                <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{formatCurrency(item.amount)}</td>
                                        <td className="px-6 py-4">{getStatusBadge(item.status as StatusType)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(item.expenditureDate)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                {/* render attachment icons here */}
                                            </div>
                                        </td>
                                        {id && (
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <ExpenditureEdit data={item} />
                                                    <ExpenditureDelete id={item._id} />
                                                </div>
                                            </td>
                                        )}

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={goToPrevious}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNext}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Halaman <span className="font-medium">{currentPage}</span> dari{' '}
                                <span className="font-medium">{totalPages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={goToPrevious}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {[...Array(totalPages)].map((_, idx) => {
                                    const pageNum = idx + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => goToPage(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                                                ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={goToNext}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
