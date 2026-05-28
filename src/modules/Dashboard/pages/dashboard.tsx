import { useEffect, useState } from "react";
import axios from "axios";
import TransferModal from "../../../components/modals/transferModal";
import TopupModal from "../../../components/modals/topupModal";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  // user data login
  const [user, setUser] = useState<any>(null);

  // Modal for transfer and topup
  const [showTopup, setShowTopup] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  // Form topup and transfer
  const [topupAmount, setTopupAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      window.location.href = "/";
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchWallet();
    fetchTransactions();
  }, []);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/api/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBalance(res.data?.data?.balance ?? 0);
    } catch (err) {
      console.log("wallet error", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data.data ?? []);
    } catch (err) {
      console.log("transactions error", err);
    }
  };

  // Topup
  const handleTopup = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/topup",
        {
          amount: topupAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowTopup(false);
      setTopupAmount("");

      fetchWallet();
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  // transfer
  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/transfer",
        {
          username,
          phone_number: phoneNumber,
          amount: transferAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowTransfer(false);

      setUsername("");
      setPhoneNumber("");
      setTransferAmount("");

      fetchWallet();
      fetchTransactions();
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
          <p className="text-gray-400 text-sm">Welcome Back 👋</p>

          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            {user?.username}
          </h1>

          <p className="text-gray-500 text-sm mt-1">{user?.phone_number}</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl shadow-xl">
          <p className="text-sm opacity-80">Your Balance</p>

          <h1 className="text-4xl font-bold mt-2 tracking-wide">
            Rp{" "}
            {Number(balance).toLocaleString("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowTopup(true)}
            className="bg-white border border-emerald-100 shadow-sm px-4 py-4 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
          >
            <p className="font-semibold text-emerald-600">Top Up</p>
          </button>

          <button
            onClick={() => setShowTransfer(true)}
            className="bg-white border border-teal-100 shadow-sm px-4 py-4 rounded-2xl hover:bg-teal-50 transition-all duration-300"
          >
            <p className="font-semibold text-teal-600">Transfer</p>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Transactions
            </h2>
          </div>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((trx: any) => {
                const isIncome = trx.type === "topup" || trx.sign === "+";

                return (
                  <div
                    key={trx.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{trx.title}</p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(trx.created_at).toLocaleString()}
                      </p>
                    </div>

                    <p
                      className={`font-bold ${
                        isIncome ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"} Rp{" "}
                      {Number(trx.amount).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400 text-sm">
                No transactions yet
              </p>
            )}
          </div>
        </div>
      </div>

      <TopupModal
        show={showTopup}
        amount={topupAmount}
        setAmount={setTopupAmount}
        onClose={() => setShowTopup(false)}
        onSubmit={handleTopup}
      />

      <TransferModal
        show={showTransfer}
        username={username}
        phoneNumber={phoneNumber}
        amount={transferAmount}
        setUsername={setUsername}
        setPhoneNumber={setPhoneNumber}
        setAmount={setTransferAmount}
        onClose={() => setShowTransfer(false)}
        onSubmit={handleTransfer}
      />
    </>
  );
}
