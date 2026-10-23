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
- `cnpj`, `credito`: aparecem no rodapé quando preenchidos.

## Imagens da loja

Coloque as fotos de cada cliente na pasta `img/` (as de `img/exemplos/` são só marcadores para teste) e aponte os caminhos no `config.js`. Todos os campos de imagem são opcionais: vazio (`""` ou `[]`) volta ao visual padrão.

| Campo | Onde aparece | Tamanho sugerido |
|---|---|---|
| `logo` | Cabeçalho e rodapé, no lugar da sigla | quadrada, 128×128 ou SVG |
| `vitrine` (`foto`, `nome`, `preco`, `etiqueta`) | Slide "Em destaque" acima das categorias | 640×480 (4:3) |
| `produtos[].foto` | Topo de cada card de categoria, no lugar do ícone | 640×400 (16:10) |

Dica: use JPG ou WebP com até ~200 KB por foto para o site continuar rápido.

O botão no topo alterna entre os modos claro e escuro e guarda a escolha no navegador.
