# Meridian 1.0.0 — QA 18/10/2026

Trạng thái: bản local, bố cục đã kiểm; CHƯA ĐẠT video trên môi trường thử vì HEVC không decode. Chưa push/deploy/catalog.

Bằng chứng checks.json và ảnh cạnh file này; Windows, Playwright headless qua HTTP4392. Kiểm ở1280×720,1920×1080,2560×1080,768×1024,390×844,375×812,360×640. Document scrollWidth/Height bằng viewport ở mọi kết quả đã ghi. Đã nhìn Chromium1280/360: nội dung rõ, Fraunces và Inter tải được, navdesktop có dots và mobile2×4khôngdots. Video không hiển thị nên KHÔNG xác nhận coach/bridge hoặc xe chạy dưới copyright.

Q01 PASS theo brief1HTML/CSSJSinline/fontGoogle/videoremote;Q02 PASSphầnlayout/overflow;Q03 PASSmộtphầnyearđộngvàCSShoverfocus,cácnavhref#giữđúngprompt;Q04 NOT TESTEDtoànvòngkeyboard;Q05 PASSfooternav/compassroleimg/label,videodecorative;Q06 NOT TESTEDđotươngphản;Q07 PASSmộtphầnreducedmotionremoveautoplaypause,theochecks,offline/zoom/noJS/file://chưathử;Q08 PASSchỉenginehoànthànhtrongchecks,khôngEdge/CốcCốc/Safarithật;Q09 FAILvideo,khôngpageerror;Q10 NOT TESTEDquyềntàisản/fontvàtài liệu thương mại;Q11 N/AsingleHTMLkhôngZIP;Q12 N/Akhôngstore;Q13 PASSmộtphầntextlayout,FAILhìnhảnhcliptrongenginekiểm.

D01 PASScopytheoprompt;D02 PASScompass/wordmark/sage,phầnengravingchưarender;D03 PASSfooter-only;D04 PASStokens/fonts;D05 PASSviewportđãđo,chưazoom;D06 PASScopyuser;D07 PASSkhôngthêmclaims;D08 PASSyear/brandnhấtquán.

Video ffprobe:HEVCMain10,1920×1080,yuv420p10le. Giữ đúng URL source,không download hay thay media. Không xem đượccảnhcoach nên yêu cầucoachbelowcopyright NOT TESTED. CSS vẫn đúngobjectfitcover/position50%35%/multiply/flex1/minheight0/margintop-12svh. Chưa thử trình duyệt cóHEVCdecoder.

Ngoại lệ WEB-STATIC-1:mộtHTML/video/href# theo brief;khôngnguyênchuẩnsáufile vàchưa phát hành thương mại. Chỉmeridian/đượctạo,khôngsửamẫukhác. HTMLSHA256: e5373a69345c33378f6cdad38f01b3f657e0deff2372140a37fca94c4da060b2

Engines trong checks tại thời điểm ghi: chromium 153.0.8010.12, firefox 155.0