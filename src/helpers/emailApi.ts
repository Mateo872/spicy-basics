import { MailProducts } from "../types/types.mail";

const URL_EMAIL = import.meta.env.VITE_API_EMAIL;

export const sendMail = async (products: MailProducts, email: string) => {
  try {
    const productParams = encodeURIComponent(JSON.stringify(products));
    const response = await fetch(
      `${URL_EMAIL}/${email}/send?products=${productParams}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
