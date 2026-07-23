# Portfolio - Jasper van Kalsbeek

## Wat is dit?
Persoonlijke portfolio website op GitHub Pages. Pure HTML/CSS/JS, geen build step, geen framework. Taal: Nederlands.

## Architectuur
- `data/projects.json` - alle projectdata (9 projecten). **Dit is de enige plek om projecten toe te voegen/bewerken.**
- `project.html` - dynamische detail pagina, laadt project via `?id=` query param
- `js/projects.js` - filter/search logica voor projects.html
- `js/main.js` - mouse glow + scroll reveal + lightbox (3 losse IIFE's)
- `css/style.css` - alles in één bestand, CSS custom properties op `:root`

## Screenshots
Screenshots in `/screenshots/` als `.webp`. Nieuwe screenshots toevoegen:
1. Zet de betreffende app lokaal draaiend op `localhost`
2. Pas URLs aan in `take-screenshots.mjs`
3. Run: `node take-screenshots.mjs` (Puppeteer, staat in dependencies)

## Design tokens
Donker industrieel thema. Kleuren via CSS custom properties:
- `--accent: #ff6b35` (warm oranje)
- `--bg: #07070a`, `--surface: #0d0d14`, `--border: #1a1a28`
- `--font` = monospace stack, `--font-ui` = system UI stack

## Nieuw project toevoegen
1. Voeg entry toe aan `data/projects.json` (zie bestaande entries als template)
2. Screenshot(s) in `/screenshots/` plaatsen
3. De site laadt alles dynamisch - geen HTML aanpassingen nodig

## Constraints
- Geen PHP/MySQL - draait op GitHub Pages (static only)
- Geen build tools, geen bundler - directe bestanden
- `package.json` bevat alleen Puppeteer voor screenshots
