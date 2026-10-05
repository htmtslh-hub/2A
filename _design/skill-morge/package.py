"""Create a portable ZIP and install this task's validated skill locally."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import zipfile

task_root = Path(__file__).resolve().parents[2]
source = task_root / 'skill' / 'skill-morge'
report = json.loads((task_root / '_design' / 'skill-morge' / 'verification.json').read_text(encoding='utf-8'))
assert report['pass'] and not report['failures'] and not report['errors'], 'Browser verification must pass.'
codex_root = Path(os.environ.get('CODEX_HOME') or Path.home() / '.codex')
installed = codex_root / 'skills' / 'skill-morge'
assert not installed.exists(), f'An existing skill needs to be reviewed before replacement: {installed}'
files = sorted(path for path in source.rglob('*') if path.is_file())
assert len(files) == 8, f'Unexpected file inventory: {files}'
assert all(path.suffix in {'.md', '.yaml', '.js', '.css', '.html'} for path in files)
installed.parent.mkdir(parents=True, exist_ok=True)
shutil.copytree(source, installed)
archive = task_root / 'skill' / 'skill-morge.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as bundle:
    for path in files:
        bundle.write(path, (Path('skill-morge') / path.relative_to(source)).as_posix())
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert len(bundle.namelist()) == len(files)
    for path in files:
        relative = path.relative_to(source)
        assert path.read_bytes() == (installed / relative).read_bytes()
        assert path.read_bytes() == bundle.read((Path('skill-morge') / relative).as_posix())
print(json.dumps({
    'installed': str(installed), 'archive': str(archive), 'files': len(files),
    'bytes': archive.stat().st_size, 'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()
}, ensure_ascii=False, indent=2))
