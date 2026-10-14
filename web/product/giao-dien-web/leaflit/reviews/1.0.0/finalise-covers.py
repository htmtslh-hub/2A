from pathlib import Path
import json, hashlib

review=Path(__file__).resolve().parent
source=review.parents[1]/'source'
assets=json.loads((review/'generated-covers.json').read_text(encoding='utf-8'))
qa=review/'QA.md'
text=qa.read_text(encoding='utf-8')
text=text.replace('Source đúng sáu file, không ảnh ngoài hoặc thư viện.', 'Source có sáu file cốt lõi và tám WebP do imagegen tạo theo yêu cầu mới. Đây là ngoại lệ W01/W03/W06 riêng Leaflit; không thư viện client hoặc ảnh hotlink.')
text=text.replace('bìa SVG là minh họa có aria-label và tiêu đề HTML riêng.', 'bìa ảnh có alt và tiêu đề HTML riêng; chữ trên ảnh đã nhìn trực tiếp cả tám bìa, không dùng axe để tự xác nhận chữ raster đạt tương phản.')
text=text.replace('bìa/portrait dùng SVG tự tạo thay ảnh', 'bìa ảnh tạo mới theo yêu cầu chủ sản phẩm, portrait vẫn SVG')
text+='\n## Thay toàn bộ bìa · 14/10/2026\n\nBuilt-in imagegen tạo tám ảnh độc lập. Mỗi ảnh WebP 600×900; tổng '+str(sum(a['bytes'] for a in assets))+' byte, mỗi ảnh dưới 300 KB. Không crop ảnh, không dùng ảnh attachment làm tài sản. Tám img gốc và tám bản clone bộ sưu tập dùng cùng tám src. Không còn SVG book-cover. Chữ title/author ở tám ảnh đã xem trực tiếp, đúng metadata sách.\n\nPhạm vi đã đổi: source/index.html, source/assets/css/style.css (height:auto/object-fit), source/assets/js/main.js (lazy clone), tám ảnh source/assets/img/, README/CUSTOMISE và hồ sơ riêng. Không đổi LICENCE.txt hoặc file cửa hàng/dùng chung. Prompts và nguồn gốc ảnh: design/ASSETS.md; kích thước/byte/hash: generated-covers.json.\n\nKiểm lại: local-checks.json ghi kết quả tải/giải mã đủ 16 vị trí bìa ở Chromium/Firefox, các luồng search/filter/save/profile, bốn viewport và axe. candidate-checks.json ghi menu/no-JS/offline và motion. Chỉ kết luận PASS nếu report không có failures; trạng thái phát hành vẫn theo ACCEPTANCE.md. Quyền commercial raster wording chưa sửa vì rule cấm tự đổi licence.\n'
qa.write_text(text,encoding='utf-8')
manifest=[{'file':str(p.relative_to(source)).replace('\\','/'),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(source.rglob('*')) if p.is_file()]
(review/'source-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
path=review/'acceptance.json'
report=json.loads(path.read_text(encoding='utf-8'))
report['candidateHash']=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()
report['approvedExceptions'].append({'codes':['W01','W03','W06'],'scope':'Leaflit eight generated local raster covers replacing SVGs','authorisation':'User explicitly requested all covers replaced with generated realistic illustrations','date':'2026-10-14'})
report['blockers']=[b for b in report['blockers'] if not b.startswith('Reference book covers')]
report['blockers'].extend(['Full remaining fidelity/layout and portrait comparison pending; generated cover change is now explicitly requested','Existing commercial licence wording for raster assets requires owner review before release'])
report['coverImages']={'status':'PASS','evidence':['generated-covers.json','local-checks.json','../../design/ASSETS.md']}
path.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
accept=review/'ACCEPTANCE.md'
text=accept.read_text(encoding='utf-8')
text+='\n## Cập nhật bìa ảnh theo yêu cầu mới\n\nĐã thay đủ tám SVG bìa bằng ảnh realistic do imagegen tạo. Đây là thay đổi chủ sản phẩm yêu cầu, không còn coi việc đổi bìa tự nó là ngoại lệ fidelity chưa duyệt. Tên/brand/portrait/layout còn phải đối chiếu theo scope release. Người dùng chỉ yêu cầu thay bìa ở lượt này; không push/deploy/catalog. Xem local-checks.json, generated-covers.json và design/ASSETS.md.\n'
accept.write_text(text,encoding='utf-8')
print('Cover asset evidence and final source manifest saved.')
