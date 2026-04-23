const steps = [
  { num: "01", title: "Submit",      text: "Prompt Forge sharpens your query before it reaches the models." },
  { num: "02", title: "Parallel run", text: "All models stream simultaneously. Each scores its own confidence." },
  { num: "03", title: "Peer review", text: "Models critique anonymous peers and adjust confidence scores." },
  { num: "04", title: "Synthesis",   text: "Apex weighs final scores and writes one definitive answer." },
];

export function HowItWorks() {
  return (
    <section className="max-w-[1140px] mx-auto px-14 pb-22">
      <div className="flex items-center gap-[0.6rem] mb-7">
        <span className="text-[0.63rem] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">How it works</span>
        <div className="w-12 h-px bg-[rgba(168,144,128,0.2)]" />
      </div>

      <div className="relative grid grid-cols-4 gap-0">
        {/* Connecting line */}
        <div
          className="absolute top-[0.85rem] left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(98,144,195,0.4), rgba(168,144,128,0.2))" }}
        />

        {steps.map((step) => (
          <div key={step.num} className="px-4 first:pl-0 flex flex-col gap-[0.6rem]">
            {/* Dot */}
            <div className="relative z-10 w-[10px] h-[10px] rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-bg)] outline outline-2 outline-[var(--color-accent)] mb-3" />
            <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">{step.num}</div>
            <div className="text-[0.9rem] font-bold text-[var(--color-surface)]">{step.title}</div>
            <div className="text-[0.74rem] font-medium text-[var(--color-muted)] leading-[1.65]">{step.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
