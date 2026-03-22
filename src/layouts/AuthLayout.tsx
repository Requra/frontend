import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";

export const AuthLayout = () => {
  return (
    <div className="">
      <Header />

      <div className="">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
