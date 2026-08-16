(function () {
  var STORAGE_KEY = 'pv-lang';
  var SUPPORTED = ['en', 'bg', 'es', 'de'];
  var dict = window.I18N_DICT || {};

  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && SUPPORTED.indexOf(q) >= 0) return q;
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && SUPPORTED.indexOf(s) >= 0) return s;
    } catch (e) {}
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(nav) >= 0) return nav;
    return 'en';
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = 'en';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
    document.documentElement.lang = (dict[lang] && dict[lang].html_lang) || lang;
    document.querySelectorAll('.lang-switch [data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    window.dispatchEvent(new CustomEvent('pv:lang', { detail: { lang: lang } }));
  }

  function t(lang, key) {
    var d = dict[lang] || dict.en || {};
    if (d[key] != null) return d[key];
    if (dict.en && dict.en[key] != null) return dict.en[key];
    return null;
  }

  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(lang, key);
      if (val == null) return;
      if (el.tagName === 'TITLE') { document.title = val; return; }
      if (el.tagName === 'META') { el.setAttribute('content', val); return; }
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) { el.setAttribute(attr, val); return; }
      if (el.getAttribute('data-i18n-html') === '1') el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = t(lang, key);
      if (val != null) el.setAttribute('placeholder', val);
    });
    // Full blog body blocks (one per language)
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      var show = el.getAttribute('data-lang-block') === lang;
      el.hidden = !show;
      if (show) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  function bindSwitcher() {
    document.querySelectorAll('.lang-switch [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(btn.getAttribute('data-lang'));
      });
    });
  }

  window.PV_I18N = {
    getLang: getLang,
    setLang: setLang,
    t: function (key) { return t(getLang(), key); },
    apply: apply,
    supported: SUPPORTED
  };

  function boot() {
    dict = window.I18N_DICT || dict;
    bindSwitcher();
    setLang(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
