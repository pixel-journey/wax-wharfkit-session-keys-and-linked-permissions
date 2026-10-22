# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)  
> **Cluster map:** [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md)

Educational blueprint for **limited dApp “session keys”** on WAX / Antelope — **not** the same thing as WharfKit **Session Kit** login sessions.

## Two different “sessions”

| Term | What it is |
|------|------------|
| **WharfKit Session** | App ↔ wallet connection after `SessionKit.login()` / `restore()`. User’s wallet still signs each `session.transact`. |
| **Limited permission / “session key”** | A **custom account permission** (child of `active`) with its **own keypair**, restricted via **`linkauth`** to specific `contract::action` pairs. The dApp (or a local signer) can sign those allowed actions **without** prompting the main wallet every time. |

This repo teaches the **second** pattern.

## Why games and UX care

- Claim / craft / harvest loops should not require a wallet popup on every click.
- A compromised app key can only call **linked** actions if designed correctly.
- High-value moves still go through `active` / hardware / multi-sig.

## Prefer WharfKit tooling

| Use | Avoid for new work |
|-----|--------------------|
| `@wharfkit/session` + wallet plugins | **eosjs** |
| `@wharfkit/account` (`Permission`, linked actions) | Ad-hoc-only authority handling |
| `@wharfkit/antelope` | Legacy greenfield `@greymass/eosio` |
| `@wharfkit/wallet-plugin-privatekey` **only** for the limited key | Putting **owner/active** keys in the browser |
| `@wharfkit/wallet-plugin-anchor` for full-authority login | Standalone **Anchor Link** as primary integration |

## Core on-chain steps (conceptual)

1. Generate a keypair used **only** for this dApp scope.
2. `updateauth` — create e.g. `gameplay` under `active`.
3. `linkauth` — link that permission to each allowed `contract` + `action`.
4. Build a WharfKit `Session` with `permission: "gameplay"` and a signer for that key.
5. `session.transact` only for linked actions.

Pure helpers in `src/plans.ts` validate plans and sketch install actions (**no broadcast**).

## Status

🔄 Pass 1 — concepts + pure models. Next: optional WharfKit-wired sketches, UI planner, deepen permission visualizer/auditor.

## License

MIT — **Pixel Journey**
