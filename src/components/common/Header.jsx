import { BiMenu, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);

  const menuVisible = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    if (window.scrollY >= 1) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <div className="container_register">
        <a href="">Iniciar sesión</a>
        <h4>|</h4>
        <a href="">Registrarse</a>
      </div>
      <nav
        className={`nav_container ${!scroll && "margin"} ${
          location.pathname !== "/" && "mt-0"
        }`}
        style={{
          backgroundColor: scroll
            ? "#1e1e1e"
            : location.pathname !== "/"
            ? "#1e1e1e"
            : "transparent",
        }}
      >
        <a href="" className="container_logo">
          SPICY<span>BASICS</span>
        </a>
        <div
          className={`menu_overlay ${showMenu && "overlay_active"}`}
          onClick={(e) =>
            e.target.classList.contains("menu_overlay") && menuVisible()
          }
        >
          <ul className={`container_menu ${showMenu && "menu_active"}`}>
            <BiX className="icon_close" onClick={menuVisible} />
            <li>
              <a href="">Productos</a>
            </li>
            <li>
              <a href="">Ofertas</a>
            </li>
            <li>
              <a href="">Contacto</a>
            </li>
          </ul>
        </div>
        <BiMenu className="icon_menu" onClick={menuVisible} />
        <div className="user_register">
          <a href="">Iniciar sesión</a>
          <h4>|</h4>
          <a href="">Registrarse</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
