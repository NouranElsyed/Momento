import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import SideNav from "../components/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const MainLayout = () => {
  const logOut = () => {
    localStorage.removeItem("user");
    location.replace("/auth/login");
  };
  const [showSideNav, setShowSetNav] = useState(false);
  const toggleSideNav = () => {
    setShowSetNav((prev) => !prev);
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
          className="hidden md:flex items-center gap-1.5 px-5 font-sm  text-red-600 cursor-pointer "
        >
          <a>Logout</a>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
        <div
          onClick={toggleSideNav}
          className="block md:hidden px-5 font-sm  text-blue-600 cursor-pointer "
        >
          {(!showSideNav && <FontAwesomeIcon icon={faCircleChevronDown} />) || (
            <FontAwesomeIcon icon={faCircleChevronUp} />
          )}
        </div>
      </Navbar>

      <div className={`outlet w-full min-h-screen bg-[#f6f9fd] flex ${showSideNav? "flex-col md:flex-row" : ""} md:px-5 lg:px-10 gap-5 pt-25`}>
        {showSideNav &&
            <div className="h-fit w-9/10 md:hidden block mx-auto bg-[#ffffff] border border-[#dadde0db]  text-[#646464] rounded-xl overflow-hidden relative">
          <SideNav />
        </div>
        }
        <div className="h-fit w-[250px] hidden md:block infoBox bg-[#ffffff] border border-[#dadde0db]  text-[#646464] md:ms-1 lg:ms-7 rounded-xl overflow-hidden relative">
          <SideNav />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
