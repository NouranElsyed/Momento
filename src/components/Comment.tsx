import type { IComment } from "../interface";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faComments } from "@fortawesome/free-regular-svg-icons";
import {
  useGetCommentsQuery,
  useGetUserQuery,
} from "../app/features/api/apiSlice";
import {
  faArrowRight,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Comment = ({ postID }: { postID: string | undefined }) => {
  //** getting user and comments data */
  const user = useGetUserQuery(null);
  const { data } = useGetCommentsQuery(postID);
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
    console.log(comment);
    const body = comment;
    setComment((prev) => ({ ...prev, content: "" }));
    if (!comment.content.trim()) return;
    const userToken = localStorage.getItem("user");
    const useTokenParsed = userToken ? JSON.parse(userToken) : null;
    const token = useTokenParsed.token;
    try {
      const res = await api.post("/comments", body, {
        headers: {
          token: token,
        },
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("comment submitted successfully", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //** Return */
  return (
    <>
      <div className="w-full border-b border-neutral-300 mt-5"></div>
      <div className=" w-8/10 md:w-7/10 mx-auto flex text-base justify-between items-center cursor-pointer text-[#646464] ">
        <div
          className="writeComment flex gap-2 items-center py-3  hover:text-blue-400"
          onClick={handleComment}
        >
          <FontAwesomeIcon icon={faCommentDots} />
          <p>write a comment</p>
        </div>
        <div className="h-full border-r border-neutral-300 my-3"></div>

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
            className="h-10 w-10 rounded-full border-1 ms-5 bg-slate-200 border-[#ffffff] shadow-sm shadow-neutral-600 object-cover"
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
            {/* <img src={commentCreator?.photo} alt="userImg" className="postuserImg" /> */}
            <img
              src="/photoforcomments.png"
              alt="userImg"
              // className="w-[30px] h-[30px] bg-blue-200 rounded-full mt-1"
              className="h-10 w-10 rounded-full border-1 mx-3 bg-slate-200 border-[#ffffff] shadow-xs shadow-neutral-600 object-cover"
            />
            <div className="bg-[#cccbcb55] w-9/10 flex justify-between items-center rounded-2xl py-2 shadow-xs shadow-neutral-600">
              <div className="flex flex-col items-start">
                {" "}
                <h5 className="ps-3 text-xs font-bold">
                  {comment.commentCreator?.name}
                </h5>
                <p className="rounded-2xl py-1 ps-5 text-[#474646]">
                  {comment.content}
                </p>
              </div>
              <div className="me-5 flex gap-3">
                <FontAwesomeIcon
                  icon={faPen}
                  className=" text-blue-900 hover:text-blue-400 transform duration-300"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className=" text-red-700 hover:text-red-400 transform
                duration-300"
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Comment;
