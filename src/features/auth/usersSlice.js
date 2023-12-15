import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {
    name: "",
    email: "",
    image: "",
    password: "",
    role: "",
    favorites: [],
    state: "",
    cart: [],
    history: [],
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
    editUser: (state, action) => {
      const {
        id,
        name,
        email,
        image,
        password,
        role,
        favorites,
        state: stateUser,
      } = action.payload;

      const foundUser = state.user;

      if (foundUser) {
        foundUser.name = name;
        foundUser.email = email;
        foundUser.image = image;
        foundUser.password = password;
        foundUser.role = role;
        foundUser.favorites = favorites;
        foundUser.state = stateUser;
      }
    },
  },
});

export const { users, addUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
