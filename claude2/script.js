/* ========================================
   CONFIGURAÇÃO - Altere aqui para cada cliente
   ======================================== */

const NUMERO_WHATSAPP = '5500000000000';
const MENSAGEM_WHATSAPP = 'Olá! Gostaria de mais informações.';
const MENSAGEM_ORCAMENTO = 'Olá! Gostaria de solicitar um orçamento.';

/* ========================================
   ELEMENTOS DO DOM
   ======================================== */

const botaoTema = document.getElementById('botaoTema');
const menuHamburguer = document.getElementById('menuHamburguer');
const navegacao = document.getElementById('navegacao');
const cabecalho = document.getElementById('cabecalho');
const whatsappFlutuante = document.getElementById('whatsappFlutuante');

/* ========================================
   TEMA CLARO / ESCURO
   ======================================== */

function aplicarTema(escuro) {
  if (escuro) {
    document.body.classList.add('tema-escuro');
  } else {
    document.body.classList.remove('tema-escuro');
  }
}

function carregarTema() {
  const temaSalvo = localStorage.getItem('tema');

  if (temaSalvo) {
    aplicarTema(temaSalvo === 'escuro');
  } else {
    const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTema(prefereEscuro);
  }
}

function alternarTema() {
  const estaEscuro = document.body.classList.contains('tema-escuro');
  aplicarTema(!estaEscuro);
  localStorage.setItem('tema', !estaEscuro ? 'escuro' : 'claro');
}

// Carregar tema antes de qualquer renderização visível
carregarTema();

botaoTema.addEventListener('click', alternarTema);

// Reagir a mudanças no tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(evento) {
  if (!localStorage.getItem('tema')) {
    aplicarTema(evento.matches);
  }
});

/* ========================================
   MENU HAMBÚRGUER (MOBILE)
   ======================================== */

function alternarMenu() {
  const estaAberto = navegacao.classList.contains('aberto');

  navegacao.classList.toggle('aberto');
  menuHamburguer.classList.toggle('ativo');
  menuHamburguer.setAttribute('aria-expanded', !estaAberto);

  // Travar/destravar scroll do body
  document.body.style.overflow = estaAberto ? '' : 'hidden';
}

function fecharMenu() {
  navegacao.classList.remove('aberto');
  menuHamburguer.classList.remove('ativo');
  menuHamburguer.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuHamburguer.addEventListener('click', alternarMenu);

// Fechar menu ao clicar em um link
navegacao.addEventListener('click', function(evento) {
  if (evento.target.classList.contains('nav-link')) {
    fecharMenu();
  }
});

// Fechar menu com Escape
document.addEventListener('keydown', function(evento) {
  if (evento.key === 'Escape' && navegacao.classList.contains('aberto')) {
    fecharMenu();
  }
});

/* ========================================
   BOTÃO FLUTUANTE WHATSAPP
   ======================================== */

function verificarScrollWhatsapp() {
  if (window.scrollY > 400) {
    whatsappFlutuante.classList.add('visivel');
  } else {
    whatsappFlutuante.classList.remove('visivel');
  }
}

window.addEventListener('scroll', verificarScrollWhatsapp, { passive: true });

/* ========================================
   ANIMAÇÕES DE ENTRADA (IntersectionObserver)
   ======================================== */

function iniciarAnimacoes() {
  // Selecionar elementos para animar
  const elementosParaAnimar = document.querySelectorAll(
    '.card-vidro, .secao-titulo, .secao-descricao, .hero-conteudo, .sobre-texto, .contato-item, .botao-whatsapp.botao-grande'
  );

  elementosParaAnimar.forEach(function(elemento) {
    elemento.classList.add('animado');
  });

  // Verificar se o navegador suporta IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elementosParaAnimar.forEach(function(elemento) {
      elemento.classList.add('visivel');
    });
    return;
  }

  const observador = new IntersectionObserver(
    function(entradas) {
      entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elementosParaAnimar.forEach(function(elemento) {
    observador.observe(elemento);
  });
}

/* ========================================
   LINKS WHATSAPP DINÂMICOS
   ======================================== */

function atualizarLinksWhatsapp() {
  const linkFlutuante = document.getElementById('whatsappFlutuante');
  if (linkFlutuante) {
    linkFlutuante.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(MENSAGEM_WHATSAPP);
  }

  const botaoOrcamento = document.querySelector('.botao-whatsapp.botao-grande');
  if (botaoOrcamento) {
    botaoOrcamento.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(MENSAGEM_ORCAMENTO);
  }
}

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  iniciarAnimacoes();
  atualizarLinksWhatsapp();
  verificarScrollWhatsapp();
});
