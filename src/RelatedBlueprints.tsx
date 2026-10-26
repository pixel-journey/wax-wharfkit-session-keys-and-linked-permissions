"use client";

import { useId } from "react";

const LINKS = [
  {
    name: "wax-permission-visualizer-and-editor",
    href: "https://github.com/pixel-journey/wax-permission-visualizer-and-editor",
    why: "See the full authority tree after adding a limited permission.",
  },
  {
    name: "wax-account-permission-auditor",
    href: "https://github.com/pixel-journey/wax-account-permission-auditor",
    why: "Flag over-broad keys and missing multi-sig on owner/active.",
  },
  {
    name: "wax-hardware-wallet-integration-patterns",
    href: "https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns",
    why: "Keep high-value active/owner on hardware; session keys stay narrow.",
  },
  {
    name: "wax-offline-transaction-queue",
    href: "https://github.com/pixel-journey/wax-offline-transaction-queue",
    why: "Queue drafts offline; drain full-authority actions with Session Kit, not the limited key.",
  },
  {
    name: "wax-social-recovery-and-key-backup-tools",
    href: "https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools",
    why: "Owner/active recovery is separate from disposable gameplay keys.",
  },
  {
    name: "wax-multi-sig-proposal-builder-and-simulator",
    href: "https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator",
    why: "Team accounts may install limited perms via msig instead of a single active key.",
  },
  {
    name: "wax-safe-key-rotation-assistant",
    href: "https://github.com/pixel-journey/wax-safe-key-rotation-assistant",
    why: "Rotate compromised limited keys without touching owner.",
  },
] as const;

export function RelatedBlueprints({ className = "" }: { className?: string }) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Related blueprints
      </h3>
      <p className="text-sm text-white/60 mb-4">
        Limited keys are one slice of permission hygiene. Pair with audit,
        hardware, and recovery patterns before mainnet.
      </p>
      <ul className="space-y-3">
        {LINKS.map((l) => (
          <li key={l.href} className="text-sm">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-emerald-400 underline-offset-2 hover:underline"
            >
              {l.name}
            </a>
            <p className="text-white/55 text-xs mt-0.5 leading-relaxed">{l.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
