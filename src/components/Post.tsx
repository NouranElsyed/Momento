import type { IPost } from "../interface";

const Post = ({ body, user, image }: IPost) => {
  return (
    <>
      <div className=" flex items-center justify-start gap-2 w-full mb-5">
        <img src={user?.photo} alt="userImg" className="postuserImg" />
        <h5 className="">{user?.name}</h5>
      </div>
      <p className="text-start mb-5">{body}</p>
      <img src={image} alt="post-img" />
    </>
  );
};

export default Post;
