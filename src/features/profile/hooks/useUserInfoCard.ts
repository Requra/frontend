import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { userService } from "../api/userService";
import type { UserProfile } from "../types";

export function useUserInfoCard(
  profile: UserProfile,
  onUpdate: (updatedProfile: UserProfile) => void,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
  });
  const [errors, setErrors] = useState<{ name?: string }>({});

  // Avatar Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = profile.name.charAt(0).toUpperCase();

  const handleEdit = () => {
    setFormData({ name: profile.name });
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { name?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      const updated = await userService.updateProfile({
        ...formData,
      });
      onUpdate(updated);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPEG, PNG, or WebP image.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB.");
      return false;
    }
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleAvatarConfirm = async () => {
    if (!selectedFile) return;
    setIsUploadingAvatar(true);
    try {
      const { avatar } = await userService.updateAvatar(selectedFile);
      onUpdate({ ...profile, avatar });
      toast.success("Avatar updated successfully!");
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload avatar.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCancelPreview = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
  };

  return {
    isEditing,
    isSaving,
    formData,
    errors,
    selectedFile,
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
  };
}
