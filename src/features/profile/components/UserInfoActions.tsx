import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";

interface UserInfoActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const UserInfoActions = ({
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
}: UserInfoActionsProps) => {
  return (
    <motion.div layout className="grid grid-cols-2 gap-4">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing-actions"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="col-span-2 grid grid-cols-2 gap-4"
          >
            <Button
              variant="outline"
              onClick={onCancel}
              className="rounded-xl h-12 bg-primary-50/50 border-primary-100 text-primary-700 hover:bg-primary-50 transition-all"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onSave}
              isLoading={isSaving}
              className="rounded-xl h-12 bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200/50 transition-all"
            >
              Edit
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="view-actions"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="col-span-2 space-y-3"
          >
            <Button
              variant="secondary"
              onClick={onEdit}
              className="rounded-2xl text-primary-700 w-full"
            >
              Edit Profile
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
