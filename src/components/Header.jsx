import React, { useEffect } from "react";
import logo from "../assets/plogo.svg";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import useLogout from "../hooks/useLogout";

function Header() {
  const { auth } = useAuth();
  const logout = useLogout();

  const signout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="px-8 py-4 mx-8">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} className="w-48" alt="panasonic" />
        </Link>
        <nav className="flex items-center space-x-4">
          <NavLink to="/guide">Guide</NavLink>
          <NavLink to="/breakdown">Breakdown</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {!auth && (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300"
            >
              Login
            </Link>
          )}
          {!auth && (
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md transition duration-300"
            >
              Register
            </Link>
          )}
          {auth && (
            <Link
              onClick={signout}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition duration-300"
            >
              Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-lg font-medium hover:underline focus:outline-none focus:underline"
  >
    {children}
  </Link>
);

export default Header;
