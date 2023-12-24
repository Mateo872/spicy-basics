import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../features/auth/usersSlice";
import { updateUser } from "../../helpers/userApi";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { editProduct as updateProduct } from "../../helpers/productsApi";
import { editProduct } from "../../features/products/productsSlice";
import { setUpdate } from "../../features/update/updateSlice";

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const productsState = useSelector((state) => state.products.products);
  const product = productsState.filter((product) => product._id === id);
  const userState = useSelector((state) => state.users);
  const themeState = useSelector((state) => state.theme);
  const updateState = useSelector((state) => state.update.update);
  const productsCategory = productsState?.filter(
    (prod) => prod?.category === product?.[0].category
  );
  const loading = useSelector((state) => state.loading.loading);
  const token = sessionStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (product?.[0]?.sizes.length > 0) {
      setSelectedSize(product[0].sizes[0]);
    }
  }, [product?.[0]?.sizes]);

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
          id: userState?.user?._id,
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
          id: userState?.user?._id,
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

  const onSubmit = (data) => {
    if (product?.[0]?.stock === 0) {
      Swal.fire({
        title: "Error",
        text: "No hay stock disponible",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      try {
        const exist = userState?.user?.cart?.some(
          (prod) => prod.id === product?.[0]?._id
        );

        if (exist) {
          const newCart = userState?.user?.cart?.map((prod) => {
            if (prod.id === product?.[0]?._id) {
              const newSize = prod.size.includes(selectedSize)
                ? prod.size
                : [...prod.size, selectedSize];

              return {
                id: prod.id,
                name: prod.name,
                price: parseInt(prod.price),
                quantity: parseInt(+prod.quantity + +data.quantity),
                size: newSize,
              };
            } else {
              return prod;
            }
          });

          const body = {
            id: userState?.user?._id,
            name: userState?.user?.name,
            email: userState?.user?.email,
            password: userState?.user?.password,
            image: userState?.user?.image,
            role: userState?.user?.role,
            state: userState?.user?.state,
            favorites: userState?.user?.favorites,
            cart: newCart,
            history: userState?.user?.history,
            theme: userState?.user?.theme,
          };
          updateUser(body, token);
          dispatch(editUser(body));
        } else {
          const body = {
            id: userState?.user?._id,
            name: userState?.user?.name,
            email: userState?.user?.email,
            password: userState?.user?.password,
            image: userState?.user?.image,
            role: userState?.user?.role,
            state: userState?.user?.state,
            favorites: userState?.user?.favorites,
            cart: [
              ...userState?.user?.cart,
              {
                id: product?.[0]?._id,
                name: product?.[0]?.name,
                price: product?.[0]?.price,
                quantity: parseInt(+data.quantity),
                size: [selectedSize],
              },
            ],
            history: userState?.user?.history,
            theme: userState?.user?.theme,
          };

          updateUser(body, token);
          dispatch(editUser(body));
        }
        Swal.fire({
          title: "Producto agregado al carrito",
          icon: "success",
          confirmButtonText: "Ok",
        });
        const bodyProduct = {
          id: product?.[0]?._id,
          name: product?.[0]?.name,
          imageOne: product?.[0]?.imageOne,
          imageTwo: product?.[0]?.imageTwo,
          imageThree: product?.[0]?.imageThree,
          price: product?.[0]?.price,
          description: product?.[0]?.description,
          stock: product?.[0]?.stock - parseInt(+data.quantity),
          category: product?.[0]?.category,
          sizes: product?.[0]?.sizes,
        };
        dispatch(editProduct(bodyProduct));
        dispatch(setUpdate(!updateState));
        updateProduct(bodyProduct, token, product?.[0]?._id);
        setValue("quantity", "");
        setSelectedSize(product?.[0]?.sizes[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section
      className={`container_detail ${
        themeState.theme === "dark" ? "container_detail-theme" : ""
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
          product?.[0]?.stock > 0 ? (
            <h6>Stock - {product?.[0]?.stock}</h6>
          ) : (
            <h6>No disponible</h6>
          )
        ) : (
          <Skeleton width={50} height={10} />
        )}
        <form className="detail_product" onSubmit={handleSubmit(onSubmit)}>
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
              themeState.theme === "dark" ? "container_features-theme" : ""
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
                            ? selectedSize === size && product?.[0]?.stock > 0
                              ? "size_active"
                              : ""
                            : "size_disable"
                        } ${product?.[0]?.stock === 0 && "size_disable"}`}
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
                    <label
                      className={
                        product?.[0]?.stock === 0 ||
                        userState?.user?.name.length === 0
                          ? "input_disable"
                          : ""
                      }
                      htmlFor="quantity"
                    >
                      Cantidad
                    </label>
                    <input
                      id="quantity"
                      className={
                        product?.[0]?.stock === 0 ||
                        userState?.user?.name.length === 0
                          ? "input_disable"
                          : ""
                      }
                      type="number"
                      disabled={product?.[0]?.stock === 0}
                      placeholder="0"
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: "Este campo es requerido",
                        },
                        min: {
                          value: 1,
                          message: "La cantidad mínima es 1",
                        },
                        max: {
                          value: product?.[0]?.stock,
                          message: `La cantidad máxima es ${product?.[0]?.stock}`,
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Solo se permiten números",
                        },

                        validate: {
                          max: (value) =>
                            parseInt(value) <= product?.[0]?.stock ||
                            `La cantidad máxima es ${product?.[0]?.stock}`,
                        },
                      })}
                    />
                    {errors.quantity && (
                      <span
                        className="text_error"
                        style={{
                          marginTop:
                            innerWidth < 768
                              ? "1rem"
                              : innerWidth >= 768 && innerWidth < 1024
                              ? ".4rem"
                              : ".2",
                          marginBottom: "-.5rem",
                        }}
                      >
                        {errors.quantity.message}
                      </span>
                    )}
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
                <button
                  className={`btn_add ${
                    product?.[0]?.stock === 0 ||
                    userState?.user?.name.length === 0
                      ? "btn_add-disable"
                      : ""
                  }`}
                  disabled={
                    product?.[0]?.stock === 0 ||
                    userState?.user?.name.length === 0
                  }
                  onClick={() =>
                    userState?.user?.name.length === 0
                      ? Swal.fire({
                          title: "Debe iniciar sesión",
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonText: "Iniciar sesión",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/usuario/iniciar-sesion");
                          }
                        })
                      : userState?.user?.role === "admin" &&
                        Swal.fire({
                          title: "Error",
                          text: "Los administradores no pueden agregar productos al carrito",
                          icon: "error",
                          confirmButtonText: "Ok",
                        })
                  }
                >
                  Agregar al carrito
                </button>
              ) : (
                <Skeleton
                  width={window.innerWidth >= 768 ? 260 : 280}
                  height={40}
                />
              )}
            </div>
          </div>
        </form>
      </article>
      {productsCategory.length > 1 && (
        <article
          className={`container_similar ${
            themeState.theme === "dark" ? "container_similar-theme" : ""
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
