import ProductFilter from "./ProductFilter";
import { BsSearch } from "react-icons/bs";
import Product from "./Product";
import { useSelector } from "react-redux";
import { useState } from "react";

const ContainerProducts = () => {
  const productsState = useSelector((state) => state.products.products);

  const [filterState, setFilterState] = useState({
    Todos: true,
    Conjuntos: false,
    Vestidos: false,
    Polleras: false,
    Corset: false,
    Tops: false,
    Remeras: false,
  });

  const handleFilterClick = (title) => {
    setFilterState((prev) => {
      const newFilterState = { ...prev, [title]: !prev[title] };

      if (title !== "Todos") {
        newFilterState.Todos = false;
      } else {
        Object.keys(newFilterState).forEach((filterTitle) => {
          if (filterTitle !== "Todos") {
            newFilterState[filterTitle] = false;
          }
        });
      }

      const areAllOtherFiltersInactive = Object.entries(newFilterState).every(
        ([filterTitle, isActive]) => filterTitle === "Todos" || !isActive
      );

      if (areAllOtherFiltersInactive) {
        newFilterState.Todos = true;
      }
      return newFilterState;
    });
  };

  return (
    <section className="container_products">
      <article className="filters">
        <div className="container_filters">
          {Object.keys(filterState).map((title, index) => (
            <ProductFilter
              key={index}
              title={title}
              isActive={filterState[title]}
              handleFilterClick={handleFilterClick}
            />
          ))}
        </div>
        <div className="container_input">
          <input type="text" placeholder="Buscá tu producto" />
          <BsSearch />
        </div>
      </article>
      <article className="products">
        {productsState.length > 0 ? (
          (() => {
            const filteredProducts = productsState.filter(
              (product) => filterState.Todos || filterState[product.category]
            );

            return filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product.id} id={product.id} product={product} />
              ))
            ) : (
              <p>No hay productos que coincidan con los filtros</p>
            );
          })()
        ) : (
          <p>No hay productos</p>
        )}
      </article>
    </section>
  );
};

export default ContainerProducts;
