(function (global, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else api.inicializar(global.document, global);
})(typeof globalThis === 'undefined' ? this : globalThis, function () {
  const LARGURA_PLACA = 520;
  const ALTURA_PLACA = 440;
  const arredondar = valor => Number(valor.toFixed(2));

  function calcularLayoutPlaca({ hero, texto, reserva, mobile }) {
    const larguraMaxima = mobile
      ? Math.min(hero.width - 32, LARGURA_PLACA)
      : Math.min(reserva.width, LARGURA_PLACA);
    const alturaMaxima = mobile ? Math.min(reserva.height, ALTURA_PLACA) : ALTURA_PLACA;
    const escala = Math.max(0, Math.min(larguraMaxima / LARGURA_PLACA, alturaMaxima / ALTURA_PLACA, 1));
    const largura = LARGURA_PLACA * escala;
    const altura = ALTURA_PLACA * escala;
    const x = mobile
      ? (hero.width - largura) / 2
      : reserva.x - hero.x + (reserva.width - largura) / 2;
    const y = mobile
      ? reserva.y - hero.y + (reserva.height - altura) / 2
      : texto.y - hero.y + (texto.height - altura) / 2;
    const posicaoX = arredondar(x);
    const posicaoY = arredondar(y);
    const escalaSvg = escala.toFixed(5);

    return {
      scale: escala,
      x: posicaoX,
      y: posicaoY,
      viewBox: `0 0 ${arredondar(hero.width)} ${arredondar(hero.height)}`,
      transform: `translate(${posicaoX} ${posicaoY}) scale(${escalaSvg})`
    };
  }

  function inicializar(documento, janela) {
    if (!documento || !janela) return null;
    const hero = documento.querySelector('.abertura');
    const svg = documento.querySelector('.placa-hero');
    const componentes = svg && svg.querySelector('.placa-hero__componentes');
    const texto = hero && hero.querySelector('.abertura-conteudo');
    const reserva = hero && hero.querySelector('.abertura-visual-reserva');
    if (!hero || !svg || !componentes || !texto || !reserva) return null;

    const mediaMobile = janela.matchMedia('(max-width: 900px)');
    const desenhar = () => {
      const layout = calcularLayoutPlaca({
        hero: hero.getBoundingClientRect(),
        texto: texto.getBoundingClientRect(),
        reserva: reserva.getBoundingClientRect(),
        mobile: mediaMobile.matches
      });
      svg.setAttribute('viewBox', layout.viewBox);
      componentes.setAttribute('transform', layout.transform);
    };

    desenhar();
    if (typeof janela.ResizeObserver === 'function') {
      const observador = new janela.ResizeObserver(desenhar);
      [hero, texto, reserva].forEach(elemento => observador.observe(elemento));
    } else {
      janela.addEventListener('resize', desenhar, { passive: true });
    }
    if (typeof mediaMobile.addEventListener === 'function') mediaMobile.addEventListener('change', desenhar);
    else if (typeof mediaMobile.addListener === 'function') mediaMobile.addListener(desenhar);

    return desenhar;
  }

  return { calcularLayoutPlaca, inicializar };
});
