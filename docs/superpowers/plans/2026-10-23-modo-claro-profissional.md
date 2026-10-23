# Modo Claro Profissional — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the light mode palette of the root site so it feels intentional and professional, decoupling neutral backgrounds/texts/borders from the accent color while preserving all eight color options and leaving dark mode untouched.

**Architecture:** Introduce fixed neutral CSS variables for the light theme (`--fundo`, `--superficie`, `--texto`, `--texto-suave`, `--linha`, etc.) instead of deriving them via `color-mix(..., var(--destaque), ...)`. Keep `--destaque` as the only accent-driven token, using it for primary buttons, focus outlines, active menu links, and small highlights. Adjust the eight light-mode accent values in `js/script.js` where needed (notably yellow, pink, cyan) so every option meets contrast expectations against white surfaces without changing the dark-mode variants.

**Tech Stack:** Static HTML/CSS/JS; no build step. Verification by opening `index.html` in a browser and toggling light mode across all colors.

**Spec:** Conversation with user — preserve current color selector, preserve dark mode, fix only light mode to look natural and professional.

## Global Constraints

- Do not change the file structure or add dependencies.
- Do not alter layout, typography, animations, or dark mode.
- Preserve the eight options in the color selector and their saved behavior in `localStorage`.
- The site must remain fully static and work by opening `index.html` directly.
- Each color option must remain visually usable in light mode, including yellow.

## Review Focus

- Yellow accent (`#CA8A04`) on white/neutral surfaces: must not feel "sick" and button text must stay readable.
- Pink and cyan accents: should feel professional, not playful or neon.
- The default orange must not dominate backgrounds; only buttons/focus/links use it.
- Hover/focus states across all eight colors must be distinguishable.
- Theme toggle from/to light mode must not flash or break because of hard-coded dark neutrals leaking into light mode.

---

### Task 1: Audit current light-mode color usage

**Files:**
- Read: `css/estilo.css`
- Read: `js/script.js` (color selector options)
- Read: `js/config.js` (default `cor` / `corEscuro`)

**Interfaces:**
- Consumes: existing CSS custom properties and JS color options
- Produces: list of every CSS variable that currently mixes `--destaque` into neutrals in light mode

- [ ] **Step 1: List all `color-mix` usages inside the `:root` light block**

  Run: `grep -n "color-mix" css/estilo.css`
  Expected: a list of variables whose light values depend on `--destaque`.

- [ ] **Step 2: Identify hard-coded dark neutrals that might leak**

  Run: `grep -n "#0F1012\|#16171A\|#F0F0F0" css/estilo.css`
  Expected: confirm these only live inside `@media (prefers-color-scheme: dark)` and `[data-tema="escuro"]`.

- [ ] **Step 3: Document the eight light-mode accent hex values**

  Run: `grep -A8 "opcoes = \[" js/script.js`
  Expected: values for default, orange, blue, green, purple, red, pink, cyan, yellow.

---

### Task 2: Define fixed neutral palette for light mode

**Files:**
- Modify: `css/estilo.css` lines 2–28 (the `:root` light block)

**Interfaces:**
- Consumes: audit results from Task 1
- Produces: a `:root` block where neutral tokens are constant in light mode and only `--destaque` changes per accent

- [ ] **Step 1: Replace neutral `color-mix` values with fixed light neutrals**

  Use these starting tokens (adjust if audit shows additional usages):
  - `--fundo: #F6F7F5`
  - `--superficie: #FFFFFF`
  - `--superficie-2: #EBECEA`
  - `--texto: #1A1A1A`
  - `--texto-suave: #555555`
  - `--linha: #D9DAD8`
  - `--destaque-suave: color-mix(in srgb, var(--destaque) 11%, transparent)` (kept, because it intentionally tints the accent)
  - `--sobre-destaque: #FFFFFF` unless overridden by JS for light-on-bright accents
  - `--placa: #EFEFED`, `--placa-2: var(--superficie)`, `--placa-linha: #B9B9B4`, `--placa-texto: var(--texto)`, `--placa-suave: #4A4A4A`, `--placa-destaque: var(--destaque)`
  - `--aberto: #15803D`, `--fechado: #9A3412` (semantic, accent-agnostic)

- [ ] **Step 2: Keep only `--destaque` accent-driven in light `:root`**

  Verify the `:root` block now contains no `color-mix(in srgb, var(--destaque)` for background, surface, text, or line colors.

- [ ] **Step 3: Preserve dark blocks unchanged**

  Confirm `@media (prefers-color-scheme: dark)` and `[data-tema="escuro"]` blocks remain exactly as before.

---

### Task 3: Adjust light-mode accent options for readability

**Files:**
- Modify: `js/script.js` lines 56–66 (the `opcoes` array)

**Interfaces:**
- Consumes: fixed neutrals from Task 2
- Produces: a refined `opcoes` array where light values are slightly darker/more saturated where needed

- [ ] **Step 1: Keep dark values unchanged**

  Do not modify `corEscuro` for any option.

- [ ] **Step 2: Update light values that need more contrast**

  Proposed adjustments (keep the existing hues, only tweak lightness):
  - Laranja: `#C2410C` → keep or try `#B5360B` if it feels too bright on white.
  - Azul: `#2F6FDE` → keep.
  - Verde: `#15803D` → keep.
  - Roxo: `#7C3AED` → keep.
  - Vermelho: `#DC2626` → keep.
  - Rosa: `#DB2777` → try `#C71D66` to reduce playfulness.
  - Ciano: `#0E7490` → try `#0A5F78` for stronger contrast.
  - Amarelo: `#CA8A04` → try `#A16A00` and set `textoSobre: #1F1A05` (already set).

- [ ] **Step 3: Verify every option still has a unique `cor` value**

  Run: `grep -E "cor:\s*'#[0-9A-Fa-f]{6}'" js/script.js | wc -l`
  Expected: 9 (default + 8 options).

---

### Task 4: Test visual result across colors and themes

**Files:**
- Use: `index.html`

**Interfaces:**
- Consumes: changes from Tasks 2 and 3
- Produces: manual verification that light mode looks professional for every accent

- [ ] **Step 1: Open `index.html` in a browser**

  Run: `python3 -m http.server 8000` (or open file directly) and load the page.

- [ ] **Step 2: Force light mode and cycle through all colors**

  In DevTools console:
  ```js
  localStorage.setItem('tema','claro');
  location.reload();
  ```
  Click the palette button and select each color. Confirm:
  - backgrounds stay neutral;
  - buttons are readable;
  - hover/focus states are visible;
  - yellow does not look muddy.

- [ ] **Step 3: Confirm dark mode is unchanged**

  In DevTools console:
  ```js
  localStorage.setItem('tema','escuro');
  location.reload();
  ```
  Cycle colors and confirm no regressions.

---

### Task 5: Commit

- [ ] **Step 1: Stage changes**

  ```bash
  git add css/estilo.css js/script.js
  ```

- [ ] **Step 2: Commit**

  ```bash
  git commit -m "refactor: modo claro com paleta neutra fixa e acentos refinados"
  ```
