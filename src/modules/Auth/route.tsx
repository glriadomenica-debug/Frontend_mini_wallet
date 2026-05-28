import Login from "./pages/login";
import LayoutLogin from "../../components/layouts/LayoutLogin/layoutLogin";
import Register from "./pages/register";

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
  {
    path: "/register",
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
];
export default LoginRoutes;
