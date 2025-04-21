import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/homelayout/HomeLayout"; // Adjust the path as needed
import React from "react";
import SignUp from "../layouts/signUp/SignUp";
import SignIn from "../layouts/signIn/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(HomeLayout),
  },
  {
    path: "/sign-up",
    element: React.createElement(SignUp),
  },
  {
    path: "/sign-in",
    element: React.createElement(SignIn),
  },
]);

export default router;
