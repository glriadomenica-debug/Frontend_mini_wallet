import Login from "./pages/login";
import LayoutLogin from "../../components/layouts/LayoutLogin/layoutLogin";

const LoginRoutes = [
  {
    path: "/",
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];
export default LoginRoutes;
