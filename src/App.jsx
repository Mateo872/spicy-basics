import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/common/Header";
import ContainerProducts from "./components/product/ContainerProducts";
import DetailProduct from "./components/product/DetailProduct";
import User from "./components/auth/User";
import RouteProtect from "./routes/RouteProtected";
import RouteAdmin from "./routes/RouteAdmin";
import { SkeletonTheme } from "react-loading-skeleton";
import { getProducts } from "./helpers/productsApi";
import { setProducts } from "./features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./features/loading/loadingSlice";
import { useEffect } from "react";
import CartContainer from "./components/CartContainer";

function App() {
  const updateState = useSelector((state) => state.update.update);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        getProducts().then((res) => {
          dispatch(setProducts(res.products));
          dispatch(setLoading(false));
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [updateState]);

  return (
    <SkeletonTheme highlightColor="#ddd">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ContainerProducts />
                </>
              }
            />
            <Route
              path="/producto-detalle/name/:id"
              element={<DetailProduct />}
            />
            <Route path="/usuario/iniciar-sesion" element={<User />} />
            <Route path="/usuario/registrarse" element={<User />} />
            <Route
              path="/spicy/admin/*"
              element={
                <RouteProtect>
                  <RouteAdmin />
                </RouteProtect>
              }
            ></Route>
            <Route path="/usuario/carrito" element={<CartContainer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
