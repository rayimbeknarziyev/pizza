import axios from "axios";
import type { Pizza } from "../type";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";

function AdminProducts() {
  const [products, setProducts] = useState<Pizza[]>([]);

  function getProducts() {
    axios
      .get("https://68f75a60f7fb897c6615813d.mockapi.io/items")
      .then((res) => setProducts(res.data));
  }

  function handleDelete(id: string) {
    axios
      .delete(`https://68f75a60f7fb897c6615813d.mockapi.io/items/${id}`)
      .then(() => getProducts());
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h4 className="my-3">Products</h4>
      <table className="table w-100">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img width={80} src={p.imageUrl} alt={p.title} />
              </td>
              <td>{p.title}</td>
              <td>{p.price} ₽</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  <IoTrashOutline />
                </button>
                <button className="btn btn-warning mx-1">
                  <RiPencilLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
