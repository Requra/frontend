import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { userService } from "../api/userService";
import { useAuthStore } from "@/stores/auth";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | undefined;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  userEmail,
}: DeleteAccountModalProps) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const isEmailMatch = confirmEmail === userEmail;

  const handleDelete = async () => {
    if (!isEmailMatch) return;

    setIsDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success("Your account has been deleted.");
      logout();
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setConfirmEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-[32px] border-none shadow-2xl">
        <div className="relative p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="items-center text-center space-y-4 mb-8 pt-4">
              <div className="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center text-danger-600 shadow-inner">
                <AlertTriangle size={32} />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold text-neutral-900 text-center">
                  Delete Account
                </DialogTitle>
                <p className="text-body-md text-neutral-500 max-w-[320px] text-center leading-relaxed">
                  This action is permanent and cannot be undone. All your data
                  will be wiped.
                </p>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-neutral-700">
                  Please type <span className="font-bold text-neutral-900 select-all">{userEmail}</span> to confirm.
                </p>
                <Input
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 rounded-xl border-danger-100 focus-visible:border-danger-500 focus-visible:ring-danger-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="rounded-xl h-12 bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  isLoading={isDeleting}
                  disabled={!isEmailMatch}
                  className="rounded-xl h-12 text-white bg-danger-600 hover:bg-danger-700 shadow-lg shadow-danger-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Delete Forever
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
