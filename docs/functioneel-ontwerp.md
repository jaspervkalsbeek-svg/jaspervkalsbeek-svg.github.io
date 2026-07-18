# Functioneel Ontwerp

**Project:** Portfolio Website - Jasper van Kalsbeek
**Versie:** 1.0
**Datum:** 19 juli 2026
**Auteur:** Jasper van Kalsbeek

---

## 1. Inleiding

### 1.1 Doel
Persoonlijke portfolio website ter presentatie van projecten, vaardigheden en professionele achtergrond. De site dient als digitaal visitekaartje voor werkgevers, medestudenten en potentiële opdrachtgevers.

### 1.2 Doelgroep
- Werkgevers en recruiters in de IT-sector
- Medestudenten en docenten
- Potentiële opdrachtgevers

### 1.3 Scope
Statische website gehost op GitHub Pages. Geen backend, geen databases, geen authenticatie. Alle projectdata wordt uit een JSON-bestand geladen.

---

## 2. Functionele eisen

### 2.1 Pagina's

| Pagina | Bestand | Functie |
|--------|---------|---------|
| Home | `index.html` | Begroeting, featured project, technische skills |
| Projecten | `projects.html` | Overzicht van alle projecten met zoek- en filtermogelijkheden |
| Project detail | `project.html` | Dynamische weergave van een enkel project |
| Over mij | `about.html` | CV, vaardigheden, opleiding, contactgegevens |
| Contact | `contact.html` | Contactinformatie en kanalen |
| Privacybeleid | `privacy.html` | Juridische informatie over privacy |
| Voorwaarden | `voorwaarden.html` | Gebruiksvoorwaarden |

### 2.2 Home pagina
- Begroeting met naam en ondertitel
- Technische tags (PHP, Node.js, MySQL, Puppeteer, Python, JavaScript)
- Buttons naar projecten en GitHub
- Featured project (FoldersVergelijker) met statistieken
- Technische details-sectie
- Over mij-sectie met vaardigheden

### 2.3 Projecten overzicht
- Lijstweergave van alle projecten
- Zoekbalk met live filtering
- Filter op categorie: Alle, Web, Tools, Overig
- Filter op technologie (dynamisch gegenereerd op basis van beschikbare tags)
- Elke project toont: screenshot, titel, ondertitel, beschrijving, tech-stack, links

### 2.4 Project detail
- Dynamische laden op basis van `?id=` parameter
- Weergave van: titel, ondertitel, jaar, categorie, tags
- Links: GitHub, live site, documentatie (indien beschikbaar)
- Screenshots met lightbox (klik om te vergroten, ESC/klik buiten om te sluiten)
- Features-lijst
- Tech-stack overzicht
- Beschrijving
- Proces: aanpak, rol, testen, geleerd

### 2.5 Over mij
- Profiel met avatar (initiaLEN)
- Bio en rolomschrijving
- Snelkoppelingen naar GitHub, LinkedIn, Microsoft Learn
- Vaardigheden gegroepeerd: Development, Security, Overig
- Opleidingsinformatie
- Contactgegevens

### 2.6 Navigatie
- Vaste bovenbalk (sticky) met backdrop-blur
- Logo: `jasper.dev`
- Links: Home, Projecten, Over mij
- Actieve pagina wordt visueel gemarkeerd

### 2.7 Footer
- Copyright
- Links naar juridische pagina's (Privacybeleid, Voorwaarden, Contact)

---

## 3. Niet-functionele eisen

### 3.1 Design
- Donker industrieel thema (`#07070a` achtergrond)
- Warm oranje accent (`#ff6b35`)
- Monospace fonts (SF Mono, Fira Code, Cascadia Code, JetBrains Mono)
- Grid-achtergrond effect
- Mouse-glow effect op hero-secties
- Scroll-reveal animaties

### 3.2 Responsive
- Mobile-first ontwerp
- Breakpoints: 768px (tablet), 480px (klein mobiel)
- Navigatie, grids en cards passen zich aan op schermgrootte

