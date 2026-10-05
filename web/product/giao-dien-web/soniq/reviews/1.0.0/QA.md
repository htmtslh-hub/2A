# Soniq — QA 1.0.0

Ngày05/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ ảnh/JS/dung lượng theo yêu cầu làm như các mẫu sản phẩm trước. Giao diện local và tích hợp catalogt10 hoàn thành; chưa deploy cho mẫu mới. Quyền ảnh sinh mới cần chủ sản phẩm rà soát trước phát hành thương mại. Không tuyên bố đạt nguyên WEB-STATIC-1 hoặc mọi browser.

## Phạm vi và gói

Source6filechuẩn +3WebP: graphite278400byte,ivory233212byte,cobalt275374byte; tất cả1254×1254,alphaRGBA. Tạo mới bằng built-inimagegen, khônglogoJBL, khônghotlink/stock. Prompt và nguồn trongBRIEF.md. SystemfontSegoeUI/sans-serif, khôngnetworkfont. Mã thuầnHTML/CSS/JS,mởfile://; khôngframework/CDN/base64/tracking/secret.

ZIP soniq.zip807934byte,9file, SHA256995e257fe4ba4c8d8b59c5ceb5f638b445bd2fb30cb3ab77fcf346b97ffe80aa. Dong-goi --ngoai-le đọc lại khớp source. Preview3khổ vàMP4 render từsourcekhách nhận, khôngconcept. Mãchỉthêmsoniq,publicdemo/previews vàentryt10/guide3ngônngữ. Khôngghiđè ô/slugsảnphẩmcũ hoặc thayđổiDB/backend/config. ThayđổicótrướccủaMellow đượcgiữnguyên.

## Q01–Q13

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | 6filebắtbuộc +3asset theo ngoại lệ, khôngfilethừa trongZIP. |
| Q02 | PASS | 1440×900,820×1180,375×812,320×740 ở3browser: khôngoverflow, đủảnh. Specsnav đã cóminwidth44px; nhìnảnhdesktop/mobile/fullpage. |
| Q03 | PASS | Menu/Escape/resize, carouselarrows/picks/wrap/swipe, bagquantity/persistence,FAQnative vàmailto. Heroaddbag lấyđúngmàuIvory. |
| Q04 | PASS | Generic kiểmskip/Tab/ShiftTab/focus; customEscape menu/dialog trảfocus. |
| Q05 | PASS | 1h1/landmark/id/labels,axe tronggeneric, canvas khôngdùng. |
| Q06 | PASS | Lầnđầu phát hiệnSpecs39px vàmutedtext/hoverlinkcontrast. Đã sửaSpecs44px,muted#302837,accenttext#7b1805. Lượt cuối sau chỉnh font nhỏ lên 14px PASS trên cả ba browser; checks.json không có failures và sourceMatchesExtracted=true. |
| Q07 | PASS | Genericfile/offline/noJS/fontfallback/zoom200; motionmặcđịnhON theoowneroverride, pausephiênhiệntại,reloadON. |
| Q08 | NOT TESTED | Edge154.0.4258.53,Chromium153.0.8010.12,Firefox155.0 đãchạy. CốcCốc executablekhôngtìmthấy; Safari/thiếtbịvậtlý chưa thử. |
| Q09 | PASS | JSsyntax,console0; typecheck/eslint2file/NextbuildPASS. IdleEdgeRAF0callback/250ms; timer/RAF hữu hạn. |
| Q10 | NOT TESTED | CUSTOMISE10bước/12prompt/countmap,READMEkhớp;7mụccommercialpolicygiữquyềnsửdụng/tái phân phối theochuẩn. Phạm vi quyền3ảnhAI mới ghi ownerreviewtrongLICENCE, chưa xácminh riêng trước phát hành thương mại. KhôngclaimJBL,reviewhayhardwarethật. |
| Q11 | PASS | ZIPhash/bytes trên; generic giải nén đọcbyte/mởHTTP/file. |
| Q12 | PASS (local) | Catalogt10Soniq/shop/version1.0.0,3ngônngữ;detail/library/preview/video/demopopup đúng. Guide /huong-dan?template=soniq&view=template. Production/paid-download chưa thử; khôngdeploy. |
| Q13 | PASS | D01–D08 bên dưới, ảnhchỉminhhọa, chữ/nútHTML. |

## Motion/tương tác thực

motion-checks.json: Edge/Chromium/Firefox PASS, reducedMotionreduce vàsavedmotionoff vẫnON. Midframe120ms cóopacity giữa0và1 vàmatrixdịch/xoay; cuối1. Wrap0→2 và2→0 direct,rapidx12chỉ1ảnhvisible. Hovertranslate/rotateđộcsovớitransformcarousel,leavereturn0. HerochọnIvory→Addtobag: đúngIvory,$149.00; tăng1=$298.00,reloadcount2;Escape trảfocus. mobilemenu mở/Escape đúng. Console0. idle-swipe.json: EdgeidleCallbacks0,TouchEvent môphỏngswipe→IvoryPASS (khônggọi làthiếtbịthật).

Store-checks.json: Nextproductionlocal4332 cóSoniq ởlibrary/detail,preview/video đúngsoniq; bấmViewlivedemo mở /demos/soniq/index.html?v=1.0.0;guideđúngsoniq,console0. Sourcepriceheadphone$149 hưcấu táchkhỏigiátemplate$79 của cửa hàng. Chưa mua/thanh toán/tảibằngaccount.

