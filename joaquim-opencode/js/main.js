// Comportamentos leves do template.
// Este arquivo pode ser expandido conforme necessário.

(function () {
  'use strict';

  const strip = document.getElementById('personalizar');
  if (!strip) return;

  function updateStrip() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const threshold = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > threshold) {
      strip.hidden = false;
    } else {
      strip.hidden = true;
    }
  }

  window.addEventListener('scroll', updateStrip, { passive: true });
  updateStrip();
})();
