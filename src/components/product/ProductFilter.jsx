const ProductFilter = ({ title, isActive, handleFilterClick }) => {
  return (
    <p
      className={`filter ${isActive && "filter_active"}`}
      onClick={() => handleFilterClick(title)}
    >
      {title}
    </p>
  );
};

export default ProductFilter;
