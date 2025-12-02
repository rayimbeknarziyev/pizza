import { IoCartOutline } from "react-icons/io5";
import { IoBagRemoveOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";


function Sidebar() {
  const adminRoutes = [
    {
      link: "/admin/products",
      name: "Products",
      icon: IoCartOutline,
    },
    {
      link: "/admin/orders",
      name: "Orders",
      icon: IoBagRemoveOutline,
    },
    {
      link: "/admin/delivers",
      name: "Delivers",
      icon: CiDeliveryTruck,
    },
    {
      link: "/",
      name: "home",
      icon: IoHomeOutline,
    },
  ];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="border-r px-3 h-screen">
      <h1 className="text-center dark:!text-gray-300">Admin</h1>
      <p className="mt-5 text-gray-500 dark:!text-gray-300">Store Management</p>
      <div className="py-3 flex flex-col items-center gap-2">
        {adminRoutes.map((link) => (
          <div
            onClick={() => navigate(link.link)}
            className={` ${
              pathname === link.link
                ? "bg-green-200 text-black"
                : "hover:bg-gray-200 dark:bg-gray-900 dark:hover:!text-black dark:!text-gray-300 transition"
            } px-3 w-100 flex items-center gap-2 cursor-pointer py-1 rounded-lg  `}
          >
            <link.icon size={22} />
            <p className="font-bold mt-3">{link.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
