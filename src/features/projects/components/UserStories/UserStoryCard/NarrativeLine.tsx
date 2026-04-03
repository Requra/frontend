export const NarrativeLine = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <p>
    <span className="font-bold text-neutral-900">{label}</span> {value}
  </p>
);
