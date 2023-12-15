const URL_PRODUCT = import.meta.env.VITE_API_PRODUCT;

export const getProducts = async () => {
  try {
    const response = await fetch(URL_PRODUCT);
    const product = await response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};
export const getProductId = async (id) => {
  try {
    const response = await fetch(`${URL_PRODUCT}/${id}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (product, token) => {
  try {
    const response = await fetch(URL_PRODUCT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product, token, id) => {
  try {
    const response = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (token, id) => {
  try {
    const response = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
