/* Teori & metod i informatik – statisk sajt utan byggsteg.
 * Allt innehåll ligger i /content som Markdown-filer med ett enkelt
 * "frontmatter"-huvud. Den här filen läser in, tolkar och visar innehållet.
 */
(() => {
  'use strict';

  const NIVAER = [
    { n: 1, namn: 'Enkelt förklarat', kort: 'ELI5', hjalp: 'Som om du vore tio år. Inga facktermer.' },
    { n: 2, namn: 'Grunderna', kort: 'Grund', hjalp: 'De viktigaste begreppen och hur de hänger ihop.' },
    { n: 3, namn: 'Fördjupning', kort: 'Fördjupning', hjalp: 'Antaganden, varianter och hur teorin används i studier.' },
    { n: 4, namn: 'Forskarnivå', kort: 'Forskare', hjalp: 'Kritik, debatter och vetenskapsteoretiska frågor.' },
  ];
  const REF_ROLLER = {
    grund: 'Grundtexter',
    tillampning: 'Artiklar som använt teorin/metoden',
    oversikt: 'Översikter, utvecklingar och kritik',
  };

  const app = document.getElementById('app');
  const state = { manifest: null, items: {}, sidor: {}, valjare: null, niva: lasNiva() };

  // ---------- Hjälpfunktioner ----------
  function lasNiva() {
    try { const v = parseInt(localStorage.getItem('niva'), 10); return v >= 1 && v <= 4 ? v : 1; } catch (e) { return 1; }
  }
  function sparaNiva(n) { try { localStorage.setItem('niva', String(n)); } catch (e) { /* privat läge */ } }
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const lista = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  // ---------- Frontmatter (en liten delmängd av YAML) ----------
  function tolkaVarde(v) {
    v = v.trim();
    if (v.startsWith('[') && v.endsWith(']')) return v.slice(1, -1).split(',').map((x) => tolkaVarde(x)).filter((x) => x !== '');
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
    return v;
  }
  function tolkaFrontmatter(txt) {
    const ut = {};
    const rader = txt.split(/\r?\n/);
    let nyckel = null, post = null;
    for (const rad of rader) {
      if (!rad.trim() || rad.trim().startsWith('#')) continue;
      const topp = rad.match(/^([\wåäöÅÄÖ-]+):\s*(.*)$/);
      if (topp) {
        nyckel = topp[1]; post = null;
        ut[nyckel] = topp[2].trim() === '' ? [] : tolkaVarde(topp[2]);
        continue;
      }
      const item = rad.match(/^\s*-\s+(.*)$/);
      if (item && nyckel) {
        const kv = item[1].match(/^([\wåäö]+):\s+(.*)$/);
        if (kv) { post = { [kv[1]]: tolkaVarde(kv[2]) }; ut[nyckel].push(post); }
        else { post = null; ut[nyckel].push(tolkaVarde(item[1])); }
        continue;
      }
      const forts = rad.match(/^\s+([\wåäö]+):\s+(.*)$/);
      if (forts && post) post[forts[1]] = tolkaVarde(forts[2]);
    }
    return ut;
  }

  // ---------- Markdown (det som behövs, inget mer) ----------
  function inline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, txt) => {
      const it = state.items[id];
      if (!it) return esc(txt || id);
      return `<a class="xref" href="#/${it.typ}/${id}">${esc(txt || it.kortnamn || it.namn)}</a>`;
    });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
      const extern = /^https?:/.test(u);
      return `<a href="${u}"${extern ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    return s;
  }
  function markdown(md) {
    const rader = md.replace(/\r/g, '').split('\n');
    const html = [];
    let i = 0;
    while (i < rader.length) {
      const r = rader[i];
      if (!r.trim()) { i++; continue; }
      let m;
      if ((m = r.match(/^(#{2,4})\s+(.*)$/))) { const n = m[1].length + 1; html.push(`<h${n}>${inline(m[2])}</h${n}>`); i++; continue; }
      if (r.startsWith('>')) {
        const buf = [];
        while (i < rader.length && rader[i].startsWith('>')) buf.push(rader[i++].replace(/^>\s?/, ''));
        html.push(`<aside class="callout">${markdown(buf.join('\n'))}</aside>`); continue;
      }
      if (/^\s*[-*]\s+/.test(r)) {
        const buf = [];
        while (i < rader.length && /^\s*[-*]\s+/.test(rader[i])) buf.push(`<li>${inline(rader[i++].replace(/^\s*[-*]\s+/, ''))}</li>`);
        html.push(`<ul>${buf.join('')}</ul>`); continue;
      }
      if (/^\s*\d+\.\s+/.test(r)) {
        const buf = [];
        while (i < rader.length && /^\s*\d+\.\s+/.test(rader[i])) buf.push(`<li>${inline(rader[i++].replace(/^\s*\d+\.\s+/, ''))}</li>`);
        html.push(`<ol>${buf.join('')}</ol>`); continue;
      }
      if (r.trim().startsWith('|')) {
        const buf = [];
        while (i < rader.length && rader[i].trim().startsWith('|')) buf.push(rader[i++]);
        const celler = (x) => x.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const kropp = buf.filter((x) => !/^\s*\|?\s*:?-{2,}/.test(x));
        const [huvud, ...rest] = kropp;
        html.push(`<div class="tabell"><table><thead><tr>${celler(huvud).map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rest
          .map((x) => `<tr>${celler(x).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      const buf = [];
      while (i < rader.length && rader[i].trim() && !/^(#{2,4}\s|>|\s*[-*]\s+|\s*\d+\.\s+|\s*\|)/.test(rader[i])) buf.push(rader[i++]);
      html.push(`<p>${inline(buf.join(' '))}</p>`);
    }
    return html.join('\n');
  }

  // ---------- Innehållsfiler ----------
  function tolkaFil(text, typ, fil) {
    const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!m) throw new Error(`Saknar frontmatter (---) i ${fil}`);
    const meta = tolkaFrontmatter(m[1]);
    const nivaer = {}; const sektioner = [];
    let aktuell = null;
    for (const rad of m[2].split('\n')) {
      const h = rad.match(/^##\s+(.*)$/);
      if (h) {
        const niva = h[1].match(/^Nivå\s+([1-4])/i);
        aktuell = niva ? (nivaer[niva[1]] = { titel: h[1], text: [] }) : { titel: h[1].trim(), text: [] };
        if (!niva) sektioner.push(aktuell);
        continue;
      }
      if (aktuell) aktuell.text.push(rad);
    }
    return { ...meta, typ, fil, nivaer, sektioner };
  }
  async function hamta(url) {
    const r = await fetch(url, { cache: 'no-cache' });
    if (!r.ok) throw new Error(`Kunde inte läsa ${url} (${r.status})`);
    return r;
  }
  async function laddaAllt() {
    state.manifest = await (await hamta('content/index.json')).json();
    const jobb = [];
    for (const [typ, mapp] of [['teori', 'teorier'], ['metod', 'metoder'], ['sida', 'sidor']]) {
      for (const fil of state.manifest[mapp] || []) {
        jobb.push(hamta(`content/${mapp}/${fil}`).then((r) => r.text()).then((t) => {
          const it = tolkaFil(t, typ, fil);
          (typ === 'sida' ? state.sidor : state.items)[it.id] = it;
        }));
      }
    }
    jobb.push(hamta('content/metodvaljare.json').then((r) => r.json()).then((j) => (state.valjare = j)).catch(() => null));
    await Promise.all(jobb);
  }
  const allaAv = (typ) => Object.values(state.items).filter((x) => x.typ === typ).sort((a, b) => (a.kortnamn || a.namn).localeCompare(b.kortnamn || b.namn, 'sv'));
  function omraden() {
    const set = new Map();
    for (const it of Object.values(state.items)) for (const o of lista(it.omraden)) {
      if (!set.has(o)) set.set(o, { namn: o, teori: [], metod: [] });
      set.get(o)[it.typ].push(it);
    }
    return [...set.values()].sort((a, b) => a.namn.localeCompare(b.namn, 'sv'));
  }

  // ---------- Komponenter ----------
  function nivaReglage() {
    const nv = NIVAER[state.niva - 1];
    return `<div class="niva" role="group" aria-label="Förklaringsnivå">
      <div class="niva-topp"><span class="niva-etikett">Förklaringsnivå</span><span class="niva-hjalp" id="niva-hjalp">${esc(nv.hjalp)}</span></div>
      <input type="range" min="1" max="4" step="1" value="${state.niva}" id="niva-range" aria-valuetext="Nivå ${state.niva}: ${esc(nv.namn)}">
      <div class="niva-steg">${NIVAER.map((x) => `<button type="button" data-niva="${x.n}" class="${x.n <= state.niva ? 'aktiv' : ''}${x.n === state.niva ? ' vald' : ''}"><b>${x.n}</b><span>${esc(x.namn)}</span></button>`).join('')}</div>
    </div>`;
  }
  function nivaInnehall(it) {
    const delar = [];
    for (const x of NIVAER) {
      if (x.n > state.niva) break;
      const blk = it.nivaer[x.n];
      if (!blk) continue;
      delar.push(`<section class="nivablock n${x.n}${x.n === state.niva ? ' ny' : ''}" id="niva-${x.n}">
        <div class="nivabadge">Nivå ${x.n} · ${esc(x.namn)}</div>${markdown(blk.text.join('\n'))}</section>`);
    }
    const nasta = NIVAER.find((x) => x.n > state.niva && it.nivaer[x.n]);
    if (nasta) delar.push(`<button type="button" class="hoj" data-niva="${nasta.n}">Gå djupare: nivå ${nasta.n} · ${esc(nasta.namn)} <span aria-hidden="true">↓</span></button>`);
    else delar.push(`<p class="klar">Du har nått högsta nivån. <button type="button" class="lank" data-niva="1">Börja om från nivå 1</button></p>`);
    return delar.join('');
  }
  function kopplaNiva(rot, it) {
    const satt = (n, rulla) => {
      state.niva = n; sparaNiva(n);
      rot.querySelector('.niva-wrap').innerHTML = nivaReglage();
      rot.querySelector('.nivainnehall').innerHTML = nivaInnehall(it);
      kopplaNiva(rot, it);
      if (rulla) { const el = rot.querySelector(`#niva-${n}`); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    };
    rot.querySelectorAll('[data-niva]').forEach((b) => b.addEventListener('click', () => satt(+b.dataset.niva, b.classList.contains('hoj'))));
    const rng = rot.querySelector('#niva-range');
    if (rng) rng.addEventListener('input', () => satt(+rng.value, false));
  }
  const chip = (t, href, kl = '') => href ? `<a class="chip ${kl}" href="${href}">${esc(t)}</a>` : `<span class="chip ${kl}">${esc(t)}</span>`;
  function referens(r) {
    const doi = r.doi ? `<a class="doi" href="https://doi.org/${esc(r.doi)}" target="_blank" rel="noopener">doi:${esc(r.doi)}</a>` : '';
    const sok = !r.doi ? `<a class="doi" href="https://scholar.google.com/scholar?q=${encodeURIComponent(r.titel || '')}" target="_blank" rel="noopener">Sök i Google Scholar</a>` : '';
    return `<li class="ref"><span class="ref-text">${esc(r.forfattare)} (${esc(r.ar)}). ${r.typ === 'bok' ? `<em>${esc(r.titel)}</em>` : esc(r.titel)}. ${r.typ === 'bok' ? esc(r.kalla) : `<em>${esc(r.kalla)}</em>`}.</span> ${doi}${sok}${r.kommentar ? `<span class="ref-kommentar">${inline(r.kommentar)}</span>` : ''}</li>`;
  }
  function referenser(it) {
    const refs = lista(it.referenser);
    if (!refs.length) return '';
    return `<section class="refs"><h2>Läs vidare</h2>${Object.entries(REF_ROLLER).map(([roll, titel]) => {
      const g = refs.filter((r) => (r.roll || 'grund') === roll);
      return g.length ? `<h3>${titel}</h3><ul class="reflista">${g.map(referens).join('')}</ul>` : '';
    }).join('')}</section>`;
  }
  function kort(it) {
    return `<a class="kort" href="#/${it.typ}/${it.id}">
      <div class="kort-topp"><span class="kort-kort">${esc(it.kortnamn || it.namn)}</span>${it.ar ? `<span class="kort-ar">${esc(it.ar)}</span>` : ''}</div>
      ${it.namn !== it.kortnamn ? `<div class="kort-namn">${esc(it.namn)}</div>` : ''}
      <p>${esc(it.sammanfattning || '')}</p>
      <div class="chips">${lista(it.paradigm).map((p) => chip(p, null, 'p')).join('')}${it.ansats ? chip(it.ansats, null, 'p') : ''}${it.analysniva ? chip(it.analysniva, null) : ''}</div>
    </a>`;
  }
  function embedKnapp(sokvag) {
    return `<details class="embed"><summary>Använd i Canvas</summary>
      <p>Länka direkt till sidan, eller klistra in koden i Canvas HTML-redigerare för att bädda in den (utan sajtens meny).</p>
      <label>Länk<input readonly value="${esc(basUrl() + sokvag)}"></label>
      <label>Inbäddning (iframe)<textarea readonly rows="3">${esc(`<iframe src="${basUrl()}?embed=1${sokvag}" width="100%" height="900" style="border:0" title="Teori och metod i informatik"></iframe>`)}</textarea></label>
    </details>`;
  }
  const basUrl = () => location.href.split('#')[0].split('?')[0];

  // ---------- Sidor ----------
  function sidHem() {
    const t = allaAv('teori'), m = allaAv('metod');
    return `<section class="hero">
      <p class="overrubrik">Studiestöd i informatik</p>
      <h1>Förstå teorierna. Välj rätt metod.</h1>
      <p class="ingress">Här kan du utforska vanliga teorier och forskningsmetoder inom informatik och informationssystem. Varje förklaring börjar på enklaste nivå, och du bestämmer själv när det är dags att gå djupare.</p>
      <div class="hero-knappar"><a class="knapp" href="#/sida/vad-ar-informatik">Börja här: vad är informatik?</a><a class="knapp sek" href="#/sida/vad-ar-en-teori">Vad är en teori?</a><a class="knapp sek" href="#/sida/metodguide">Så gör du en bra undersökning</a></div>
    </section>
    <section class="stig">
      <ol>
        <li><a href="#/sida/vad-ar-informatik"><b>1. Vad är informatik?</b><span>Ämnet, informationssystem och hur det skiljer sig från datavetenskap.</span></a></li>
        <li><a href="#/sida/vad-ar-en-teori"><b>2. Förstå vad en teori är</b><span>Begrepp, samband och varför teorier behövs.</span></a></li>
        <li><a href="#/teorier"><b>3. Utforska teorier</b><span>${t.length} teorier, från enkel till forskarnivå.</span></a></li>
        <li><a href="#/omraden"><b>4. Hitta ditt område</b><span>Vilka teorier och metoder passar ditt ämne?</span></a></li>
        <li><a href="#/metoder"><b>5. Välj metod</b><span>${m.length} metoder med steg, fallgropar och kvalitetskriterier.</span></a></li>
      </ol>
    </section>
    <h2 class="sekt">Teorier</h2><div class="rutnat">${t.map(kort).join('')}</div>
    <h2 class="sekt">Metoder</h2><div class="rutnat">${m.map(kort).join('')}</div>`;
  }
  function sidLista(typ, q) {
    const alla = allaAv(typ);
    const omr = [...new Set(alla.flatMap((x) => lista(x.omraden)))].sort((a, b) => a.localeCompare(b, 'sv'));
    const titel = typ === 'teori' ? 'Teorier' : 'Metoder';
    const ingress = typ === 'teori'
      ? 'Teorier är verktyg för att förstå, förklara eller förutsäga något. Välj en teori för att läsa om den, från enkel förklaring till forskarnivå.'
      : 'Metoden är hur du tar reda på något. Varje metod beskrivs med syfte, steg för steg, vanliga fallgropar och hur kvaliteten bedöms.';
    return `<h1>${titel}</h1><p class="ingress">${ingress}</p>
      <div class="filter">
        <label class="sok"><span>Sök</span><input type="search" id="f-sok" placeholder="t.ex. acceptans, praktik, aktör" value="${esc(q.get('q') || '')}"></label>
        <label><span>Användningsområde</span><select id="f-omr"><option value="">Alla områden</option>${omr.map((o) => `<option ${q.get('omrade') === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>
      </div>
      <div class="rutnat" id="lista"></div><p id="tom" class="tom" hidden>Inga träffar. Prova ett annat ord eller område.</p>`;
  }
  function kopplaLista(typ) {
    const alla = allaAv(typ);
    const sok = document.getElementById('f-sok'), omr = document.getElementById('f-omr');
    const rita = () => {
      const s = sok.value.trim().toLowerCase(), o = omr.value;
      const tr = alla.filter((x) => (!o || lista(x.omraden).includes(o)) && (!s || [x.namn, x.kortnamn, x.sammanfattning, ...lista(x.nyckelord), ...lista(x.omraden)].join(' ').toLowerCase().includes(s)));
      document.getElementById('lista').innerHTML = tr.map(kort).join('');
      document.getElementById('tom').hidden = tr.length > 0;
    };
    sok.addEventListener('input', rita); omr.addEventListener('change', rita); rita();
  }
  function sidDetalj(it) {
    const rel = (ids) => lista(ids).map((id) => state.items[id]).filter(Boolean);
    const fakta = it.typ === 'teori'
      ? [['Upphov', it.upphov], ['Vetenskapssyn', lista(it.paradigm).join(', ')], ['Analysnivå', it.analysniva], ['Ursprungsdisciplin', it.disciplin]]
      : [['Ansats', it.ansats], ['Typisk data', it.data], ['Passar när', it.passar]];
    const sido = `<aside class="sidopanel">
      <dl>${fakta.filter((f) => f[1]).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      ${lista(it.omraden).length ? `<h3>Användningsområden</h3><div class="chips">${lista(it.omraden).map((o) => chip(o, `#/${it.typ === 'teori' ? 'teorier' : 'metoder'}?omrade=${encodeURIComponent(o)}`)).join('')}</div>` : ''}
      ${rel(it.metoder).length ? `<h3>Vanliga metoder</h3><div class="chips">${rel(it.metoder).map((x) => chip(x.kortnamn || x.namn, `#/metod/${x.id}`, 'm')).join('')}</div>` : ''}
      ${rel(it.teorier).length ? `<h3>Teorier som ofta används</h3><div class="chips">${rel(it.teorier).map((x) => chip(x.kortnamn || x.namn, `#/teori/${x.id}`, 't')).join('')}</div>` : ''}
      ${rel(it.relaterade).length ? `<h3>Närliggande</h3><div class="chips">${rel(it.relaterade).map((x) => chip(x.kortnamn || x.namn, `#/${x.typ}/${x.id}`)).join('')}</div>` : ''}
      ${embedKnapp(`#/${it.typ}/${it.id}`)}
    </aside>`;
    return `<nav class="brod"><a href="#/">Start</a> / <a href="#/${it.typ === 'teori' ? 'teorier' : 'metoder'}">${it.typ === 'teori' ? 'Teorier' : 'Metoder'}</a> / ${esc(it.kortnamn || it.namn)}</nav>
      <header class="dethuvud"><p class="overrubrik">${it.typ === 'teori' ? 'Teori' : 'Metod'}${it.upphov ? ' · ' + esc(it.upphov) : ''}</p><h1>${esc(it.namn)}</h1><p class="ingress">${esc(it.sammanfattning || '')}</p></header>
      <div class="detalj">
        <div class="huvudkol">
          <div class="niva-wrap">${nivaReglage()}</div>
          <div class="nivainnehall">${nivaInnehall(it)}</div>
          ${it.sektioner.map((s) => `<section class="sektion"><h2>${esc(s.titel)}</h2>${markdown(s.text.join('\n'))}</section>`).join('')}
          ${referenser(it)}
        </div>${sido}
      </div>`;
  }
  function sidSida(sd) {
    const harNivaer = Object.keys(sd.nivaer).length > 0;
    return `<nav class="brod"><a href="#/">Start</a> / ${esc(sd.namn)}</nav>
      <header class="dethuvud"><h1>${esc(sd.namn)}</h1>${sd.sammanfattning ? `<p class="ingress">${esc(sd.sammanfattning)}</p>` : ''}</header>
      <div class="smal">
      ${harNivaer ? `<div class="niva-wrap">${nivaReglage()}</div><div class="nivainnehall">${nivaInnehall(sd)}</div>` : ''}
      ${sd.sektioner.map((s) => `<section class="sektion"><h2>${esc(s.titel)}</h2>${markdown(s.text.join('\n'))}</section>`).join('')}
      ${sd.id === 'metodguide' ? metodValjare() : ''}
      ${referenser(sd)}
      ${embedKnapp(`#/sida/${sd.id}`)}
      </div>`;
  }
  function metodValjare() {
    const v = state.valjare;
    if (!v) return '';
    return `<section class="valjare" id="valjare"><h2>${esc(v.rubrik)}</h2><p>${esc(v.fraga)}</p>
      <div class="val">${v.alternativ.map((a, i) => `<button type="button" data-val="${i}">${esc(a.text)}</button>`).join('')}</div>
      <div class="valsvar" aria-live="polite"></div></section>`;
  }
  function kopplaValjare() {
    const rot = document.getElementById('valjare');
    if (!rot) return;
    rot.querySelectorAll('[data-val]').forEach((b) => b.addEventListener('click', () => {
      rot.querySelectorAll('[data-val]').forEach((x) => x.classList.toggle('vald', x === b));
      const a = state.valjare.alternativ[+b.dataset.val];
      rot.querySelector('.valsvar').innerHTML = `<p>${inline(a.svar)}</p><div class="chips">${lista(a.metoder).map((id) => state.items[id]).filter(Boolean).map((x) => chip(x.namn, `#/metod/${x.id}`, 'm')).join('')}</div>`;
    }));
  }
  function sidOmraden() {
    const omr = omraden();
    const t = allaAv('teori'), m = allaAv('metod');
    const cell = (it, o) => lista(it.omraden).includes(o.namn) ? `<td class="prick" title="${esc(it.kortnamn)} · ${esc(o.namn)}"><span>●</span></td>` : '<td></td>';
    return `<h1>Användningsområden</h1>
      <p class="ingress">Vilka teorier och metoder används inom vilka områden? Översikten visar typiska kombinationer i forskningen. Den är en startpunkt, inte en regel: många teorier används långt utanför sina "hemområden".</p>
      <div class="rutnat omr">${omr.map((o) => `<article class="kort statisk" id="omr-${slug(o.namn)}"><div class="kort-namn">${esc(o.namn)}</div>
        ${o.teori.length ? `<div class="omr-rad"><span>Teorier</span><div class="chips">${o.teori.map((x) => chip(x.kortnamn, `#/teori/${x.id}`, 't')).join('')}</div></div>` : ''}
        ${o.metod.length ? `<div class="omr-rad"><span>Metoder</span><div class="chips">${o.metod.map((x) => chip(x.kortnamn, `#/metod/${x.id}`, 'm')).join('')}</div></div>` : ''}</article>`).join('')}</div>
      <h2 class="sekt">Matris: teorier × områden</h2>
      <div class="tabell matris"><table><thead><tr><th>Område</th>${t.map((x) => `<th><a href="#/teori/${x.id}">${esc(x.kortnamn)}</a></th>`).join('')}</tr></thead>
      <tbody>${omr.filter((o) => o.teori.length).map((o) => `<tr><th scope="row">${esc(o.namn)}</th>${t.map((x) => cell(x, o)).join('')}</tr>`).join('')}</tbody></table></div>
      <h2 class="sekt">Matris: metoder × teorier</h2>
      <p>Vilka metoder brukar användas tillsammans med vilka teorier?</p>
      <div class="tabell matris"><table><thead><tr><th>Teori</th>${m.map((x) => `<th><a href="#/metod/${x.id}">${esc(x.kortnamn)}</a></th>`).join('')}</tr></thead>
      <tbody>${t.map((x) => `<tr><th scope="row"><a href="#/teori/${x.id}">${esc(x.kortnamn)}</a></th>${m.map((y) => lista(x.metoder).includes(y.id) || lista(y.teorier).includes(x.id) ? '<td class="prick"><span>●</span></td>' : '<td></td>').join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  const sid404 = () => `<h1>Sidan finns inte</h1><p>Den här sidan kunde inte hittas. <a href="#/">Till startsidan</a></p>`;

  // ---------- Router ----------
  function route() {
    const [vag, qs] = (location.hash.slice(1) || '/').split('?');
    const q = new URLSearchParams(qs || '');
    const d = vag.split('/').filter(Boolean);
    let html, efter = null, titel = '';
    if (!d.length) html = sidHem();
    else if (d[0] === 'teorier' || d[0] === 'metoder') { const typ = d[0] === 'teorier' ? 'teori' : 'metod'; html = sidLista(typ, q); efter = () => kopplaLista(typ); titel = d[0] === 'teorier' ? 'Teorier' : 'Metoder'; }
    else if ((d[0] === 'teori' || d[0] === 'metod') && state.items[d[1]]?.typ === d[0]) { const it = state.items[d[1]]; html = sidDetalj(it); efter = () => kopplaNiva(app, it); titel = it.kortnamn || it.namn; }
    else if (d[0] === 'sida' && state.sidor[d[1]]) { const sd = state.sidor[d[1]]; html = sidSida(sd); efter = () => { if (Object.keys(sd.nivaer).length) kopplaNiva(app, sd); kopplaValjare(); }; titel = sd.namn; }
    else if (d[0] === 'omraden') { html = sidOmraden(); titel = 'Användningsområden'; }
    else html = sid404();
    app.innerHTML = html;
    if (efter) efter();
    document.title = (titel ? titel + ' · ' : '') + 'Teori & metod i informatik';
    const sekt = { teori: 'teori', teorier: 'teori', metod: 'metod', metoder: 'metod', omraden: 'omraden' }[d[0]] || (d[0] === 'sida' ? d[1] : '');
    document.querySelectorAll('.huvudnav a').forEach((a) => a.classList.toggle('aktiv', a.dataset.sektion === sekt));
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  // ---------- Start ----------
  if (new URLSearchParams(location.search).has('embed')) document.documentElement.classList.add('embed');
  laddaAllt().then(() => { window.addEventListener('hashchange', route); route(); }).catch((e) => {
    app.innerHTML = `<h1>Innehållet kunde inte laddas</h1><p>${esc(e.message)}</p><p>Om du öppnat filen direkt från datorn (file://) behöver sajten i stället köras via en webbserver, till exempel GitHub Pages eller <code>python3 -m http.server</code>.</p>`;
  });
})();
