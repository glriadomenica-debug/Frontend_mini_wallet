import { useRoutes } from "react-router-dom";
import LoginRoutes from "../modules/Auth/route";
import DashboardRoutes from "../modules/Dashboard/route";
import AdminRoutes from "../modules/Admin/route";

export default function AppRoutes() {
  return useRoutes([...LoginRoutes, ...DashboardRoutes, ...AdminRoutes]);
}
