const URL_USERS = import.meta.env.VITE_API_USERS;
const URL_USER = import.meta.env.VITE_API_USER;
const URL_USERCREATE = import.meta.env.VITE_API_USERCREATE;

export const login = async (user) => {
  try {
    const response = await fetch(`${URL_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (token) => {
  try {
    const res = await fetch(`${URL_USER}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
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

export const updateUser = async (user, token) => {
  try {
    const res = await fetch(`${URL_USER}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
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

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAdmin = async (id, body, token) => {
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

export const deleteUserAdmin = async (id, token) => {
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

export const deleteProductAdmin = async (id, token) => {
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

export const deleteProductsAdmin = async (ids, token) => {
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
