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
    sendCodeAuth: builder.mutation({
      query: (data: { email: string | undefined }) => ({
        url: `/send-code`,
        method: "POST",
        body: data,
      }),
    }),
    checkCodeAuth: builder.mutation({
      query: (data: { code: string }) => {
        const checkToken = localStorage.getItem("tokenChange");

        return {
          url: `/check-code`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + checkToken,
          },
        };
      },
    }),
    changePasswordAuth: builder.mutation({
      query: (data: {
        oldPassword: string;
        password: string;
        confirmPassword: string;
      }) => {
        const checkToken = localStorage.getItem("tokenChange");

        return {
          url: `/change-pass`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + checkToken,
          },
        };
      },
    }),
    forgotPasswordAuth: builder.mutation({
      query: (data: { email: string }) => ({
        url: `/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordAuth: builder.mutation({
      query: (data: {
        password: string;
        randomCode: string;
        randomString: string | undefined;
      }) => {
        const forgotToken = localStorage.getItem("forgotToken");

        return {
          url: `/reset-password`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + forgotToken,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserByTokenMutation,
  useSendCodeAuthMutation,
  useCheckCodeAuthMutation,
  useChangePasswordAuthMutation,
  useForgotPasswordAuthMutation,
  useResetPasswordAuthMutation,
} = authApi;
