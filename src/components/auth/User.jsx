import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <article className="container_user">
        <div className="user">
          <h4>SPICYBASICS</h4>
          <h2>
            {location.pathname === "/usuario/iniciar-sesion"
              ? "Iniciar sesión"
              : "Registrarse"}
          </h2>
          <form>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" placeholder="Tu correo" id="email" />
            <label htmlFor="password">Contraseña</label>
            <div className="container_password">
              <input
                type={!showPassword ? "password" : "text"}
                placeholder="Tu contraseña"
                id="password"
              />
              <BsEye onClick={() => setShowPassword(!showPassword)} />
            </div>
            <button>
              {location.pathname === "/usuario/iniciar-sesion"
                ? "Inicia sesión"
                : "Crear una cuenta"}
            </button>
            <div className="user_create">
              {location.pathname === "/usuario/iniciar-sesion" ? (
                <p>
                  ¿No tenés cuenta?{" "}
                  <Link to={"/usuario/registrarse"}>Registrate</Link>
                </p>
              ) : (
                <p>
                  ¿Ya tenés cuenta?{" "}
                  <Link to={"/usuario/iniciar-sesion"}>Inicia sesión</Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default User;
