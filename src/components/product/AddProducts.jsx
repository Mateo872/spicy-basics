import { useForm } from "react-hook-form";
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

const AddProducts = () => {
  const productsState = useSelector((state) => state.products.products);
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
  const [urls, setUrls] = useState([]);
  const [productEdit, setProductEdit] = useState([]);
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    if (id) {
      const product = productsState?.find((product) => product?._id === id);
      setProductEdit(product);

      if (product?.length !== 0) {
        setValue("id", product?._id);
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

  const onSubmit = async (data) => {
    try {
      if (!id) {
        const imageOne = await useConvertBlobToBase64(data.imageOne[0]);
        const imageTwo = await useConvertBlobToBase64(data.imageTwo[0]);
        const imageThree = await useConvertBlobToBase64(data.imageThree[0]);

        if (imageOne && imageTwo && imageThree) {
          const body = {
            name: data.name,
            price: data.price,
            imageOne,
            imageTwo,
            imageThree,
            description: data.description,
            category: data.category,
            stock: data.stock,
            sizes: data.sizes,
          };
          createProduct(body, token).then((res) => {
            if (res.status === 200) {
              dispatch(addProduct(res.product));
              Swal.fire({
                icon: "success",
                title: "Producto agregado correctamente",
                showConfirmButton: true,
              }).then((isConfirm) => {
                if (isConfirm.isConfirmed) {
                  navigate("/");
                }
              });
            }
          });
        }
      } else if (urls.length >= 3) {
        const images = [];
        if (image1) {
          const imageOne = await useConvertBlobToBase64(urlsEdit.image1);
          images.push(imageOne);
        } else {
          images.push(productEdit.imageOne);
        }
        if (image2) {
          const imageTwo = await useConvertBlobToBase64(urlsEdit.image2);
          images.push(imageTwo);
        } else {
          images.push(productEdit.imageTwo);
        }
        if (image3) {
          const imageThree = await useConvertBlobToBase64(urlsEdit.image3);
          images.push(imageThree);
        } else {
          images.push(productEdit.imageThree);
        }
        const body = {
          id: data.id,
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
        updateProduct(body, token, id).then((res) => {
          if (res.status === 200) {
            dispatch(editProduct(body));
            Swal.fire({
              icon: "success",
              title: "Producto editado correctamente",
              showConfirmButton: true,
            }).then((isConfirm) => {
              if (isConfirm.isConfirmed) {
                navigate("/");
              }
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <article className="container_form-product">
        <form
          className="container_addProduct"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
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
            name="price"
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
                onChange={(e) => {
                  setImage1(true),
                    setUrlsEdit({
                      ...urlsEdit,
                      image1: e.target.files[0],
                    });
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                name="imageOne"
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
                name="imageTwo"
                id="imageTwo"
                placeholder="Image One"
                style={{ marginBottom: errors.imageTwo && ".3rem" }}
                onChange={(e) => {
                  setImage2(true),
                    setUrlsEdit({
                      ...urlsEdit,
                      image2: e.target.files[0],
                    });
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                name="imageTwo"
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
                name="imageThree"
                id="imageThree"
                placeholder="Image One"
                style={{ marginBottom: errors.imageThree && ".3rem" }}
                onChange={(e) => {
                  setImage3(true),
                    setUrlsEdit({
                      ...urlsEdit,
                      image3: e.target.files[0],
                    });
                }}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                name="imageThree"
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
            name="description"
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
            name="category"
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
            name="stock"
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
                name="XS"
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
                name="S"
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
                name="M"
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
                name="L"
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
                name="XL"
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
          <button>Agregar producto</button>
        </form>
      </article>
    </section>
  );
};

export default AddProducts;
