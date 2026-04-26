import { useState, useEffect } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { userService } from "../api/userService";
import type { UserProfile, UserSettings } from "../types";
import { ProfileHeader } from "../components/ProfileHeader";
import { UserInfoCard } from "../components/UserInfoCard";
import { SettingsItem } from "../components/SettingsItem";
import { PreferencesSection } from "../components/PreferencesSection";
import { LanguageSelector } from "../components/LanguageSelector";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProjectStore } from "@/stores/projects";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient/BackgroundGradient";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setSettings({ ...settings, pushNotifications: !settings.pushNotifications });
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
    <div className="relative min-h-screen">
      {/* SVG Gradient Background */}
      <BackgroundGradient />

      <div className="relative z-10 flex flex-col gap-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: User Card */}
          <div className="lg:col-span-5">
            {profile && (
              <UserInfoCard
                profile={profile}
                onEdit={() => console.log("Edit clicked")}
                onCancel={() => console.log("Cancel clicked")}
              />
            )}
          </div>

          {/* Right Column: Settings & Preferences */}
          <div className="lg:col-span-7 space-y-8">
            {/* Account Settings */}
            <div className="space-y-3">
              <SettingsItem
                icon={<Mail size={20} />}
                label="Email"
                value={profile?.email}
              />
              <SettingsItem
                icon={<Lock size={20} />}
                label="Change Password"
                onClick={() => console.log("Change password clicked")}
              />
              <SettingsItem
                icon={<UserIcon size={20} />}
                label="Role"
                value={profile?.role}
              />
            </div>

            {/* Preferences */}
            {settings && (
              <PreferencesSection
                pushNotifications={settings.pushNotifications}
                emailDigests={settings.emailDigests}
                onTogglePush={handleTogglePush}
                onToggleDigests={handleToggleDigests}
              />
            )}

            {/* Language Selection */}
            {settings && (
              <LanguageSelector
                currentLanguage={settings.language}
                onLanguageChange={handleLanguageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

