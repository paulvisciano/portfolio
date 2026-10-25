/* Course interest is emailed through Web3Forms. No funnel analytics are enabled. */
(function () {
  'use strict';
  var interest = document.getElementById('interest');
  var form = interest.querySelector('form');
  var email = form.querySelector('[name="email"]');
  var consent = form.querySelector('[name="consent"]');
  var submit = form.querySelector('button[type="submit"]');
  var privacy = document.querySelector('.privacy-dialog');
  var params = new URLSearchParams(location.search);
  var test = params.get('qa') === '1';
  // Reserved interaction hooks; no analytics requests or identifiers are created.
  function track() {}
  if (test) {
    var banner = document.createElement('div'); banner.className = 'test-banner';
    banner.textContent = 'TEST MODE · No signup email will be sent. ';
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
  var message = document.createElement('p'); message.className = 'form-error'; message.id = 'form-error'; message.setAttribute('aria-live', 'polite'); message.hidden = true;
  submit.before(message);
  function error(text, emailInvalid) { message.textContent = text; message.hidden = false; message.setAttribute('role', 'alert'); email.setAttribute('aria-invalid', emailInvalid ? 'true' : 'false'); track('signup_error'); }
  form.addEventListener('focusin', function () { track('form_start'); });
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); if (submit.disabled) return;
    var value = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) { error('Enter a valid email address.', true); email.focus(); return; }
    if (!consent.checked) { error('Please agree to receive course updates.', false); consent.focus(); return; }
    if (form.querySelector('[name="website"]').value || form.querySelector('[name="botcheck"]').checked) return;
    if (test) { error('Test mode: validation passed. No signup email was sent.', false); return; }
    message.hidden = true; email.removeAttribute('aria-invalid'); track('signup_attempt'); submit.disabled = true;
    email.readOnly = true; consent.disabled = true;
    var goal = form.querySelector('[name="goal"]'); goal.disabled = true;
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 20000);
    submit.textContent = 'Joining the waitlist…';
    try {
      var data = {
        access_key: form.querySelector('[name="access_key"]').value,
        subject: form.querySelector('[name="subject"]').value,
        from_name: 'Detox course interest',
        email: value,
        goal: goal.value,
        course: 'Detox from Technology',
        consent: 'Yes — I’d like to join the course waitlist and receive enrollment updates. I can ask to be removed at any time.',
        consent_version: 'detox-waitlist-v2',
        consent_at: new Date().toISOString(),
        source: '/courses/detox-from-technology/'
      };
      var response = await fetch(form.action, {
        method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(data), signal: controller.signal, credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin'
      });
      var result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission rejected');
      form.hidden = true;
      var success = document.createElement('div'); success.className = 'success-state'; success.setAttribute('role', 'status'); success.tabIndex = -1;
      var heading = document.createElement('h3'); heading.textContent = 'You’re on the waitlist.';
      var copy = document.createElement('p'); copy.textContent = 'Your waitlist request has been sent to Paul. We’ll email you when enrollment opens, with the details you need to decide whether to join.';
      var note = document.createElement('p'); note.className = 'fineprint'; note.textContent = 'No payment is required. You won’t receive an automated confirmation email.';
      var reset = document.createElement('button'); reset.className = 'text-link'; reset.textContent = 'Use another email →';
      reset.addEventListener('click', function () { success.remove(); form.hidden = false; form.reset(); consent.checked = false; email.focus(); });
      success.append(heading, copy, note, reset); form.after(success); email.value = ''; success.focus();
    } catch (e) {
      error(e.name === 'AbortError' ? 'The request timed out. Your interest may have been sent; please check before retrying.' : 'We couldn’t send your interest. Please try again.', false);
    } finally {
      clearTimeout(timeout); submit.disabled = false; email.readOnly = false; consent.disabled = false; goal.disabled = false;
      submit.textContent = 'Join the waitlist ↗';
    }
  });
  // Enable signup only after the consent-checking handler is installed.
  submit.disabled = false;
})();

