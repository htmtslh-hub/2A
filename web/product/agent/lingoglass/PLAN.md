# LINGOGLASS PLAYER
## MASTER PRODUCT & DEVELOPMENT PLAN v4.1

* **Sản phẩm:** LingoGlass Player
* **Loại:** Cross-Platform Language Learning Media Player
* **Nền tảng mục tiêu:** Windows 10/11, macOS Intel, macOS Apple Silicon
* **Trạng thái hiện tại:** Functional Alpha
* **Mục tiêu:** LingoGlass Player 1.0 Stable
* **Triết lý sản phẩm:** LIGHTWEIGHT • KEYBOARD-FIRST • LOCAL-FIRST • MULTI-FORMAT • MULTILINGUAL • ZERO-CONFIG • SECURE-BY-DESIGN

---

## I. PRODUCT VISION

LingoGlass không phải là một trình phát video thông thường được gắn thêm một vài chức năng học ngoại ngữ.

LingoGlass được định nghĩa là:
> **"LANGUAGE LEARNING MEDIA PLAYER"**

Ứng dụng cho phép người dùng xem nội dung media và học ngoại ngữ ngay trong cùng một môi trường, không phải chuyển qua nhiều phần mềm khác nhau.

### Learning Flow:
```
WATCH → LISTEN → UNDERSTAND → REPEAT → SHADOW → SAVE → REVIEW
```

**Nguyên tắc quan trọng:**
* **VIDEO / AUDIO** luôn là trung tâm của giao diện.
* Các chức năng học chỉ xuất hiện khi người dùng cần.

---

## II. PRODUCT GOALS

LingoGlass phải đáp ứng đồng thời các mục tiêu:
1. Nhẹ.
2. Playback ổn định.
3. Không tạo tải CPU/GPU không cần thiết.
4. Hỗ trợ nhiều định dạng media.
5. Hỗ trợ nhiều định dạng subtitle.
6. Keyboard-first.
7. Người mới vẫn sử dụng chuột dễ dàng.
8. Một installer duy nhất.
9. Không yêu cầu cài codec/runtime thủ công.
10. Giao diện hiện đại nhưng không rối.
11. Hỗ trợ học nhiều ngôn ngữ.
12. Hoạt động tốt khi không có Internet.
13. Bảo vệ sản phẩm khỏi việc sao chép/crack ở mức thương mại hợp lý.
14. Không chứa production secret trong client.
15. Có khả năng cập nhật an toàn.
16. Không làm mất dữ liệu người học khi nâng cấp phiên bản.

---

## III. CORE PRODUCT PRINCIPLES

### PRINCIPLE 1 — LIGHTWEIGHT BY DESIGN
Không đặt mục tiêu: *"Không sử dụng GPU."* Video playback nên sử dụng GPU/hardware decoder khi điều đó giúp giảm tải CPU.
* **Ưu tiên:** Hardware Decode
* **Fallback:** Software Decode Fallback (khi hardware decoder không hỗ trợ hoặc lỗi)

Không chạy background task nặng nếu người dùng không sử dụng chức năng đó.
* Không mở video rồi lập tức: phân tích toàn bộ waveform, khởi tạo AI, load toàn bộ dictionary, scan toàn bộ vocabulary, chạy indexing nặng.
* **Startup path phải ngắn:** `Launch → Window → Media → Subtitle → Playback`. Các module khác lazy-load khi cần.

### PRINCIPLE 2 — KEYBOARD-FIRST
Người dùng thường xuyên phải có thể thao tác phần lớn ứng dụng bằng bàn phím.
* **Nhưng:** Keyboard-first ≠ Keyboard-only.
* Mọi chức năng quan trọng vẫn phải sử dụng được bằng chuột.

### PRINCIPLE 3 — ZERO-CONFIG INSTALLATION
* **User Flow:** `Download → Install → Launch → Use`
* Không yêu cầu người dùng tự cài: Node.js, Python, Rust, FFmpeg, Codec Pack, Command Line Tools, Environment Variables, Runtime dành cho developer.

### PRINCIPLE 4 — BALANCED UI
Không được:
* Quá tối giản đến mức thiếu chức năng
* Quá nhiều nút gây rối
* Biến video player thành dashboard

Sử dụng **PROGRESSIVE DISCLOSURE**:
* **Level 1:** WATCH MODE
* **Level 2:** LEARNING TOOLS
* **Level 3:** ADVANCED SETTINGS

### PRINCIPLE 5 — MULTI-FORMAT
Người dùng không cần biết: Codec là gì? Container là gì? Decoder là gì?
* **Mục tiêu UX:** `Open → Play`

### PRINCIPLE 6 — MULTILINGUAL
Không hard-code `English` và `Vietnamese` trong Core Architecture.
Sử dụng: `SourceLanguage` và `TargetLanguage`
* Ví dụ: English → Vietnamese, Japanese → Vietnamese, Korean → English, French → Vietnamese, Chinese → English.

### PRINCIPLE 7 — COMMERCIAL PROTECTION
Không tuyên bố: *"LingoGlass không thể crack."*
* **Mục tiêu:** *"LingoGlass phải làm tăng đáng kể chi phí, thời gian và độ khó của việc sao chép, reverse-engineering và bypass license, trong khi không làm phiền người dùng hợp pháp."*

