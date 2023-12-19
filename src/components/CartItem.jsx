import { BsTrash } from "react-icons/bs";

const CartItem = () => {
  const image = "https://via.placeholder.com/150";
  const name = "Nombre del ";
  const quantity = 2;
  const price = 200;

  return (
    <div className="container_product-cart">
      <div
        className="container_image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="cart_features">
        <h6 className="title">Título</h6>
        <h6 className="subtitle" title={name}>
          {name}
        </h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Cantidad</h6>
        <h6 className="subtitle">{quantity}</h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Precio</h6>
        <h6 className="subtitle">${price}</h6>
      </div>
      <div className="cart_features">
        <h6 className="title">Subtotal</h6>
        <h6 className="subtitle">${price * quantity}</h6>
      </div>
      <div className="container_cart-trash">
        <BsTrash />
      </div>
    </div>
  );
};

export default CartItem;
