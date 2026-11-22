---
id: om
namn: Om sajten
sammanfattning: Hur sajten är uppbyggd, hur den används i Canvas och hur nytt innehåll läggs till.
---

## Syfte

Sajten är ett studiestöd för kurser i informatik. Den ska hjälpa studenter att förstå vad en teori är, få en första överblick över vanliga teorier och metoder, och hitta vidare till originallitteraturen. Förklaringarna är förenklingar; använd alltid originaltexterna när du skriver en uppsats.

## Så fungerar nivåerna

Varje teori och metod förklaras på fyra nivåer. Du börjar på nivå 1 och väljer själv när du vill gå djupare. Din valda nivå sparas i webbläsaren.

Nivån är en **grundinställning för hela sajten**. Du väljer den med nivåväljaren (1–4) i övre högra hörnet. Kort som följer nivån har en guldton och etiketten *Nivå 1*, *Nivå 2* osv. När du håller muspekaren över nivåväljaren ramas de in. På nivå 1 visar korten en enkel förklaring, på nivå 2 den vanliga sammanfattningen, på nivå 3 även nyckelbegrepp och på nivå 4 vad forskningen diskuterar. På teori- och metodsidorna visas bara den nivå du valt.

| Nivå | Namn | Innehåll |
|---|---|---|
| 1 | Enkelt förklarat | Vardagliga exempel, inga facktermer |
| 2 | Grunderna | De centrala begreppen och hur de hänger ihop |
| 3 | Fördjupning | Varianter, antaganden och hur teorin används i studier |
| 4 | Forskarnivå | Kritik, debatter och vetenskapsteoretiska frågor |

## Om referenserna

Referenser med DOI-nummer länkar direkt till artikeln. Via lärosätets bibliotek har du oftast fri tillgång när du är inloggad. Böcker saknar DOI och länkar i stället till en sökning.

## Använda sajten i Canvas

- **Länk:** Lägg till sajten som en extern URL i en modul.
- **Inbäddning:** På varje teori- och metodsida finns rutan "Använd i Canvas" med färdig kod för att bädda in just den sidan i en Canvas-sida. Inbäddade sidor visas utan sajtens meny.

## Lägga till eller ändra innehåll

Allt innehåll ligger som textfiler i mappen `content`. För att lägga till en ny teori:

1. Kopiera en befintlig fil i `content/teorier`, till exempel `tam.md`, och döp om den.
2. Ändra uppgifterna överst i filen (mellan `---`-raderna) och texten under rubrikerna `## Nivå 1` till `## Nivå 4`.
3. Lägg till filnamnet i `content/index.json`. (Om sajten publiceras via GitHub sker detta automatiskt.)

Länka till en annan teori eller metod i texten genom att skriva dess id inom dubbla hakparenteser, till exempel `[[tam]]`.

**Studieguiden** (överst i metodguiden) styrs av filen `content/studieguide.json`. Varje fråga har alternativ som ger poäng till teorier och metoder (med deras id). Ett steg kan visas villkorat med `visaOm`, till exempel bara när studenten valt att skapa något. Förslagen i resultatet är de teorier och metoder som fått flest poäng.