---

## IV. CURRENT PRODUCT STATUS

Các module hiện tại được coi là: **FUNCTIONAL COMPLETE**, không đồng nghĩa **PRODUCTION COMPLETE**.

| Module | Functional | Production |
| :--- | :--- | :--- |
| Glass UI | YES | PENDING |
| Video Playback | YES | PENDING |
| A-B Repeat | YES | PENDING |
| Waveform | YES | PENDING |
| Subtitle | YES | PENDING |
| Dictionary | YES | PENDING |
| Vocabulary | YES | PENDING |
| Shadowing | YES | PENDING |
| Recording | YES | PENDING |
| Desktop Packaging | YES | PENDING |

**Trạng thái dự án hiện tại:** `LINGOGLASS FUNCTIONAL ALPHA`

---

## V. FEATURE STATUS MODEL

Không sử dụng: *"100% COMPLETE"* chỉ vì chức năng đã chạy. Sử dụng các trạng thái:
1. **FUNCTIONAL COMPLETE:** Feature hoạt động đúng chức năng cơ bản.
2. **TESTED:** Có unit test, integration test, regression test phù hợp.
3. **PERFORMANCE READY:** Đạt performance budget.
4. **SECURITY READY:** Đạt security requirements.
5. **PRODUCTION READY:** Có error handling, persistence, compatibility testing, migration, stability.
6. **RELEASE READY:** Có installer, code signing, updater, documentation, release verification.

---

## VI. ARCHITECTURE DECISION

Không rewrite Electron ngay lập tức.
Architecture hiện tại: `Electron + React + TypeScript + HTML5 Media`
Phải benchmark trước khi quyết định giữa 3 candidates:
* **OPTION A:** Electron + HTML5 Video
* **OPTION B:** Electron + Native Media Engine (libVLC / mpv)
* **OPTION C:** Tauri + React + Rust Core + Native Media Engine

---

## VII. ARCHITECTURE DECISION GATE

Tạo prototype cho cả các phương án khả thi.
* **Test Media:** MP4 H.264, MKV HEVC, WebM VP9, AV1, 4K sample, 2-hour video, ASS subtitle, SRT subtitle.
* **Đo:** cold startup, warm startup, RAM, CPU, GPU, seek latency, dropped frames, battery impact, installer size, codec support, build complexity, security surface, maintainability.
* **Output:** ADR-001 Desktop Framework, ADR-002 Media Engine, ADR-003 Codec Strategy, ADR-004 Security Architecture, ADR-005 Distribution Strategy.
* *Không chuyển architecture bằng cảm tính.*

---

## VIII. TARGET ARCHITECTURE

Nếu benchmark xác nhận Tauri + Native Engine phù hợp:
```
                        LINGOGLASS
                            │
                        React UI
                            │
                       Tauri Shell
                            │
                        Rust Core
              ┌─────────────┼─────────────┐
              │             │             │
         Playback Core  Learning Core Security Core
              │             │             │
         Media Engine   Subtitle      License Engine
         Waveform       Dictionary    Activation
         Audio          Vocabulary    Integrity
         Decoder        Shadowing     Secure Storage
              │             │             │
              └─────────────┼─────────────┘
                            │
                       Persistence
                            │
                      Windows/macOS
```

Nếu giữ Electron:
```
React Renderer → Restricted Preload API → Electron Main Process → Native Core → Media Engine
```
**QUY TẮC BẮT BUỘC:** Privileged logic không được nằm trực tiếp trong React UI.

---

## IX. MEDIA ENGINE STRATEGY

* **Candidate:** libVLC, libmpv, platform-native decoding, giải pháp khác nếu benchmark chứng minh tốt hơn.
* **Tiêu chí:** format support, hardware acceleration, CPU/GPU usage, seek accuracy, subtitle/audio track support, stability, license, installer footprint, cross-platform support.
* Cân bằng giữa: *Compatibility - Performance - Security - License - Installer Size - Maintainability*.

---

## X. MEDIA FORMAT MATRIX

* **TIER A — TARGET OFFICIAL SUPPORT:**
  * Containers: `MP4`, `MKV`, `WebM`, `MOV`
  * Video codecs: `H.264`, `H.265 / HEVC`, `VP9`, `AV1`
  * Audio codecs: `AAC`, `MP3`, `Opus`, `FLAC`, `WAV`
* **TIER B — COMPATIBILITY TARGET:**
  * `AVI`, `WMV`, `MPEG-TS`, `M2TS`, `MPEG-PS`, `FLV`, `OGG`
* *Chỉ công bố một format là OFFICIALLY SUPPORTED sau khi compatibility test pass.*

---

## XI. AUDIO-ONLY LEARNING

LingoGlass có thể mở: `MP3`, `AAC`, `M4A`, `FLAC`, `WAV`, `OGG`, `Opus`.
Cho phép người dùng học từ: podcast, audiobook, listening course, audio lesson.

---

## XII. SUBTITLE ENGINE

* **V1 ưu tiên:** `SRT`, `VTT`, `ASS`, `SSA`
* **Parser phải xử lý:** UTF-8, UTF-8 BOM, CRLF, LF, multiline subtitle, malformed timestamps, missing indexes, overlapping cues, duplicate timestamps, supported styling, invalid tags.
* **Subtitle Offset:** `-500ms`, `-100ms`, `RESET`, `+100ms`, `+500ms`
* **Keyboard:** `[` (Subtitle earlier), `]` (Subtitle later)

