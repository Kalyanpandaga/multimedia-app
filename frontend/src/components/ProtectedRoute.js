// src/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../config/constants";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
