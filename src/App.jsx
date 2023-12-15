import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/common/Header";
import ContainerProducts from "./components/product/ContainerProducts";
import DetailProduct from "./components/product/DetailProduct";
import User from "./components/auth/User";
import RouteProtect from "./routes/RouteProtected";
import RouteAdmin from "./routes/RouteAdmin";

function App() {
  return (
    <HashRouter>
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
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
