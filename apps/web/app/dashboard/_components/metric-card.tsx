import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  subClassName?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  subClassName = "text-[#747878]",
}: MetricCardProps) {
  return (
    <div className="p-8 bg-white rounded-2xl flex flex-col gap-6 transition-all hover:bg-[#f9f9ff] group">
      <div className="w-12 h-12 rounded-xl bg-[#f2f3fb] flex items-center justify-center text-[#1c1b1b] group-hover:bg-[#1c1b1b] group-hover:text-white transition-all">
        <Icon className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#747878] font-label">
          {label}
        </p>
        <h3 className="text-4xl font-bold tracking-tight text-[#1c1b1b] font-headline">
          {value}
        </h3>
        {sub && (
          <p className={`text-[13px] font-medium mt-1 flex items-center gap-1 ${subClassName}`}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}