import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = 1; // Replace with actual user ID from JWT

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = async () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    try {
      await axios.post('/orders', {
        user_id: userId,
        items: cart,
        total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate('/menu');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          {item.name} x {item.quantity} = ${item.price * item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

