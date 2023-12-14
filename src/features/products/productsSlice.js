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
      const { id, updatedProduct } = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });
    },
  },
});

export const { addProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
