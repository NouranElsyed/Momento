import {
  useGetUserPostsQuery,
  useGetUserQuery,
} from "../../app/features/api/apiSlice";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import type { IPost } from "../../interface";

const MyPosts = () => {
  const { data } = useGetUserQuery(null);
  const { data: userPosts, isError: error } = useGetUserPostsQuery(
    data?.user?._id
  );
  console.log(userPosts, error);
  if (!userPosts || userPosts?.posts?.length === 0) {
    return (
      <div className="w-full mx-auto flex flex-col  gap-10">
        <div className=" bg-[#ffffff] border border-[#dadde0db] text-[#5c5c5c] rounded-2xl px-10 py-7">
          No Posts Yet
        </div>
      </div>
    );
  }
  console.log(userPosts);
  return (
    <div className="w-full mx-auto flex flex-col  gap-7">
      <CreatePost />
      {userPosts &&
        [...userPosts.posts]
          .sort(
            (a: IPost, b: IPost) =>
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime()
          )
          .map((post: IPost) => (
            <div
              key={post.id}
              className="flex flex-col justify-center bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl pt-7"
            >
              <Post
                id={post.id}
                user={post.user}
                body={post.body}
                image={post.image}
                createdAt={post.createdAt}
              />
            </div>
          ))}
    </div>
  );
};

export default MyPosts;
