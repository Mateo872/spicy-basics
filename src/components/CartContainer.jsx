import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../helpers/userApi";
import { editUser } from "../features/auth/usersSlice";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import { payment as paymentApi } from "../helpers/paymentApi";
import { useEffect } from "react";

const CartContainer = () => {
  const userState = useSelector((state) => state.users.user);
  const themeState = useSelector((state) => state.theme.theme);
  const loadingState = useSelector((state) => state.loading.loading);
  const productsState = useSelector((state) => state.products.products);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const emptyCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar estos productos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          id: userState?._id,
          name: userState?.name,
          email: userState?.email,
          password: userState?.password,
          image: userState?.image,
          role: userState?.role,
          state: userState?.state,
          favorites: userState?.favorites,
          cart: [],
          history: [],
        };
        Swal.fire("Vacío!", "El carrito fue vaciado", "success");
        updateUser(body, token);
        dispatch(editUser(body));
      }
    });
  };

  useEffect(() => {
    if (location.search && userState.name.length > 0) {
      const merchant_order_id = location.search.split("&")[6].split("=")[1];

      if (merchant_order_id !== "null") {
        const body = {
          id: userState?._id,
          name: userState?.name,
          email: userState?.email,
          password: userState?.password,
          image: userState?.image,
          role: userState?.role,
          state: userState?.state,
          favorites: userState?.favorites,
          cart: [],
          history: [
            ...userState.history,
            {
              date: new Date().toLocaleString(),
              products: userState.cart,
              totalPrice: userState.cart.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0
              ),
            },
          ],
        };
        updateUser(body, token).then((res) => {
          if (res.message === "El usuario fue editado correctamente") {
            dispatch(editUser(body));
            Swal.fire({
              icon: "success",
              title: "Compra realizada",
              text: "Gracias por tu compra!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un error al querer realizar la compra",
            });
          }
        });
      }
    }
  }, [location.search, userState.name.length]);

  const payment = (cart) => {
    const productsInCart = cart.map((item) => {
      const product = productsState.find((product) => product._id === item.id);
      return {
        id: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.price,
        image: product.imageOne,
        size: item.size,
      };
    });

    paymentApi(
      {
        items: productsInCart,
        userPayer: { name: userState.name, email: "mateo@gmail.com" },
      },
      token
    ).then((res) => {
      if (res.api_response.status === 201) {
        window.open(res.init_point, "_self");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al querer realizar la compra",
        });
      }
    });
  };

  return (
    <section
      className={`container_cart ${
        themeState === "dark" ? "container_cart-dark" : ""
      }`}
    >
      <article
        style={{
          marginTop: loadingState ? "-2rem" : "",
          height: loadingState ? "100vh" : "",
          display: loadingState ? "flex" : "",
          justifyContent: loadingState ? "center" : "",
          alignItems: loadingState ? "center" : "",
        }}
      >
        {!loadingState && (
          <>
            {userState && userState?.cart?.length > 0 && (
              <h1 className="title_cart">Spicy carrito</h1>
            )}
            <div className="container_cart-products">
              {userState && userState?.cart?.length > 0 ? (
                userState.cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))
              ) : (
                <div className="container_cart-empty">
                  <h3>No hay productos en el carrito</h3>
                  <GiShoppingBag />
                  <Link to={"/"}>Sumá productos</Link>
                </div>
              )}
            </div>
            {userState && userState?.cart?.length > 0 && (
              <div className="container_buttons">
                <button className="empty_button" onClick={() => emptyCart()}>
                  Vaciar carrito
                </button>
                <div className="container_total">
                  <h5>
                    Total:{" "}
                    <span>
                      {userState.cart
                        .reduce(
                          (acc, curr) => acc + curr.price * curr.quantity,
                          0
                        )
                        .toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                    </span>
                  </h5>
                  <button
                    className="buy_button"
                    onClick={() => {
                      payment(userState.cart);
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            )}
            {userState && userState?.cart?.length > 0 && (
              <div className="container_link-back">
                <Link className="link_back" to={"/"}>
                  <BsArrowLeft />
                  Volver a la tienda
                </Link>
              </div>
            )}
          </>
        )}
      </article>
    </section>
  );
};

export default CartContainer;
