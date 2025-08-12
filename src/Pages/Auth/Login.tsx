import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { validateLogin } from "../../validation/validateForm";
import api from "../../config/api.config";
import type { IAxiosError } from "../../interface";
import ErrMsg from "../../components/ui/ErrMsg";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { ClockLoader } from "react-spinners";


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
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success("welcome to Momento", {
            duration: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            location.replace("/");
          }, 10000);
        }
      } catch (error) {
        console.log(error);
        const AxiosErr = error as AxiosError<IAxiosError>;
        const MsgErr =
          AxiosErr?.response?.data?.error||
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
      <h3  className="AuthTitle pt-3 text-2xl text-[#0c1024] ">Login</h3>

      <form onSubmit={sendUser} className="w-full px-10 flex flex-col gap-5 pt-3">

        <div className="inputsContainer flex flex-col gap-3">
          <div className="inputWrapper">
            <label
              htmlFor="email"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              onChange={getUserData}
            />
            {ErrorMsg.email !== "" && <ErrMsg>{ErrorMsg.email}</ErrMsg>}
          </div>
          <div className="inputWrapper">
             <label
              htmlFor="password"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
              Password
            </label>
            <Input
              id="password"
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
