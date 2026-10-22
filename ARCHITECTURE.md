# Architecture — limited session keys (educational)

```
┌─────────────┐     updateauth + linkauth      ┌──────────────────┐
│ User wallet │ ─────────────────────────────► │ Account on WAX   │
│ (active)    │   one-time install (Session    │ @gameplay + links│
└─────────────┘    Kit / Anchor plugin)        └────────┬─────────┘
                                                       │
                       linked actions only             │
┌─────────────┐     Session + limited key      ┌───────▼─────────┐
│ dApp client │ ─────────────────────────────► │ Game contract   │
│ (routine)   │   no full wallet prompt        │ claim/harvest…  │
└─────────────┘                                └─────────────────┘
```

## Layers in this repo

| Layer | Files | Side effects |
|-------|-------|--------------|
| Pure plans | `types.ts`, `plans.ts`, `presets.ts`, `exportPlan.ts` | None |
| UI | `PlanPlanner.tsx` | Clipboard only |
| Notes | `wharfNotes.ts`, `WHARFKIT-CLUSTER.md` | None |

Host apps add: key generation, real WharfKit `Session`, RPC `get_account` after install.

## Security boundary

- Limited key may live in app memory for UX; treat as **compromisable**.
- `active` / `owner` stay in wallet or hardware.
- Prefer **not** linking `eosio.token::transfer` unless the product truly requires it (see vote caution preset).
