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
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    addProducts: builder.mutation({
      query: (data: IProduct) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProducts: builder.mutation({
      query: (data: IProduct) => {
        const { _id, ...newData } = data;
        return {
          url: `/products/${_id}`,
          method: "PATCH",
          body: newData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProducts: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetOneProductsQuery,
  useAddProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productApi;
