import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/common/BackButton";

interface Wallet {
  id: number;
  user_id: number;
  balance: string;
}

interface Customer {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  wallet: Wallet | null;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCustomers(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="space-y-7">
        {/* Page Header */}
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
                Customers
              </h1>

              <p className="text-sm text-[#6B7D71] mt-1">
                Manage Mini Wallet customers and their balances.
              </p>
            </div>
          </div>

          <BackButton />
        </div>

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Customers */}
            <div className="bg-white rounded-2xl border border-[#DDE8D8] shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#718178]">
                    Total Customers
                  </p>

                  <p className="text-2xl font-bold text-[#063B25] mt-2">
                    {customers.length}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#D9FF75] text-[#063B25] flex items-center justify-center">
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
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#DDE8D8] shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#718178]">
                    Active Wallets
                  </p>

                  <p className="text-2xl font-bold text-[#1B7A3D] mt-2">
                    {
                      customers.filter((customer) => customer.wallet !== null)
                        .length
                    }
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#EAF8D0] text-[#07552F] flex items-center justify-center">
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
            </div>

            <div className="bg-gradient-to-br from-[#063B25] to-[#07552F] rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/60">
                    Total Wallet Balance
                  </p>

                  <p className="text-2xl font-bold text-white mt-2">
                    $
                    {customers
                      .reduce(
                        (total, customer) =>
                          total + Number(customer.wallet?.balance || 0),
                        0,
                      )
                      .toFixed(2)}
                  </p>
                </div>

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
                      d="M12 1v22m5-18.5C16.1 3.8 14.2 3 12 3c-3.3 0-6 1.8-6 4s2.7 4 6 4 6 1.8 6 4-2.7 4-6 4c-2.2 0-4.1-.8-5-1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-[#DDE8D8] shadow-sm overflow-hidden">
          <div className="px-6 py-5 sm:px-7 border-b border-[#E7EEE3]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#063B25]">
                  Customer List
                </h2>

                <p className="text-sm text-[#718178] mt-1">
                  View customer accounts and wallet balances.
                </p>
              </div>

              {!loading && (
                <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-[#F4F7EF] text-[#07552F] text-xs font-semibold">
                  {customers.length}{" "}
                  {customers.length === 1 ? "Customer" : "Customers"}
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="w-9 h-9 mx-auto rounded-full border-4 border-[#D9FF75] border-t-[#07552F] animate-spin" />

              <p className="text-sm text-[#6B7D71] mt-4">
                Loading customers...
              </p>
            </div>
          ) : customers.length === 0 ? (
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
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m6-9a4 4 0 100-8 4 4 0 000 8zm8-2v6m3-3h-6"
                  />
                </svg>
              </div>

              <p className="text-sm font-semibold text-[#063B25] mt-4">
                No customers found
              </p>

              <p className="text-xs text-[#718178] mt-1">
                There are currently no customers in the system.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAF6] border-b border-[#E7EEE3]">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-[#718178]">
                      Phone
                    </th>

                    <th className="text-right px-6 py-4 font-semibold text-[#718178]">
                      Balance
                    </th>

                    <th className="text-center px-6 py-4 font-semibold text-[#718178]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E7EEE3]">
                  {customers.map((customer) => {
                    const balance = Number(customer.wallet?.balance || 0);

                    return (
                      <tr
                        key={customer.id}
                        className="hover:bg-[#F8FAF6] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#07552F] text-[#D9FF75] flex items-center justify-center font-bold">
                              {customer.username.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-[#063B25] truncate">
                                {customer.username}
                              </p>

                              <p className="text-xs text-[#718178] mt-0.5">
                                ID #{customer.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[#4F6358]">
                          <span className="block max-w-[220px] truncate">
                            {customer.email}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-[#4F6358] whitespace-nowrap">
                          {customer.phone_number || "-"}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="font-bold text-[#1B7A3D]">
                            ${balance.toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              navigate(`/admin/customers/${customer.id}`)
                            }
                            className="inline-flex items-center gap-2 bg-[#EAF8D0] hover:bg-[#D9FF75] text-[#07552F] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                          >
                            View
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
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
