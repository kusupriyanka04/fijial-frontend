import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import biryani from "../assets/categories/biriyani.png";
import shawarma from "../assets/categories/Shawarma.png";
import burger from "../assets/categories/burger.png";
import pizza from "../assets/categories/pizza.png";
import chicken from "../assets/categories/chicken.png";
import vegMeal from "../assets/categories/veg-meal.png";
import noodles from "../assets/categories/noodles.png";
import cake from "../assets/categories/cake.png";

const categories = [
  { name: "Biryani", slug: "biryani", img: biryani },
  { name: "Shawarma", slug: "shawarma", img: shawarma },
  { name: "Burger", slug: "burger", img: burger },
  { name: "Pizza", slug: "pizza", img: pizza },
  { name: "Chicken", slug: "chicken", img: chicken },
  { name: "Veg Meal", slug: "veg", img: vegMeal },
  { name: "Noodles", slug: "noodles", img: noodles },
  { name: "Cake", slug: "cake", img: cake },
];

export default function Home() {
  const navigate = useNavigate();

  // ✅ Store full location details
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [locating, setLocating] = useState(true);

  useEffect(() => {
    // ✅ Check if browser supports geolocation
    if (!navigator.geolocation) {
      setLocationError(true);
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // ✅ Success - user allowed location
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          // ✅ Get detailed location info
          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Your City";

          const detectedArea =
            data.address.suburb ||
            data.address.neighbourhood ||
            data.address.road ||
            "";

          setCity(detectedCity);
          setArea(detectedArea);
        } catch (err) {
          // ✅ If API call fails
          setLocationError(true);
        } finally {
          setLocating(false);
        }
      },

      // ✅ Error - user denied location or error occurred
      (err) => {
        console.error("Geolocation error:", err.message);
        setLocationError(true);
        setLocating(false);
      },

      // ✅ Options for better accuracy
      {
        enableHighAccuracy: true,
        timeout: 10000,      // wait max 10 seconds
        maximumAge: 0        // don't use cached location
      }
    );
  }, []);

  // ✅ Helper to show location text
  const getLocationText = () => {
    if (locating) return "📍 Detecting your location...";
    if (locationError) return "📍 Location unavailable";
    if (area) return `📍 ${area}, ${city}`;
    return `📍 ${city}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-zomato text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Foodie</h1>

        {/* ✅ Location display with proper states */}
        <p className="text-sm mb-4">{getLocationText()}</p>

        {/* ✅ If location denied, show manual location input */}
        {locationError && (
          <p
            className="text-xs text-white underline cursor-pointer mb-3"
            onClick={() => {
              const manualCity = prompt("Enter your city manually:");
              if (manualCity) {
                setCity(manualCity);
                setLocationError(false);
              }
            }}
          >
            Enter location manually
          </p>
        )}

        <input
          placeholder="🔍 Search for food or restaurant"
          className="px-4 py-3 rounded w-96 text-black"
          onChange={(e) => navigate(`/menu?search=${e.target.value}`)}
        />
      </div>

      {/* CATEGORIES */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Inspiration for your first order
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {categories.map((c) => (
            <div
              key={c.slug}
              onClick={() => navigate(`/menu/${c.slug}`)}
              className="min-w-[120px] cursor-pointer text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center shadow hover:scale-105 transition">
                {c.img.startsWith("/") ? (
                  <img src={c.img} alt={c.name} className="h-16 w-16 object-cover" />
                ) : (
                  <span className="text-4xl">{c.img}</span>
                )}
              </div>
              <p className="mt-2 font-medium">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Offers</h2>
        <div
          onClick={() => navigate("/menu?type=trending")}
          className="bg-white p-6 rounded shadow cursor-pointer"
        >
          🔥 Trending Offers
        </div>
      </div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import biryani from "../assets/categories/biriyani.png";
// import shawarma from "../assets/categories/Shawarma.png";
// import burger from "../assets/categories/burger.png";
// import pizza from "../assets/categories/pizza.png";
// import chicken from "../assets/categories/chicken.png";
// import vegMeal from "../assets/categories/veg-meal.png";
// import noodles from "../assets/categories/noodles.png";
// import cake from "../assets/categories/cake.png";
// const categories = [
//   { name: "Biryani", slug: "biryani", img: biryani },
//   { name: "Shawarma", slug: "shawarma", img: shawarma },
//   { name: "Burger", slug: "burger", img: burger },
//   { name: "Pizza", slug: "pizza", img: pizza },
//   { name: "Chicken", slug: "chicken", img: chicken },
//   { name: "Veg Meal", slug: "veg", img: vegMeal },
//   { name: "Noodles", slug: "noodles", img: noodles },
//   { name: "Cake", slug: "cake", img: cake },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [location, setLocation] = useState("");

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;

//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
//       );
//       const data = await res.json();

//       setLocation(
//         data.address.city ||
//           data.address.town ||
//           data.address.village ||
//           "Your City",
//       );
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* HERO */}
//       <div className="bg-zomato text-white p-10 text-center">
//         <h1 className="text-4xl font-bold mb-4">Foodie</h1>
//         <p className="text-sm mb-4">
//           📍 {location || "Detecting your location..."}
//         </p>
//         {/* Location + Search */}
//         {/* <div className="flex flex-col md:flex-row gap-3 justify-center">
//           <input
//             placeholder="📍 Location"
//             className="px-4 py-3 rounded w-64 text-black"
//           /> */}
//         <input
//           placeholder="🔍 Search for food or restaurant"
//           className="px-4 py-3 rounded w-96 text-black"
//           onChange={(e) => navigate(`/menu?search=${e.target.value}`)}
//         />
//         {/* </div> */}
//       </div>

//       {/* CATEGORIES */}
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-4">
//           Inspiration for your first order
//         </h2>

//         <div className="flex gap-6 overflow-x-auto pb-4">
//           {categories.map((c) => (
//             <div
//               key={c.slug}
//               onClick={() => navigate(`/menu/${c.slug}`)}
//               className="min-w-[120px] cursor-pointer text-center"
//             >
//               <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center shadow hover:scale-105 transition">
//                 {c.img.startsWith("/") ? (
//                   <img
//                     src={c.img}
//                     alt={c.name}
//                     className="h-16 w-16 object-cover"
//                   />
//                 ) : (
//                   <span className="text-4xl">{c.img}</span>
//                 )}
//               </div>

//               <p className="mt-2 font-medium">{c.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* OFFERS */}
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-4">Offers</h2>

//         <div
//           onClick={() => navigate("/menu?type=trending")}
//           className="bg-white p-6 rounded shadow cursor-pointer"
//         >
//           🔥 Trending Offers
//         </div>
//       </div>
//     </div>
//   );
// }

