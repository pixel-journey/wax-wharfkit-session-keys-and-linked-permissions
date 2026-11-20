# Security — limited session keys

## Closed in product rules

| Issue | Behavior |
| --- | --- |
| Account name length | Antelope 1..12; demo `pxfarm.game` ok |
| Plans | unsigned until a wallet confirms |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Scope of `linkauth` | Prefer dedicated game actions, not open transfer |
| Key custody | Session private key is sensitive; rotate on compromise |
| Install authority | Still requires `active` |

## Attack angles

1. Over-broad links (any transfer).  
2. Skipping revoke after a leaked session key.  
3. Confusing WharfKit Session with on-chain limited authority.

## Honesty limits

No broadcast in unit tests. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).
