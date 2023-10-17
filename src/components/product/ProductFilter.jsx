const ProductFilter = ({ title, isActive }) => {
  return (
    <>
      <p className={`filter ${isActive && "filter_active"}`}>{title}</p>
    </>
  );
};

export default ProductFilter;
