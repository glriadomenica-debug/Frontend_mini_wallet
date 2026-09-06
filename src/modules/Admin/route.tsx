import Admin from "./pages/admin";
import AddBalance from "./pages/addBalance";
import Register from "../Auth/pages/register";
import ShopeePayment from "./pages/shopeePayment";
import Transactions from "./pages/transactions";
import Customers from "./pages/customerList";
import CustomerDetail from "./pages/customerDetail";
import LayoutDashboard from "../../components/layouts/LayoutDashboard/layoutDashboard";

const AdminRoutes = [
  {
    path: "/admin",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "customers/create",
        element: <Register />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetail />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "wallet/add",
        element: <AddBalance />,
      },
      {
        path: "wallet/shopee-payment",
        element: <ShopeePayment />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
];

export default AdminRoutes;
