import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative w-full overflow-hidden">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center px-[80px] py-8 relative z-10 w-full">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};
