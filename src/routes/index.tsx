import { useRoutes } from "react-router-dom";
import LoginRoutes from "../modules/Auth/route";

export default function AppRoutes() {
  return useRoutes([...LoginRoutes]);
}
