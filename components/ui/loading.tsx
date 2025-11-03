export default function LoadingPage() {
    return (
        <div className=" flex items-center justify-center">
            <div className="text-center">
                {/* Spinner Animation */}
                <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
                </div>

                {/* Loading Text */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                        Loading
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Mohon tunggu sebentar...
                    </p>
                </div>

                {/* Animated Dots */}
                <div className="flex justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
}