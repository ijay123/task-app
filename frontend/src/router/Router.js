import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import Layout from "../components/layout/Layout";
import SignUp from "../screens/signUp/SignUp";
import Login from "../screens/login/Login";
import Start from "../screens/start/Start";
import Tasks from "../screens/tasks/Tasks";
import EditPage from "../screens/editPage/EditPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <Layout>
            <Tasks />
          </Layout>
        }
      />
         <Route
        path="/edit/:id"
        element={
          <Layout>
            <EditPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Router;
