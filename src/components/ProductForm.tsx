import z from "zod";
import "../css/productForm.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useCreateProduct, useUpdateProduct } from "@/hook/useProducts";
import { useEffect } from "react";

type Props = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    editData: any,
    setEditData: any,
    refreshProducts: () => void
}
const productSchema = z.object({
  name: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  category: z.enum(["Electronics", "Clothing", "Grocery"]).optional(),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  stock: z.number().min(0, { message: "Stock must be a positive number" }),
})
type ProductFormData = z.infer<typeof productSchema>;
const ProductForm = (props: Props) => {
  const { setOpenModal, editData, refreshProducts, setEditData} = props
  const { register, handleSubmit, reset, formState: { errors }} = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "Electronics",
      price: 0,
      stock: 0 
    }
  });
  console.log("🚀 ~ ProductForm ~ errors:", errors)
  useEffect(() =>{
    if(editData.id){
      reset({
        name: editData.name,
        category: editData.category,
        price: editData.price,
        stock: editData.stock
      })
    }
    else{
      reset({
        name: "",
        category: "Electronics",
        price: 0,
        stock: 0
      })
    }
  },[editData , reset])

  const onSubmit = async (data : ProductFormData) =>{
    console.log("🚀 ~ onSubmit ~ data:", data)
    if(editData.id){
      console.log("editData")
      await useUpdateProduct(editData.id, data);
    }
    else{
      console.log('addData')
      await useCreateProduct(data);
    }
    refreshProducts()
    reset();
    setEditData({});
    setOpenModal(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-Header">
        <h3 className="heading">Add Task</h3>
        <button className="closeModal" onClick={() => setOpenModal(false)}>X</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="inputField">
            <label htmlFor="name" className="labelText">Product Name <div className="fieldMandatory">*</div></label>
            <div className="fieldType">
              <input
                type="title"
                placeholder="Enter Product name"
                className="inputText"
                {...register("name") }
              />
              {errors?.name && <p className="errorMassage">{errors.name?.message}</p>}
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
              {errors?.category && <p className="errorMassage">{errors?.category?.message }</p>}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="price" className="labelText">Price</label>
            <div className="fieldType">
              <input id="price" type="number" className="inputText" {...register("price" , {valueAsNumber: true})} />
              {errors?.price && <p className="errorMassage">{errors?.price?.message }</p>}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="stock" className="labelText">Stock</label>
            <div className="fieldType">
            <input id="stock" type="number" className="inputText" {...register("stock" , {valueAsNumber: true})} />
              {errors?.stock && <p className="errorMassage">{errors?.stock?.message }</p>}
            </div>
          </div>
        </div>

       <div className="flex justify-end">
            <Button className="submitButton" variant={"default"} >Submit</Button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default ProductForm;
