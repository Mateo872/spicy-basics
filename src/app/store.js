import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/auth/usersSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});
