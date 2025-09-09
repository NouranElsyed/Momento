import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUserQuery } from "../app/features/api/apiSlice";
import { motion } from "motion/react";
import { useRef, useState, type ChangeEvent } from "react";
import {
  faLink,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import api from "../config/api.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IAxiosError } from "../interface";
const CreatePost = () => {
  //** getting user data */
  const user = useGetUserQuery(null);
  //**  store post details*/
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  //** take Ref for formData and input file */
  const formDataRef = useRef<FormData>(new FormData());
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  //** get image and preview it */
  const getPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file && file.size < 2 * 1024 * 1024) {
      setPreview(true);
      setImage(URL.createObjectURL(file));
      formDataRef.current.append("image", file);
    } else if (file && file.size > 2 * 1024 * 1024) {
      toast.error("photo is too large", {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  //** Remove img preview and clear file input */
  const removePreview = () => {
    setPreview(false);
    setImage("");
    formDataRef.current.delete("image");
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };
  //** submit handler */
  const submitPost = async () => {
    formDataRef.current.append("body", body);
    const tokenData = JSON.parse(localStorage.getItem("user") ?? "{}");
    console.log(tokenData.token);
    try {
      const response = await api.post("/posts", formDataRef.current, {
        headers: {
          token: tokenData.token,
        },
      });
      if (response.status == 201) {
        setBody("");
        removePreview();
        location.replace("/profile");
        toast.success("post created successfully", {
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

  return (
    <div className="flex flex-col justify-center bg-[#ffffff] border border-[#dadde0db] text-[#000000] rounded-2xl pt-7">
      <div className="flex gap-1 my-2 items-start">
        <img
          src={user.data?.user?.photo}
          className="h-10 w-10 rounded-full border-1 ms-5 bg-slate-200 border-[#ffffff] shadow-sm shadow-neutral-600 object-cover"
          alt=""
        />
        <div className="flex flex-1 gap-2 items-center me-5">
          <textarea
            placeholder="What's on your mind?..."
            className="flex-1 px-3 py-2 mb-3 mx-2 focus:outline-0"
            value={body}
            onChange={(e) => {
              console.log(body);
              setBody(e.target.value);
            }}
          />
        </div>
      </div>
      {preview && (
        <div className="relative bg-amber-500">
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-5 top-5 text-red-800 hover:text-red-600"
            onClick={removePreview}
          />
          <img src={image} alt="" className="w-full" />
        </div>
      )}
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
          onClick={submitPost}
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
  );
};

export default CreatePost;
