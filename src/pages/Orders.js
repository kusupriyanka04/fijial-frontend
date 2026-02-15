import { useEffect, useState } from "react";
import api from "../api/axios";
import OrderTracking from "../components/OrderTracking";
// import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  //   const { cart } = useCart(); // optional, if you want to show cart count
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // Fetch orders from backend
  const fetchOrders = (async () => {
    try {
      const res = await api.get(role === "admin" ? "/admin/orders" : "/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };
  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 sm:px-6 lg:px-8 py-6">
      {/* Cart Sidebar */}
      <CartSidebar />

      <h2 className="text-2xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2 flex-wrap">
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-gray-500 text-sm">Total: ₹{order.total}</p>
              </div>

              {/* Order Tracking */}
              <OrderTracking status={order.status} />

              {/* Items */}
              <div className="mt-3 space-y-1">
                {order.items?.length ? (
                 order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))
                ):(
                   <p className="text-gray-400 text-sm">No items in this order</p>
                )}
              </div>

              {/* Admin: Update Status */}
              {role === "admin" && (
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="mt-3 border rounded px-2 py-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
