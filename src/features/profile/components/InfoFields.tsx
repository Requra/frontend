import { Input } from "@/components/ui/Input/Input";
import { cn } from "@/lib/utils";
import { ProfileField } from "./ProfileField";
import type { UserProfile } from "../types";

interface InfoFieldsProps {
  profile: UserProfile;
  isEditing: boolean;
  formData: { name: string };
  errors: { name?: string };
  onNameChange: (name: string) => void;
}

export const InfoFields = ({
  profile,
  isEditing,
  formData,
  errors,
  onNameChange,
}: InfoFieldsProps) => {
  return (
    <>
      <ProfileField label="Name" variant={isEditing ? "vertical" : "horizontal"}>
        {!isEditing ? (
          <span className="text-body-md text-neutral-900 font-bold">
            {profile.name}
          </span>
        ) : (
          <Input
            value={formData.name}
            onChange={(e) => onNameChange(e.target.value)}
            error={errors.name}
            className={cn(
              "h-12 text-left font-medium text-neutral-900 bg-white border-neutral-200 focus-visible:ring-primary-500/20 transition-all px-4 rounded-xl",
              errors.name && "border-danger-500",
            )}
            placeholder="Shawky"
          />
        )}
      </ProfileField>

      <ProfileField
        label="Email account"
        variant={isEditing ? "vertical" : "horizontal"}
      >
        {!isEditing ? (
          <span className="text-body-md text-neutral-900 font-bold opacity-60">
            {profile.email}
          </span>
        ) : (
          <Input
            value={profile.email}
            readOnly
            className="h-12 text-left font-medium text-neutral-400 bg-white border-neutral-200 px-4 rounded-xl cursor-not-allowed"
          />
        )}
      </ProfileField>

      <ProfileField label="Role" variant={isEditing ? "vertical" : "horizontal"}>
        {!isEditing ? (
          <span className="text-body-md text-neutral-900 font-bold opacity-60">
            {profile.role}
          </span>
        ) : (
          <Input
            value={profile.role}
            readOnly
            className="h-12 text-left font-medium text-neutral-400 bg-white border-neutral-200 px-4 rounded-xl cursor-not-allowed"
          />
        )}
      </ProfileField>

      <ProfileField
        label="Mobile"
        showDivider={false}
        variant={isEditing ? "vertical" : "horizontal"}
      >
        {!isEditing ? (
          <span className="text-body-md text-neutral-900 font-bold opacity-60">
            {profile.phone}
          </span>
        ) : (
          <Input
            value={profile.phone || "010xxxxxxxx"}
            readOnly
            className="h-12 text-left font-medium text-neutral-400 bg-white border-neutral-200 px-4 rounded-xl cursor-not-allowed"
          />
        )}
      </ProfileField>
    </>
  );
};
