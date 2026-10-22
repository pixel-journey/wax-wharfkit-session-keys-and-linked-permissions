# VERIFICATION-LOG

**Trust label:** educational-reference  
**Updated:** 2026-10-22 (Pass 6)

| Claim | Status | Evidence |
|-------|--------|----------|
| Plan validation | **verified** (unit) | `src/plans.test.ts` |
| Markdown export | **verified** (unit) | `src/exportPlan.test.ts` |
| Presets | **verified** (unit) | `src/presets.test.ts` |
| Risk hints | **verified** (unit) | `src/riskHints.test.ts` |
| Live updateauth | **not claimed** | educational |
| get_account probe | optional soft-fail | may fail offline / CORS |

```bash
npm test && npm run typecheck
```