### 3.3 Toegankelijkheid
- Skip-link naar hoofdinhoud
- ARIA-labels op interactieve elementen
- Leesbare kleurcontrasten

### 3.4 Prestaties
- Screenshots in WebP-formaat (83% kleiner dan PNG)
- Lazy loading op afbeeldingen
- Geen externe dependencies (behalve Google Fonts via CSS)
- Geen analytics of tracking cookies

### 3.5 Hosting
- GitHub Pages (automatische deploy bij push naar `main`)
- `.nojekyll` aanwezig voor correcte bestandsweergave

---

## 4. Gegevensmodel

### 4.1 Project structuur (`data/projects.json`)

```
Project {
  id: string          // Unieke identifier (bijv. "foldersvergelijker")
  title: string       // Weergavetitel
  subtitle: string    // Korte omschrijving
  description: string // Uitgebreide beschrijving
  tags: string[]      // Technologieen
  features: string[]  // Lijst met features
  techStack: string[] // Tech stack voor detailweergave
  links: {
    github?: string   // GitHub repository URL
    site?: string     // Live site URL
    docs?: string     // Documentatie URL
  }
  screenshots: string[]  // Bestandsnamen in /screenshots/
  category: string       // "web" | "tool" | "other" | "mobile"
  year: number           // Aanmaakjaar
  approach: string       // Aanpak beschrijving
  role: string           // Eigen rol
  testing: string        // Testbeschrijving
  learned: string        // Reflectie
}
```

### 4.2 Huidige projecten (8)

| ID | Titel | Categorie |
|----|-------|-----------|
| foldersvergelijker | FoldersVergelijker | web |
| portfolio | Portfolio website | web |
| ticket | Ticket | web |
| challenge-8 | Challenge 8 - RNGdex | web |
| ow-heroes | OWdex | web |
| skillssphere | SkillsSphere | web |
| geoguessr | GeoGuessr | web |
| eyelash-correction | EyeLash Correction App | mobile |
| arbo-adviesburo | Arbo Adviesburo Van Kalsbeek | web |

---

## 5. Gebruikersinteracties

### 5.1 Zoeken op projecten
1. Gebruiker typt een zoekterm in de zoekbalk
2. Projecten worden gefilterd op titel, ondertitel, beschrijving en tags
3. Resultaten worden direct bijgewerkt (live filtering)

### 5.2 Filteren op categorie
1. Gebruiker klikt op een categorie-knop (Alle, Web, Tools, Overig)
2. Alleen projecten van de geselecteerde categorie worden getoond

### 5.3 Filteren op technologie
1. Dynamische technologie-knoppen worden gegenereerd op basis van alle tags in de data
2. Gebruiker klikt op een technologie-knop
3. Alleen projecten met die tag worden getoond

### 5.4 Bekijken van projectdetail
1. Gebruiker klikt op "Bekijk project" of een project-item
2. Pagina laadt dynamisch de projectdata op basis van het ID
3. Alle secties (screenshots, features, tech, beschrijving, proces) worden weergegeven

### 5.5 Screenshot lightbox
1. Gebruiker klikt op een screenshot
2. Foto wordt vergroot weergegeven over het scherm
3. Gebruiker klikt buiten de foto of drukt op ESC om te sluiten

---

## 6. Uitzonderingen en foutafhandeling

| Situatie | Afhandeling |
|----------|-------------|
| Onbekend project ID | Melding: "Project niet gevonden" met link terug |
| Geen ID opgegeven | Melding: "Geen project opgegeven" met link terug |
| JSON niet te laden | Melding: "Kon projecten niet laden" |
| Screenshot niet gevonden | Afbeelding wordt verborgen (`onerror="this.style.display='none'"`) |
| Geen zoekresultaten | Lege-staat weergave: "Geen projecten gevonden" |

---

## 7. Toekomstige uitbreidingen ( backlog)

- Blog-sectie voor technische artikelen
- Dark/light theme toggle
- Taalkeuze (NL/EN)
- Meerdere featured projects op home
- Animaties op projectkaarten
