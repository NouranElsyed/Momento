import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import api from "../../config/api.config";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";
import type { AxiosError } from "axios";
import type { IAxiosError, IRegisterForm } from "../../interface";
import { validateRegister } from "../../validation/validateForm";
import ErrMsg from "../../components/ui/ErrMsg";

const Register = () => {
  const emptyUser: IRegisterForm = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };
  const emptyErrors = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };

  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(emptyErrors);
  const [user, setUser] = useState(emptyUser);

  //** ========================getUserData==============================> **//
  const getUserData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target);
    console.log(user);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrorMsg((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
  //** ============================sendUser==========================> **//
  const sendUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const Errors = validateRegister(user);
    const isValid = Object.values(Errors).every((value) => value === "");
    console.log("is valid", isValid);
    if (!isValid) {
      setErrorMsg(Errors);
      setIsLoading(false);
    } else {
      try {
        const res = await api.post("/users/signup", user);
        console.log(res);
        if (res.status === 201) {
          toast.success("welcome to Momento", {
            duration: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            location.replace("/auth/login");
          }, 700);
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
  //** ==========================return============================> **//
  return (
    <>
      <h3  className="AuthTitle pt-3 text-2xl text-[#0c1024] ">Register</h3>
      <form
        onSubmit={(e) => sendUser(e)}
        className="w-full px-10 flex flex-col gap-5 pt-3"
      >
        <div className={`inputsContainer  flex flex-col gap-3`}>
          <div className="inputWrapper">
            <label
              htmlFor="name"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
              Username
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              onChange={getUserData}
            />
            {ErrorMsg.name !== "" && <ErrMsg>{ErrorMsg.name}</ErrMsg>}
          </div>

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
              placeholder="Enter your email"
              autoComplete="email"
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
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={getUserData}
            />
            {ErrorMsg.password !== "" && <ErrMsg>{ErrorMsg.password}</ErrMsg>}
          </div>

          <div className="inputWrapper">
            <label
              htmlFor="repassword"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
              Confirm  password
            </label>
            <Input
              id="repassword"
              name="rePassword"
              type="password"
              placeholder="Confirm your Password"
              autoComplete="current-password"
              onChange={getUserData}
            />
            {ErrorMsg.rePassword !== "" && (
              <ErrMsg>{ErrorMsg.rePassword}</ErrMsg>
            )}
          </div>

          <div className="inputWrapper">
            <label
              htmlFor="dateOfBirth"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
              Date of birth
            </label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              placeholder="Date of birth"
              className="w-full"
              onChange={getUserData}
            />
            {ErrorMsg.dateOfBirth !== "" && (
              <ErrMsg>{ErrorMsg.dateOfBirth}</ErrMsg>
            )}
          </div>

          <div className="inputWrapper relative ">
            <label
              htmlFor="gender"
              className="text-start block w-full text-[#1b1d2a] text-sm mb-1"
            >
             Gender
            </label>
            <select
            id="gender"
              name="gender"
              className="w-full px-3 py-1 rounded-md  placeholder-[#3c3c3cc2] text-sm border border-[#e1e4e9] bg-[#fcfcfc]  focus:border-[#7fa1e4] focus:outline-none text-black  focus:border-2 transition-all duration-100 ease-in-out"
              onChange={getUserData}
              value={user.gender}
            >
              <option value="" className="rounded-t-md">
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2  text-[#fffffe88] text-sm">
              ▼
            </div>
            {ErrorMsg.gender !== "" && <ErrMsg>{ErrorMsg.gender}</ErrMsg>}
          </div>
        </div>
        {(isloading && (
          <Button
            className="btn loading flex justify-center items-center gap-1"
            type="submit"
          >
            <ClockLoader color="#ffffff" size={15} speedMultiplier={0.7} />
            <span>Submit</span>
          </Button>
        )) || (
          <Button className="btn" type="submit">
            Sign up
          </Button>
        )}
        <p className="text-[#4B5669] ">
          Have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-[#27364B]   font-bold hover:text-[#389a95] underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
    </>
  );
};

export default Register;
