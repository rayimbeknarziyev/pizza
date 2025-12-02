import { useEffect, useState } from "react";

interface Order {
  fullName: string;
  address: string;
  phone: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  date: string;
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  function getOrders() {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }

  function handleComplete(order: Order) {
    const completed = JSON.parse(localStorage.getItem("completed") || "[]");
    completed.push(order);
    localStorage.setItem("completed", JSON.stringify(completed));

    const filtered = orders.filter((o) => o.date !== order.date);
    localStorage.setItem("orders", JSON.stringify(filtered));
    setOrders(filtered);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h4 className="my-3">Orders</h4>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Zakazlar yo‘q 😕</p>
      ) : (
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Date</th>
              <th>Items</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={index}>
                <td>{o.fullName}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{o.total} ₽</td>
                <td>{o.date}</td>
                <td>
                  <ul className="list-unstyled">
                    {o.items.map((item) => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(o)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
