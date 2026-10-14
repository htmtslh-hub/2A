from pathlib import Path
import json, hashlib, zipfile

review=Path(__file__).resolve().parent
product=review.parents[1]
source=product/'source'
archive=product/'leaflit.zip'
zip_hash=hashlib.sha256(archive.read_bytes()).hexdigest()
evidence={'zipBytes':archive.stat().st_size,'sha256':zip_hash,'entries':[],'sourceMatches':True,'runtimeMatchesTestedExtract':True}
tested=Path('_design/.qa-extracted/leaflit').resolve()
target=review/'final-package'
with zipfile.ZipFile(archive) as package:
    for entry in package.infolist():
        relative=Path(entry.filename).relative_to('leaflit')
        data=package.read(entry)
        destination=target/'leaflit'/relative
        destination.parent.mkdir(parents=True,exist_ok=True)
        destination.write_bytes(data)
        evidence['sourceMatches'] &= data==(source/relative).read_bytes()
        if relative.name not in ['README.md','CUSTOMISE.md','LICENCE.txt']:
            evidence['runtimeMatchesTestedExtract'] &= data==(tested/relative).read_bytes()
        evidence['entries'].append({'file':entry.filename,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
assert len(evidence['entries'])==14 and evidence['sourceMatches'] and evidence['runtimeMatchesTestedExtract']
(review/'final-package.json').write_text(json.dumps(evidence,indent=2),encoding='utf-8')
manifest=[{'file':str(p.relative_to(source)).replace('\\','/'),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(source.rglob('*')) if p.is_file()]
(review/'source-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(review/'QA.md').write_text(f'''# Leaflit 1.0.0 · QA phát hành

Ngày 14/10/2026, Windows. WEB-STATIC-1 v1.2.1 + ngoại lệ riêng được chủ sản phẩm duyệt: W01/W03/W06 ảnh WebP và gói 14 file; W05 tương tác cục bộ. Bản cuối được chủ sản phẩm duyệt và yêu cầu đóng gói/đưa store. Không claim fidelity >95% với ảnh ban đầu.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo ngoại lệ | 14 file; sáu core + tám WebP, final-package.json |
| Q02 | PASS | Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740; không overflow; release-final/checks.json. Bốn browser thực local-release.json |
| Q03 | PASS | Menu, Escape/link/resize; book descriptions, search/genre/saved, empty, profile validation/text escaping; local-checks.json và local-release.json |
| Q04 | PASS | Tab/focus/Escape và focus contrast trên bản giải nén, release-final/checks.json |
| Q05 | PASS | Một h1, landmarks, headings/IDs, tên/SVG; axe không lỗi, release-final/checks.json |
| Q06 | PASS | Automated contrast gồm pixel sampling nền phức tạp; supplemental.json. Tám bìa raster đã nhìn trực tiếp, nội dung tên sách/tác giả có HTML tương ứng; không coi axe là phép đo chữ raster |
| Q07 | PASS | No-JS/offline/file://, font fallback, zoom 200%, OS reduce; release-final/checks.json. Animation mặc định bật theo owner rules |
| Q08 | PASS | Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.45, Cốc Cốc 152.0.7977.124. Safari/thiết bị thật NOT TESTED |
| Q09 | PASS | Không pageerror/missing asset ở clip và browser; finite reveal có terminal đúng, reverse scroll vẫn hiện; không request runtime ngoài; ZIP {archive.stat().st_size} byte |
| Q10 | PASS | 10 bước, 12 prompt, literal counts=đúng, unfilledMarkers=[]; giấy phép bảy mục giữ quyền/chính sách cũ, chỉ đồng bộ loại tài sản. Font hệ thống, không font bên thứ ba được phân phối |
| Q11 | PASS | Đóng bằng dong-goi --ngoai-le, giải nén đủ 14 file và so source từng byte. Runtime cuối trùng bản giải nén đã qua browser suite, README cuối cập nhật đúng release |
| Q12 | PASS phần tích hợp local | t32/entertainment; copy/specs/guide vi/en/zh; demo/WebP/MP4 khớp; detail/library/video pause và private download guards đã thử local. Online sẽ ghi online-release.json. Giao dịch mua và download qua tài khoản có quyền thật NOT TESTED; không tạo purchase/entitlement |
| Q13 | PASS theo brief đã duyệt | D01–D08: dashboard thư viện, 3 reading cards/5 releases/8 collection covers, token nhất quán, responsive, demo rõ, hai lựa chọn riêng bìa nhô khỏi card và sidebar tác giả |

ZIP SHA-256: `{zip_hash}`. Bộ tài sản 600×900 tự tạo; prompts/source/hash ở design/ASSETS.md và generated-covers.json. Package proof: final-package.json. Không sửa catalog/giá/DB ngoài entry Leaflit; giá chung $20 giữ nguyên.

Store build/typecheck và 32 video manifests PASS. vercel build local gặp Windows EPERM tạo symlink serverless; Next build riêng PASS, sẽ deploy source qua Linux builder Vercel. ZIP được Next trace vào /api/download; không đặt công khai.

Bằng chứng cũ tại checks.json/ACCEPTANCE.md mô tả candidate trước chủ sản phẩm duyệt bản cuối; RELEASE.md và QA.md này là trạng thái phát hành hiện tại. Online URL, deployment, commit và guard results bổ sung sau khi triển khai.
''',encoding='utf-8')
report=json.loads((review/'acceptance.json').read_text(encoding='utf-8'))
report['candidateHash']=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()
report['releaseAuthorisation']={'date':'2026-10-14','text':'ok em đóng gói sản phẩm và đưa lên store','scope':'owner-approved final Leaflit, packaging and store release; no >95% original-reference claim'}
report['gate']='PASS FOR OWNER-APPROVED RELEASE'
report['fidelity']['status']='N/A FOR RELEASE OF APPROVED DESIGN; original-reference fidelity not claimed'
report['technical']={'status':'PASS','evidence':['release-final/checks.json','local-checks.json','local-release.json','final-package.json','supplemental.json']}
report['blockers']=[]
report['releaseVerification']={'status':'PENDING ONLINE','paidPurchaseFlow':'NOT TESTED'}
(review/'acceptance.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Final package verified: 14 files, {archive.stat().st_size} bytes, {zip_hash}')
