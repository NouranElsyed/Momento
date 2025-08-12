import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="outlet w-full min-h-screen bg-[#ECF0F5] flex flex-col items-center justify-center">
      <div className="py-5 w-5/6  md:w-2/6 bg-[#ffffff] flex flex-col items-center justify-center shadow-xl"><Outlet /></div>
    </div>
  );
};

export default AuthLayout;
