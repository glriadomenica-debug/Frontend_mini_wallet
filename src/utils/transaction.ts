  export interface Transaction {
    id: number;
    type?: string;
    amount: number;
    display_amount?: number;
    direction?: "income" | "expense";
    title?: string;
    description?: string;
    created_at?: string;
    createdAt?: string;
    date?: string;
  }

  export type TransactionDirection = "income" | "expense";


  export const getTransactionDirection = (
    transaction: Transaction,
  ): TransactionDirection => {
    
    if (transaction.direction === "income") {
      return "income";
    }

    if (transaction.direction === "expense") {
      return "expense";
    }

    const type = String(transaction.type || "")
      .toLowerCase()
      .trim();

    const incomeTypes = [
      "balance_add",
      "topup",
      "top_up",
      "deposit",
      "transfer_in",
      "received",
      "income",
      "credit",
    ];


    const expenseTypes = [
      "shopee_payment",
      "payment",
      "purchase",
      "checkout",
      "shopee",
      "transfer",
      "transfer_out",
      "expense",
      "debit",
    ];

    if (incomeTypes.includes(type)) {
      return "income";
    }

    if (expenseTypes.includes(type)) {
      return "expense";
    }

    if (Number(transaction.amount) < 0) {
      return "expense";
    }

    return "income";
  };

  export const getTransactionAmount = (
    transaction: Transaction,
  ): number => {
    const amount =
      transaction.display_amount !== undefined
        ? transaction.display_amount
        : transaction.amount;

    return Math.abs(Number(amount) || 0);
  };


  export const getTransactionTitle = (
    transaction: Transaction,
  ): string => {
    if (transaction.title) {
      return transaction.title;
    }

    const type = String(transaction.type || "")
      .toLowerCase()
      .trim();

    if (
      [
        "balance_add",
        "topup",
        "top_up",
        "deposit",
      ].includes(type)
    ) {
      return "Top Up";
    }

    if (
      [
        "received",
        "transfer_in",
        "income",
        "credit",
      ].includes(type)
    ) {
      return "Money Received";
    }

    if (
      [
        "transfer",
        "transfer_out",
      ].includes(type)
    ) {
      return "Transfer";
    }

    if (
      [
        "payment",
        "purchase",
        "checkout",
        "shopee",
        "shopee_payment",
        "expense",
        "debit",
      ].includes(type)
    ) {
      return "Payment";
    }

    return getTransactionDirection(transaction) === "income"
      ? "Money In"
      : "Money Out";
  };


  export const getTransactionDescription = (
    transaction: Transaction,
  ): string => {
    if (transaction.description) {
      return transaction.description;
    }

    const direction = getTransactionDirection(transaction);

    const type = String(transaction.type || "")
      .toLowerCase()
      .trim();

    if (
      [
        "balance_add",
        "topup",
        "top_up",
        "deposit",
      ].includes(type)
    ) {
      return "Balance added to your wallet";
    }

    if (
      [
        "shopee",
        "shopee_payment",
        "checkout",
        "payment",
        "purchase",
      ].includes(type)
    ) {
      return "Payment for purchase";
    }

    if (direction === "income") {
      return "Money received";
    }

    return "Money spent";
  };

  export const getTransactionDate = (
    transaction: Transaction,
  ): string | undefined => {
    return (
      transaction.created_at ||
      transaction.createdAt ||
      transaction.date
    );
  };


  export const formatTransactionDate = (
    transaction: Transaction,
  ): string => {
    const date = getTransactionDate(transaction);

    if (!date) {
      return "-";
    }

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

  export const formatRupiah = (
    amount: number,
  ): string => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  export const calculateTotalIncome = (
    transactions: Transaction[],
  ): number => {
    return transactions.reduce((total, transaction) => {
      if (
        getTransactionDirection(transaction) === "income"
      ) {
        return (
          total +
          getTransactionAmount(transaction)
        );
      }

      return total;
    }, 0);
  };

  export const calculateTotalExpense = (
    transactions: Transaction[],
  ): number => {
    return transactions.reduce((total, transaction) => {
      if (
        getTransactionDirection(transaction) === "expense"
      ) {
        return (
          total +
          getTransactionAmount(transaction)
        );
      }

      return total;
    }, 0);
  };