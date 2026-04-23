import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center px-8 pt-28 pb-22">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(98,144,195,0.09) 0%, transparent 70%)",
        }}
      />

      <Badge dot className="mb-8">
        Multi-model council platform
      </Badge>

      <h1 className="text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] max-w-[640px] mb-5">
        Multiple minds.
        <br />
        <em className="not-italic text-[var(--color-accent)]">One answer.</em>
      </h1>

      <p className="text-[0.95rem] font-medium text-[var(--color-muted)] max-w-[400px] leading-[1.7] mb-10">
        Run your query across several AI models in parallel. They debate, review
        each other, and you get the synthesis.
      </p>

      <div className="flex gap-3 items-center">
        <Button variant="primary">Start a session</Button>
        <Button variant="ghost">How it works</Button>
      </div>
    </section>
  );
}
