import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-zomato text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Foodie</h1>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-gray-200">
          Menu
        </Link>
        <Link to="/login" className="hover:text-gray-200">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-200">
          Register
        </Link>
        {token && role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}
      </div>
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 right-4 bg-white text-black rounded shadow-md flex flex-col p-4 space-y-2 md:hidden">
          <Link to="/" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          {token && role === "admin" && <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>}
        </div>
      )}
    </nav>
  );
}
