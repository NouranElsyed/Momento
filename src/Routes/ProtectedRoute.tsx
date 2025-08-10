import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../app/features/api/apiSlice";

interface IProps {
  children: ReactNode;
  redirectTo: string;
  forPublic: boolean;
}
const ProtectedRoute = ({ children, forPublic, redirectTo }: IProps) => {
  const { data, isLoading } = useGetUserQuery(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (!(!!data&&forPublic)) return <Navigate to={redirectTo} />;
  if (!data) {
    if (forPublic) {
      console.log("!data forPublic");
      return children;
    } else {
      console.log("!data !forPublic");

      return <Navigate to={redirectTo} />;
    }
  } else {
      console.log(data);
    if (!forPublic) {
      console.log("data !forPublic");

      return children;
    } else {
      console.log("data forPublic");

      return <Navigate to={redirectTo} />;
    }
  }
  // const isAllowed = !!data?.user;

  // if (!isAllowed) return <Navigate to={redirectTo} />;
  return children;
};

export default ProtectedRoute;
