import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import CartSidebar from "../components/CartSidebar";
import { jwtDecode } from "jwt-decode";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0); // ✅ Fix for total showing 0

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!name || !address || !phone) {
      return toast.error("Please fill all fields");
    }
    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }

    // ✅ Get user_id from JWT token
    const token = localStorage.getItem("token");
    let user_id = null;
    try {
      const decoded = jwtDecode(token);
      user_id = decoded.id;
    } catch {
      return toast.error("Please login again");
    }

    setLoading(true);
    try {
      await api.post("/orders", {
        user_id,           // ✅ from token
        customer_name: name,
        address,
        phone,
        total,
        items: cart,
        status: "Pending",
      });

      toast.success("Order placed successfully 🎉");
      setFinalTotal(total); // ✅ Save total before clearing cart
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Order Successful 🎉
          </h2>
          <p className="text-lg font-semibold mb-2">Total: ₹{finalTotal}</p> {/* ✅ uses saved total */}
          <p className="mb-2">
            Payment Mode: <strong>Cash on Delivery</strong>
          </p>
          <p className="text-green-700 font-semibold mb-6">
            Status: Order Placed Successfully
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-zomato text-white px-6 py-2 rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <CartSidebar />
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Cart Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-lg mb-4">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Customer Details */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-lg mb-4">Customer Details</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
            />
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="bg-zomato text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition active:scale-95"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import CartSidebar from "../components/CartSidebar";

// export default function Checkout() {
//   const { cart, clearCart } = useCart();
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const navigate = useNavigate();

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handlePlaceOrder = async () => {
//     if (!name || !address || !phone) {
//       return toast.error("Please fill all fields");
//     }
//     if (cart.length === 0) {
//       return toast.error("Cart is empty");
//     }

//     setLoading(true);
//     try {
//       // Send order to backend
//       await api.post("/orders", {
//         customer_name: name,
//         address,
//         phone,
//         total,
//         items: cart,
//         status: "Pending", // default for new order
//       });

//       toast.success("Order placed successfully 🎉");
//       clearCart();
//       setOrderPlaced(true);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold mb-4 text-green-600">
//             Order Successful 🎉
//           </h2>

//           <p className="text-lg font-semibold mb-2">Total: ₹{total}</p>

//           <p className="mb-2">
//             Payment Mode: <strong>Cash on Delivery</strong>
//           </p>

//           <p className="text-green-700 font-semibold mb-6">
//             Status: Order Placed Successfully
//           </p>

//           <button
//             onClick={() => navigate("/")}
//             className="bg-zomato text-white px-6 py-2 rounded-lg"
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
//       {/* Cart Sidebar */}
//       <CartSidebar />

//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Left: Cart Summary */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="font-bold text-lg mb-4">Your Cart</h3>
//           {cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <div className="space-y-3">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>
//                     {item.name} × {item.quantity}
//                   </span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//               <hr className="my-3" />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total:</span>
//                 <span>₹{total}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right: Customer Details */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="font-bold text-lg mb-4">Customer Details</h3>

//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
//             />

//             <input
//               type="text"
//               placeholder="Delivery Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
//             />

//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomato"
//             />

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="bg-zomato text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition active:scale-95"
//             >
//               {loading ? "Placing Order..." : "Place Order"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

