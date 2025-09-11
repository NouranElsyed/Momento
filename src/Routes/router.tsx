import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout";
import Feed from "../Pages/Feed";
import AuthLayout from "../Layout/AuthLayout";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MyPosts from "../Pages/Profile/MyPosts";
import Settings from "../Pages/Profile/settings/Settings";
import UploadPhoto from "../Pages/Profile/settings/UploadPhoto";
import ChangePassword from "../Pages/Profile/settings/ChangePassword";
import SinglePost from "../Pages/SinglePost";
import Page404 from "../Pages/Page404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute redirectTo="/auth/login" forPublic={false}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<Page404/>} ></Route>
        <Route index element={<Feed />} />
        <Route path="post/:id" element={<SinglePost />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<MyPosts />} />
          <Route path="savedposts" element={<MyPosts />} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<UploadPhoto />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="/auth"
        element={
          <ProtectedRoute redirectTo="/" forPublic={true}>
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
