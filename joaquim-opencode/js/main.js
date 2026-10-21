// Comportamentos leves do template.
// - Mostra a faixa de personalização após scrollar além do hero.
// - Reserva espaço no body para que a faixa fixa não cubra o conteúdo.

(function () {
  'use strict';

  const strip = document.getElementById('personalizar');
  if (!strip) return;

  function updateStrip() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const threshold = hero.offsetTop + hero.offsetHeight;
    const shouldShow = window.scrollY > threshold;

    if (shouldShow) {
      strip.hidden = false;
      document.body.style.paddingBottom = strip.offsetHeight + 'px';
    } else {
      strip.hidden = true;
      document.body.style.paddingBottom = '';
    }
  }

  window.addEventListener('scroll', updateStrip, { passive: true });
  window.addEventListener('resize', updateStrip, { passive: true });
  updateStrip();
})();
