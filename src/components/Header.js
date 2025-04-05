import * as React from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/auth-context";
import Logo from "../assets/mclogo.png"; // Import your logo

const Header = () => {
  const { user, logout } = useAuth() || {};
  return (
    <>
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full h-16 p-4 z-30 bg-transparent text-neonBlue">
        <Link to="/" className="hover:underline cursor-pointer flex items-center space-x-2">
          {/* Logo */}
          <img src={Logo} alt="Mind Clash Logo" className="h-16 w-16" />
          {/* Mind Clash Title */}
          <span className="mind-clash-title font-orbitron text-3xl font-extrabold">
            <span className="text-white">Mind</span>
            <span className="text-neonPink"> Clash</span>
          </span>
        </Link>
      </div>

      {/* User Info and Logout */}
      {user && user.email && (
        <div className="absolute bottom-0 left-0 w-full p-4 z-30 bg-transparent text-neonBlue">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className={`${
                user.photoURL ? "pl-1" : "pl-3"
              } pr-1 py-1 mb-5 md:mb-0 bg-transparent inline-block rounded-full border border-neonPink`}
            >
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <img src={user.photoURL} className="rounded-full h-8 border-2 border-neonPink" />
                )}
                <p className="text-neonBlue">{user.name || user.displayName || user.email}</p>
                <button
                  className="bg-neonPink hover:bg-neonBlue p-2 rounded-full text-dark transition-transform transform hover:scale-110"
                  onClick={logout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
