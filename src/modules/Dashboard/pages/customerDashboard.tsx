import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  type Transaction,
  getTransactionAmount,
  getTransactionDescription,
  getTransactionDirection,
  getTransactionTitle,
  formatRupiah,
  formatTransactionDate,
  calculateTotalIncome,
  calculateTotalExpense,
} from "../../../utils/transaction";

export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/");
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }

    fetchWallet();
    fetchTransactions();
  }, []);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8000/api/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setBalance(Number(response.data?.data?.balance ?? 0));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data =
        response.data?.data ??
        response.data?.transactions ??
        response.data ??
        [];

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <>
      <div className="min-h-screen">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6C7C70]">
              Welcome back 👋
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#123524] sm:text-3xl">
              {user?.username || "Customer"}
            </h1>

            <p className="mt-1 text-sm text-[#7D8C82]">
              {user?.phone_number || "Welcome to your wallet"}
            </p>
          </div>

          <div className="hidden rounded-full border border-[#D9E4D3] bg-white px-4 py-2 sm:block">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1B7A3D]" />

              <span className="text-xs font-semibold text-[#52705E]">
                Wallet Active
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative mb-6 overflow-hidden rounded-[28px] bg-gradient-to-br 
            from-[#063B25] via-[#07552F] to-[#1B7A3D] p-6 text-white shadow-xl shadow-[#063B25]/15 sm:p-8 "
        >
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#B8F23D]/10" />
          <div className="absolute -bottom-28 -left-10 h-52 w-52 rounded-full bg-white/5" />
          <div className="absolute right-32 top-16 h-20 w-20 rounded-full bg-[#D9FF75]/5" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B8F23D] text-[#063B25]">
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

                <div>
                  <p className="text-xs font-medium text-white/60">
                    Available Balance
                  </p>

                  <p className="text-sm font-semibold text-white">
                    MyWallet Balance
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D9FF75]">
                  Active
                </span>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                $ {formatRupiah(balance)}
              </p>

              <p className="mt-2 text-xs text-white/50">
                Your current wallet balance
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-[#DDE6D8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F5D4] text-[#1B7A3D]">
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
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#7D8C82]">Money In</p>

                  <p className="mt-1 text-xl font-bold text-[#1B7A3D]">
                    + $ {formatRupiah(totalIncome)}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#E7F5D4] px-2.5 py-1 text-[10px] font-bold text-[#1B7A3D]">
                IN
              </span>
            </div>

            <p className="mt-4 text-xs text-[#91A097]">Total money received</p>
          </div>

          <div className="rounded-[22px] border border-[#DDE6D8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
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
                    <path d="M12 5v14" />
                    <path d="M19 12l-7 7-7-7" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#7D8C82]">
                    Money Out
                  </p>

                  <p className="mt-1 text-xl font-bold text-red-500">
                    - $ {formatRupiah(totalExpense)}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500">
                OUT
              </span>
            </div>

            <p className="mt-4 text-xs text-[#91A097]">Total money spent</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-[#DDE6D8] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EDF1EA] px-5 py-5 sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#123524] sm:text-xl">
                  Recent Transactions
                </h2>

                <span className="rounded-full bg-[#E7F5D4] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#1B7A3D]">
                  Activity
                </span>
              </div>

              <p className="mt-1 text-xs text-[#91A097] sm:text-sm">
                Your latest wallet activity
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard/transactions")}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                px-3
                py-2
                text-xs
                font-bold
                text-[#1B7A3D]
                transition
                hover:bg-[#EAF5DD]
              "
            >
              View All
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="px-5 sm:px-6">
            {recentTransactions.length > 0 ? (
              <div>
                {recentTransactions.map((trx, index) => {
                  const direction = getTransactionDirection(trx);

                  const isIncome = direction === "income";

                  const amount = getTransactionAmount(trx);

                  return (
                    <div
                      key={trx.id ?? index}
                      className={`flex items-center justify-between gap-4 py-4 ${index !== recentTransactions.length - 1 ? "border-b border-[#EDF1EA]" : ""}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-[#E7F5D4] text-[#1B7A3D]" : "bg-red-50 text-red-500"}`}
                        >
                          {isIncome ? (
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
                              <path d="M12 19V5" />
                              <path d="M5 12l7-7 7 7" />
                            </svg>
                          ) : (
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
                              <path d="M12 5v14" />
                              <path d="M19 12l-7 7-7-7" />
                            </svg>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#123524]">
                            {getTransactionTitle(trx)}
                          </p>

                          <p className="mt-1 truncate text-xs text-[#7D8C82]">
                            {getTransactionDescription(trx)}
                          </p>

                          <p className="mt-1 text-[11px] text-[#A0AAA4]">
                            {formatTransactionDate(trx)}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p
                          className={`text-sm font-bold ${
                            isIncome ? "text-[#1B7A3D]" : "text-red-500"
                          }`}
                        >
                          {isIncome ? "+" : "-"} $ {formatRupiah(amount)}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-[#A0AAA4]">
                          {isIncome ? "Money In" : "Money Out"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF3EA] text-[#8A998F]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />

                    <path d="M7 9h10" />
                    <path d="M7 13h6" />
                  </svg>
                </div>

                <p className="mt-4 font-semibold text-[#52665A]">
                  No transactions yet
                </p>

                <p className="mt-1 text-sm text-[#9AA59E]">
                  Your wallet activity will appear here.
                </p>
              </div>
            )}
          </div>

          {transactions.length > 5 && (
            <div className="border-t border-[#EDF1EA] px-5 py-4 text-center sm:px-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard/transactions")}
                className="
                  text-sm
                  font-bold
                  text-[#1B7A3D]
                  transition
                  hover:text-[#07552F]
                "
              >
                View all {transactions.length} transactions
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
