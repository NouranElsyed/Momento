import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "../../../components/ui/Input";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";
import { ClockLoader } from "react-spinners";
import type { AxiosError } from "axios";
import type { IAxiosError } from "../../../interface";
import api from "../../../config/api.config";

const ChangePassword = () => {
  const [changedPassword, setChangedPassword] = useState({
    password: "",
    newPassword: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user") ?? "{}")?.token;
  const getPassword = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setChangedPassword({
      ...changedPassword,
      [e.target.name]: e.target.value,
    });
    console.log(changedPassword);
  };
  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // const Errors = validateRegister(user);
    // const isValid = Object.values(Errors).every((value) => value === "");
    // console.log("is valid", isValid);
    // if (!isValid) {
    //   setErrorMsg(Errors);
    setIsLoading(false);
    // } else {
    try {
      const res = await api.patch("/users/change-password", changedPassword, {
        headers: {
          token: token,
        },
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        toast.success("password is changed", {
          duration: 2000,
          position: "top-center",
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          location.replace("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      const AxiosErr = error as AxiosError<IAxiosError>;
      const MsgErr =
        AxiosErr?.response?.data?.error || "An unexpected error has occurred";
      toast.error(MsgErr, {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
    // }
  };

  return (
    <form
      onSubmit={changePassword}
      className="w-3/5 mx-auto flex flex-col gap-3 my-7"
    >
      <div className="inputWrapper">
        <Input
          name="password"
          type="password"
          placeholder="current password"
          autoComplete="current-password"
          onChange={getPassword}
        />
        {/* {ErrorMsg.password !== "" && <ErrMsg>{ErrorMsg.password}</ErrMsg>} */}
      </div>

      <div className="inputWrapper">
        <Input
          name="newPassword"
          type="password"
          placeholder="new password"
          autoComplete="current-password"
          onChange={getPassword}
        />
        {/* {ErrorMsg.rePassword !== "" && <ErrMsg>{ErrorMsg.rePassword}</ErrMsg>} */}
      </div>
      {(isloading && (
        <Button
          className="btn loading flex justify-center items-center gap-1"
          type="submit"
        >
          <ClockLoader color="#ffffff" size={15} speedMultiplier={0.7} />
          <span>Change password</span>
        </Button>
      )) || (
        <Button className="btn" type="submit">
          Change password
        </Button>
      )}
    </form>
  );
};

export default ChangePassword;
