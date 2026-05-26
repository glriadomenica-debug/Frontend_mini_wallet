import { useNavigate } from "react-router-dom";

export default function HeaderDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // delete token & user
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect login
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 md:px-10 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight">
              Mini Wallet
            </h1>

            <p className="text-xs text-gray-400 mt-1">Secure Finance App</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
}
