import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
