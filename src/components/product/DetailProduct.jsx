import image from "../../assets/images/imagen_card.png";
const DetailProduct = () => {
  return (
    <section className="container_detail">
      <article>
        <div className="container_pagination">
          <a href="#">inicio /</a>
          <h4>tops /</h4>
          <h4>
            <span> top black</span>
          </h4>
        </div>
        <h6>Stock - 30</h6>
        <div className="detail_product">
          <div className="detail_image">
            <img src={image} alt="" />
          </div>
          <div className="container_features">
            <div>
              <h2 className="detail_title">TOP BLACK</h2>
              <h2>$20.000</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, voluptatem, quidem, quos quas voluptatum.
            </p>
            <div>
              <h3>Tamaño</h3>
              <div className="container_size">
                <div className="size size_active">
                  <p>XS</p>
                </div>
                <div className="size">
                  <p>S</p>
                </div>
                <div className="size">
                  <p>M</p>
                </div>
                <div className="size">
                  <p>L</p>
                </div>
                <div className="size">
                  <p>XL</p>
                </div>
              </div>
            </div>
            <div className="container_color">
              <h3>Color</h3>
              <div className="color">
                <div className="color_item"></div>
                <div className="color_item"></div>
              </div>
            </div>
            <div className="quantity">
              <label htmlFor="quantity">Cantidad</label>
              <input id="quantity" type="number" placeholder="0" />
            </div>
            <button className="btn_add">Agregar al carrito</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default DetailProduct;
