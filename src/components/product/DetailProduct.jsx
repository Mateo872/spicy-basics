import image from "../../assets/images/imagen_card.png";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const DetailProduct = () => {
  let [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const { id } = useParams();

  const getFavorites = () => {
    if (!favorites.includes(id)) {
      setFavorites([...id]);
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
          <h4>tops /</h4>
          <h4>
            <span> top black</span>
          </h4>
        </div>
        <h6>Stock - 30</h6>
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
            >
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="container_features">
            <div>
              <h2 className="detail_title">TOP BLACK</h2>
              <h2>$20.000</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, voluptatem, quidem, quos quas voluptatum.
            </p>
            <div>
              <h3>Tamaño</h3>
              <div className="container_size">
                <div className="size size_active">
                  <p>XS</p>
                </div>
                <div className="size">
                  <p>S</p>
                </div>
                <div className="size">
                  <p>M</p>
                </div>
                <div className="size">
                  <p>L</p>
                </div>
                <div className="size">
                  <p>XL</p>
                </div>
              </div>
            </div>
            <div className="container_color">
              <h3>Color</h3>
              <div className="color">
                <div className="color_item"></div>
                <div className="color_item"></div>
              </div>
            </div>
            <div className="quantity">
              <label htmlFor="quantity">Cantidad</label>
              <input id="quantity" type="number" placeholder="0" />
            </div>
            <button className="btn_add">Agregar al carrito</button>
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
