// import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path="/restaurant/:name" element={<Restaurant/>}/>
          <Route path="/menu" element={<Menu />} />
          <Route path="/admin" element={
              localStorage.getItem("role") === "admin" ? (
                <Admin />) : ( <Navigate to="/login" /> )
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
