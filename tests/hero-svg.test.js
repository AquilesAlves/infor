const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'estilo.css'), 'utf8');
const heroStart = html.indexOf('<section class="abertura">');
const heroEnd = html.indexOf('</section>', heroStart);
const hero = html.slice(heroStart, heroEnd);
const { calcularLayoutPlaca, inicializar } = require(path.join(root, 'js', 'hero-circuito.js'));

test('component layout preserves proportions and anchors to the desktop/mobile reserve', () => {
  const desktop = calcularLayoutPlaca({
    hero: { x: 0, y: 100, width: 1440, height: 760 },
    texto: { x: 160, y: 180, width: 550, height: 620 },
    reserva: { x: 770, y: 120, width: 500, height: 0 },
    mobile: false
  });
  assert.equal(desktop.scale, 500 / 520);
  assert.equal(desktop.x, 770);
  assert.equal(desktop.y, 178.46);
  assert.equal(desktop.viewBox, '0 0 1440 760');
  assert.equal(desktop.transform, 'translate(770px, 178.46px) scale(0.96154)');

  const mobile = calcularLayoutPlaca({
    hero: { x: 0, y: 69, width: 390, height: 1000 },
    texto: { x: 16, y: 105, width: 358, height: 500 },
    reserva: { x: 16, y: 640, width: 358, height: 360 },
    mobile: true
  });
  assert.equal(mobile.scale, 358 / 520);
  assert.equal(mobile.x, 16);
  assert.equal(mobile.y, 599.54);
  assert.equal(mobile.viewBox, '0 0 390 1000');
  assert.equal(mobile.transform, 'translate(16px, 599.54px) scale(0.68846)');

  const estreito = calcularLayoutPlaca({
    hero: { x: 0, y: 0, width: 320, height: 900 },
    texto: { x: 16, y: 36, width: 288, height: 500 },
    reserva: { x: 16, y: 600, width: 288, height: 300 },
    mobile: true
  });
  assert.equal(estreito.scale, (320 - 32) / 520);
  assert.equal(estreito.x, 16);
});

test('helper expõe API de inicialização', () => {
  assert.equal(typeof inicializar, 'function');
});

test('hero uses one full-bleed SVG scene containing the existing PC components', () => {
  assert.equal((hero.match(/class="placa-hero"/g) || []).length, 1);
  assert.match(hero, /<svg class="placa-hero"[^>]*aria-hidden="true"/);
  assert.match(hero, /<pattern[^>]*id="pontos-hero"/);
  assert.match(hero, /<pattern[^>]*id="trilhas-hero"/);
  assert.match(hero, /<g class="placa-hero__componentes"/);
  assert.match(hero, /class="p-cpu"/);
  assert.match(hero, /MEMÓRIA RAM/);
  assert.match(hero, /SSD NVMe/);
  assert.match(hero, /REDE \/ WI-FI/);
  assert.match(hero, /PLACA DE VÍDEO/);
  assert.match(hero, /BANCADA · EM TESTE/);
  assert.doesNotMatch(hero, /<svg class="placa"/);
  assert.doesNotMatch(hero, /placa-moldura|placa-fundo/);
  assert.doesNotMatch(hero, /<rect class="p-fundo" width="520"/);
});

test('hero SVG fills its section behind the text content', () => {
  assert.match(css, /\.placa-hero\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0[^}]*width:\s*100%[^}]*height:\s*100%/);
  assert.match(css, /\.abertura \.conteudo\s*\{[^}]*z-index:\s*1/);
  assert.match(css, /\.placa-hero__componentes\s*\{[^}]*transform:\s*translate\(/);
  assert.ok(css.includes('.placa-hero__componentes{transform:translate(16px,700px) scale(.65)}'));
  assert.doesNotMatch(css, /\.abertura::before/);
  assert.doesNotMatch(css, /varredura/);
  assert.match(css, /\.abertura-visual-reserva\s*\{[^}]*min-height:\s*clamp\(300px,\s*84vw,\s*360px\)/);
  assert.match(css, /\.placa-hero \.p-fundo\{fill:var\(--placa\)\}/);
});

test('reduced motion global permanece', () => {
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*none\s*!important/);
});
