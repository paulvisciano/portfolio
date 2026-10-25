(function () {
  'use strict';
  document.querySelectorAll('.courses-grid').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('.course-card'));
    var controls = carousel.parentElement.querySelector('.course-controls');
    var current = 0;
    var section = carousel.closest('.courses-section');
    var autoplay = controls.querySelector('[data-course-autoplay]');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var paused = reduced.matches;
    var hovered = false;
    var focused = false;
    var inView = false;
    var timer;
    function schedule() {
      clearTimeout(timer);
      var playing = !paused && !hovered && !focused && inView && !document.hidden;
      controls.querySelector('.course-position').setAttribute('aria-live', playing ? 'off' : 'polite');
      autoplay.setAttribute('aria-label', paused ? 'Play course autoplay' : 'Pause course autoplay');
      autoplay.setAttribute('aria-pressed', String(paused));
      autoplay.textContent = paused ? '▶' : 'Ⅱ';
      if (playing) timer = setTimeout(function () { show(current + 1); }, 6500);
    }
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== current; });
      controls.querySelector('.course-position').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      schedule();
    }
    controls.querySelector('[data-course-prev]').addEventListener('click', function () { show(current - 1); });
    controls.querySelector('[data-course-next]').addEventListener('click', function () { show(current + 1); });
    carousel.addEventListener('keydown', function (event) {
      if (event.target !== carousel) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    autoplay.addEventListener('click', function () { paused = !paused; schedule(); });
    section.addEventListener('mouseenter', function () { hovered = true; schedule(); });
    section.addEventListener('mouseleave', function () { hovered = false; schedule(); });
    section.addEventListener('focusin', function () { focused = true; schedule(); });
    section.addEventListener('focusout', function (event) {
      focused = section.contains(event.relatedTarget); schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', function (event) { if (event.matches) paused = true; schedule(); });
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting; schedule();
    }, { threshold: 0.5 }).observe(carousel);
    var touchStart;
    carousel.addEventListener('touchstart', function (event) { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (event) {
      var distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 65) show(current + (distance < 0 ? 1 : -1));
    }, { passive: true });
    show(0);
  });
  document.querySelectorAll('.course-outline-open').forEach(function (button) {
    var dialog = button.nextElementSibling;
    button.addEventListener('click', function () { dialog.showModal(); });
    dialog.querySelector('.course-outline-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  });
})();