---

## XIII. SUBTITLE SECURITY

**Subtitle là: UNTRUSTED INPUT**
* Không render raw HTML trực tiếp.
* Không sử dụng raw `dangerouslySetInnerHTML` với nội dung subtitle chưa sanitize.
* **Pipeline:** `Subtitle File → Parse → Normalize → Sanitize → Internal Subtitle Model → Controlled Rendering`

---

## XIV. MULTILINGUAL SUBTITLE MODEL

Không sử dụng model kiểu: `englishText`, `vietnameseText`.
Sử dụng:
```typescript
interface SubtitleCue {
  startTime: number;
  endTime: number;
  tracks: [
    {
      language: string;
      text: string;
    }
  ];
}
```
**UI Language** và **Learning Language** là hai hệ thống độc lập.

---

## XV. KEYBOARD SYSTEM

Shortcut không được hard-code rải rác trong component. Tạo `ShortcutRegistry` gồm:
* Playback Shortcuts
* Subtitle Shortcuts
* Repeat Shortcuts
* Vocabulary Shortcuts
* Shadowing Shortcuts

**Default Shortcuts:**
* `Space`: Play/Pause
* `J` / `L`: Seek Back / Forward 5s (Shift for 10s)
* `Arrow Up` / `Arrow Down`: Previous / Next Sentence
* `R`: Repeat Current Sentence
* `A` / `B`: Set Repeat Point A / B
* `Esc`: Clear Repeat
* `S`: Shadowing
* `D`: Dictionary
* `V`: Save Vocabulary
* `[` / `]`: Subtitle Earlier / Later
* `-` / `+`: Playback Speed Down / Up

---

## XVI. CUSTOM SHORTCUTS

Advanced Settings: Keyboard Mapping
* Cho phép: remap, reset defaults, conflict detection.
* Không đăng ký hàng loạt Global Shortcut ở OS level nếu không cần.

---

## XVII. SHORTCUT DISCOVERABILITY

Keyboard-first không được làm người mới khó sử dụng.
* Tooltip: `Repeat sentence (R)`
* Shortcut Help: Phím `F1` hoặc `?` hiển thị **SHORTCUT OVERLAY**.

---

## XVIII. UI PHILOSOPHY

* **LEVEL 1 — WATCH MODE:** Mặc định hiển thị Video, Subtitle, Timeline, Play/Pause, Volume, Speed, Fullscreen.
* **LEVEL 2 — LEARNING MODE:** Khi người dùng cần: A-B Repeat, Sentence Repeat, Dictionary, Shadowing, Vocabulary.
* **LEVEL 3 — ADVANCED:** Sidebar / Settings: Subtitle Tracks, Language, Subtitle Sync, Audio Devices, Keyboard Shortcuts, Vocabulary, Playback, Advanced Settings.

---

## XIX. CONTEXTUAL UI

* Set A → A-B Control xuất hiện.
* Clear Repeat → A-B Control thu gọn.
* Shadowing ON → Shadowing Panel xuất hiện.
* Shadowing OFF → Shadowing Panel ẩn.
* Click Word → Dictionary Popup.
* **Mục tiêu:** `POWERFUL WITHOUT CLUTTER`

---

## XX. GLASS UI PERFORMANCE

Glass chỉ nên sử dụng tại: TitleBar, Floating Control Island, Popup, Sidebar.
* Không sử dụng: full-screen continuous blur, animated shaders không cần thiết, nhiều lớp blur lớn, live gradient nặng.
* Animation ưu tiên: `transform`, `opacity`.
* Hỗ trợ chế độ: **Reduced Motion Mode**.

---

## XXI. PERFORMANCE BUDGET

Các giá trị dưới đây là TARGET ban đầu (sẽ hiệu chỉnh sau benchmark thực tế):
* **COLD START:** < 3 seconds
* **WARM START:** < 1.5 seconds
* **IDLE CPU:** < 2% (sau khi ổn định)
* **1080P H.264:** CPU < 10–15% (trên reference hardware với hardware decoding)
* **MEMORY:** Normal Playback Initial Target < 350–500 MB
* **SEEK LATENCY:** P95 < 300 ms (Local file, SSD)
* **DROPPED FRAMES:** Near-zero dropped frames trong playback thông thường

---

## XXII. REFERENCE HARDWARE

* **PROFILE A — WINDOWS LOW/MID:** 4-core CPU, 8 GB RAM, Integrated GPU, SSD.
* **PROFILE B — WINDOWS MODERN:** 6–8 core CPU, 16 GB RAM, Modern iGPU/GPU, NVMe.
* **PROFILE C — MACOS:** Apple Silicon M1/M2 class, 8 GB+ RAM.
* **PROFILE D (Optional):** Intel Mac.

---

## XXIII. PERFORMANCE POLICY

Không đo bằng *"cảm giác nhanh"*. Mỗi benchmark phải ghi nhận: Hardware, OS, Media sample, Codec, Resolution, Duration, Build version.

---

## XXIV. A-B REPEAT ENGINE

