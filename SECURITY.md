# Security — limited session keys

## Closed in product rules / tests

| Issue | Behavior |
| --- | --- |
| Account name length | Antelope 1..12; demo `pxfarm.game` ok; 13-char refused |
| Plans | unsigned until a wallet confirms |
| Open `eosio.token::transfer` as session link | refuse / high risk |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Scope of `linkauth` | Prefer dedicated game actions (`claim`, `harvest`), not open transfer |
| Key custody | Session private key is sensitive; rotate on compromise |
| Install / revoke authority | Still requires `active` |
| Link drift | Re-audit `linkauth` after contract upgrades |

## Attack angles

1. Over-broad links (any `eosio.token::transfer`).  
2. Skipping `unlinkauth` / key delete after a leaked session key.  
3. Confusing WharfKit Session objects with on-chain limited authority.  
4. Treating session keys as social recovery or owner backup.  
5. Auto-broadcasting `updateauth` / `linkauth` from unit tests or educational UI.

## Honesty limits

No broadcast in unit tests. Install still needs `active`. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/). Cluster: visualizer · auditor · rotation · social recovery · hardware patterns.
