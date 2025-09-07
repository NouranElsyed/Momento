import type { IPost } from "../interface";
import Comment from "../components/Comment";
import { NavLink } from "react-router-dom";

const Post = ({ id, body, user, image }: IPost) => {
  return (
    <>
      <NavLink to={`/post/${id}`} className="w-full">
        <div className="flex items-center justify-start gap-2 w-full mb-5  px-10">
          <img src={user?.photo} alt="userImg" className="postuserImg" />
          <h5 className="">{user?.name}</h5>
        </div>
        <p className="text-start mb-5  px-10">{body}</p>
        <img src={image} alt="post-img" className=" px-10 w-full" />
      </NavLink>
      <Comment postID={id} />
    </>
  );
};

export default Post;
