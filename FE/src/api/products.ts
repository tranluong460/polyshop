import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../interface";

export const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProduct, string | number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product: IProduct) => {
        return {
          url: "products",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (product: IProduct) => {
        return {
          url: `products/${product._id}`,
          method: "PATCH",
          body: product,
        };
      },
      invalidatesTags: ["Product"],
    }),
    removeProduct: builder.mutation<IProduct, string | number>({
      query: (id) => {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productApi;
