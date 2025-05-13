import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/dashboard/Dashboard"; // Adjust the path as needed
import HomeLayout from "../layouts/homelayout/HomeLayout"; // Adjust the path as needed
import React from "react";
import SignIn from "../layouts/signIn/SignIn";
import StudentManagement from "../layouts/studentManagement/StudentManagement";
import TeachersManagement from "../layouts/teachersManagement/TeachersManagement";
import Subjects from "../layouts/subjects/Subjects";
import ClassManagement from "../layouts/classManagement/ClassManagement";

import AssignmentManagement from "../layouts/assignmentManagement/AssignmentManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(HomeLayout),
    children: [
      {
        index: true,
        element: React.createElement(Dashboard),
      },
      {
        path: "/students-management",
        element: React.createElement(StudentManagement),
      },
      {
        path: "/teachers-management",
        element: React.createElement(TeachersManagement),
      },
      {
        path: "/subjects",
        element: React.createElement(Subjects),
      },
      {
        path: "/assignment-management",
        children: [
          {
            index: true,
            element: React.createElement(AssignmentManagement),
          },
        ],
      },
      {
        path: "/class-management",
        children: [
          {
            index: true,
            element: React.createElement(ClassManagement),
          },
          {
            path: "enrollments",
            element: React.createElement(ClassManagement),
          },
        ],
      },
    ],
  },
  // {
  //   path: "/sign-up",
  //   element: React.createElement(SignUp),
  // },
  {
    path: "/sign-in",
    element: React.createElement(SignIn),
  },
]);

export default router;
