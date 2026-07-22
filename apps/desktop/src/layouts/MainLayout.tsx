import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
  <div className="h-full p-6">
    <Outlet />
  </div>
</main>
      </div>
    </div>
  );
};

export default MainLayout;