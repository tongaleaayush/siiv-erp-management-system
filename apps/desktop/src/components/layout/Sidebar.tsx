import { NavLink } from "react-router-dom";
import { navigation } from "@/constants/navigation";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-4">
      <h1 className="mb-8 text-2xl font-bold">
        SIIV ERP
      </h1>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;