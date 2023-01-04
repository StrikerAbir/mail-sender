import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Imports from "../Pages/Imports";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Imports></Imports>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
