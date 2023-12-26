export interface Welcome {
  message: string;
  user: User;
}

export interface Login {
  message: string;
  token: string;
}

export interface EditUser {
  message: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image: string;
  state: boolean;
  role: string;
  favorites: string[];
  cart: Cart[];
  history: History[];
  theme: string;
  __v?: number;
}

export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Cart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: Size[];
}

export interface History {
  date: string;
  products: object[];
  totalPrice: number;
}

export type Users = Omit<User, "__v">;

export interface UserOmit
  extends Omit<User, "_id" | "__v" | "message" | "user"> {}

export interface UsersState {
  users: {
    user: User;
  };
  user: {
    user: User;
  };
}

export enum STATUS_EDIT {
  OK = "El usuario fue editado correctamente",
}
