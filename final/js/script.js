/* =====================================================================
   FUNCIONAMENTO DA PÁGINA
   Monta as seções a partir dos dados em config.js (objeto LOJA).
   Para trocar textos, contatos, cores e listas, edite config.js.
   ===================================================================== */

/* ---------- Ícones (desenhos SVG) ---------- */
const ICONES = {
  notebook:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  desktop:'<rect x="7" y="3" width="10" height="18" rx="1.5"/><circle cx="12" cy="7" r="1"/><path d="M10 16h4"/>',
  monitor:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
  perifericos:'<rect x="2" y="7" width="20" height="10" rx="1.5"/><path d="M6 11h.01M10 11h.01M14 11h.01M18 11h.01M7 14h10"/>',
  componentes:'<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  redes:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
  impressora:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M7 14h10v7H7z"/>',
  acessorios:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',
  formatacao:'<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4h-4"/>',
  limpeza:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 10.5C12 7 13.5 5 16 5M13.5 12c3.5 0 5.5 1.5 5.5 4M12 13.5c0 3.5-1.5 5.5-4 5.5M10.5 12C7 12 5 10.5 5 8"/>',
  upgrade:'<rect x="3" y="8" width="18" height="9" rx="1.5"/><path d="M7 17v3M12 17v3M17 17v3M7 11.5h2M11 11.5h2M15 11.5h2"/>',
  tela:'<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20M11 6.5l1.5 3-2 1.5 2.5 2"/>',
  montagem:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  dados:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>'
};
const ICONE_SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ICONE_RELOGIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
const ICONE_VISTO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const ICONE_ESTRELA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
const ICONE_MAIS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';

/* ---------- Funções de apoio ---------- */
const desenharIcone = desenho => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${desenho}</svg>`;
// Evita que textos do config.js quebrem o HTML (ex.: um "<" no texto)
const protegerTexto = texto => String(texto).replace(/[&<>"]/g, caractere => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[caractere]));
const linkWhatsapp = mensagem => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem || LOJA.mensagemPadrao)}`;
const pegar = id => document.getElementById(id);
const numeroComDoisDigitos = numero => String(numero).padStart(2, '0');

/* ---------- Cor de destaque ---------- */
const estiloDaCor = document.createElement('style');
document.head.appendChild(estiloDaCor);
const aplicarCor = (corClara, corEscura) => {
  estiloDaCor.textContent = `:root{--destaque:${corClara}}
  @media (prefers-color-scheme: dark){:root:not([data-tema="claro"]){--destaque:${corEscura}}}
  :root[data-tema="escuro"]{--destaque:${corEscura}}`;
};
let corSalva = null;
if (LOJA.seletorCores) { try { corSalva = JSON.parse(localStorage.getItem('cor')); } catch (erro) {} }
aplicarCor(corSalva ? corSalva.cor : LOJA.cor, corSalva ? corSalva.corEscuro : LOJA.corEscuro);

