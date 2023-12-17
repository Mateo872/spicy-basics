import { BsFillHeartFill, BsPencilFill, BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import {
  deleteProductAdmin,
  getUsers,
  updateUserAdmin,
} from "../../helpers/userApi";
import { editUser } from "../../features/auth/usersSlice";
import Swal from "sweetalert2";
import { setUpdate } from "../../features/update/updateSlice";
import LazyLoad from "react-lazy-load";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../CardSkeleton";

const Product = ({ product }) => {
  const userState = useSelector((state) => state.users.user);
  const themeState = useSelector((state) => state.theme);
  const updateState = useSelector((state) => state.update.update);
  const loadingState = useSelector((state) => state.loading.loading);
  const token = sessionStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const user = { role: userState?.role };
  const [productDeleted, setProductDeleted] = useState(false);
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (token && productDeleted) {
      getUsers(token).then((res) => {
        setUsers(res.users);
        setProductDeleted(false);
      });
    }
  }, [productDeleted]);

  const handleDeleteProduct = (id) => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProductAdmin(id, token).then((res) => {
            if (res.message === "Producto borrado correctamente") {
              dispatch(deleteProduct(id));
              dispatch(setUpdate(!updateState));
              setProductDeleted(true);

              users.map((user) => {
                const newFavorites = user?.favorites?.filter(
                  (fav) => fav !== id
                );

                const body = {
                  id: user?.id,
                  name: user?.name,
                  email: user?.email,
                  password: user?.password,
                  image: user?.image,
                  role: user?.role,
                  state: user?.state,
                  favorites: newFavorites,
                  cart: [],
                  history: [],
                };
                updateUserAdmin(user._id, body, token).then((res) => {});
                dispatch(editUser(body));
              });
              Swal.fire(
                "¡Borrado!",
                "Producto borrado correctamente",
                "success"
              );
            } else {
              Swal.fire("¡Error!", res.message, "error");
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product">
      <div className="product_image">
        {userState?.favorites?.includes(product?._id) &&
          userState.role !== "admin" && (
            <div className="container_heart">
              <BsFillHeartFill />
            </div>
          )}
        {!loadingState ? (
          <LazyLoad offset={100}>
            <img src={product?.imageOne} alt={product?.name} />
          </LazyLoad>
        ) : (
          <Skeleton
            width={window.innerWidth >= 1440 ? 320 : 300}
            height={
              window.innerWidth < 768
                ? 130
                : window.innerWidth >= 768 && window.innerWidth < 1024
                ? 200
                : window.innerWidth >= 1024 && window.innerWidth < 1440
                ? 250
                : 300
            }
          />
        )}
        {(!loadingState && userState?.user?.role === "admin") ||
          (user?.role === "admin" && (
            <div className="container_actions">
              <Link
                to={`spicy/admin/usuario/administrador/editar-producto/${product?._id}`}
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
        <h3
          className={`product_title ${
            themeState.theme === "dark" && "product_title-theme"
          }`}
        >
          {product?.name}
        </h3>
        <h3
          className={`product_price ${
            themeState.theme === "dark" && "product_price-theme"
          }`}
        >
          ${parseInt(product?.price).toLocaleString("es-AR")}
        </h3>
        <Link
          to={`/producto-detalle/name/${product?._id}`}
          onClick={handleLinkClick}
          className={`${themeState.theme === "dark" && "product_link-theme"}`}
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Product;
