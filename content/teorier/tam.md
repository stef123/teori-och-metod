---
id: tam
namn: Technology Acceptance Model
kortnamn: TAM
upphov: Davis (1989)
ar: 1989
paradigm: [Positivistisk]
analysniva: Individ
disciplin: Socialpsykologi, IS
sammanfattning: Förklarar varför människor väljer att använda en ny teknik, utifrån hur användbar och hur lätt att använda de upplever att den är.
nyckelord: [acceptans, användning, avsikt, nytta, enkelhet, adoption]
omraden: [Teknikacceptans, E-hälsa, Utbildning och lärplattformar, E-handel och digitala tjänster, AI och automatisering]
metoder: [enkat]
relaterade: [utaut, diffusion]
referenser:
  - forfattare: Davis, F. D.
    ar: 1989
    titel: Perceived usefulness, perceived ease of use, and user acceptance of information technology
    kalla: MIS Quarterly, 13(3), 319–340
    doi: 10.2307/249008
    roll: grund
    kommentar: Originalartikeln. Här utvecklas och valideras mätskalorna för upplevd nytta och upplevd användarvänlighet.
  - forfattare: Davis, F. D., Bagozzi, R. P. & Warshaw, P. R.
    ar: 1989
    titel: "User acceptance of computer technology: A comparison of two theoretical models"
    kalla: Management Science, 35(8), 982–1003
    doi: 10.1287/mnsc.35.8.982
    roll: grund
    kommentar: Jämför TAM med Theory of Reasoned Action (TRA).
  - forfattare: Gefen, D., Karahanna, E. & Straub, D. W.
    ar: 2003
    titel: "Trust and TAM in online shopping: An integrated model"
    kalla: MIS Quarterly, 27(1), 51–90
    doi: 10.2307/30036519
    roll: tillampning
    kommentar: Klassiskt exempel på hur TAM byggs ut med nya begrepp (här tillit) för ett nytt sammanhang (e-handel).
  - forfattare: King, W. R. & He, J.
    ar: 2006
    titel: A meta-analysis of the technology acceptance model
    kalla: Information & Management, 43(6), 740–755
    doi: 10.1016/j.im.2006.05.003
    roll: tillampning
    kommentar: Sammanställer resultat från 88 TAM-studier. Bra för att se hur starka sambanden brukar vara.
  - forfattare: Venkatesh, V. & Davis, F. D.
    ar: 2000
    titel: "A theoretical extension of the technology acceptance model: Four longitudinal field studies"
    kalla: Management Science, 46(2), 186–204
    doi: 10.1287/mnsc.46.2.186.11926
    roll: oversikt
    kommentar: TAM2, som lägger till vad som påverkar upplevd nytta.
  - forfattare: Benbasat, I. & Barki, H.
    ar: 2007
    titel: Quo vadis, TAM?
    kalla: Journal of the Association for Information Systems, 8(4), 211–218
    doi: 10.17705/1jais.00126
    roll: oversikt
    kommentar: Välkänd kritik av hur TAM-forskningen har utvecklats.
---

## Nivå 1

Tänk dig att din skola får en ny app för läxor. Kommer du att använda den? Det beror nog på två saker:

1. **Hjälper den mig?** Gör appen att jag blir klar snabbare eller får bättre betyg?
2. **Är den lätt?** Fattar jag hur den fungerar, eller blir jag bara irriterad?

Om svaret är ja på båda frågorna vill du antagligen använda appen. TAM är en teori som säger just det: människor börjar använda ny teknik när de tycker att den är **nyttig** och **lätt att använda**.

## Nivå 2

TAM (Technology Acceptance Model) togs fram av Fred Davis 1989 för att förklara och förutsäga om människor kommer att acceptera ett nytt informationssystem. Modellen har två centrala begrepp:

- **Upplevd nytta** (*perceived usefulness*): hur mycket en person tror att systemet förbättrar hens arbete.
- **Upplevd användarvänlighet** (*perceived ease of use*): hur fri från ansträngning en person tror att användningen är.

