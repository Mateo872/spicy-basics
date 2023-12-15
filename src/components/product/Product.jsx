import { BsFillHeartFill, BsPencilFill, BsTrash3Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const userState = useSelector((state) => state.users.user);
  const user = JSON.parse(sessionStorage.getItem("user")) || null;

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="product">
      <div className="product_image">
        {userState?.favorites?.includes(product?.id) &&
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
                to={`/usuario/administrador/editar-producto/${product?.id}`}
              >
                <BsPencilFill />
              </Link>
              <button>
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
          to={`/producto-detalle/name/${product?.id}`}
          onClick={handleLinkClick}
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Product;
