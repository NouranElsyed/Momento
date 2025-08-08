import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../config/api.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IAxiosError } from "../interface";
import { ClockLoader } from "react-spinners";
import { validateLogin } from "../validation/validateForm";
import ErrMsg from "../components/ui/ErrMsg";

const Login = () => {
  const emptyUser = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [ErrorMsg, setErrorMsg] = useState(emptyUser);
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(emptyUser);
  console.log(isloading);
  //** ========================getUserData==============================> **//
  const getUserData = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(updatedUser);
    setErrorMsg((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
    console.log(user);
  };
  //** ============================sendUser==========================> **//
  const sendUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const Errors = validateLogin(user);
    const isValid = Object.values(Errors).every((value) => value === "");
    console.log("is valid", isValid);
    if (!isValid) {
      setErrorMsg(Errors);
      setIsLoading(false);
    } else {
      try {
        const res = await api.post("users/signin", user);
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.status === 200 || res.status === 201) {
          toast.success("welcome to Momento", {
            duration: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            location.replace("/");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        const AxiosErr = error as AxiosError<IAxiosError>;
        const MsgErr =
          AxiosErr?.response?.data?.error?.message ||
          "An unexpected error has occurred";
        toast.error(MsgErr, {
          duration: 2000,
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <form onSubmit={sendUser} className="w-full px-10 flex flex-col gap-5 pt-10">

        <div className="inputsContainer flex flex-col gap-3">
          <div className="inputWrapper">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              onChange={getUserData}
            />
            {ErrorMsg.email !== "" && <ErrMsg>{ErrorMsg.email}</ErrMsg>}
          </div>
          <div className="inputWrapper">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="input"
              onChange={getUserData}
            />
            {ErrorMsg.password !== "" && <ErrMsg>{ErrorMsg.password}</ErrMsg>}
          </div>
        </div>
        {(isloading && (
          <Button className="btn loading flex justify-center items-center gap-1" type="submit">
            <ClockLoader color="#ffffff" size={15} speedMultiplier={0.7} />
            <span>Login</span>
          </Button>
        )) || (
          <Button className="btn" type="submit">
            Login
          </Button>
        )}
        <p className="text-[#4B5669] ">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-[#27364B]   font-bold hover:text-[#389a95] underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
