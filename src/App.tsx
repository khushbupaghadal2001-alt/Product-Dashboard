import './App.css'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import ProductDetails from './components/ProductDetails';
import AddtoCart from './components/AddtoCart';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<AddtoCart />} />
    </Routes>
    </>
  )
}

export default App
