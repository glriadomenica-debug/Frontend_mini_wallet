import { useEffect, useMemo, useState } from "react";
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
} from "../../../../utils/transaction";

type FilterType = "all" | "income" | "expense";

export default function TransactionHistory() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found.");
          return;
        }

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

        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          setTransactions([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch transactions:", err);

        setError(
          err?.response?.data?.message || "Failed to load transactions.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalIncome = useMemo(() => {
    return calculateTotalIncome(transactions);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return calculateTotalExpense(transactions);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return transactions.filter((transaction) => {
      const direction = getTransactionDirection(transaction);

      if (filter !== "all" && direction !== filter) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const title = getTransactionTitle(transaction).toLowerCase();
      const description = getTransactionDescription(transaction).toLowerCase();
      const type = String(transaction.type || "").toLowerCase();

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        type.includes(keyword)
      );
    });
  }, [transactions, filter, search]);

  const getIcon = (transaction: Transaction) => {
    const direction = getTransactionDirection(transaction);

    if (direction === "income") {
      return (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9FF75] text-[#063B25]">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19V5m0 0l-6 6m6-6l6 6"
            />
          </svg>
        </div>
      );
    }

    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14m0 0l6-6m-6 6l-6-6"
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D9E4D8] border-t-[#1B7A3D]" />

          <p className="text-sm font-medium text-[#64766A]">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#64766A] transition hover:text-[#063B25]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#E7F2D8] px-3 py-1 text-xs font-semibold text-[#1B7A3D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8F23D]" />
              Wallet Activity
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#123524] sm:text-3xl">
              Transaction History
            </h1>

            <p className="mt-1 text-sm text-[#64766A]">
              Keep track of every money movement in your wallet.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-[#DDE7DA] bg-white px-4 py-3 shadow-sm sm:block">
            <p className="text-xs font-medium text-[#829087]">
              Total Transactions
            </p>

            <p className="mt-1 text-lg font-bold text-[#063B25]">
              {transactions.length}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M10.29 3.86l-8.82 15a2 2 0 001.72 3h17.62a2 2 0 001.72-3l-8.82-15a2 2 0 00-3.44 0z"
            />
          </svg>

          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl border border-[#D8E8CE] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D9FF75]/30 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D9FF75] text-[#063B25]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19V5m0 0l-6 6m6-6l6 6"
                    />
                  </svg>
                </span>

                <p className="text-sm font-semibold text-[#64766A]">Money In</p>
              </div>

              <p className="mt-4 text-2xl font-bold tracking-tight text-[#063B25] sm:text-3xl">
                $ {formatRupiah(totalIncome)}
              </p>

              <p className="mt-1 text-xs text-[#829087]">
                Total incoming money
              </p>
            </div>

            <div className="hidden rounded-2xl bg-[#F0F7E9] px-3 py-2 text-xs font-bold text-[#1B7A3D] sm:block">
              IN
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-[#E8DDDD] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-100/60 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14m0 0l6-6m-6 6l-6-6"
                    />
                  </svg>
                </span>

                <p className="text-sm font-semibold text-[#64766A]">
                  Money Out
                </p>
              </div>

              <p className="mt-4 text-2xl font-bold tracking-tight text-red-500 sm:text-3xl">
                $ {formatRupiah(totalExpense)}
              </p>

              <p className="mt-1 text-xs text-[#829087]">
                Total outgoing money
              </p>
            </div>

            <div className="hidden rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-500 sm:block">
              OUT
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#DDE7DA] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex rounded-2xl bg-[#F1F5ED] p-1">
            <button
              type="button" onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${filter === "all" ? "bg-[#063B25] text-white shadow-sm" : "text-[#64766A] hover:text-[#063B25]" }`}>
              All
            </button>

            <button
              type="button"
              onClick={() => setFilter("income")}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${filter === "income" ? "bg-[#B8F23D] text-[#063B25] shadow-sm" : "text-[#64766A] hover:text-[#063B25]" }`} >
              Money In
            </button>

            <button
              type="button" onClick={() => setFilter("expense")}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${filter === "expense" ? "bg-red-500 text-white shadow-sm" : "text-[#64766A] hover:text-[#063B25]" }`}>
              Money Out
            </button>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <svg
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#829087]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-2xl border border-[#DDE7DA] bg-[#F8FAF6] py-3 pl-11 pr-4 text-sm font-medium text-[#123524] outline-none transition placeholder:text-[#9AA69E] focus:border-[#8FBC4A] focus:bg-white focus:ring-4 focus:ring-[#D9FF75]/20"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#DDE7DA] bg-white shadow-sm">
        <div className="border-b border-[#EDF1EB] px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#123524]">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-[#829087]">
                {filteredTransactions.length} transaction
                {filteredTransactions.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F7E9] text-[#1B7A3D]">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
            </div>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1F5ED] text-[#829087]">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="mt-5 font-bold text-[#123524]">
              No transactions found
            </h3>

            <p className="mt-1 text-sm text-[#829087]">
              Try changing your filter or search keyword.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#EDF1EB]">
            {filteredTransactions.map((transaction) => {
              const direction = getTransactionDirection(transaction);
              const amount = getTransactionAmount(transaction);
              const title = getTransactionTitle(transaction);
              const description = getTransactionDescription(transaction);

              return (
                <button
                  key={transaction.id}
                  type="button"
                  onClick={() => setSelectedTransaction(transaction)}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[#F8FAF6] sm:px-6"
                >
                  {getIcon(transaction)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#123524] sm:text-base">
                          {title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-[#829087] sm:text-sm">
                          {description}
                        </p>
                      </div>

                      <p
                        className={`whitespace-nowrap text-sm font-bold sm:text-base ${
                          direction === "income"
                            ? "text-[#1B7A3D]"
                            : "text-red-500"
                        }`}
                      >
                        {direction === "income" ? "+" : "-"}${" "}
                        {formatRupiah(amount)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          direction === "income" ? "bg-[#8FBC4A]" : "bg-red-400"
                        }`}
                      />

                      <p className="text-[11px] font-medium text-[#9AA69E] sm:text-xs">
                        {formatTransactionDate(transaction)}
                      </p>
                    </div>
                  </div>

                  <svg
                    className="hidden h-5 w-5 shrink-0 text-[#C4CEC5] transition group-hover:translate-x-0.5 group-hover:text-[#1B7A3D] sm:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063B25]/60 p-4 backdrop-blur-sm" onClick={() => setSelectedTransaction(null)}>
          <div className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}  >
            <div className="bg-[#063B25] px-6 pb-7 pt-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B8F23D]">
                    Transaction Detail
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    {getTransactionTitle(selectedTransaction)}
                  </h2>
                </div>

                <button
                  type="button" onClick={() => setSelectedTransaction(null)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-white/60">Amount</p>

                <p className={`mt-1 text-3xl font-bold ${getTransactionDirection(selectedTransaction) === "income" ? "text-[#D9FF75]" : "text-red-300" }`}>
                  {getTransactionDirection(selectedTransaction) === "income" ? "+" : "-"}
                  $ {formatRupiah(getTransactionAmount(selectedTransaction))}
                </p>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA69E]">
                    Description
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#123524]">
                    {getTransactionDescription(selectedTransaction)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#F4F7EF] p-4">
                    <p className="text-xs text-[#829087]">Type</p>

                    <p className="mt-1 truncate text-sm font-bold capitalize text-[#123524]">
                      {selectedTransaction.type || "transaction"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F4F7EF] p-4">
                    <p className="text-xs text-[#829087]">Direction</p>

                    <p
                      className={`mt-1 text-sm font-bold ${
                        getTransactionDirection(selectedTransaction) ===
                        "income"
                          ? "text-[#1B7A3D]"
                          : "text-red-500"
                      }`}
                    >
                      {getTransactionDirection(selectedTransaction) === "income"
                        ? "Money In"
                        : "Money Out"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA69E]">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#123524]">
                    {formatTransactionDate(selectedTransaction)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA69E]">
                    Transaction ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#123524]">
                    #{selectedTransaction.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="mt-7 w-full rounded-2xl bg-[#063B25] py-3.5 text-sm font-bold text-white transition hover:bg-[#07552F] active:scale-[0.99]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
