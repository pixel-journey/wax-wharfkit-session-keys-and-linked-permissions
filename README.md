# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 2 — interactive plan planner  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)  
> **Cluster map:** [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md)

Educational blueprint for **limited dApp “session keys”** on WAX / Antelope — **not** the same thing as WharfKit **Session Kit** login sessions.

## Two different “sessions”

| Term | What it is |
|------|------------|
| **WharfKit Session** | App ↔ wallet after `login` / `restore`. Wallet signs each `transact`. |
| **Limited permission / “session key”** | Custom permission + key, **`linkauth`**-scoped to specific actions. App can sign those without main-wallet prompts. |

## Quick start

```bash
npm install && npm test && npm run dev
```

## Pass 2 surface

| Piece | Role |
|-------|------|
| `validatePlan` / `installActionSketches` | Pure models |
| `PlanPlanner` | Edit links, see install sketch |
| `wharfNotes` | Recommended packages vs eosjs/UAL/Anchor-Link |

Still **no** live `updateauth` / broadcast from this tree.

## License

MIT — **Pixel Journey**
