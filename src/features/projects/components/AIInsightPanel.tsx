import { CircleCheckBig } from "lucide-react";

const insights = [
  "Functional Requirements",
  "Non Functional Requirements",
  "User Stories",
  "Acceptance Criteria",
  "Stakeholder Summary",
];

export const AIInsightPanel = () => {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 w-full max-w-[280px] h-fit shadow-sm">
      <h3 className="text-sm font-bold text-neutral-900 mb-3">
        AI Insight Panel
      </h3>
      <p className="text-xs text-neutral-500 mb-3">AI will generate:</p>
      <ul className="flex flex-col gap-2 mb-4">
        {insights.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4 text-primary-500 shrink-0" />
            <span className="text-sm text-neutral-700">{item}</span>
          </li>
        ))}
      </ul>
      <hr className="border-neutral-100 mb-3" />
      <p className="text-xs text-neutral-400">
        <span className="font-medium text-neutral-500">Tip:</span> Combining
        transcripts and documents improves AI accuracy
      </p>
    </div>
  );
};
