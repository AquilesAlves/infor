# TechBase — Template para Lojas de Informática

Template estático de site para lojas de informática: conserto, venda de peças e assistência técnica. Feito para ser hospedado no **GitHub Pages** e personalizado rapidamente para cada cliente.

---

## O que está incluso

- **Home** com hero visual, serviços, processo de atendimento e CTA para WhatsApp.
- **Saiba Mais** com história, equipe/dono e localização.
- Visual **tech flat**, sério e acolhedor.
- Layout responsivo para celular e desktop.
- Ilustração vetorial da bancada de informática.
- Cores, fontes e textos centralizados em variáveis CSS para fácil personalização.

---

## Como personalizar

### 1. Cores

Abra `css/style.css` e altere as variáveis no topo do arquivo (`:root`):

```css
:root {
  --color-ground: #f6f5f2;   /* fundo geral */
  --color-ink: #1c1d21;      /* texto principal */
  --color-muted: #5e6470;    /* texto secundário */
  --color-accent: #2d62ff;   /* botões e destaques */
  --color-surface: #ffffff;  /* fundo de seções */
}
```

### 2. Nome e identidade da loja

Substitua **TechBase** nos arquivos `index.html` e `saiba-mais.html` pelo nome da loja do cliente.

### 3. WhatsApp

Altere os links que contêm `5500000000000` para o número correto, com DDI + DDD + telefone. Exemplo:

```html
<a href="https://wa.me/5511999999999?text=Olá,%20vi%20o%20site%20e%20gostaria%20de%20ajuda.">
```

### 4. Textos

Edite diretamente os parágrafos e títulos em `index.html` e `saiba-mais.html`. Mantenha o tom acolhedor e técnico, sem inventar avaliações, números ou garantias que a loja não possa comprovar.

### 5. Ilustração

A ilustração da bancada está em `assets/hero-illustration.svg`. Você pode substituí-la por uma foto real da loja ou manter a ilustração. Se usar uma foto, ajuste o `alt` e as dimensões no `index.html`.

### 6. Faixa de personalização

A faixa escura no rodapé da tela é o convite para o dono da loja personalizar o modelo com você. O link também usa o placeholder `5500000000000` — troque pelo seu número de contato.

---

## Como hospedar no GitHub Pages

1. Crie um novo repositório no GitHub.
2. Envie os arquivos do template para a branch `main`.
3. No GitHub, vá em **Settings → Pages**.
4. Em "Build and deployment", selecione **Deploy from a branch** e escolha `main`.
5. Aguarde alguns minutos. O site estará disponível em `https://seuusuario.github.io/nome-do-repositorio/`.

---

## Estrutura de arquivos

```
.
├── index.html              # Home
├── saiba-mais.html         # Página secundária
├── css/
│   └── style.css           # Estilos e variáveis
├── js/
│   └── main.js             # Comportamento da faixa de personalização
├── assets/
│   └── hero-illustration.svg
├── tests/
│   └── site.test.js        # Verificações automatizadas
└── README.md
```

---

## Testes

Para rodar as verificações:

```bash
node --test tests/site.test.js
```

---

## Licença

Use como template para seus próprios projetos e clientes.
