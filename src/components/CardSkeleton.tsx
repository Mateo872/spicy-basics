import Skeleton from "react-loading-skeleton";

const CardSkeleton = ({ products }: { products: number }) => {
  return Array(products)
    .fill(0)
    .map((_, index) => (
      <div className="product" key={index}>
        <div className="product_image">
          <Skeleton height={window.innerWidth < 768 ? 110 : 230} />
        </div>
        <div className="product_features">
          <h3 className="product_title">
            <Skeleton />
          </h3>
          <h3 className="product_price">
            <Skeleton />
          </h3>
          <Skeleton />
        </div>
      </div>
    ));
};

export default CardSkeleton;
