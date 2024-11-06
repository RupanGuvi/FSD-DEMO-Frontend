import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to={"/"} className="text-xl font-bold">
          Bloggify
        </Link>
        <div>
          <Link to={"/"} className="mr-4">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={"/create"} className="mr-4">
                Create Blog
              </Link>
              <Link to={"/admin"} className="mr-4">
                Admin Panel
              </Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="mr-4">
                Login
              </Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
