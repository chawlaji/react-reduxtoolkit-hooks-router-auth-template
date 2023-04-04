import Layout from "../components/layout/Layout";
import Home from "../components/pages/home/Home";
import Login from "../components/auth/login/Login";
import Search from "../components/pages/search/Search";
import ErrorPage from "./ErrorPage";
import Signup from "../components/auth/signup/Signup";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

export function CheckAuth({
  children,
  type = "private",
}: {
  children: JSX.Element;
  type?: string;
}) {
  let location = useLocation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  if (isLoggedIn) {
    if (type === "public")
      return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    if (type === "private")
      return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: (
          <CheckAuth>
            <Search />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <CheckAuth type="public">
        <Login />
      </CheckAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: (
      <CheckAuth type="public">
        <Signup />
      </CheckAuth>
    ),
    errorElement: <ErrorPage />,
  },
];
