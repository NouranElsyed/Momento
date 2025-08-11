import type { IComment } from "../interface";

const Comment = ({ content, commentCreator }: IComment) => {
  console.log(commentCreator?.photo);
  return (
    <>
      <div className="w-full border-b border-neutral-300 my-3"></div>
      <div>
        <div className="flex items-center justify-start gap-2 w-full mb-2  px-5">
          {/* <img src={commentCreator?.photo} alt="userImg" className="postuserImg" /> */}
          <img
            src="/photoforcomments.png"
            alt="userImg"
            className="w-[30px] h-[30px] bg-blue-200 rounded-full"
          />
          <h5 className="">{commentCreator?.name}</h5>
        </div>

        <div className="bg-[#cccbcb55] w-9/10 mx-auto rounded-2xl py-1">
          {content}
        </div>
      </div>
    </>
  );
};

export default Comment;
