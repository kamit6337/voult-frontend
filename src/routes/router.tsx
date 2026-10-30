import AuthLayout from "@/layouts/AuthLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import RootLayout from "@/layouts/RootLayout";
import OAuth from "@/pages/auth/OAuth";
import SignIn from "@/pages/auth/SignIn/SignIn";
import SignUp from "@/pages/auth/SignUp";
import FavouritePage from "@/pages/protected/favourite/page";
import Home from "@/pages/protected/home/Home";
import ProjectsPage from "@/pages/protected/projects/page";
import SecretPage from "@/pages/protected/secrets/page";
import SingleProject from "@/pages/protected/single_project/page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,

    children: [
      {
        element: <AuthLayout />,

        children: [
          {
            path: "/signin",
            element: <SignIn />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/oauth",
            element: <OAuth />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,

        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/secrets",
            element: <SecretPage />,
          },
          {
            path: "/favourite",
            element: <FavouritePage />,
          },
          {
            path: "/projects",
            element: <ProjectsPage />,
          },
          {
            path: "/single",
            element: <SingleProject />,
          },
        ],
      },
    ],
  },
]);
