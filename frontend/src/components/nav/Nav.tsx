"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/Button";

const links = [
  { href: "/",       label: "Home" },
  { href: "/about",  label: "About" },
  { href: "/models", label: "Models" },
  { href: "/docs",   label: "Docs" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-14 py-[1.4rem] bg-[rgba(44,44,44,0.9)] backdrop-blur-[14px]">
      {/* Logo */}
      <Link href="/" className="text-[1rem] font-extrabold text-[var(--color-surface)] tracking-[-0.01em] no-underline">
        hexal<span className="text-[var(--color-accent)]">.</span>lm
      </Link>

      {/* Pill — absolutely centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[0.2rem] bg-[var(--color-surface)] rounded-[var(--radius-pill)] p-[0.28rem]">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "inline-flex items-center px-4 py-[0.38rem] rounded-[var(--radius-pill)] text-[0.8rem] font-semibold no-underline transition-colors duration-[180ms]",
                active
                  ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                  : "text-[#7a6a62] hover:text-[var(--color-bg)]",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <Button variant="primary" size="sm">Get started</Button>
    </nav>
  );
}
