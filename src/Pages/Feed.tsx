import { useEffect, useState } from "react";
import {
  useGetPostsQuery,
  // useGetUserQuery,
} from "../app/features/api/apiSlice";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import type { IPost } from "../interface";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SuggestFriends from "../components/SuggestFriends";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



const Feed = () => {
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(lastPage);
    const apiPage = lastPage - page + 1;

  const { data: dataPosts, isLoading } = useGetPostsQuery(apiPage);

  useEffect(() => {
    if (dataPosts?.paginationInfo?.numberOfPages) {
      setLastPage(dataPosts.paginationInfo.numberOfPages);
    }
  }, [dataPosts?.paginationInfo?.numberOfPages]);

  if (isLoading || !dataPosts) {
    return (
      <div className="flex w-9/10 mx-auto justify-between">
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#bbbbbb">
         <div className="w-full sm:9/10 md:w-4/7 lg:w-5/7 mx-auto flex flex-col gap-7">
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
          <SuggestFriends/>
   
  </div>
    );
  }
  const posts = dataPosts.posts;

  return (
    
        <div className="flex w-9/10 mx-auto justify-between">
           <div className="w-full sm:7/10 md:w-4/7 mx-auto flex flex-col gap-7">
      <CreatePost />
      {posts &&
        [...posts]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 40)
          .map((post: IPost) => (
            <div
              key={post.id}
                    className="flex flex-col justify-center bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl pt-7"
                  >
              <Post
                user={post.user}
                body={post.body}
                image={post.image}
                id={post.id}
                createdAt={post.createdAt}
              />
              </div>
          ))}
            <Pagination
              className="flex justify-center mx-auto w-8/10 md:w-full"
              count={lastPage}
              page={page}
              onChange={(_, value) => setPage(value)}
              renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                />
              )}
            />
          </div>
          <SuggestFriends/>
    
        </div>
               

   
   
  );
};
export default Feed;
