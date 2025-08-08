import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout";
import Feed from "../Pages/Feed";
import AuthLayout from "../Layout/AuthLayout";
import Profile from "../Pages/Profile";

const user = localStorage.getItem("user");
console.log(user);
const isAllowed = user ? true : false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={isAllowed} redirectTo="/auth/login">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Feed />} />
        <Route path="profile" element={<Profile />}>
          {/* <Route index element={<MyPosts />} />
          <Route path="savedposts" element={<MyPosts/>} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>
      <Route
        path="/auth"
        element={
          <ProtectedRoute isAllowed={!isAllowed} redirectTo="/">
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

export default router;
