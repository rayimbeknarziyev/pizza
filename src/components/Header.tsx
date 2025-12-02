import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div className="container p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img
            width={80}
            src="https://thumbs.dreamstime.com/b/cute-cartoon-style-pepperoni-pizza-slice-illustration-isolated-white-background-220671304.jpg?w=768"
            alt=""
          />
          <div>
            <span className="font-extrabold text-2xl  h-[24px]">
              REACT PIZZA
            </span>
            <p className="font-normal text-base text-[#7B7B7B]">
              самая вкусная пицца во вселенной
            </p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="w-[150px] h-[50px] rounded-3 text-white bg-[#FE5F1E] flex items-center justify-center font-bold text-base"
        >
          <IoCartOutline  className="fs-3"/>
        </button>
      </div>
    </div>
  );
}

export default Header;
