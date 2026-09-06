import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../../components/common/BackButton";

interface Customer {
  id: number;
  username: string;
  email: string;
}

export default function AddBalance() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please select a customer.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoadingSubmit(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/admin/wallet/add",
        {
          user_id: Number(userId),
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Balance added successfully.");

      setUserId("");
      setAmount("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add balance");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#063B25]">
                Add Balance
              </h1>

              <p className="text-sm text-[#6B7D71] mt-1">
                Add balance to a customer's wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDE8D8] shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#063B25] to-[#07552F] px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Wallet Top Up
                </h2>

                <p className="text-sm text-white/65 mt-1">
                  Select a customer and enter the amount you want to add.
                </p>
              </div>

              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#B8F23D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m0-6h4m0 0l-2-2m2 2l-2 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            <div>
              <label
                htmlFor="customer"
                className="block text-sm font-semibold text-[#123524] mb-2"
              >
                Customer
              </label>

              <select
                id="customer"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loadingCustomers || loadingSubmit}
                className="w-full px-4 py-3.5 rounded-2xl border border-[#DDE8D8] bg-[#FAFCF8] text-[#123524] outline-none transition-all duration-200 focus:border-[#1B7A3D] focus:ring-4 focus:ring-[#D9FF75]/40 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">
                  {loadingCustomers
                    ? "Loading customers..."
                    : "Select customer"}
                </option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.username} — {customer.email}
                  </option>
                ))}
              </select>

              <p className="text-xs text-[#718178] mt-2">
                Choose the customer who will receive the balance.
              </p>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-[#123524] mb-2"
              >
                Amount (USD)
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#D9FF75] text-[#063B25] flex items-center justify-center font-bold text-sm">
                  $
                </div>

                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loadingSubmit}
                  placeholder="0.00"
                  className="w-full px-4 py-3.5 pl-14 rounded-2xl border border-[#DDE8D8] bg-[#FAFCF8] text-[#123524] text-lg font-semibold outline-none transition-all duration-200 focus:border-[#1B7A3D] focus:ring-4 focus:ring-[#D9FF75]/40 disabled:bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <svg
                  className="w-3.5 h-3.5 text-[#1B7A3D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z"
                  />
                </svg>

                <p className="text-xs text-[#718178]">
                  Exchange rate: 1 USD = Rp16,000
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4F7EF] border border-[#DDE8D8] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#718178]">
                    Balance to be added
                  </p>

                  <p className="text-2xl font-bold text-[#063B25] mt-1">
                    $ {amount || "0.00"}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center">
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
                      d="M12 5v14m7-7H5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
              <div className="w-full sm:w-auto">
                <BackButton />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit || loadingCustomers}
                className="flex-1 bg-[#07552F] hover:bg-[#063B25] disabled:bg-[#9BB7A6] text-white py-3.5 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                {loadingSubmit ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Adding Balance...
                  </>
                ) : (
                  <>
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
                        d="M12 5v14m7-7H5"
                      />
                    </svg>
                    Add Balance
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}
