import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Common/Dashboard/Dashboard";
import ResumeContent from "../Common/Dashboard/ResumesContainer";
import UserInfo from "../Common/Dashboard/UserInfo";
import Home from "../FunctionalComponents/Homepage/Home";
import Login from "../FunctionalComponents/LoginPage/Login";
import Register from "../FunctionalComponents/RegisterPage/Register";
import PageNotFound from "../features/404Page/404Page";
import AddNewResume from "../FunctionalComponents/ResumesDataTable/AddNewResume";
import ChangePassword from "../Common/Navbar/ChangePassword";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users-info" element={<UserInfo />} />
      <Route path="/resumes" element={<ResumeContent />} />
      <Route path="/add-new-resume" element={<AddNewResume />} />
      <Route path="/change-password" element={<ChangePassword />} />

    </Routes>
  );
}

export default Router;
