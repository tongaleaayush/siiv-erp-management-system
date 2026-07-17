import { UserCircle2 } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";

const UserCard = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800">
          <UserCircle2 className="h-7 w-7 text-slate-300" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
  {user?.username ?? "Guest User"}
</h3>

          <p className="truncate text-xs text-slate-400">
  {user?.role === "SUPER_ADMIN"
    ? "Super Administrator"
    : user?.role === "ADMIN"
      ? "Administrator"
      : "No Role"}
</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />

        <span className="text-xs text-slate-400">
          Online
        </span>
      </div>
    </div>
  );
};

export default UserCard;