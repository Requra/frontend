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

import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex items-center gap-6">
      <motion.div
        className="relative group cursor-pointer"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Ring */}
        <motion.div 
          className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary-500 to-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <Avatar
          src={previewUrl || profile.avatar}
          fallback={initial}
          className={cn(
            "w-24 h-24 border-4 border-white shadow-xl transition-all duration-300 relative z-10",
            isUploadingAvatar && "opacity-50 grayscale-[0.5]",
          )}
        />

        {/* Upload Overlay */}
        {!previewUrl && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <Camera className="text-white" size={24} />
          </div>
        )}

        <AnimatePresence>
          {previewUrl && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0, opacity: 0, x: 20 }}
              className="absolute -bottom-1 -right-1 flex gap-2 z-30"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAvatarConfirm();
                }}
                disabled={isUploadingAvatar}
                className="p-2 bg-success-500 text-white rounded-full shadow-lg hover:bg-success-600 transition-all border-2 border-white hover:scale-110 active:scale-95"
              >
                <Check size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelPreview();
                }}
                disabled={isUploadingAvatar}
                className="p-2 bg-danger-500 text-white rounded-full shadow-lg hover:bg-danger-600 transition-all border-2 border-white hover:scale-110 active:scale-95"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
        />

        {isUploadingAvatar && (
          <div className="absolute inset-0 z-40 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          {profile.name}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          <p className="text-body-md text-neutral-500 font-medium">
            {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};
