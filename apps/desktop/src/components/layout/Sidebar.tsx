import { NavLink } from "react-router-dom";

import { useSidebar } from "@/contexts/sidebar";

import { Brand } from "@/components/common/branding";
import { UserCard } from "@/components/common/user";
import { navigation } from "@/constants/navigation";

const Sidebar = () => {
  const { mode } = useSidebar();

  const isExpanded = mode === "expanded";
  const isCollapsed = mode === "collapsed";
  const isHidden = mode === "hidden";

  return (
    <aside
      className={`
        flex h-screen flex-col
        overflow-hidden
        border-r border-slate-800
        bg-slate-950 text-white
        transition-all duration-300 ease-in-out
        ${
          isExpanded
            ? "w-72"
            : isCollapsed
            ? "w-20"
            : "w-0 border-r-0"
        }
      `}
    >
      {!isHidden && (
        <>
          {/* Brand */}
          <div className="border-b border-slate-800 p-6">
            <Brand collapsed={isCollapsed} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `
                        flex items-center
                        ${
                          isCollapsed
                            ? "justify-center"
                            : "gap-3"
                        }
                        rounded-xl
                        px-4 py-3.5
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-blue-600/90 text-white shadow-md ring-1 ring-blue-500/40"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                        }
                      `
                      }
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      {isExpanded && (
                        <span className="font-medium tracking-wide">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-800 p-4">
            <UserCard collapsed={isCollapsed} />
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;