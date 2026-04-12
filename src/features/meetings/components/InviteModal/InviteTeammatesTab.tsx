import { Search, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

interface Teammate {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface InviteTeammatesTabProps {
  teammates: Teammate[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onInvite: (email: string, name: string) => void;
}

export const InviteTeammatesTab: React.FC<InviteTeammatesTabProps> = ({ 
  teammates, 
  searchQuery, 
  setSearchQuery,
  onInvite
}) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">
          <Search size={16} />
        </div>
        <Input 
          placeholder="Search teammates by name or role..." 
          className="pl-12 h-12 bg-neutral-50 border-neutral-100 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/30 font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-1.5 pr-2">
        {teammates.length > 0 ? teammates.map((tm, idx) => (
          <div 
            key={tm.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all group animate-in slide-in-from-left-2 duration-300 gap-3 sm:gap-2"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white transition-transform group-hover:scale-105">
                {tm.avatar}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-neutral-900 leading-none">{tm.name}</p>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100/50">
                    <ShieldCheck size={10} />
                    <span className="text-[9px] font-black uppercase tracking-tight">Team</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 font-medium">{tm.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full sm:w-auto rounded-xl border-neutral-200 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-200 transition-all font-black text-[10px] uppercase tracking-wider h-10 sm:h-9 px-4 active:scale-95 shrink-0"
              onClick={() => onInvite(`${tm.name.toLowerCase().replace(" ", ".")}@company.com`, tm.name)}
            >
              Send Ping
            </Button>
          </div>
        )) : (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-neutral-400 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200">
            <Users className="size-8 opacity-20" />
            <p className="text-sm font-bold italic">No teammates found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
