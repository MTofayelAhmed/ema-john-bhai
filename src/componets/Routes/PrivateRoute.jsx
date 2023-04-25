import React, { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const { user, loading } = useContext(authContext);
  if (loading) {
    return <div>loading....</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state= {{from: location }} replace></Navigate>;
};

export default PrivateRoute;
