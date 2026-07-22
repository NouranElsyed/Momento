import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["posts", "comments", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://route-posts.routemisr.com/",
    prepareHeaders: (headers) => {
      try {
        const token = JSON.parse(localStorage.getItem("user") ?? "{}")?.data
          ?.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Invalid user JSON in localStorage", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ---------- Users ----------
    getUser: builder.query({
      query: () => "/users/profile",
      providesTags: ["user"],
    }),
    getUserProfile: builder.query({
      query: (id) => `/users/${id}/profile`,
    }),
    getUserPosts: builder.query({
      query: (id) => `/users/${id}/posts`,
      providesTags: ["posts"],
    }),
    getFollowSuggestions: builder.query({
      query: (limit = 10) => `/users/suggestions?limit=${limit}`,
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/users/change-password",
        method: "PATCH",
        body,
      }),
    }),
    uploadProfilePhoto: builder.mutation({
      query: (formData) => ({
        url: "/users/upload-photo",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    // ---------- Posts ----------
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["posts"],
    }),
    getHomeFeed: builder.query({
      query: ({ only = "following", limit = 10, page, cursor, hasImage } = {}) => {
        const params = new URLSearchParams({ only, limit: String(limit) });
        if (page) params.set("page", String(page));
        if (cursor) params.set("cursor", String(cursor));
        if (hasImage !== undefined) params.set("hasImage", String(hasImage));
        return `/posts/feed?${params.toString()}`;
      },
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    addPost: builder.mutation({
      query: (formData) => ({
        url: "/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    // ---------- Comments (nested under posts) ----------
    // NOTE: the API doc only explicitly listed delete + like/unlike for comments.
    // getComments/addComment/updateComment below assume the same nested shape
    // (/posts/:postId/comments...). Confirm against real API responses and adjust
    // paths if the backend differs.
    getComments: builder.query({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
    toggleLikeComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useGetFollowSuggestionsQuery,
  useChangePasswordMutation,
  useUploadProfilePhotoMutation,
  useGetPostsQuery,
  useGetHomeFeedQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useToggleLikeCommentMutation,
} = apiSlice;
