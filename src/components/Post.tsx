import type { IComment, IPost } from "../interface";
import Comment from "../components/Comment";
import { useGetCommentsQuery } from "../app/features/api/apiSlice";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
const Post = ({ id, body, user, image }: IPost) => {
  const { data } = useGetCommentsQuery(id);
  console.log(data);
  const [showComments, setShowComments] = useState(false);
  const handleComments = () => {
    setShowComments((prev) => !prev);
  };
  return (
    <>
      <div className="flex items-center justify-start gap-2 w-full mb-5  px-10">
        <img src={user?.photo} alt="userImg" className="postuserImg" />
        <h5 className="">{user?.name}</h5>
      </div>
      <p className="text-start mb-5  px-10">{body}</p>
      <img src={image} alt="post-img" className=" px-10" />
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
          <Fragment key={index}>
            <Comment
              content={comment.content}
              commentCreator={comment.commentCreator}
            />
          </Fragment>
        ))}
    </>
  );
};

export default Post;
