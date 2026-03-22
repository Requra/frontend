import logo from "../../../assets/images/logo.png";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <img src={logo} className="w-16 h-12" alt="logo" />
      <span className="text-lg font-black tracking-wide text-neutral-900 uppercase">
        Requra<span className="text-primary-800">.AI</span>
      </span>
    </div>
  );
};
