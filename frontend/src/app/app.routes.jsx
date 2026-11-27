import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ShopHome from "../features/shop/pages/ShopHome";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <ShopHome />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
]);
