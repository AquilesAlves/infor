> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

# Template de site para loja de informática — Plano de implementação

**Goal:** Criar um template estático de duas páginas (Home e Saiba Mais), hospedável no GitHub Pages, que demonstre um site profissional para lojas de informática e permita fácil personalização de marca, cores e conteúdo.

**Architecture:** Duas páginas HTML compartilhando um CSS base centralizado com variáveis de customização, navegação simples, um hero com ilustração flat, seções de serviços e confiança, footer e uma faixa discreta de personalização. Sem frameworks; tudo estático.

**Tech Stack:** HTML5, CSS3 (variáveis custom properties), JavaScript vanilla, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-21-tech-shop-template-design.md`

## Global Constraints

- Site 100% estático; sem backend, banco de dados ou carrinho.
- Deve funcionar bem em celular (WhatsApp é o canal principal).
- Todas as cores editáveis via CSS variables em um só lugar.
- Nenhum conteúdo inventado que pareça fato real (sem avaliações, selos ou estatísticas falsas).
- Hospedagem planejada para GitHub Pages.

## Review Focus

- O site abre corretamente no celular e o botão de WhatsApp é fácil de encontrar.
- A navegação entre Home e Saiba Mais funciona sem erros de caminho.
- A faixa de personalização não atrapalha a leitura da demonstração.
- As variáveis de CSS permitem trocar marca e cores sem editar vários arquivos.
- Nenhuma imagem sem licença ou crédito apropriado é usada.

---

### Task 1: Estrutura base do projeto

**Files:**
- Create: `index.html`
- Create: `saiba-mais.html`
- Create: `css/style.css`
- Create: `js/main.js`

**Interfaces:**
- Produces: estrutura HTML das duas páginas com navegação entre elas.

- [ ] **Step 1: Criar `index.html` com estrutura semântica inicial**
  - `header` com navegação para Home e Saiba Mais.
  - `main` com seções placeholder para hero, serviços, confiança, CTA e footer.
  - Link para `css/style.css` e `js/main.js`.
- [ ] **Step 2: Criar `saiba-mais.html` com a mesma estrutura base e navegação**
  - Seções para história, equipe/dono e localização/horário.
- [ ] **Step 3: Criar `css/style.css` com reset leve e variáveis iniciais**
  - Variáveis para cores, fontes, espaçamentos e tipografia.
- [ ] **Step 4: Criar `js/main.js` vazio**
  - Arquivo reservado para comportamentos leves futuros.
- [ ] **Step 5: Verificar abertura das páginas localmente**
  - Run: abrir `index.html` e `saiba-mais.html` no navegador.
  - Expected: páginas carregam, navegação entre elas funciona.

### Task 2: Conteúdo e copy das páginas

**Files:**
- Modify: `index.html`
- Modify: `saiba-mais.html`

**Interfaces:**
- Consumes: estrutura base do Task 1.
- Produces: conteúdo textual editável das duas páginas.

- [ ] **Step 1: Escrever o conteúdo do hero da Home**
  - Título, subtítulo e chamada acolhedora e técnica.
  - Exemplo: "Consertar, melhorar ou encontrar a peça certa."
- [ ] **Step 2: Escrever a seção de serviços**
  - Três serviços: conserto, upgrade/venda de peças, assistência geral.
  - Descrições curtas e claras.
- [ ] **Step 3: Escrever a seção de confiança**
  - Processo de atendimento e critérios verificáveis.
  - Sem depoimentos ou números inventados.
- [ ] **Step 4: Escrever o contato e footer**
  - Botão para WhatsApp com mensagem pronta.
  - Horário e endereço placeholder.
- [ ] **Step 5: Escrever o conteúdo do Saiba Mais**
  - História fictícia da loja, equipe/dono, localização e horário.
- [ ] **Step 6: Verificar o conteúdo em ambas as páginas**
  - Run: abrir `index.html` e `saiba-mais.html`.
  - Expected: conteúdo legível, sem erros óbvios.

### Task 3: Estilo visual tech flat e responsivo

**Files:**
- Modify: `css/style.css`
- Modify: `index.html`
- Modify: `saiba-mais.html`

**Interfaces:**
- Consumes: conteúdo do Task 2.
- Produces: estilo visual aplicado, responsivo e com variáveis de personalização.

- [ ] **Step 1: Definir paleta de cores padrão**
  - Fundo claro ou escuro, cor de texto e cor de destaque.
  - Todas via CSS variables.
- [ ] **Step 2: Definir tipografia e escala**
  - Uma ou duas fontes do Google Fonts.
  - Tamanhos responsivos.
- [ ] **Step 3: Estilizar o header e navegação**
  - Navegação simples, sem glass ou gradientes.
- [ ] **Step 4: Estilizar o hero, serviços e confiança**
  - Layout limpo, sem cards de ícone genéricos.
  - Espaçamento generoso.
- [ ] **Step 5: Estilizar CTA, footer e faixa de personalização**
  - Faixa discreta, aparecendo após a introdução.
- [ ] **Step 6: Garantir responsividade mobile**
  - Testar larguras de 390px e 1440px.
- [ ] **Step 7: Verificar visualmente**
  - Run: abrir as páginas em tamanhos desktop e mobile.
  - Expected: layout coeso, legível e sem elementos quebrados.

### Task 4: Ilustração e recursos visuais

**Files:**
- Create: `assets/` (pasta)
- Create: `assets/hero-illustration.svg` ou similar
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: estilo do Task 3.
- Produces: recurso visual principal e integração na página.

- [ ] **Step 1: Criar ilustração flat da bancada de informática**
  - Notebook, peças e ferramentas em estilo gráfico simples.
  - Usar as cores da paleta do template.
- [ ] **Step 2: Inserir a ilustração no hero da Home**
  - Referenciar `assets/hero-illustration.svg`.
- [ ] **Step 3: Verificar carregamento e proporções**
  - Run: abrir `index.html`.
  - Expected: ilustração aparece, não distorce e carrega rápido.

### Task 5: Comportamentos leves e finalização

**Files:**
- Modify: `js/main.js`
- Modify: `index.html`
- Modify: `saiba-mais.html`
- Create: `README.md`

**Interfaces:**
- Consumes: páginas e estilo dos tasks anteriores.
- Produces: template final com instruções básicas de personalização.

- [ ] **Step 1: Implementar comportamento da faixa de personalização**
  - Mostrar a faixa após scrollar além da introdução.
- [ ] **Step 2: Configurar links de WhatsApp com mensagem pronta**
  - Usar placeholders editáveis para número e mensagem.
- [ ] **Step 3: Criar `README.md` com instruções de personalização**
  - Como trocar cores, texto, número do WhatsApp e logo.
  - Como hospedar no GitHub Pages.
- [ ] **Step 4: Revisão final das duas páginas**
  - Run: abrir `index.html` e `saiba-mais.html` em desktop e mobile.
  - Expected: tudo funciona, nada inventado como fato, visual coeso.