Dessa påverkar personens **avsikt att använda** systemet (*behavioral intention*), som i sin tur leder till **faktisk användning**. Användarvänlighet påverkar också upplevd nytta: ett system som är lätt att använda upplevs ofta som mer nyttigt.

| Begrepp | Exempel på påstående i en enkät |
|---|---|
| Upplevd nytta | "Att använda systemet gör mig mer effektiv i mitt arbete." |
| Upplevd användarvänlighet | "Det är lätt för mig att lära mig använda systemet." |
| Avsikt att använda | "Jag tänker använda systemet under den kommande månaden." |

> **Viktigt:** Det är *upplevelsen* som mäts, inte hur bra systemet "egentligen" är.

## Nivå 3

TAM bygger på **Theory of Reasoned Action** (TRA) från socialpsykologin: människors beteende styrs av deras avsikter, och avsikterna styrs av deras attityder. Davis anpassade detta till IT och valde ut två övertygelser som särskilt viktiga.

**Hur TAM används i studier:** Oftast formulerar forskaren hypoteser (t.ex. "H1: Upplevd nytta påverkar avsikt att använda positivt"), samlar in data med en enkät med flera påståenden per begrepp (Likertskalor), och testar sambanden statistiskt, ofta med strukturekvationsmodellering (SEM eller PLS).

**Utbyggnader:** Eftersom grundmodellen är enkel lägger många studier till begrepp som passar sammanhanget, till exempel tillit, risk, nöje eller självförmåga. Två viktiga vidareutvecklingar är:

- **TAM2** (Venkatesh & Davis, 2000) förklarar vad som skapar upplevd nytta, till exempel *subjektiv norm* (vad andra tycker), *arbetsrelevans* och *resultatets synlighet*.
- **TAM3** (Venkatesh & Bala, 2008) lägger till faktorer som påverkar upplevd användarvänlighet.

TAM ledde sedan fram till den mer omfattande modellen [[utaut]].

## Nivå 4

TAM är en av de mest citerade teorierna i IS-fältet, men också en av de mest kritiserade.

- **Teoretisk mättnad:** Benbasat och Barki (2007) menar att den stora mängden små utbyggnader har gett en splittrad kunskapsmassa och att forskningen har fastnat i att testa samma samband i nya sammanhang, i stället för att fråga vad som *gör* ett system nyttigt eller lätt att använda.
- **Förklaringsvärde:** Modellen förklarar ofta en rimlig del av variationen i *avsikt*, men sambandet mellan avsikt och faktisk användning är svagare, och många studier mäter bara självrapporterad användning.
- **Individfokus:** TAM antar en rationell individ som fritt väljer. I organisationer är användning ofta obligatorisk, och då säger "acceptans" mindre. Sociala, politiska och materiella aspekter hamnar utanför.
- **Vetenskapssyn:** TAM är tydligt positivistisk: begrepp operationaliseras som variabler, och samband testas statistiskt. Forskare med en tolkande syn (se [[strukturation]] eller [[sociomaterialitet]]) studerar i stället hur teknik får mening i praktiken över tid.

**Fråga att fundera på:** När är TAM ett bra val för din uppsats, och när döljer det mer än det visar?

## Typiska forskningsfrågor

- Vilka faktorer påverkar sjuksköterskors avsikt att använda ett nytt journalsystem?
- Varför använder vissa studenter lärplattformens diskussionsforum och andra inte?
- Hur påverkar tillit till AI upplevd nytta av en AI-baserad skrivassistent?

## Användningsområden

TAM passar när du vill **förklara eller förutsäga individers val att använda** en specifik teknik, särskilt när användningen är frivillig. Den är vanlig inom e-handel, e-hälsa, utbildningsteknik, mobila tjänster och på senare tid AI-verktyg. Den passar sämre när du vill förstå hur teknik förändrar arbete eller organisationer över tid.
