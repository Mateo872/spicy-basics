import { useSelector } from "react-redux";
import { ThemeState } from "../../types/types.themes";
import React from "react";

interface Prop {
  title: string;
  isActive: boolean;
  handleFilterClick: (title: string) => void;
}

const ProductFilter: React.FC<Prop> = ({
  title,
  isActive,
  handleFilterClick,
}) => {
  const themeState = useSelector((state: ThemeState) => state.theme);

  return (
    <p
      className={`filter ${isActive && "filter_active"} ${
        themeState.theme === "dark" && "theme_filter"
      } ${isActive && themeState.theme === "dark" && "theme_filter_active"}`}
      onClick={() => handleFilterClick(title)}
    >
      {title}
    </p>
  );
};

export default ProductFilter;
