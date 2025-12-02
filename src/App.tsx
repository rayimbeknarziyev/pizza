import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import AdminProducts from "./components/AdminProducts";
import AdminCategories from "./components/AdminDelivers";
import AdminOrders from "./components/AdminOrders";
import CartInput from "./components/CartInput";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartInput" element={<CartInput />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            path="/admin"
            element={<Navigate to={"/admin/products"} />}
          />
          <Route path="/admin/delivers" element={<AdminCategories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
