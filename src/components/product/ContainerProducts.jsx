import ProductFilter from "./ProductFilter";

const ContainerProducts = () => {
  return (
    <section className="container_products">
      <article>
        <div className="container_filters">
          <ProductFilter />
          <ProductFilter />
          <ProductFilter />
        </div>
      </article>
    </section>
  );
};

export default ContainerProducts;
