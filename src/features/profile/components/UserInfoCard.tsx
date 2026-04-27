import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { UserProfile } from "../types";
import { Card } from "@/components/ui/Card/Card";
import { cn } from "@/lib/utils";
import { UserStats } from "./UserStats";
import { useUserInfoCard } from "../hooks/useUserInfoCard";
import { AvatarSection } from "./AvatarSection";
import { InfoFields } from "./InfoFields";
import { UserInfoActions } from "./UserInfoActions";

interface UserInfoCardProps {
  profile: UserProfile;
  onUpdate: (updatedProfile: UserProfile) => void;
}

export function UserInfoCard({ profile, onUpdate }: UserInfoCardProps) {
  const {
    isEditing,
    isSaving,
    formData,
    errors,
    previewUrl,
    isUploadingAvatar,
    fileInputRef,
    initial,
    handleEdit,
    handleCancel,
    handleSave,
    handleFileChange,
    handleAvatarConfirm,
    handleCancelPreview,
    onDragOver,
    onDrop,
    handleNameChange,
  } = useUserInfoCard(profile, onUpdate);

  return (
    <Card className="rounded-[32px] p-8 shadow-xl shadow-neutral-100/50 border border-neutral-50 relative overflow-hidden transition-all duration-300">
      {/* Header with Avatar */}
      <div className="flex items-start justify-between mb-8">
        <AvatarSection
          profile={profile}
          previewUrl={previewUrl}
          initial={initial}
          isUploadingAvatar={isUploadingAvatar}
          fileInputRef={fileInputRef}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onFileChange={handleFileChange}
          onAvatarConfirm={handleAvatarConfirm}
          onCancelPreview={handleCancelPreview}
        />
        {!isEditing && (
          <button className="text-neutral-300 hover:text-neutral-500 transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Info Fields */}
      <motion.div
        layout
        initial={false}
        animate={{ opacity: 1 }}
        className={cn("space-y-4 mb-8", isEditing && "space-y-6")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? "editing" : "viewing"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <InfoFields
              profile={profile}
              isEditing={isEditing}
              formData={formData}
              errors={errors}
              onNameChange={handleNameChange}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <UserStats stats={profile.stats} />

      <UserInfoActions
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </Card>
  );
}

export default UserInfoCard;
