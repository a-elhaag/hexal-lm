"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Submit",       text: "Prompt Forge sharpens your query before it reaches the models." },
  { num: "02", title: "Parallel run", text: "All models stream simultaneously. Each scores its own confidence." },
  { num: "03", title: "Peer review",  text: "Models critique anonymous peers and adjust confidence scores." },
  { num: "04", title: "Synthesis",    text: "Apex weighs final scores and writes one definitive answer." },
];

const STEP_COUNT = steps.length;
const VH_PER_STEP = 85;

export function HowItWorks() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const dotRefs     = useRef<HTMLDivElement[]>([]);
  const numRefs     = useRef<HTMLDivElement[]>([]);
  const titleRefs   = useRef<HTMLDivElement[]>([]);
  const textRefs    = useRef<HTMLDivElement[]>([]);
  const prevStep    = useRef(-1);

  function activateStep(i: number) {
    const dot = dotRefs.current[i]; const num = numRefs.current[i];
    const title = titleRefs.current[i]; const text = textRefs.current[i];
    if (!dot || !num || !title || !text) return;
    gsap.to(dot,   { scale: 1.4, backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 6px rgba(98,144,195,0.22), 0 0 0 14px rgba(98,144,195,0.08)", outlineColor: "var(--color-accent)", duration: 0.45, ease: "back.out(1.7)" });
    gsap.to(num,   { color: "var(--color-accent)", opacity: 1, duration: 0.3 });
    gsap.to(title, { color: "var(--color-surface)", opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(text,  { color: "var(--color-surface)", opacity: 0.65, y: 0, duration: 0.45, ease: "power2.out" });
  }

  function deactivateStep(i: number) {
    const dot = dotRefs.current[i]; const num = numRefs.current[i];
    const title = titleRefs.current[i]; const text = textRefs.current[i];
    if (!dot || !num || !title || !text) return;
    gsap.to(dot,   { scale: 1, backgroundColor: "rgba(98,144,195,0.15)", boxShadow: "none", outlineColor: "rgba(98,144,195,0.25)", duration: 0.3 });
    gsap.to(num,   { color: "var(--color-muted)", opacity: 0.4, duration: 0.25 });
    gsap.to(title, { color: "var(--color-muted)", opacity: 0.35, y: 10, duration: 0.3 });
    gsap.to(text,  { color: "var(--color-muted)", opacity: 0.25, y: 10, duration: 0.3 });
  }

  useEffect(() => {
    steps.forEach((_, i) => {
      const dot = dotRefs.current[i]; const num = numRefs.current[i];
      const title = titleRefs.current[i]; const text = textRefs.current[i];
      if (!dot || !num || !title || !text) return;
      gsap.set(num,   { color: "var(--color-muted)", opacity: 0.4 });
      gsap.set(title, { color: "var(--color-muted)", opacity: 0.35, y: 10 });
      gsap.set(text,  { color: "var(--color-muted)", opacity: 0.25, y: 10 });
      gsap.set(dot,   { scale: 1, backgroundColor: "rgba(98,144,195,0.15)", boxShadow: "none" });
    });
    gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top center" });

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start:   "top top",
      end:     "bottom bottom",
      onUpdate(self) {
        gsap.set(lineFillRef.current, { scaleY: self.progress, transformOrigin: "top center" });
        const activeStep = Math.min(STEP_COUNT - 1, Math.floor(self.progress * STEP_COUNT * 1.02));
        if (activeStep === prevStep.current) return;
        prevStep.current = activeStep;
        steps.forEach((_, i) => {
          if (i <= activeStep) activateStep(i);
          else deactivateStep(i);
        });
      },
    });

    return () => st.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${STEP_COUNT * VH_PER_STEP}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-14">

        {/* Heading block — unchanged */}
        <div className="self-start w-full max-w-285 mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[0.63rem] font-bold uppercase tracking-[0.18em] text-muted">How it works</span>
            <div className="w-10 h-px bg-[rgba(168,144,128,0.2)]" />
          </div>
          <h2 className="text-[2.4rem] font-extrabold text-surface tracking-tight leading-[1.08] mb-3">
            From query to answer.
          </h2>
          <p className="text-[0.88rem] text-muted font-medium">
            Four stages. Every model accountable. One definitive synthesis.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative w-full max-w-285 mx-auto">

          {/* Left column: vertical line track (~80px wide) */}
          <div className="absolute left-0 top-0 bottom-0" style={{ width: "80px" }}>

            {/* START label */}
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 text-[0.58rem] font-bold uppercase tracking-widest text-muted opacity-40 select-none"
              style={{ whiteSpace: "nowrap" }}
            >
              Start
            </span>

            {/* Base dim line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 rounded-full pointer-events-none"
              style={{ width: "2px", background: "rgba(168,144,128,0.15)" }}
            />

            {/* Animated fill line */}
            <div
              ref={lineFillRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 rounded-full pointer-events-none"
              style={{
                width: "2px",
                background: "linear-gradient(180deg, var(--color-accent), rgba(98,144,195,0.35))",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />

            {/* END label */}
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2 text-[0.58rem] font-bold uppercase tracking-widest text-muted opacity-40 select-none"
              style={{ whiteSpace: "nowrap" }}
            >
              End
            </span>
          </div>

          {/* Steps */}
          <div className="flex flex-col" style={{ paddingLeft: "80px" }}>
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex items-start pb-16 last:pb-0">

                {/* Dot — centered vertically on the number row, sitting on the line */}
                <div
                  ref={el => { if (el) dotRefs.current[i] = el; }}
                  className="absolute z-10 w-5 h-5 rounded-full"
                  style={{
                    left: "-50px",           /* 80px track center = 40px; 40px − half dot (10px) = 30px from right edge of track, so -50px from pl-80px content start */
                    top: "0.1rem",           /* align with first line of text (step number) */
                    backgroundColor: "rgba(98,144,195,0.15)",
                    outline: "2px solid rgba(98,144,195,0.25)",
                    outlineOffset: "2px",
                  }}
                />

                {/* Step content */}
                <div className="flex flex-col gap-2">
                  {/* Step number */}
                  <div
                    ref={el => { if (el) numRefs.current[i] = el; }}
                    className="text-[0.65rem] font-bold uppercase tracking-widest"
                  >
                    {step.num}
                  </div>

                  {/* Title */}
                  <div
                    ref={el => { if (el) titleRefs.current[i] = el; }}
                    className="text-[1.4rem] font-extrabold leading-snug"
                  >
                    {step.title}
                  </div>

                  {/* Body */}
                  <div
                    ref={el => { if (el) textRefs.current[i] = el; }}
                    className="text-[0.85rem] font-medium leading-[1.75]"
                  >
                    {step.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
