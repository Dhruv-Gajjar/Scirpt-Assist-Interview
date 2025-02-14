import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/auth-store";

interface AuthGuard {
  children: ReactNode;
  requiredAuth: boolean;
}

const AuthGuard: FC<AuthGuard> = ({ children, requiredAuth = true }) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (requiredAuth && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
