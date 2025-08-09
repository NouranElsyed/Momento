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
  //** ==========================return============================> **//
  return (
    <>
      <form
        onSubmit={(e) => sendUser(e)}
        className="w-full px-10 flex flex-col gap-5 pt-10"
      >
        <div className={`inputsContainer  flex flex-col gap-3`}>
          <div className="inputWrapper">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              onChange={getUserData}
            />
            {ErrorMsg.name !== "" && <ErrMsg>{ErrorMsg.name}</ErrMsg>}
          </div>

          <div className="inputWrapper">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              onChange={getUserData}
            />
            {ErrorMsg.email !== "" && <ErrMsg>{ErrorMsg.email}</ErrMsg>}
          </div>

          <div className="inputWrapper">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={getUserData}
            />
            {ErrorMsg.password !== "" && <ErrMsg>{ErrorMsg.password}</ErrMsg>}
          </div>

          <div className="inputWrapper">
            <Input
              name="rePassword"
              type="password"
              placeholder="Re-Password"
              autoComplete="current-password"
              onChange={getUserData}
            />
            {ErrorMsg.rePassword !== "" && (
              <ErrMsg>{ErrorMsg.rePassword}</ErrMsg>
            )}
          </div>

          <div className="inputWrapper">
            <Input
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
            <select
              name="gender"
              className="appearance-none w-full px-3 py-1 rounded-md  placeholder-[#3c3c3cc2] border-2 border-[#cfd6e1]   focus:border-[#7fa1e4] focus:outline-none text-black"
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
          <Button className="btn loading flex justify-center items-center gap-1npm" type="submit">
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
