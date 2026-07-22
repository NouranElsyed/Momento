import { useEffect, useState } from "react";
import { useGetPostsQuery } from "../app/features/api/apiSlice";
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

const PostSkeleton = () => (
  <div className="bg-white border border-[#EFEFEF] rounded-2xl px-6 pt-6 pb-4">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton circle height={44} width={44} />
      <div className="flex flex-col gap-1">
        <Skeleton height={14} width={120} />
        <Skeleton height={10} width={70} />
      </div>
    </div>
    <Skeleton height={14} width="85%" className="mb-2" />
    <Skeleton height={14} width="60%" className="mb-4" />
    <Skeleton height={280} borderRadius={12} />
  </div>
);

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
      <div className="flex w-9/10 mx-auto justify-between gap-7">
        <SkeletonTheme baseColor="#F3F4F6" highlightColor="#FAFAFA">
          <div className="w-full md:w-4/7 lg:w-5/7 mx-auto flex flex-col gap-5">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        </SkeletonTheme>
        <SuggestFriends />
      </div>
    );
  }

  const posts = dataPosts.posts;

  if (!posts || posts.length === 0) {
    return (
      <div className="flex w-9/10 mx-auto justify-between gap-7">
        <div className="w-full md:w-4/7 lg:w-5/7 mx-auto flex flex-col gap-5">
          <CreatePost />
          <div className="bg-white border border-[#EFEFEF] rounded-2xl px-8 py-14 text-center flex flex-col items-center gap-2">
            <span className="text-2xl">🪶</span>
            <p className="text-[#0F1419] font-medium text-[15px]">Nothing here yet</p>
            <p className="text-[#8E8E93] text-[13px]">
              Follow people or share your first post to fill this feed.
            </p>
          </div>
        </div>
        <SuggestFriends />
      </div>
    );
  }

  return (
    <div className="flex w-9/10 mx-auto justify-between gap-7">
      <div className="w-full md:w-4/7 lg:w-5/7 mx-auto flex flex-col gap-5">
        <CreatePost />
        {[...posts]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 40)
          .map((post: IPost) => (
            <div
              key={post.id}
              className="flex flex-col justify-center bg-white border border-[#EFEFEF] text-[#0F1419] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_2px_16px_rgba(15,20,25,0.04)]"
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
          className="flex justify-center mx-auto w-8/10 md:w-full pt-2"
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
      <SuggestFriends />
    </div>
  );
};

export default Feed;
