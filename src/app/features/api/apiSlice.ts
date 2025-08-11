import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ["Api"],
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://linked-posts.routemisr.com/',
    prepareHeaders:(headers)=>{
    const userToken = localStorage.getItem('user')
    const useTokenParsed = userToken? JSON.parse(userToken) : null
    const token = useTokenParsed.token
       try{ if(token){
            headers.set("token",token)
        }}catch(error){
           console.error("Invalid user JSON in localStorage", error);
        }
  return headers
    }
}),
  endpoints: builder => ({
    getUser: builder.query({
      query: ()=>{
            return {
          url: "/users/profile-data",
        };
      },
    }),
    getPosts: builder.query({
      query: () => '/posts?limit=20'
    }),
    getUserPosts: builder.query({
      query: (id) => `/users/${id}/posts?limit=10`
    }),
    getComments: builder.query({
      query: (id) => `/posts/${id}/comments`
    })
  }),
})

export const { useGetCommentsQuery , useGetUserPostsQuery , useGetUserQuery , useGetPostsQuery} = apiSlice;