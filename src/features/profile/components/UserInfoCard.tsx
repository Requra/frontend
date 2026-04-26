import React from "react";
import { X, Camera } from "lucide-react";
import type { UserProfile } from "../types";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";

interface UserInfoCardProps {
  profile: UserProfile;
  onEdit: () => void;
  onCancel: () => void;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  profile,
  onEdit,
  onCancel,
}) => {
  return (
    <Card className="rounded-[32px] p-8 shadow-xl shadow-neutral-100/50 border border-neutral-50 relative overflow-hidden">
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
            <h2 className="text-heading-md font-bold text-neutral-900">{profile.name}</h2>
            <p className="text-body-md text-neutral-400">{profile.email}</p>
          </div>
        </div>
        <button className="text-neutral-300 hover:text-neutral-500 transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Info Fields */}
      <div className="space-y-6 mb-10">
        <div className="flex justify-between items-center py-1">
          <span className="text-body-md text-neutral-500 font-medium">Name</span>
          <span className="text-body-md text-neutral-900 font-bold">{profile.name}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-body-md text-neutral-500 font-medium">Email account</span>
          <span className="text-body-md text-neutral-900 font-bold">{profile.email}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-body-md text-neutral-500 font-medium">Role</span>
          <span className="text-body-md text-neutral-900 font-bold">{profile.role}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-body-md text-neutral-500 font-medium">Mobile</span>
          <span className="text-body-md text-neutral-900 font-bold">{profile.phone}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
        <div className="text-center">
          <p className="text-heading-md font-bold text-primary-600 leading-tight">
            {profile.stats.projects}
          </p>
          <p className="text-caption text-neutral-400 font-medium">Projects</p>
        </div>
        <div className="text-center border-x border-neutral-200">
          <p className="text-heading-md font-bold text-accent-600 leading-tight">
            {profile.stats.tasks}
          </p>
          <p className="text-caption text-neutral-400 font-medium">Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-heading-md font-bold text-success-600 leading-tight">
            {profile.stats.completed}
          </p>
          <p className="text-caption text-neutral-400 font-medium">Done</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          className="rounded-2xl text-primary-700"
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={onEdit}
          className="rounded-2xl text-white shadow-lg shadow-primary-200"
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};
