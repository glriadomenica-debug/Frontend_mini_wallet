import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../../components/common/BackButton";

interface Customer {
  id: number;
  username: string;
  email: string;
  wallet?: {
    balance: string | number;
  } | null;
}

type Currency = "IDR" | "USD";

const EXCHANGE_RATE = 16000;

export default function ShopeePayment() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("IDR");

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

      setCustomers(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoadingCustomers(false);
    }
  };

  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => String(customer.id) === String(userId));
  }, [customers, userId]);

  const walletBalance = Number(selectedCustomer?.wallet?.balance || 0);

  const numericAmount = Number(amount) || 0;

  const usdDeduction =
    currency === "IDR" ? numericAmount / EXCHANGE_RATE : numericAmount;

  const remainingBalance = walletBalance - usdDeduction;

  const insufficientBalance = numericAmount > 0 && usdDeduction > walletBalance;

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
    setAmount("");
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

    if (insufficientBalance) {
      toast.error("Insufficient customer wallet balance.");
      return;
    }

    setLoadingSubmit(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/admin/wallet/shopee-payment",
        {
          user_id: Number(userId),
          amount: Number(amount),
          currency: currency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data.data;

      const paymentText =
        currency === "IDR"
          ? `Rp ${formatIDR(Number(data.payment_amount))}`
          : `$${formatUSD(Number(data.payment_amount))}`;

      toast.success(
        `Payment successful. ${paymentText} deducted ($${formatUSD(
          Number(data.wallet_deducted),
        )}). Remaining balance: $${formatUSD(Number(data.remaining_balance))}`,
      );

      setUserId("");
      setAmount("");
      setCurrency("IDR");

      await fetchCustomers();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to process Shopee payment",
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 10h20"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 15h4"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#063B25]">
                  Shopee Payment
                </h1>

                <p className="text-sm text-[#6B7D71] mt-1">
                  Process a Shopee payment using the customer's wallet balance.
                </p>
              </div>
            </div>

            <BackButton />
          </div>

          <div className="bg-white rounded-3xl border border-[#DDE8D8] shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-[#063B25] via-[#07552F] to-[#1B7A3D] px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B8F23D] text-[#063B25] flex items-center justify-center">
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
                      d="M3 7h18M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12h.01"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Payment Processing
                  </h2>

                  <p className="text-sm text-white/60 mt-0.5">
                    Deduct payment directly from the customer's wallet.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
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
                  className="w-full px-4 py-3 rounded-xl border border-[#D7E3D2] bg-white text-[#123524] outline-none transition focus:border-[#1B7A3D] focus:ring-4 focus:ring-[#D9FF75]/40 disabled:bg-[#F4F7EF] disabled:text-[#9AA89F]"
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
                  Select the customer whose wallet will be charged.
                </p>
              </div>

              {selectedCustomer && (
                <div className="rounded-2xl bg-[#F4F7EF] border border-[#DDE8D8] px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#718178]">
                        Customer Wallet
                      </p>

                      <p className="text-sm font-semibold text-[#063B25] mt-1">
                        Current Balance
                      </p>
                    </div>

                    <p className="text-xl font-bold text-[#063B25]">
                      ${formatUSD(walletBalance)}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-[#123524] mb-2"
                >
                  Payment Amount
                </label>

                <div className="flex overflow-hidden rounded-xl border border-[#D7E3D2] bg-white transition focus-within:border-[#1B7A3D] focus-within:ring-4 focus-within:ring-[#D9FF75]/40">
                  <select
                    value={currency}
                    onChange={handleCurrencyChange}
                    disabled={loadingSubmit}
                    className="w-24 shrink-0 border-r border-[#D7E3D2] bg-[#F4F7EF] px-3 py-3 text-sm font-bold text-[#063B25] outline-none"
                  >
                    <option value="IDR">IDR</option>
                    <option value="USD">USD</option>
                  </select>

                  <input
                    id="amount"
                    type="number"
                    min="1"
                    step={currency === "IDR" ? "1" : "0.01"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={loadingSubmit}
                    placeholder={currency === "IDR" ? "160000" : "10.00"}
                    className="w-full px-4 py-3 text-[#123524] outline-none"
                  />
                </div>

                <p className="text-xs text-[#718178] mt-2">
                  {currency === "IDR"
                    ? "Enter the amount shown on the Shopee checkout."
                    : "Enter the USD amount to deduct from the wallet."}
                </p>
              </div>

              {amount && Number(amount) > 0 && (
                <div className="rounded-2xl bg-[#F4F7EF] border border-[#DDE8D8] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#718178]">
                        Payment Amount
                      </p>

                      <p className="text-2xl font-bold text-[#063B25] mt-1">
                        {currency === "IDR"
                          ? `Rp ${formatIDR(numericAmount)}`
                          : `$${formatUSD(numericAmount)}`}
                      </p>

                      {currency === "IDR" && (
                        <p className="text-sm font-medium text-[#718178] mt-1">
                          ≈ ${formatUSD(usdDeduction)} USD
                        </p>
                      )}
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center">
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
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#DDE8D8] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#718178]">
                        Wallet Deduction
                      </span>

                      <span className="text-sm font-bold text-red-500">
                        -${formatUSD(usdDeduction)}
                      </span>
                    </div>

                    {selectedCustomer && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#123524]">
                          Remaining Balance
                        </span>

                        <span
                          className={`text-sm font-bold ${
                            insufficientBalance
                              ? "text-red-500"
                              : "text-[#063B25]"
                          }`}
                        >
                          ${formatUSD(Math.max(remainingBalance, 0))}
                        </span>
                      </div>
                    )}

                    {currency === "IDR" && (
                      <div className="pt-2">
                        <p className="text-xs text-[#718178]">
                          Exchange rate: 1 USD = Rp
                          {formatIDR(EXCHANGE_RATE)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {insufficientBalance && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v4m0 4h.01M10.3 3.8l-7.5 13a2 2 0 001.7 3h15a2 2 0 001.7-3l-7.5-13a2 2 0 00-3.4 0z"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-red-700">
                        Insufficient balance
                      </p>

                      <p className="text-xs text-red-600 mt-1 leading-relaxed">
                        The customer needs ${formatUSD(usdDeduction)} in their
                        wallet to complete this payment.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loadingSubmit ||
                  loadingCustomers ||
                  !userId ||
                  !amount ||
                  Number(amount) <= 0 ||
                  insufficientBalance
                }
                className="w-full flex items-center justify-center gap-2 bg-[#07552F] hover:bg-[#063B25] disabled:bg-[#A7B8AE] text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loadingSubmit ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />

                      <path
                        d="M21 12a9 9 0 00-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
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
                        d="M3 7h18M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 15h.01M12 15h.01"
                      />
                    </svg>
                    Pay Shopee
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-[#EAF8D0] border border-[#D9FF75] px-5 py-4">
            <div className="w-8 h-8 shrink-0 rounded-lg bg-[#D9FF75] text-[#063B25] flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9" />

                <path strokeLinecap="round" d="M12 11v5" />

                <path strokeLinecap="round" d="M12 8h.01" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#063B25]">
                Payment Information
              </p>

              <p className="text-xs text-[#4F6358] mt-1 leading-relaxed">
                Shopee payments are deducted directly from the selected
                customer's wallet balance and will appear as an expense
                transaction. Wallet balance is maintained in USD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
