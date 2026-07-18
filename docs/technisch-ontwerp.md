# Technisch Ontwerp

**Project:** Portfolio Website - Jasper van Kalsbeek
**Versie:** 1.0
**Datum:** 19 juli 2026
**Auteur:** Jasper van Kalsbeek

---

## 1. Architectuur

### 1.1 Overzicht
Statische SPA-achtige website zonder build-stap. Alle pagina's zijn losse HTML-bestanden die een gedeelde CSS-styling en JavaScript-bestanden delen. Projectdata wordt dynamisch geladen uit een JSON-bestand.

```
jaspervkalsbeek-svg.github.io/
├── index.html              # Home pagina
├── projects.html           # Projecten overzicht
├── project.html            # Dynamische project detail pagina
├── about.html              # Over mij / CV
├── contact.html            # Contact
├── privacy.html            # Privacybeleid
├── voorwaarden.html        # Gebruiksvoorwaarden
├── favicon.svg             # Website icoon
├── .nojekyll               # GitHub Pages config
├── .gitignore              # Git ignore rules
├── css/
│   └── style.css           # Alle styling (1136 regels)
├── js/
│   ├── main.js             # Mouse glow, scroll reveal, lightbox (54 regels)
│   └── projects.js         # Filter/search logica (101 regels)
├── data/
│   └── projects.json       # Alle projectdata (244 regels)
├── screenshots/            # Project screenshots (WebP + SVG)
├── docs/                   # Ontwerp documenten
├── package.json            # npm package (puppeteer voor screenshots)
├── take-screenshots.mjs    # Puppeteer screenshot script
└── node_modules/           # npm dependencies
```

### 1.2 Hosting
- **Platform:** GitHub Pages
- **URL:** `https://jaspervkalsbeek-svg.github.io`
- **Deploy:** Automatisch bij push naar `main` branch
- **Branching:** `main` (productie), `dev` (ontwikkeling)
- **Tag:** `v1.0` (huidige release)

### 1.3 Browser ondersteuning
- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

---

## 2. Frontend architectuur

### 2.1 CSS (`css/style.css`)
- **Benadering:** Handgeschreven CSS, geen preprocessor
- **CSS variabelen:** Centraal gedefinieerd in `:root`
- **Responsive:** Mobile-first met media queries op 768px en 480px
- **Kleurenschema:**

| Variabele | Waarde | Functie |
|-----------|--------|---------|
| `--bg` | `#07070a` | Achtergrond |
| `--surface` | `#0d0d14` | Kaarten en panels |
| `--border` | `#1a1a28` | Randen |
| `--text` | `#c8c8d0` | Hoofdtekst |
| `--text-muted` | `#6a6a7a` | Secundaire tekst |
| `--accent` | `#ff6b35` | Oranje accent |
| `--accent-dim` | `rgba(255,107,53,0.12)` | Subtiele accent achtergrond |
| `--radius` | `6px` | Afronding |

- **Fonts:**
  - Code/labels: `'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace`
  - UI: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

- **Animaties:**
  - `scroll-behavior: smooth` op `<html>`
  - `.reveal` class met `IntersectionObserver` voor scroll-reveal
  - Mouse-glow effect via `#mouseGlow` element met `requestAnimationFrame`

### 2.2 JavaScript

#### `js/main.js` (54 regels)
Drie onafhankelijke IIFE's:

1. **Mouse glow** (regel 1-22)
   - Volgt muispositie met vertraging (`lerp` met factor 0.05)
   - Alleen actief op pagina's met `#mouseGlow` element

2. **Scroll reveal** (regel 24-38)
   - `IntersectionObserver` met threshold 0.1
   - Voegt `.visible` class toe wanneer element in beeld komt
   - CSS transition: opacity 0.6s + translateY 24px -> 0

3. **Screenshot lightbox** (regel 40-54)
   - Event delegation op `document` voor klikken op screenshots
   - Maakt dynamisch een `.lightbox` element aan
   - Sluit op ESC-toets of klik buiten de foto

#### `js/projects.js` (101 regels)
Globale state + functies:

**State:**
- `projects`: array met alle projectobjecten
- `activeFilter`: huidige categorie-filter (standaard: `'all'`)
- `activeTech`: huidige technologie-filter (standaard: `''`)

**Functies:**
| Functie | Regels | Functie |
|---------|--------|---------|
| `loadProjects()` | 5-15 | Laadt JSON, start rendering |
| `buildTechFilters()` | 17-35 | Genereert technologie-knoppen dynamisch |
| `setFilter(cat)` | 37-43 | Wisselt categorie-filter |
| `setTech(tech)` | 45-52 | Wisselt technologie-filter |
| `filterProjects()` | 54-56 | Wrapper voor renderProjects |
| `renderProjects()` | 58-99 | Filtert en rendert projectlijst |

**Filter logica:**
1. Controleer categorie (tenzij "all")
2. Controleer technologie (indien geselecteerd)
3. Controleer zoekterm in titel + ondertitel + beschrijving + tags
4. Toon resultaten of lege-staat

### 2.3 Dynamische project detail pagina (`project.html`)
- Inline `<script>` blok (~100 regels)
- Parsed `?id=` parameter uit URL
- Laadt `data/projects.json` via `fetch()`
- Zoekt project op ID
- Rendert dynamisch: titel, subtitel, meta, tags, links, screenshots, features, tech-stack, beschrijving, proces-secties
- Foutafhandeling: onbekend ID, ontbrekend ID, laadfouten

