# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 5 (post-complete deepen)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)  
> **Cluster:** [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md)

Limited dApp **session keys** = custom permission + `linkauth` — not WharfKit Session Kit login.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Surface

| Piece | Role |
|-------|------|
| Plans + presets | Gameplay, claim-only, vote (caution) |
| Plan planner | Edit links, export markdown |
| Revocation checklist | unlinkauth → updateauth → get_account |
| Architecture | Security boundary diagram |

Prefer **WharfKit**; avoid eosjs / UAL / Anchor-Link-alone for greenfield.

## License

MIT — **Pixel Journey**
