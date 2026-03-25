import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo/Logo";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ'S", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

export const AuthHeader = () => {
  return (
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
  );
};
