import Dashboard from "./pages/dashboard";
import LayoutDashboard from "../../components/layouts/LayoutDashboard/layoutDashboard";

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];
export default DashboardRoutes;
