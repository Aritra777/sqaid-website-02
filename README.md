# SqAId website

The active website was rebuilt in September 2026 around Brain, ARGUS, ABACUS, KYC and UDM. It includes product-specific interactive illustrations, use-case stories and cross-product buyer journeys.

- [Rebuild handoff](docs/REBUILD-HANDOFF.md)
- [Content evidence and publication dependencies](docs/CONTENT-EVIDENCE.md)
- [Full planning blueprint](WEBSITE-REBUILD-PLAN.md)

## Local development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

## Validation and production preview

```sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Contact requests are prepared as emails in the visitor’s client. No backend submission, model calls or product database connection is made by this website. All interactive product data is illustrative.

## Structure

- `src/content`: product and solution content
- `src/pages/experience`: active page composition
- `src/components/experience`: interactive product workspaces and story components
- `src/styles`: shared theme and typography tokens
- `src/App.tsx`: routes and legacy redirects

The hosting environment must serve `index.html` for SPA routes. A common static-host `_redirects` rule is included; adapt routing on other hosting providers. Older source components remain available for reference, but the active pages are under `src/pages/experience`.
