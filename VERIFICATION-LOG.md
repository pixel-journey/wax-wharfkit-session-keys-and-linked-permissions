# VERIFICATION-LOG

**Trust label:** educational-reference  
**Updated:** 2026-10-22 (Pass 8)

| Claim | Status | Evidence |
|-------|--------|----------|
| Plan / risk / severity / revoke / JSON | **verified** (unit) | plans, riskHints, pass7 tests |
| matchPlanToProbe | **verified** (unit) | `src/matchProbe.test.ts` |
| Live chain writes | **not claimed** | educational only |
| get_account | optional soft-fail | CORS / offline may fail |

```bash
npm test && npm run typecheck
```
