import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UpdateState {
  update: boolean;
}

const initialState: UpdateState = {
  update: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.update = action.payload;
    },
  },
});

export const { setUpdate } = updateSlice.actions;
export default updateSlice.reducer;
