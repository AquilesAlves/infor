const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.join(__dirname, '..');
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
  assert.equal(desktop.transform, 'translate(770 178.46) scale(0.96154)');

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
  assert.equal(mobile.transform, 'translate(16 599.54) scale(0.68846)');

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
