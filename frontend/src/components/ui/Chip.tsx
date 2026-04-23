type ChipVariant = "dark" | "outline";

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
}

const variantStyles: Record<ChipVariant, string> = {
  dark:    "bg-bg text-surface",
  outline: "border border-[rgba(168,144,128,0.4)] text-[#8a7a72]",
};

export function Chip({ children, variant = "dark" }: ChipProps) {
  return (
    <span className={`inline-flex items-center rounded-pill px-[0.7rem] py-[0.2rem] text-[0.67rem] font-bold ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
