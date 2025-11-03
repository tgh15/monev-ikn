
export default function Header() {

    return (
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
                Sistem Pengelolaan Anggaran dan Dana Terpadu
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">
                    Selamat datang, <strong>Admin</strong>
                </span>

                <button
                    className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    Keluar
                </button>
            </div>
        </div>
    );
}
