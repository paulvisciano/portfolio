(function () {
  var form = document.getElementById('waitlist-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailEl = document.getElementById('wl-email');
    var email = emailEl ? emailEl.value.trim() : '';
    if (!email) return;
    try {
      var list = JSON.parse(localStorage.getItem('pv_waitlist') || '[]');
      if (list.indexOf(email) === -1) list.push(email);
      localStorage.setItem('pv_waitlist', JSON.stringify(list));
    } catch (err) {}
    var subject = 'AI course waitlist';
    var body = 'Please add me to the sovereign AI course waitlist.\n\nEmail: ' + email;
    window.location.href = 'mailto:paulvisciano.dev@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var conf = form.querySelector('.form-confirm');
    if (conf) conf.hidden = false;
    var btn = form.querySelector('button');
    if (btn) btn.disabled = true;
  });
})();
