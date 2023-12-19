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
    setProducts: (state, action) => {
      state.products = action.payload;
    },
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
    deleteProduct: (state, action) => {
      const foundProduct = state.products.find(
        (product) => product.id === action.payload
      );
      if (foundProduct) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
