import { NavLink } from "react-router-dom";
import { Brand } from "@/components/common/branding";
import { navigation } from "@/constants/navigation";
import { UserCard } from "@/components/common/user";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">
      {/* Brand */}
<div className="border-b border-slate-800 p-6">
  <Brand />
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
                    flex items-center gap-3 rounded-xl px-4 py-3.5
                    transition-all duration-200 ease-in-out
                    ${
                     isActive
  ? "bg-blue-600/90 text-white shadow-md ring-1 ring-blue-500/40"
  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }
                  `
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />

<span className="font-medium tracking-wide">
  {item.name}
</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
  <UserCard />
</div>
    </aside>
  );
};

export default Sidebar;