import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import SideNav from "../components/SideNav";

const MainLayout = () => {
  const logOut = () => {
    localStorage.removeItem("user");
    location.replace("/auth/login");
  };
  return (
    <>
      <Navbar className="z-50">
        <div className="font-bold px-7 text-md flex gap-2  items-center">
          <img src="/Logo.svg" alt="Monento logo" className="MonentoLogo" />
          <h2>Momento</h2>
        </div>

        <div
          onClick={logOut}
          className="flex gap-1.5 px-5 font-sm  text-red-600 cursor-pointer "
        >
          <i className="fi fi-rr-sign-out-alt"></i>
          <a>Logout</a>
        </div>
      </Navbar>

      <div className="outlet w-full min-h-screen bg-[#f6f9fd] flex md:px-5 lg:px-10 gap-5 pt-25">
        <SideNav />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
