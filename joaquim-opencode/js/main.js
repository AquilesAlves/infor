// Setor Técnico — comportamentos leves

(function () {
  'use strict';

  // Destaca link do menu ativo ao rolar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function onScroll() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Dispara a entrada suave do ticket de ordem de serviço no hero
  const ticket = document.getElementById('serviceTicket');
  if (ticket) {
    window.addEventListener('load', () => {
      ticket.classList.add('is-loaded');
    });
  }
})();
