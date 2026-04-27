import React from "react";
import { Camera, Check, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { cn } from "@/lib/utils";
import type { UserProfile } from "../types";

interface AvatarSectionProps {
  profile: UserProfile;
  previewUrl: string | null;
  initial: string;
  isUploadingAvatar: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarConfirm: () => void;
  onCancelPreview: () => void;
}

export const AvatarSection = ({
  profile,
  previewUrl,
  initial,
  isUploadingAvatar,
  fileInputRef,
  onDragOver,
  onDrop,
  onFileChange,
  onAvatarConfirm,
  onCancelPreview,
}: AvatarSectionProps) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative group cursor-pointer"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Avatar
          src={previewUrl || profile.avatar}
          fallback={initial}
          className={cn(
            "w-20 h-20 border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105",
            isUploadingAvatar && "opacity-50 grayscale-[0.5]",
          )}
        />

        {/* Upload Overlay/Button */}
        {!previewUrl ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={20} />
          </div>
        ) : (
          <div className="absolute -bottom-1 -right-1 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAvatarConfirm();
              }}
              disabled={isUploadingAvatar}
              className="p-1.5 bg-success-500 text-white rounded-full shadow-lg hover:bg-success-600 transition-colors border-2 border-white"
            >
              <Check size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancelPreview();
              }}
              disabled={isUploadingAvatar}
              className="p-1.5 bg-danger-500 text-white rounded-full shadow-lg hover:bg-danger-600 transition-colors border-2 border-white"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
        />

        {isUploadingAvatar && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-heading-md font-bold text-neutral-900">
          {profile.name}
        </h2>
        <p className="text-body-md text-neutral-400">{profile.email}</p>
      </div>
    </div>
  );
};
