import { useState, useEffect } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { userService } from "../api/userService";
import type { UserProfile, UserSettings } from "../types";
import { ProfileHeader } from "../components/ProfileHeader";
import UserInfoCard from "../components/UserInfoCard";
import { SettingsItem } from "../components/SettingsItem";
import PreferencesSection from "../components/PreferencesSection";
import { LanguageSelector } from "../components/LanguageSelector";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import DangerZone from "../components/DangerZone";
import { DeleteAccountModal } from "../components/DeleteAccountModal";
import { useProjectStore } from "@/stores/projects";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient/BackgroundGradient";
import { staggerContainer, fadeInUp } from "../constants/motionPresets";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { stats: projectStats, fetchProjects } = useProjectStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileData, settingsData] = await Promise.all([
          userService.getUserProfile(),
          userService.getUserSettings(),
          fetchProjects(),
        ]);

        if (profileData) {
          profileData.stats.projects = projectStats.total;
          profileData.stats.completed = projectStats.completed;
        }

        setProfile(profileData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchProjects, projectStats.total, projectStats.completed]);

  const handleTogglePush = () => {
    if (settings) {
      setSettings({
        ...settings,
        pushNotifications: !settings.pushNotifications,
      });
    }
  };

  const handleToggleDigests = () => {
    if (settings) {
      setSettings({ ...settings, emailDigests: !settings.emailDigests });
    }
  };

  const handleLanguageChange = (lang: "en" | "ar") => {
    if (settings) {
      setSettings({ ...settings, language: lang });
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <BackgroundGradient />
        <div className="relative z-10">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative min-h-screen"
    >
      {/* SVG Gradient Background */}
      <BackgroundGradient />

      <div className="relative z-10 flex flex-col gap-8 pb-12">
        <motion.div variants={fadeInUp}>
          <ProfileHeader />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: User Card */}
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            {profile && (
              <UserInfoCard
                profile={profile}
                onUpdate={(updated) => setProfile(updated)}
              />
            )}
          </motion.div>

          {/* Right Column: Settings & Preferences */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 space-y-8"
          >
            {/* Account Settings */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="text-heading-xs font-bold text-neutral-900 px-1">
                Account Settings
              </h3>
              <div className="space-y-3">
                <SettingsItem
                  icon={<Mail size={20} />}
                  label="Email"
                  value={profile?.email}
                />
                <SettingsItem
                  icon={<Lock size={20} />}
                  label="Change Password"
                  onClick={() => setIsPasswordModalOpen(true)}
                />
                <SettingsItem
                  icon={<UserIcon size={20} />}
                  label="Role"
                  value={profile?.role}
                />
              </div>
            </div>

            {/* Preferences */}
            {settings && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-heading-xs font-bold text-neutral-900 px-1">
                  Preferences
                </h3>
                <PreferencesSection
                  pushNotifications={settings.pushNotifications}
                  emailDigests={settings.emailDigests}
                  onTogglePush={handleTogglePush}
                  onToggleDigests={handleToggleDigests}
                />
              </div>
            )}

            {/* Language Selection */}
            {settings && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-heading-xs font-bold text-neutral-900 px-1">
                  Language Selection
                </h3>
                <LanguageSelector
                  currentLanguage={settings.language}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            )}

            {/* Danger Zone */}
            <div className="pt-4">
              <DangerZone onDeleteClick={() => setIsDeleteModalOpen(true)} />
            </div>
          </motion.div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userEmail={profile?.email}
      />
    </motion.div>
  );
};
