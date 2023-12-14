import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {
    name: "",
    price: 0,
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    description: "",
    category: "",
    stock: "",
    sizes: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const {
        id,
        name,
        price,
        imageOne,
        imageTwo,
        imageThree,
        description,
        category,
        stock,
        sizes,
      } = action.payload;
      const foundProduct = state.products.find((product) => product.id === id);
      if (foundProduct) {
        foundProduct.name = name;
        foundProduct.price = price;
        foundProduct.imageOne = imageOne;
        foundProduct.imageTwo = imageTwo;
        foundProduct.imageThree = imageThree;
        foundProduct.description = description;
        foundProduct.category = category;
        foundProduct.stock = stock;
        foundProduct.sizes = sizes;
      }
    },
  },
});

export const { addProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
