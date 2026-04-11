interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  subClassName?: string;
}

export function MetricCard({
  icon,
  label,
  value,
  sub,
  subClassName = "text-[#444748]",
}: MetricCardProps) {
  return (
    <>
      <div className="p-8 bg-white rounded-xl border border-black/5 shadow-[0px_24px_48px_rgba(21,28,39,0.06)]">
        <div className="mb-4">
          <span
            className="text-3xl text-[#151c27] font-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#444748]">
          {label}
        </p>
        <h3 className="text-3xl font-black tracking-tighter text-[#151c27] mt-2">
          {value}
        </h3>
        {sub && (
          <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${subClassName}`}>
            {sub}
          </p>
        )}
      </div>
    </>
  );
}