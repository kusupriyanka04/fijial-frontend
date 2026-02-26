import { useState } from "react";
import api from "../api/axios";

export default function AddProduct({ fetchProducts }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    rating: 4.0,
    category: "",
    restaurant: "",
    offer: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      rating: Number(product.rating),
      category: product.category.toLowerCase(),
      restaurant: product.restaurant,
      offer: Number(product.offer),
    };

    console.log("Sending payload:", payload);
    try {
      await api.post("admin/products", payload);
      alert("Product added successfully");
      fetchProducts();
      setProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        rating: 4.0,
        category: "",
        restaurant: "",
        offer: 0,
      });
      //   fetchProducts(); // refresh product list
    } catch (err) {
      alert("Failed to add product");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={product.rating}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Rating (0 - 5)"
      />
      <input
        name="category"
        placeholder="Category (biryani, pizza...)"
        value={product.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="restaurant"
        placeholder="Restaurant Name"
        value={product.restaurant}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="offer"
        type="number"
        placeholder="Offer %"
        value={product.offer}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button className="bg-zomato text-white w-full py-2 rounded">
        Add Product
      </button>
    </form>
  );
}

