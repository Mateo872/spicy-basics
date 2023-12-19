import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdate: (state, action) => {
      state.update = action.payload;
    },
  },
});

export const { setUpdate } = updateSlice.actions;
export default updateSlice.reducer;
