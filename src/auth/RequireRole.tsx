import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const RequireRole = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const roles = useAuthContext().roles;
  const hasRole = allowedRoles.some(role => roles.includes(role));

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireRole;