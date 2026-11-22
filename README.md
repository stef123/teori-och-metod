# Teori & metod i informatik

Ett studiestöd där studenter utforskar vanliga teorier och forskningsmetoder inom informatik/IS. Varje teori och metod förklaras i fyra nivåer, från "enkelt förklarat" (ELI5) till forskarnivå, med referenser (DOI) till grundtexter och artiklar som använt teorin.

## Arkitektur i korthet

- **Statisk sajt utan byggsteg och utan externa beroenden.** `index.html`, `assets/app.js` och `assets/style.css`. Fungerar på vilken webbhotell som helst (GitHub Pages, lärosätets webbserver) och kan bäddas in i Canvas.
- **Innehållet är textfiler** i `content/`. En fil per teori eller metod, i Markdown med ett kort huvud (frontmatter). Lärare kan lägga till och ändra innehåll utan att röra koden.
- **Hash-baserad navigering** (`#/teori/tam`) gör att varje sida har en egen länk som fungerar i Canvas, och `?embed=1` döljer menyn vid inbäddning.
- **Kontrollskript** `tools/bygg-index.mjs` uppdaterar `content/index.json` och varnar för saknade nivåer, okända länkar och felaktiga DOI:er. GitHub Actions kör det automatiskt vid varje ändring.

```
index.html
assets/        app.js, style.css
content/
  index.json         lista över innehållsfiler (genereras)
  studieguide.json   frågor, val och poäng i studieguiden
  teorier/*.md       en fil per teori
  metoder/*.md       en fil per metod
  sidor/*.md         "Vad är en teori?", metodguide, om sajten
tools/bygg-index.mjs
.github/workflows/pages.yml
```

## Lägga till en teori eller metod

1. Kopiera en befintlig fil, t.ex. `content/teorier/tam.md`, och ge den ett nytt namn.
2. Uppdatera huvudet (mellan `---`): `id`, `namn` (originalnamn, oftast engelska), `kortnamn`, `svnamn` (svenskt namn, valfritt), `sammanfattning`, `omraden`, `metoder`, `relaterade` och `referenser`.
3. Skriv texten under `## Nivå 1` … `## Nivå 4`. Övriga `##`-rubriker (t.ex. `## Typiska forskningsfrågor`) visas under nivåerna.
4. Kör `node tools/bygg-index.mjs` (eller låt GitHub göra det).

Länka till andra teorier/metoder med `[[id]]`, t.ex. `[[utaut]]`. Referenser har fälten `forfattare`, `ar`, `titel`, `kalla`, `doi`, `typ: bok` (om bok), `roll` (`grund`, `tillampning` eller `oversikt`) och `kommentar`.

**Användningsområden** är fria etiketter i `omraden`. Använd samma stavning som befintliga, så hamnar de rätt i översikten.

## Ändra studieguiden

`content/studieguide.json` innehåller guidens steg. Varje alternativ har `teorier` och `metoder` med poäng (id: poäng), och kan ha `paradigm`, `gregor`, `fragemall` och `plan`. `visaOm` gör ett steg villkorat av ett tidigare val. Resultatet visar de teorier och metoder som fått flest poäng och länkar till deras sidor.

## Köra lokalt

```
python3 -m http.server
```
och öppna http://localhost:8000. (Att öppna `index.html` direkt fungerar inte, eftersom innehållet läses in med fetch.)

## Canvas

- Länka sajten som extern URL i en modul, eller
- bädda in en enskild sida: varje teori-/metodsida har rutan "Använd i Canvas" med färdig iframe-kod.
- Senare kan sajten kopplas som LTI-verktyg om ni vill ha den i kursmenyn; det kräver en liten serverdel och godkännande av Canvas-administratören.
