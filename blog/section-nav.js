(function () {
  var nav = document.querySelector('.section-nav');
  if (!nav) return;

  var links = [];
  var progressBar = nav.querySelector('.progress-bar');
  var sections = [];
  var activeId = null;
  var suppressHash = false;
  var suppressTimer = null;

  function slugify(text) {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function isHidden(el) {
    if (!el) return true;
    if (el.hasAttribute('hidden')) return true;
    var parent = el.closest('[data-lang-block]');
    if (parent && parent.hasAttribute('hidden')) return true;
    return false;
  }

  function buildNav() {
    var headings = Array.prototype.slice.call(document.querySelectorAll('article h2'));
    headings = headings.filter(function (h) { return !isHidden(h); });

    var existing = Array.prototype.slice.call(nav.querySelectorAll('a'));
    existing.forEach(function (a) { a.remove(); });

    links = [];
    sections = [];

    headings.forEach(function (h) {
      if (!h.id) {
        var slug = slugify(h.textContent);
        h.id = slug;
      }

      var link = document.createElement('a');
      link.setAttribute('href', '#' + h.id);
      link.textContent = h.textContent;
      link.addEventListener('click', function (e) {
        suppressHash = true;
        clearTimeout(suppressTimer);
        suppressTimer = setTimeout(function () { suppressHash = false; }, 800);
        setActive(h.id, false);
      });
      nav.appendChild(link);
      links.push(link);
      sections.push({ id: h.id, el: h, link: link });
    });

    activeId = null;
    setTimeout(function () {
      updateActive();
      updateProgress();
    }, 100);
  }

  function setActive(id, updateHash) {
    if (!id || id === activeId) return;
    activeId = id;
    links.forEach(function (l) {
      var href = l.getAttribute('href').replace('#', '');
      l.classList.toggle('active', href === id);
    });
    if (updateHash && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function updateActive() {
    var scrollY = window.scrollY + window.innerHeight * 0.35;
    var bestId = sections.length ? sections[0].id : null;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= scrollY) bestId = s.id;
    });
    if (suppressHash) { setActive(bestId, false); return; }
    setActive(bestId, true);
  }

  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.height = Math.min(pct, 100) + '%';
    }
  }

  function onScroll() {
    if (suppressHash) return;
    updateActive();
    updateProgress();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (window.PV_I18N) {
    window.addEventListener('pv:lang', function () {
      setTimeout(buildNav, 50);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();