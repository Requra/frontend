import React, { useEffect, useState } from "react";
import { X, Bell } from "lucide-react";
import { useMeetingStore } from "../stores/useMeetingStore";
import { Button } from "@/components/ui/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import type { Participant } from "../types";

export const JoinRequestToast: React.FC = () => {
  const { joinRequests, onAdmitParticipant, onDenyParticipant } = useMeetingStore();
  const [activeRequest, setActiveRequest] = useState<Participant | null>(joinRequests[0] || null);

  useEffect(() => {
    if (joinRequests.length > 0 && !activeRequest) {
      setActiveRequest(joinRequests[0]);
    } else if (joinRequests.length === 0) {
      setActiveRequest(null);
    }
  }, [joinRequests, activeRequest]);

  if (!activeRequest) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
        exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
        className="fixed top-8 left-1/2 z-100 w-full max-w-sm"
      >
        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-500/20 rounded-xl text-primary-400">
                <Bell size={18} className="animate-bounce" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
                Join Request
              </span>
            </div>
            <button 
              onClick={() => onDenyParticipant(activeRequest.id)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="size-16 rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center text-2xl font-black text-white shadow-xl">
              {activeRequest.initials}
            </div>
            <div>
              <h3 className="text-lg font-black text-white leading-tight">
                {activeRequest.name}
              </h3>
              <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mt-0.5">
                {activeRequest.role || "Guest"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="default"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-black uppercase tracking-widest text-[10px] h-11 rounded-2xl"
              onClick={() => onDenyParticipant(activeRequest.id)}
            >
              Deny Access
            </Button>
            <Button
              variant="default"
              className="bg-primary-500 hover:bg-primary-400 text-white font-black uppercase tracking-widest text-[10px] h-11 rounded-2xl shadow-lg shadow-primary-500/20"
              onClick={() => onAdmitParticipant(activeRequest.id)}
            >
              Admit User
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
