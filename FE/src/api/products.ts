import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../interface";

type ProductsResponse = {
  message: string;
  data: IProduct[];
};

export const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    getOneProducts: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetOneProductsQuery } = productApi;
