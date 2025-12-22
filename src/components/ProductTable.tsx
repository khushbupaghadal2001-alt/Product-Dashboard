import { useEffect, useState } from "react";
import "../css/productTable.css";
import { useGetProducts } from "../hook/useProducts";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/DataTable";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductForm from "./ProductForm";

interface productType {
  name: string;
  category: string;
  price: number;
  stock: number;
  action: any; 
}
const ProductTable = () => {
  const [products, setProducts] = useState<productType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await useGetProducts()
      setProducts(response)
    }
    fetchProducts()
  }, [])
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
   const columns: ColumnDef<productType>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
      filterFn: "equalsString",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `₹ ${row.original.price}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      filterFn: (row, id, value) => {
        //@ts-ignore
        if (value === "in") return row.getValue(id) > 0
        if (value === "out") return row.getValue(id) === 0
        return true
      },
      cell: ({ row }) => (
        <span
          className={
            row.original.stock > 0
              ? "text-green-500 font-medium"
              : "text-red-500 font-medium"
          }
        >
          {row.original.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost">
            <FaRegEdit />
          </Button>
          <Button variant="ghost">
            <RiDeleteBinLine className="text-red-500" />
          </Button>
        </div>
      ),
    },
  ]
  return (
    <>
      <div className="flex justify-end mb-2.5">
        <Button variant={"outline"} onClick={() => setOpenModal(true)}>Add Product</Button>
      </div>
      <DataTable columns={columns} data={products} />
      {
        openModal && <ProductForm openModal={openModal} setOpenModal={setOpenModal} editData={editData} setEditData={setEditData} />
      }
    </>
  );
};

export default ProductTable;
