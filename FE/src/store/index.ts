import { configureStore } from "@reduxjs/toolkit";

import { productApi } from "../api/products";
import { categoryApi } from "../api/categories";
import { commentApi } from "../api/comment";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(commentApi.middleware),
});
