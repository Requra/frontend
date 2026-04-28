import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { UserStats as UserStatsType } from "../types";

interface UserStatsProps {
  stats: UserStatsType;
}

function AnimatedCounter({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className={`text-heading-md font-bold leading-tight ${color}`}>
      {display}
    </span>
  );
}

export function UserStats({ stats }: UserStatsProps) {
  const items = [
    { value: stats.projects, label: "Projects", color: "text-primary-600", bg: "bg-primary-50/60" },
    { value: stats.tasks, label: "Tasks", color: "text-accent-600", bg: "bg-accent-50/60" },
    { value: stats.completed, label: "Done", color: "text-success-600", bg: "bg-success-50/60" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.35 }}
          className={`${item.bg} rounded-2xl p-4 text-center border border-neutral-100`}
        >
          <AnimatedCounter value={item.value} color={item.color} />
          <p className="text-caption text-neutral-400 font-medium mt-1">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
