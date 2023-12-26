import ProductFilter from "./ProductFilter";
import { BsSearch } from "react-icons/bs";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../CardSkeleton";
import { setLoading } from "../../features/loading/loadingSlice";
import { LoadingState } from "../../types/types.loading";
import { ThemeState } from "../../types/types.themes";
import { Product as Prod } from "../../types/types.products";

interface Prop {
  [key: string]: boolean;
}

interface PropProducts {
  products: {
    products: Prod[];
  };
}

const ContainerProducts = () => {
  const productsState = useSelector(
    (state: PropProducts) => state.products.products
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [filterState, setFilterState] = useState<Prop>({
    Todos: true,
    Conjuntos: false,
    Vestidos: false,
    Polleras: false,
    Corset: false,
    Tops: false,
    Remeras: false,
  });
  const loading = useSelector((state: LoadingState) => state.loading.loading);
  const [loadingInput, setLoadingInput] = useState(false);
  const themeState = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();

  const handleFilterClick = (title: string) => {
    setFilterState((prev) => {
      const newFilterState = { ...prev, [title]: !prev[title] };

      if (title !== "Todos") {
        newFilterState.Todos = false;
      } else {
        Object.keys(newFilterState).forEach((filterTitle: string) => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(setLoading(true));
    setLoadingInput(true);

    setTimeout(() => {
      dispatch(setLoading(false));
      setLoadingInput(false);
    }, 200);
  };

  const productsFiltered = productsState?.filter((product: Prod) =>
    product?.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const productsEmpty =
    (productsState?.length === 0 && productsFiltered?.length === 0) ||
    productsFiltered?.filter(
      (product: Prod) => filterState.Todos || filterState[product.category]
    ).length === 0;

  return (
    <section
      className={`container_products ${
        themeState.theme === "dark" ? ".container_products-theme" : ""
      }`}
    >
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
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleSearch(e)}
            placeholder="Buscá tu producto"
            className={`${themeState.theme === "dark" ? "input_theme" : ""}`}
          />
          <BsSearch
            className={`${themeState.theme === "dark" ? "icon_theme" : ""}`}
          />
        </div>
      </article>
      <article
        className={`products ${productsEmpty ? "products_filtered" : ""}`}
        style={{
          justifyContent: productsEmpty || loadingInput ? "center" : "",
        }}
      >
        {!loading ? (
          <>
            {productsState?.length > 0 ? (
              productsFiltered?.length > 0 ? (
                (() => {
                  const filteredProducts = productsFiltered?.filter(
                    (product: Prod) =>
                      filterState.Todos || filterState[product.category]
                  );

                  return filteredProducts.length > 0 ? (
                    filteredProducts.map((product: Prod) => (
                      <Product
                        key={product._id}
                        // id={product._id}
                        product={product}
                      />
                    ))
                  ) : (
                    <p
                      className={
                        themeState.theme === "dark" ? "text_theme" : ""
                      }
                    >
                      No hay productos disponibles que coincidan con los filtros
                    </p>
                  );
                })()
              ) : (
                productsState?.length > 0 && (
                  <p
                    className={themeState.theme === "dark" ? "text_theme" : ""}
                  >
                    No hay productos disponibles con ese nombre
                  </p>
                )
              )
            ) : (
              <p className={themeState.theme === "dark" ? "text_theme" : ""}>
                No hay productos disponibles
              </p>
            )}
          </>
        ) : loadingInput ? (
          <div className="loader"></div>
        ) : (
          <CardSkeleton products={productsFiltered.length} />
        )}
      </article>
    </section>
  );
};

export default ContainerProducts;
