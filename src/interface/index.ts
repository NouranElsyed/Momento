export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "" | "female" | "male";
}
// for login and register
// export interface IAxiosError {
//   error: {
//     message: string;
//     name: string;
//     status: number;
//   };
// }
// for upload photo
export interface IAxiosError {
  error: string;
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "" | "female" | "male";
  photo: string;
  // createdAt: "2025-07-27T21:40:24.629Z";
}
export interface IDataPost {
  message: string;
  paginationInfo: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
    total: number;
  };
  posts: IPost[];
}

export interface IPost {
  body?: string;
  comments?: IComment[];
  createdAt?: string;
  id?: string;
  image?: string;
  user?: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  _id?: string;
}

export interface IComment {
  commentCreator?: {
    _id: string;
    name: string;
    photo: string;
  };
  content?: string;
  createdAt?: string;
  id?: string;
  post?: string;
  _id?: string;
}
