import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/common/Header";
import ContainerProducts from "./components/product/ContainerProducts";
import DetailProduct from "./components/product/DetailProduct";
import User from "./components/auth/User";

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
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
