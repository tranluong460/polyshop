import { configureStore } from "@reduxjs/toolkit";

import { productApi } from "../api/products";
import { categoryApi } from "../api/categories";
import { commentApi } from "../api/comment";
import { authApi } from "../api/auth";
import { feedbackApi } from "../api/feedback";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(commentApi.middleware)
      .concat(authApi.middleware)
      .concat(feedbackApi.middleware),
});
