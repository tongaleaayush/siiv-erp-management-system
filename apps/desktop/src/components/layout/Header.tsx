import { Bell, Search, UserCircle2 } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          SIIV ERP
        </h1>
      </div>

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