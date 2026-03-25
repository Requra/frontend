import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col relative w-full">
      <Header />
      <div className="flex flex-1 w-full relative">
        <Sidebar />
        <main className="flex-1 flex flex-col w-full px-[40px] relative bg-[#F9F9F9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
