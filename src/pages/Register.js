import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
   try {
    await api.post("/auth/register", form);
    toast.success("Registered successfully!");
    navigate("/login");
  } catch (err) {
  toast.error(err.response?.data?.error || "Registration failed");
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-zomato">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-zomato text-white py-2 rounded hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
}


