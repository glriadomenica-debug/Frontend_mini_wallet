import { useNavigate } from "react-router-dom";

interface HeaderDashboardProps {
  onMenuClick: () => void;
}

export default function HeaderDashboard({ onMenuClick }: HeaderDashboardProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const getUserName = () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        return "Administrator";
      }

      const parsedUser = JSON.parse(user);

      return (
        parsedUser.username ||
        parsedUser.name ||
        parsedUser.email ||
        "Administrator"
      );
    } catch {
      return "Administrator";
    }
  };

  const userName = getUserName();
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#DDE8D8]">
      <div className="h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-xl
              bg-[#F4F7EF]
              text-[#07552F]
              hover:bg-[#D9FF75]
              hover:text-[#063B25]
              transition
            "
            aria-label="Open menu"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>

          <div>
            <p className="text-xs font-medium text-[#6B7D71]">Welcome back</p>

            <h2 className="text-lg font-bold text-[#063B25]">{userName}</h2>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F4F7EF] border border-[#D9E8D3]">
            <div className="w-2 h-2 rounded-full bg-[#1B7A3D] animate-pulse" />

            <span className="text-xs font-semibold text-[#07552F]">Admin</span>
          </div>

          {/* User Avatar */}
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gradient-to-br from-[#07552F] to-[#1B7A3D] items-center justify-center text-[#B8F23D] font-bold text-sm shadow-sm">
            {userInitial}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              px-3
              sm:px-4
              py-2.5
              rounded-xl
              bg-red-50
              border
              border-red-100
              text-red-500
              hover:bg-red-100
              hover:text-red-600
              text-sm
              font-semibold
              transition-all
              cursor-pointer
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M10 17l5-5-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path d="M15 12H3" strokeLinecap="round" />

              <path d="M21 19V5a2 2 0 0 0-2-2h-6" strokeLinecap="round" />
            </svg>

            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
