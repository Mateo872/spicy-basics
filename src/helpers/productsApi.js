const URL_PRODUCT = import.meta.env.VITE_API_PRODUCT;

export const getProducts = async () => {
  try {
    const respuesta = await fetch(URL_PRODUCT);
    const product = await respuesta.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};
export const getProductId = async (id) => {
  try {
    const respuesta = await fetch(`${URL_PRODUCT}/${id}`);
    const product = await respuesta.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (product, token) => {
  try {
    const respuesta = await fetch(URL_PRODUCT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product, token, id) => {
  try {
    const respuesta = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (token, id) => {
  try {
    const respuesta = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
