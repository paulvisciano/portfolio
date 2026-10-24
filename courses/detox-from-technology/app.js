/* The course preview uses same-origin endpoints; an email is acknowledged only after a successful durable save. */
(function () {
  'use strict';
  var interest = document.getElementById('interest');
  var form = interest.querySelector('form');
  var email = form.querySelector('[name="email"]');
  var consent = form.querySelector('input[type="checkbox"]');
  var submit = form.querySelector('button[type="submit"]');
  var privacy = document.querySelector('.privacy-dialog');
  var metricsControl = privacy.querySelector('input[type="checkbox"]');
  var sent = new Set();
  var ready = false;
  var params = new URLSearchParams(location.search);
  var test = params.get('qa') === '1';
  var enabled = true;
  var privacySignal = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  var session;
  var channel = (params.get('utm_medium') || 'direct').toLowerCase();
  if (['direct', 'social', 'paid-social', 'email', 'search'].indexOf(channel) < 0) channel = 'other';
  function uuid() {
    var b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = Array.from(b, function (v) { return v.toString(16).padStart(2, '0'); }).join('');
    return [h.slice(0, 8), h.slice(8, 12), h.slice(12, 16), h.slice(16, 20), h.slice(20)].join('-');
  }
  try {
    enabled = localStorage.getItem('detox-metrics') !== 'off';
    var prefix = test ? 'detox-test-' : 'detox-';
    session = sessionStorage.getItem(prefix + 'session') || uuid();
    sessionStorage.setItem(prefix + 'session', session);
    channel = sessionStorage.getItem(prefix + 'channel') || channel;
    sessionStorage.setItem(prefix + 'channel', channel);
  } catch (_) { session = uuid(); }
  enabled = enabled && !privacySignal;
  metricsControl.checked = enabled;
  function payload() { return {sessionId: session, channel: channel, isTest: test, analytics: enabled}; }
  function track(event) {
    if (!ready || !enabled || sent.has(event)) return;
    sent.add(event);
    fetch('/api/detox/events', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(Object.assign(payload(), {event: event})), keepalive: true}).catch(function () {});
  }
  if (test) {
    var banner = document.createElement('div'); banner.className = 'test-banner';
    banner.textContent = 'TEST MODE · Signups and visits are excluded from validation results. ';
    var exit = document.createElement('a'); exit.href = location.pathname; exit.textContent = 'Exit test mode ↗';
    banner.appendChild(exit); document.body.insertBefore(banner, document.body.firstChild);
  }
  document.querySelectorAll('.lesson-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var expand = button.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.lesson-toggle').forEach(function (other) {
        var active = other === button && expand;
        other.setAttribute('aria-expanded', String(active));
        other.closest('.lesson').classList.toggle('expanded', active);
        document.getElementById(other.getAttribute('aria-controls')).hidden = !active;
        other.querySelector('.expand-icon').textContent = active ? '−' : '+';
      });
      if (expand) track('curriculum_open');
    });
  });
  var menuButton = document.querySelector('.menu-button');
  var menu = document.querySelector('.nav-links');
  function closeMenu() { menu.classList.remove('show'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
  menuButton.addEventListener('click', function () {
    var open = menu.classList.toggle('show'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.nav-cta,.hero-actions .pill').forEach(function (button) {
    button.addEventListener('click', function () {
      track('cta_click'); closeMenu();
      interest.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
      setTimeout(function () { email.focus({preventScroll: true}); }, 450);
    });
  });
  var choices = [
    ['One quieter hour', 'Turn off one nonessential notification today. Keep calls and alerts you rely on.'],
    ['One intentional check-in', 'Before your next scroll, write down what you came to do. Leave when you have done it.'],
    ['One moment outside', 'Take a ten-minute walk with your phone tucked away. Notice five things around you.']
  ];
  var card = document.querySelector('.step-card');
  var commitment = card.querySelector('button');
  var committed = false;
  document.querySelectorAll('.exercise-option').forEach(function (button, index) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.exercise-option').forEach(function (other) {
        var active = other === button; other.setAttribute('aria-pressed', String(active)); other.classList.toggle('selected', active);
        var circle = other.querySelector('.radio-circle'); circle.replaceChildren(); if (active) circle.appendChild(document.createElement('i'));
      });
      card.querySelector('h3').textContent = choices[index][0]; card.querySelector('p').textContent = choices[index][1];
      committed = false; commitment.classList.remove('completed'); commitment.textContent = 'I’ll try this today →';
      card.querySelector('.exercise-note').textContent = 'Your choice stays on this page. No reminder, no new alert.';
    });
  });
  commitment.addEventListener('click', function () {
    committed = !committed; commitment.classList.toggle('completed', committed);
    commitment.textContent = committed ? '✓ Added to my intention for today' : 'I’ll try this today →';
    card.querySelector('.exercise-note').textContent = committed ? 'A small beginning is a beginning.' : 'Your choice stays on this page. No reminder, no new alert.';
    if (committed) track('exercise_complete');
  });
  document.querySelectorAll('.inline-button,.footer-bottom button').forEach(function (button) {
    button.addEventListener('click', function () { privacy.showModal(); });
  });
  privacy.querySelectorAll('.dialog-close,.pill').forEach(function (button) { button.addEventListener('click', function () { privacy.close(); }); });
  privacy.addEventListener('click', function (event) { if (event.target === privacy) privacy.close(); });
  metricsControl.addEventListener('change', function () {
    enabled = metricsControl.checked && !privacySignal; metricsControl.checked = enabled;
    try { localStorage.setItem('detox-metrics', enabled ? 'on' : 'off'); } catch (_) {}
    if (enabled) track('page_view');
  });
  var message = document.createElement('p'); message.className = 'form-error'; message.id = 'form-error'; message.setAttribute('aria-live', 'polite'); message.hidden = true;
  submit.before(message);
  function error(text, emailInvalid) { message.textContent = text; message.hidden = false; message.setAttribute('role', 'alert'); email.setAttribute('aria-invalid', emailInvalid ? 'true' : 'false'); track('signup_error'); }
  form.addEventListener('focusin', function () { track('form_start'); });
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); if (!ready || submit.disabled) return;
    var value = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) { error('Enter a valid email address.', true); email.focus(); return; }
    if (!consent.checked) { error('Please agree to receive course updates.', false); consent.focus(); return; }
    message.hidden = true; email.removeAttribute('aria-invalid'); track('signup_attempt'); submit.disabled = true;
    submit.textContent = 'Saving your interest…';
    try {
      var response = await fetch('/api/detox/interest', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(Object.assign(payload(), {email: value, goal: form.querySelector('[name="goal"]').value, consent: true, website: form.querySelector('[name="website"]').value}))});
      var result = await response.json(); if (!response.ok) throw new Error(result.error || 'We couldn’t save your interest. Please try again.');
      form.hidden = true;
      var success = document.createElement('div'); success.className = 'success-state'; success.setAttribute('role', 'status'); success.tabIndex = -1;
      var heading = document.createElement('h3'); heading.textContent = 'You’re on the list.';
      var copy = document.createElement('p'); copy.textContent = 'Your interest is saved. If this address was already on the list, you’re still all set. We’ll be in touch as the course takes shape.';
      var note = document.createElement('p'); note.className = 'fineprint'; note.textContent = 'No confirmation email is sent yet. Thanks for helping shape what comes next.';
      var reset = document.createElement('button'); reset.className = 'text-link'; reset.textContent = 'Use another email →';
      reset.addEventListener('click', function () { success.remove(); form.hidden = false; form.reset(); consent.checked = false; email.focus(); });
      success.append(heading, copy, note, reset); form.after(success); email.value = ''; success.focus();
    } catch (e) { error(e instanceof Error ? e.message : 'We couldn’t save your interest. Please try again.', false); }
    finally { submit.disabled = !ready; submit.textContent = 'Keep me in the loop ↗'; }
  });
  var observedForm = false;
  var observer = new IntersectionObserver(function (entries) { if (entries[0].isIntersecting) { observedForm = true; track('form_view'); } }, {threshold: 0.3}); observer.observe(interest);
  submit.disabled = true;
  fetch('/api/detox/status', {cache: 'no-store'}).then(function (response) { if (!response.ok) throw new Error('Interest collection is not available yet. Please try again later.'); return response.json(); }).then(function (status) {
    ready = status.collectionReady === true; submit.disabled = !ready;
    if (!ready) throw new Error('Interest collection is not available yet. Please try again later.');
    track('page_view'); if (observedForm) track('form_view');
  }).catch(function () { error('Interest collection is temporarily unavailable. Please try again later or contact Paul.', false); submit.disabled = true; });
})();
