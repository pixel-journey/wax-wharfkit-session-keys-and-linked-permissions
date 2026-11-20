# Education — limited session keys on WAX / Antelope

> **Rung:** `npm test` passes. Plans are **unsigned**. Demo contract `pxfarm.game` (11 characters). An Antelope name is at most **12**; a longer `farmer` spelling is 13 and the name rule refuses it.  
> **The test is the rule.** Official: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Describe custom permission + `linkauth` to specific actions |
| Intermediate | Explain install/revoke still need `active` |
| Masterclass | Refuse open `eosio.token::transfer` as a "session" link |

---

## Beginner — what session key means here

A **limited dApp session key** is not a WharfKit Session object alone. It is an **on-chain** pattern:

1. Create a **custom permission** under `active` (e.g. `gameplay`, `claim`) with its own public key  
2. **`linkauth`** that permission to specific `contract::action` pairs only  
3. Let the dApp hold the matching **private** key for routine calls — without prompting the full wallet for every harvest

WharfKit Session Kit installs those links (once, with `active`) and signs normal txs. The limited key is optional for high-frequency game UX.

```bash
npm test
```

---

## Intermediate — install flow

```text
active signs:
  updateauth  → permission gameplay (key = PUB_session)
  linkauth    → pxfarm.game::claim   → gameplay
  linkauth    → pxfarm.game::harvest → gameplay

Later: dApp uses private session key only for those actions.
Revoke: unlinkauth / updateauth delete — again with active.
```

### Myths

| Myth | Reality |
| --- | --- |
| Wallet never signs | Install/revoke still need `active` |
| linkauth transfer for "games" | Open transfer is high risk |
| Replaces owner backup | No — limited keys are disposable |
| eosjs is fine greenfield | Prefer WharfKit + Anchor / Cloud Wallet |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Open `eosio.token::transfer` as session | refuse / high risk |
| 13-character demo name | refused |
| Treat as social recovery | different product |

---

## Masterclass

### Common mistakes

1. Linking `eosio.token::transfer` for convenience.  
2. Using a 13-character demo account name.  
3. Treating session keys as social recovery.

### Cluster

Visualizer · auditor · rotation · social recovery · msig · hardware patterns.

### Exercises

1. Who signs install/revoke? (**active**.)  
2. Max Antelope name length? (**12**.)  
3. Is open transfer a good session link? (**No**.)

---

## What this course will not teach

- Auto-broadcast of `updateauth` / `linkauth`
- Collecting private keys in the educational UI
