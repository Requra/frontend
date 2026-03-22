import { Outlet, Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/Logo/Logo";
import { paths } from "@/routes/paths";

import loginImg from "@/assets/images/Auth/Login.png";
import registerImg from "@/assets/images/Auth/Register.png";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ'S", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

export const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname === paths.auth.register;

  const currentImg = isRegister ? registerImg : loginImg;

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Global Header */}
      <header className="absolute top-0 left-0 w-full h-20 px-8 lg:px-[80px] flex items-center justify-between z-50 pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-10 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </header>

      <div
        className={`flex-1 w-full flex flex-col lg:flex-row ${isRegister ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Form Side (White) */}
        <div className="w-full lg:w-1/2 flex flex-col relative bg-white">
          {/* Content (Forms) */}
          <div className="flex-1 flex flex-col justify-center mt-20 lg:mt-0">
            <Outlet />
          </div>
        </div>

        {/* Image Side (Purple) */}
        <div className="hidden lg:flex relative w-1/2 flex-col bg-primary-50/30 overflow-hidden">
          {/* Illustration & Effects */}
          <div className="flex-1 flex items-center justify-center relative mt-20 lg:mt-0">
            {/* Glow effect */}
            <div className="absolute w-[500px] h-[500px] bg-primary-400/20 blur-[120px] rounded-full" />

            <img
              src={currentImg}
              className={`relative z-10 w-[400px] animate-float ${isRegister ? "w-[520px]" : ""}`}
              alt="auth illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
