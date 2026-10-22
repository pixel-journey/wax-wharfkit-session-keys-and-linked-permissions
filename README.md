# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 7 (severity · revoke sketch · JSON)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)

Limited dApp **session keys** = custom permission + `linkauth` — not Session Kit login.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Surface

| Piece | Role |
|-------|------|
| Presets + risk hints | Including transfer danger |
| `planSeverity` | 0–100 heuristic score |
| Install / revoke sketches | updateauth · linkauth · unlinkauth · deleteauth |
| Export | Markdown + JSON |
| Soft-fail `get_account` | Optional live permission names |

Prefer **WharfKit**; avoid eosjs / UAL / Anchor-Link-alone.

## License

MIT — **Pixel Journey**
