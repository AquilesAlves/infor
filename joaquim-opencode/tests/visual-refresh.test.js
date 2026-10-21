const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/style.css'), 'utf8');

test('nova paleta flat azul-profundo está definida', () => {
  assert.match(css, /--bg:\s*#ECEEF1/);
  assert.match(css, /--accent:\s*#2B5C8A/);
  assert.match(css, /--line:\s*#D2D8DE/);
  assert.match(css, /--font-mono:\s*['"]IBM Plex Mono['"]/);
});

test('glass e sombras suaves foram removidos', () => {
  assert.doesNotMatch(css, /backdrop-filter/);
  assert.doesNotMatch(css, /box-shadow:\s*0\s+4px\s+18px/);
});

test('hero usa painel de ordem de serviço em vez da ilustração', () => {
  assert.match(html, /class="[^"]*service-ticket[^"]*"/);
  assert.match(html, /Ordem de serviço/);
  assert.doesNotMatch(html, /Assistência técnica · Venda de peças · Campinas\/SP/);
  const heroStart = html.indexOf('class="hero-inner"');
  const heroEnd = html.indexOf('</section>', heroStart);
  const heroSlice = html.slice(heroStart, heroEnd);
  assert.doesNotMatch(heroSlice, /<svg/, 'não deve haver SVG dentro do hero');
});

test('tipografia foi trocada para Archivo + IBM Plex Mono', () => {
  assert.match(html, /Archivo/);
  assert.match(html, /IBM[+% ]Plex[+% ]Mono/i);
});

test('menu ativo possui regra CSS correspondente', () => {
  assert.match(css, /\.nav\s+a\.active/);
});

test('ilustração da bancada foi relocada para a seção Como funciona', () => {
  const comoIdx = html.indexOf('id="como"');
  const svgMatches = [...html.matchAll(/<svg/g)].map(m => m.index);
  assert(svgMatches.some(idx => idx > comoIdx), 'pelo menos um SVG deve vir depois de #como');
});

test('rótulos decorativos all-caps de seção foram removidos', () => {
  assert.doesNotMatch(html, /section-label/);
});
