import { Link } from "react-router-dom";
import image from "../../assets/images/imagen_card.png";
const Product = () => {
  return (
    <div className="product">
      <div className="product_image">
        <img src={image} alt="Producto" />
      </div>
      <div className="product_features">
        <h3 className="product_title">Vestido de gasa con escote en V</h3>
        <h3 className="product_price">$2000</h3>
        <Link to={"/producto-detalle/name/2"}>Ver más</Link>
      </div>
    </div>
  );
};

export default Product;
