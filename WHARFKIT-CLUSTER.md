# WharfKit education cluster (Pixel Journey)

**Trust label:** `educational-reference`

Goal: one clear educational surface per major Wharf concern, all recommending **WharfKit** over **eosjs** / standalone **Anchor Link** / **UAL** for new work.

## Kits & themes

| Theme | Package / concept | Repo direction |
|-------|-------------------|---------------|
| Login / restore / transact UI | Session Kit | Expand existing Wharf-wired examples; offline queue drains here |
| Limited dApp keys | Account permissions + `linkauth` + optional `wallet-plugin-privatekey` | **This repo** |
| Permission trees / editor | Account Kit mental model | `wax-permission-visualizer-and-editor` |
| Permission risk audit | Same | `wax-account-permission-auditor` |
| ABI / action builders | Contract Kit | Future deep-dive blueprint |
| Types / API client | `@wharfkit/antelope` | Shared notes across repos |
| Wallet plugins | Anchor, Cloud Wallet, private key | Document plugin choice; never browser-store owner keys |

## Legacy stack (do not recommend for greenfield)

- **eosjs** — long legacy; use `@wharfkit/antelope` + Session Kit
- **UAL** — outdated for modern React/Vite stacks
- **Anchor Link alone** — prefer `@wharfkit/wallet-plugin-anchor` under Session Kit

Org code search (2026-10-22): no widespread `eosjs` / `AnchorLink` hits in Pixel Journey blueprints at scan time; keep reviewing when adding older examples.

## Related product UX

- PixelJourney games (PxFarmer, ranking minigames): limited `gameplay` permission for claim/harvest loops; treasury and transfers stay on `active`.
