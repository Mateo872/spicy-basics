import { useSelector } from "react-redux";

const ProductFilter = ({ title, isActive, handleFilterClick }) => {
  const themeState = useSelector((state) => state.theme.theme);

  return (
    <p
      className={`filter ${isActive && "filter_active"} ${
        themeState === "dark" && "theme_filter"
      } ${isActive && themeState === "dark" && "theme_filter_active"}`}
      onClick={() => handleFilterClick(title)}
    >
      {title}
    </p>
  );
};

export default ProductFilter;
