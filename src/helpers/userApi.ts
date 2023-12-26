import { Product } from "../types/types.products";
import {
  EditUser,
  Login,
  User,
  UserOmit,
  Users,
  Welcome,
} from "../types/types.users";

const URL_USERS = import.meta.env.VITE_API_USERS;
const URL_USER = import.meta.env.VITE_API_USER;
const URL_USERCREATE = import.meta.env.VITE_API_USERCREATE;

export const login = async (user: Partial<User>) => {
  try {
    const response = await fetch(`${URL_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data: Login = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (token: string) => {
  try {
    const res = await fetch(`${URL_USER}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user: Welcome = await res.json();

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: UserOmit) => {
  try {
    const res = await fetch(`${URL_USERCREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user: Partial<User>, token: string) => {
  try {
    const res = await fetch(`${URL_USER}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data: EditUser = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: Product["_id"]) => {
  try {
    const res = await fetch(`${URL_USER}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const res = await fetch(`${URL_USERS}`, {
      method: "GET",
    });

    const data: Users[] = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAdmin = async (
  id: Product["_id"] | undefined,
  body: Partial<Product>,
  token: string
) => {
  try {
    const res = await fetch(`${URL_USERS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAdmin = async (id: Product["_id"], token: string) => {
  try {
    const res = await fetch(`${URL_USERS}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductAdmin = async (id: Product["_id"], token: string) => {
  try {
    const res = await fetch(`${URL_USERS}/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductsAdmin = async (
  ids: Product["_id"][],
  token: string
) => {
  try {
    const res = await Promise.all(
      ids.map((id) =>
        fetch(`${URL_USERS}/product/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
