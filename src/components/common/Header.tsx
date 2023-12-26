import { BiMenu, BiSolidMoon, BiSolidSun, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../helpers/userApi";
import { addUser } from "../../features/auth/usersSlice";
import { setTheme, setThemeHover } from "../../features/theme/themeSlice";
import { BsCartFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { UsersState } from "../../types/types.users";
import { ThemeState } from "../../types/types.themes";
import { LoadingState } from "../../types/types.loading";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const userState = useSelector((state: UsersState) => state.users);
  const themeState = useSelector((state: ThemeState) => state.theme);
  const loadingState = useSelector(
    (state: LoadingState) => state.loading.loading
  );

  const token = sessionStorage.getItem("token");
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
        if (res) {
          dispatch(addUser(res.user));
          dispatch(setTheme(res.user.theme));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const colorTheme =
    themeState.theme === "dark" && scroll
      ? "#1e1e1e"
      : themeState.theme === "dark" && location.pathname !== "/"
      ? "#1e1e1e"
      : "#fff";

  return (
    <>
      <header
        style={{
          backgroundColor:
            location.pathname === "/" && !scroll
              ? "transparent"
              : scroll && themeState.theme !== "dark"
              ? "#1e1e1e"
              : "#fff",
        }}
      >
        {!userState?.user?.name && !token && (
          <div
            className={`container_register ${
              themeState.theme === "dark" && "container_register-theme"
            }`}
          >
            <Link to={"/usuario/iniciar-sesion"}>Iniciar sesión</Link>
            <h4>|</h4>
            <Link to={"/usuario/registrarse"}>Registrarse</Link>
          </div>
        )}
        <nav
          className={`nav_container ${
            themeState.theme === "dark" && "nav_theme"
          }`}
          style={{
            backgroundColor:
              scroll && themeState.theme !== "dark"
                ? "#1e1e1e"
                : scroll && themeState.theme === "dark"
                ? "#fff"
                : location.pathname !== "/" && themeState.theme !== "dark"
                ? "#1e1e1e"
                : location.pathname !== "/" && themeState.theme === "dark"
                ? "#fff"
                : location.pathname === "/" && !scroll
                ? "transparent"
                : "transparent",
          }}
        >
          <Link
            className="container_logo"
            style={{
              color: colorTheme,
            }}
            to={"/"}
          >
            SPICY<span>BASICS</span>
          </Link>
          <div
            className={`menu_overlay ${showMenu && "overlay_active"}`}
            onClick={(e) =>
              e.target instanceof HTMLElement &&
              e.target.classList.contains("menu_overlay") &&
              menuVisible()
            }
          >
            <ul
              className={`container_menu ${showMenu && "menu_active"} ${
                themeState.theme === "dark" && "container_menu-theme"
              }`}
            >
              <BiX className="icon_close" onClick={menuVisible} />
              <li>
                <Link
                  style={{
                    color: window.innerWidth > 767 ? colorTheme : "",
                  }}
                  to={"/"}
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: window.innerWidth > 767 ? colorTheme : "",
                  }}
                  to={"/"}
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: window.innerWidth > 767 ? colorTheme : "",
                  }}
                  to={"/"}
                >
                  Contacto
                </Link>
              </li>
              {window.innerWidth < 700 && (
                <li
                  className="theme_icon"
                  onClick={() => {
                    themeState.theme === "dark"
                      ? dispatch(setTheme("light"))
                      : dispatch(setTheme("dark"));
                  }}
                  onMouseEnter={() => {
                    if (themeState.theme === "dark") {
                      dispatch(setThemeHover("light"));
                    } else {
                      dispatch(setThemeHover("dark"));
                    }
                  }}
                  onMouseLeave={() => {
                    dispatch(setThemeHover(themeState.theme));
                  }}
                >
                  {themeState.theme !== "dark" ? (
                    <BiSolidMoon />
                  ) : (
                    <BiSolidSun />
                  )}
                </li>
              )}
              {window.innerWidth < 700 && userState?.user?.name.length > 0 && (
                <li className="container_cart-icon">
                  <Link to={"/usuario/carrito"}>
                    <span className="badge">
                      {userState?.user?.cart.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </span>
                    <BsCartFill />
                  </Link>
                </li>
              )}
              {userState?.user?.name.length > 0 && window.innerWidth < 700 && (
                <>
                  <picture
                    className="container_image-user"
                    onClick={() => {
                      sessionStorage.removeItem("token"),
                        window.location.reload();
                      window.location.href = "/";
                    }}
                  >
                    <img
                      src={userState?.user?.image}
                      alt={userState?.user?.name}
                    />
                  </picture>
                  {userState?.user?.role === "admin" && (
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
          <BiMenu
            className="icon_menu"
            onClick={menuVisible}
            style={{
              color: colorTheme,
            }}
          />
          <div
            className={`user_register ${
              userState?.user?.name && "user_register_active"
            } ${
              themeState.theme === "dark" && location.pathname === "/" && scroll
                ? "user_theme"
                : themeState.theme === "dark" &&
                  location.pathname !== "/" &&
                  "user_theme"
            }`}
          >
            {!loadingState && (
              <>
                <li
                  className="theme_icon"
                  onClick={() => {
                    if (themeState.theme === "dark") {
                      dispatch(setTheme("light"));
                      if (token) {
                        const body = {
                          name: userState?.user?.name,
                          email: userState?.user?.email,
                          password: userState?.user?.password,
                          image: userState?.user?.image,
                          favorites: userState?.user?.favorites,
                          role: userState?.user?.role,
                          state: userState?.user?.state,
                          cart: userState?.user?.cart,
                          history: userState?.user?.history,
                          theme: "light",
                        };
                        updateUser(body, token);
                      }
                    } else {
                      dispatch(setTheme("dark"));
                      if (token) {
                        const body = {
                          name: userState?.user?.name,
                          email: userState?.user?.email,
                          password: userState?.user?.password,
                          image: userState?.user?.image,
                          favorites: userState?.user?.favorites,
                          role: userState?.user?.role,
                          state: userState?.user?.state,
                          cart: userState?.user?.cart,
                          history: userState?.user?.history,
                          theme: "dark",
                        };
                        updateUser(body, token);
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    if (themeState.theme === "dark") {
                      dispatch(setThemeHover("light"));
                    } else {
                      dispatch(setThemeHover("dark"));
                    }
                  }}
                  onMouseLeave={() => {
                    dispatch(setThemeHover(themeState.theme));
                  }}
                >
                  {themeState.theme !== "dark" ? (
                    <BiSolidMoon
                      style={{
                        color: colorTheme,
                      }}
                    />
                  ) : (
                    <BiSolidSun
                      style={{
                        color: colorTheme,
                      }}
                    />
                  )}
                </li>
                {userState?.user?.name.length > 0 && (
                  <li className="container_cart-icon">
                    <Link
                      to={"/usuario/carrito"}
                      style={{
                        color: colorTheme,
                      }}
                    >
                      <span className="badge">
                        {userState?.user?.cart.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </span>
                      <BsCartFill />
                    </Link>
                  </li>
                )}
              </>
            )}
            {userState?.user?.name ? (
              <>
                {userState?.user?.role === "admin" && (
                  <>
                    <Link
                      to={"/spicy/admin/usuario/administrador/agregar-producto"}
                    >
                      Admin
                    </Link>
                    <h4
                      style={{
                        color: colorTheme,
                      }}
                    >
                      |
                    </h4>
                  </>
                )}
                <picture
                  className="container_image-user"
                  onClick={() => {
                    sessionStorage.removeItem("token"),
                      window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  <img
                    src={userState?.user?.image}
                    alt={userState?.user?.name}
                  />
                </picture>
              </>
            ) : loadingState && token ? (
              <Skeleton height={40} width={40} />
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
      <div
        className={`container_theme ${themeState.theme === "dark" && "theme"}`}
      ></div>
    </>
  );
};

export default Header;
