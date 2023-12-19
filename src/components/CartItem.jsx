import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartItem = ({ product }) => {
  const products = useSelector((state) => state.products.products);
  const productItem = products.find((item) => item?._id === product?.id);

  return (
    <div className="container_product-cart">
      {window.innerWidth >= 768 && (
        <div
          className="container_image"
          style={{ backgroundImage: `url(${productItem?.imageOne})` }}
        ></div>
      )}
      <div className="cart_features">
        <h6 className="title">Título</h6>
        <h6 className="subtitle" title={productItem?.name}>
          {productItem?.name}
        </h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Cantidad</h6>
        <h6 className="subtitle">{parseInt(product?.quantity)}</h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Precio</h6>
        <h6 className="subtitle">
          {parseInt(product?.price).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Subtotal</h6>
        <h6 className="subtitle">
          {parseInt(product?.price * product?.quantity).toLocaleString(
            "es-AR",
            {
              style: "currency",
              currency: "ARS",
            }
          )}
        </h6>
      </div>
      <div className="container_cart-trash">
        <BsTrash />
      </div>
    </div>
  );
};

export default CartItem;
