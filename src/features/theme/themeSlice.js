import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  themeHover: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setThemeHover: (state, action) => {
      state.themeHover = action.payload;
    },
  },
});

export const { setTheme, setThemeHover } = themeSlice.actions;
export default themeSlice.reducer;
