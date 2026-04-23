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
// Dot diameter 20px (w-5 h-5), line height 3px — center line on dot center
const LINE_TOP = "calc(0.625rem - 1.5px)"; // half of 20px dot = 10px = 0.625rem, minus half line

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
    gsap.to(dot,   { scale: 1.45, backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 6px rgba(98,144,195,0.22), 0 0 0 14px rgba(98,144,195,0.08)", outlineColor: "var(--color-accent)", duration: 0.45, ease: "back.out(1.7)" });
    gsap.to(num,   { color: "var(--color-accent)", opacity: 1, duration: 0.3 });
    gsap.to(title, { color: "var(--color-surface)", opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(text,  { color: "var(--color-surface)", opacity: 0.68, y: 0, duration: 0.45, ease: "power2.out" });
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
    gsap.set(lineFillRef.current, { scaleX: 0 });

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start:   "top top",
      end:     "bottom bottom",
      onUpdate(self) {
        gsap.set(lineFillRef.current, { scaleX: self.progress, transformOrigin: "left center" });
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

        {/* Heading block */}
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

        {/* Timeline */}
        <div className="relative grid grid-cols-4 gap-0 w-full max-w-285 mx-auto">

          {/* START label */}
          <span
            className="absolute -translate-x-full pr-4 text-[0.58rem] font-bold uppercase tracking-widest text-muted opacity-40 select-none"
            style={{ top: LINE_TOP, left: 0, transform: "translateX(-100%)", lineHeight: "3px" }}
          >
            Start
          </span>

          {/* END label */}
          <span
            className="absolute translate-x-full pl-4 text-[0.58rem] font-bold uppercase tracking-widest text-muted opacity-40 select-none"
            style={{ top: LINE_TOP, right: 0, transform: "translateX(100%)", lineHeight: "3px" }}
          >
            End
          </span>

          {/* Base dim line */}
          <div
            className="absolute left-0 right-0 rounded-full pointer-events-none"
            style={{ top: LINE_TOP, height: "3px", background: "rgba(168,144,128,0.12)" }}
          />

          {/* Animated fill line */}
          <div
            ref={lineFillRef}
            className="absolute left-0 right-0 rounded-full pointer-events-none"
            style={{
              top: LINE_TOP,
              height: "3px",
              background: "linear-gradient(90deg, var(--color-accent), rgba(98,144,195,0.4))",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />

          {steps.map((step, i) => (
            <div key={step.num} className="px-6 first:pl-0 flex flex-col gap-4">
              {/* Dot — w-5 h-5 = 20px */}
              <div
                ref={el => { if (el) dotRefs.current[i] = el; }}
                className="relative z-10 w-5 h-5 rounded-full mb-6"
                style={{
                  backgroundColor: "rgba(98,144,195,0.15)",
                  outline: "2px solid rgba(98,144,195,0.25)",
                  outlineOffset: "2px",
                }}
              />

              <div
                ref={el => { if (el) numRefs.current[i] = el; }}
                className="text-[0.65rem] font-bold uppercase tracking-widest"
              >
                {step.num}
              </div>

              <div
                ref={el => { if (el) titleRefs.current[i] = el; }}
                className="text-[1.1rem] font-bold leading-snug"
              >
                {step.title}
              </div>

              <div
                ref={el => { if (el) textRefs.current[i] = el; }}
                className="text-[0.8rem] font-medium leading-[1.72]"
              >
                {step.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
