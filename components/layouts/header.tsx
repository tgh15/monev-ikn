'use client';
export default function Header() {
    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/"; // redirect ke login
    };
    return (
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
                Sistem Pengelolaan Anggaran dan Dana Terpadu
            </h1>
            <div className="flex items-center gap-4">
                {/* <span className="text-gray-600">
                    Selamat datang, <strong>Admin</strong>
                </span> */}

                <button onClick={handleLogout}
                    className="bg-blue-900 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    Keluar
                </button>
            </div>
        </div>
    );
}
