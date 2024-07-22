import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { autoCloseAlert } from "../utils/alerts";

const ProtectedRoutes = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (!loading && !isAuthenticated) {
    autoCloseAlert("Primero debes ingresar a tu cuenta", "warning");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;