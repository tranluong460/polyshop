import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const feedbackApi = createApi({
  reducerPath: "feedback",
  tagTypes: ["Feedback"],
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
    getAllFeedback: builder.query<any, void>({
      query: () => `/feedback`,
      providesTags: ["Feedback"],
    }),
    getOneFeedback: builder.query<any, string | number>({
      query: (id) => `/feedback/${id}`,
      providesTags: ["Feedback"],
    }),
    addFeedback: builder.mutation<any, any>({
      query: (feedback) => ({
        url: `/feedback`,
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    removeFeedback: builder.mutation<any, any>({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});
export const {
  useGetAllFeedbackQuery,
  useGetOneFeedbackQuery,
  useAddFeedbackMutation,
  useRemoveFeedbackMutation,
} = feedbackApi;
export { feedbackApi };
