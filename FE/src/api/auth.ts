import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICardUser, IProduct, IUser } from "../interface";

type ILogin = {
  email: string;
  password: string;
};

type IRegister = {
  name: string;
  email: string;
  password: string;
};

type CardsResponse = {
  message: string;
  listCards: ICardUser[];
};

type UsersResponse = {
  message: string;
  data: IUser[];
};

type CartResponse = {
  message: string;
  cart: any;
};

type FavoritesResponse = {
  message: string;
  listProducts: IProduct[];
};

type CardData = {
  _id?: string;
  card_holder_name: string;
  card_number: string | number;
  start_date: string;
  end_date: string;
  cvv: string | number;
  main: boolean | undefined;
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
    getAllUser: builder.query<UsersResponse, void>({
      query: () => {
        const token = localStorage.getItem("token");

        return {
          url: `/auth`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      providesTags: ["Auth"],
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
    favoriteProducts: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        return {
          url: `/favorites/${id}`,
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    getFavoritesByUser: builder.query<FavoritesResponse, void>({
      query: () => {
        const token = localStorage.getItem("token");

        return {
          url: `/favorites`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      providesTags: ["Auth"],
    }),
    addCards: builder.mutation({
      query: (data) => ({
        url: `/card`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getCardsByUser: builder.query<CardsResponse, void>({
      query: () => {
        const token = localStorage.getItem("token");

        return {
          url: `/card`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      providesTags: ["Auth"],
    }),
    createCard: builder.mutation({
      query: (data: CardData) => {
        const token = localStorage.getItem("token");

        return {
          url: `/card`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    uploadCard: builder.mutation({
      query: (data: CardData) => {
        const token = localStorage.getItem("token");
        const { _id, ...newData } = data;
        return {
          url: `/card/${_id}`,
          method: "PATCH",
          body: newData,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    addCart: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");

        return {
          url: `/cart`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    updateCart: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");

        return {
          url: `/cart`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    getCartByUser: builder.query<CartResponse, void>({
      query: () => {
        const token = localStorage.getItem("token");

        return {
          url: `/cart`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      providesTags: ["Auth"],
    }),
    createOrder: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");

        return {
          url: `/order`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    createPayment: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");

        return {
          url: `/payment`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["Auth"],
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
  useFavoriteProductsMutation,
  useGetCardsByUserQuery,
  useCreateCardMutation,
  useUploadCardMutation,
  useGetFavoritesByUserQuery,
  useGetAllUserQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useGetCartByUserQuery,
  useCreateOrderMutation,
  useCreatePaymentMutation,
} = authApi;
