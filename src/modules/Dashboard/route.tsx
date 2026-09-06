import Dashboard from "./pages/customerDashboard";
import TransactionHistory from "./pages/transactions";
import CustomerLayout from "../../components/layouts/LayoutDashboard/customerLayout";

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <TransactionHistory />,
      },
    ],
  },
];

export default DashboardRoutes;
