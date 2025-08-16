import type { IComment } from "../interface";
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useGetCommentsQuery } from "../app/features/api/apiSlice";

const Comment = ({postID}: {postID: string|undefined }) => {
  
  const { data } = useGetCommentsQuery(postID);
  console.log(data)
   const [showComments, setShowComments] = useState(false);
  const handleComments = () => {
    setShowComments((prev) => !prev);
  };
  console.log( data?.comments)
  return (
    <>
      
       <div className="w-full border-b border-neutral-300 my-3"></div>
      <div
        onClick={handleComments}
        className="flex gap-2 text-base justify-center items-center cursor-pointer text-[#646464] hover:text-blue-400 "
      >
        <span>{data?.total}</span>
        <p>Comments</p>
        <FontAwesomeIcon icon={faCommentDots} />
      </div>
      {showComments && <div className="w-full border-b border-neutral-300 my-3"></div>}
      {showComments &&
        data?.comments.map((comment: IComment, index: number) => (
         
        <div key={index} className="flex justify-start gap-2 w-full my-3  px-5">
          {/* <img src={commentCreator?.photo} alt="userImg" className="postuserImg" /> */}
          <img
            src="/photoforcomments.png"
            alt="userImg"
            className="w-[30px] h-[30px] bg-blue-200 rounded-full mt-1"
          />
         <div className="bg-[#cccbcb55] w-9/10 flex flex-col items-start rounded-2xl py-2">
        <h5 className="ps-3  font-medium">{comment.commentCreator?.name}</h5>
        <p className="rounded-2xl py-1 ps-5 text-[#535151]">
          {comment.content}
        </p>
        </div>
        </div>
        

          ))}
    </>
  );
};

export default Comment;
