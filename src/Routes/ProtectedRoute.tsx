import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../app/features/api/apiSlice";
import { PropagateLoader } from "react-spinners";
interface IProps {
  children: ReactNode;
  redirectTo: string;
  forPublic: boolean;
}

const ProtectedRoute = ({ children, forPublic, redirectTo }: IProps) => {
  const { data, isLoading } = useGetUserQuery(null);
if (isLoading) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <PropagateLoader color="#2b83da" size={25} />
    </div>
  );
}
  // if (!(!!data&&forPublic)) return <Navigate to={redirectTo} />;
  if (!data) {
    if (forPublic) {
      return children;
    } else {
      return <Navigate to={redirectTo} />;
    }
  } else {
    if (!forPublic) {
      return children;
    } else {
      return <Navigate to={redirectTo} />;
    }
  }
  // const isAllowed = !!data?.user;

  // if (!isAllowed) return <Navigate to={redirectTo} />;
  return children;
};

export default ProtectedRoute;
