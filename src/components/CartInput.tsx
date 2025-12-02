import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pizza } from "../type";

interface CartItem extends Pizza {
  quantity: number;
}

export default function CartInput() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const order = {
      fullName,
      address,
      phone,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    savedOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    localStorage.removeItem("cart");

    setSuccess(true);
    navigate("/")
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Full Order</h2>

      {!success ? (
        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" className="order-btn">
            Save
          </button>
        </form>
      ) : (
        <div className="success-message">
          zakaz qabul qilindi
        </div>
      )}
    </div>
  );
}
