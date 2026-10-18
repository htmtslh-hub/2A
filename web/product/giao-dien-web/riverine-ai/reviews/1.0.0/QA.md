# riverine.ai 1.0.0 — QA 18/10/2026

Trạng thái: mẫu local đã kiểm chức năng cơ bản; CHỜ KIỂM TRA phát hành thương mại. WEB-STATIC-1 v1.2.1 tham chiếu, ngoại lệ theo brief1HTML/video/hero-only. Không push/deploy.

Windows, Playwright headless Chromium153.0.8010.12 và Firefox155.0 quaHTTP4390. Bằng chứng checks.json,video-check.json, ảnh chromium/firefox. Đã nhìn chromium1280/375. Không thiết bị thật/Edge/Cốc Cốc/Safari.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo brief | ZIP1index.html, CSS/JS inline,không framework/CDNJS/localmedia |
| Q02 | PASS phần đo | 1280×960,1440×900,820×1180,375×812,320×740,844×390,600×400,650×960:hai engine không tràn ngang và h1line không vượt viewport |
| Q03 | PASS | Menu mởfocusWork,Escapeđóngfocusburger ở375/320/600 trên2engine;sound true→false;resize qua desktop không navinert. Clickoutside/chooselink có mã,chưa thử đầy đủ |
| Q04 | PASS một phần | Focusmenu/Escape thựcđãthử;chưa rà toànTab/ShiftTab hoặc vùng chạm từng desktoplink |
| Q05 | PASS phần brief | 1h1,main/header/nav,aria-current,menucontrols,soundpressed,SVGdecorative;hero-onlykhông footer/skip theo prompt |
| Q06 | NOT TESTED | Chưa đo tỷ lệ tương phản toàn video |
| Q07 | PASS một phần | Reducedmotion:classesrỗng,animations0,titleopacity1 cả2engine;fonts404dùngfallback. Chưa noJS/offline/zoom200%/file:// |
| Q08 | PASS phạm vi | Hai engine/version nêu trên;chưa browser/thiết bị khác |
| Q09 | PASS phần media | Không pageerror;Firefox time5.069→5.839s,ready4;Chromiumlượtđầu chưa tải xong6s,kiểmriêngready4,time.0858→.9275s;videoH264Main1108×828,yuv420p,HEAD2009735311byte |
| Q10 | NOT TESTED thương mại | README/brief;chưa xác minh quyềnvideo/font hoặc hướngdẫnbán hàng đầyđủ.3fontpaththiếunhưngkhai báo/fallbackgiữnguyên theo brief |
| Q11 | PASS | ZIP1entryđườngdẫn/,đọc lại khớpbyte nguồn;chưa thử browserbản giải nén riêng |
| Q12 | N/A | Không catalog/previewvideocửa hàng/downloadthanh toán |
| Q13 | PASS một phần | Đúnghướngvisualriverteal/3shade/SVG/WAAPI;chưa pixelcompare vì thiếufontRVvàreferenceimage |

D01 PASStheobrief (brand/regenerationAI/copyCTA);D02 PASSriverbackground vàtreemothmark;D03 PASShero-only;D04 PASSmàu/tokens/fallbacktheobrief,fontgốcchưacó;D05 PASSviewportsđãđo,chưazoom;D06 PASSnộidunguser;D07 PASSkhôngthêmchứngthực/sốliệubịa;D08 PASSbrand/linktextnhấtquán.

## Entrance
Video-check bảncuối:classesrỗng,inline0,animations0 sau khi timelinekếtthúc. WAAPI backwardfill,7pathdash,mothscale,headlineclip,CTAtraveltheochiềucao;oneredrawframe rồi dọnclass. Chưa đo từngmốc timelinebằngframecapture;không tuyên bố từngbrowser renderpixelgiốngnhau. Các ảnhchecks đầu tạo trướcđiềuchỉnh duytrìis-enteringđếnkếtthúc;video-checkbảncuối xácnhậndọnsạch.

## Giới hạn/ngoại lệ
Thiếu3fontwofff2 là chủđích theo prompt thiếufile:không tạofontgiả hoặc đổistack. Hrefhashchưa cóđíchsection:giữđúngprompt khôngthêmsection. Soundnútchỉđổigiao diện,khôngaudio. Không dùng dong-goi/check-templatechuẩn6file vì brief1HTML;đóngzipfile vàkiểmPlaywright riêng. KhôngclaimnguyênchuẩnWEB-STATIC-1.

ZIP riverine-ai.zip: 6218byte;SHA-256 `a9011a76beb6a644317f7510e599d3781ebe5450a2cf11a5cf6f7916e4d066e1`. Chỉ tạo riverine-ai/,khôngđụngmẫukhác. Không downloadvideo hoặc localmedia. Chưa publish/push/deploy.
