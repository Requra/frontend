import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";

interface DangerZoneProps {
  onDeleteClick: () => void;
}

export default function DangerZone({ onDeleteClick }: DangerZoneProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-heading-xs font-bold text-danger-500 px-1">
        Danger Zone
      </h3>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="p-6 bg-danger-50/10 border border-danger-200/50 rounded-[32px] backdrop-blur-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-danger-50 text-danger-600 rounded-2xl shadow-inner shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-neutral-900 leading-tight">
                Delete Account
              </p>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-[340px]">
                Permanently remove your account and all associated data. This action is irreversible.
              </p>
            </div>
          </div>
          <Button
            onClick={onDeleteClick}
            variant="destructive"
            className="rounded-xl h-12 cursor-pointer text-white"
          >
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