Tách logic khỏi UI: `ABRepeatController`
* State: `IDLE → A_SET → AB_READY → LOOP_PLAYING → LOOP_END → REPEAT / EXIT`
* Hỗ trợ: Repeat Current Sentence, 3x, 5x, Infinite, A/B markers, ±0.2 sec adjustment, Snap to Subtitle, Clear A/B.
* Xử lý Edge Cases: A > B, A = B, user seek outside AB, subtitle changed, playback speed changed, shadowing enabled, media end, sentence changed.

---

## XXV. WAVEFORM ENGINE

Không chạy waveform processing trên UI thread.
* **Pipeline:** `Media → Background Worker / Native Worker → Peak Extraction → Compact Cache → Waveform Renderer`
* **Priority:** `PLAYBACK > WAVEFORM` (Không làm playback lag để tạo waveform).

---

## XXVI. WAVEFORM CACHE

* Schema Cache: `videoHash, duration, sampleResolution, peakData, cacheVersion, createdAt`
* Quy trình: `Open Video → Check Cache → Exists? [YES → Render Instantly] / [NO → Generate Background]`

---

## XXVII. WAVEFORM TECHNICAL SPIKE

So sánh: Media Engine API vs FFmpeg vs Web Audio vs WASM.
* Đo: memory, CPU, processing time (video 2h), installer impact, dependency risk, license implications.
* Output: `ADR-WAVEFORM`

---

## XXVIII. DICTIONARY ARCHITECTURE

```
DictionaryService
       ├ OfflineProvider
       ├ OnlineProvider
       ├ TranslationProvider
       ├ PronunciationProvider
       └ CacheProvider
```
Request: `LookupRequest { text, sourceLanguage, targetLanguage, context }` (Không giả định cố định English → Vietnamese).

---

## XXIX. DICTIONARY PROVIDER DECISION

Trước Production phải tạo: **DICTIONARY PROVIDER MATRIX**
* Đánh giá: data source, offline capability, commercial license, redistribution permission, multilingual capability, Vietnamese support, pronunciation, API cost, cache permission, offline footprint.
* *Không ship dataset khi chưa xác nhận license.*

---

## XXX. VOCABULARY MODEL

```typescript
interface VocabularyItem {
  id: string;
  word: string;
  lemma?: string;
  sourceLanguage: string;
  targetLanguage: string;
  IPA: string;
  partOfSpeech: string;
  meaning: string;
  sourceSentence: string;
  translation?: string;
  mediaId?: string;
  mediaName?: string;
  timestamp?: number;
  createdAt: number;
  lastReviewedAt?: number;
  reviewCount: number;
  favorite: boolean;
  masteryLevel: number;
}
```

---

## XXXI. VOCABULARY EXPORT

Support: CSV, Anki-compatible CSV, JSON Backup.
* Later: flashcard review, spaced repetition (không bắt buộc trong v1).

---

## XXXII. SHADOWING ENGINE

* **Flow:** `Native Dialogue → Auto Pause → Countdown → Record Learner → Playback Learner → Replay Native`
* **Controller:** `ShadowingController`
* **Recorder:** `RecorderService (PermissionManager, MicrophoneManager, AudioRecorder, RecordingCache)`

---

## XXXIII. RECORDING PRIVACY

* **Default:** `LOCAL ONLY` (Không upload recording nếu user không chủ động kích hoạt dịch vụ online).
* Handle edge cases: no microphone, permission denied, microphone disconnected, input device changed, Bluetooth device lost, empty recording, recording failure.

---

## XXXIV. PERSISTENCE

Không sử dụng LocalStorage làm nơi lưu dữ liệu học quan trọng dài hạn.
* **Persistence Layer:** SQLite hoặc database phù hợp sau technical decision; Settings Store; Secure Credential Store.
* Lưu: user settings, recent media, resume positions, subtitle mapping, subtitle offset, vocabulary, shadowing metadata, shortcut configuration.

---

## XXXV. DATA MIGRATION

Mọi schema phải có: `schemaVersion`
* **Migration Flow:** `Detect Old Version → Backup → Migration → Validation → Commit (Rollback if error)`.
* Idempotent migration khi phù hợp.
* **QUY TẮC:** `MẤT VOCABULARY = P0 RELEASE BLOCKER`.

---

## XXXVI. SECURITY PHILOSOPHY

Security không phải là *"Phase cuối cùng"*. Security là: **CROSS-CUTTING WORKSTREAM** chạy xuyên suốt: Architecture, Playback, Subtitle, Dictionary, Storage, License, Network, Updater, Build, Release.

---

## XXXVII. TRUST BOUNDARIES

Các nguồn sau phải được coi là **UNTRUSTED INPUT**:
* Video, Audio, Subtitle, Filenames, File paths, URLs, Dictionary response, Translation response, AI response, Update metadata.
* **Flow:** `UNTRUSTED INPUT → VALIDATION → RESTRICTED INTERFACE → APPLICATION CORE`

---

## XXXVIII. ELECTRON SECURITY REQUIREMENTS (Nếu tiếp tục Electron)

* `nodeIntegration = false`
* `contextIsolation = true`
* `sandbox = true`
* `webSecurity = true`
* Renderer không được có: raw fs, raw shell, unrestricted ipcRenderer, arbitrary process execution.
* Preload chỉ expose API hẹp (e.g. `window.lingo.openMedia()`). Không expose toàn bộ `ipcRenderer`.

