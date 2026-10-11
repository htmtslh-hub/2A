# LingoGlass restoration — 2026-10-11

The active local master checkout omitted LingoGlass even though commits `7c9e9e8` (application/demo/package) and `0c1adda` (catalog integration) exist in repository history and later release branches. The Agent/Tool group was rendering placeholders unconditionally.

Restored the application directory, demo and preview from `7c9e9e8`, without modifying the desktop application source. Reconnected the catalog, third product group, protected ZIP download and Next deployment trace. LingoGlass uses `a1`, because the current catalog already assigns historical LingoGlass slot `t14` to Watchroom; existing current product IDs were preserved. No historical order records were migrated.

Individual price is USD 20. Pro/Ultra access checks remain in force. Product families are filtered so web templates remain in Web and LingoGlass appears in Agent/Tool. App details and its specific guide describe the source/documentation package accurately. The historical ZIP contains a built interface and source, but no standalone Windows/macOS installer; desktop activation is a separate existing application mechanism.

Store TypeScript excludes independent `product/**` projects, as in the later Mint Atlas release, instead of checking Electron/Vite code with storefront dependencies. The download trace explicitly includes only the LingoGlass agent ZIP alongside the existing web ZIPs. Product-specific preview CSS preserves the full app image.

Validation: production build passed; download trace contains `product/agent/lingoglass/lingoglass.zip`. Browser restoration checks cover Chromium at 1440px and 390px in Vietnamese, English and simplified Chinese, with browser APIs mocked: Agent card, USD 20, preview, detail, demo HTTP 200 and isolation from Watchroom's `t14` web card. Membership offline regression checks passed after adding the catalog entry. Screenshots are stored beside this report.

No database writes, live payments, desktop app execution or deployment were performed. Original desktop source was restored, not upgraded. Production rollout must also respect the pending membership migration from the preceding task.
