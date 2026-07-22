import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// The API wraps every response as { success, message, data, meta }.
// unwrap() pulls "data" out so the rest of the app can keep using
// shapes like `data.user`, `data.post`, `data.posts` etc. directly.
const unwrap = (response) => response?.data ?? response;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["posts", "comments", "user", "notifications", "bookmarks"],
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
    // ---------- Auth ----------
    signup: builder.mutation({
      query: (body) => ({ url: "/users/signup", method: "POST", body }),
    }),
    signin: builder.mutation({
      query: (body) => ({ url: "/users/signin", method: "POST", body }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/users/change-password",
        method: "PATCH",
        body,
      }),
    }),

    // ---------- Users ----------
    getUser: builder.query({
      query: () => "/users/profile-data",
      transformResponse: unwrap,
      providesTags: ["user"],
    }),
    getUserProfile: builder.query({
      query: (id) => `/users/${id}/profile`,
      transformResponse: unwrap,
    }),
    getUserPosts: builder.query({
      query: (id) => `/users/${id}/posts`,
      transformResponse: unwrap,
      providesTags: ["posts"],
    }),
    followUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}/follow`, method: "PUT" }),
      invalidatesTags: ["user", "posts"],
    }),
    getFollowSuggestions: builder.query({
      query: (limit = 10) => `/users/suggestions?limit=${limit}`,
      transformResponse: unwrap,
    }),
    getBookmarks: builder.query({
      query: () => "/users/bookmarks",
      transformResponse: unwrap,
      providesTags: ["bookmarks"],
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
      query: (page) => `/posts?limit=10&page=${page ?? 1}`,
      transformResponse: unwrap,
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
      transformResponse: unwrap,
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      transformResponse: unwrap,
    }),
    addPost: builder.mutation({
      query: (formData) => ({ url: "/posts", method: "POST", body: formData }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["posts"],
    }),

    // ---------- Post interactions ----------
    toggleLikePost: builder.mutation({
      query: (postId) => ({ url: `/posts/${postId}/like`, method: "PUT" }),
      invalidatesTags: ["posts"],
    }),
    getPostLikes: builder.query({
      query: ({ postId, page = 1, limit = 20 }) =>
        `/posts/${postId}/likes?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
    }),
    toggleBookmarkPost: builder.mutation({
      query: (postId) => ({ url: `/posts/${postId}/bookmark`, method: "PUT" }),
      invalidatesTags: ["bookmarks", "posts"],
    }),
    sharePost: builder.mutation({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/share`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),

    // ---------- Comments & Replies ----------
    getComments: builder.query({
      query: ({ postId, page = 1, limit = 10 }) =>
        `/posts/${postId}/comments?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body, // FormData: { content, image? }
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body, // FormData: { content, image? }
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
    getCommentReplies: builder.query({
      query: ({ postId, commentId, page = 1, limit = 10 }) =>
        `/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
      providesTags: ["comments"],
    }),
    addReply: builder.mutation({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}/replies`,
        method: "POST",
        body, // FormData: { content, image? }
      }),
      invalidatesTags: ["comments"],
    }),

    // ---------- Notifications ----------
    getNotifications: builder.query({
      query: ({ unread = false, page = 1, limit = 10 } = {}) =>
        `/notifications?unread=${unread}&page=${page}&limit=${limit}`,
      transformResponse: unwrap,
      providesTags: ["notifications"],
    }),
    getUnreadNotificationsCount: builder.query({
      query: () => "/notifications/unread-count",
      transformResponse: unwrap,
      providesTags: ["notifications"],
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["notifications"],
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({ url: "/notifications/read-all", method: "PATCH" }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useChangePasswordMutation,

  useGetUserQuery,
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useFollowUserMutation,
  useGetFollowSuggestionsQuery,
  useGetBookmarksQuery,
  useUploadProfilePhotoMutation,

  useGetPostsQuery,
  useGetHomeFeedQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

  useToggleLikePostMutation,
  useGetPostLikesQuery,
  useToggleBookmarkPostMutation,
  useSharePostMutation,

  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useToggleLikeCommentMutation,
  useGetCommentRepliesQuery,
  useAddReplyMutation,

  useGetNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = apiSlice;
