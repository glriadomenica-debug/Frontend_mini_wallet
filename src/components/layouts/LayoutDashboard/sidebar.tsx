import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
  onClick?: () => void;
}

function MenuItem({ to, label, icon, end = false, onClick }: MenuItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `
        group
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-sm
        font-medium
        transition-all
        duration-200
        ${
          isActive
            ? "bg-[#B8F23D] text-[#063B25] shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <span
            className={`
              flex
              items-center
              justify-center
              transition
              ${
                isActive
                  ? "text-[#063B25]"
                  : "text-white/50 group-hover:text-[#B8F23D]"
              }
            `}
          >
            {icon}
          </span>

          <span>{label}</span>

          {isActive && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#063B25]" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#063B25]/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-[#063B25]
          flex
          flex-col
          shadow-2xl
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <div className="h-20 px-5 flex items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B8F23D] flex items-center justify-center text-[#063B25] shadow-lg shadow-black/10">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
                <path d="M16 14h2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">Mini Wallet</h1>

              <p className="text-[11px] text-white/50">Admin Panel</p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="
              ml-auto
              lg:hidden
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-lg
              text-white/60
              hover:bg-white/10
              hover:text-white
              transition
            "
            aria-label="Close sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* MAIN */}
          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Main
            </p>

            <div className="space-y-1">
              <MenuItem
                to="/admin"
                label="Dashboard"
                end
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                }
              />

              <MenuItem
                to="/admin/customers"
                label="Customers"
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="7" r="4" />
                    <path
                      d="M22 21v-2a4 4 0 0 0-3-3.87"
                      strokeLinecap="round"
                    />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
                  </svg>
                }
              />

              <MenuItem
                to="/admin/transactions"
                label="Transactions"
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" strokeLinecap="round" />
                    <path d="M7 15h4" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* WALLET */}
          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Wallet
            </p>

            <div className="space-y-1">
              <MenuItem
                to="/admin/wallet/add"
                label="Add Balance"
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path
                      d="M16 12h.01"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path d="M7 12h5" strokeLinecap="round" />
                    <path d="M9.5 9.5v5" strokeLinecap="round" />
                  </svg>
                }
              />

              <MenuItem
                to="/admin/wallet/shopee-payment"
                label="Shopee Payment"
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 8h16v11H4z" strokeLinejoin="round" />
                    <path d="M8 8a4 4 0 0 1 8 0" strokeLinecap="round" />
                    <path d="M8 13h8" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* CUSTOMER */}
          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Customer
            </p>

            <div className="space-y-1">
              <MenuItem
                to="/admin/customers/create"
                label="Create Customer"
                onClick={onClose}
                icon={
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="9" cy="8" r="4" />

                    <path d="M3 21a6 6 0 0 1 12 0" strokeLinecap="round" />

                    <path d="M19 8v6M16 11h6" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </div>
        </nav>

        {/* BOTTOM INFO */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#B8F23D] animate-pulse" />

              <p className="text-xs font-bold text-white">System Active</p>
            </div>

            <p className="text-[11px] text-white/50 mt-2 leading-relaxed">
              Mini Wallet administration panel
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
