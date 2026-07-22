import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// The API wraps every response as { success, message, data, meta }.
// unwrap() pulls "data" out so the rest of the app can keep using
// shapes like `data.user`, `data.post`, `data.posts` etc. directly.
const unwrap = (response: { data?: unknown }) => response?.data ?? response;

interface FeedParams {
  only?: string;
  limit?: number;
  page?: number;
  cursor?: string;
  hasImage?: boolean;
}

interface NotificationsParams {
  unread?: boolean;
  page?: number;
  limit?: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

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
    signup: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/users/signup", method: "POST", body }),
    }),
    signin: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/users/signin", method: "POST", body }),
    }),
    changePassword: builder.mutation<any, { password: string; newPassword: string }>({
      query: (body) => ({
        url: "/users/change-password",
        method: "PATCH",
        body,
      }),
    }),

    // ---------- Users ----------
    getUser: builder.query<any, void | null>({
      query: () => "/users/profile-data",
      transformResponse: unwrap,
      providesTags: ["user"],
    }),
    getUserProfile: builder.query<any, string>({
      query: (id) => `/users/${id}/profile`,
      transformResponse: unwrap,
    }),
    getUserPosts: builder.query<any, string | undefined>({
      query: (id) => `/users/${id}/posts`,
      transformResponse: unwrap,
      providesTags: ["posts"],
    }),
    followUser: builder.mutation<any, string>({
      query: (id) => ({ url: `/users/${id}/follow`, method: "PUT" }),
      invalidatesTags: ["user", "posts"],
    }),
    getFollowSuggestions: builder.query<any, number | void>({
      query: (limit = 10) => `/users/suggestions?limit=${limit}`,
      transformResponse: unwrap,
    }),
    getBookmarks: builder.query<any, void>({
      query: () => "/users/bookmarks",
      transformResponse: unwrap,
      providesTags: ["bookmarks"],
    }),
    uploadProfilePhoto: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/users/upload-photo",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    // ---------- Posts ----------
    getPosts: builder.query<any, number | undefined>({
      query: (page) => `/posts?limit=10&page=${page ?? 1}`,
      transformResponse: unwrap,
      providesTags: ["posts"],
    }),
    getHomeFeed: builder.query<any, FeedParams | void>({
      query: (arg) => {
        const { only = "following", limit = 10, page, cursor, hasImage } =
          arg ?? {};
        const params = new URLSearchParams({ only, limit: String(limit) });
        if (page) params.set("page", String(page));
        if (cursor) params.set("cursor", String(cursor));
        if (hasImage !== undefined) params.set("hasImage", String(hasImage));
        return `/posts/feed?${params.toString()}`;
      },
      transformResponse: unwrap,
      providesTags: ["posts"],
    }),
    getPost: builder.query<any, string | undefined>({
      query: (id) => `/posts/${id}`,
      transformResponse: unwrap,
    }),
    addPost: builder.mutation<any, FormData>({
      query: (formData) => ({ url: "/posts", method: "POST", body: formData }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation<any, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation<any, string>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["posts"],
    }),

    // ---------- Post interactions ----------
    toggleLikePost: builder.mutation<any, string>({
      query: (postId) => ({ url: `/posts/${postId}/like`, method: "PUT" }),
      invalidatesTags: ["posts"],
    }),
    getPostLikes: builder.query<any, { postId: string } & PaginationParams>({
      query: ({ postId, page = 1, limit = 20 }) =>
        `/posts/${postId}/likes?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
    }),
    toggleBookmarkPost: builder.mutation<any, string>({
      query: (postId) => ({ url: `/posts/${postId}/bookmark`, method: "PUT" }),
      invalidatesTags: ["bookmarks", "posts"],
    }),
    sharePost: builder.mutation<any, { postId: string; body: { body: string } }>({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/share`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),

    // ---------- Comments & Replies ----------
    getComments: builder.query<any, { postId: string | undefined } & PaginationParams>({
      query: ({ postId, page = 1, limit = 10 }) =>
        `/posts/${postId}/comments?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
      providesTags: ["comments"],
    }),
    addComment: builder.mutation<any, { postId: string; body: FormData }>({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation<any, { postId: string; commentId: string; body: FormData }>({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation<any, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
    toggleLikeComment: builder.mutation<any, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["comments"],
    }),
    getCommentReplies: builder.query<
      any,
      { postId: string; commentId: string } & PaginationParams
    >({
      query: ({ postId, commentId, page = 1, limit = 10 }) =>
        `/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
      transformResponse: unwrap,
      providesTags: ["comments"],
    }),
    addReply: builder.mutation<any, { postId: string; commentId: string; body: FormData }>({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}/replies`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),

    // ---------- Notifications ----------
    getNotifications: builder.query<any, NotificationsParams | void>({
      query: (arg) => {
        const { unread = false, page = 1, limit = 10 } = arg ?? {};
        return `/notifications?unread=${unread}&page=${page}&limit=${limit}`;
      },
      transformResponse: unwrap,
      providesTags: ["notifications"],
    }),
    getUnreadNotificationsCount: builder.query<any, void>({
      query: () => "/notifications/unread-count",
      transformResponse: unwrap,
      providesTags: ["notifications"],
    }),
    markNotificationAsRead: builder.mutation<any, string>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["notifications"],
    }),
    markAllNotificationsAsRead: builder.mutation<any, void>({
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
