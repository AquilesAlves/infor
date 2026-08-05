const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const savedTheme = localStorage.getItem('nexus-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('nexus-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

document.querySelectorAll('.product-info button').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = '✓';
    button.setAttribute('aria-label', 'Produto adicionado ao orçamento');
    setTimeout(() => button.textContent = '+', 1400);
  });
});
