import ProductFilter from "./ProductFilter";
import { BsSearch } from "react-icons/bs";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "../../features/products/productsSlice";
import { getProducts } from "../../helpers/productsApi";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../CardSkeleton";

const ContainerProducts = () => {
  const productsState = useSelector((state) => state.products.products);
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState({
    Todos: true,
    Conjuntos: false,
    Vestidos: false,
    Polleras: false,
    Corset: false,
    Tops: false,
    Remeras: false,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const themeState = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        getProducts().then((res) => {
          setLoading(false);
          dispatch(setProducts(res.products));
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [update]);

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

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const productsFiltered = productsState?.filter((product) =>
    product?.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const productsEmpty =
    (productsState?.length === 0 && productsFiltered?.length === 0) ||
    productsFiltered?.filter(
      (product) => filterState.Todos || filterState[product.category]
    ).length === 0;

  return (
    <section
      className={`container_products ${
        themeState.theme === "dark" && ".container_products-theme"
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
            className={`${themeState.theme === "dark" && "input_theme"}`}
          />
          <BsSearch
            className={`${themeState.theme === "dark" && "icon_theme"}`}
          />
        </div>
      </article>
      <article
        className={`products ${productsEmpty && "products_filtered"}`}
        style={{
          justifyContent: productsEmpty && "center",
        }}
      >
        {!loading ? (
          <>
            {productsState?.length > 0 ? (
              productsFiltered?.length > 0 ? (
                (() => {
                  const filteredProducts = productsFiltered?.filter(
                    (product) =>
                      filterState.Todos || filterState[product.category]
                  );

                  return filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Product
                        key={product._id}
                        id={product._id}
                        product={product}
                        setUpdate={setUpdate}
                      />
                    ))
                  ) : (
                    <p>
                      No hay productos disponibles que coincidan con los filtros
                    </p>
                  );
                })()
              ) : (
                productsState?.length > 0 && (
                  <p>No hay productos disponibles con ese nombre</p>
                )
              )
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </>
        ) : (
          <CardSkeleton products={productsFiltered.length} />
        )}
      </article>
    </section>
  );
};

export default ContainerProducts;
