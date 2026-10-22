# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 6 (risk hints + optional get_account probe)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)

Limited dApp **session keys** = custom permission + `linkauth` — not Session Kit login.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Surface

| Piece | Role |
|-------|------|
| Presets | Gameplay / claim-only / vote caution |
| `riskHintsForPlan` | Flags transfer & account-control links |
| `probeAccountPermissions` | Soft-fail live permission names |
| Export + revocation | Markdown checklist |

Prefer **WharfKit**; avoid eosjs / UAL / Anchor-Link-alone.

## License

MIT — **Pixel Journey**
