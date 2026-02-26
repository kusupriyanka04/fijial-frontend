import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import StarRating from "../components/StarRating";
import { toast } from "react-toastify";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { category } = useParams(); // get category from URL
  const [searchParams] = useSearchParams(); // optional search query
  const search = searchParams.get("search");
  const type = searchParams.get("type");
  const restaurant = searchParams.get("restaurant");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products", {
          params: {
            category,
            search,
            type,
            restaurant,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category, search, type, restaurant]);

  // const filteredProducts = products.filter((p) => {
  //   const matchesCategory =
  //     !category || p.category?.toLowerCase() === category.toLowerCase();
  //   const matchesSearch =
  //     !searchQuery || p.name?.toLowerCase().includes(searchQuery);
  //   const matchesType = type === "trending" ? p.offer > 0 : true;

  //   return matchesCategory && matchesSearch && matchesType;
  // });

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Menu Grid */}
      <div className="px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {/* {filteredProducts.map((p) => { */}
        {products.map((p) => {
          const discountedPrice = p.offer
            ? p.price - (p.price * p.offer) / 100
            : p.price;

          return (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Product Image */}
              <div
                className="h-40 w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/restaurant/${p.restaurant}`)}
              >
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3
                  className="font-semibold text-lg truncate cursor-pointer hover:text-zomato"
                  onClick={() => navigate(`/restaurant/${p.restaurant}`)}
                >
                  {p.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {p.restaurant} • {p.category}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {p.description || "Delicious food item"}
                </p>

                {/* Star Rating */}
                <StarRating rating={p.rating || 4.2} />

                {/* Price & Offer */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-zomato">
                    ₹{discountedPrice}
                  </span>
                  {p.offer > 0 && (
                    <span className="text-green-600 text-sm">
                      {p.offer}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(p);
                    toast.success("Added to cart");
                  }}
                  className="mt-3 bg-zomato text-white w-full py-2 rounded-lg hover:bg-red-600 transition active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}

        {/* If no products */}
        {/* {filteredProducts.length === 0 && ( */}
        {products.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

