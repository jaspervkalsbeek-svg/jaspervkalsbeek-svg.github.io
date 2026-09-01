# Portfolio - Jasper van Kalsbeek

## Wat is dit?
Persoonlijke portfolio website op GitHub Pages. Pure HTML/CSS/JS, geen build step, geen framework. Taal: Nederlands.

## Architectuur
- `data/projects.json` - alle projectdata (9 projecten). **Dit is de enige plek om projecten toe te voegen/bewerken.**
- `project.html` - dynamische detail pagina, laadt project via `?id=` query param
- `js/projects.js` - filter/search logica voor projects.html
- `js/main.js` - scroll reveal + mobile nav + smooth scroll
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

## Responsive design
- **Mobile (≤768px):** alle touch targets min 44px, font sizes min 12px, canvas animatie uit, grids 1 kolom, container padding 16px
- **Tablet (769-1024px):** 3-koloms stats, 2-koloms grids, canvas met minder particles, geen connections
- **Desktop (>1024px):** volledige animatie, 3-koloms grids, 1100px max-width
- Breakpoints in `css/style.css` onderaan. Bij wijzigingen: Puppeteer audit draaien op 375px en 768px

## Constraints
- Geen PHP/MySQL - draait op GitHub Pages (static only)
- Geen build tools, geen bundler - directe bestanden
- `package.json` bevat alleen Puppeteer voor screenshots
