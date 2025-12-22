import { useEffect } from "react"
import ProductTable from "../components/ProductTable"
import { useGetProducts } from "../hook/useProducts"
import { HOC } from "@/components/HOC"

const Dashboard = () => {
  useEffect(()=>{
    useGetProducts()
  },[])
  return (
    <div>
      <ProductTable />
    </div>
  )
}

export default HOC(Dashboard)
