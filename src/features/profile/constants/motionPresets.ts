import type { Variants } from "framer-motion";

/**
 * Shared motion presets for the Profile feature.
 * Every component should reference these instead of ad-hoc values.
 */

// Page-level stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Standard fade-in-up for stagger children
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Hover lift — subtle elevation on interactive cards
export const hoverLift = {
  y: -2,
  transition: { duration: 0.2, ease: "easeOut" as const },
};

// Tap scale — tactile press feedback
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// Spring pop — for elements appearing dynamically (buttons, badges)
export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15 },
  },
};
