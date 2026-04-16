import React, { useState } from "react";
import { Link2, Check, Copy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface InviteLinkTabProps {
  meetingLink: string;
}

export const InviteLinkTab: React.FC<InviteLinkTabProps> = ({ meetingLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    toast.success("Link copied to clipboard", {
      description: "Anyone with this link can request to join.",
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-3">
        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <Link2 size={12} className="text-primary-500" />
          Shareable Meeting Link
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:p-1.5 p-2 bg-neutral-50 rounded-2xl border border-neutral-100 group transition-all focus-within:border-primary-500/30 focus-within:ring-4 focus-within:ring-primary-500/5">
          <div className="relative flex-1">
            <Input 
              readOnly 
              value={meetingLink} 
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm font-medium text-neutral-600 truncate px-3 py-2"
            />
          </div>
          <Button 
            onClick={handleCopyLink} 
            size="sm"
            className={cn(
              "w-full sm:w-auto rounded-xl sm:rounded-[10px] transition-all font-bold px-4 h-12 sm:h-10 shadow-sm shrink-0",
              copied 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20" 
                : "bg-neutral-900 hover:bg-black text-white"
            )}
          >
            {copied ? (
              <Check className="size-4 mr-2 animate-in zoom-in duration-300" />
            ) : (
              <Copy className="size-4 mr-2" />
            )}
            {copied ? "Copied" : "Copy Link"}
          </Button>
        </div>
      </div>

      <div className="p-3 sm:p-4 bg-primary-50/30 rounded-2xl border border-primary-500/10 flex items-start gap-3 sm:gap-3.5 group hover:bg-primary-50/50 transition-colors">
        <div className="p-2.5 bg-white rounded-xl text-primary-600 shadow-sm group-hover:scale-110 transition-transform">
          <ShieldCheck className="size-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-black text-primary-900 tracking-tight">Enterprise Security</p>
          <p className="text-xs text-primary-700/70 font-medium leading-relaxed">
            This link is unique to this session. Only authorized members or people you admit manually can join.
          </p>
        </div>
      </div>
    </div>
  );
};
