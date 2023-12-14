import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailProduct = () => {
  let [favorites, setFavorites] = useState([]);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const productsState = useSelector((state) => state.products.products);
  const product = productsState.filter((product) => product.id === id);

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
    if (!favorites.includes(id)) {
      setFavorites([id]);
    } else {
      favorites = favorites.filter((fav) => fav != id);
      setFavorites([...favorites]);
    }
  };

  return (
    <section className="container_detail">
      <article>
        <div className="container_pagination">
          <a href="#">inicio /</a>
          <h4>{product?.[0]?.category} /</h4>
          <h4>
            <span> {product?.[0]?.name}</span>
          </h4>
        </div>
        <h6>Stock - {product?.[0]?.stock}</h6>
        <div className="detail_product">
          <div className="detail_image">
            <div className="container_heart" onClick={getFavorites}>
              {favorites.filter((fav) => fav === id).length > 0 ? (
                <BsFillHeartFill />
              ) : (
                <BsHeart />
              )}
            </div>
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
          <div className="container_features">
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
      <article className="container_similar">
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
