import {
  useGetPostsQuery,
  useGetUserQuery,
} from "../app/features/api/apiSlice";
import Post from "../components/Post";
import type { IPost } from "../interface";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Feed = () => {
  const user = useGetUserQuery(null);
  console.log(user.data?.user, user.error, user.isLoading);
  const { data: dataPosts, isLoading } = useGetPostsQuery(null);
  
  if (isLoading || !dataPosts) {
    return (
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#bbbbbb">
        <div className="w-9/10 md:w-5/6 lg:w-4/6 mx-auto flex flex-col  gap-10">
          <div className=" bg-[#ffffff] border  border-[#dadde0db] w-full mx-auto rounded-2xl px-10 pt-7 pb-3">
            <div className=" flex items-center gap-2 w-full mb-5">
              <Skeleton circle height={40} width={40} />
              <Skeleton height={20} width={100} />
            </div>
            <Skeleton height={20} width={`90%`} className="text-start mb-5" />
            <Skeleton height={300} width={`90%`} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }
  const posts = dataPosts.posts;
  
  return (
    <div className="w-9/10 md:w-5/6 lg:w-4/6 mx-auto flex flex-col  gap-10">
      {posts &&
         [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 20).map((post: IPost) => (
          <div
            key={post.id}
            className="flex flex-col justify-center bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl pt-7 pb-3"
          >
            <Post
              user={post.user}
              body={post.body}
              image={post.image}
              id={post.id}
            />
          </div>
        ))}
    </div>
  );
};
export default Feed;
