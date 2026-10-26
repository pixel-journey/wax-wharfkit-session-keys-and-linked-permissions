# Limited session keys on WAX / Antelope

## What “session key” means here

A **limited dApp session key** is **not** a WharfKit Session object alone. It is an **on-chain** pattern:

1. Create a **custom permission** under `active` (e.g. `gameplay`, `claim`) with its **own public key**
2. **`linkauth`** that permission to specific `contract::action` pairs only
3. Let the dApp hold the matching **private** key for routine calls — **without** prompting full wallet for every harvest

WharfKit **Session Kit** is how you **install** those links (once, with `active`) and how the wallet signs normal txs. The limited key is optional for high-frequency game UX.

## Myths vs reality

| Myth | Reality |
|------|---------|
| “Session keys mean the wallet never signs” | Install/revoke still needs `active` (or higher). Only **linked** actions can use the limited key. |
| “linkauth to eosio.token::transfer is fine for votes” | Open transfer is high risk — prefer a dedicated contract action. |
| “This replaces owner backup” | No — see social-recovery blueprint. Limited keys are disposable. |
| “eosjs is fine for new dApps” | Prefer WharfKit Session + Anchor / Cloud Wallet plugins. |
| “One key for the whole game is enough” | Scope links narrowly (claim ≠ transfer ≠ admin). |

## Install flow (conceptual)

```
active signs:
  updateauth  → permission gameplay (key = PUB_session)
  linkauth    → pxfarmer.game::claim  → gameplay
  linkauth    → pxfarmer.game::harvest → gameplay

Later, dApp uses private session key only for those actions.
Revoke: unlinkauth / updateauth delete — again with active.
```

## Related

- multi-sig · hardware · social recovery · permission visualizer · offline queue  
- [WHARFKIT-CLUSTER.md](./WHARFKIT-CLUSTER.md)
