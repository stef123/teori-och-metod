---
id: enkat
namn: Enkätundersökning
kortnamn: Enkät
ansats: Kvantitativ
data: Standardiserade frågor till många respondenter
passar: Du vill mäta hur vanligt något är eller testa samband mellan variabler
sammanfattning: Systematisk insamling av standardiserade svar från ett större antal personer, ofta för att testa hypoteser härledda från teori.
nyckelord: [enkät, survey, Likert, mätskala, urval, hypotes, SEM, PLS, validitet]
omraden: [Teknikacceptans, E-handel och digitala tjänster, Utvärdering av IS, E-hälsa, Utbildning och lärplattformar, Digital förvaltning, Sociala medier och plattformar, Medier och vardagsliv, Digital ojämlikhet]
teorier: [tam, utaut, delone-mclean, diffusion, uses-and-gratifications, affordanser, praktikteori, medialisering, social-presence, parasocial-interaction, context-collapse]
relaterade: [intervju]
referenser:
  - forfattare: Pinsonneault, A. & Kraemer, K. L.
    ar: 1993
    titel: "Survey research methodology in management information systems: An assessment"
    kalla: Journal of Management Information Systems, 10(2), 75–105
    doi: 10.1080/07421222.1993.11518001
    roll: grund
    kommentar: Klassisk genomgång av vanliga svagheter i IS-enkätstudier.
  - forfattare: Straub, D. W.
    ar: 1989
    titel: Validating instruments in MIS research
    kalla: MIS Quarterly, 13(2), 147–169
    doi: 10.2307/248922
    roll: grund
    kommentar: Varför och hur mätinstrument måste valideras.
  - forfattare: MacKenzie, S. B., Podsakoff, P. M. & Podsakoff, N. P.
    ar: 2011
    titel: "Construct measurement and validation procedures in MIS and behavioral research: Integrating new and existing techniques"
    kalla: MIS Quarterly, 35(2), 293–334
    doi: 10.2307/23044045
    roll: oversikt
    kommentar: Steg för steg-procedur för att utveckla nya mätskalor.
  - forfattare: Podsakoff, P. M., MacKenzie, S. B., Lee, J.-Y. & Podsakoff, N. P.
    ar: 2003
    titel: "Common method biases in behavioral research: A critical review of the literature and recommended remedies"
    kalla: Journal of Applied Psychology, 88(5), 879–903
    doi: 10.1037/0021-9010.88.5.879
    roll: oversikt
    kommentar: Om felkällor när alla variabler mäts med samma enkät.
  - forfattare: Venkatesh, V., Morris, M. G., Davis, G. B. & Davis, F. D.
    ar: 2003
    titel: "User acceptance of information technology: Toward a unified view"
    kalla: MIS Quarterly, 27(3), 425–478
    doi: 10.2307/30036540
    roll: tillampning
    kommentar: Exempel på en longitudinell enkätstudie som testar en teori.
---

## Nivå 1

Om du vill veta vad hela skolan tycker om skolmaten kan du inte prata med alla. Då kan du dela ut **samma frågor till många** och räkna ihop svaren. Det är en enkät.

Det svåra är att ställa frågor som alla förstår på samma sätt, och att se till att de som svarar liknar hela skolan, inte bara de som gillar maten.

## Nivå 2

En enkätundersökning (*survey*) samlar in **standardiserade svar** från ett urval av en population. I informatik används enkäter ofta för att:

- **beskriva** (hur många använder ett system, hur nöjda är de?), eller
- **förklara** (testa hypoteser om samband, t.ex. från [[tam]] eller [[utaut]]).

Grundbegrepp:

- **Population och urval**: vem vill du uttala dig om, och vem frågar du faktiskt?
- **Begrepp (konstrukt) och indikatorer**: abstrakta begrepp som "upplevd nytta" mäts med flera påståenden.
- **Likertskala**: t.ex. 1 = instämmer inte alls, 7 = instämmer helt.
- **Svarsfrekvens och bortfall**: vilka svarade inte, och spelar det roll?

> **Tips:** Använd beprövade mätskalor från tidigare forskning när det finns, och redovisa var de kommer ifrån.

## Nivå 3

**Från teori till enkät:** Härled hypoteser från teorin → operationalisera varje begrepp med 3–5 påståenden (ofta anpassade från tidigare studier) → pilottesta → samla in → analysera.

**Validitet och reliabilitet i mätningen:**

| Kriterium | Fråga | Typisk kontroll |
|---|---|---|
| Reliabilitet | Mäter påståendena konsekvent? | Cronbachs alfa, composite reliability |
| Konvergent validitet | Hänger påståenden för samma begrepp ihop? | Faktorladdningar, AVE |
| Diskriminant validitet | Skiljer sig begreppen från varandra? | Fornell–Larcker, HTMT |

**Analys:** Beskrivande statistik, korrelationer och regressionsanalys räcker långt. Strukturekvationsmodellering (CB-SEM eller PLS-SEM) är vanligt när flera samband testas samtidigt.

## Nivå 4

- **Common method bias:** När både oberoende och beroende variabler mäts i samma enkät, vid samma tillfälle, kan samband blåsas upp. Podsakoff m.fl. (2003) beskriver både förebyggande åtgärder och statistiska kontroller.
- **Självrapportering:** Enkäter mäter vad människor *säger*. Avsikt är inte beteende, och självrapporterad användning skiljer sig ofta från loggdata.
- **Reflektiva och formativa mått:** Ska indikatorerna *spegla* begreppet eller *bilda* det? Fel val leder till fel slutsatser (MacKenzie m.fl., 2011).
- **Urval och generalisering:** Bekvämlighetsurval via sociala medier är vanligt i uppsatser men begränsar starkt vad man kan säga om populationen.
- **Översättning:** Översatta skalor behöver översättas tillbaka och pilottestas.

## Steg för steg

1. Formulera syfte och forskningsfrågor/hypoteser utifrån teori.
2. Definiera population och välj urvalsmetod.
3. Operationalisera begrepp; använd etablerade skalor där det går.
4. Bygg enkäten (t.ex. i ett verktyg som lärosätet godkänt) och pilottesta med 5–10 personer.
5. Samla in data, med information om samtycke och anonymitet.
6. Rensa data och kontrollera bortfall.
7. Testa mätmodellen (reliabilitet och validitet), sedan sambanden.
8. Tolka resultaten mot teorin, och diskutera begränsningar.

## Vanliga fallgropar

- Egna, otestade frågor i stället för validerade skalor.
- Ledande eller dubbla frågor ("Är systemet snabbt och enkelt?").
- För litet urval för den analys som görs.
- Slutsatser om orsak och verkan från tvärsnittsdata.

## Kvalitetskriterier

Reliabilitet, begreppsvaliditet (konvergent och diskriminant), intern validitet, extern validitet (generaliserbarhet) och statistisk slutsatsvaliditet.
