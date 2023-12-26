import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
  themeHover: string;
}

const initialState: ThemeState = {
  theme: "light",
  themeHover: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setThemeHover: (state, action: PayloadAction<string>) => {
      state.themeHover = action.payload;
    },
  },
});

export const { setTheme, setThemeHover } = themeSlice.actions;
export default themeSlice.reducer;
