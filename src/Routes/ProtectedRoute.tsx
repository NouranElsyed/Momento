import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  children: ReactNode;
  redirectTo: string;
}
const ProtectedRoute = ({ children, isAllowed, redirectTo }: IProps) => {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children;
};

export default ProtectedRoute;
