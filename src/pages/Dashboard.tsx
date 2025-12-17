import { useEffect } from "react"
import ProductTable from "../components/ProductTable"
import { useGetProducts } from "../hook/useProducts"

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

export default Dashboard
