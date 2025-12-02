import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useState } from "react";
import axios from "axios";

function Admin() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleSave = () => {
    const newProduct = { imageUrl: image, title, price };
    axios
      .post("https://68f75a60f7fb897c6615813d.mockapi.io/items", newProduct)
      .then(() => {
        setImage("");
        setTitle("");
        setPrice("");
        setOpen(false);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <img
            width={80}
            src="https://thumbs.dreamstime.com/b/cute-cartoon-style-pepperoni-pizza-slice-illustration-isolated-white-background-220671304.jpg?w=768"
            alt=""
          />
          <div>
            <span className="font-extrabold text-2xl">REACT PIZZA</span>
            <p className="text-[#7B7B7B] text-base">
              самая вкусная пицца во вселенной
            </p>
          </div>
        </div>

        <input
          type="search"
          placeholder="Search..."
          className="form-control w-50"
        />

        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          + Product
        </button>
      </div>

      <div className="flex gap-3">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>

      <Rodal
        visible={open}
        onClose={() => setOpen(false)}
        customStyles={{ height: "max-content" }}
      >
        <h5 className="text-center mt-3">Add Product</h5>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Image URL"
          className="form-control mb-2 mt-3"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="form-control mb-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          type="number"
          placeholder="Price"
          className="form-control mb-2"
        />
        <button className="btn btn-success w-100" onClick={handleSave}>
          Save
        </button>
      </Rodal>
    </div>
  );
}

export default Admin;
