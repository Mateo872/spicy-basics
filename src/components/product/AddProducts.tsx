import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useConvertBlobToBase64 from "../../hooks/useConvertBase64";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../features/products/productsSlice";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  createProduct,
  editProduct as updateProduct,
} from "../../helpers/productsApi";
import Swal from "sweetalert2";
import { setUpdate } from "../../features/update/updateSlice";
import { PRODUCT_CREATE, ProductsState } from "../../types/types.products";
import { ThemeState } from "../../types/types.themes";
import { UpdateState } from "../../types/types.update";

type FormValues = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  sizes: string[];
  imageOne: string;
  imageTwo: string;
  imageThree: string;
};

const AddProducts = () => {
  const productsState = useSelector(
    (state: ProductsState) => state.products.products
  );
  const themeState = useSelector((state: ThemeState) => state.theme);
  const updateState = useSelector((state: UpdateState) => state.update.update);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [urlsEdit, setUrlsEdit] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [productEdit, setProductEdit] = useState<any>([]);
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      const product = productsState?.find((product) => product?._id === id);
      product && setProductEdit(product);

      if (product && product?.length !== 0) {
        setValue("_id", product?._id);
        setValue("name", product?.name);
        setValue("price", product?.price);
        setValue("imageOne", product?.imageOne);
        setValue("imageTwo", product?.imageTwo);
        setValue("imageThree", product?.imageThree);
        setUrls([product?.imageOne, product?.imageTwo, product?.imageThree]);
        setValue("description", product?.description);
        setValue("category", product?.category);
        setValue("stock", product?.stock);
        setValue("sizes", product?.sizes);
      }
    }
  }, []);

  function compressBase64Image(base64String: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = (800 / img.width) * img.height;

        ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);

        resolve(compressedBase64);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const product = productsState?.find(
      (product) => product?.name.toLowerCase() === data.name.toLowerCase()
    );

    try {
      if (!id) {
        if (
          data.imageOne[0].type !== "image/jpeg" &&
          data.imageOne[0].type !== "image/png" &&
          data.imageOne[0].type !== "image/jpg"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La imágen principal debe ser un archivo de tipo .jpg, .jpeg o .png",
          });
          return;
        }

        if (
          data.imageTwo[0].type !== "image/jpeg" &&
          data.imageTwo[0].type !== "image/png" &&
          data.imageTwo[0].type !== "image/jpg"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La imágen secundaria debe ser un archivo de tipo .jpg, .jpeg o .png",
          });
          return;
        }

        if (
          data.imageThree[0].type !== "image/jpeg" &&
          data.imageThree[0].type !== "image/png" &&
          data.imageThree[0].type !== "image/jpg"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La imágen terciaria debe ser un archivo de tipo .jpg, .jpeg o .png",
          });
          return;
        }

        const imageOne = (await useConvertBlobToBase64(
          data.imageOne[0]
        )) as string;
        const imageTwo = (await useConvertBlobToBase64(
          data.imageTwo[0]
        )) as string;
        const imageThree = (await useConvertBlobToBase64(
          data.imageThree[0]
        )) as string;

        const compressImageOne = (await compressBase64Image(
          imageOne
        )) as string;
        const compressImageTwo = (await compressBase64Image(
          imageTwo
        )) as string;
        const compressImageThree = (await compressBase64Image(
          imageThree
        )) as string;

        if (imageOne && imageTwo && imageThree && token) {
          const body = {
            name: data.name,
            price: data.price,
            imageOne: compressImageOne,
            imageTwo: compressImageTwo,
            imageThree: compressImageThree,
            description: data.description,
            category: data.category,
            stock: data.stock,
            sizes: data.sizes,
          };
          if (product) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El producto ya existe",
            });
          } else {
            createProduct(body, token).then((res) => {
              if (res && res.message === PRODUCT_CREATE.CREATED) {
                dispatch(addProduct(res.product));
                dispatch(setUpdate(!updateState));
                Swal.fire({
                  icon: "success",
                  title: "Producto agregado correctamente",
                  showConfirmButton: true,
                }).then((isConfirm) => {
                  if (isConfirm.isConfirmed) {
                    navigate("/");
                  } else {
                    navigate("/");
                  }
                });
              }
            });
          }
        }
      } else if (urls.length >= 3) {
        const images = [];

        if (image1) {
          const imageOne: any =
            urlsEdit.image1.type === "image/jpeg" ||
            urlsEdit.image1.type === "image/png" ||
            urlsEdit.image1.type === "image/jpg"
              ? await useConvertBlobToBase64(urlsEdit.image1)
              : Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "La imágen principal debe ser un archivo de tipo .jpg, .jpeg o .png",
                });
          const compressImageOne = await compressBase64Image(imageOne);
          images.push(compressImageOne);
        } else {
          images.push(productEdit.imageOne);
        }
        if (image2) {
          const imageTwo: any =
            urlsEdit.image2.type === "image/jpeg" ||
            urlsEdit.image2.type === "image/png" ||
            urlsEdit.image2.type === "image/jpg"
              ? await useConvertBlobToBase64(urlsEdit.image2)
              : Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "La imágen secundaria debe ser un archivo de tipo .jpg, .jpeg o .png",
                });
          const compressImageTwo = await compressBase64Image(imageTwo);
          images.push(compressImageTwo);
        } else {
          images.push(productEdit.imageTwo);
        }
        if (image3) {
          const imageThree: any =
            urlsEdit.image3.type === "image/jpeg" ||
            urlsEdit.image3.type === "image/png" ||
            urlsEdit.image3.type === "image/jpg"
              ? await useConvertBlobToBase64(urlsEdit.image3)
              : Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "La imágen terciaria debe ser un archivo de tipo .jpg, .jpeg o .png",
                });
          const compressImageThree = await compressBase64Image(imageThree);
          images.push(compressImageThree);
        } else {
          images.push(productEdit.imageThree);
        }

        const body = {
          _id: data._id,
          name: data.name,
          price: data.price,
          imageOne: images[0],
          imageTwo: images[1],
          imageThree: images[2],
          description: data.description,
          category: data.category,
          stock: data.stock,
          sizes: data.sizes,
        };

        const exist = productsState?.find(
          (product) =>
            product?.name.toLowerCase() === data.name.toLowerCase() &&
            product?._id !== data._id
        );

        if (exist) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre del producto ya existe",
          });
        } else {
          if (token) {
            updateProduct(body, token, id).then((res) => {
              if (res && res.status === 200) {
                dispatch(editProduct(body));
                dispatch(setUpdate(!updateState));
                Swal.fire({
                  icon: "success",
                  title: "Producto editado correctamente",
                  showConfirmButton: true,
                }).then((isConfirm) => {
                  if (isConfirm.isConfirmed) {
                    navigate("/");
                  } else {
                    navigate("/");
                  }
                });
              }
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <article className="container_form-product">
        <form
          className={`container_addProduct ${
            themeState.theme === "dark" && "container_addProduct-theme"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            style={{ marginBottom: errors.name && ".3rem" }}
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors?.name?.message && (
            <span className="text_error">{errors.name.message}</span>
          )}
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            style={{ marginBottom: errors.price && ".3rem" }}
            {...register("price", {
              required: {
                value: true,
                message: "El precio es requerido",
              },
              minLength: {
                value: 0,
                message: "El precio debe ser mayor o igual a 0",
              },
            })}
          />
          {errors?.price?.message && (
            <span className="text_error">{errors.price.message}</span>
          )}
          <label htmlFor="imageOne">Imágen principal</label>
          {id && getValues("imageOne") ? (
            <>
              <img
                src={getValues("imageOne")}
                alt="Imágen principal"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                name="imageOne"
                id="imageOne"
                placeholder="Image One"
                style={{ marginBottom: errors.imageOne && ".3rem" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (
                    e.target.files &&
                    e.target.files[0].type !== "image/jpeg" &&
                    e.target.files[0].type !== "image/png" &&
                    e.target.files[0].type !== "image/jpg"
                  ) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "La imágen principal debe ser un archivo de tipo .jpg, .jpeg o .png",
                    });
                    e.target.value = "";
                  } else {
                    setImage1(true),
                      setUrlsEdit({
                        ...urlsEdit,
                        image1: e.target.files[0],
                      });
                  }
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                id="imageOne"
                placeholder="Image One"
                onChange={(e) => {
                  setUrls([...urls, e.target.files[0]]);
                }}
                style={{ marginBottom: errors.imageOne && ".3rem" }}
                {...register("imageOne", {
                  required: {
                    value: true,
                    message: "La imágen es requerida",
                  },
                })}
              />
              {errors?.imageOne?.message && (
                <span className="text_error">{errors.imageOne.message}</span>
              )}
            </>
          )}

          <label htmlFor="imageTwo">Imágen secundaria</label>
          {id && getValues("imageTwo") ? (
            <>
              <img
                src={getValues("imageTwo")}
                alt="Imágen secundaria"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                id="imageTwo"
                placeholder="Image One"
                style={{ marginBottom: errors.imageTwo && ".3rem" }}
                onChange={(e) => {
                  if (e.target.files) {
                    if (
                      e.target.files[0].type !== "image/jpeg" &&
                      e.target.files[0].type !== "image/png" &&
                      e.target.files[0].type !== "image/jpg"
                    ) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La imágen secundaria debe ser un archivo de tipo .jpg, .jpeg o .png",
                      });
                      e.target.value = "";
                    } else {
                      setImage2(true),
                        setUrlsEdit({
                          ...urlsEdit,
                          image2: e.target.files[0],
                        });
                    }
                  }
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                id="imageTwo"
                placeholder="Image Two"
                onChange={(e) => {
                  setUrls([...urls, e.target.files[0]]);
                }}
                style={{ marginBottom: errors.imageTwo && ".3rem" }}
                {...register("imageTwo", {
                  required: {
                    value: true,
                    message: "La imágen es requerida",
                  },
                })}
              />
              {errors?.imageTwo?.message && (
                <span className="text_error">{errors.imageTwo.message}</span>
              )}
            </>
          )}
          <label htmlFor="imageThree">Imágen secundaria</label>
          {id && getValues("imageThree") ? (
            <>
              <img
                src={getValues("imageThree")}
                alt="Imágen terciaria"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                id="imageThree"
                placeholder="Image One"
                style={{ marginBottom: errors.imageThree && ".3rem" }}
                onChange={(e) => {
                  if (e.target.files) {
                    if (
                      e.target.files[0].type !== "image/jpeg" &&
                      e.target.files[0].type !== "image/png" &&
                      e.target.files[0].type !== "image/jpg"
                    ) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La imágen terciaria debe ser un archivo de tipo .jpg, .jpeg o .png",
                      });
                      e.target.value = "";
                    } else {
                      setImage3(true),
                        setUrlsEdit({
                          ...urlsEdit,
                          image3: e.target.files[0],
                        });
                    }
                  }
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                id="imageThree"
                onChange={(e) => {
                  setUrls([...urls, e.target.files[0]]);
                }}
                placeholder="Image Three"
                style={{ marginBottom: errors.imageThree && ".3rem" }}
                {...register("imageThree", {
                  required: {
                    value: true,
                    message: "La imágen es requerida",
                  },
                })}
              />
              {errors?.imageThree?.message && (
                <span className="text_error">{errors.imageThree.message}</span>
              )}
            </>
          )}
          <label htmlFor="description">Descripción</label>
          <input
            id="description"
            placeholder="Description"
            style={{ marginBottom: errors.description && ".3rem" }}
            {...register("description", {
              required: {
                value: true,
                message: "La descripción es requerida",
              },
              minLength: {
                value: 10,
                message: "La descripción debe tener al menos 10 caracteres",
              },
            })}
          />
          {errors?.description?.message && (
            <span className="text_error">{errors.description.message}</span>
          )}
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            style={{ marginBottom: errors.category && ".3rem" }}
            {...register("category", {
              required: {
                value: true,
                message: "La categoría es requerida",
              },
            })}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Conjuntos">Conjuntos</option>
            <option value="Vestidos">Vestidos</option>
            <option value="Polleras">Polleras</option>
            <option value="Corset">Corset</option>
            <option value="Tops">Tops</option>
            <option value="Remeras">Remeras</option>
          </select>
          {errors?.category?.message && (
            <span className="text_error">{errors.category.message}</span>
          )}
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            placeholder="Stock"
            style={{ marginBottom: errors.stock && ".3rem" }}
            {...register("stock", {
              required: {
                value: true,
                message: "El stock es requerido",
              },
              minLength: {
                value: 0,
                message: "El stock debe ser mayor o igual a 0",
              },
            })}
          />
          {errors?.stock?.message && (
            <span className="text_error">{errors.stock.message}</span>
          )}
          <div className="container_check">
            <label className="label_check">
              <input
                type="checkbox"
                value="XS"
                {...register("sizes", {
                  required: {
                    value: true,
                    message: "Debe seleccionar al menos una talla",
                  },
                })}
              />
              XS
            </label>
            <label className="label_check">
              <input
                type="checkbox"
                value="S"
                {...register("sizes", {
                  required: {
                    value: true,
                    message: "Debe seleccionar al menos una talla",
                  },
                })}
              />
              S
            </label>
            <label className="label_check">
              <input
                type="checkbox"
                value="M"
                {...register("sizes", {
                  required: {
                    value: true,
                    message: "Debe seleccionar al menos una talla",
                  },
                })}
              />
              M
            </label>
            <label className="label_check">
              <input
                type="checkbox"
                value="L"
                {...register("sizes", {
                  required: {
                    value: true,
                    message: "Debe seleccionar al menos una talla",
                  },
                })}
              />
              L
            </label>
            <label className="label_check">
              <input
                type="checkbox"
                value="XL"
                {...register("sizes", {
                  required: {
                    value: true,
                    message: "Debe seleccionar al menos una talla",
                  },
                })}
              />
              XL
            </label>
          </div>
          {errors?.sizes?.message && (
            <span className="text_error">{errors.sizes.message}</span>
          )}
          <button>{id ? "Editar producto" : "Agregar producto"}</button>
        </form>
      </article>
    </section>
  );
};

export default AddProducts;
