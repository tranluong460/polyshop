import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (biulder) => ({
    getAllComments: biulder.query<any, void>({
      query: () => `/comment`,
      providesTags: ["Comment"],
    }),
  }),
});
export const { useGetAllCommentsQuery } = commentApi;
