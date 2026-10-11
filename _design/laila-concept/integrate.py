from pathlib import Path
import shutil

workspace = Path.cwd()
release = Path(r'C:\Users\Lenovo\.codex\worktrees\velora-release\2A')
for tree in [workspace, release]:
    files = [('real-templates.ts', 'catalog-entry.txt', 'export const REAL_TEMPLATES: Record<string, RealTemplate> = {'), ('template-guides.ts', 'guide-entry.txt', 'export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {')]
    for filename, fragment, marker in files:
        target = tree / 'web/src/lib' / filename
        content = target.read_text(encoding='utf-8')
        assert ('t20:' not in content if filename == 'real-templates.ts' else '  laila:' not in content), 'Entry already exists; do not overwrite'
        assert content.count(marker) == 1
        entry = (workspace / '_design/laila-concept' / fragment).read_text(encoding='utf-8')
        target.write_text(content.replace(marker, marker + '\n' + entry, 1), encoding='utf-8')
    product = tree / 'web/product/giao-dien-web/laila'
    if tree != workspace:
        assert not product.exists()
        shutil.copytree(workspace / 'web/product/giao-dien-web/laila', product)
    demo = tree / 'web/public/demos/laila'
    assert not demo.exists()
    demo.mkdir(parents=True)
    for rel in ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'assets/img/portrait.webp', 'CUSTOMISE.md', 'README.md']:
        target = demo / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(product / 'source' / rel, target)
    preview = tree / 'web/public/previews/laila.webp'
    preview.parent.mkdir(parents=True, exist_ok=True)
    if tree != workspace:
        shutil.copy2(workspace / 'web/public/previews/laila.webp', preview)
print('Added only Laila and its two catalog entries to workspace and release checkout')
