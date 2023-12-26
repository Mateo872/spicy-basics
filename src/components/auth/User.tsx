import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addUser, users } from "../../features/auth/usersSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useConvertBlobToBase64 from "../../hooks/useConvertBase64";
import { createUser, getUsers, login } from "../../helpers/userApi";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { ThemeState } from "../../types/types.themes";
import { Login, User as UserType } from "../../types/types.users";

interface Prop {
  email: string;
  name: string;
  picture: string;
}

interface Form extends UserType {
  confirmPassword: string;
}

const User = () => {
  const themeState = useSelector((state: ThemeState) => state.theme);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Form>();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
    reset();
  }, [location.pathname]);

  const decode = async (token: string) => {
    try {
      const userDecoded: Prop = jwtDecode(token);
      const body = {
        email: userDecoded.email,
      };

      const usersResponse = await getUsers();

      if (usersResponse) {
        const existingUser = usersResponse.find(
          (user) => user.email === body.email
        );
        if (existingUser) {
          const userSession = {
            state: existingUser.state,
          };

          if (userSession.state === false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El usuario se encuentra suspendido",
            });
          } else {
            const loginResponse = await login(body);

            if (loginResponse) {
              if (loginResponse.token) {
                sessionStorage.setItem("token", loginResponse.token);
                dispatch(
                  addUser({
                    ...existingUser,
                  })
                );

                Swal.fire({
                  icon: "success",
                  title: `Bienvenido de nuevo, ${existingUser.name}`,
                  text: "Ingreso exitoso",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/");
                  }
                });
              } else if (loginResponse.message) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: loginResponse.message,
                });
              }
            }
          }
        } else {
          createUser({
            name: userDecoded.name,
            email: userDecoded.email,
            image: userDecoded.picture,
            favorites: [],
            role: "user",
            state: true,
            cart: [],
            history: [],
            theme: "light",
          }).then((res) => {
            if (res) {
              if (res.name) {
                sessionStorage.setItem("token", token);
                dispatch(
                  users({
                    ...res,
                  })
                );
                Swal.fire({
                  icon: "success",
                  title: `Bienvenido, ${res.name}`,
                  text: "Ingreso exitoso",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/");
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: res.message,
                });
              }
            }
          });
        }
      }

      return userDecoded;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const submit = async (data: UserType) => {
    try {
      if (location.pathname === "/usuario/registrarse") {
        const image: any = await useConvertBlobToBase64(data.image[0]);
        const body = {
          name: data.name,
          email: data.email,
          password: data.password,
          image,
          favorites: [],
          role: "user",
          state: true,
          cart: [],
          history: [],
          theme: "light",
        };
        await createUser(body).then((res) => {
          if (res.name) {
            dispatch(
              users({
                ...body,
              })
            );
            Swal.fire({
              icon: "success",
              title: "Usuario creado con éxito",
              text: "Inicia sesión para continuar",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/usuario/iniciar-sesion");
                reset();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.message,
            });
          }
        });
      } else {
        login(data).then((res: Login | null) => {
          if (res?.token) {
            sessionStorage.setItem("token", res?.token);
            getUsers().then((res) => {
              res?.forEach((user) => {
                if (user.email === data.email) {
                  const userSession = {
                    state: user.state,
                  };
                  if (userSession.state === false) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "El usuario se encuentra suspendido",
                    });
                    sessionStorage.removeItem("token");
                  } else {
                    dispatch(
                      addUser({
                        ...user,
                      })
                    );
                    Swal.fire({
                      icon: "success",
                      title: "Bienvenido",
                      text: "Ingreso exitoso",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/");
                        reset();
                      }
                    });
                  }
                }
              });
            });
          } else if (res?.message) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res?.message,
            });
          }
        });
      }
      scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className={`section_user ${
        location.pathname === "/usuario/registrarse" ? "section_userCreate" : ""
      }`}
    >
      <article
        className={`container_user ${
          themeState.theme === "dark" ? "container_user-theme" : ""
        }`}
      >
        {(location.pathname === "/usuario/iniciar-sesion" && loginEmail) ||
        location.pathname === "/usuario/registrarse" ? (
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
                      style={{
                        marginBottom: errors.confirmPassword && ".3rem",
                      }}
                      {...register("confirmPassword", {
                        required: { value: true, message: "Campo requerido" },
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return (
                              password === value ||
                              "Las contraseñas no coinciden"
                            );
                          },
                        },
                      })}
                    />
                    {showConfirmPassword ? (
                      <BsEye
                        className={
                          errors?.confirmPassword && "icon_eye-confirm"
                        }
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <BsEyeSlashFill
                        className={
                          errors?.confirmPassword && "icon_eye-confirm"
                        }
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
        ) : (
          <div className="container_user-buttons">
            <GoogleLogin
              onSuccess={(res) => res.credential && decode(res.credential)}
            />
            <div className="container_separator">
              <div></div>
              <p>o</p>
              <div></div>
            </div>
            <button
              className="button_register button_email"
              onClick={() => setLoginEmail(true)}
            >
              Iniciar sesión con email
            </button>
          </div>
        )}
      </article>
    </section>
  );
};

export default User;
