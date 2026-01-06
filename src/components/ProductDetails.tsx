import { getByIdProduct } from "@/hook/useProducts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { HOC } from "./HOC";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();
  console.log("🚀 ~ ProductDetails ~ product:", product);
  useEffect(() => {
    if (id) {
      getByIdProduct(id).then((res) => setProduct(res));
    }
  }, [id]);
  if (!product) return <div>Loading...</div>;
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ₹ {product.price}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <div className="flex justify-center p-3 gap-4">
        <Button className="mt-4" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button onClick={() =>
    {dispatch(
      addToCart({
        id:product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    ); navigate("/cart")}}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default HOC(ProductDetails);
