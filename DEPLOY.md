# Deploy

```bash
npm install && npm test && npm run dev
```

## Vercel

Import `pixel-journey/wax-wharfkit-session-keys-and-linked-permissions` as Next.js. No secrets for education-only mode. Live wallet login needs HTTPS + wallet popup allowlist.

CI: `.github/workflows/ci.yml` — test, typecheck, build. No mainnet authority writes in CI.
