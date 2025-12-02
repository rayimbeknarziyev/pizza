import axios from "axios";
import { useEffect, useState } from "react";
import type { Pizza } from "../type";
import Categories from "./Categories";

function Products() {
  const [products, setProducts] = useState<Pizza[]>([]);
  const [filtered, setFiltered] = useState<Pizza[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const [selectedSize, setSelectedSize] = useState<{ [key: string]: number }>(
    {}
  );
  const [selectedType, setSelectedType] = useState<{ [key: string]: string }>(
    {}
  );

  function getProducts() {
    axios
      .get("https://68f75a60f7fb897c6615813d.mockapi.io/items")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Xatolik:", err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function filterByCategory(categoryIndex: number | null) {
    setActiveCategory(categoryIndex);
    if (categoryIndex === null) {
      setFiltered(products);
    } else {
      const filteredItems = products.filter(
        (p) => p.category === categoryIndex
      );
      setFiltered(filteredItems);
    }
  }

  function addToCart(product: Pizza) {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = savedCart.find((p :Pizza) => p.id === product.id);

    const type = selectedType[product.id] || "тонкое";
    const size = selectedSize[product.id] || product.sizes[0];
    const price = getPrice(product, size, type);

    const itemToAdd = {
      ...product,
      quantity: 1,
      selectedSize: size,
      selectedType: type,
      price,
    };

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      savedCart.push(itemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));
  }

  function getPrice(product: Pizza, size?: number, type?: string) {
    const currentSize = size || selectedSize[product.id] || product.sizes[0];
    const currentType = type || selectedType[product.id] || "тонкое";

    let price = product.price;

    if (product.sizes.length > 1 && currentSize === product.sizes[1])
      price += 50;
    if (product.sizes.length > 2 && currentSize === product.sizes[2])
      price += 100;

    if (currentType === "традиционное") price += 30;

    return price;
  }

  return (
    <div className="container mt-5">
      <Categories active={activeCategory} onSelect={filterByCategory} />

      <p className="font-bold text-5xl text-dark text-center mt-5">Все пиццы</p>

      <div className="flex items-center mt-5 justify-center flex-wrap gap-5 ">
        {filtered.map((product) => {
          const currentSize = selectedSize[product.id] || product.sizes[0];
          const currentType = selectedType[product.id] || "тонкое";

          return (
            <div
              key={product.id}
              className="w-[280px] h-[459px] flex flex-column"
            >
              <img src={product.imageUrl} alt={product.title} width={259} />
              <p className="font-extrabold flex items-center justify-center text-base text-[#000000]">
                {product.title}
              </p>

              <div className="pizza_type">
                <div className="pizza_size_type">
                  {["тонкое", "традиционное"].map((type) => (
                    <div
                      key={type}
                      className={`type_0 ${
                        currentType === type ? "bg-secondary text-white" : ""
                      }`}
                      onClick={() =>
                        setSelectedType((prev) => ({
                          ...prev,
                          [product.id]: type,
                        }))
                      }
                    >
                      {type}
                    </div>
                  ))}
                </div>
 
                <div className="pizza_size mt-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className={`size ${
                        currentSize === size ? "bg-secondary text-white" : ""
                      }`}
                      onClick={() =>
                        setSelectedSize((prev) => ({
                          ...prev,
                          [product.id]: size,
                        }))
                      }
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="price_wrap">
                <p className="price">от {getPrice(product)}₽</p>
                <div className="button" onClick={() => addToCart(product)}>
                  + Добавить
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
