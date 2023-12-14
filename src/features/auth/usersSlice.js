import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    name: "",
    email: "",
    image: "",
    password: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
