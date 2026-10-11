# Production deployment — 2026-10-08

- URL: https://apartment-flow.vercel.app
- Vercel project: apartment-flow
- Deployment ID: dpl_9WQUCrYRNvfStvczaM7CRm9NM3GG
- Standalone static demo; no store/catalog changes.
- Publish source/index.html, source/assets/ and source/THIRD-PARTY-NOTICES.txt into a staging directory, copy deploy/vercel.json to its root, then run `vercel deploy --prod --yes --name apartment-flow --scope htmtslh-hubs-projects`.
- Public page returned HTTP 200. Browser rendered the glass layout; native scroll changed canvas from entrance to frame 81 and living-room content.
- Current mobile revision and Firefox remain NOT TESTED; see QA.md for existing limitations. This is an approved demo deployment, not a commercial template release.
