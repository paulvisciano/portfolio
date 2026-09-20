(function () {
  var slug = document.body.getAttribute('data-book') || '';
  var STORAGE_KEY = (slug || 'book') + '-scroll';
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

  var article = document.getElementById('book');
  var rail = document.querySelector('.chapter-rail');
  var select = document.getElementById('chapter-select');
  var topBar = document.querySelector('.read-progress-bar');
  var railBar = document.querySelector('.rail-progress-bar');
  var progressEl = document.querySelector('.read-progress');

  var chapterEls = [];
  var railLinks = [];
  var activeId = null;
  var saveTimer = null;

  function el(tag, props) {
    var node = document.createElement(tag);
    var key;
    if (props) {
      for (key in props) {
        if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
        if (key === 'className') node.className = props[key];
        else if (key === 'text') node.textContent = props[key];
        else if (props[key] === true) node.setAttribute(key, '');
        else if (props[key] != null) node.setAttribute(key, String(props[key]));
      }
    }
    var i;
    for (i = 2; i < arguments.length; i++) {
      if (arguments[i] == null) continue;
      node.appendChild(typeof arguments[i] === 'string'
        ? document.createTextNode(arguments[i])
        : arguments[i]);
    }
    return node;
  }

  function shortLabel(ch) {
    return ch.n === 0 ? 'Intro' : ROMAN[ch.n] || String(ch.n);
  }

  function renderTitlePage(book) {
    var header = el('header', { className: 'titlepage', id: 'titlepage' });

    var cover = el('figure', { className: 'titlepage-cover' });
    var img = el('img', {
      src: '/books/covers/' + encodeURIComponent(slug) + '.jpg',
      alt: book.title,
      width: '1792',
      height: '1120'
    });
    img.addEventListener('error', function () {
      header.classList.add('no-cover');
    });
    cover.appendChild(img);
    header.appendChild(cover);

    var copy = el('div', { className: 'titlepage-copy' });
    if (book.year) copy.appendChild(el('p', { className: 'meta', text: String(book.year) }));
    copy.appendChild(el('h1', { text: book.title }));
    if (book.subtitle) copy.appendChild(el('p', { className: 'subtitle', text: book.subtitle }));
    if (book.author) copy.appendChild(el('p', { className: 'author', text: book.author }));
    if (book.epigraph) copy.appendChild(el('blockquote', { className: 'epigraph', text: book.epigraph }));
    if (book.dedication) copy.appendChild(el('p', { className: 'dedication', text: book.dedication }));

    var first = (book.chapters && book.chapters[0]) ? book.chapters[0] : null;
    if (first) {
      copy.appendChild(el('a', {
        className: 'titlepage-begin',
        href: '#' + first.id,
        text: 'Begin reading'
      }));
    }

    header.appendChild(copy);
    return header;
  }

  function renderChapter(ch, prev, next) {
    var section = el('section', { className: 'chapter', id: ch.id });
    section.appendChild(el('h2', { text: ch.title }));

    var i;
    for (i = 0; i < ch.paragraphs.length; i++) {
      section.appendChild(el('p', { text: ch.paragraphs[i] }));
    }

    var nav = el('nav', { className: 'chapter-nav', 'aria-label': 'Chapter' });
    if (prev) {
      nav.appendChild(el('a', {
        className: 'prev',
        href: '#' + prev.id,
        text: 'Previous: ' + prev.title
      }));
    }
    if (next) {
      nav.appendChild(el('a', {
        className: 'next',
        href: '#' + next.id,
        text: 'Next: ' + next.title
      }));
    }
    section.appendChild(nav);
    return section;
  }

  function renderSource(book) {
    var note = el('p', { className: 'source' });
    note.appendChild(document.createTextNode(book.note + ' '));
    var link = el('a', {
      href: book.sourceVideo,
      rel: 'noopener noreferrer',
      target: '_blank',
      text: book.sourceVideoTitle || 'Watch the reading'
    });
    note.appendChild(link);
    note.appendChild(document.createTextNode('.'));
    return note;
  }

  function renderBook(book) {
    var frag = document.createDocumentFragment();
    var chapters = book.chapters || [];
    var i;

    frag.appendChild(renderTitlePage(book));
    for (i = 0; i < chapters.length; i++) {
      frag.appendChild(renderChapter(
        chapters[i],
        i > 0 ? chapters[i - 1] : null,
        i < chapters.length - 1 ? chapters[i + 1] : null
      ));
    }
    frag.appendChild(renderSource(book));
    article.replaceChildren(frag);

    chapterEls = Array.prototype.slice.call(article.querySelectorAll('.chapter'));
    buildToc(chapters);
  }

  function buildToc(chapters) {
    var i;
    var existing = rail.querySelectorAll('a');
    for (i = 0; i < existing.length; i++) existing[i].remove();
    railLinks = [];

    if (select) {
      while (select.firstChild) select.removeChild(select.firstChild);
    }

    for (i = 0; i < chapters.length; i++) {
      (function (ch) {
        var link = el('a', {
          href: '#' + ch.id,
          title: ch.title,
          text: shortLabel(ch)
        });
        rail.appendChild(link);
        railLinks.push(link);

        if (select) {
          select.appendChild(el('option', { value: ch.id, text: ch.title }));
        }
      })(chapters[i]);
    }
  }

  function progressPct() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
  }

  function updateProgress() {
    var pct = progressPct();
    if (topBar) topBar.style.width = pct + '%';
    if (railBar) railBar.style.height = pct + '%';
    if (progressEl) progressEl.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  function currentChapterId() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var best = chapterEls.length ? chapterEls[0].id : null;
    var i;
    for (i = 0; i < chapterEls.length; i++) {
      if (chapterEls[i].offsetTop <= y) best = chapterEls[i].id;
    }
    return best;
  }

  function setActive(id) {
    if (!id || id === activeId) return;
    activeId = id;
    var i;
    for (i = 0; i < railLinks.length; i++) {
      var href = railLinks[i].getAttribute('href').slice(1);
      railLinks[i].classList.toggle('active', href === id);
    }
    if (select && select.value !== id) select.value = id;
  }

  function saveScroll() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Math.round(window.scrollY)));
    } catch (e) { /* private mode */ }
  }

  function restoreScroll() {
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) window.scrollTo({ top: parseInt(saved, 10) || 0, left: 0, behavior: 'auto' });
    } catch (e) { /* private mode */ }
  }

  function onScroll() {
    updateProgress();
    setActive(currentChapterId());
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveScroll, 150);
  }

  function goChapter(delta) {
    if (!chapterEls.length) return;
    var id = currentChapterId();
    var idx = 0;
    var i;
    for (i = 0; i < chapterEls.length; i++) {
      if (chapterEls[i].id === id) { idx = i; break; }
    }
    var next = chapterEls[idx + delta];
    if (!next) return;
    next.scrollIntoView();
    if (history.replaceState) history.replaceState(null, '', '#' + next.id);
    setActive(next.id);
  }

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'ArrowRight' || e.key === 'j') goChapter(1);
    else if (e.key === 'ArrowLeft' || e.key === 'k') goChapter(-1);
  }

  function showError(msg) {
    article.replaceChildren(el('p', { className: 'error', text: msg }));
  }

  if (select) {
    select.addEventListener('change', function () {
      var target = document.getElementById(select.value);
      if (target) {
        target.scrollIntoView();
        if (history.replaceState) history.replaceState(null, '', '#' + select.value);
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('keydown', onKey);

  if (!slug) {
    showError('Missing data-book on this page.');
    return;
  }

  fetch('/books/' + encodeURIComponent(slug) + '/book.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Could not load the book.');
      return res.json();
    })
    .then(function (book) {
      if (book.title) document.title = book.title + ' — Paul Visciano';
      renderBook(book);
      restoreScroll();
      updateProgress();
      setActive(currentChapterId());
    })
    .catch(function () {
      showError('Could not load the book. Serve this folder over HTTP so book.json can be fetched.');
    });
})();
