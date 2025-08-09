import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
const Settings = () => {
  return (
    <div className="w-full mx-auto flex flex-col  gap-10">
      <div className=" bg-[#ffffff] border border-[#dadde0db] text-[#4c4a4a] rounded-2xl overflow-hidden">
        <div className="flex gap-2 text-black font-medium px-10 py-5 text-start items-center ">
          <FontAwesomeIcon icon={faGears} />
          <h4>
            Setting
          </h4>
        </div>
        <div className="w-full border-b border-neutral-300 "></div>
        <div className="flex text-sm ">
          <ul className="flex flex-col w-1/4 px-10 py-7 items-start">
            <li className="py-4">Upload photo</li>
            <li>Change password</li>
          </ul>
          <div className=" border-e border-neutral-300 "> </div>
          <ul className="flex flex-col w-3/4 ">
            <Outlet/>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
