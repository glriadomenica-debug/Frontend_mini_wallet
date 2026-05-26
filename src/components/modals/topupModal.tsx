interface TopupModalProps {
  show: boolean;
  amount: string;
  setAmount: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function TopupModal({
  show,
  amount,
  setAmount,
  onClose,
  onSubmit,
}: TopupModalProps) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in">
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">
            Top Up Balance
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Add balance to your wallet
          </p>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
