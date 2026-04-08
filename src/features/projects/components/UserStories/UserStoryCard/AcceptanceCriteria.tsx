import { CheckCircle2, ListChecks } from "lucide-react";

interface AcceptanceCriteriaProps {
  criteria: string[];
}

export const AcceptanceCriteria = ({ criteria }: AcceptanceCriteriaProps) => {
  if (!criteria || criteria.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ListChecks className="w-3.5 h-3.5 text-primary-500" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Acceptance Criteria
        </span>
        <span className="text-[10px] font-bold text-primary-600 bg-primary-50 rounded-full px-1.5 py-0.5 leading-none">
          {criteria.length}
        </span>
      </div>

      {/* Criteria list */}
      <ul className="flex flex-col gap-1">
        {criteria.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 py-1 px-2.5 rounded-lg bg-white border border-neutral-100 hover:border-primary-100 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-success-400 mt-0.5 shrink-0" />
            <span className="text-[11px] text-neutral-600 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
