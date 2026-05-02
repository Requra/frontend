import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";
import { tapScale } from "../constants/motionPresets";

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
            <motion.div whileTap={tapScale}>
              <Button
                variant="outline"
                onClick={onCancel}
                className="rounded-xl h-12 w-full bg-primary-50/50 border-primary-100 text-primary-700 hover:bg-primary-50 transition-all cursor-pointer"
                disabled={isSaving}
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileTap={tapScale}>
              <Button
                variant="default"
                onClick={onSave}
                isLoading={isSaving}
                className="rounded-xl h-12 w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200/50 transition-all cursor-pointer"
              >
                Save Changes
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="view-actions"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="col-span-2"
          >
            <motion.div whileTap={tapScale}>
              <Button
                variant="secondary"
                onClick={onEdit}
                className="rounded-2xl text-primary-700 w-full cursor-pointer"
              >
                Edit Profile
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
