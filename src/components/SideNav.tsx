import { NavLink } from "react-router-dom";
import { useGetUserQuery } from "../app/features/api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const SideNav = ({ showSideNav }: { showSideNav: boolean }) => {
  const user = useGetUserQuery(null);
 const logOut = () => {
    localStorage.removeItem("user");
    location.replace("/auth/login");
  };
  console.log(user.data?.user, user.error, user.isLoading);

  return (
    <>
      <div className="rounded-xl overflow-hidden relative">

      {/* Cover Image */}
      <img src="/Cover.png" alt="" className=" w-full h-16 object-cover" />

      {/* Profile Photo */}
      <img
        src={user.data?.user?.photo}
        className="h-10 w-10 rounded-full border-1 absolute  top-[65px]  left-[7px] bg-slate-200 border-[#ffffff] shadow-md shadow-neutral-600 ms-[20px] mb-2 mt-[-20px] object-cover"
        alt=""
      />

      {/* Name */}
      <p className="text-start mx-[25px] mt-8 mb-5 text-[#000000]">
        {user.data?.user?.name}
      </p>

      {/* Navigation */}
      <div>
        <ul className="flex flex-col gap-2 items-start mx-[20px] font-extralight text-sm  mb-7">
          <NavLink to={"/"}>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/profile"}>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/Messages"}>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <FontAwesomeIcon icon={faMessage} />
              <span>Messages</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/notifications"}>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <FontAwesomeIcon icon={faBell} />
              <span>Notifications</span>
            </li>
          </NavLink>
          {showSideNav && 
          <>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <div
            onClick={logOut}
            className="flex gap-2 items-center font-sm ps-1 text-red-600 cursor-pointer "
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <a>Logout</a>
          </div>
          </>
          }
        </ul>
      </div>
      </div>
    </>
  );
};

export default memo(SideNav);
