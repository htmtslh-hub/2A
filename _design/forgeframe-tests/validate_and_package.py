import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import zipfile
from PIL import Image, ImageDraw
import yaml

root = Path(__file__).resolve().parents[2]
skill = root / 'skill' / 'forgeframe'
evidence = Path(__file__).resolve().parent
checks = []

def invoke(script, *args, success=True):
    result = subprocess.run([sys.executable, '-X', 'utf8', str(script), *map(str, args)], capture_output=True, text=True, encoding='utf-8')
    assert (result.returncode == 0) == success, result.stderr + result.stdout
    return result

invoke(Path('C:/Users/Lenovo/.codex/skills/.system/skill-creator/scripts/quick_validate.py'), skill)
checks.append('Skill frontmatter validator passed')
metadata = yaml.safe_load((skill / 'agents/openai.yaml').read_text(encoding='utf-8'))
assert 25 <= len(metadata['interface']['short_description']) <= 64
assert '$forgeframe' in metadata['interface']['default_prompt']
for file in skill.rglob('*.md'):
    for link in re.findall(r'\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
        if '://' not in link and not link.startswith('#'):
            assert (file.parent / link.split('#')[0]).exists(), (file, link)
checks.append('Metadata and local reference links passed')
reference = Image.new('RGB', (120, 80), 'white')
ImageDraw.Draw(reference).rectangle((10, 10, 50, 50), fill='#ee0088')
reference.save(evidence / 'reference.png')
actual = Image.new('RGB', (120, 80), 'white')
ImageDraw.Draw(actual).rectangle((40, 10, 80, 50), fill='#ee0088')
actual.save(evidence / 'shifted.png')
Image.new('RGB', (121, 80), 'white').save(evidence / 'wrong-size.png')
compare = skill / 'scripts/compare_visual.py'
for name, target in [('identical', 'reference.png'), ('shifted', 'shifted.png')]:
    invoke(compare, '--reference', evidence / 'reference.png', '--actual', evidence / target, '--output', evidence / name)
    report = json.loads((evidence / name / 'comparison.json').read_text(encoding='utf-8'))
    assert report['gate'] == 'NOT ASSESSED' and report['fidelityRubric'] == 'NOT SCORED'
    assert (report['meanAbsoluteRgbError'] == 0) == (name == 'identical')
invoke(compare, '--reference', evidence / 'reference.png', '--actual', evidence / 'wrong-size.png', '--output', evidence / 'mismatched', success=False)
invoke(compare, '--reference', evidence / 'reference.png', '--actual', evidence / 'reference.png', '--output', evidence / 'identical', success=False)
checks.append('Visual diagnostics: identical, changed, mismatched dimensions and overwrite protection passed; no automatic acceptance')
video_manifest = json.loads((evidence / 'video-auto/frames.json').read_text(encoding='utf-8'))
assert video_manifest['coverage'] == 'NOT ASSESSED' and len(video_manifest['frames']) >= 2
for frame in video_manifest['frames']:
    with Image.open(evidence / 'video-auto' / frame['file']) as image:
        assert image.size == (video_manifest['width'], video_manifest['height'])
extract = skill / 'scripts/extract_frames.py'
invoke(extract, '--input', 'C:/Users/Lenovo/Downloads/Pinterest.mp4', '--output', evidence / 'video-detail', '--times', '1.2,1.35,1.5,1.7,2.0')
assert len(json.loads((evidence / 'video-detail/frames.json').read_text())['frames']) == 5
invoke(extract, '--input', 'C:/Users/Lenovo/Downloads/Pinterest.mp4', '--output', evidence / 'video-auto', success=False)
checks.append('Actual Pinterest video: automatic 12 frames at 720x540, focused 5 frames and overwrite protection passed')
body = (skill / 'SKILL.md').read_text(encoding='utf-8').split('---', 2)[2].strip()
body = re.sub(r'\[([^]]+)\]\(([^)]+)\)', lambda match: match[1] + ' (xem phụ lục cùng tên bên dưới)' if not '://' in match[2] else match[0], body)
portable = '# ForgeFrame — quy trình độc lập cho AI\n\nNạp tài liệu này một lần làm hướng dẫn dự án/preset, sau đó gọi ForgeFrame cùng ảnh/video. Mỗi chat mới cần nạp lại nếu AI không lưu hướng dẫn. Quy trình yêu cầu công cụ file, browser, Git và hosting; thiếu công cụ thì báo phần chưa thực hiện.\n\n' + body
for relative in ['references/acceptance.md', 'references/video.md', 'references/release.md', 'references/forge-zone/product-standards.md', 'references/forge-zone/instruction-product.txt', 'references/forge-zone/customer-guide.en.md']:
    text = (skill / relative).read_text(encoding='utf-8')
    text = re.sub(r'\[([^]]+)\]\(([^)]+)\)', lambda match: match[1] + ' (phụ lục)' if '://' not in match[2] else match[0], text)
    portable += '\n\n---\n\n## Phụ lục: ' + relative + '\n\n' + text
portable += '\n\n## Công cụ đi kèm\n\nGói ZIP có scripts/extract_frames.py và scripts/compare_visual.py trong thư mục forgeframe. Bản tài liệu này có thể dùng với công cụ tương đương: trích frame tại timestamp thật; tạo ảnh overlay/difference không chỉnh méo ảnh; đánh giá rubric có bằng chứng. Không được tự nhận đã chạy script khi chưa có công cụ.\n'
(root / 'skill/FORGEFRAME.md').write_text(portable, encoding='utf-8')
install = Path('C:/Users/Lenovo/.codex/skills/forgeframe')
assert not install.exists(), 'Existing installation must be inspected before replacement'
shutil.copytree(skill, install)
payload = list(skill.rglob('*'))
archive = root / 'skill/forgeframe.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as package:
    for file in payload:
        if file.is_file():
            package.write(file, Path('forgeframe') / file.relative_to(skill))
    package.write(root / 'skill/FORGEFRAME.md', 'FORGEFRAME.md')
    package.write(root / 'skill/FORGEFRAME-HUONG-DAN.md', 'FORGEFRAME-HUONG-DAN.md')
with zipfile.ZipFile(archive) as package:
    assert package.testzip() is None
    for file in payload:
        if file.is_file():
            assert package.read((Path('forgeframe') / file.relative_to(skill)).as_posix()) == file.read_bytes()
            assert (install / file.relative_to(skill)).read_bytes() == file.read_bytes()
checks.append('ZIP integrity and byte-identical installed skill passed')
report = {'checks': checks, 'archive': str(archive), 'bytes': archive.stat().st_size,
          'sha256': hashlib.sha256(archive.read_bytes()).hexdigest(), 'installed': str(install),
          'scope': 'Workflow and helpers only; no product publication in this task'}
(evidence / 'validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
