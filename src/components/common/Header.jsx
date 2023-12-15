import { BiMenu, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../helpers/userApi";
import { addUser } from "../../features/auth/usersSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const userState = useSelector((state) => state.users);
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

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
    if (token) {
      getUser(token).then((res) => {
        setUser(res.user);
        dispatch(addUser(res.user));
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header style={{ backgroundColor: location.pathname !== "/" && "#1e1e1e" }}>
      {!userState?.user?.name ||
        (!user?.name && (
          <div className="container_register">
            <>
              <Link to={"/usuario/iniciar-sesion"}>Iniciar sesión</Link>
              <h4>|</h4>
              <Link to={"/usuario/registrarse"}>Registrarse</Link>
            </>
          </div>
        ))}
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
            {(userState?.user?.name || user?.name) &&
              window.innerWidth < 700 && (
                <>
                  <picture
                    className="container_image-user"
                    onClick={() => {
                      sessionStorage.removeItem("token"),
                        window.location.reload();
                    }}
                  >
                    <img
                      src={userState?.user?.image || user?.image}
                      alt={userState?.user?.name || user?.name}
                    />
                  </picture>
                  {(userState?.user?.role === "admin" ||
                    user?.role === "admin") && (
                    <li>
                      <Link
                        to={
                          "/spicy/admin/usuario/administrador/agregar-producto"
                        }
                      >
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
            (userState?.user?.name || user?.name) && "user_register_active"
          }`}
        >
          {userState?.user?.name || user?.name ? (
            <>
              {(userState?.user?.role === "admin" ||
                user?.role === "admin") && (
                <>
                  <Link
                    to={"/spicy/admin/usuario/administrador/agregar-producto"}
                  >
                    Admin
                  </Link>
                  <h4>|</h4>
                </>
              )}
              <picture
                className="container_image-user"
                onClick={() => {
                  sessionStorage.removeItem("token"), window.location.reload();
                }}
              >
                <img
                  src={userState?.user?.image || user?.image}
                  alt={userState?.user?.name || user?.name}
                />
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
