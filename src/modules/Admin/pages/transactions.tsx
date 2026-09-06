import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../../components/common/BackButton";

interface Transaction {
  id: number;
  user_id: number;
  type: "balance_add" | "shopee_payment";
  amount: string;
  description: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  performed_by: {
    id: number;
    username: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/admin/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions(res.data.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const totalTransactions = transactions.length;

  const totalMoneyIn = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "balance_add") {
        return total + Number(transaction.amount || 0);
      }

      return total;
    }, 0);
  }, [transactions]);

  const totalMoneyOut = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "shopee_payment") {
        return total + Number(transaction.amount || 0);
      }

      return total;
    }, 0);
  }, [transactions]);

  const formatAmount = (amount: string | number) => {
    return Number(amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitial = (username: string) => {
    return username?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9FF75] text-[#063B25]">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6.75A2.75 2.75 0 015.75 4h12.5A2.75 2.75 0 0121 6.75v10.5A2.75 2.75 0 0118.25 20H5.75A2.75 2.75 0 013 17.25V6.75z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8h18M7 14h4"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#063B25] sm:text-3xl">
                Transaction Management
              </h1>

              <p className="mt-1 text-sm text-[#6B7D71] sm:text-base">
                Monitor all customer wallet transactions.
              </p>
            </div>
          </div>

          <BackButton />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Transactions */}
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#DDE8D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7D71]">
                  Total Transactions
                </p>

                <p className="mt-2 text-3xl font-bold text-[#063B25]">
                  {loading ? "—" : totalTransactions}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F7EF] text-[#07552F]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3h10M7 21h10M5 6h14v12H5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9h8M8 12h5M8 15h7"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F4F7EF]">
              <div className="h-full w-2/3 rounded-full bg-[#1B7A3D]" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#DDE8D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7D71]">Money In</p>

                <p className="mt-2 text-2xl font-bold text-[#1B7A3D]">
                  {loading ? "—" : `$ ${formatAmount(totalMoneyIn)}`}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF8D8] text-[#1B7A3D]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19V5M6 11l6-6 6 6"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#718178]">
              Total balance added to customer wallets
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#DDE8D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7D71]">Money Out</p>

                <p className="mt-2 text-2xl font-bold text-red-500">
                  {loading ? "—" : `$ ${formatAmount(totalMoneyOut)}`}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14M18 13l-6 6-6-6"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#718178]">
              Total payments deducted from customer wallets
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#DDE8D8]">
          {/* Card Header */}
          <div className="flex flex-col gap-3 border-b border-[#E7EEE3] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#063B25]">
                Transaction History
              </h2>

              <p className="mt-1 text-sm text-[#718178]">
                Complete history of customer wallet activity.
              </p>
            </div>

            {!loading && transactions.length > 0 && (
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F4F7EF] px-3 py-1.5 text-xs font-semibold text-[#07552F]">
                <span className="h-2 w-2 rounded-full bg-[#B8F23D]" />
                {transactions.length} transaction
                {transactions.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-16">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F7EF]">
                <svg
                  className="h-7 w-7 animate-spin text-[#1B7A3D]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M21 12a9 9 0 00-9-9v3a6 6 0 016 6h3z"
                  />
                </svg>
              </div>

              <p className="mt-4 text-sm font-medium text-[#063B25]">
                Loading transactions...
              </p>

              <p className="mt-1 text-xs text-[#718178]">
                Please wait while we fetch the latest data.
              </p>
            </div>
          ) : transactions.length === 0 ? (
            /* Empty */
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F7EF] text-[#07552F]">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3h10M7 21h10M5 6h14v12H5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h8M8 14h5"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-base font-bold text-[#063B25]">
                No transactions found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-[#718178]">
                There are currently no wallet transactions available to display.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-sm">
                <thead>
                  <tr className="border-b border-[#E7EEE3] bg-[#F8FAF5]">
                    <th className="px-6 py-4 text-left font-semibold text-[#53665B]">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-[#53665B]">
                      Type
                    </th>

                    <th className="px-6 py-4 text-right font-semibold text-[#53665B]">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-[#53665B]">
                      Description
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-[#53665B]">
                      Performed By
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-[#53665B]">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEF3EB]">
                  {transactions.map((transaction) => {
                    const isIncome = transaction.type === "balance_add";

                    return (
                      <tr
                        key={transaction.id}
                        className="group transition hover:bg-[#F8FBF5]"
                      >
                        {/* Customer */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9FF75] text-sm font-bold text-[#063B25]">
                              {getInitial(transaction.user.username)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-[#123524]">
                                {transaction.user.username}
                              </p>

                              <p className="mt-0.5 max-w-[220px] truncate text-xs text-[#7A8A81]">
                                {transaction.user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          {isIncome ? (
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8D8] px-3 py-1.5 text-xs font-semibold text-[#1B7A3D]">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1B7A3D] text-white">
                                <svg
                                  className="h-2.5 w-2.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19V5M6 11l6-6 6 6"
                                  />
                                </svg>
                              </span>
                              Balance Add
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
                                <svg
                                  className="h-2.5 w-2.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 5v14M18 13l-6 6-6-6"
                                  />
                                </svg>
                              </span>
                              Shopee Payment
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <span
                            className={`font-bold ${
                              isIncome ? "text-[#1B7A3D]" : "text-red-500"
                            }`}
                          >
                            {isIncome ? "+" : "-"}${" "}
                            {formatAmount(transaction.amount)}
                          </span>
                        </td>

                        <td className="max-w-[260px] px-6 py-5">
                          <p
                            className="truncate text-[#5E7066]"
                            title={transaction.description}
                          >
                            {transaction.description || "-"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F7EF] text-xs font-bold text-[#07552F]">
                              {getInitial(
                                transaction.performed_by?.username || "A",
                              )}
                            </div>

                            <span className="font-medium text-[#53665B]">
                              {transaction.performed_by?.username || "-"}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-5 text-[#718178]">
                          <div className="flex items-center gap-2">
                            <svg
                              className="h-4 w-4 text-[#9AAA9F]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                              />
                            </svg>

                            <span>{formatDate(transaction.created_at)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
