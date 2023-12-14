import { BiMenu, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const userState = useSelector((state) => state.users);
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
    <header style={{ backgroundColor: location.pathname !== "/" && "#1e1e1e" }}>
      {!userState?.user?.name && (
        <div className="container_register">
          <>
            <Link to={"/usuario/iniciar-sesion"}>Iniciar sesión</Link>
            <h4>|</h4>
            <Link to={"/usuario/registrarse"}>Registrarse</Link>
          </>
        </div>
      )}
      <nav
        className={`nav_container ${scroll ? "mt-0" : "margen"} ${
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
        <Link to={"/"} className="container_logo">
          SPICY<span>BASICS</span>
        </Link>
        <div
          className={`menu_overlay ${showMenu && "overlay_active"}`}
          onClick={(e) =>
            e.target.classList.contains("menu_overlay") && menuVisible()
          }
        >
          <ul className={`container_menu ${showMenu && "menu_active"}`}>
            <BiX className="icon_close" onClick={menuVisible} />
            <li>
              <Link>Productos</Link>
            </li>
            <li>
              <Link>Ofertas</Link>
            </li>
            <li>
              <Link>Contacto</Link>
            </li>
            {userState?.user?.name && window.innerWidth < 700 && (
              <>
                <picture className="container_image-user">
                  <img
                    src={userState?.user?.image}
                    alt={userState?.user?.name}
                  />
                </picture>
                {userState?.user?.role === "admin" && (
                  <li>
                    <Link to={"/usuario/administrador/agregar-producto"}>
                      Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <BiMenu className="icon_menu" onClick={menuVisible} />
        <div
          className={`user_register ${
            userState?.user?.name && "user_register_active"
          }`}
        >
          {userState?.user?.name ? (
            <>
              {userState?.user?.role === "admin" && (
                <>
                  <Link to={"/usuario/administrador/agregar-producto"}>
                    Admin
                  </Link>
                  <h4>|</h4>
                </>
              )}
              <picture className="container_image-user">
                <img src={userState?.user?.image} alt={userState?.user?.name} />
              </picture>
            </>
          ) : (
            <>
              <Link to={"/usuario/iniciar-sesion"}>Iniciar sesión</Link>
              <h4>|</h4>
              <Link to={"/usuario/registrarse"}>Registrarse</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
