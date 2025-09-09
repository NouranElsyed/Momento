import { NavLink, Outlet } from "react-router-dom";
import {
  useGetUserPostsQuery,
  useGetUserQuery,
} from "../../app/features/api/apiSlice";

const Profile = () => {
  const { isError, data, isLoading } = useGetUserQuery(null);
  console.log(data);
  const { data: userPosts, isLoading: loadingPosts } = useGetUserPostsQuery(
    data?.user?._id
  );
  console.log(isError, data, isLoading, userPosts);
  return (
    <div className="flex flex-col gap-5 w-9/10 md:w-5/6 lg:w-4/6   mx-auto ">
      <div className=" bg-[#ffffff] border border-[#dadde0db] h-fit rounded-2xl overflow-hidden">
        <div className="flex  justify-between items-center px-10 py-8 flex-col gap-5 md:flex-row text-[#000000]">
          <div className="user flex flex-col md:flex-row  gap-3 items-center">
            <img
              src={data?.user?.photo}
              className="h-14 w-14 rounded-full border-1 border-[#bdbdbd] object-cover bg-slate-200 "
              alt=""
            />
            <p className="text-lg">{data?.user?.name}</p>
          </div>
          <ul className="flex gap-7 text-sm md:text-base">
            <li className="flex flex-col">
              <span className="font-semibold">
                {loadingPosts ? 0 : userPosts?.posts?.length}
              </span>
              <p>Posts</p>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">207</span>
              <p>Followers</p>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">64</span>
              <p>Following</p>
            </li>
          </ul>
        </div>
        <div className="w-full border-b border-neutral-300 "></div>
        <ul className="flex justify-center md:justify-start gap-5 mx-10 my-3 text-sm text-[#646464]">
          <li>
            <NavLink
              to={"/profile"}
              end
              className={
                "hover:text-blue-400 cursor-pointer transition-colors duration-250"
              }
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/profile/savedposts"}
              className={
                "hover:text-blue-400 cursor-pointer transition-colors duration-250"
              }
            >
              Saved Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/profile/settings"}
              className={
                "hover:text-blue-400 cursor-pointer transition-colors duration-250"
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
