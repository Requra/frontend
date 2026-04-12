import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LobbyPreview } from "../components/LobbyPreview";
import { Button } from "@/components/ui/Button/Button";
import { Logo } from "@/components/ui/Logo/Logo";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { paths } from "@/routes/paths";
import { useMeetingStore } from "../stores/useMeetingStore";
import { InviteMembersModal } from "../components/InviteMembersModal";

export const JoinMeetingPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { setInviteModalOpen, generateMeetingLink } = useMeetingStore();

  React.useEffect(() => {
    if (projectId) {
      generateMeetingLink(projectId);
    }
  }, [projectId, generateMeetingLink]);

  const handleJoin = () => {
    if (projectId) {
      navigate(paths.app.projects.meetings.live(projectId));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 selection:bg-primary-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left Side: Branding and Info */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-neutral-100 shadow-sm animate-in slide-in-from-top-4 duration-500">
             <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest leading-none mt-0.5">Meeting is active</span>
          </div>

          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
            <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.9]">
              Ready to <span className="text-primary-600 underline decoration-primary-200 underline-offset-8">join</span>?
            </h1>
            <p className="text-neutral-500 text-lg font-medium max-w-md mx-auto md:mx-0">
              The design sync for <span className="font-bold text-neutral-800">Requra Dashboard</span> has started. Your team is waiting.
            </p>
          </div>

          {/* Social Proof / Participants */}
          <div className="flex items-center gap-4 justify-center md:justify-start animate-in fade-in duration-1000 delay-300">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="size-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden ring-1 ring-neutral-100">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="participant" />
                  </div>
                ))}
                <div className="size-10 rounded-full border-2 border-white bg-neutral-900 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-neutral-100">
                  +12
                </div>
             </div>
             <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">16 people are in</p>
          </div>

          <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                onClick={handleJoin}
                className="w-full sm:w-auto px-10 h-16 rounded-3xl text-lg font-bold shadow-xl shadow-primary-600/20 group transition-all hover:scale-105 active:scale-95"
              >
                Join Meeting
                <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setInviteModalOpen(true)}
                className="w-full sm:w-auto px-8 h-16 rounded-3xl text-lg font-bold border-2 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all active:scale-95 flex items-center gap-3"
              >
                <Users className="size-5 text-neutral-500" />
                Invite
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-neutral-400 text-[11px] font-bold uppercase tracking-widest justify-center md:justify-start">
               <ShieldCheck className="size-3.5 text-emerald-500" />
               Secure end-to-end encrypted
            </p>
          </div>
        </div>

        {/* Right Side: AV Preview */}
        <div className="w-full max-w-md animate-in zoom-in-95 duration-1000 delay-200">
          <LobbyPreview />
          
          <div className="mt-8 p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm space-y-4">
             <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400">
                   <Users className="size-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-neutral-400 uppercase tracking-tighter">Current Host</p>
                   <p className="text-sm font-bold text-neutral-800">Alex Johnson (Project Lead)</p>
                </div>
             </div>
          </div>
        </div>

      </div>

      {/* Background Logo Watermark */}
      <div className="fixed bottom-12 opacity-[0.03] pointer-events-none select-none">
        <Logo />
      </div>

      <InviteMembersModal />
    </div>
  );
};
