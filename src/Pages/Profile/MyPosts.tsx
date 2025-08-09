import {
  useGetUserPostsQuery,
  useGetUserQuery,
} from "../../app/features/api/apiSlice";
import Post from "../../components/Post";
import type { IPost } from "../../interface";

const MyPosts = () => {
  const { data } = useGetUserQuery(null);
  const { data: userPosts, isError: error } = useGetUserPostsQuery(
    data?.user?._id
  );
  console.log(userPosts, error);
  if (!data?.posts)
    return (
      <div className="w-full mx-auto flex flex-col  gap-10">
        <div
          className=" bg-[#ffffff] border border-[#dadde0db] text-[#5c5c5c] rounded-2xl px-10 py-7"
        >
        No Posts Yet
        </div>
      </div>
    );
  return (
    <div className="w-full mx-auto flex flex-col  gap-10">
      {userPosts &&
        userPosts.map((post: IPost) => (
          <div
            key={post.id}
            className=" bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl px-10 py-7"
          >
            <Post user={post.user} body={post.body} image={post.image} />
          </div>
        ))}
    </div>
  );
};

export default MyPosts;