---

## XXXIX. TAURI SECURITY REQUIREMENTS (Nếu sử dụng Tauri)

Áp dụng: Capabilities, Permissions, Scopes theo nguyên tắc **LEAST PRIVILEGE**.
Frontend không được mặc định có quyền đọc/ghi filesystem tùy ý hoặc thực thi lệnh shell tùy tiện.

---

## XL. FILE SECURITY

Video/subtitle là untrusted input.
* Không tạo command ghép chuỗi shell: `ffmpeg -i "${userFilename}" ...`
* Dùng: `Executable + Structured Arguments`

---

## XLI. DATABASE SECURITY

Nếu SQLite: Bắt buộc dùng **Prepared Statements / Parameterized Queries**. Tuyệt đối không cộng chuỗi SQL thô.

---

## XLII. XSS / CONTENT SECURITY

Không render raw subtitle, dictionary content, AI response thành executable HTML.
* **Pipeline:** `External Content → Parse → Normalize → Escape / Sanitize → Render`

---

## XLIII. NETWORK SECURITY

Remote request production phải dùng HTTPS. Domain access nên cấu hình ALLOWLIST khi có thể.

---

## XLIV. API SECRET ARCHITECTURE

Phân biệt 3 loại secret:
1. **LingoGlass-owned Secret (AI key, paid dictionary key):** Không được ship trong desktop client. Luồng: `Client → LingoGlass Backend → External Provider`. Secret nằm server-side.
2. **User-owned API Key (BYOK):** Lưu vào OS Secure Storage (Windows Credential Manager / macOS Keychain). Không lưu plaintext.
3. **Release / Signing Secret:** Chỉ tồn tại trong Secure CI / Signing Infrastructure.

---

## XLV. ANTI-PIRACY OBJECTIVE

Không đặt mục tiêu: *"UNCRACKABLE"*.
* **Target:**
  * Casual Copy → Blocked
  * Simple JS Modification → Không đủ để unlock sản phẩm
  * Fake License Generation → Cryptographically prevented
  * Modified Application → Detectable ở các vùng quan trọng
  * Premium Online Service Abuse → Server-controlled
  * Professional Reverse Engineering → Tăng đáng kể thời gian và chi phí tấn công

---

## XLVI. ANTI-PIRACY LEVEL

* L0: No Protection
* L1: Signed Installer + Integrity
* L2: Cryptographic License
* L3: Native Verification, Device Activation, Secure Storage, Tamper Resistance
* L4: Server-Side Entitlement
* **LingoGlass v1 Target:**
  * **Offline Features:** L3
  * **Online Premium Features:** L4

---

## XLVII. LICENSE ARCHITECTURE

Không sử dụng check đơn giản `if (licenseKey === expectedKey)`.
License phải được **DIGITALLY SIGNED**:
* License Data: LicenseID, ProductEdition, IssuedAt, ExpiresAt, DeviceLimit, FeatureEntitlements, LicenseVersion, ActivationPolicy, DigitalSignature.
* **Server:** PRIVATE KEY → SIGN LICENSE
* **Application:** PUBLIC KEY → VERIFY LICENSE
* Public key có thể nằm trong app. **Private key KHÔNG BAO GIỜ nằm trong client.**

---

## XLVIII. PRIVATE LICENSE KEY

Private signing key không được lưu trong: React, Rust client source, Electron resources, Tauri resources, installer, public repository, bundled `.env`. Chỉ tồn tại trong secure license server hoặc secure signing infrastructure.

---

## XLIX. DEVICE ACTIVATION

Không khóa cứng license trực tiếp theo CPU serial hay motherboard serial.
* **Ưu tiên mô hình:** `First Launch → Generate Device Identity / Key → Secure Store → Activation Request → License Server → Signed Activation Token`.
* Cho phép 2–3 devices tùy business model, hỗ trợ deactivate thiết bị cũ.

---

## L. OFFLINE LICENSE

LingoGlass phải hỗ trợ local-first.
* **Perpetual License:** `Activate → Receive Signed License → Use Offline`
* **Subscription:** `Activate → Signed Entitlement → Offline Grace Period → Periodic Revalidation`
* Không yêu cầu Internet mỗi lần mở app.

---

## LI. LICENSE UX

* Không check server mỗi 30 giây.
* Không khóa user ngay khi server mất kết nối.
* Không vô hiệu hóa license khi user chỉ thay RAM/SSD.
* **Mục tiêu:** Người mua hợp pháp gần như không nhận thấy anti-piracy tồn tại.

---

## LII. LICENSE LOGIC LOCATION

Không để UI quyết định `isPro = true`.
React chỉ nhận state: `ENTITLED`, `NOT_ENTITLED`, `EXPIRED`, `OFFLINE_GRACE`.
Verification thực tế nằm ở **Native Security Core**.

---

## LIII. NATIVE SECURITY CORE

Ưu tiên đưa logic quan trọng sang Rust/native: license verification, activation validation, entitlement logic, secure configuration, integrity checks, updater verification.
React chỉ giữ: visual UI, layout, interaction, animation, display state.

---

## LIV. ANTI-TAMPER

