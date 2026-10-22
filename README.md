# wax-wharfkit-session-keys-and-linked-permissions

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 10 complete (education track capped)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)  
> **Cluster:** [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md)

Limited dApp **session keys** = custom permission + `linkauth` — **not** WharfKit Session Kit login.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Surface (Passes 1–10)

| Area | Features |
|------|----------|
| Plans | Validate, presets, severity, risk hints |
| Sketches | Install (`updateauth`/`linkauth`) · revoke (`unlinkauth`/`deleteauth`) |
| Live optional | Soft-fail `get_account` + match plan permission |
| Export | Markdown · JSON · localStorage draft |
| API | `src/index.ts` pure exports |

Prefer **WharfKit**. Avoid **eosjs** / **UAL** / standalone **Anchor Link** for greenfield.

No live authority writes from this tree.

## License

MIT — **Pixel Journey**
