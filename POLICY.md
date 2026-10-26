# Policy

- Educational reference for limited permissions + `linkauth`
- Prefer **WharfKit** Session Kit + Anchor / Cloud Wallet over eosjs / UAL / standalone Anchor Link
- Never store **owner** keys in the browser
- Treat limited private keys as **compromisable**; revoke when leaked
- Avoid linking `eosio.token::transfer` unless the product truly requires it
- Live install/revoke is confirm-gated; practice on throwaway accounts first
