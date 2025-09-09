import type { IAxiosError, IPost } from "../interface";
import Comment from "../components/Comment";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faPaperPlane,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../app/features/api/apiSlice";
import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "motion/react";
import type { AxiosError } from "axios";

const Post = ({ id, body, user, image }: IPost) => {
  // ** edit state*/
  const [isEditting, setIsEditting] = useState(false);

  // ** get logined user */
  const { isLoading, data: loginedUser } = useGetUserQuery(null);

  // ** update post */
  const [editBody, setEditBody] = useState<string | undefined>(body);

  //** get photo to update & preview from input */
  const [editImg, setEditImg] = useState<{
    preview: string | undefined;
    imgFile: File | null;
  }>({
    preview: image,
    imgFile: null,
  });
  //** take Ref for input file */
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  //** get image and preview it */
  const getPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setEditImg({ preview: URL.createObjectURL(file), imgFile: file });
    } else if (file && file.size > 2 * 1024 * 1024) {
      toast.error("photo is too large", {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  //** update handler */
  const updatePost = async () => {
    const formData = new FormData();
    formData.set("body", editBody ?? "");
    if (editImg.imgFile) {
      formData.set("image", editImg.imgFile);
    }
    console.log(formData.get("image"));
    console.log(typeof editBody);
    const tokenData = JSON.parse(localStorage.getItem("user") ?? "{}");
    console.log(tokenData.token);
    try {
      const response = await api.put(`/posts/${id}`, formData, {
        headers: {
          token: tokenData.token,
        },
      });
      console.log(response.status);
      if (response.status == 201 || response.status == 200) {
        setTimeout(() => {
          location.replace("/profile");
        }, 2000);
        toast.success("post updated successfully", {
          duration: 2000,
          position: "top-center",
        });
      }
      console.log(response);
    } catch (error) {
      const AxiosErr = error as AxiosError<IAxiosError>;
      console.log(AxiosErr?.response?.data);
      const MsgErr =
        AxiosErr?.response?.data?.error || "An unexpected error has occurred";
      toast.error(MsgErr, {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  // ** delete post fun*/
  const deletePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = JSON.parse(localStorage.getItem("user") ?? "{}").token;
    try {
      const response = await api.delete(`/posts/${id}`, {
        headers: {
          token: token,
        },
      });
      if (response.status === 200) {
        toast.success("post deleted successfully", {
          duration: 2000,
          position: "top-center",
        });
        location.replace("/profile");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!isEditting && (
        <>
          <NavLink to={`/post/${id}`} className="w-full relative">
            {!isLoading && loginedUser?.user?._id === user?._id && (
              <>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="absolute right-5 top-5 text-red-800 hover:text-red-600"
                  onClick={deletePost}
                />
                <FontAwesomeIcon
                  icon={faPen}
                  className="absolute right-12 top-5 text-blue-900 hover:text-blue-400 transform duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditting(true);
                  }}
                />
              </>
            )}
            <div className="flex items-center justify-start gap-2 w-full px-8 mb-5">
              <img
                src={user?.photo}
                alt="userImg"
                className="w-12 h-12 rounded-full border-2 border-[#bdbdbd] object-cover bg-slate-200 "
              />
              <h5 className="">{user?.name}</h5>
            </div>
            <p className="text-start mb-5  px-10">{body}</p>
            <img src={image} alt="post-img" className=" px-10 w-full" />
          </NavLink>
          <Comment postID={id} />
        </>
      )}
      {isEditting && (
        <>
          <div className="w-full relative">
            <div className="flex items-center justify-start gap-2 w-full px-8 mb-5">
              <img
                src={user?.photo}
                alt="userImg"
                className="w-12 h-12 rounded-full border-2 border-[#bdbdbd] object-cover bg-slate-200 "
              />
              <h5 className="">{user?.name}</h5>
            </div>
            <textarea
              placeholder="What's on your mind?..."
              className="flex-1 px-3 py-2 mb-3 mx-2 focus:outline-0 bg-gray-100 w-8/10 rounded-2xl "
              value={editBody}
              onChange={(e) => {
                console.log(editBody);
                setEditBody(e.target.value);
              }}
            />
            <div className="mx-10 mb-5">
              <img src={editImg.preview} alt="" className="w-full " />
            </div>

            <div className="flex justify-around my-3 text-lg">
              <div className="flex gap-5 items-center w-1/2 justify-center text-cyan-700">
                <FontAwesomeIcon icon={faLink} />
                <input
                  type="file"
                  className="w-3/5 border border-gray-200 rounded-2xl px-3 py-2 "
                  ref={inputFileRef}
                  onChange={(e) => getPhoto(e)}
                />
              </div>
              <motion.div
                onClick={updatePost}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-1/2 "
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="bg-cyan-700 px-10 py-3 rounded-3xl text-white"
                />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
