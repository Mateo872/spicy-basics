import { Size } from "./types.users";

export interface Welcome {
  products: Product[];
}

export interface ProductCreate {
  message: string;
  product: Product;
}

export interface Product {
  _id: string;
  name: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  sizes: string[];
  __v: number;
}

export interface ProductsState {
  products: {
    products: Product[];
  };
}

export interface ProductCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: Size[];
}

export enum PRODUCT_CREATE {
  CREATED = "Producto agregado correctamente",
  ERROR = "no se pudo agregar el producto",
}

export enum PRODUCT_ACTION {
  ADD = "ADD",
  SUBSTRACT = "SUBSTRACT",
}
