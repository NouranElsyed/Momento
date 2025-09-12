import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["posts", "comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://linked-posts.routemisr.com/",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("user") ?? "{}").token;
      try {
        if (token) {
          headers.set("token", token);
        }
      } catch (error) {
        console.error("Invalid user JSON in localStorage", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "/users/profile-data",
        };
      },
    }),
    getPosts: builder.query({
      query: (page) => `/posts?limit=10&page=${page}`,
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    getUserPosts: builder.query({
      query: (id) => `/users/${id}/posts`,
      providesTags: ["posts"],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id)=>({
        url:`/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
      updatePost: builder.mutation({
      query: ({id,body})=>({
        url:`/posts/${id}`,
        method: "PUT",
          body,
      }),
      invalidatesTags: ["posts"],
    }),
    getComments: builder.query({
      query: (id) => `/posts/${id}/comments`,
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetCommentsQuery,
  useGetUserPostsQuery,
  useGetUserQuery,
  useGetPostsQuery,
  useAddCommentMutation,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = apiSlice;
