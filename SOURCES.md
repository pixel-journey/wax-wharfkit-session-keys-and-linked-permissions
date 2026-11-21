# Sources

## Official WAX / permissions

| Source | Use |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Custom perms + linkauth |
| [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery) | Key habits |
| [docs.wax.io](https://docs.wax.io/) | Core concepts |

## WharfKit (primary stack)

| Source | Use |
| --- | --- |
| [WharfKit](https://wharfkit.com/) | Session install path |
| [wharfkit/skill](https://github.com/wharfkit/skill) | **Claude Code skill** — Session, Contract, patterns, resources |
| [@wharfkit/session](https://www.npmjs.com/package/@wharfkit/session) | Login / restore / transact |
| [@wharfkit/starter-wax](https://www.npmjs.com/package/@wharfkit/starter-wax) | WAX-preconfigured SessionKit |
| [@wharfkit/wallet-plugin-privatekey](https://www.npmjs.com/package/@wharfkit/wallet-plugin-privatekey) | Limited key plugin (never store owner keys in browser) |
| [@wharfkit/wallet-plugin-anchor](https://www.npmjs.com/package/@wharfkit/wallet-plugin-anchor) | Anchor under SessionKit |
| [@wharfkit/antelope](https://www.npmjs.com/package/@wharfkit/antelope) | Types, APIClient |
| [@wharfkit/cli](https://www.npmjs.com/package/@wharfkit/cli) | Contract codegen |

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

Prefer **SessionKit** over eosjs / standalone Anchor Link / UAL for greenfield work. See [WHARFKIT-CLUSTER.md](WHARFKIT-CLUSTER.md).

## Product facts

- Demo contract name **`pxfarm.game`** (11 chars); 13-char variants refused by the name rule.
- Pattern: custom permission under `active` + **linkauth** to specific actions.
- Install/revoke require **active**; limited key is disposable.
- Plans remain **unsigned** in the educational path.
- Do **not** linkauth open `eosio.token::transfer` to a session key.

## Related labs

| Lab | Role |
| --- | --- |
| [permission visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) | Tree view |
| [permission auditor](https://github.com/pixel-journey/wax-account-permission-auditor) | Risk scoring |
| [key rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) | Add-first sequence |
| [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) | Owner backup (not session keys) |
| [offline queue](https://github.com/pixel-journey/wax-offline-transaction-queue) | Drain via Session |
