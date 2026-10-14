from pathlib import Path
import re

product = Path(__file__).resolve().parents[2]
source = product/'source'
html = (source/'index.html').read_text(encoding='utf-8')
html = html.replace('Static interface demo.', 'Local library interface with sample books.')
html = html.replace('<strong>Sarah</strong></a>', '<strong data-profile-name>Sarah</strong></a>', 1)
html = html.replace('href="#new-releases"><svg viewBox', 'href="#collections"><svg viewBox', 1)
html = html.replace('href="#reading"><svg viewBox', 'href="#collections" data-saved-view><svg viewBox', 1)
html = html.replace('<span>Reading list</span>', '<span>Saved books <span data-saved-count>0</span></span>', 1)
start = html.index('      <div class="search-preview">')
end = html.index('\n', start)
html = html[:start] + '''      <label class="search-preview local-only" for="book-search"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="icon"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input id="book-search" type="search" placeholder="Search your books" aria-label="Search books by title or author" maxlength="100"></label>''' + html[end:]
html = html.replace('    <main id="main" tabindex="-1">', '''    <main id="main" tabindex="-1">
      <noscript><p class="notice">Enable JavaScript to search, save books and edit your local profile. All sample book descriptions remain available below.</p></noscript>''')
collection = '''      <section id="collections" class="collections local-only" aria-labelledby="collections-title">
        <div class="section-heading"><h2 id="collections-title">Your collection</h2><span>Eight stories, one little library</span></div>
        <div class="collection-controls">
          <label for="genre-filter">Genre <select id="genre-filter"><option value="all">All genres</option><option>Fantasy</option><option>Fiction</option><option>Memoir</option><option>Mystery</option><option>Thriller</option></select></label>
          <label for="view-filter">Show <select id="view-filter"><option value="all">All books</option><option value="saved">Saved books</option></select></label>
          <button id="clear-filters" type="button">Clear filters</button>
        </div>
        <p id="result-count" class="result-count" role="status" aria-live="polite" aria-atomic="true"></p>
        <div id="collection-grid" class="collection-grid"></div>
        <p id="empty-results" class="notice" hidden>No books match. Try another title, author or genre.</p>
      </section>
'''
html = html.replace('      <section id="book-notes"', collection + '      <section id="book-notes"', 1)
html = html.replace('<h2 id="profile-title">Sarah’s reading corner</h2>', '<h2 id="profile-title"><span data-profile-name>Sarah</span>’s reading corner</h2>')
html = html.replace('This is a sample library. Make room for the stories you love.', 'This is your local reading space. Make room for the stories you love.')
html = html.replace('    </main>', '''      <form id="profile-form" class="profile-form local-only">
        <label for="profile-name">Your display name <input id="profile-name" name="name" required maxlength="40" autocomplete="nickname" value="Sarah"></label>
        <button type="submit">Save profile</button>
        <p class="demo-note">Saved in this browser only. No account or cloud sync.</p>
      </form>
      <p id="local-feedback" class="local-feedback local-only" role="status" aria-live="polite" aria-atomic="true"></p>
    </main>''')
html = html.replace('Static interface demo. All books, authors and profile information are fictional.', 'Local library demo. Sample books and authors are fictional; no full ebooks are included.')
(source/'index.html').write_text(html,encoding='utf-8')

readme = (source/'README.md').read_text(encoding='utf-8')
readme = readme.replace('A static personal book-library interface', 'A browser-local personal book-library interface')
start = readme.index('## Behaviour')
end = readme.index('## Artwork')
readme = readme[:start] + '''## Behaviour
Search by title or author, filter by genre, view saved books, save/remove any of the eight books, and edit the local display name. Book descriptions expand with native details controls. The mobile menu closes on link selection or Escape. Finite reveal effects run once.

Saved IDs and display name use the `leaflit.library.v1` localStorage key on the current origin. Storage is per browser and origin, not shared between file:// and HTTP addresses. Private browsing or browser policies may prevent persistence; the page displays a message and keeps changes in memory for that session. Multiple tabs on the same origin synchronise via the storage event. Clearing browser site data clears this library's settings. No account, server, analytics or cloud sync is included. All full ebook content, payments and downloads are outside scope.

Without JavaScript, the search/save/profile controls are hidden and all book links and expandable descriptions remain usable. Local features do not need network access.

''' + readme[end:]
(source/'README.md').write_text(readme,encoding='utf-8')
custom = (source/'CUSTOMISE.md').read_text(encoding='utf-8')
start=custom.index('The library is static:')
end=custom.index('\n\n| File',start)
custom=custom[:start]+'''The library works locally: search matches title/author, genre filters the collection, Save/Remove toggles saved books, and the profile form edits a display name. All eight titles are samples and no ebook files are included. Local storage is scoped to the current browser and origin with key `leaflit.library.v1`. Changes are kept in memory when storage is blocked, with a visible warning. Without JavaScript only static navigation and book descriptions remain. There is no login, logout, payment, database or server sync.''' + custom[end:]
custom=custom.replace('Menu and reveal are the only JavaScript behaviour in this candidate.', 'Menu, reveal, search, genre/saved filters, saved-book persistence and profile editing are implemented in assets/js/main.js. Local interactions are an owner-approved exception to W05 on 14 October 2026, for Leaflit only.')
rows=[]
for needle in ['Leaflit','Sarah','Search your books','Books you read last','New releases','Featured authors','book-cover','book-detail','data-profile-name','collection-grid']:
    rows.append(f'| `index.html` | `{needle}` | {html.count(needle)} | Replace matching content consistently; preserve linked IDs and data attributes. |')
custom=re.sub(r'\| File \| Literal text or selector \| Count \| What to change \|\n\|---\|---\|---:\|---\|\n(?:\| `index.html`.*\n)+', '| File | Literal text or selector | Count | What to change |\n|---|---|---:|---|\n'+'\n'.join(rows)+'\n',custom)
custom=custom.replace('Font ownership remains', 'Font ownership remains')
(source/'CUSTOMISE.md').write_text(custom,encoding='utf-8')
brief=product/'reviews/1.0.0/BRIEF.md'
brief.write_text(brief.read_text(encoding='utf-8').replace('Đang chờ lựa chọn của chủ sản phẩm về JS tìm kiếm/lưu sách cục bộ (W05).','Ngoại lệ W05 được chủ sản phẩm duyệt ngày 14/10/2026: “Cho phép tương tác cục bộ”. Tìm kiếm, genre/saved filter, lưu/bỏ lưu và profile display name; localStorage, không backend.'),encoding='utf-8')
print('Local feature markup and documents updated.')
