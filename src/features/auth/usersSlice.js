import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {
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
    users: (state, action) => {
      state.users.push(action.payload);
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { users, addUser } = usersSlice.actions;
export default usersSlice.reducer;