Ứng dụng có khả năng phát hiện thay đổi quan trọng lúc startup:
`Application → Critical Integrity Check → Security Core → Continue`
Anti-Tamper phải nhẹ nhàng, không chạy checksum toàn bộ ứng dụng liên tục gây tụt hiệu năng.

---

## LV. BUILD HARDENING

Production Build: Release optimization, xóa debug symbols không cần thiết, dead-code elimination, minification, tree shaking.
Không ship: development source maps, test API keys, debug endpoints, localhost configs.

---

## LVI. OBFUSCATION

Obfuscation chỉ là Additional Friction, không phải nền tảng chống crack.
Nếu JavaScript còn tồn tại: minify, tree-shake, remove source map, selective obfuscation. Không obfuscate cực đoan gây crash hoặc false positive từ antivirus.

---

## LVII. CODE SIGNING

* **Windows:** Signed Application, Signed Installer.
* **macOS:** Developer ID Signing, Hardened Runtime, Notarization, Stapling.
* Nhằm xác thực publisher, bảo vệ integrity và tăng độ tin cậy.

---

## LVIII. SECURE AUTO UPDATE

Pipeline:
`Build → Test → Sign App → Package → Sign Update Artifact → Publish → Client Downloads → Verify Signature → Install`
Chữ ký cập nhật sai: **DO NOT INSTALL**.

---

## LIX. UPDATE INFRASTRUCTURE

Candidates: GitHub Releases, Object Storage (S3/R2), Dedicated update service.

---

## LX. UPDATE RECOVERY

Có staged rollout, emergency stop / release pause, quy trình xử lý phiên bản lỗi.

---

## LXI. SIGNING KEY SECURITY

License Private Key, Updater Private Key, Windows & Apple Signing Credentials không lưu plaintext ở git, developer notes, project folder hay USB thông thường.

---

## LXII. REPOSITORY SECURITY

Commercial repository mặc định **PRIVATE**. Bật Secret Scanning, Push Protection, Dependency Alerts. Nếu secret từng bị commit, bắt buộc: `REVOKE → ROTATE → REPLACE`.

---

## LXIII. DEPENDENCY SECURITY

Scan dependencies định kỳ (JS packages, Rust crates, Native engines). Critical issue sẽ block release.

---

## LXIV. PERFORMANCE + SECURITY BALANCE

Không sử dụng DRM/security mechanism gây CPU/GPU high, battery drain, startup delay lớn.

---

## LXV. QA FOUNDATION

QA phải xuất hiện **TRƯỚC REFACTOR**:
`Characterization Tests → Regression Baseline → Architecture Refactor`

---

## LXVI. UNIT TESTS

Ưu tiên: timestamp utilities, SRT/VTT/ASS parsers, subtitle offset, bilingual detection, A/B repeat, sentence snapping, dictionary mapping, vocabulary export, license verification, migration logic.

---

## LXVII. INTEGRATION TESTS

Video + Subtitle, Subtitle + A/B, A/B + Shadowing, Dictionary + Vocabulary, Persistence + Restart, License + Activation, Updater + Verification.

---

## LXVIII. E2E TESTS

Luồng tổng thể từ mở video, chỉnh câu, tra từ, shadowing, lưu từ, thoát app và phục hồi trạng thái.

---

## LXIX. MALFORMED INPUT TESTING

Kiểm thử file phụ đề hỏng, file quá lớn, tên file chứa ký tự đặc biệt/Unicode, đường dẫn cực dài, video hỏng codec.

---

## LXX. PERFORMANCE TESTING

Đo CPU, GPU, RAM, Startup, Seek, Dropped Frames với các video 1080p, 4K, thời lượng từ 10 phút đến 4 tiếng, file từ 1GB đến 30GB, subtitle đến 10,000 cues.

---

## LXXI. MEMORY LEAK TESTING

Thực hiện liên tục lặp lại các thao tác mở/đóng video, đổi sub, tra từ, shadowing để đảm bảo RAM không tăng tiến tính theo thời gian.

---

## LXXII. ACCESSIBILITY

V1 Baseline: Keyboard-only operation, visible focus, proper labels, scalable text, sufficient contrast, reduced motion. Test với NVDA (Windows) và VoiceOver (macOS).

---

## LXXIII. I18N

UI text không hard-code. Cấu trúc `i18n/en/` và `i18n/vi/`. UI Language độc lập với Learning Language.

---

## LXXIV. ZERO-CONFIG PACKAGING

Installer bundle toàn bộ runtime bắt buộc. Windows: `LingoGlassSetup.exe` (MSI optional). macOS: `DMG`.

---

## LXXV. INSTALLER SIZE POLICY

Ưu tiên Runtime Efficiency > Artificial Installer Size. Ngưỡng review: > 200 MB.

---

## LXXVI. DOCUMENTATION PLAN

User Documentation (Getting Started, Shortcuts, Subtitle Guide, Activation, Troubleshooting) & Developer Documentation (Architecture, Build, Tests, ADRs).

---

## LXXVII. CHANGELOG

Semantic Versioning, phân loại: Added, Changed, Fixed, Security, Known Issues.

---

## LXXVIII. LEGAL & LICENSING

Lập **LICENSE MATRIX** và **THIRD_PARTY_NOTICES** cho toàn bộ dependency, codec, font, icon, dataset.

