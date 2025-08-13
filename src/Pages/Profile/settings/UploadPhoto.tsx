import { useState, type ChangeEvent } from "react";
import { useGetUserQuery } from "../../../app/features/api/apiSlice";
import api from "../../../config/api.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IAxiosError } from "../../../interface";
import Button from "../../../components/ui/Button";
import { ClockLoader } from "react-spinners";

const UploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [formData] = useState(new FormData());
  const [hasPhoto, setHasPhoto] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  console.log(formData);

  const { data } = useGetUserQuery(null);
  console.log(data);
  const getPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select a file", {
        duration: 2000,
        position: "top-center",
      });
      return;
    } else {
      setPreview(URL.createObjectURL(file));
    }
    formData.append("photo", file);
    setHasPhoto(true);
  };

  const handleUpload = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user") ?? "{}")?.token;
    console.log(token);
    try {
      const { status } = await api.put(`/users/upload-photo`, formData, {
        headers: {
          token: token,
        },
      });
      if (status == 200) {
        toast.success("photo is updated successfully", {
          duration: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          location.replace("/profile/settings");
        }, 700);
      }
    } catch (error) {
      console.log(error);
      const AxiosErr = error as AxiosError<IAxiosError>;
      console.log(AxiosErr?.response?.data);
      const MsgErr =
        AxiosErr?.response?.data?.error || "An unexpected error has occurred";
      toast.error(MsgErr, {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(!formData.has("photo"));
  return (
    <div className="w-full h-full  flex flex-col gap-5 justify-center items-center my-10">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <img src={data?.user?.photo} alt="Current" />
        )}
      </div>
      <input
        type="file"
        className="w-3/5 border border-gray-200 rounded-2xl px-3 py-2 "
        onChange={(e) => getPhoto(e)}
      />
      {(loading && (
        <Button
          className="w-30 loading flex justify-center items-center gap-1 bg-[#5e6378] cursor-not-allowed"
          disabled
          type="submit"
          onClick={handleUpload}
        >
          <ClockLoader color="#ffffff" size={15} speedMultiplier={0.7} /> Upload
        </Button>
      )) || (
        <Button
          className="w-30 cursor-pointer disabled:bg-[#5e6378]  disabled:cursor-not-allowed"
          disabled={!hasPhoto}
          type="submit"
          onClick={handleUpload}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default UploadPhoto;
