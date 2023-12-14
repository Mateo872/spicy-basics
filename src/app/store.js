import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/auth/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
