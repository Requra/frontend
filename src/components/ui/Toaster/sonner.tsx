import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <div className="bg-emerald-100/80 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full p-1.5 shadow-sm shadow-emerald-500/20 ring-1 ring-emerald-500/20 dark:ring-emerald-500/30">
            <CircleCheckIcon className="size-4" strokeWidth={2.5} />
          </div>
        ),
        info: (
          <div className="bg-blue-100/80 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full p-1.5 shadow-sm shadow-blue-500/20 ring-1 ring-blue-500/20 dark:ring-blue-500/30">
            <InfoIcon className="size-4" strokeWidth={2.5} />
          </div>
        ),
        warning: (
          <div className="bg-amber-100/80 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full p-1.5 shadow-sm shadow-amber-500/20 ring-1 ring-amber-500/20 dark:ring-amber-500/30">
            <TriangleAlertIcon className="size-4" strokeWidth={2.5} />
          </div>
        ),
        error: (
          <div className="bg-red-100/80 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full p-1.5 shadow-sm shadow-red-500/20 ring-1 ring-red-500/20 dark:ring-red-500/30">
            <OctagonXIcon className="size-4" strokeWidth={2.5} />
          </div>
        ),
        loading: (
          <div className="bg-neutral-100/80 dark:bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 rounded-full p-1.5 shadow-sm ring-1 ring-neutral-500/20 dark:ring-neutral-500/30">
            <Loader2Icon className="size-4 animate-spin" strokeWidth={2.5} />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/95 dark:group-[.toaster]:bg-neutral-950/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-neutral-950 dark:group-[.toaster]:text-neutral-50 group-[.toaster]:border group-[.toaster]:border-neutral-200/60 dark:group-[.toaster]:border-neutral-800/60 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-neutral-900/10 dark:group-[.toaster]:shadow-black/50 rounded-2xl p-4 gap-3 items-center overflow-hidden transition-all duration-300 font-sans",
          description: "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400 text-sm",
          title: "group-[.toast]:font-semibold group-[.toast]:text-[15px] group-[.toast]:text-neutral-900 dark:group-[.toast]:text-neutral-100",
          actionButton:
            "group-[.toast]:bg-primary-900 dark:group-[.toast]:bg-primary-50 group-[.toast]:text-white dark:group-[.toast]:text-primary-950 group-[.toast]:rounded-lg group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium transition-colors hover:group-[.toast]:bg-primary-800 dark:hover:group-[.toast]:bg-primary-200",
          cancelButton:
            "group-[.toast]:bg-neutral-100 dark:group-[.toast]:bg-neutral-800 group-[.toast]:text-neutral-600 dark:group-[.toast]:text-neutral-300 group-[.toast]:rounded-lg group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium transition-colors hover:group-[.toast]:bg-neutral-200 dark:hover:group-[.toast]:bg-neutral-700",
          error:
            "group-[.toaster]:!bg-red-50/80 dark:group-[.toaster]:!bg-red-950/30 group-[.toaster]:!border-red-200 dark:group-[.toaster]:!border-red-900/50",
          success:
            "group-[.toaster]:!bg-emerald-50/80 dark:group-[.toaster]:!bg-emerald-950/30 group-[.toaster]:!border-emerald-200 dark:group-[.toaster]:!border-emerald-900/50",
          warning:
            "group-[.toaster]:!bg-amber-50/80 dark:group-[.toaster]:!bg-amber-950/30 group-[.toaster]:!border-amber-200 dark:group-[.toaster]:!border-amber-900/50",
          info:
            "group-[.toaster]:!bg-blue-50/80 dark:group-[.toaster]:!bg-blue-950/30 group-[.toaster]:!border-blue-200 dark:group-[.toaster]:!border-blue-900/50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
