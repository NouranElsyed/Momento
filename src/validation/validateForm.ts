import type { ILoginForm, IRegisterForm } from "../interface";

export const validateRegister = ({
  name,
  email,
  password,
  rePassword,
  dateOfBirth,
  gender,
}: IRegisterForm) => {
  const errorMsg = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: ""
  };


  if (name === "") {
    errorMsg.name = "Name is required";
  } else if (name.length < 3) {
    errorMsg.name = "Name must be at least 3  characters";
  } else if (name.length > 20) {
    errorMsg.name = "Name must not exceed 20 characters";
  }


  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  if (email === "") {
    errorMsg.email = "email is required";
  } else if (!emailRegex.test(email)) {
    errorMsg.email = "email is not valid";
  }


  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (password === "") {
    errorMsg.password = "password is required";
  } else if (!passwordRegex.test(password)) {
    errorMsg.password =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

 if (rePassword === "") {
    errorMsg.rePassword = "Re-password is required";
  } else if (rePassword!==password) {
    errorMsg.rePassword =
      "Passwords do not match";
  }

if(dateOfBirth === ""){
    errorMsg.dateOfBirth = "Date of birth is required"
}else{
    const DateOfBirth = new Date(dateOfBirth)
    const today = new Date()

    if(DateOfBirth>today){
        errorMsg.dateOfBirth = "Date of birth cannot to be in future"
    }
}
if (gender !== "female" && gender !== "male") {
  errorMsg.gender = "Gender is required";
}



  return errorMsg;
};









export const validateLogin = ({ email, password }: ILoginForm) => {
  const errorMsg = {
    email: "",
    password: "",
  };

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  if (email === "") {
    errorMsg.email = "email is required";
  } else if (!emailRegex.test(email.trim())) {
    errorMsg.email = "email is not valid";
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (password === "") {
    errorMsg.password = "password is required";
  } else if (!passwordRegex.test(password)) {
    errorMsg.password =
      "Password must be at least 8 characters and include uppercase, lowercase letters, and a number.";
  }
  return errorMsg;
};
