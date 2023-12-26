import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, Welcome } from "../../types/types.products";

interface ProductsState extends Welcome {
  product: Omit<Product, "__v" | "_id">;
}

const initialState: ProductsState = {
  products: [],
  product: {
    name: "",
    price: 0,
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    description: "",
    category: "",
    stock: 0,
    sizes: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Partial<Product>>) => {
      const {
        _id,
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
      const foundProduct: Product | undefined = state.products.find(
        (product) => product._id === _id
      );

      if (foundProduct) {
        foundProduct.name = name ?? foundProduct.name;
        foundProduct.price = price ?? foundProduct.price;
        foundProduct.imageOne = imageOne ?? foundProduct.imageOne;
        foundProduct.imageTwo = imageTwo ?? foundProduct.imageTwo;
        foundProduct.imageThree = imageThree ?? foundProduct.imageThree;
        foundProduct.description = description ?? foundProduct.description;
        foundProduct.category = category ?? foundProduct.category;
        foundProduct.stock = stock ?? foundProduct.stock;
        foundProduct.sizes = sizes ?? foundProduct.sizes;
      }
    },
    deleteProduct: (state, action: PayloadAction<Product["_id"]>) => {
      const foundProduct: Product | undefined = state.products.find(
        (product) => product._id === action.payload
      );
      if (foundProduct) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      }
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