## D01–D08

| Mục | Trạng thái | Lựa chọn |
|---|---|---|
| D01 | PASS | Wirelessover-earheadline vàAddtobag/explore rõsảnphẩm. |
| D02 | PASS | Khungpastelblue-violet-pink, chữđenđậm/tráivàcutoutlớnphải;3thumbnailtrắng dưới. |
| D03 | PASS | Herochọnmàu,designgiảithíchfit,specsminhhọa,collectionchọnmón,supportenquiry. |
| D04 | PASS | TokenđầuCSS,fontsystem,redorangeCTA,ảnh/card12px,pillbutton28px. |
| D05 | PASS | Đã xemdesktop/mobile/fullpage; ảnhhero chỉnhfullheadband,khôngoverflow. Mobilexếpdọc,controls/thumbriêng. |
| D06 | PASS | CopyEnglishcụthể,khônglorem. |
| D07 | PASS | Fictionalbrand/specs/prices được công bố;khôngtestimonials/ratings/logoreal. |
| D08 | PASS | $149HTML và14900centsJS,3màu vàbagkhớp. |

## Tương tác và đích

Brand/skip/backtotop→main;nav→design/specs/collection/support;CTAAddtobag→selectedcolour;arrows/picks/keys/swipe→carousel;bag→dialog;quantity±→centtotal;Emailthisbag→mailto draft;Emailenquiry→mailto;FAQ→native disclosure;motiontoggle→pause/resumecurrentvisit. NoJSẩnJScontrols,hiệnexplore vàcollection/contact/navigation. Mấtảnhvẫncóchữ/nút/CTA.

Lệnh: dong-goi/check-template --version1.0.0 --ngoai-le; check-motion.mjs/check-idle-swipe.mjs/check-store.mjs/render-preview.mjs; node --check main.js; npmrun typecheck; eslintreal-templates/template-guides; npmrunbuild. Bằngchứng checks.json,motion-checks.json,idle-swipe.json,store-checks.json,screenshots/,video-frames/. Không sửa source khác hoặc deploy.

## Điều chỉnh chiều sâu ngày 05/10/2026

Theo yêu cầu mới: tai nghe nằm giữa khung trước và sau. HTML thêm hai span trang trí trong hero__visual aria-hidden. CSS sắp lớp 0/1/3, khung sau nghiêng, lớp kính trước che nhẹ phần dưới tai nghe. Finite RAF hiện có điều khiển ba lớp với hệ số -.35/1/1.6, rời chuột hoặc pause trả về 0. Không thêm asset, thư viện hoặc vòng lặp vô hạn. Đã xem preview desktop/mobile, đồng bộ demo/CSS/JS/preview ba khổ/MP4 và ZIP. Depth-motion-checks.json và checks.json ghi kết quả chạy lại bản cuối. Không deploy; phần chưa kiểm tra Q08/Q10/Q12 vẫn như trên.

Kết quả bản chiều sâu cuối: check-depth PASS Edge154.0.4258.53 / Chromium153.0.8010.12 / Firefox155.0, bốn viewport, hover ba lớp, wrap hai chiều, rapid input, pause/reload, bag/menu/console. Generic cuối PASS Chromium/Firefox, failures=[], sourceMatchesExtracted=true; ZIP807934byte SHA256995e257fe4ba4c8d8b59c5ceb5f638b445bd2fb30cb3ab77fcf346b97ffe80aa. Source/demo CSS và JS khớp SHA256. Đã xem ảnh preview desktop/mobile sau render, git diff --check PASS. Không chạy lại Next build vì không sửa mã ứng dụng Next/catalog.

## Yêu cầu vị trí mép khung chính (thay thế thử nghiệm hai khung nhỏ)

Ảnh mới xác định vùng mép trên showcase/header. Đã bỏ hai span khung nhỏ, CSS và JS depth factors của thử nghiệm trước; depth-motion-checks.json chỉ là lịch sử, không mô tả bản cuối. Tai nghe desktop absolute top -170px, quai vượt mép showcase lên nền ngoài, bóng sâu hơn. Menu desktop dịch trái để tránh chồng ảnh; header và controls nằm lớp trước. Tablet/mobile giữ bố cục inline và clip trang trí cục bộ, không che overflow toàn body. Source/docs/demo cập nhật; ZIP mới hash ở trên. Kiểm tra đầu phát hiện overflow ở 820/375/320, đã sửa và chạy lại. Không đổi catalog/Next/backend hoặc deploy.

Bản mép khung cuối: motion-checks.json PASS Edge154.0.4258.53/Chromium153.0.8010.12/Firefox155.0, bốn viewport không overflow, midframes/wrap/rapid/hover/reset/pause/reload/bag/menu/console. Generic checks.json cuối PASS, failures=[], sourceMatchesExtracted=true, ZIP807934byte/hash995e257fe4ba4c8d8b59c5ceb5f638b445bd2fb30cb3ab77fcf346b97ffe80aa. Preview desktop/tablet/mobile và MP4 render lại sau source cuối; đã nhìn preview desktop và tablet. git diff --check PASS. Không deploy.
