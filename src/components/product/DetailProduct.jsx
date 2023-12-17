import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../features/auth/usersSlice";
import { updateUser } from "../../helpers/userApi";
import Skeleton from "react-loading-skeleton";

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const productsState = useSelector((state) => state.products.products);
  const product = productsState.filter((product) => product._id === id);
  const userState = useSelector((state) => state.users);
  const themeState = useSelector((state) => state.theme);
  const productsCategory = productsState?.filter(
    (prod) => prod?.category === product?.[0].category
  );
  const loading = useSelector((state) => state.loading.loading);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (product?.[0]?.sizes.length > 0) {
      setSelectedSize(product[0].sizes[0]);
    }
  }, [product]);

  const handleSizeClick = (size) => {
    if (product?.[0]?.sizes.includes(size)) {
      setSelectedSize(size);
    }
  };

  const getFavorites = () => {
    const exist = userState?.user?.favorites?.includes(id);

    try {
      if (!exist) {
        const body = {
          id: userState?.user?.id,
          name: userState?.user?.name,
          email: userState?.user?.email,
          password: userState?.user?.password,
          image: userState?.user?.image,
          role: userState?.user?.role,
          state: userState?.user?.state,
          favorites: [...userState?.user?.favorites, id],
          cart: [],
          history: [],
        };
        updateUser(body, token);
        dispatch(editUser(body));
      } else {
        const newFavorites = userState?.user?.favorites?.filter(
          (fav) => fav !== id
        );
        const body = {
          id: userState?.user?.id,
          name: userState?.user?.name,
          email: userState?.user?.email,
          password: userState?.user?.password,
          image: userState?.user?.image,
          role: userState?.user?.role,
          state: userState?.user?.state,
          favorites: newFavorites,
          cart: [],
          history: [],
        };
        updateUser(body, token);
        dispatch(editUser(body));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className={`container_detail ${
        themeState.theme === "dark" && "container_detail-theme"
      }`}
    >
      <article>
        {!loading ? (
          <div className="container_pagination">
            <Link to={"/"}>inicio /</Link>
            <h4>{product?.[0]?.category} /</h4>
            <h4>
              <span> {product?.[0]?.name}</span>
            </h4>
          </div>
        ) : (
          <Skeleton width={200} height={15} />
        )}
        {!loading ? (
          <h6>Stock - {product?.[0]?.stock}</h6>
        ) : (
          <Skeleton width={50} height={10} />
        )}
        <div className="detail_product">
          {!loading ? (
            <div className="detail_image">
              {token && userState?.user?.role !== "admin" && (
                <div className="container_heart" onClick={getFavorites}>
                  {userState?.user?.favorites?.includes(id) ? (
                    <BsFillHeartFill />
                  ) : (
                    <BsHeart />
                  )}
                </div>
              )}
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                id="swiper"
              >
                <SwiperSlide>
                  <img
                    src={product?.[0]?.imageOne}
                    alt="Imágen principal del producto"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={product?.[0]?.imageTwo}
                    alt="Imágen secundaria del producto"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={product?.[0]?.imageThree}
                    alt="Imágen terciaria del producto"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          ) : (
            <Skeleton
              width={
                window.innerWidth >= 768 && window.innerWidth <= 988
                  ? 330
                  : window.innerWidth > 988
                  ? 472
                  : 280
              }
              height={
                window.innerWidth >= 768
                  ? window.innerWidth > 1024
                    ? 478.61
                    : 450
                  : 290
              }
            />
          )}
          <div
            className={`container_features ${
              themeState.theme === "dark" && "container_features-theme"
            }`}
          >
            <div className="features-product">
              <div>
                {!loading ? (
                  <h2 className="detail_title">
                    {product?.[0]?.name.toUpperCase()}
                  </h2>
                ) : (
                  <Skeleton width={80} height={20} />
                )}
                {!loading ? (
                  <h2>
                    ${parseInt(product?.[0]?.price).toLocaleString("es-AR")}
                  </h2>
                ) : (
                  <Skeleton width={50} height={10} />
                )}
              </div>
              {!loading ? (
                <p>{product?.[0]?.description}</p>
              ) : (
                <Skeleton width={200} height={15} />
              )}
              <div>
                {!loading ? (
                  <h3>Tamaño</h3>
                ) : (
                  <Skeleton width={"Tamaño".length * 10} height={10} />
                )}
                {!loading ? (
                  <div className="container_size">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <div
                        key={size}
                        className={`size ${
                          product?.[0]?.sizes.includes(size)
                            ? selectedSize === size
                              ? "size_active"
                              : ""
                            : "size_disable"
                        }`}
                        onClick={() => handleSizeClick(size)}
                      >
                        <p>{size}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="container_size">
                    <Skeleton width={40} height={40} />
                    <Skeleton width={40} height={40} />
                    <Skeleton width={40} height={40} />
                    <Skeleton width={40} height={40} />
                  </div>
                )}
              </div>
              {/* <div className="container_color">
              <h3>Color</h3>
              <div className="color">
                <div className="color_item"></div>
                <div className="color_item"></div>
              </div>
            </div> */}
            </div>
            <div className="feature_quantity">
              <div className="quantity">
                {!loading ? (
                  <>
                    <label htmlFor="quantity">Cantidad</label>
                    <input id="quantity" type="number" placeholder="0" />
                  </>
                ) : (
                  <>
                    <Skeleton width={"Cantidad".length * 10} height={20} />
                    <Skeleton
                      width={window.innerWidth >= 768 ? 260 : 280}
                      height={20}
                    />
                  </>
                )}
              </div>
              {!loading ? (
                <button className="btn_add">Agregar al carrito</button>
              ) : (
                <Skeleton
                  width={window.innerWidth >= 768 ? 260 : 280}
                  height={40}
                />
              )}
            </div>
          </div>
        </div>
      </article>
      {productsCategory.length > 1 && (
        <article
          className={`container_similar ${
            themeState.theme === "dark" && "container_similar-theme"
          }`}
        >
          <h3>Productos similares</h3>
          <div className="slider_products">
            <div className="products">
              {productsCategory
                .filter((prod) => prod._id !== id)
                .map((product) => (
                  <Product product={product} key={product._id} />
                ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default DetailProduct;
