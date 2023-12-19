import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../helpers/userApi";
import { editUser } from "../features/auth/usersSlice";
import Swal from "sweetalert2";

const CartContainer = () => {
  const themeState = useSelector((state) => state.theme.theme);
  const userState = useSelector((state) => state.users.user);
  const loadingState = useSelector((state) => state.loading.loading);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

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
        {!loadingState ? (
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
                  <button className="buy_button">Comprar</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="loader"></div>
        )}
      </article>
    </section>
  );
};

export default CartContainer;
