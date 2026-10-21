import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

function resolveFile(file) {
  return join(root, '..', file);
}

function load(file) {
  return readFileSync(resolveFile(file), 'utf8');
}

function exists(file) {
  return existsSync(resolveFile(file));
}

describe('Task 1: estrutura base', () => {
  it('index.html existe e linka os recursos corretos', () => {
    assert.ok(exists('index.html'), 'index.html deve existir');
    const html = load('index.html');
    assert.ok(html.includes('<header'), 'deve ter header');
    assert.ok(html.includes('saiba-mais.html'), 'deve linkar para saiba-mais.html');
    assert.ok(html.includes('css/style.css'), 'deve linkar css/style.css');
    assert.ok(/<script[^>]*src=["\']js\/main\.js["\']/.test(html), 'deve linkar js/main.js');
  });

  it('saiba-mais.html existe e linka de volta para home', () => {
    assert.ok(exists('saiba-mais.html'), 'saiba-mais.html deve existir');
    const html = load('saiba-mais.html');
    assert.ok(html.includes('<header'), 'deve ter header');
    assert.ok(html.includes('index.html') || html.includes('href="./"') || html.includes("href='./'"), 'deve linkar de volta para index.html');
    assert.ok(html.includes('css/style.css'), 'deve linkar css/style.css');
  });

  it('css/style.css existe com variáveis CSS', () => {
    assert.ok(exists('css/style.css'), 'css/style.css deve existir');
    const css = load('css/style.css');
    assert.ok(css.includes('--color-'), 'deve declarar variáveis de cor');
    assert.ok(css.includes('--font-'), 'deve declarar variáveis de fonte');
  });

  it('js/main.js existe', () => {
    assert.ok(exists('js/main.js'), 'js/main.js deve existir');
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

describe('Task 3: estilo visual tech flat e responsivo', () => {
  it('carrega fonte do Google Fonts', () => {
    const index = load('index.html');
    const sobre = load('saiba-mais.html');
    assert.ok(index.includes('fonts.googleapis.com') || index.includes('fonts.gstatic.com'), 'index deve referenciar Google Fonts');
    assert.ok(sobre.includes('fonts.googleapis.com') || sobre.includes('fonts.gstatic.com'), 'saiba-mais deve referenciar Google Fonts');
  });

  it('possui viewport meta para mobile', () => {
    const index = load('index.html');
    assert.ok(/<meta[^>]*name=["\']viewport["\'][^>]*content=["\']width=device-width,\s*initial-scale=1/.test(index), 'deve ter viewport meta');
  });

  it('CSS não usa gradientes nem sombras decorativas', () => {
    const css = load('css/style.css');
    assert.ok(!/gradient\(/.test(css), 'não deve usar gradientes');
    assert.ok(!/box-shadow:/.test(css), 'não deve usar box-shadow');
    assert.ok(!/backdrop-filter:/.test(css), 'não deve usar glass/backdrop-filter');
  });

  it('seções usam layout não baseado em cards idênticos de ícone', () => {
    const css = load('css/style.css');
    const html = load('index.html');
    assert.ok(!html.includes('class="icon"'), 'não deve haver elementos de ícone genéricos');
    assert.ok(!/\.services-list\s*\{[^}]*display:\s*grid[^}]*\}/s.test(css) || /repeat\(auto-fit/.test(css), 'services podem usar grid, mas não três cards idênticos de ícone');
  });

  it('faixa de personalização começa oculta', () => {
    const html = load('index.html');
    assert.ok(html.includes('personalize-strip') && html.includes('hidden'), 'faixa deve começar oculta');
  });
});

describe('Task 4: ilustração e recursos visuais', () => {
  it('ilustração SVG existe e é usada na Home (inline ou como arquivo)', () => {
    assert.ok(exists('assets/hero-illustration.svg'), 'assets/hero-illustration.svg deve existir');
    const html = load('index.html');
    const hasInlineSvg = /<svg[\s\S]*?<\/svg>/.test(html);
    const hasReference = html.includes('assets/hero-illustration.svg');
    assert.ok(hasInlineSvg || hasReference, 'Home deve conter a ilustração SVG');
  });

  it('ilustração é SVG válido e usa cores da paleta', () => {
    const svg = load('assets/hero-illustration.svg');
    assert.ok(svg.startsWith('<svg'), 'deve começar com <svg');
    assert.ok(svg.includes('viewBox'), 'deve ter viewBox');
    assert.ok(svg.includes('#2d62ff') || svg.includes('var(--color-accent)'), 'deve usar a cor de destaque');
  });
});

describe('Task 5: comportamentos leves e finalização', () => {
  it('README existe com instruções de personalização e deploy', () => {
    assert.ok(exists('README.md'), 'README.md deve existir');
    const readme = load('README.md').toLowerCase();
    assert.ok(readme.includes('personalizar') || readme.includes('editar'), 'deve explicar como personalizar');
    assert.ok(readme.includes('github pages'), 'deve explicar deploy no GitHub Pages');
    assert.ok(readme.includes('whatsapp'), 'deve mencionar WhatsApp');
  });

  it('script controla a faixa de personalização por scroll e reserva espaço', () => {
    const js = load('js/main.js');
    assert.ok(js.includes('personalizar'), 'deve referenciar elemento personalizar');
    assert.ok(js.includes('scroll') || js.includes('scrollY'), 'deve reagir a scroll');
    assert.ok(js.includes('hidden'), 'deve controlar visibilidade');
    assert.ok(js.includes('paddingBottom') || js.includes('--strip-height'), 'deve reservar espaço para a faixa');
  });

  it('links de WhatsApp usam placeholders editáveis', () => {
    const html = load('index.html') + load('saiba-mais.html');
    assert.ok(html.includes('wa.me/'), 'deve ter links do WhatsApp');
    assert.ok(html.includes('5500000000000'), 'deve usar número placeholder');
  });

  it('testes não dependem do diretório de execução', () => {
    const js = load('tests/site.test.js');
    assert.ok(js.includes('import.meta.url') || js.includes('__dirname'), 'deve resolver caminhos a partir do arquivo de teste');
    assert.ok(!/^const root = process\.cwd\(\)/m.test(js), 'não deve usar process.cwd() como root');
  });

  it('SVG inline usa variáveis CSS da paleta', () => {
    const html = load('index.html');
    const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/);
    assert.ok(svgMatch, 'SVG deve estar inline na Home');
    assert.ok(svgMatch[0].includes('var(--color-accent)'), 'SVG deve usar var(--color-accent)');
    assert.ok(svgMatch[0].includes('var(--color-ink)'), 'SVG deve usar var(--color-ink)');
  });

  it('hover dos links inline mantém underline, apenas botões e nav removem', () => {
    const css = load('css/style.css');
    assert.ok(!/\na:hover\s*\{[\s\S]*?text-decoration:\s*none;/.test(css), 'não deve remover underline de todos os links no hover');
    assert.ok(/\.btn-primary:hover/.test(css), 'deve estilizar hover do botão');
  });
});
