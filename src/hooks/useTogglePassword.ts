import { useState } from "react";

/**
 * Custom hook to manage password visibility toggle.
 * Returns the visibility state, a toggle function, and the appropriate input type.
 */
export const useTogglePassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    toggleVisibility,
    inputType: isVisible ? "text" : "password",
  };
};
