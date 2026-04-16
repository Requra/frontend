import React from "react";
import { Mail, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

interface InviteEmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const InviteEmailTab: React.FC<InviteEmailTabProps> = ({ 
  email, 
  setEmail, 
  onSubmit 
}) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} className="text-primary-500" />
            Email Address
          </label>
          <div className="relative group">
            <Input 
              placeholder="e.g. name@company.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-4 pr-12 bg-neutral-50 border-neutral-100 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/30 text-sm font-medium"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-primary-500 transition-colors">
              <Mail size={16} />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-neutral-900 hover:bg-black text-white font-black h-12 rounded-2xl shadow-lg shadow-neutral-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px]"
        >
          Send Invitations
          <Send className="size-4" />
        </Button>

        <div className="p-3 sm:p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start gap-3 sm:gap-3.5">
          <div className="p-2 bg-white rounded-xl text-neutral-400 shadow-sm">
            <Info className="size-4" />
          </div>
          <p className="text-[11px] text-neutral-500 font-bold leading-relaxed uppercase tracking-tight">
            Invitations will be sent as guests. They can join once the host admits them to the session.
          </p>
        </div>
      </form>
    </div>
  );
};
