import z from "zod";
import "../css/productForm.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

type Props = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    editData: any,
    setEditData: any
}
const taskSchema = z.object({
  productName: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  category: z.enum(["Electronics", "Clothing", "Grocery"]).optional(),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  stock: z.number().min(0, { message: "Stock must be a positive number" }),
})
type TaskFormData = z.infer<typeof taskSchema>;
const ProductForm = (props: Props) => {
  const {openModal, setOpenModal, editData, setEditData} = props
  const { register, handleSubmit, reset, formState: { errors }} = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      productName: "",
      category: "Electronics",
      price: 0,
      stock: 0
    }
  });
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-Header">
        <h3 className="heading">Add Task</h3>
        <button className="closeModal" onClick={() => setOpenModal(false)}>X</button>
      </div>
      <form>
        <div className="modal-body">
          <div className="inputField">
            <label htmlFor="name" className="labelText">Product Name <div className="fieldMandatory">*</div></label>
            <div className="fieldType">
              <input
                type="title"
                placeholder="Enter Product name"
                className="inputText"
                {...register("productName") }
              />
              {/* {errors?.title && <p className="errorMassage">{errors.title?.message}</p>} */}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="category" className="labelText">
              Category
            </label>
            <div className="fieldType">
              <select id="category" className="inputText" {...register("category")}>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Grocery">Grocery</option>
              </select>
              {/* {errors?.status && <p className="errorMassage">{errors?.status?.message }</p>} */}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="price" className="labelText">Price</label>
            <div className="fieldType">
              <input id="price" type="number" className="inputText" {...register("price")} />
              {/* {errors?.status && <p className="errorMassage">{errors?.status?.message }</p>} */}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="stock" className="labelText">Stock</label>
            <div className="fieldType">
              <input id="stock" type="number" className="inputText" {...register("stock")} />
              {/* {errors?.status && <p className="errorMassage">{errors?.status?.message }</p>} */}
            </div>
          </div>
        </div>

       <div className="flex justify-end">
            <Button className="submitButton" variant={"default"}>Submit</Button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default ProductForm;
