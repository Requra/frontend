import { useState } from "react";
import { X, Camera, Check, ChevronDown } from "lucide-react";
import type { UserProfile } from "../types";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { userService } from "../api/userService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProfileField } from "./ProfileField";
import { UserStats } from "./UserStats";

interface UserInfoCardProps {
  profile: UserProfile;
  onUpdate: (updatedProfile: UserProfile) => void;
}

export function UserInfoCard({ profile, onUpdate }: UserInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
  });
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});

  const handleEdit = () => {
    setFormData({ name: profile.name, role: profile.role });
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { name?: string; role?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      const updated = await userService.updateProfile(formData);
      onUpdate(updated);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const roleOptions = ["Project Manager", "Business Analyst"];

  return (
    <Card className="rounded-[32px] p-8 shadow-xl shadow-neutral-100/50 border border-neutral-50 relative overflow-hidden transition-all duration-300">
      {/* Header with Avatar */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar
              src={profile.avatar}
              fallback={profile.name}
              className="w-20 h-20 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md text-neutral-400 hover:text-primary-500 transition-colors border border-neutral-100">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-heading-md font-bold text-neutral-900">
              {profile.name}
            </h2>
            <p className="text-body-md text-neutral-400">{profile.email}</p>
          </div>
        </div>
        {!isEditing && (
          <button className="text-neutral-300 hover:text-neutral-500 transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Info Fields */}
      <div className="space-y-4 mb-8">
        <ProfileField label="Name">
          {!isEditing ? (
            <span className="text-body-md text-neutral-900 font-bold">
              {profile.name}
            </span>
          ) : (
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              className={cn(
                "h-10 text-left font-bold text-neutral-900 bg-neutral-50 border-neutral-200 focus-visible:bg-white transition-all px-3",
                errors.name && "border-danger-500",
              )}
            />
          )}
        </ProfileField>

        <ProfileField label="Email account">
          <span className="text-body-md text-neutral-900 font-bold opacity-60">
            {profile.email}
          </span>
        </ProfileField>

        <ProfileField label="Role">
          {!isEditing ? (
            <span className="text-body-md text-neutral-900 font-bold">
              {profile.role}
            </span>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between gap-2 h-10 px-3 font-bold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all text-left">
                  {formData.role}
                  <ChevronDown size={16} className="text-neutral-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                {roleOptions.map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => setFormData({ ...formData, role })}
                    className={cn(
                      "justify-between",
                      formData.role === role &&
                        "text-primary-600 bg-primary-50",
                    )}
                  >
                    {role}
                    {formData.role === role && <Check size={14} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ProfileField>

        <ProfileField label="Mobile" showDivider={false}>
          <span className="text-body-md text-neutral-900 font-bold opacity-60">
            {profile.phone}
          </span>
        </ProfileField>
      </div>

      <UserStats stats={profile.stats} />

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="rounded-2xl"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              isLoading={isSaving}
              className="rounded-2xl shadow-lg shadow-primary-200 text-white"
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={handleEdit}
            className="rounded-2xl text-primary-700 w-full col-span-2"
          >
            Edit Profile
          </Button>
        )}
      </div>
    </Card>
  );
}

export default UserInfoCard;
