import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserOmit } from "../../types/types.users";

interface UserState {
  users: User[];
  user: UserOmit;
}

const initialState: UserState = {
  users: [],
  user: {
    name: "",
    email: "",
    image: "",
    password: "",
    role: "",
    favorites: [],
    state: true,
    cart: [],
    history: [],
    theme: "light",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    users: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    addUser: (state, action: PayloadAction<UserOmit>) => {
      state.user = action.payload;
    },
    editUser: (state, action: PayloadAction<Partial<User>>) => {
      const {
        name,
        email,
        image,
        password,
        role,
        favorites,
        state: stateUser,
        cart,
        history,
      } = action.payload;

      const foundUser: UserOmit | undefined = state.user;

      if (foundUser) {
        foundUser.name = name ?? foundUser.name;
        foundUser.email = email ?? foundUser.email;
        foundUser.image = image ?? foundUser.image;
        foundUser.password = password ?? foundUser.password;
        foundUser.role = role ?? foundUser.role;
        foundUser.favorites = favorites ?? foundUser.favorites;
        foundUser.state = stateUser ?? foundUser.state;
        foundUser.cart = cart ?? foundUser.cart;
        foundUser.history = history ?? foundUser.history;
      }
    },
  },
});

export const { users, addUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
