import { useEffect, useState } from "react";

interface CompletedOrder {
  fullName: string;
  address: string;
  phone: string;
  total: number;
  date: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}

function AdminCompleted() {
  const [completed, setCompleted] = useState<CompletedOrder[]>([]);

  function getCompleted() {
    const saved = JSON.parse(localStorage.getItem("completed") || "[]");
    setCompleted(saved);
  }

  useEffect(() => {
    getCompleted();
  }, []);

  return (
    <div>
      <h4 className="my-3">Completed Orders</h4>=
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {completed.map((c, i) => (
            <tr key={i}>
              <td>{c.fullName}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.total} ₽</td>
              <td>{c.date}</td>
              <td>
                <ul className="list-unstyled">
                  {c.items.map((item) => (
                    <li key={item.id}>
                      {item.title} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCompleted;
