import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const baseIcon =
  "flex items-center justify-center w-6 h-6 rounded-lg shrink-0";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      expand={false}
      closeButton
      duration={5000}
      className="toaster group"
      toastOptions={{
        style: {
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          color: "#0f172a",
          border: "1px solid rgba(226,232,240,0.7)",
          borderRadius: "16px",
          padding: "14px 16px",
          boxShadow:
            "0 8px 30px -4px rgba(0,0,0,0.12), 0 4px 12px -2px rgba(0,0,0,0.08)",
          fontSize: "14px",
          gap: "12px",
        },
        classNames: {
          toast:
            "group transition-all duration-300 ease-out",
          title: "font-semibold text-[14px] leading-snug",
          description: "text-[13px] text-slate-500 mt-0.5 leading-relaxed",
          closeButton:
            "!bg-white !border !border-slate-200 !text-slate-400 hover:!text-slate-700 hover:!border-slate-300 transition-colors",
          success:
            "!border-emerald-200/80",
          error:
            "!border-red-200/80",
          warning:
            "!border-amber-200/80",
          info:
            "!border-blue-200/80",
        },
      }}
      icons={{
        success: (
          <div
            className={`${baseIcon} bg-emerald-500 shadow-md shadow-emerald-500/25`}
          >
            <CircleCheckIcon className="size-[14px] text-white" strokeWidth={2.5} />
          </div>
        ),
        info: (
          <div
            className={`${baseIcon} bg-blue-500 shadow-md shadow-blue-500/25`}
          >
            <InfoIcon className="size-[14px] text-white" strokeWidth={2.5} />
          </div>
        ),
        warning: (
          <div
            className={`${baseIcon} bg-amber-500 shadow-md shadow-amber-500/25`}
          >
            <TriangleAlertIcon
              className="size-[14px] text-white"
              strokeWidth={2.5}
            />
          </div>
        ),
        error: (
          <div className={`${baseIcon} bg-red-500 shadow-md shadow-red-500/25`}>
            <OctagonXIcon className="size-[14px] text-white" strokeWidth={2.5} />
          </div>
        ),
        loading: (
          <div className={`${baseIcon} bg-slate-100 shadow-md shadow-slate-400/20`}>
            <Loader2Icon
              className="size-[14px] text-slate-500 animate-spin"
              strokeWidth={2.5}
            />
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
