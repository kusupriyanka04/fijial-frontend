import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AddProduct from "../components/AddProduct";

export default function Admin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);

  // Protect admin route
  useEffect(() => {
    if (role !== "admin") {
      alert("Access denied! Admins only.");
      navigate("/");
    }
  }, [role, navigate]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-zomato mb-6 text-center">
        Admin Panel
      </h2>

      {/* Add Product Form */}
      <div className="bg-white p-6 shadow rounded mb-6">
        <AddProduct fetchProducts={fetchProducts} />
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Products</h3>

        {products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex items-center gap-4">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{p.price} | {p.category} | {p.restaurant} | Offer: {p.offer || 0}%
                </p>
                <p className="text-sm text-yellow-500">Rating: {p.rating}</p>
              </div>
            </div>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-500 font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
