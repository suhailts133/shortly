import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../features/auth/components/Login";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../features/auth/components/Signup";
import Otp from "../features/auth/components/Otp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "verify-otp", Component: Otp },
    ],
  },
]);

export default router;