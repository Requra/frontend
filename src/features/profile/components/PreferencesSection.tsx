import React from "react";
import { Bell, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreferenceToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  iconBg?: string;
  iconColor?: string;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
  icon,
  label,
  description,
  isEnabled,
  onToggle,
  iconBg = "bg-primary-50/50",
  iconColor = "text-primary-600",
}) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="flex items-center justify-between p-4 bg-white/50 border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className={cn("p-2.5 rounded-xl shadow-inner", iconBg, iconColor)}>
        {icon}
      </div>
      <div className="text-left">
        <p className="text-[15px] font-bold text-neutral-800 leading-tight">
          {label}
        </p>
        <p className="text-xs text-neutral-400 mt-1 font-medium">{description}</p>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none cursor-pointer",
        isEnabled ? "bg-primary-600 shadow-[0_0_12px_rgba(124,58,237,0.3)]" : "bg-neutral-200"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-md",
          isEnabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  </motion.div>
);

interface PreferencesSectionProps {
  pushNotifications: boolean;
  emailDigests: boolean;
  onTogglePush: () => void;
  onToggleDigests: () => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  pushNotifications,
  emailDigests,
  onTogglePush,
  onToggleDigests,
}) => {
  return (
    <div className="space-y-3">
      <PreferenceToggle
        icon={<Bell size={20} />}
        label="Push Notifications"
        description="AI complete, approvals, comments"
        isEnabled={pushNotifications}
        onToggle={onTogglePush}
        iconBg="bg-amber-50/50"
        iconColor="text-amber-600"
      />

      <PreferenceToggle
        icon={<Mail size={20} />}
        label="Email Digests"
        description="Weekly summary of your activity"
        isEnabled={emailDigests}
        onToggle={onToggleDigests}
        iconBg="bg-indigo-50/50"
        iconColor="text-indigo-600"
      />
    </div>
  );
};
