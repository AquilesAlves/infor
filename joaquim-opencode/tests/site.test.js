import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function load(file) {
  return readFileSync(join(root, file), 'utf8');
}

describe('Task 1: estrutura base', () => {
  it('index.html existe e linka os recursos corretos', () => {
    assert.ok(existsSync('index.html'), 'index.html deve existir');
    const html = load('index.html');
    assert.ok(html.includes('<header'), 'deve ter header');
    assert.ok(html.includes('saiba-mais.html'), 'deve linkar para saiba-mais.html');
    assert.ok(html.includes('css/style.css'), 'deve linkar css/style.css');
    assert.ok(/<script[^>]*src=["\']js\/main\.js["\']/.test(html), 'deve linkar js/main.js');
  });

  it('saiba-mais.html existe e linka de volta para home', () => {
    assert.ok(existsSync('saiba-mais.html'), 'saiba-mais.html deve existir');
    const html = load('saiba-mais.html');
    assert.ok(html.includes('<header'), 'deve ter header');
    assert.ok(html.includes('index.html') || html.includes('href="./"') || html.includes("href='./'"), 'deve linkar de volta para index.html');
    assert.ok(html.includes('css/style.css'), 'deve linkar css/style.css');
  });

  it('css/style.css existe com variáveis CSS', () => {
    assert.ok(existsSync('css/style.css'), 'css/style.css deve existir');
    const css = load('css/style.css');
    assert.ok(css.includes('--color-'), 'deve declarar variáveis de cor');
    assert.ok(css.includes('--font-'), 'deve declarar variáveis de fonte');
  });

  it('js/main.js existe', () => {
    assert.ok(existsSync('js/main.js'), 'js/main.js deve existir');
  });
});
