# VERIFICATION-LOG

**Trust label:** educational-reference  
**Updated:** 2026-10-22 (Pass 10 — education track capped)

| Claim | Status | Evidence |
|-------|--------|----------|
| Plans / risk / severity / revoke / JSON | **verified** (unit) | multiple `src/*.test.ts` |
| matchPlanToProbe | **verified** (unit) | `matchProbe.test.ts` |
| comparePresetSeverities | **verified** (unit) | `pass910.test.ts` |
| Live authority writes | **not claimed** | educational only |
| get_account / localStorage | soft-fail optional | may fail offline |

```bash
npm test && npm run typecheck
```
