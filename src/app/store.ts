import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/auth/usersSlice";
import productsReducer from "../features/products/productsSlice";
import themeReducer from "../features/theme/themeSlice";
import loadingReducer from "../features/loading/loadingSlice";
import updateReducer from "../features/update/updateSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    theme: themeReducer,
    loading: loadingReducer,
    update: updateReducer,
  },
});