---

## 3. Data model

### 3.1 `data/projects.json`
Enkel JSON-array met 9 projectobjecten. Elke object volgt dezelfde structuur:

```json
{
  "id": "string",
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "tags": ["string"],
  "features": ["string"],
  "techStack": ["string"],
  "links": {
    "github": "string (optioneel)",
    "site": "string (optioneel)",
    "docs": "string (optioneel)"
  },
  "screenshots": ["string (bestandsnaam)"],
  "category": "web | tool | other | mobile",
  "year": 2026,
  "approach": "string",
  "role": "string",
  "testing": "string",
  "learned": "string"
}
```

### 3.2 Screenshots
- Opslaglocatie: `/screenshots/`
- Formaat: WebP (voor foto's) en SVG (voor diagrammen)
- Naming: `{project-id}-{beschrijving}.webp`
- Totaal: 27 bestanden

---

## 4. SEO en metadata

### 4.1 Per pagina
Elke HTML-pagina bevat:
- `<meta name="description">` (unik per pagina)
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:type">`
- `<link rel="icon" type="image/svg+xml" href="favicon.svg">`

### 4.2 Ontbrekend
- `og:image` (geen sociale media preview-afbeelding)
- `twitter:card` meta tags
- `robots.txt` (niet strikt noodzakelijk voor portfolio)
- `sitemap.xml` (niet strikt noodzakelijk voor 7 pagina's)

---

## 5. Accessibility

### 5.1 Aanwezig
- Skip-link naar `#main` op elke pagina
- `<main id="main">` landmark
- `<nav>` landmark
- `aria-label` op zoekinput
- `lang="nl"` op `<html>`

### 5.2 Verbeterpunten
- Meer `aria-labels` op knoppen en links
- `role` attributen op niet-standaard elementen
- Keyboard navigatie voor lightbox
- High-contrast mode ondersteuning

---

## 6. Security

### 6.1 Van toepassing
- Geen backend = geen server-side kwetsbaarheden
- Geen cookies, geen sessies, geen authenticatie
- Geen formulieren die data versturen (behalve `mailto:` links)
- Externe links hebben `rel="noopener noreferrer"`
- `.gitignore` sluit `node_modules/` uit

### 6.2 Niet van toepassing
- XSS-preventie (alle data is statisch of uit eigen JSON)
- CSRF-bescherming (geen formulieren)
- Rate limiting (geen API calls)
- Input validatie (geen user input behalve zoekbalk)

---

## 7. Git structuur

### 7.1 Branches
| Branch | Functie |
|--------|---------|
| `main` | Productie, automatische deploy naar GitHub Pages |
| `dev` | Ontwikkeling, experimentele features |

### 7.2 Tags
| Tag | Beschrijving |
|-----|-------------|
| `v1.0` | Eerste release - portfolio met 9 projecten |

### 7.3 Commit strategie
- Small, gefocuste commits
- commits in het Nederlands of Engels
- Geen force-push naar `main`

---

## 8. Afhankelijkheden

### 8.1 Runtime
Geen. De website is volledig static.

### 8.2 Development
| Package | Versie | Functie |
|---------|--------|---------|
| puppeteer | ^25.3.0 | Screenshots maken van externe sites |

### 8.3 Externe services
| Service | Gebruik |
|---------|---------|
| GitHub Pages | Hosting |
| Google Fonts | Font-loading (via CSS) |

---

## 9. Bestanden overzicht

| Bestand | Regels | Functie |
|---------|--------|---------|
| `index.html` | 169 | Home pagina |
| `projects.html` | 70 | Projecten overzicht |
| `project.html` | 211 | Dynamische project detail |
| `about.html` | 149 | Over mij / CV |
| `contact.html` | 70 | Contact |
| `privacy.html` | 61 | Privacybeleid |
| `voorwaarden.html` | 64 | Voorwaarden |
| `css/style.css` | 1136 | Alle styling |
| `js/main.js` | 54 | Animaties en lightbox |
| `js/projects.js` | 101 | Filter/search logica |
| `data/projects.json` | 244 | Projectdata |
| `take-screenshots.mjs` | 22 | Puppeteer screenshot script |
| `package.json` | 24 | npm configuratie |
| **Totaal** | **~2275** | |

---

## 10. Build en deploy

### 10.1 Lokale ontwikkeling
Geen build-stap nodig. Open `index.html` in de browser of gebruik een lokale server:
```bash
npx serve .
```

### 10.2 Screenshots maken
```bash
node take-screenshots.mjs
```
Vereist een draaiende lokale server met de betreffende projecten.

### 10.3 Deploy
Automatisch via GitHub Pages bij push naar `main`:
```bash
git checkout main
git merge dev
git push origin main
```

---

## 11. Onderhoud

### 11.1 Nieuw project toevoegen
1. Screenshot(s) toevoegen aan `/screenshots/` in WebP-formaat
2. Projectobject toevoegen aan `data/projects.json`
3. Push naar `main` - site update automatisch

### 11.2 Statistieken bijwerken
Waarden in `index.html` (regel 65-80) handmatig bijwerken.

### 11.3 Screenshot tool bijwerken
URL's in `take-screenshots.mjs` aanpassen naar de betreffende project-URL's.
