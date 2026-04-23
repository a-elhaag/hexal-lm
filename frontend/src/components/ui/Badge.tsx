interface BadgeProps {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, dot = false, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-[0.45rem] rounded-pill px-[0.85rem] py-[0.28rem] text-[0.67rem] font-bold uppercase tracking-[0.08em] bg-[rgba(98,144,195,0.12)] border border-[rgba(98,144,195,0.28)] text-accent ${className}`}>
      {dot && <span className="w-1.25 h-1.25 rounded-full bg-current shrink-0" />}
      {children}
    </span>
  );
}
