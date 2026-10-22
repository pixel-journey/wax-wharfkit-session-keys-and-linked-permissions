# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 8 (probe match)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)

Limited dApp **session keys** = custom permission + `linkauth` — not Session Kit login.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Surface

| Piece | Role |
|-------|------|
| Risk + severity | Heuristic safety |
| Install / revoke sketches | Not broadcast |
| Soft-fail `get_account` | List permission names |
| `matchPlanToProbe` | Is planned perm present? parent match? |

Prefer **WharfKit**; avoid eosjs / UAL / Anchor-Link-alone.

## License

MIT — **Pixel Journey**
