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

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const productsState = useSelector((state) => state.products.products);
  const product = productsState.filter((product) => product._id === id);
  const userState = useSelector((state) => state.users);
  const themeState = useSelector((state) => state.theme);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (product?.[0]?.sizes.length > 0) {
      setSelectedSize(product[0].sizes[0]);
    }
  }, []);

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
        <div className="container_pagination">
          <Link to={"/"}>inicio /</Link>
          <h4>{product?.[0]?.category} /</h4>
          <h4>
            <span> {product?.[0]?.name}</span>
          </h4>
        </div>
        <h6>Stock - {product?.[0]?.stock}</h6>
        <div className="detail_product">
          <div className="detail_image">
            {userState?.user?.role !== "admin" && (
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
          <div
            className={`container_features ${
              themeState.theme === "dark" && "container_features-theme"
            }`}
          >
            <div className="features-product">
              <div>
                <h2 className="detail_title">
                  {product?.[0]?.name.toUpperCase()}
                </h2>
                <h2>
                  ${parseInt(product?.[0]?.price).toLocaleString("es-AR")}
                </h2>
              </div>
              <p>{product?.[0]?.description}</p>
              <div>
                <h3>Tamaño</h3>
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
                <label htmlFor="quantity">Cantidad</label>
                <input id="quantity" type="number" placeholder="0" />
              </div>
              <button className="btn_add">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </article>
      <article
        className={`container_similar ${
          themeState.theme === "dark" && "container_similar-theme"
        }`}
      >
        <h3>Productos similares</h3>
        <div className="slider_products">
          <div className="products">
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </article>
    </section>
  );
};

export default DetailProduct;
