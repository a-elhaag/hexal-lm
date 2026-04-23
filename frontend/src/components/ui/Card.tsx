interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[#faf7f4] rounded-card border border-[rgba(168,144,128,0.14)] shadow-[0_1px_8px_rgba(0,0,0,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}
