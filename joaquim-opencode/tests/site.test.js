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

describe('Task 2: conteúdo e copy', () => {
  it('hero apresenta conserto, melhorar e peças', () => {
    const html = load('index.html');
    const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/);
    assert.ok(hero, 'deve ter seção hero');
    const text = hero[0].toLowerCase();
    assert.ok(/consert|repar|diagnóstic/.test(text), 'hero deve mencionar conserto/diagnóstico');
    assert.ok(/melhor|upgrad|mais rápido/.test(text), 'hero deve mencionar melhorar/upgrade');
    assert.ok(/peça|equipamento/.test(text), 'hero deve mencionar peças/equipamentos');
  });

  it('serviços têm três itens claros', () => {
    const html = load('index.html');
    const section = html.match(/<section class="services"[\s\S]*?<\/section>/);
    assert.ok(section, 'deve ter seção de serviços');
    const articles = section[0].match(/<article[\s\S]*?<\/article>/g);
    assert.equal(articles.length, 3, 'deve ter três artigos de serviço');
  });

  it('seção de confiança apresenta o processo sem depoimentos', () => {
    const html = load('index.html');
    const section = html.match(/<section class="trust"[\s\S]*?<\/section>/);
    assert.ok(section, 'deve ter seção de confiança');
    const text = section[0].toLowerCase();
    assert.ok(/orçamento|aprovação|teste/.test(text), 'deve mencionar etapas do processo');
    assert.ok(!/depoimento|cliente diz|avaliação 5 estrelas/.test(text), 'não deve usar depoimentos inventados');
  });

  it('Saiba Mais conta história, equipe e localização', () => {
    const html = load('saiba-mais.html');
    assert.ok(/história|nossa história/i.test(html), 'deve ter história');
    assert.ok(/equipe|técnico|quem cuida/i.test(html), 'deve ter equipe/técnicos');
    assert.ok(/localização|endereço|horário/i.test(html), 'deve ter localização/horário');
  });

  it('não há estatísticas ou garantias genéricas inventadas', () => {
    const html = load('index.html') + load('saiba-mais.html');
    const text = html.toLowerCase();
    assert.ok(!/mais de \d+ clientes|\d+ anos de experiência|\d+% de satisfação/.test(text), 'não deve inventar números de clientes/satisfação');
    assert.ok(!/garantia vitalícia|garantia de \d+ anos/g.test(text), 'não deve inventar garantias');
  });
});
