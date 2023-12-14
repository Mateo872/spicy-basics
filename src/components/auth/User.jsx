import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addUser, users } from "../../features/auth/usersSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [location.pathname]);

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const submit = async (data) => {
    try {
      if (location.pathname === "/usuario/registrarse") {
        const image = await convertBlobToBase64(data.image[0]);
        const body = {
          name: data.name,
          email: data.email,
          password: data.password,
          image,
        };
        dispatch(
          users({
            ...body,
            id: new Date().getTime().toString(),
          })
        );
        navigate("/usuario/iniciar-sesion");
        reset();
      } else {
        const user = userState.users.find((user) => user.email === data.email);
        if (!user) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no existe",
          });
        } else {
          if (user.password === data.password) {
            Swal.fire({
              icon: "success",
              title: "Bienvenido, " + user.name + "!",
              text: "Iniciaste sesión correctamente",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(addUser(user));
                navigate("/");
                reset();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Contraseña incorrecta",
            });
          }
        }
      }
      scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className={`section_user ${
        location.pathname === "/usuario/registrarse" && "section_userCreate"
      }`}
    >
      <article className="container_user">
        <div className="user">
          <h4>SPICYBASICS</h4>
          <h2>
            {location.pathname === "/usuario/iniciar-sesion"
              ? "Iniciar sesión"
              : "Registrarse"}
          </h2>
          <form onSubmit={handleSubmit(submit)}>
            {location.pathname === "/usuario/registrarse" && (
              <>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  id="name"
                  style={{ marginBottom: errors.name && ".3rem" }}
                  {...register("name", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "Máximo 20 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                      message: "Solo letras",
                    },
                  })}
                />
              </>
            )}
            {errors.name && (
              <span className="text_error">{errors.name.message}</span>
            )}
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              placeholder="Tu correo"
              id="email"
              style={{ marginBottom: errors.email && ".3rem" }}
              {...register("email", {
                required: { value: true, message: "Campo requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text_error">{errors.email.message}</span>
            )}
            {location.pathname === "/usuario/registrarse" && (
              <>
                <label htmlFor="image">Imágen</label>
                <input
                  className="input_image"
                  type="file"
                  id="image"
                  style={{ marginBottom: errors.image && ".3rem" }}
                  {...register("image", {
                    required: { value: true, message: "Campo requerido" },
                  })}
                />
              </>
            )}
            {errors.image && (
              <span className="text_error">{errors.image.message}</span>
            )}
            <label htmlFor="password">Contraseña</label>
            <div className="container_password">
              <input
                type={!showPassword ? "password" : "text"}
                placeholder="Tu contraseña"
                id="password"
                style={{ marginBottom: errors.password && ".3rem" }}
                {...register("password", {
                  required: { value: true, message: "Campo requerido" },
                  minLength: {
                    value: 8,
                    message: "Mínimo 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      "Debe contener al menos una mayúscula, una minúscula y un número",
                  },
                })}
              />
              {showPassword ? (
                <BsEye
                  className={errors?.password && "icon_eye"}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <BsEyeSlashFill
                  className={errors?.password && "icon_eye"}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {errors.password && (
              <span className="text_error">{errors.password.message}</span>
            )}
            {location.pathname === "/usuario/registrarse" && (
              <>
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <div className="container_password">
                  <input
                    type={!showConfirmPassword ? "password" : "text"}
                    placeholder="Confirma tu contraseña"
                    id="confirmPassword"
                    style={{ marginBottom: errors.confirmPassword && ".3rem" }}
                    {...register("confirmPassword", {
                      required: { value: true, message: "Campo requerido" },
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || "Las contraseñas no coinciden"
                          );
                        },
                      },
                    })}
                  />
                  {showConfirmPassword ? (
                    <BsEye
                      className={errors?.confirmPassword && "icon_eye-confirm"}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <BsEyeSlashFill
                      className={errors?.confirmPassword && "icon_eye-confirm"}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <span className="text_error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </>
            )}
            <button>
              {location.pathname === "/usuario/iniciar-sesion"
                ? "Inicia sesión"
                : "Crear una cuenta"}
            </button>
            <div className="user_create">
              {location.pathname === "/usuario/iniciar-sesion" ? (
                <p>
                  ¿No tenés cuenta?{" "}
                  <Link className="user_link" to={"/usuario/registrarse"}>
                    Registrate
                  </Link>
                </p>
              ) : (
                <p>
                  ¿Ya tenés cuenta?{" "}
                  <Link className="user_link" to={"/usuario/iniciar-sesion"}>
                    Inicia sesión
                  </Link>
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
