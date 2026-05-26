interface TransferModalProps {
  show: boolean;
  username: string;
  phoneNumber: string;
  amount: string;

  setUsername: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setAmount: (value: string) => void;

  onClose: () => void;
  onSubmit: () => void;
}

export default function TransferModal({
  show,
  username,
  phoneNumber,
  amount,
  setUsername,
  setPhoneNumber,
  setAmount,
  onClose,
  onSubmit,
}: TransferModalProps) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">
            Transfer Balance
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Send balance safely to another user
          </p>

          <input
            type="text"
            placeholder="Receiver Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-5 py-2 rounded-xl bg-teal-500 text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
