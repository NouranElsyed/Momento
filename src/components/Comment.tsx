import {
  useDeleteCommentMutation,
  useGetPostQuery,
  useGetUserQuery,
  useUpdateCommentMutation,
} from "../app/features/api/apiSlice";
import {
  faArrowRight,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { IComment } from "../interface";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface IProps {
    comment:IComment,
    postID:string | undefined
}
const Comment = ({comment,postID}:IProps) => {
      const user = useGetUserQuery(null);
    
 const { data: postData } = useGetPostQuery(postID);
      const [deleteComment] = useDeleteCommentMutation();
      const [updatedComment] = useUpdateCommentMutation();
        const [updateComment, setUpdateComment] = useState({
    content: ""
  });
  const [update,setUpdate] = useState(false) 
      //** Delete comment */
        const deleteCommentHandler = async (id:string) => {
        try {
          await deleteComment(id).unwrap();
          toast.success("comment deleted successfully", {
            duration: 2000,
            position: "bottom-right",
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      //** update comment */
          const submitUpdate = async (id:string) => {
            setUpdate(false)
        try {
          console.log(updateComment.content)
          await updatedComment({id,body:updateComment}).unwrap();
          toast.success("comment updated successfully", {
            duration: 2000,
            position: "bottom-right",
          });
        } catch (error) {
          console.log(error);
        }
      };
       const updateCommentHandler = (comment:IComment) => {
            setUpdateComment((prev) => ({ ...prev, content: comment?.content ?? "" }));
            setUpdate(true)
       }
    
  return (
    <>
     {/* <img src={commentCreator?.photo} alt="userImg" className="postuserImg" /> */}
            <img
              src="/photoforcomments.png"
              alt="userImg"
              // className="w-[30px] h-[30px] bg-blue-200 rounded-full mt-1"
              className="h-10 w-10 rounded-full border-1 mx-3 bg-slate-200 border-[#ffffff] shadow-xs shadow-neutral-600 object-cover"
            />
            <div className="bg-neutral-100 w-9/10 flex justify-between items-center rounded-2xl rounded-tl-none mt-3 py-2 shadow-xs shadow-neutral-600">
              <div className="flex flex-col items-start flex-1">
                {" "}
                <h5 className="ps-3 text-xs font-bold">
                  {comment.commentCreator?.name}
                </h5>
                {
                  update ?
                   <textarea
              placeholder="Write a comment..."
                      className="w-full px-3 py-2 mb-3 mx-2 focus:outline-0 rounded-md resize-none"
              value={updateComment.content}
              onChange={(e) => {
                setUpdateComment((prev) => ({ ...prev, content: e.target.value }));
              }}
            />
                :<p className="rounded-2xl py-1 ps-5 text-[#474646]">
                  {comment.content}
                </p>
                }
              </div>
              {
                 user.data.user._id === postData.post.user._id   && (update ?
                 (<motion.div
              onClick={()=>submitUpdate(comment._id!)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-8 h-8 rounded-full me-5 bg-blue-500 text-white text-sm relative "
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </motion.div>
                 ):(
                 <div className="me-5 flex gap-3">
                <FontAwesomeIcon
                  icon={faPen}
                  className=" text-blue-900 hover:text-blue-400 transform duration-300"
                   onClick={()=>updateCommentHandler(comment)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className=" text-red-700 hover:text-red-400 transform
                duration-300"
                onClick={()=>deleteCommentHandler(comment._id!)}
                />
              </div>
             )) }
              
            </div>
    </>
  )
}

export default Comment