import logo from "../../../assets/images/logo.png";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} className="w-18 h-14" alt="logo" />
      <span className="text-xl font-black tracking-wide text-neutral-900 uppercase">
        Requra<span className="text-primary-800">.AI</span>
      </span>
    </div>
  );
};