/* ---------- Seletor de cores (para testes) ---------- */
// Cada opção tem a versão para o tema claro (cor) e para o escuro (corEscuro)
(function () {
  const seletor = pegar('seletorCor');
  if (!LOJA.seletorCores) { seletor.hidden = true; return; }
  const opcoes = [
    { nome: 'Padrão da loja', cor: LOJA.cor, corEscuro: LOJA.corEscuro },
    { nome: 'Laranja',  cor: '#C2410C', corEscuro: '#FF8A50' },
    { nome: 'Azul',     cor: '#2563EB', corEscuro: '#60A5FA' },
    { nome: 'Verde',    cor: '#15803D', corEscuro: '#4ADE80' },
    { nome: 'Roxo',     cor: '#7C3AED', corEscuro: '#A78BFA' },
    { nome: 'Vermelho', cor: '#DC2626', corEscuro: '#EF4444' },
    { nome: 'Rosa',     cor: '#DB2777', corEscuro: '#F472B6' },
    { nome: 'Ciano',    cor: '#0E7490', corEscuro: '#22D3EE' },
    { nome: 'Grafite',  cor: '#475569', corEscuro: '#CBD5E1' }
  ].filter((opcao, posicao, lista) => lista.findIndex(outra => outra.cor.toLowerCase() === opcao.cor.toLowerCase()) === posicao);

  const corAtual = (corSalva ? corSalva.cor : LOJA.cor).toLowerCase();
  const botao = pegar('botaoCor'), menu = pegar('menuCor'), grade = pegar('opcoesCor');
  grade.innerHTML = opcoes.map((opcao, posicao) => `
    <button class="cor-opcao" data-posicao="${posicao}" title="${protegerTexto(opcao.nome)}" aria-label="${protegerTexto(opcao.nome)}"
      aria-pressed="${opcao.cor.toLowerCase() === corAtual}" style="--cor-clara:${opcao.cor};--cor-escura:${opcao.corEscuro}"></button>`).join('');

  grade.addEventListener('click', evento => {
    const escolhida = evento.target.closest('.cor-opcao');
    if (!escolhida) return;
    const opcao = opcoes[escolhida.dataset.posicao];
    aplicarCor(opcao.cor, opcao.corEscuro);
    grade.querySelectorAll('.cor-opcao').forEach(outra => outra.setAttribute('aria-pressed', outra === escolhida));
    try {
      if (escolhida.dataset.posicao === '0') localStorage.removeItem('cor');
      else localStorage.setItem('cor', JSON.stringify(opcao));
    } catch (erro) {}
  });

  const mostrarMenu = mostrar => { menu.hidden = !mostrar; botao.setAttribute('aria-expanded', mostrar); };
  botao.addEventListener('click', () => mostrarMenu(menu.hidden));
  document.addEventListener('click', evento => { if (!seletor.contains(evento.target)) mostrarMenu(false); });
  document.addEventListener('keydown', evento => { if (evento.key === 'Escape') mostrarMenu(false); });
})();

/* ---------- Textos simples ---------- */
// Elementos com data-loja="campo" recebem o texto de LOJA.campo
document.querySelectorAll('[data-loja]').forEach(elemento => {
  const valor = LOJA[elemento.dataset.loja];
  if (valor != null) elemento.textContent = valor;
});
// data-loja-html aceita HTML (usado no título com <em>)
document.querySelectorAll('[data-loja-html]').forEach(elemento => {
  const valor = LOJA[elemento.dataset.lojaHtml];
  if (valor) elemento.innerHTML = valor;
});
document.title = `${LOJA.nome} · Loja e assistência técnica`;
pegar('ano').textContent = new Date().getFullYear();
if (LOJA.cnpj) pegar('cnpj').textContent = ' CNPJ ' + LOJA.cnpj;
if (LOJA.credito) pegar('credito').textContent = LOJA.credito;

/* ---------- Itens opcionais: escondidos quando o campo estiver vazio ---------- */
document.querySelectorAll('[data-se]').forEach(elemento => { if (!LOJA[elemento.dataset.se]) elemento.hidden = true; });
document.querySelectorAll('[data-instagram]').forEach(link => link.href = 'https://instagram.com/' + LOJA.instagram.replace('@', ''));
document.querySelectorAll('[data-email]').forEach(link => link.href = 'mailto:' + LOJA.email);
if (LOJA.facebook) pegar('linkFacebook').href = LOJA.facebook;

