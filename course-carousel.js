(function () {
  'use strict';
  document.querySelectorAll('.courses-grid').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('.course-card'));
    var controls = carousel.parentElement.querySelector('.course-controls');
    var current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== current; });
      controls.querySelector('.course-position').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    }
    controls.querySelector('[data-course-prev]').addEventListener('click', function () { show(current - 1); });
    controls.querySelector('[data-course-next]').addEventListener('click', function () { show(current + 1); });
    carousel.addEventListener('keydown', function (event) {
      if (event.target !== carousel) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
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
