import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../config/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userName = user.firstName || "User";

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-slate-100 shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-3xl"> Multimedia </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
