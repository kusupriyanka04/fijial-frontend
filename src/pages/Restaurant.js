import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Restaurant() {
  const { name } = useParams(); // restaurant name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products", {
        params: { restaurant: name },
      })
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, [name]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name} Restaurant</h1>

      {products.length === 0 && <p>No products found</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-bold">{p.name}</h3>
            <p>₹{p.price}</p>

            {p.offer > 0 && (
              <p className="text-green-600">{p.offer}% OFF</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
