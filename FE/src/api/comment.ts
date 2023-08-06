import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (biulder) => ({
    getAllComments: biulder.query<any, void>({
      query: () => `/comment`,
      providesTags: ["Comment"],
    }),
    getCommentByIdPro: biulder.query<any, number | string>({
      query: (id) => `/comment/${id}`,
      providesTags: ["Comment"],
    }),
    addCommentByIdPro: biulder.mutation<any, any>({
      query: (pro) => ({
        url: `/comment`,
        method: "POST",
        body: pro,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteCommentById: biulder.mutation<any, any>({
      query: (id) => ({
        url: `/comment`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
export const {
  useGetAllCommentsQuery,
  useGetCommentByIdProQuery,
  useAddCommentByIdProMutation,
  useDeleteCommentByIdMutation,
} = commentApi;
