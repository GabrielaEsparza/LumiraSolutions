# Conventions

## Markup

- Keep the page as semantic, sectioned HTML with Spanish user-facing copy and
  hash-based navigation (`index.html`).
- Use relative paths for repository assets and preserve lazy loading for
  below-the-fold portfolio images (`index.html`).
- Follow the existing BEM-like block and element class naming pattern, with
  section comments marking major page regions (`index.html`, `css/style.css`).

## Styling

- Define shared colors, typography, sizing, and easing as custom properties in
  `:root`; reuse those tokens in component rules (`css/style.css`).
- Keep component styles grouped by page section and add responsive behavior with
  local `@media` rules at the existing breakpoints (`css/style.css`).
- Preserve the current three-font split: Space Grotesk for display text, Plus
  Jakarta Sans for body text, and IBM Plex Mono for labels and data-like text
  (`css/style.css`).

## Browser scripting

- Keep client behavior in the single strict-mode IIFE and use feature/element
  guards before attaching behavior (`js/main.js`).
- Respect `prefers-reduced-motion` and provide a usable fallback when optional
  browser features or hero media fail (`js/main.js`).
