'use client';
import { Building2, FileText, Home, Menu, Settings, TrendingUp, Wallet, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layouts/header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const menuItems = [
        { icon: Home, label: 'Dashboard', active: true, link: '/admin' },
        { icon: Wallet, label: 'Monev', active: false, link: '/admin/monev' },
        // { icon: Building2, label: 'Perjalanan Dinas', active: false, link: '/admin/perjalanan-dinas' },
        // { icon: Wallet, label: 'Surat', active: false, link: '/admin/surat' },
        // { icon: FileText, label: 'Notulensi', active: false, link: '/admin/notulensi' },
        // { icon: TrendingUp, label: 'Ajuan Perjalanan', active: false, link: '/admin/' },
        // { icon: Settings, label: 'Pengaturan', active: false, link: '/admin/' },
    ];
    return (
        <>
            {/* Sidebar */}
            {/* <div className="w-64 bg-blue-900 text-white flex flex-col">
                <div className="p-6 text-center border-b border-blue-800">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-900 font-bold text-xl">KO</span>
                    </div>
                    <h2 className="font-bold text-lg">AKURAT</h2>
                </div>

                <nav className="flex-1 py-4">
                    <Link href="/" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Dashboard</span>
                    </Link>
                    <Link href="perjalanan-dinas" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Perjalanan Dinas</span>
                    </Link>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Kwitansi</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Menginap</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>SPPD</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Laporan</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Komputasi</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>Ajuan Perjalanan</span>
                    </a>
                    <Link className="flex items-center px-6 py-3 hover:bg-blue-800 transition" href={'/surat'}>
                        Surat
                    </Link>
                    <Link className="flex items-center px-6 py-3 hover:bg-blue-800 transition" href={'/notulensi'}>
                        Notulensi
                    </Link>

                    <a href="#" className="flex items-center px-6 py-3 hover:bg-blue-800 transition">
                        <span>History</span>
                    </a>
                </nav>
            </div> */}
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-950 text-white transition-all duration-300 ease-in-out shadow-2xl`}>
                <div className="flex items-center justify-between p-4 border-b border-blue-800">
                    {sidebarOpen && (
                        // <div>
                        //     <h1 className="text-xl font-bold">SIPADU</h1>
                        //     <p className="text-xs text-blue-300">Sistem Pengelolaan Anggaran Daerah</p>
                        // </div>
                        <>

                            <h2 className="font-bold text-lg text-center">SIPANDA</h2>
                        </>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item, idx) => {
                        const isActive = pathname === item.link || pathname.startsWith(item.link + "/admin");
                        return (
                            <Link href={item.link}
                                key={idx}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* {sidebarOpen && (
                    <div className="absolute bottom-4 left-4 right-4 bg-blue-800 rounded-lg p-4">
                        <p className="text-xs text-blue-300 mb-1">Periode Anggaran</p>
                        <p className="text-sm font-semibold">Januari - Desember 2025</p>
                    </div>
                )} */}
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <Header />
                {children}
            </div>
        </>
    )

}