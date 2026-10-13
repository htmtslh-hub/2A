# Orbit Academy 1.0.0 release

Source commit d4a2490, origin/master. Deployment dpl_G64qnefAAR4P3KHhtt9Kn5981EDx READY; https://web-f9bh8bvxz-htmtslh-hubs-projects.vercel.app aliased to https://forgezone.store.

- Store: https://forgezone.store/?mau=t29
- Demo: https://forgezone.store/demos/orbit-academy/index.html
- Category: education — confirmed in Vietnamese, English and Chinese.
- Private ZIP: 911449 bytes, SHA-256 3cdef6f5144a0446bd5b8f54a8bd28de3dc352dcde35cae57d5210fe25e5a14b.
- Video: 1016089 bytes, 14.966667s, 960×600/30fps, H.264/yuv420p, muted, faststart; revision754f778973df.

Deployment used an isolated managed worktree on the verified production base plus this product commit. Existing public runtime bytes were preserved from the primary verified checkout because Windows Git autocrlf expands line endings on checkout. Whitespace-ignoring diff showed no other code change. All29 demo/video manifest checks passed both in that checkout and Vercel remote build. No common configuration, rules, price, payment or database change.

Online checks passed: eleven public hashes (nine new resources + two existing pages), protected ZIP guards, three-language store/guide/category, preview behaviour and all four browsers' actual educational/carousel/scroll interactions. See QA for exact evidence and untested Safari/physical-device/actual paid-download limitations. Follow-up evidence commits do not alter the delivered runtime or require redeployment.
