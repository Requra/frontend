import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col relative w-full">
      <Header />
      <div className="flex flex-1 w-full relative">
        <main className="flex-1 flex flex-col w-full px-[40px] relative bg-[#F9F9F9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
