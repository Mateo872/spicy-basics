const URL_PAYMENT = import.meta.env.VITE_API_PAYMENT;

export const payment = async (products, token) => {
  try {
    const response = await fetch(`${URL_PAYMENT}/create-order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(products),
    });
    const payment = await response.json();
    return payment;
  } catch (error) {
    console.log(error);
  }
};
