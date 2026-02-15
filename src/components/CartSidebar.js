import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-12 right-12 bg-zomato text-white px-4 py-2 rounded shadow-lg z-50"
      >
        Cart ({cart.reduce((sum, p) => sum + p.quantity, 0)})
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-red-500 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-140px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-2">
            <p className="font-bold text-lg">Total: ₹{total}</p>
            <button
              className="bg-zomato text-white py-2 rounded hover:bg-red-600 transition"
              onClick={() => {
                setOpen(false);
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
            <button
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