---

## LXXIX. PRIVACY

Local-first: Không upload video, phụ đề, bản ghi âm, từ vựng mặc định. Analytics phải opt-in.

---

## LXXX. CRASH REPORTING

Chỉ gửi app version, OS, stack trace. Không bao giờ gửi nội dung học, video hay API keys.

---

## LXXXI. ANALYTICS

Tùy chọn Anonymous Usage Statistics với nút gạt Bật/Tắt rõ ràng.

---

## LXXXII. RESOURCE PLAN

Mô hình tinh gọn: 1 Product Owner + 1 Main Development Stream + AI-assisted coding + Beta Testers.

---

## LXXXIII. BUDGET CATEGORIES

Theo dõi chi phí: Apple Dev, Windows Signing, CI runners, domain, update hosting, API costs.

---

## LXXXIV. NON-GOALS FOR V1

Không làm: mobile app, social network, live streaming, video editing, cloud-required account, YouTube downloader, Netflix integration, media server, AI full course, heavy online DRM.

---

## LXXXV. AI STRATEGY

AI không phải dependency bắt buộc của v1. App phải hữu ích khi `Internet = OFF` và `AI = OFF`. AI chỉ là tầng mở rộng sau v1 cho giải thích câu, chấm phát âm.

---

## LXXXVI. RISK REGISTER

12 Rủi ro trọng yếu được quản lý:
1. Architecture migration causes regression (High)
2. Native media engine vulnerability (High)
3. License private key leaked (Critical)
4. Updater signing key leaked (Critical)
5. API key bundled into client (Critical)
6. Migration deletes vocabulary (Critical)
7. Anti-piracy blocks legitimate users (High)
8. Anti-tamper causes high CPU (High)
9. Dictionary license changes (High)
10. Codec / FFmpeg licensing issue (High)
11. Scope creep (High)
12. AI operating cost too high (Medium/High)

---

## LXXXVII. PRODUCT FEATURE GATE

Mọi feature mới phải trả lời 3 câu hỏi:
1. Có giúp user WATCH, LISTEN, UNDERSTAND, SPEAK, REMEMBER tốt hơn không?
2. Có làm tăng đáng kể CPU, RAM, GPU, Installer Size, UI Complexity không?
3. Người mới có thể bỏ qua feature đó và vẫn sử dụng app bình thường không?

---

## LXXXVIII. DEVELOPMENT ROADMAP (19 PHASES)

* **PHASE 0:** Baseline & Safety Net (1–2 weeks) → *Output: Baseline Report*
* **PHASE 1:** Architecture / Media / Security Spike (2–4 weeks) → *Decision Gate: Architecture Locked (ADR 001-004)*
* **PHASE 2:** Core Application Architecture (3–6 weeks)
* **PHASE 3:** Security Core & Licensing Foundation (2–4 weeks)
* **PHASE 4:** Playback & Multi-Format Engine (3–5 weeks)
* **PHASE 5:** Keyboard UX & UI System (2–3 weeks)
* **PHASE 6:** Multilingual Subtitle Engine (2–4 weeks)
* **PHASE 7:** A-B Repeat & Waveform (2–4 weeks)
* **PHASE 8:** Dictionary & Vocabulary (2–4 weeks)
* **PHASE 9:** Shadowing (2–4 weeks)
* **PHASE 10:** Persistence & Migration (2–4 weeks)
* **PHASE 11:** Security & Anti-Tamper Hardening (3–5 weeks)
* **PHASE 12:** Performance Hardening (Feature Freeze, 2–4 weeks)
* **PHASE 13:** Accessibility & I18N Hardening (1–3 weeks)
* **PHASE 14:** Packaging & Release Engineering (3–6 weeks)
* **PHASE 15:** Closed Beta (20–50 users, 4–6 weeks)
* **PHASE 16:** Public / Extended Beta (100–500 users, optional)
* **PHASE 17:** Release Candidate (Feature Freeze, 2–4 weeks)
* **PHASE 18:** LingoGlass Player 1.0 Stable

---

## LXXXIX. RELEASE GATE

Không release nếu có P0 bug, data loss, lộ secret, simple license bypass, unsigned installer, invalid update signature, broken migration, major playback regression.

---

## XC. PRIORITY SYSTEM

* **P0 — CRITICAL:** App không khởi động, mất dữ liệu, lộ key, lỗ hổng nghiêm trọng.
* **P1 — HIGH:** Media không phát, sub hỏng, A/B hỏng, ghi âm hỏng, kích hoạt lỗi.
* **P2 — MEDIUM:** UI bug, shortcut bug nhỏ.
* **P3 — LOW:** Cải tiến thẩm mỹ, tùy chọn mở rộng.

---

## XCI. DEFINITION OF DONE

Implementation → Automated Test → Error Handling → Performance Review → Security Review → Windows Validation → macOS Validation → Documentation → DONE.

---

## XCII. SECURITY DEFINITION OF DONE

Không có hardcoded secret, input validation đầy đủ, không cấp quyền shell/filesystem vô hạn, không render HTML không an toàn, parameterized SQL, secure credential storage.

---

## XCIII. RELEASE SECURITY GATE

Secret Scan → Dependency Scan → Production Config Check → Debug Artifact Check → Signing → Update Signature → Integrity Verification → Release.

