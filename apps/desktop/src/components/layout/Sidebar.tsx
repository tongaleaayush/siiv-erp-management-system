import { NavLink } from "react-router-dom";

import { navigation } from "@/constants/navigation";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          SIIV ERP
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Management System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl px-4 py-3
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <p className="text-center text-xs text-slate-500">
          SIIV ERP v1.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;