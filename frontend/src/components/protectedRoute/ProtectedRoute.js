import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

export const ProtectedRoute = ({ children }) => {
  const loginUser = useSelector((state) => state.loggedInUser);
  console.log(loginUser, "loginUser");
  if (!loginUser) {
    // Redirect to login if user is not logged in
    return <Navigate to="/login" />;
  } else if (loginUser) {
    // Render the Layout for users
    return <Layout>{children}</Layout>;
  }
};
