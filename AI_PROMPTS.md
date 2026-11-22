# AI handoff — session keys and linked permissions

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

Read [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md) before inventing a second login stack.

| Package | Role |
| --- | --- |
| `@wharfkit/session` | Login / restore / transact |
| `@wharfkit/starter-wax` | WAX SessionKit preset |
| `@wharfkit/wallet-plugin-anchor` | Anchor under SessionKit |
| `@wharfkit/wallet-plugin-privatekey` | Limited disposable key only |
| `@wharfkit/antelope` | Name, PermissionLevel, APIClient |

## Non-negotiables

1. Custom permission under **active** + **linkauth** to specific actions only.
2. Never linkauth open **`eosio.token::transfer`** to a session key.
3. Install/revoke require **active**; session key is disposable.
4. Educational plans stay **unsigned** unless a host explicitly integrates SessionKit.
5. Prefer WharfKit over eosjs / UAL / bare Anchor Link for greenfield.
6. `@wharfkit/starter-wax` is WAX-shaped. Other chains need SessionKit with that chain's id and node URL. WAX mainnet chain id is `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`.

## Prompt seeds (safe)

- "Design a gameplay permission that can claim/harvest but cannot transfer WAX."
- "List linkauth pairs for pxfarm.game; refuse any transfer link."
- "Explain why owner keys must not live in browser storage; point at wallet plugins."
- "Cross-link permission visualizer and auditor before any live updateauth."
- "Port this pattern to another Antelope chain: keep linkauth narrow, swap chain id and starter preset."

## Do not

- Store owner private keys in localStorage.
- Teach eosjs as the default modern path.
- Treat session keys as social-recovery owner backups.
- Claim starter-wax works unchanged on EOS without swapping chain config.
