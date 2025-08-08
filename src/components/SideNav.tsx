import { NavLink } from "react-router-dom";
import { useGetUserQuery } from "../app/features/api/apiSlice";

const SideNav = () => {
  const user = useGetUserQuery(null);

  console.log(user.data?.user, user.error, user.isLoading);

  return (
    <>
    <div className="h-fit w-[250px] hidden md:block infoBox bg-[#ffffff] border border-[#dadde0db]  text-[#646464] ms-7 rounded-xl overflow-hidden relative">
      
      {/* Cover Image */}
      <img src="/public/cover.png" alt="" className=" w-full object-cover" />

      {/* Profile Photo */}
      <img
        src={user.data?.user?.photo}
        className="h-10 w-10 rounded-full border-1 absolute top-[60px] left-[15px] bg-slate-200 border-[#ffffff] shadow-md shadow-neutral-600 ms-[20px] mb-2 mt-[-20px] object-cover"
        alt=""
      />

      {/* Name */}
      <p className="text-start mx-[20px] my-8 text-[#000000]">{user.data?.user?.name}</p>

      {/* Navigation */}
      <div>
        <ul className="flex flex-col gap-2 items-start mx-[20px] font-extralight text-sm  mb-7">
          <NavLink to={"/"}>
            <li className="hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <i className="fi fi-rr-house-chimney me-3"></i>
              <span>Home</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/profile"}>
            <li className="hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <i className="fi fi-rr-user me-3"></i>
              <span>Profile</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/Messages"}>
            <li className="hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <i className="fi fi-rr-messages me-3"></i>
              <span>Messages</span>
            </li>
          </NavLink>
          <div className="w-full border-b-1 border-b-neutral-300"></div>
          <NavLink to={"/notifications"}>
            <li className="hover:text-blue-400 cursor-pointer transition-colors duration-250">
              <i className="fi fi-rs-bell me-3"></i>
              <span>Notifications</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
    
    </>
  );
};

export default SideNav;
