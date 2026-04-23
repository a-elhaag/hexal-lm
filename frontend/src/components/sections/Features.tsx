"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Crosshair, ArrowRightLeft,
  Workflow as WorkflowIcon, Search, Zap,
  type LucideIcon,
} from "lucide-react";

interface Feature { name: string; Icon: LucideIcon; desc: string; }

const FEATURES: Feature[] = [
  { name: "The Council",     Icon: Users,          desc: "2–7 models run in parallel. Anonymous peer review. Apex synthesizes weighted by confidence." },
  { name: "Oracle",          Icon: Crosshair,      desc: "Single model, direct response. Fast and focused when the full council isn't needed."          },
  { name: "The Relay",       Icon: ArrowRightLeft, desc: "Mid-generation handoff. One model starts, another takes over. Context fully preserved."       },
  { name: "Workflow",        Icon: WorkflowIcon,   desc: "Node-based pipeline. Chain models and tools — output of each step feeds the next."            },
  { name: "Scout",           Icon: Search,         desc: "Web search injected as context before models respond. Always grounded in real data."          },
  { name: "Primal Protocol", Icon: Zap,            desc: "Toggle on any mode. Apex rewrites synthesis in brutally compressed, signal-dense form."       },
];

const COLS = 3;
const ROWS = 2;
const SPRING = { type: "spring", stiffness: 38, damping: 14, mass: 1 } as const;

function gridTemplate(activeIdx: number) {
  const col = activeIdx % COLS;
  const row = Math.floor(activeIdx / COLS);
  const cols = Array(COLS).fill("0.55fr").map((v, i) => (i === col ? "2fr" : v));
  const rows = Array(ROWS).fill("0.55fr").map((v, i) => (i === row ? "2fr" : v));
  return { cols: cols.join(" "), rows: rows.join(" ") };
}

function FeatureCard({
  feature, active, onActivate,
}: {
  feature: Feature; active: boolean; onActivate: () => void;
}) {
  const { name, Icon, desc } = feature;

  return (
    <motion.div
      layout
      onClick={onActivate}
      transition={SPRING}
      className="relative overflow-hidden rounded-card cursor-pointer select-none"
      animate={{
        boxShadow: active
          ? "0 28px 72px rgba(0,0,0,0.28)"
          : "0 1px 6px rgba(0,0,0,0.07)",
        borderColor: active
          ? "rgba(98,144,195,0.4)"
          : "rgba(168,144,128,0.13)",
        borderWidth: "1.5px",
      }}
      style={{ background: "#faf7f4", borderStyle: "solid" }}
    >
      {/* Accent bar */}
      <motion.div
        layout
        animate={{ height: active ? 3 : 0 }}
        transition={SPRING}
        className="absolute top-0 left-0 right-0 rounded-t-card bg-accent"
      />

      {/* Ghost icon — only shows when active, fades with resize */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 20, y: 20 }}
            animate={{ opacity: 0.14, scale: 1.2, x: 12, y: 12 }}
            exit={{ opacity: 0, scale: 0.7, x: 20, y: 20 }}
            transition={SPRING}
            className="pointer-events-none absolute right-0 bottom-0 text-surface"
          >
            <Icon size={160} strokeWidth={0.55} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-8 text-center">

        {/* Icon — uses AnimatePresence so flex recenter naturally (no text jump) */}
        <AnimatePresence initial={false}>
          {!active && (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={SPRING}
              className="text-accent"
            >
              <Icon size={48} strokeWidth={1.2} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name */}
        <motion.div
          animate={{
            color: active ? "var(--color-accent)" : "var(--color-bg)",
            fontSize: active ? "1.65rem" : "1.05rem",
          }}
          transition={SPRING}
          className="font-extrabold tracking-tight leading-[1.1]"
        >
          {name}
        </motion.div>

        {/* Desc */}
        <AnimatePresence initial={false}>
          {active && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 44, damping: 16, delay: 0.1 }}
              className="text-[0.8rem] font-medium text-[#7a6a62] leading-[1.72] max-w-[18rem]"
            >
              {desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { cols, rows } = gridTemplate(active);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const idx = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length * 1.05));
      setActive(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: `${FEATURES.length * 65}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-5 px-6">

        {/* Label */}
        <div className="flex items-center gap-2 self-start px-4 w-full max-w-300 mx-auto">
          <span className="text-[0.63rem] font-bold uppercase tracking-[0.18em] text-muted">Modes</span>
          <div className="w-10 h-px bg-[rgba(168,144,128,0.2)]" />
        </div>

        {/* Grid — fills most of the viewport */}
        <motion.div
          animate={{
            gridTemplateColumns: cols,
            gridTemplateRows: rows,
          }}
          transition={SPRING}
          style={{
            display: "grid",
            gap: "1rem",
            width: "min(1200px, 96vw)",
            height: "clamp(480px, 72vh, 700px)",
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.name}
              feature={f}
              active={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
