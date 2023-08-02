import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICategoryProduct } from "../interface";

type CategoriesResponse = {
  message: string;
  data: ICategoryProduct[];
};

export const categoryApi = createApi({
  reducerPath: "categories",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoriesResponse, void>({
      query: () => `/category`,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
