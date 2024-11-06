import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./Pages/Blog";
import CreateBlog from "./Pages/CreateBlog";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AdminPanel from "./Pages/AdminPanel";
import Navbar from "./Components/Navbar";
import { ToastContainer } from 'react-toastify';
import NotFound from "./Pages/NotFound";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";


const App = () => {
  return (
    <div>
       <div>
      <ToastContainer />
     </div>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/create" element={<ProtectedRoutes><CreateBlog /></ProtectedRoutes>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/admin" element={<ProtectedRoutes adminOnly><AdminPanel /></ProtectedRoutes>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
