from pathlib import Path
import json, hashlib

review=Path(__file__).resolve().parent
source=review.parents[1]/'source'
qa=review/'QA.md'
text=qa.read_text(encoding='utf-8')
text=text.replace('Link section, native details, menu mobile/Escape/link/resize kiểm thực.', 'Link section, native details, menu mobile/Escape/link/resize kiểm thực. Tìm theo title/author, case-insensitive, genre/saved, empty state, lưu/bỏ lưu, reload, profile text an toàn, cross-tab và storage blocked/corrupt PASS ở cả hai engine; local-checks.json.')
text=text.replace('| Search | Khối minh họa có nhãn Demo only; không input giả |', '| Search | Input tìm title/author, hiển thị count và trạng thái rỗng; không request mạng |')
text=text.replace('| Profile/reading list | Static section, không auth/lưu dữ liệu |', '| Collections/Saved | Lọc all/genre/saved; lưu/bỏ lưu, đồng bộ nút và số lượng, localStorage/cross-tab |\n| Profile | Đổi tên display, validation, textContent tránh HTML injection; lưu cục bộ |')
text=text.replace('CHỜ CHỐT PHẠM VI. Mẫu tĩnh candidate đã có, không phải sản phẩm đã phát hành. Đang chờ trả lời câu hỏi về JS tương tác cục bộ vượt W05. Không coi im lặng là chấp thuận.', 'TƯƠNG TÁC CỤC BỘ ĐÃ HOÀN THÀNH. Chủ sản phẩm duyệt ngoại lệ W05 ngày 14/10/2026 bằng câu “Cho phép tương tác cục bộ”. Ngoại lệ chỉ cho Leaflit: search/filter/save/profile/localStorage. Không phải hệ thống tài khoản hay thư viện ebook có backend. Candidate chưa qua cửa phát hành ForgeFrame.')
qa.write_text(text,encoding='utf-8')
readme=source/'README.md'
text=readme.read_text(encoding='utf-8')
text=text.replace('See the sibling reviews/1.0.0 folder for actual browser evidence and remaining checks.', 'Tested on Windows with Chromium 153.0.8010.12 and Firefox 155.0 at 1440x900, 820x1180, 375x812 and 320x740. Search, filters, save/remove, reload persistence, cross-tab sync, blocked/corrupt storage, profile escaping and empty results passed. No axe violations or page errors in these checks. See the sibling reviews/1.0.0 folder for actual browser evidence and remaining release checks.')
readme.write_text(text,encoding='utf-8')
manifest=[{'file':str(p.relative_to(source)).replace('\\','/'),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(source.rglob('*')) if p.is_file()]
accept=review/'acceptance.json'
report=json.loads(accept.read_text(encoding='utf-8'))
report['candidateHash']=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()
report['blockers']=[b for b in report['blockers'] if not b.startswith('W05')]
report['approvedExceptions']=[{'code':'W05','scope':'Leaflit only, browser-local search/filter/save/profile','authorisation':'User: Cho phép tương tác cục bộ','date':'2026-10-14'}]
report['localFeatures']={'status':'PASS','evidence':['local-checks.json']}
if 'local-checks.json' not in report['technical']['evidence']:
    report['technical']['evidence'].append('local-checks.json')
accept.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
(review/'source-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
acceptance=review/'ACCEPTANCE.md'
text=acceptance.read_text(encoding='utf-8')
if '## Ngoại lệ W05 và tương tác cục bộ' not in text:
    text+='\n## Ngoại lệ W05 và tương tác cục bộ\n\nChủ sản phẩm đã duyệt JS cục bộ ngày 14/10/2026. local-checks.json ghi PASS cho search title/author, genre/saved filter, empty, save/remove, storage reload/cross-tab/blocked/corrupt và profile text escaping ở Chromium/Firefox. Ngoại lệ này không thay yêu cầu fidelity >95% và không phải ủy quyền triển khai. Source manifest đã cập nhật theo bản cuối.\n'
acceptance.write_text(text,encoding='utf-8')
print('Local feature QA and source manifest updated.')
