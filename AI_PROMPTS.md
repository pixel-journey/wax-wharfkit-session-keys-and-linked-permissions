# AI handoff — session keys and linked permissions

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

Read [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md) before inventing a second login stack.

| Package | Role |
| --- | --- |
| `@wharfkit/session` | Login / restore / transact |
| `@wharfkit/starter-wax` | WAX SessionKit |
| `@wharfkit/wallet-plugin-anchor` | Anchor under SessionKit |
| `@wharfkit/wallet-plugin-privatekey` | Limited disposable key only |
| `@wharfkit/antelope` | Name, PermissionLevel, APIClient |

## Non-negotiables

1. Custom permission under **active** + **linkauth** to specific actions only.
2. Never linkauth open **`eosio.token::transfer`** to a session key.
3. Install/revoke require **active**; session key is disposable.
4. Educational plans stay **unsigned** unless a host explicitly integrates SessionKit.
5. Prefer WharfKit over eosjs / UAL / bare Anchor Link for greenfield.

## Prompt seeds (safe)

- "Design a gameplay permission that can claim/harvest but cannot transfer WAX."
- "List linkauth pairs for pxfarm.game; refuse any transfer link."
- "Explain why owner keys must not live in browser storage; point at wallet plugins."
- "Cross-link permission visualizer and auditor before any live updateauth."

## Do not

- Store owner private keys in localStorage.
- Teach eosjs as the default modern path.
- Treat session keys as social-recovery owner backups.
