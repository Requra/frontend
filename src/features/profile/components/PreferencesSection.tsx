import React from "react";
import { Bell, Mail, Globe, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreferenceToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  iconBg?: string;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
  icon,
  label,
  description,
  isEnabled,
  onToggle,
  iconBg = "bg-primary-50",
}) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
    <div className="flex items-center gap-4">
      <div className={`p-2.5 ${iconBg} text-primary-500 rounded-xl`}>
        {icon}
      </div>
      <div className="text-left">
        <p className="text-body-md font-bold text-neutral-800 leading-tight">
          {label}
        </p>
        <p className="text-caption text-neutral-400 mt-0.5">{description}</p>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none",
        isEnabled ? "bg-primary-600" : "bg-neutral-200"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
          isEnabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  </div>
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
    <div className="space-y-4">
      <h3 className="text-body-lg font-bold text-neutral-700 px-1">Preferences</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl group cursor-pointer hover:bg-neutral-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary-50 text-primary-500 rounded-xl">
              <Globe size={20} />
            </div>
            <div className="text-left">
              <p className="text-body-md font-bold text-neutral-800 leading-tight">Language</p>
              <p className="text-caption text-neutral-400 mt-0.5">English (Arabic coming soon)</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-neutral-300 group-hover:text-primary-400" />
        </div>

        <PreferenceToggle
          icon={<Bell size={20} />}
          label="Push Notifications"
          description="AI complete, approvals, comments"
          isEnabled={pushNotifications}
          onToggle={onTogglePush}
          iconBg="bg-warning-50"
        />

        <PreferenceToggle
          icon={<Mail size={20} />}
          label="Email Digests"
          description="Weekly summary"
          isEnabled={emailDigests}
          onToggle={onToggleDigests}
          iconBg="bg-accent-50"
        />
      </div>
    </div>
  );
};

