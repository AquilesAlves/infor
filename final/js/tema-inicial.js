// Aplica o tema salvo (claro ou escuro) antes de desenhar a página, para não "piscar".
// Fica no <head> de propósito. Sem tema salvo, a página segue o tema do sistema.
try {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro' || temaSalvo === 'escuro') document.documentElement.dataset.tema = temaSalvo;
} catch (erro) {}
