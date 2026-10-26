# Personalização rápida

## Arquivos

| Arquivo | O que tem |
|---|---|
| `index.html` | A estrutura da página (seções, textos fixos) |
| `css/estilo.css` | Todo o visual. As cores e fontes ficam nas variáveis do topo (`--fundo`, `--texto`, `--destaque`...) |
| `js/config.js` | **Os dados da loja.** É o único arquivo que precisa ser editado para cada cliente |
| `js/script.js` | O funcionamento: monta as seções a partir do `config.js`, horário, tema, menu, perguntas |
| `js/tema-inicial.js` | Aplica o tema salvo antes de a página aparecer (evita "piscar") |

Mantenha as pastas `css` e `js` junto do `index.html` ao publicar o site.

## O que editar em `js/config.js`

Abra `js/config.js` e altere os campos do objeto `LOJA`. O resto da página é preenchido sozinho.

- `nome`, `sigla`: nome da loja e as 2 letras do logo.
- `whatsapp`: só dígitos, com DDI e DDD (ex.: `5511999990000`). `whatsappExibicao` é como o número aparece na tela.
- `email`, `instagram`, `facebook`: deixe `""` para esconder.
- `endereco`, `cidade`: usados no cartão de contato, no rodapé, no botão "Como chegar" e no mapa.
- `mapa`: deixe `""` para gerar o mapa pelo endereço, ou cole o link do Google Maps (Compartilhar > Incorporar um mapa, só o conteúdo de `src="..."`).
- `horarios`: de domingo a sábado; `null` = fechado. O selo "Aberto agora / Fechado" é calculado automaticamente.
- `cor`, `corEscuro`: cor de destaque nos modos claro e escuro.
- `seletorCores`: mostra no topo um botão de paleta para testar outras cores de destaque (a escolha fica salva só no navegador de quem testou). Mude para `false` antes de entregar o site ao cliente.
- `marcas`, `produtos`, `garantias`, `servicos`, `depoimentos`, `faq`: listas editáveis. Troque os depoimentos de exemplo pelos comentários reais dos clientes.
- `cnpj`: aparece no rodapé quando preenchido.
- `cep`: completa o endereço nos dados enviados ao Google.
- `avaliacoesGoogle`: link das avaliações da loja no Google (perfil do Google Meu Negócio > Compartilhar). Mostra o botão "Ver avaliações no Google" embaixo dos depoimentos; `""` esconde.

### Dados para o Google

O site gera sozinho, a partir do `config.js`, um bloco invisível no padrão LocalBusiness (tipo `ComputerStore`) com nome, endereço, CEP, telefone, e-mail, horários e redes. É o que ajuda o Google a mostrar a loja nas buscas da região. Basta preencher os campos certos do cliente. Para conferir depois de publicar: search.google.com/test/rich-results.
- `credito`: linha "Desenvolvido por SHIFT" no rodapé, com link (`texto`, `nome`, `link`). `""` esconde.

## Fotos dos produtos

Cada item de `produtos` aceita o campo opcional `foto`, que aparece no topo do card no lugar do ícone (proporção 16:10, ex.: 640×400 px). Coloque as fotos do cliente na pasta `img/` (as de `img/exemplos/` são fotos genéricas do Unsplash, de uso livre, só para teste). Sem `foto`, o card mostra o ícone. Use JPG ou WebP com até ~200 KB por foto.

## Ícone e prévia do link (WhatsApp e redes)

Ficam no topo do `index.html`, dentro do `<head>`. Esses campos não estão no `config.js` porque WhatsApp, Instagram e Facebook leem só o HTML da página, sem rodar o JavaScript.

| Arquivo / campo | Para que serve | Tamanho |
|---|---|---|
| `favicon.svg` (`<link rel="icon">`) | ícone da aba do navegador | quadrado, SVG ou PNG 64×64 |
| `icone-180.png` (`apple-touch-icon`) | ícone ao salvar o site na tela inicial do iPhone | PNG 180×180 |
| `compartilhar.jpg` (`og:image`) | imagem que aparece quando mandam o link no WhatsApp | 1200×630, até ~300 KB |
| `og:title`, `og:description`, `og:site_name` | título e texto da prévia | nome e frase curta da loja |

Ao publicar, troque `og:url` e `og:image` pelo endereço completo (ex.: `https://lojadocliente.com.br/img/compartilhar.jpg`): o WhatsApp não acha a imagem com caminho relativo. Para conferir a prévia, use o depurador do Facebook (developers.facebook.com/tools/debug), que usa o mesmo padrão do WhatsApp.

## Atualizando um site já publicado

No `index.html`, os arquivos de estilo e script têm `?v=2` no fim (ex.: `css/estilo.css?v=2`). Sempre que mudar algo e publicar, troque o número nos quatro lugares (`?v=3`, `?v=4`...). Assim o navegador dos visitantes baixa os arquivos novos na hora, em vez de usar a cópia guardada (o GitHub Pages deixa guardar por 10 minutos, e celulares às vezes por mais tempo).

O botão no topo alterna entre os modos claro e escuro e guarda a escolha no navegador.
