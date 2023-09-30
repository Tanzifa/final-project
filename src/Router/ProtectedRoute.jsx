import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!localStorage.getItem("user")) {
    return <Navigate to="/adminLogin" state={{ from: location }} replace />; //eger localstoragede user adli istifadeci yoxdusa navigate ile adminlogine gonderir.
  }

  return children;
};
