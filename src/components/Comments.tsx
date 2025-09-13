import type { IComment } from "../interface";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faComments } from "@fortawesome/free-regular-svg-icons";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useGetUserQuery,
} from "../app/features/api/apiSlice";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Comment from "./Comment"

const Comments = ({ postID }: { postID: string | undefined }) => {
  //** getting user and comments data */
  const user = useGetUserQuery(null);
  const { data } = useGetCommentsQuery(postID);
  const [addComment] = useAddCommentMutation();
 const { data: postData } = useGetPostQuery(postID);
  //**  show comments state and handle showing comments*/
  const [showComments, setShowComments] = useState(false);
  const handleComments = () => {
    setShowComments((prev) => !prev);
  };
  //**  write comment state and handle writing comment*/
  const [writeComment, setWriteComment] = useState(false);
  const handleComment = () => {
    setWriteComment((prev) => !prev);
  };
  //**  comment state and submit comment*/
  const [comment, setComment] = useState({
    content: "",
    post: postID,
  });

  const submitComment = async () => {
    console.log(user.data.user._id !== postData.post.user._id )
    if (!comment.content.trim()) return;
    try {
      await addComment(comment).unwrap();
      setComment((prev) => ({ ...prev, content: "" }));
      toast.success("comment submitted successfully", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
    }
  };


  //** Return */
  return (
    <>
      <div className="w-full border-b border-neutral-300 mt-5 "></div>
      <div className="w-8/10 md:w-11/12 lg:w-7/10 mx-auto flex justify-between items-center cursor-pointer text-[#646464] text-sm md:text-base ">
        <div
          className="writeComment flex gap-2 items-center py-3  hover:text-blue-400"
          onClick={handleComment}
        >
          <FontAwesomeIcon icon={faCommentDots} />
          <p>write a comment</p>
        </div>
        <div className="h-full border-r w-px border-neutral-300 my-3"></div>

        <div
          className="showComments flex gap-2 items-center py-3  hover:text-blue-400"
          onClick={handleComments}
        >
          <span>{data?.total}</span>
          <FontAwesomeIcon icon={faComments} />
          <p>Comments</p>
        </div>
      </div>
      {(showComments || writeComment) && (
        <div className="w-full border-b border-neutral-300 mb-5"></div>
      )}
      {writeComment && (
        <div className="flex gap-1 my-2 items-start">
          <img
            src={user.data?.user?.photo}
            className="h-10 w-10 rounded-full border-1 ms-5 bg-slate-100 border-[#ffffff] shadow-sm shadow-neutral-500 object-cover"
            alt=""
          />
          <div className="flex flex-1 gap-2 items-center me-5">
            <textarea
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 mb-3 mx-2 focus:outline-0"
              value={comment.content}
              onChange={(e) => {
                setComment((prev) => ({ ...prev, content: e.target.value }));
              }}
            />
            <motion.div
              onClick={submitComment}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm relative"
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </motion.div>
          </div>
        </div>
      )}
      {showComments && data?.comments?.length === 0 && (
        <p className="pb-5 text-[#646464]"> No Comments yet</p>
      )}
      {showComments &&
        data?.comments?.length > 0 &&
        data?.comments.map((comment: IComment, index: number) => (
          <div
            key={index}
            className="flex justify-start gap-2 w-full my-3  px-3"
          >
           <Comment comment={comment} postID={postID}/>
          </div>
        ))}
    </>
  );
};

export default Comments;
