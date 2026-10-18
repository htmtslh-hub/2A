from pathlib import Path
import zipfile

root = Path.cwd()
product = root / 'web/product/giao-dien-web/astro-armor'
review = product / 'reviews/1.0.0'
# Internal test fixture only. This is not the commercial customer package.
with zipfile.ZipFile(review / 'candidate-test.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted((product / 'source').rglob('*')):
        if file.is_file():
            archive.write(file, 'astro-armor/' + file.relative_to(product / 'source').as_posix())
script = (root / 'web/product/giao-dien-web/tools/check-template.mjs').read_text(encoding='utf-8')
script = script.replace("import('../../../../_design/.tooling/node_modules/playwright/index.mjs')", "import('" + (root / '_design/.tooling/node_modules/playwright/index.mjs').as_uri() + "')")
script = script.replace("import('../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs')", "import('" + (root / '_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs').as_uri() + "')")
script = script.replace('const zipPath = resolve(productDir, `${slug}.zip`);', "const zipPath = resolve(productDir, 'reviews/1.0.0/candidate-test.zip');")
(review / 'check-candidate.mjs').write_text(script, encoding='utf-8')
print('Internal fixture and unmodified checks prepared; only fixture/import paths adapted.')
