import ProductFilter from "./ProductFilter";
import { BsSearch } from "react-icons/bs";
import Product from "./Product";

const ContainerProducts = () => {
  return (
    <section className="container_products">
      <article className="filters">
        <div className="container_filters">
          <ProductFilter title={"Todos"} isActive={true} />
          <ProductFilter title={"Conjuntos"} isActive={false} />
          <ProductFilter title={"Vestidos"} isActive={false} />
          <ProductFilter title={"Polleras"} isActive={false} />
          <ProductFilter title={"Corset"} isActive={false} />
          <ProductFilter title={"Tops"} isActive={false} />
          <ProductFilter title={"Remeras"} isActive={false} />
        </div>
        <div className="container_input">
          <input type="text" placeholder="Buscá tu producto" />
          <BsSearch />
        </div>
      </article>
      <article className="products">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </article>
    </section>
  );
};

export default ContainerProducts;