/* ---------- Mapa ---------- */
const enderecoCompleto = `${LOJA.endereco}, ${LOJA.cidade}`;
pegar('botaoMapa').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${LOJA.nome}, ${enderecoCompleto}`);
pegar('mapa').src = LOJA.mapa || 'https://www.google.com/maps?q=' + encodeURIComponent(enderecoCompleto) + '&output=embed';

/* ---------- Faixa de números (anos de loja, garantia...) ---------- */
pegar('numeros').innerHTML = LOJA.destaques.map(destaque => {
  const valor = destaque.valor === 'auto' ? String(new Date().getFullYear() - LOJA.desde) : destaque.valor;
  return `<div class="numero"><b>${protegerTexto(valor)}</b><span>${protegerTexto(destaque.rotulo)}</span></div>`;
}).join('');

/* ---------- Marcas (carrossel) ---------- */
// A lista é repetida até encher a faixa e depois duplicada,
// assim a animação volta ao início sem "pulo"
if (LOJA.marcas.length) {
  const desenharMarca = marca => {
    const dados = typeof marca === 'string' ? { nome: marca } : marca;
    return `<span class="marca${dados.fino ? ' fino' : ''}">${protegerTexto(dados.nome)}</span>`;
  };
  const repeticoes = Math.max(2, Math.ceil(10 / LOJA.marcas.length));
  const metade = Array.from({ length: repeticoes }, () => LOJA.marcas.map(desenharMarca).join('')).join('');
  const lista = pegar('marcas');
  lista.innerHTML = metade + `<span style="display:contents" aria-hidden="true">${metade}</span>`;
  lista.style.setProperty('--duracao', (LOJA.marcas.length * repeticoes * 3) + 's'); // velocidade constante
} else {
  pegar('secaoMarcas').hidden = true;
}

/* ---------- Produtos ---------- */
pegar('listaProdutos').innerHTML = LOJA.produtos.map((produto, posicao) => `
  <a class="categoria" data-whatsapp data-mensagem="${protegerTexto('Olá! Vim pelo site e quero saber sobre ' + produto.titulo.toLowerCase() + '.')}" href="#" target="_blank" rel="noopener">
    <span class="categoria-codigo">CAT-${numeroComDoisDigitos(posicao + 1)}</span>
    <span class="categoria-icone">${desenharIcone(ICONES[produto.icone] || ICONES.componentes)}</span>
    <h3>${protegerTexto(produto.titulo)}</h3>
    <p>${protegerTexto(produto.texto)}</p>
    <span class="categoria-link">Consultar disponibilidade ${ICONE_SETA}</span>
  </a>`).join('');

/* ---------- Assistência técnica ---------- */
pegar('selos').innerHTML = LOJA.garantias.map(garantia => `<span>${ICONE_VISTO}${protegerTexto(garantia)}</span>`).join('');
pegar('listaServicos').innerHTML = LOJA.servicos.map((servico, posicao) => `
  <article class="servico">
    <div class="servico-topo">
      <span class="servico-icone">${desenharIcone(ICONES[servico.icone] || ICONES.montagem)}</span>
      <span class="servico-numero">${numeroComDoisDigitos(posicao + 1)}</span>
    </div>
    <h3>${protegerTexto(servico.titulo)}</h3>
    <p>${protegerTexto(servico.texto)}</p>
    <div class="servico-rodape">
      <span class="servico-prazo">${ICONE_RELOGIO}${protegerTexto(servico.prazo)}</span>
      <a class="servico-link" data-whatsapp data-mensagem="${protegerTexto('Olá! Quero um orçamento de ' + servico.titulo.toLowerCase() + '.')}" href="#" target="_blank" rel="noopener">Orçamento ${ICONE_SETA}</a>
    </div>
  </article>`).join('');

/* ---------- Depoimentos ---------- */
const iniciais = nome => nome.split(/\s+/).filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase();
pegar('listaDepoimentos').innerHTML = LOJA.depoimentos.map(depoimento => {
  const nota = Math.max(1, Math.min(5, depoimento.nota || 5));
  const estrelas = Array.from({ length: 5 }, (_, posicao) => `<span class="${posicao < nota ? '' : 'vazia'}">${ICONE_ESTRELA}</span>`).join('');
  return `<figure class="depoimento" style="margin:0">
    <div class="estrelas" role="img" aria-label="Nota ${nota} de 5">${estrelas}</div>
    <blockquote>${protegerTexto(depoimento.texto)}</blockquote>
    <figcaption class="autor"><span class="avatar">${protegerTexto(iniciais(depoimento.nome))}</span><div><strong>${protegerTexto(depoimento.nome)}</strong><span>${protegerTexto(depoimento.tipo)}</span></div></figcaption>
  </figure>`;
}).join('');

/* ---------- Perguntas frequentes ---------- */
pegar('listaPerguntas').innerHTML = LOJA.faq.map((item, posicao) => `
  <div class="pergunta${posicao === 0 ? ' aberto' : ''}">
    <button class="pergunta-botao" aria-expanded="${posicao === 0}" aria-controls="resposta-${posicao}"><span class="pergunta-numero">${numeroComDoisDigitos(posicao + 1)}</span><span class="pergunta-texto">${protegerTexto(item.p)}</span><span class="mais">${ICONE_MAIS}</span></button>
    <div class="pergunta-resposta" id="resposta-${posicao}" role="region"><div><p>${protegerTexto(item.r)}</p></div></div>
  </div>`).join('');
// Abre uma pergunta e fecha as outras
document.querySelectorAll('.pergunta-botao').forEach(botao => botao.addEventListener('click', () => {
  const clicada = botao.parentElement;
  const vaiAbrir = !clicada.classList.contains('aberto');
  document.querySelectorAll('.pergunta').forEach(pergunta => {
    const ficaAberta = vaiAbrir && pergunta === clicada;
    pergunta.classList.toggle('aberto', ficaAberta);
    pergunta.querySelector('.pergunta-botao').setAttribute('aria-expanded', ficaAberta);
  });
}));

/* ---------- Links do WhatsApp ---------- */
// Todo elemento com data-whatsapp vira link; data-mensagem define o texto já preenchido
document.querySelectorAll('[data-whatsapp]').forEach(link => link.href = linkWhatsapp(link.dataset.mensagem));

/* ---------- Horário de funcionamento + selo "Aberto agora" ---------- */
(function () {
  const nomesDosDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const diasAbreviados = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const ordemNaTabela = [1, 2, 3, 4, 5, 6, 0]; // segunda a domingo
  const agora = new Date(), hoje = agora.getDay();
  const emMinutos = horario => { const [horas, minutos] = horario.split(':').map(Number); return horas * 60 + minutos; };

  pegar('horarios').innerHTML = ordemNaTabela.map(dia => {
    const horario = LOJA.horarios[dia];
    return `<tr class="${dia === hoje ? 'hoje' : ''}"><td>${nomesDosDias[dia]}${dia === hoje ? ' (hoje)' : ''}</td><td>${horario ? horario[0] + ' – ' + horario[1] : 'Fechado'}</td></tr>`;
  }).join('');

  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const horarioDeHoje = LOJA.horarios[hoje];
  const selo = pegar('status'), textoDoSelo = pegar('statusTexto');
  if (horarioDeHoje && minutosAgora >= emMinutos(horarioDeHoje[0]) && minutosAgora < emMinutos(horarioDeHoje[1])) {
    textoDoSelo.textContent = `Aberto agora · até ${horarioDeHoje[1]}`;
    return;
  }
  selo.classList.add('fechado');
  if (horarioDeHoje && minutosAgora < emMinutos(horarioDeHoje[0])) {
    textoDoSelo.textContent = `Fechado · abre hoje às ${horarioDeHoje[0]}`;
    return;
  }
  for (let diasDepois = 1; diasDepois <= 7; diasDepois++) {
    const dia = (hoje + diasDepois) % 7, horario = LOJA.horarios[dia];
    if (horario) {
      textoDoSelo.textContent = `Fechado · abre ${diasDepois === 1 ? 'amanhã' : diasAbreviados[dia]} às ${horario[0]}`;
      return;
    }
  }
  textoDoSelo.textContent = 'Fechado';
})();

/* ---------- Modo claro / escuro ---------- */
pegar('botaoTema').addEventListener('click', () => {
  const raiz = document.documentElement;
  const estaEscuro = raiz.dataset.tema ? raiz.dataset.tema === 'escuro' : matchMedia('(prefers-color-scheme: dark)').matches;
  const novoTema = estaEscuro ? 'claro' : 'escuro';
  const trocarTema = () => { raiz.dataset.tema = novoTema; };
  // Esmaecimento leve feito pelo navegador; sem suporte (ou com "reduzir movimento"), troca na hora
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(trocarTema);
  else trocarTema();
  try { localStorage.setItem('tema', novoTema); } catch (erro) {}
});

/* ---------- Botão de voltar ao topo ---------- */
(function () {
  const botao = pegar('botaoTopo');
  const atualizar = () => botao.classList.toggle('visivel', scrollY > 600);
  addEventListener('scroll', atualizar, { passive: true });
  atualizar();
  botao.addEventListener('click', () => scrollTo({ top: 0 }));
})();

/* ---------- Menu no celular ---------- */
(function () {
  const botao = pegar('botaoMenu'), menu = pegar('menu');
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', false);
  }));
})();
