export default function HeaderDashboard() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight">
          Mini Wallet
        </h1>

        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Secure Finance App
        </div>
      </div>
    </header>
  );
}
