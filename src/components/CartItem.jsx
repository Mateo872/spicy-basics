import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../features/auth/usersSlice";
import Swal from "sweetalert2";
import { updateUser } from "../helpers/userApi";

const CartItem = ({ product }) => {
  const products = useSelector((state) => state.products.products);
  const productItem = products.find((item) => item?._id === product?.id);
  const userState = useSelector((state) => state.users.user);
  //   const [productQuantity, setProductQuantity] = useState(product?.quantity);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    const newCart = userState.cart.filter((item) => item.id !== id);
    // if (product.quantity > 1) { }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
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
          favorites: [...userState?.favorites, id],
          cart: newCart,
          history: [],
        };
        Swal.fire("Borrado!", "El producto fue eliminado", "success");
        updateUser(body, token);
        dispatch(editUser(body));
      }
    });
  };

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
        <BsTrash onClick={() => deleteProduct(product?.id)} />
      </div>
    </div>
  );
};

export default CartItem;
