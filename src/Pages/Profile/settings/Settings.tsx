import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
const Settings = () => {
  return (
    <div className="w-full mx-auto flex flex-col  gap-10">
      <div className=" bg-[#ffffff] border border-[#dadde0db] text-[#4c4a4a] rounded-2xl overflow-hidden">
        <div className="flex gap-3 text-black font-medium px-7 py-5 text-start items-center ">
          <FontAwesomeIcon icon={faGears} />
          <h4>Setting</h4>
        </div>
        <div className="w-full border-b border-neutral-300 "></div>
        <div className="flex text-sm ">
          <ul className="flex flex-col w-1/4 py-7 items-start">
            <NavLink to={"/profile/settings"} end className="setting py-2  w-full ">
              <li >
                Upload photo
              </li>
            </NavLink>
            
              <NavLink to={"/profile/settings/changepassword"} className="setting py-2 w-full ">
              <li >
              Change password
            </li>
            </NavLink>
          </ul>
          <div className=" border-e border-neutral-300 "> </div>
          <ul className="flex flex-col w-3/4 ">
            <Outlet />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
