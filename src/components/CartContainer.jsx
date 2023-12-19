import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartContainer = () => {
  const themeState = useSelector((state) => state.theme.theme);

  return (
    <section
      className={`container_cart ${
        themeState === "dark" ? "container_cart-dark" : ""
      }`}
    >
      <article className="">
        <h1 className="title_cart">Spicy carrito</h1>
        <div className="container_cart-products">
          <CartItem />
          <CartItem />
          <CartItem />
          {/* <div className="container_cart-empty">
            <h3>No hay productos en el carrito</h3>
            <GiShoppingBag />
            <Link to={"/"}>Sumá productos</Link>
          </div> */}
        </div>
        <div className="container_buttons">
          <button className="empty_button">Vaciar carrito</button>
          <div className="container_total">
            <h5>
              Total: $<span>200</span>
            </h5>
            <button className="buy_button">Comprar</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CartContainer;
