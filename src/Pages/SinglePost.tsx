import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../app/features/api/apiSlice";
import Post from "../components/Post";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SinglePost = () => {
  const { id } = useParams();
  const { data: postData, isLoading } = useGetPostQuery(id);
  console.log(postData);
  if (isLoading) {
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
  return (
    <>
      <div className="w-9/10 md:w-5/6 lg:w-4/6 mx-auto flex flex-col  gap-10">
        <div className="flex flex-col justify-center bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl pt-7">
          <Post
            user={postData.post.user}
            body={postData.post.body}
            image={postData.post.image}
            id={postData.post.id}
          />
        </div>
      </div>
    </>
  );
};

export default SinglePost;
