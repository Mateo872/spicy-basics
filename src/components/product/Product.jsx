import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="product">
      <div className="product_image">
        <img src={product?.imageOne} alt={product?.name} />
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