---

## XCIV. PRODUCT MILESTONES

* M0 — CURRENT ALPHA (Core features function)
* M1 — ARCHITECTURE LOCKED (Baseline, Media, Framework, Security decision)
* M2 — SECURE CORE (Native core, license verification, secure storage)
* M3 — FEATURE BETA (Watch, Repeat, Dictionary, Vocabulary, Shadowing)
* M4 — PRODUCTION BETA (Migration, Installer, Signed builds, Updater, Performance)
* M5 — RELEASE CANDIDATE (Feature Freeze)
* M6 — VERSION 1.0 STABLE

---

## XCV. VERSION ROADMAP

* v0.7: Current Functional Alpha
* v0.8: Architecture + Core Hardening
* v0.85: Native Playback + Multiformat
* v0.9: Learning Feature Beta
* v0.95: Production Beta
* v0.98: Release Candidate
* v1.0: Stable Commercial Release

---

## XCVI. PROJECT EXECUTION PRIORITY

1. DO NOT ADD LARGE NEW FEATURES
2. BASELINE CURRENT APPLICATION
3. WRITE CHARACTERIZATION TESTS
4. BENCHMARK CURRENT ELECTRON BUILD
5. BUILD NATIVE MEDIA PROTOTYPE
6. BUILD TAURI/RUST PROTOTYPE
7. SELECT FINAL ARCHITECTURE
8. CREATE SECURITY CORE
9. IMPLEMENT LICENSE FOUNDATION
10. HARDEN PLAYBACK
11. MULTILINGUAL CORE
12. KEYBOARD UX
13. LEARNING FEATURES
14. PERSISTENCE & MIGRATION
15. PERFORMANCE HARDENING
16. SECURITY HARDENING
17. PACKAGING
18. BETA
19. RELEASE CANDIDATE
20. LINGOGLASS 1.0

---

## XCVII. ANTI-PIRACY SUCCESS CRITERIA

* Copy thư mục app → Không tự động thành installation có bản quyền
* Sửa 1 biến JS đơn giản → Không unlock được license
* Sinh key ngẫu nhiên → Không tạo được signed license hợp lệ
* Giải nén installer → Không lấy được private key
* Soi source bundle → Không lấy được API secret dùng lại được
* Sửa gói update → Signature verification thất bại
* Copy activation sang máy khác → Bị chặn theo activation policy

---

## XCVIII. USER EXPERIENCE SUCCESS CRITERIA

Người dùng hợp pháp: `Download → Install → Activate → Open Media → Learn`.
Không phải cài codec, không chỉnh runtime, không dùng terminal, không bắt buộc online liên tục.

---

## XCIX. PERFORMANCE SUCCESS CRITERIA

Launch nhanh, idle < 2% CPU, playback mượt với hardware decoding, waveform không lag video, không leak RAM theo thời gian.

---

## C. PRODUCT NORTH STAR

> *"LingoGlass giúp người dùng học ngoại ngữ từ video/audio nhanh hơn, tập trung hơn và thuận tiện hơn, trong một ứng dụng desktop nhẹ, đẹp, mạnh nhưng không phức tạp."*

Mọi tính năng phải phục vụ: **WATCH - LISTEN - UNDERSTAND - REPEAT - SPEAK - REMEMBER**.

---

## CI. FINAL PRODUCT VISION ARCHITECTURE

```
                           LINGOGLASS PLAYER 1.0
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │  SIMPLE / GLASS UI  │
                          │ Video + Sub center  │
                          └──────────┬──────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   KEYBOARD SYSTEM   │
                          └──────────┬──────────┘
                                     │
                        ┌────────────┴────────────┐
                        ▼                         ▼
             ┌─────────────────────┐   ┌─────────────────────┐
             │    PLAYBACK CORE    │   │    LEARNING CORE    │
             │ Multi-format, HW    │   │ Subtitle, AB Repeat │
             │ Audio, Waveform     │   │ Dictionary, Vocab   │
             │ Subtitle Track      │   │ Shadowing           │
             └──────────┬──────────┘   └──────────┬──────────┘
                        │                         │
                        └────────────┬────────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │     NATIVE CORE     │
                          │ Persistence         │
                          │ Security, License   │
                          │ Activation          │
                          └──────────┬──────────┘
                                     │
                        ┌────────────┴────────────┐
                        ▼                         ▼
             ┌─────────────────────┐   ┌─────────────────────┐
             │     LOCAL-FIRST     │   │   OPTIONAL ONLINE   │
             │ Media, Vocabulary   │   │ License Server      │
             │ Recording, History  │   │ Premium API, Update │
             └─────────────────────┘   └─────────────────────┘
```

---

## CII. FINAL PRINCIPLE — 5 PILLARS BALANCE

LingoGlass phải cân bằng 5 yếu tố:
```
             LEARNING
                │
                │
      UX ───────┼─────── PERFORMANCE
                │
                │
          SECURITY
                │
                │
          MAINTAINABILITY
```

* **POWERFUL BUT SIMPLE**
* **SECURE BUT USER-FRIENDLY**
* **MULTI-FORMAT BUT LIGHTWEIGHT**
* **LOCAL-FIRST BUT EXTENSIBLE**
* **COMMERCIAL BUT MAINTAINABLE**
