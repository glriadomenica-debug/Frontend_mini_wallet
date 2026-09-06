import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center shadow-sm">
            <svg
              width="22"
              height="22"
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
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#063B25]">
              Admin Dashboard
            </h1>

            <p className="text-sm text-[#6B7D71] mt-1">
              Manage customers, wallets, and transactions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#07552F] to-[#1B7A3D] rounded-2xl p-5 text-white shadow-lg shadow-[#063B25]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/65">Customer Management</p>

              <p className="text-xl font-bold mt-1">Customers</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <svg
                width="22"
                height="22"
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

                <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />

                <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="text-xs text-white/55 mt-4">
            Create and manage wallet customers
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#063B25] to-[#07552F] rounded-2xl p-5 text-white shadow-lg shadow-[#063B25]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/65">Wallet Management</p>

              <p className="text-xl font-bold mt-1">Balance</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#B8F23D]/15 border border-[#B8F23D]/20 flex items-center justify-center text-[#B8F23D]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />

                <path d="M16 12h.01" strokeWidth="3" />

                <path d="M7 12h5" strokeLinecap="round" />

                <path d="M9.5 9.5v5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="text-xs text-white/55 mt-4">
            Add balance and manage payments
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#1B7A3D] to-[#07552F] rounded-2xl p-5 text-white shadow-lg shadow-[#063B25]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/65">Transaction Management</p>

              <p className="text-xl font-bold mt-1">Transactions</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />

                <path d="M3 10h18" strokeLinecap="round" />

                <path d="M7 15h4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="text-xs text-white/55 mt-4">
            Monitor customer wallet activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="group bg-white rounded-2xl border border-[#DDE8D8] p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EAF6D5] text-[#07552F] flex items-center justify-center">
                <svg
                  width="23"
                  height="23"
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

                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />

                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#063B25]">
                  Customer Management
                </h2>

                <p className="text-sm text-[#718178] mt-0.5">
                  Manage Mini Wallet customers
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/customers/create"
              className="inline-flex items-center gap-2 bg-[#07552F] hover:bg-[#063B25] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <span className="text-lg leading-none">+</span>
              Create Customer
            </Link>

            <Link
              to="/admin/customers"
              className="inline-flex items-center gap-2 bg-[#F0F8E7] hover:bg-[#E3F3CF] text-[#07552F] px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              View Customers
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="group bg-white rounded-2xl border border-[#DDE8D8] p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D9FF75]/45 text-[#063B25] flex items-center justify-center">
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />

                <path d="M16 12h.01" strokeWidth="3" />

                <path d="M7 12h5" strokeLinecap="round" />

                <path d="M9.5 9.5v5" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#063B25]">
                Wallet Management
              </h2>

              <p className="text-sm text-[#718178] mt-0.5">
                Manage balances and payments
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/wallet/add"
              className="inline-flex items-center gap-2 bg-[#1B7A3D] hover:bg-[#07552F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <span className="text-lg leading-none">+</span>
              Add Balance
            </Link>

            <Link
              to="/admin/wallet/shopee-payment"
              className="inline-flex items-center gap-2 bg-[#F4F7EF] hover:bg-[#E7F1DE] text-[#07552F] px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Shopee Payment
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 group bg-white rounded-2xl border border-[#DDE8D8] p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3EA] text-[#1B7A3D] flex items-center justify-center shrink-0">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />

                  <path d="M3 10h18" strokeLinecap="round" />

                  <path d="M7 15h4" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#063B25]">
                  Transaction Management
                </h2>

                <p className="text-sm text-[#718178] mt-1">
                  View and monitor customer wallet transactions.
                </p>
              </div>
            </div>

            <Link
              to="/admin/transactions"
              className="inline-flex items-center justify-center gap-2 bg-[#063B25] hover:bg-[#07552F] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              View Transactions
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
