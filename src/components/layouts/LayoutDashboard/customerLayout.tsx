import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const isDashboard = location.pathname === "/dashboard";

  const isTransactions = location.pathname.startsWith(
    "/dashboard/transactions",
  );

  // Ambil nama user
  const userName = user?.username || user?.name || user?.full_name || "User";

  // Ambil huruf pertama untuk avatar
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F4F7EF]">
      <div className="flex min-h-screen">
        {/* =====================================================
            SIDEBAR
        ===================================================== */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-0 flex h-screen flex-col bg-[#063B25]">
            {/* =================================================
                LOGO
            ================================================= */}
            <div className="px-6 py-7">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B8F23D] text-[#063B25] shadow-lg">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M16 12h.01" />
                    <path d="M6 9h8" />
                  </svg>
                </div>

                <div className="text-left">
                  <p className="text-lg font-bold tracking-tight text-white">
                    MyWallet
                  </p>

                  <p className="text-xs text-[#B8F23D]">Customer</p>
                </div>
              </button>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================= */}
            <nav className="flex-1 px-4 py-5">
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Main Menu
              </p>

              {/* DASHBOARD */}
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isDashboard
                    ? "bg-[#B8F23D] text-[#063B25] shadow-lg shadow-black/10"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isDashboard ? "bg-[#063B25]/10" : "bg-white/10"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                Dashboard
              </button>

              {/* TRANSACTIONS */}
              <button
                type="button"
                onClick={() => navigate("/dashboard/transactions")}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isTransactions
                    ? "bg-[#B8F23D] text-[#063B25] shadow-lg shadow-black/10"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isTransactions ? "bg-[#063B25]/10" : "bg-white/10"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                </div>
                Transactions
              </button>
            </nav>

            {/* =================================================
                BOTTOM
            ================================================= */}
            <div className="border-t border-white/10 p-4">
              {/* ACCOUNT */}
              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                {/* USER AVATAR */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B8F23D] text-sm font-bold text-[#063B25]">
                  {userInitial}
                </div>

                {/* USER INFO */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {userName}
                  </p>

                  <p className="truncate text-xs text-white/40">Customer</p>
                </div>
              </div>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <path d="M16 17l5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}
        <main className="min-w-0 flex-1">
          {/* =================================================
              MOBILE HEADER
          ================================================= */}
          <header className="sticky top-0 z-30 border-b border-[#DDE5D5] bg-[#F4F7EF]/95 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#063B25] text-[#B8F23D]">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M16 12h.01" />
                  </svg>
                </div>

                <span className="font-bold text-[#123524]">MyWallet</span>
              </button>

              <div className="flex items-center gap-2">
                {/* MOBILE USER */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B8F23D] text-xs font-bold text-[#063B25]">
                  {userInitial}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[#1B7A3D] transition hover:bg-[#D9FF75]/40"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* =================================================
              CONTENT
          ================================================= */}
          <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
