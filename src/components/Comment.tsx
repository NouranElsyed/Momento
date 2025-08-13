import type { IComment } from "../interface";

const Comment = ({ content, commentCreator }: IComment) => {
  console.log(commentCreator?.photo);
  return (
    <>
      
      <div>
        <div className="flex justify-start gap-2 w-full my-3  px-5">
          {/* <img src={commentCreator?.photo} alt="userImg" className="postuserImg" /> */}
          <img
            src="/photoforcomments.png"
            alt="userImg"
            className="w-[30px] h-[30px] bg-blue-200 rounded-full mt-1"
          />
         <div className="bg-[#cccbcb55] w-9/10 flex flex-col items-start rounded-2xl py-2">
        <h5 className="ps-3  font-medium">{commentCreator?.name}</h5>
        <p className="rounded-2xl py-1 ps-5 text-[#535151]">
          {content}
        </p>
        </div>
        </div>
        

      </div>
    </>
  );
};

export default Comment;
