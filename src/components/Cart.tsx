import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import type { Pizza } from "../type";
import { useNavigate } from "react-router-dom";

interface CartItem extends Pizza {
  quantity: number;
}

function Cart() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  function removeItem(id: string) {
    const filtered = cart.filter((item) => item.id !== id);
    setCart(filtered);
  }

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  const buyNow = () => {
    navigate("/cartInput");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-10">
      {cart.length === 0 ? (
        <div className="emptyCart">
          <p className="text-center main_title">Корзина пустая</p>
          <p className="secondly_title">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.    
          </p>
          <button className="btn btn-dark" onClick={goBack}>
            Вернуться назад
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-5 text-center dark:text-white">
            Корзина
          </h2>
          <table className="table">
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.imageUrl} width={80} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}₽</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span>{item.quantity}</span>
                    </div>
                  </td>
                  <td>{item.price * item.quantity}₽</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <IoTrashOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-danger" onClick={clearCart}>
              удалит
            </button>
            <h3 className="fw-bold text-xl dark:text-yellow-400">
              Сумма заказа: {total}₽
            </h3>
          </div>
          <div className="btn_wrapper">
            <button className="back_btn" onClick={goBack}>
              ← Вернуться назад
            </button>
            <button className="front_btn" onClick={buyNow}>
              Оплатить сейчас
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
