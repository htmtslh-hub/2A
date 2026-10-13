# Verdant 1.0.0 production release

- Source commit: b1045bf, pushed to origin/master.
- Deployment: dpl_9X7MPYaaLfNGb4N3A1iNGUGDbjTP, READY.
- Hosting URL: https://web-5bx7j5t5b-htmtslh-hubs-projects.vercel.app
- Store: https://forgezone.store/?mau=t28
- Demo: https://forgezone.store/demos/verdant/index.html
- ZIP: 787117 bytes, SHA-256 7bdaa4022c83b997ff24678eddeec2cbe0a9bf2e12522cded9586a7e4fd3809d; private download route only.
- Video: 579837 bytes, 14.966667s, revision 5004143808f9.

Deployed from an isolated managed worktree based on production HEAD, containing only the new commit. Existing public asset bytes were copied from the verified primary checkout to preserve manifest hashes when Windows Git autocrlf expands LF during checkout. Whitespace-ignoring Git diff showed no other product code changes; all 28 preview/demo manifest hashes passed in the isolated checkout and Vercel remote build. No global Git/config/rules modification was introduced.

Online verification: all new public hashes match, carousel and scroll on four installed browsers, three-language store details/library/guide, preview policies and private ZIP guards. Read QA.md for limitations. Follow-up QA-only commits do not change or require redeploying the delivered runtime/ZIP.
