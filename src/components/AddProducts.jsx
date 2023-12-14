import { useForm } from "react-hook-form";
import useConvertBlobToBase64 from "../hooks/useConvertBase64";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productsSlice";

const AddProducts = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const imageOne = await useConvertBlobToBase64(data.imageOne[0]);
    const imageTwo = await useConvertBlobToBase64(data.imageTwo[0]);
    const imageThree = await useConvertBlobToBase64(data.imageThree[0]);

    try {
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
      dispatch(
        addProduct({
          ...body,
          id: new Date().getTime().toString(),
        })
      );
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
          <input
            type="file"
            name="imageOne"
            id="imageOne"
            placeholder="Image One"
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
          <label htmlFor="imageTwo">Imágen secundaria</label>
          <input
            type="file"
            name="imageTwo"
            id="imageTwo"
            placeholder="Image Two"
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
          <label htmlFor="imageThree">Imágen secundaria</label>
          <input
            type="file"
            name="imageThree"
            id="imageThree"
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
