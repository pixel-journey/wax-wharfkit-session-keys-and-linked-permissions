# wax-wharfkit-session-keys-and-linked-permissions

> **Trust label:** `educational-reference`  
> **Status:** **Passes 1–14 · scope frozen** (2026-10-26)

Limited dApp **session keys** = custom permission + `linkauth` (WharfKit for install).

```bash
npm install && npm test && npm run build && npm run dev
```

- Plan / risk / export / drafts  
- Confirm-gated live install/revoke (Anchor + Cloud Wallet)  
- Preflight: validation + `get_account` + `linked_actions` match  
- Presets: gameplay, claim, harvest, ping, vote (caution)  

[EDUCATION.md](./EDUCATION.md) · [POLICY.md](./POLICY.md) · [WHARFKIT-CLUSTER.md](./WHARFKIT-CLUSTER.md)

Companions: [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) · [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) · [key rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) · [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) · [eosio.msig](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) · [hardware](https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns)

Official: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/). Demo contract `pxfarm.game` fits the 12-character name rule. Plans are unsigned until a wallet confirms them.

MIT — Pixel Journey
