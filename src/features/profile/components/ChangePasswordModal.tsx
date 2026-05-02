import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { userService } from "../api/userService";
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "../schemas/changePasswordSchema";
import successImg from "@/assets/images/Success.png";

import { motion, AnimatePresence } from "framer-motion";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await userService.changePassword(data);
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        "Failed to change password. Please check your current password.",
      );
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-[32px] border-none shadow-2xl">
        <div className="relative p-8">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="password-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="items-center text-center space-y-4 mb-8 pt-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shadow-inner">
                    <Key size={32} />
                  </div>
                  <div className="space-y-2">
                    <DialogTitle className="text-2xl font-bold text-neutral-900 text-center">
                      Set New Password
                    </DialogTitle>
                    <p className="text-body-md text-neutral-500 max-w-[380px] text-center">
                      Create a strong password that you haven't used before.
                    </p>
                  </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    {...register("currentPassword")}
                    label="Current Password"
                    placeholder="Enter current password"
                    type={showCurrent ? "text" : "password"}
                    error={errors.currentPassword?.message}
                    className="h-12 rounded-xl border-neutral-200"
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="hover:text-primary-500 transition-colors pointer-events-auto"
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />

                  <Input
                    {...register("newPassword")}
                    label="New Password"
                    placeholder="Enter new password"
                    type={showNew ? "text" : "password"}
                    error={errors.newPassword?.message}
                    className="h-12 rounded-xl border-neutral-200"
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="hover:text-primary-500 transition-colors pointer-events-auto"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />

                  <Input
                    {...register("confirmPassword")}
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    type={showConfirm ? "text" : "password"}
                    error={errors.confirmPassword?.message}
                    className="h-12 rounded-xl border-neutral-200"
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="hover:text-primary-500 transition-colors pointer-events-auto"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="rounded-xl h-12 bg-primary-50/50 border-primary-100 text-primary-700 hover:bg-primary-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="rounded-xl h-12 text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200/50"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                className="flex flex-col items-center text-center py-2 space-y-6"
              >
                <div className="w-56 h-56 relative">
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      damping: 12,
                      stiffness: 100,
                    }}
                    src={successImg}
                    alt="Success"
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">
                    Password Updated!
                  </h3>
                  <p className="text-body-md text-neutral-500 max-w-[320px] leading-relaxed">
                    Your password has been successfully changed. You can now use
                    your new password to log in.
                  </p>
                </div>
                <Button
                  onClick={handleClose}
                  className="w-full h-14 rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200/50 mt-4 text-lg font-semibold"
                >
                  Back to Profile
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
