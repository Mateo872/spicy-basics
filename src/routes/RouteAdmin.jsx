import { Route, Routes } from "react-router-dom";
import AddProducts from "../components/AddProducts";

const RouteAdmin = () => {
  return (
    <>
      <Routes>
        <Route
          path="/usuario/administrador/agregar-producto"
          element={<AddProducts />}
        ></Route>
        <Route
          path="/usuario/administrador/editar-producto/:id"
          element={<AddProducts />}
        ></Route>
      </Routes>
    </>
  );
};

export default RouteAdmin;
