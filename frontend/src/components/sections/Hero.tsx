import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";

const stats = [
  { num: "7", label: "Models" },
  { num: "4", label: "Modes" },
  { num: "1", label: "Answer" },
];

export function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center px-8 pt-28 pb-22">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{ background: "radial-gradient(ellipse, rgba(98,144,195,0.09) 0%, transparent 70%)" }}
      />

      <Badge dot className="mb-8">Multi-model council platform</Badge>

      <h1 className="text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] max-w-[640px] mb-5">
        Multiple minds.<br />
        <em className="not-italic text-[var(--color-accent)]">One answer.</em>
      </h1>

      <p className="text-[0.95rem] font-medium text-[var(--color-muted)] max-w-[400px] leading-[1.7] mb-10">
        Run your query across several AI models in parallel. They debate, review each other, and you get the synthesis.
      </p>

      <div className="flex gap-3 items-center">
        <Button variant="primary">Start a session</Button>
        <Button variant="ghost">How it works</Button>
      </div>

      {/* Stats */}
      <div className="mt-14 flex items-center gap-10">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-10">
            {i > 0 && <div className="w-px h-9 bg-[rgba(168,144,128,0.22)]" />}
            <div className="text-center">
              <div className="text-[1.5rem] font-extrabold tracking-[-0.02em]">{s.num}</div>
              <div className="text-[0.68rem] font-semibold text-[var(--color-muted)] uppercase tracking-[0.06em] mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
