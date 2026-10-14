from pathlib import Path
import re

product = Path(__file__).resolve().parents[2]
source = product / 'source'
(source / 'assets/css').mkdir(parents=True, exist_ok=True)
(source / 'assets/js').mkdir(parents=True, exist_ok=True)

books = [
    ('The Secret Garden', 'Ada Rivers', 'Fantasy', '#705046', '#e4bc70', 'garden'),
    ('Beyond the Water', 'Theo Bennett', 'Fiction', '#17394b', '#7fbbc4', 'water'),
    ('Father & Son', 'Robert Hayes', 'Memoir', '#203638', '#c1d0c6', 'mountain'),
    ('The Glass House', 'Emily Stone', 'Mystery', '#153c54', '#8bc5d1', 'house'),
    ('A Book of Longing', 'Sue Morgan', 'Fiction', '#163c34', '#ebc951', 'flower'),
    ('Darling Rose', 'Stephanie Reed', 'Thriller', '#f0c6b4', '#673c38', 'rose'),
    ('My Dark Summer', 'Kate Rowan', 'Mystery', '#eec298', '#963e20', 'sun'),
    ('Weather', 'Jenny Ellis', 'Fiction', '#305b99', '#d6e6f3', 'rain'),
]

def icon(name):
    paths = {
      'board': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      'collection': '<path d="M3 6h7l2 3h9v11H3z"/><path d="M3 6V4h8l2 3"/>',
      'saved': '<path d="M6 3h12v18l-6-4-6 4z"/>',
      'profile': '<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
      'search': '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
      'arrow': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
      'menu': '<path d="M4 6h16M4 12h16M4 18h16"/>',
      'leaf': '<path d="M20 3C8 2 2 8 5 15s13 6 15-12Z"/><path d="M4 21 16 7"/>',
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="icon">' + paths[name] + '</svg>'

def portrait(person, tone):
    return f'''<svg class="portrait portrait--{tone}" viewBox="0 0 80 80" role="img" aria-label="Illustrated portrait of {person}">
  <rect width="80" height="80" rx="22" fill="var(--portrait-bg)"/>
  <path d="M13 80c0-23 12-31 27-31s27 8 27 31" fill="var(--portrait-shirt)"/>
  <path d="M22 38C12 7 60 3 61 35l-5 24H23Z" fill="#292626"/>
  <ellipse cx="40" cy="35" rx="15" ry="19" fill="#b77e60"/>
  <path d="M24 30c4-2 18-4 21-15l13 17V16H23Z" fill="#292626"/>
  <path d="M34 43q6 5 12 0" fill="none" stroke="#5a3028" stroke-width="2"/>
  <circle cx="34" cy="34" r="1.5" fill="#292626"/><circle cx="47" cy="34" r="1.5" fill="#292626"/>
</svg>'''

def cover(i):
    title, author, genre, bg, fg, art = books[i]
    lines = title.upper().split()
    title_markup = ''.join(f'<tspan x="60" y="{30+j*16}">{word}</tspan>' for j, word in enumerate(lines))
    drawings = {
       'garden': '<path d="M18 157V89q42-59 84 0v68M31 157v-58q29-41 58 0v58" fill="none" stroke-width="3"/><path d="M60 164V85M60 113q-29 0-24-19 22-4 24 19m0 17q29 0 24-19-22-4-24 19" fill="none" stroke-width="2"/>',
       'water': '<circle cx="60" cy="105" r="31" fill="none" stroke-width="1"/><path d="M10 115q20-15 40 0t40 0t40 0M0 129q20-15 40 0t40 0t40 0M0 144q20-15 40 0t40 0t40 0" fill="none" stroke-width="4"/>',
       'mountain': '<circle cx="87" cy="85" r="14"/><path d="m0 166 44-67 21 35 18-22 37 54Z"/><path d="m31 119 13-20 14 22-14-5Z" fill="#fff"/>',
       'house': '<path d="M19 164V106l41-22 41 22v58M32 164v-42h56v42M60 87v77M19 106h82M32 140h56" fill="none" stroke-width="2"/>',
       'flower': '<path d="M60 170V80" fill="none" stroke-width="2"/>' + ''.join(f'<ellipse cx="{48 if j%2 else 72}" cy="{85+j*12}" rx="13" ry="7" transform="rotate({-30 if j%2 else 30} {48 if j%2 else 72} {85+j*12})"/>' for j in range(6)),
       'rose': '<path d="M61 167v-42m0 20q-30 2-27-18 26 1 27 18" fill="none" stroke-width="2"/><path d="M61 87q-32-26-32 8-20 21 8 29 10 27 29 4 31 9 28-18 12-24-12-28-13-13-21 5Z" fill="none" stroke-width="2"/><path d="M45 102q17-25 31 1-3 24-21 12-14-4 3-13" fill="none" stroke-width="2"/>',
       'sun': '<circle cx="60" cy="96" r="26"/><path d="M0 139q60-28 120 0v41H0Z" fill="#356a70"/><path d="M0 158q60-23 120 0" fill="none" stroke-width="3"/>',
       'rain': ''.join(f'<path d="m{x} {y} -3 8" fill="none" stroke-width="1"/>' for x in range(12,120,12) for y in range(90,164,16)) + '<path d="M0 172q30-20 60 0t60 0v8H0Z"/>',
    }
    return f'''<svg class="book-cover" viewBox="0 0 120 180" role="img" aria-label="Original illustrated cover for {title}">
  <rect width="120" height="180" rx="7" fill="{bg}"/>
  <rect x="6" y="6" width="108" height="168" rx="3" fill="none" stroke="{fg}" opacity=".45"/>
  <g fill="{fg}" stroke="{fg}">{drawings[art]}</g>
  <text text-anchor="middle" fill="{fg}" font-family="Georgia, serif" font-size="14" letter-spacing="1">{title_markup}</text>
  <rect x="7" y="163" width="106" height="11" fill="{bg}"/>
  <text x="60" y="172" text-anchor="middle" fill="{fg}" font-family="sans-serif" font-size="7" letter-spacing="1">{author.upper()}</text>
</svg>'''

nav = ''.join(f'<a href="#{anchor}"{current}>{icon(symbol)}<span>{label}</span></a>' for anchor,symbol,label,current in [
 ('main','board','My reading board',' aria-current="page"'), ('new-releases','collection','Collections',''), ('reading','saved','Reading list',''), ('profile','profile','Profile','')])
recent = ''.join(f'''<a class="reading-card reading-card--{i}" href="#book-{i}">
  {cover(i)}<span class="reading-card__copy"><strong>{b[0]}</strong><span>{b[1]}</span><small>{['193 pages · Chapter 13','New in your library','84 pages · Chapter 6'][i]}</small></span>
  <span class="reading-card__arrow">{icon('arrow')}</span>
</a>''' for i,b in enumerate(books[:3]))
shelf = ''.join(f'''<a class="shelf-book" href="#book-{i}">{cover(i)}<h3>{b[0]}</h3><p>{b[1]}</p><span class="genre">{b[2]}</span></a>''' for i,b in enumerate(books) if i>=3)
authors = ''.join(f'<li>{portrait(name,tone)}<span><strong>{name}</strong><small>{count} titles in this demo</small></span></li>' for name,tone,count in [('Ada Rivers','green',3),('Theo Bennett','blue',2),('Stephanie Reed','pink',1)])
details = ''.join(f'''<details id="book-{i}" class="book-detail"><summary>{b[0]} <span>{b[1]} · {b[2]}</span></summary><p>{[
 'An old garden opens a door to a world that has been waiting for someone to return.',
 'A coastal journey about the people we meet, the stories we keep, and finding a way home.',
 'A father and son retrace a mountain path and learn to listen to one another.',
 'A house on the edge of the city holds a secret behind every window.',
 'A novelist follows the small, persistent hopes that shape an ordinary life.',
 'A florist receives a letter that changes everything she thought she knew.',
 'A summer by the sea becomes a search for a friend who disappeared.',
 'One week of rain brings an unexpected friendship to a quiet neighbourhood.'
 ][i]}</p><p class="demo-note">Fictional book description. No full ebook is included.</p></details>''' for i,b in enumerate(books))
html = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Leaflit · Your personal reading space</title>
  <meta name="description" content="A calm personal book library with recent reads, new discoveries and author introductions. Static interface demo.">
  <meta property="og:title" content="Leaflit · Your personal reading space">
  <meta property="og:description" content="A personal library interface with original illustrated book covers.">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="assets/css/style.css">
  <script defer src="assets/js/main.js"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to your library</a>
<div class="library">
  <aside class="sidebar">
    <a href="#profile" class="welcome">{portrait('Sarah','green')}<span>Welcome back,</span><strong>Sarah</strong></a>
    <button class="menu-toggle" type="button" aria-controls="library-nav" aria-expanded="false">{icon('menu')}<span>Menu</span></button>
    <nav id="library-nav" class="sidebar__nav" aria-label="Library navigation">{nav}</nav>
    <a class="sidebar__brand" href="#about">{icon('leaf')}<span>A little space<br>for big stories.</span></a>
  </aside>
  <div class="workspace">
    <header class="topbar">
      <h1><a href="#main">Leaflit<span>.</span></a></h1>
      <div class="search-preview">{icon('search')}<span>Search your books</span><small>Demo only</small></div>
      <nav class="topbar__nav" aria-label="Discover books"><a href="#new-releases">New releases</a><a href="#authors">Authors</a></nav>
    </header>
    <main id="main" tabindex="-1">
      <section id="reading" class="reading-section" aria-labelledby="reading-title">
        <div class="section-heading"><h2 id="reading-title">Books you read last</h2><span>Pick up where you left off</span></div>
        <div class="reading-list">{recent}</div>
      </section>
      <div class="discovery">
        <section id="new-releases" class="releases" aria-labelledby="releases-title" data-reveal>
          <div class="section-heading"><h2 id="releases-title">New releases</h2><a href="#book-notes">Explore books {icon('arrow')}</a></div>
          <div class="book-shelf">{shelf}</div>
        </section>
        <aside id="authors" class="authors" aria-labelledby="authors-title" data-reveal><h2 id="authors-title">Featured authors</h2><ul>{authors}</ul><p>Meet the voices behind<br>your next favourite story.</p></aside>
      </div>
      <section id="book-notes" class="book-notes" aria-labelledby="notes-title" data-reveal>
        <div class="section-heading"><h2 id="notes-title">Inside the covers</h2><span>A few words to spark your curiosity</span></div>
        <div class="book-notes__list">{details}</div>
      </section>
      <section id="profile" class="profile" aria-labelledby="profile-title" data-reveal>{portrait('Sarah','green')}<div><h2 id="profile-title">Sarah’s reading corner</h2><p>This is a sample library. Make room for the stories you love.</p></div><a href="#reading">Back to your books {icon('arrow')}</a></section>
    </main>
    <footer id="about"><span>Leaflit · A personal reading space</span><p>Static interface demo. All books, authors and profile information are fictional.</p></footer>
  </div>
</div>
</body>
</html>
'''
(source/'index.html').write_text(html, encoding='utf-8')

# Keep the ten steps and twelve full prompts, adapting them to this library.
guide = (product.parent/'docs/customer-guide.en.md').read_text(encoding='utf-8')
guide = guide.replace('# Forge Zone customer guide', '# Leaflit customisation guide')
guide = guide.replace('your business', 'your reading library').replace('business information', 'library information')
edit_rows = []
for needle in ['Leaflit', 'Sarah', 'Search your books', 'Demo only', 'Books you read last', 'New releases', 'Featured authors', 'book-cover', 'book-detail']:
    edit_rows.append(f'| `index.html` | `{needle}` | {html.count(needle)} | Replace all matching content consistently; preserve IDs used by links. |')
guide = guide.replace('## Before you begin', '''## Template edit map

The library is static: search is an explicitly labelled visual preview. Book links jump to native expandable descriptions; they do not open an ebook. Reading list does not save data. Profile is fictional. There is no login, logout, payment or database.

| File | Literal text or selector | Count | What to change |
|---|---|---:|---|
''' + '\n'.join(edit_rows) + '''

Change colours and spacing in the `:root` block of `assets/css/style.css`. System fonts need no font downloads. Book illustrations are the inline SVG inside `.book-cover`; maintain each SVG viewBox. Cover title text and the adjacent HTML title are two separate copies: update both. Portrait SVGs are self-created sample illustrations. No third-party book-cover rights are included.

The eight `book-0` through `book-7` IDs are referenced by reading cards and shelf links. Rename an ID only together with every matching href. Author names appear in cover SVGs, book captions, expanded descriptions and sometimes the author list. Replace all relevant copies.

Motion defaults on when a page opens, including when OS reduced motion is set, according to the product owner's policy. Effects finish in 380ms and do not loop. No preference is stored. Menu and reveal are the only JavaScript behaviour in this candidate.

## Before you begin''')
# Prompts should ask for plain-language details, rather than require filled technical placeholders.
guide = re.sub(r'\[[A-Z][A-Z /,._:;?()"\'-]*\]', 'information I will provide; ask me if missing', guide)
(source/'CUSTOMISE.md').write_text(guide,encoding='utf-8')
(source/'README.md').write_text('''# Leaflit 1.0.0

A static personal book-library interface for designers and developers. This is a review candidate, not a released or verified ebook reader.

## Open
Extract the entire folder and double-click `index.html`. No build, installation, network connection or account is required. Preserve the relative asset paths.

## Included
Read `CUSTOMISE.md` for the template-specific edit map, ten setup steps and twelve AI prompts. Six source files: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt.

## Behaviour
Navigation links jump to real sections; book links jump to descriptions that expand using native details controls. The mobile menu closes on link selection or Escape. Reveal effects run once. Search is labelled Demo only and is not an editable input. Reading list and profile are static; no saved state, authentication, ebook content, downloads, payments or backend are included.

## Artwork and fonts
Inline SVG book covers and portraits are original sample illustrations. All book titles, authors, reading counts and profile information are fictional. This independent sample is not associated with Kindle or Amazon. Font stack uses fonts installed on the viewer's operating system; there are no external fonts or image requests. Change colours in CSS :root, illustrations in index.html, and keep SVG viewBox proportions.

## Verification
See the sibling reviews/1.0.0 folder for actual browser evidence and remaining checks. Do not assume Safari or physical devices have been tested. The fidelity gate is pending because the reference includes different photographic assets. Motion runs by default including OS reduced motion under the product owner's policy; finite effects do not loop.

## Licence
Read LICENCE.txt. Replace fictional content before publishing a real library.
''',encoding='utf-8')
licence = (product.parent/'dualplay/source/LICENCE.txt').read_text(encoding='utf-8')
licence = licence.replace('DUALPLAY', 'LEAFLIT')
start = licence.index('This independent design concept')
end = licence.index('\n\n5. FONTS')
licence = licence[:start] + 'The library, books, authors, reading counts and profile are fictional sample content. Replace them before publishing. The included original SVG illustrations may be used and modified within personal and client websites made with this licensed template. Do not sell or distribute the illustrations separately as stock assets or standalone image packs. Assets you add are your responsibility. No third-party ebook content or trademark rights are included.' + licence[end:]
(source/'LICENCE.txt').write_text(licence,encoding='utf-8')
(product/'README.md').write_text('# Leaflit\n\nSource: `source/`. Review candidate 1.0.0 from the supplied personal-library reference. See `reviews/1.0.0/BRIEF.md` and `QA.md` for scope and actual verification. No store integration or release ZIP until the acceptance gate passes.\n',encoding='utf-8')
print('Created Leaflit candidate source.')
