import type {  IPost } from "../interface";
import Comment from "../components/Comment";


const Post = ({ id, body, user, image }: IPost) => {
 
  
  return (
    <>
      <div className="flex items-center justify-start gap-2 w-full mb-5  px-10">
        <img src={user?.photo} alt="userImg" className="postuserImg" />
        <h5 className="">{user?.name}</h5>
      </div>
      <p className="text-start mb-5  px-10">{body}</p>
      <img src={image} alt="post-img" className=" px-10" />
      <Comment postID={id}/>
    </>
  );
};

export default Post;
