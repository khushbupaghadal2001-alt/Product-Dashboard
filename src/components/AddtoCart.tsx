import { Button } from "./ui/button";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store/store";
import { HOC } from "./HOC";

const AddtoCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => {
    return state.cart.items;
  });
  console.log("🚀 ~ AddtoCart ~ items:", items)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between bg-white items-center border p-4 mb-2 rounded-lg"
        >
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p>₹ {item.price * item.quantity}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => dispatch(decreaseQty(item.id))}>
              −
            </Button>
            <span>{item.quantity}</span>
            <Button size="sm" onClick={() => dispatch(increaseQty(item.id))}>
              +
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="text-right mt-4 font-bold">Total: ₹ {total}</div>
      )}
    </div>
  );
};

export default HOC(AddtoCart);
