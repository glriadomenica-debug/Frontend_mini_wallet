import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../../components/common/BackButton";

interface Wallet {
  balance: string;
}

interface PerformedBy {
  id: number;
  username: string;
}

interface Transaction {
  id: number;
  user_id: number;
  type: "balance_add" | "shopee_payment";
  amount: string;
  description: string;
  performed_by: number;
  created_at: string;
  performedBy?: PerformedBy;
}

interface Customer {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  wallet: Wallet | null;
}

export default function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCustomer(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load customer");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8000/api/admin/users/${id}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions(response.data.data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to load customer transactions",
      );
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchCustomer();
    fetchTransactions();
  }, [id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: string) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-4 border-[#D9FF75] border-t-[#07552F] animate-spin" />

          <p className="mt-4 text-sm font-medium text-[#6B7D71]">
            Loading customer...
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <>
        <ToastContainer position="top-right" />

        <div className="max-w-xl mx-auto py-12">
          <div className="bg-white rounded-3xl border border-[#DDE8D8] shadow-sm p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4F7EF] text-[#07552F] flex items-center justify-center">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m6-9a4 4 0 100-8 4 4 0 000 8zm8-2v6m3-3h-6"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#063B25]">
              Customer Not Found
            </h2>

            <p className="text-sm text-[#6B7D71] mt-2">
              The customer you're looking for could not be found.
            </p>

            <div className="mt-6 flex justify-center">
              <BackButton />
            </div>
          </div>
        </div>
      </>
    );
  }

  const balance = Number(customer.wallet?.balance || 0);

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m6-9a4 4 0 100-8 4 4 0 000 8zm8-2v6m3-3h-6"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#063B25]">
                Customer Detail
              </h1>

              <p className="text-sm text-[#6B7D71] mt-1">
                Customer information and wallet activity.
              </p>
            </div>
          </div>

          <BackButton />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl border border-[#DDE8D8] shadow-sm overflow-hidden">
            <div className="px-6 py-5 sm:px-7 border-b border-[#E7EEE3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EF] text-[#07552F] flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m6-9a4 4 0 100-8 4 4 0 000 8zm8-2v6m3-3h-6"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#063B25]">
                    Customer Information
                  </h2>

                  <p className="text-xs text-[#718178] mt-0.5">
                    Basic customer account details
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-[#F8FAF6] border border-[#E7EEE3] p-4">
                  <p className="text-xs font-medium text-[#718178]">Customer</p>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-10 h-10 rounded-xl bg-[#07552F] text-[#D9FF75] flex items-center justify-center font-bold">
                      {customer.username.charAt(0).toUpperCase()}
                    </div>

                    <p className="font-bold text-[#063B25] truncate">
                      {customer.username}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F8FAF6] border border-[#E7EEE3] p-4">
                  <p className="text-xs font-medium text-[#718178]">
                    Customer ID
                  </p>

                  <p className="text-lg font-bold text-[#063B25] mt-3">
                    #{customer.id}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FAF6] border border-[#E7EEE3] p-4">
                  <p className="text-xs font-medium text-[#718178]">Email</p>

                  <p className="text-sm font-semibold text-[#123524] mt-3 break-all">
                    {customer.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FAF6] border border-[#E7EEE3] p-4">
                  <p className="text-xs font-medium text-[#718178]">Phone</p>

                  <p className="text-sm font-semibold text-[#123524] mt-3">
                    {customer.phone_number || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#063B25] via-[#07552F] to-[#1B7A3D] rounded-3xl shadow-sm overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/5" />
            <div className="absolute -right-16 bottom-8 w-44 h-44 rounded-full bg-[#B8F23D]/5" />

            <div className="relative p-6 sm:p-7 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Wallet Balance</p>

                  <h2 className="text-lg font-bold text-white mt-1">
                    Current Balance
                  </h2>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-[#B8F23D] text-[#063B25] flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M16 12h.01" />
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  ${balance.toFixed(2)}
                </p>

                <p className="text-sm text-white/60 mt-3">
                  Rp {(balance * 16000).toLocaleString("id-ID")}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-white/75 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#B8F23D]" />
                  Exchange rate: 1 USD = Rp16,000
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDE8D8] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 sm:px-7 border-b border-[#E7EEE3]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EF] text-[#07552F] flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7h8m-8 4h8m-8 4h5m7-11v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h10l4 4z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#063B25]">
                    Transaction History
                  </h2>

                  <p className="text-sm text-[#718178] mt-0.5">
                    All wallet transactions for this customer.
                  </p>
                </div>
              </div>

              {!loadingTransactions && (
                <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full bg-[#F4F7EF] text-[#07552F] text-xs font-semibold">
                  {transactions.length}{" "}
                  {transactions.length === 1 ? "Transaction" : "Transactions"}
                </span>
              )}
            </div>
          </div>

          {loadingTransactions ? (
            <div className="p-10 text-center">
              <div className="w-8 h-8 mx-auto rounded-full border-4 border-[#D9FF75] border-t-[#07552F] animate-spin" />

              <p className="text-sm text-[#6B7D71] mt-4">
                Loading transactions...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4F7EF] text-[#718178] flex items-center justify-center">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h8m-8 4h8m-8 4h5m7-11v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h10l4 4z"
                  />
                </svg>
              </div>

              <p className="text-sm font-semibold text-[#063B25] mt-4">
                No transactions yet
              </p>

              <p className="text-xs text-[#718178] mt-1">
                This customer doesn't have any wallet transactions.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAF6] border-b border-[#E7EEE3]">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Type
                    </th>

                    <th className="text-right px-6 py-4 font-semibold text-[#718178]">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Description
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Performed By
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E7EEE3]">
                  {transactions.map((transaction) => {
                    const isIncome = transaction.type === "balance_add";

                    return (
                      <tr
                        key={transaction.id}
                        className="hover:bg-[#F8FAF6] transition-colors"
                      >
                        {/* Type */}
                        <td className="px-6 py-4">
                          {isIncome ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF8D0] text-[#07552F] text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B7A3D]" />
                              Balance Added
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDECEC] text-red-600 text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Shopee Payment
                            </span>
                          )}
                        </td>

                        <td
                          className={`px-6 py-4 text-right font-bold whitespace-nowrap ${
                            isIncome ? "text-[#1B7A3D]" : "text-red-500"
                          }`}
                        >
                          {isIncome ? "+" : "-"}
                          {formatAmount(transaction.amount)}
                        </td>

                        <td className="px-6 py-4 text-[#4F6358]">
                          {transaction.description || "-"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#F4F7EF] text-[#07552F] flex items-center justify-center text-xs font-bold">
                              {transaction.performedBy?.username
                                ?.charAt(0)
                                .toUpperCase() || "-"}
                            </div>

                            <span className="text-[#4F6358]">
                              {transaction.performedBy?.username || "-"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[#718178] whitespace-nowrap">
                          {formatDate(transaction.created_at)}
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
