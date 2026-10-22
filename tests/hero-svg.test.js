const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/estilo.css'), 'utf8');
const layoutPath = path.join(root, 'js/hero-circuito.js');
const heroStart = html.indexOf('<section class="abertura">');
const heroEnd = html.indexOf('</section>', heroStart);
const hero = html.slice(heroStart, heroEnd);

test('hero uses one full-bleed SVG scene containing the existing PC components', () => {
  assert.equal((hero.match(/class="placa-hero"/g) || []).length, 1);
  assert.match(hero, /class="placa-hero"[^>]*aria-hidden="true"/);
  assert.match(hero, /<pattern[^>]*id="pontos-hero"/);
  assert.match(hero, /class="p-cpu"/);
  assert.match(hero, /<g class="placa-hero__componentes"/);
  assert.doesNotMatch(hero, /<svg class="placa-hero__componentes"/);
  assert.match(hero, /MEMÓRIA RAM/);
  assert.match(hero, /SSD NVMe/);
  assert.doesNotMatch(hero, /class="placa-fundo"|class="placa-moldura"/);
});

test('hero SVG fills its section behind the text content', () => {
  assert.match(css, /\.placa-hero\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0[^}]*width:\s*100%[^}]*height:\s*100%/);
  assert.match(css, /\.abertura \.conteudo\s*\{[^}]*z-index:\s*1/);
});

test('component layout preserves proportions and anchors to the desktop/mobile reserve', () => {
  assert.ok(fs.existsSync(layoutPath), 'responsive SVG layout helper should exist');
  const { calcularLayoutPlaca } = require(layoutPath);

  const desktop = calcularLayoutPlaca({
    hero: { x: 0, y: 100, width: 1440, height: 760 },
    texto: { x: 160, y: 180, width: 550, height: 620 },
    reserva: { x: 770, y: 120, width: 500, height: 0 },
    mobile: false
  });
  assert.equal(desktop.scale, 500 / 520);
  assert.equal(desktop.x, 770);
  assert.equal(desktop.y, 178.46);

  const mobile = calcularLayoutPlaca({
    hero: { x: 0, y: 69, width: 390, height: 1000 },
    texto: { x: 16, y: 105, width: 358, height: 500 },
    reserva: { x: 16, y: 640, width: 358, height: 360 },
    mobile: true
  });
  assert.equal(mobile.scale, 358 / 520);
  assert.equal(mobile.x, 16);
  assert.equal(mobile.y, 599.54);
});
