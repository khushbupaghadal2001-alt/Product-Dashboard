import { useEffect, useState } from "react";
import "../css/productTable.css";
import { useDeleteProduct, useGetProducts } from "../hook/useProducts";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/DataTable";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductForm from "./ProductForm";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";

interface productType {
  name: string;
  category: string;
  price: number;
  stock: number;
  action: any; 
}
const ProductTable = () => {
  const [products, setProducts] = useState<productType[]>([])
  const fetchProducts = async (value = "") => {
      const response = await useGetProducts(value)
      setProducts(response)
    }
  useEffect(() => {
    fetchProducts()
  }, [])
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleUpdate = (data: any) => {
    setEditData(data);
    setOpenModal(true);
  }
  const handleDelete = async (data: any) => {
    await useDeleteProduct(data.id)
    fetchProducts()
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleView = (data: any) => {
    navigate(`/product/${data.id}`)
  }

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
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
      cell: (row) => 
      {
        return (
          <div className="flex gap-2">
          <Button variant="ghost" onClick={() => handleUpdate(row?.cell?.row?.original)}>
            <FaRegEdit />
          </Button>
          <Button variant="ghost" onClick={() => handleDelete(row?.cell?.row?.original)}>
            <RiDeleteBinLine className="text-red-500" />
          </Button>
          <Button variant="ghost" onClick={() => handleView(row?.cell?.row?.original)}>
            <GrView />
          </Button>
        </div>
        )
      }
      ,
    },
  ]
  return (
    <>
      <div className="flex justify-end mb-2.5">
        <Button variant={"outline"} onClick={() => {setEditData({});setOpenModal(true)}}>Add Product</Button>
      </div>
      <DataTable columns={columns} data={products} onSearch={setSearch} />
      {
        openModal && <ProductForm openModal={openModal} setOpenModal={setOpenModal} editData={editData} setEditData={setEditData} refreshProducts={fetchProducts} />
      }
    </>
  );
};

export default ProductTable;
