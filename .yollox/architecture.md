# Architecture

## System shape

Lumira Solutions is a single-page, browser-only marketing site. `index.html`
defines the page sections, navigation, calls to action, inline SVG decoration,
and references to local media, `css/style.css`, and `js/main.js`.

## Client behavior

There is no repository evidence of a backend, persistence layer, or
authentication boundary. `js/main.js` uses browser APIs for the mobile menu,
hero-video fallback and reveal timing, reduced-motion handling, viewport reveal,
and service-card expansion. The page remains content-first when video playback
or `IntersectionObserver` is unavailable (`index.html`, `js/main.js`).

## External boundaries

The page loads Google Fonts remotely and links visitors to email and WhatsApp
contact channels. These boundaries are declared directly in `index.html`.

## Deployment

`.github/workflows/static.yml` publishes the entire repository as a GitHub Pages
artifact on pushes to `main` or manual workflow dispatch. `CNAME` declares the
custom domain `lumirasolutions.com.mx`.
