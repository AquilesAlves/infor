# Personalização rápida

Abra `index.html` e edite **só o bloco `const LOJA = { ... }`** no final do arquivo. O resto da página é preenchido sozinho.

- `nome`, `sigla`: nome da loja e as 2 letras do logo.
- `whatsapp`: só dígitos, com DDI e DDD (ex.: `5511999990000`). `whatsappExibicao` é como o número aparece na tela.
- `email`, `instagram`, `facebook`: deixe `""` para esconder.
- `endereco`, `cidade`: usados no cartão de contato, no rodapé, no botão "Como chegar" e no mapa.
- `mapa`: deixe `""` para gerar o mapa pelo endereço, ou cole o link do Google Maps (Compartilhar > Incorporar um mapa, só o conteúdo de `src="..."`).
- `horarios`: de domingo a sábado; `null` = fechado. O selo "Aberto agora / Fechado" é calculado automaticamente.
- `cor`, `corEscuro`: cor de destaque nos modos claro e escuro.
- `marcas`, `produtos`, `garantias`, `servicos`, `depoimentos`, `faq`: listas editáveis. Troque os depoimentos de exemplo pelos comentários reais dos clientes.
- `cnpj`, `credito`: aparecem no rodapé quando preenchidos.

O botão no topo alterna entre os modos claro e escuro e guarda a escolha no navegador.
