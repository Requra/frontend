import React, { useState } from "react";
import { Users, Layout } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog/Dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs/tabs";
import { useMeetingStore } from "../stores/useMeetingStore";
import { toast } from "sonner";

// Sub-components
import { InviteLinkTab } from "./InviteModal/InviteLinkTab";
import { InviteTeammatesTab } from "./InviteModal/InviteTeammatesTab";
import { InviteEmailTab } from "./InviteModal/InviteEmailTab";

export const InviteMembersModal: React.FC = () => {
  const { isInviteModalOpen, setInviteModalOpen, meetingLink, sendInvite } = useMeetingStore();
  const [activeTab, setActiveTab] = useState("link");
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleInviteTeammate = (email: string, name: string) => {
    sendInvite({
      meetingId: "mock-session",
      email,
      role: "participant"
    });
    toast.success(`Invitation sent to ${name}`, {
      description: "They will receive a notification to join.",
      duration: 3000,
    });
  };

  const handleSendEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sendInvite({
      meetingId: "mock-session",
      email,
      role: "guest"
    });

    toast.success(`Guest invitation sent`, {
      description: `A secure link was sent to ${email}`,
      duration: 4000,
    });
    setEmail("");
  };

  const MOCK_TEAMMATES = [
    { id: "tm-1", name: "David Miller", role: "Product Manager", avatar: "DM" },
    { id: "tm-2", name: "Sophie Taylor", role: "Creative Lead", avatar: "ST" },
    { id: "tm-3", name: "James Wilson", role: "DevOps Engineer", avatar: "JW" },
    { id: "tm-4", name: "Elena Volkov", role: "UX Researcher", avatar: "EV" },
  ].filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isInviteModalOpen} onOpenChange={setInviteModalOpen}>
      <DialogContent className="max-h-[80vh] sm:max-h-[550px] flex flex-col w-[calc(100%-2rem)] sm:max-w-[440px] overflow-hidden p-0 rounded-[28px] sm:rounded-[32px] border-0 shadow-2xl [&>button]:text-white [&>button]:opacity-50 [&>button]:hover:opacity-100 [&>button]:hover:bg-white/10 [&>button]:transition-all">
        {/* Professional Header */}
        <div className="shrink-0 bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-[0.03] rotate-12 scale-150 pointer-events-none">
            <Users size={200} />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-lg bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                  <div className="size-1.5 rounded-full bg-primary-400 animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">Collaboration Hub</span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                Invite <span className="text-primary-400">Members</span>
              </DialogTitle>
              <DialogDescription className="text-neutral-400 text-xs sm:text-sm font-medium pt-1">
                Add your team to accelerate the design session.
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white p-5 sm:p-6 overflow-y-auto scrollbar-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList variant="pills" className="bg-neutral-50 p-1.5 mb-6 sm:mb-8 rounded-2xl border border-neutral-100 grid grid-cols-3">
              <TabsTrigger
                value="link"
                className="rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-normal sm:tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary-600 h-8 sm:h-9"
              >
                Secure Link
              </TabsTrigger>
              <TabsTrigger
                value="teammates"
                className="rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-normal sm:tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary-600 h-8 sm:h-9"
              >
                Teammates
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-normal sm:tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary-600 h-8 sm:h-9"
              >
                External
              </TabsTrigger>
            </TabsList>

            <div className="min-h-[200px]">
              <TabsContent value="link" className="mt-0 outline-none">
                <InviteLinkTab meetingLink={meetingLink} />
              </TabsContent>

              <TabsContent value="teammates" className="mt-0 outline-none">
                <InviteTeammatesTab
                  teammates={MOCK_TEAMMATES}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onInvite={handleInviteTeammate}
                />
              </TabsContent>

              <TabsContent value="email" className="mt-0 outline-none">
                <InviteEmailTab
                  email={email}
                  setEmail={setEmail}
                  onSubmit={handleSendEmailInvite}
                />
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-6 sm:mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
            <div className="flex items-center gap-2">
              <Layout className="size-3.5 text-neutral-300" />
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider sm:tracking-widest">Requra System • Suite 2.4</span>
            </div>
            <button
              onClick={() => setInviteModalOpen(false)}
              className="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors py-2 sm:py-1 px-4 sm:px-3 rounded-xl sm:rounded-lg bg-neutral-50 hover:bg-neutral-100 sm:bg-transparent"
            >
              Dismiss
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
