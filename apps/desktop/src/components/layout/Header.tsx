import {
  Bell,
  PanelLeft,
  Search,
  UserCircle2,
} from "lucide-react";

import { useSidebar } from "@/contexts/sidebar";

const Header = () => {
 const { mode, toggleSidebar } = useSidebar();

const isExpanded = mode === "expanded";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition hover:bg-slate-100"
          aria-label={
  isExpanded ? "Collapse Sidebar" : "Expand Sidebar"
}
title={
  isExpanded ? "Collapse Sidebar" : "Expand Sidebar"
}
        >
          <PanelLeft className="h-5 w-5 text-slate-700" />
        </button>

        <h1 className="text-xl font-semibold text-slate-800">
          SIIV ERP
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Search size={20} />
        </button>

        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <UserCircle2 size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;