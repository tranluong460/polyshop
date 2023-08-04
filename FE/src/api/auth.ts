import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ILogin = {
  email: string;
  password: string;
};

type IRegister = {
  name: string;
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: ILogin) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerUser: builder.mutation({
      query: (data: IRegister) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUserByToken: builder.mutation({
      query: (token: string | null) => ({
        url: `/auth/get-user-token`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserByTokenMutation,
} = authApi;
