import { BsFillHeartFill, BsPencilFill, BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { getUser } from "../../helpers/userApi";
import { addUser } from "../../features/auth/usersSlice";

const Product = ({ product }) => {
  const userState = useSelector((state) => state.users.user);
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (token) {
      getUser(token).then((res) => {
        setUser(res.user);
        dispatch(addUser(res.user));
      });
    }
  }, []);

  return (
    <div className="product">
      <div className="product_image">
        {userState?.favorites?.includes(product?._id) &&
          userState.role !== "admin" && (
            <div className="container_heart">
              <BsFillHeartFill />
            </div>
          )}
        <img src={product?.imageOne} alt={product?.name} />
        {userState?.user?.role === "admin" ||
          (user?.role === "admin" && (
            <div className="container_actions">
              <Link
                to={`/usuario/administrador/editar-producto/${product?._id}`}
              >
                <BsPencilFill />
              </Link>
              <button onClick={() => handleDeleteProduct(product?._id)}>
                <BsTrash3Fill />
              </button>
            </div>
          ))}
      </div>
      <div className="product_features">
        <h3 className="product_title">{product?.name}</h3>
        <h3 className="product_price">
          ${parseInt(product?.price).toLocaleString("es-AR")}
        </h3>
        <Link
          to={`/producto-detalle/name/${product?._id}`}
          onClick={handleLinkClick}
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Product;
