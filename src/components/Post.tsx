import type { IAxiosError, IPost } from "../interface";
import Comments from "./Comments";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  useDeletePostMutation,
  useGetUserQuery,
  useToggleLikePostMutation,
  useUpdatePostMutation,
} from "../app/features/api/apiSlice";
import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "motion/react";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type PostProps = IPost & { isLiked?: boolean; likesCount?: number };

const Post = ({ id, body, user, image, createdAt, isLiked, likesCount }: PostProps) => {
  const [deletePostMutation] = useDeletePostMutation();
  const [updatePostMutation] = useUpdatePostMutation();
  const [toggleLikePost] = useToggleLikePostMutation();
  const navigate = useNavigate();

  dayjs.extend(relativeTime);

  const postId = id ?? "";

  const [isEditting, setIsEditting] = useState(false);
  const { isLoading, data: loginedUser } = useGetUserQuery(null);

  const [editBody, setEditBody] = useState<string | undefined>(body);
  const [editImg, setEditImg] = useState<{
    preview: string | undefined;
    imgFile: File | null;
  }>({ preview: image, imgFile: null });
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // ---- Like (PUT /posts/:id/like) — optimistic local toggle, backed by real endpoint ----
  const [liked, setLiked] = useState(Boolean(isLiked));
  const [likeCount, setLikeCount] = useState(likesCount ?? 0);
  const toggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((prev: number) => (nextLiked ? prev + 1 : prev - 1));
    try {
      await toggleLikePost(postId).unwrap();
    } catch (error) {
      // revert on failure
      setLiked(liked);
      setLikeCount((prev: number) => (nextLiked ? prev - 1 : prev + 1));
      toast.error("Couldn't update like");
    }
  };

  const getPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setEditImg({ preview: URL.createObjectURL(file), imgFile: file });
    } else if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Photo is too large (max 2MB)");
    }
  };

  const updatePost = async () => {
    const formData = new FormData();
    formData.set("body", editBody ?? "");
    if (editImg.imgFile) formData.set("image", editImg.imgFile);
    try {
      await updatePostMutation({ id: postId, body: formData }).unwrap();
      toast.success("Post updated");
      setIsEditting(false);
    } catch (error) {
      const AxiosErr = error as AxiosError<IAxiosError>;
      toast.error(AxiosErr?.response?.data?.error || "Couldn't update post");
    }
  };

  const deletePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deletePostMutation(postId).unwrap();
      toast.success("Post deleted");
      if (location.pathname.includes(`/post/${id}`)) navigate("/");
    } catch (error: unknown) {
      const err = error as { data?: { error?: string } };
      toast.error(err?.data?.error || "Couldn't delete post");
    }
  };

  const isOwner = !isLoading && loginedUser?.user?._id === user?._id;

  return (
    <>
      {!isEditting && (
        <>
          <NavLink to={`/post/${postId}`} className="group block w-full relative px-6 pt-6">
            {isOwner && (
              <div className="absolute right-6 top-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  aria-label="Edit post"
                  className="w-8 h-8 grid place-items-center rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditting(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} className="text-sm" />
                </button>
                <button
                  aria-label="Delete post"
                  className="w-8 h-8 grid place-items-center rounded-full text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-colors"
                  onClick={deletePost}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <img
                src={user?.photo}
                alt={user?.name}
                className="w-11 h-11 rounded-full object-cover bg-[#F3F4F6] ring-1 ring-[#EDEDED]"
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[15px] font-semibold text-[#0F1419]">
                  {user?.name}
                </span>
                <span className="text-[13px] text-[#8E8E93]">
                  {dayjs(createdAt).fromNow()}
                </span>
              </div>
            </div>

            {body && (
              <p className="text-[15px] text-[#0F1419] leading-relaxed mb-4 whitespace-pre-wrap">
                {body}
              </p>
            )}
            {image && (
              <img
                src={image}
                alt="post attachment"
                className="w-full rounded-xl object-cover border border-[#F0F0F0] mb-1"
              />
            )}
          </NavLink>

          <div className="flex items-center gap-6 px-6 py-3 text-[#6B7280]">
            <button
              aria-label={liked ? "Unlike" : "Like"}
              onClick={(e) => {
                e.preventDefault();
                toggleLike();
              }}
              className={`flex items-center gap-1.5 text-[13px] transition-colors ${
                liked ? "text-rose-500" : "hover:text-rose-500"
              }`}
            >
              <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
              <span>{likeCount}</span>
            </button>
          </div>

          <Comments postID={id} />
        </>
      )}

      {isEditting && (
        <div className="w-full relative px-6 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.photo}
              alt={user?.name}
              className="w-11 h-11 rounded-full object-cover bg-[#F3F4F6] ring-1 ring-[#EDEDED]"
            />
            <span className="text-[15px] font-semibold text-[#0F1419]">
              {user?.name}
            </span>
          </div>

          <textarea
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 mb-4 rounded-xl bg-[#F7F7F8] focus:outline-none focus:ring-2 focus:ring-indigo-200 text-[15px] text-[#0F1419] resize-none"
            rows={3}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />

          {editImg.preview && (
            <img
              src={editImg.preview}
              alt=""
              className="w-full rounded-xl border border-[#F0F0F0] mb-4 object-cover"
            />
          )}

          <div className="flex items-center justify-between pb-4">
            <button
              onClick={() => inputFileRef.current?.click()}
              className="flex items-center gap-2 text-[13px] text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <FontAwesomeIcon icon={faImage} />
              Add photo
              <input
                type="file"
                accept="image/*"
                ref={inputFileRef}
                onChange={getPhoto}
                className="hidden"
              />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditting(false)}
                className="text-[13px] text-[#6B7280] hover:text-[#0F1419] font-medium px-3 py-2"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={updatePost}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-[13px] font-medium px-4 py-2 rounded-full"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                Save
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
