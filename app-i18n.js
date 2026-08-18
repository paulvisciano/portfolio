/* Project card i18n live updates */
(function () {
  function tt(key, fallback) {
    try {
      if (window.PV_I18N && window.PV_I18N.t) {
        var v = window.PV_I18N.t(key);
        if (v) return v;
      }
    } catch (e) {}
    return fallback;
  }
  var map = {
    'project-urban-runner': { label: 'proj_wip_label', desc: 'proj_wip_desc' },
    'project-knowledge-graph': { label: 'proj_kg_label', desc: 'proj_kg_desc' },
    'project-musical-cubes': { label: 'proj_mc_label', desc: 'proj_mc_desc' },
    'project-neuro-graph': { label: 'proj_ng_label', desc: 'proj_ng_desc' }
  };
  function refresh() {
    document.querySelectorAll('.project-card[data-od-id]').forEach(function (card) {
      var id = card.getAttribute('data-od-id');
      var keys = map[id];
      if (!keys) return;
      var label = card.querySelector('.card-label');
      var desc = card.querySelector('.card-desc');
      if (label) label.textContent = tt(keys.label, label.textContent);
      if (desc) desc.textContent = tt(keys.desc, desc.textContent);
      var toggle = card.querySelector('.card-desc-toggle');
      if (toggle) {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.childNodes[0].textContent = expanded ? tt('read_less', 'Read less') : tt('read_more', 'Read more');
      }
      var repo = card.querySelector('.card-repo');
      if (repo) repo.textContent = tt('code', 'Code ↗');
      var tip = card.querySelector('.card-tooltip');
      if (tip) tip.textContent = tt('visit_tooltip', 'Click to visit live site ↗');
    });
  }
  window.addEventListener('pv:lang', refresh);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(refresh, 50); });
  } else {
    setTimeout(refresh, 50);
  }
})();
