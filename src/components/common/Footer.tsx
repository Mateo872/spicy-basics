import { useSelector } from "react-redux";
import { ThemeState } from "../../types/types.themes";

const Footer = () => {
  const themeState = useSelector((state: ThemeState) => state.theme);

  return (
    <footer className={`${themeState.theme === "dark" ? "footer_dark" : ""}`}>
      Derechos reservados &copy;
    </footer>
  );
};

export default Footer;
