/* Luis P. Salas — Projects
   Content lives in PROJECTS; the page renders from it.
   Only projects ticked in the workbook's Include tab appear here. */

const STATUS = {
  live:      { cls: "live",      en: "Live",               es: "En línea" },
  soon:      { cls: "soon",      en: "Making public soon", es: "Por publicar" },
  private:   { cls: "private",   en: "Private",            es: "Privado" },
  described: { cls: "described", en: "Described",          es: "Descrito" }
};

/* Each project carries a `kind`, which picks the motif drawn in its thumbnail.
   To use a real screenshot instead, add `thumb: "assets/thumbs/<file>"` to that
   project — the card renders an <img> and ignores the motif. Nothing else changes. */
const PROJECTS = {
  governance: [
    {
      title: "Applied AI Concepts", kind: "doc",
      en: "A living wiki of core AI concepts: sourced, plainly explained, each entry ending with governance notes.",
      es: "Wiki de conceptos clave de IA: con fuentes, explicados con claridad y notas de gobernanza en cada entrada.",
      tags: ["Wiki", "Editorial"], status: "live",
      href: "https://luispsalas.github.io/applied-ai-concepts/"
    },
    {
      title: "Autonomous AI Casebook", kind: "timeline",
      en: "Reconstructions of incidents where an AI system's autonomy was central to real harm, built from primary sources.",
      es: "Reconstrucciones de incidentes donde la autonomía de un sistema de IA fue central al daño, basadas en fuentes primarias.",
      tags: ["Casebook", "Primary sources"], status: "live",
      href: "https://github.com/luispsalas/autonomous-ai-casebook"
    },
    {
      title: "Governed Data Platform", kind: "lineage",
      en: "A Databricks Unity Catalog lakehouse where the platform decides who sees what. Tag-driven column masks and row filters are applied to one copy of synthetic customer data, and each control was checked by signing in as every role.",
      es: "Un lakehouse en Databricks Unity Catalog donde la plataforma decide quién ve qué. Máscaras de columna y filtros de fila basados en etiquetas se aplican sobre una sola copia de datos sintéticos de clientes, y cada control se verificó iniciando sesión con cada rol.",
      tags: ["Databricks", "Unity Catalog", "Access control"], status: "live",
      href: "https://github.com/luispsalas/governed-data-platform"
    },
    {
      title: "Local Governance Knowledge Base", kind: "code",
      en: "A local, deterministic pipeline that builds and maintains a governance knowledge base. Shared as a write-up.",
      es: "Pipeline local y determinista que construye y mantiene una base de conocimiento de gobernanza. Compartido como reseña.",
      tags: ["Agents", "Pipeline"], status: "private",
      href: "local-kb/"
    },
    {
      title: "Governed Runtime Detection", kind: "detect",
      en: "Deciding what a runtime security tool should alert on, and proving it does: business questions, rules and a hands-on Falco lab on Kubernetes. Shared as a write-up.",
      es: "Decidir sobre qué debe alertar una herramienta de seguridad en tiempo de ejecución, y demostrar que lo hace: preguntas de negocio, reglas y un laboratorio práctico con Falco sobre Kubernetes. Compartido como reseña.",
      tags: ["Falco", "Kubernetes", "Detection design"], status: "private",
      href: "runtime-detection/"
    },
    {
      title: "Governed Workflow Automation", kind: "gate",
      en: "Adding AI to a business workflow without leaking personal data: a privacy gate, rule-based approval and tested failure paths, built in n8n.",
      es: "Agregar IA a un flujo de trabajo empresarial sin filtrar datos personales: un filtro de privacidad, aprobación basada en reglas y rutas de error probadas, construido en n8n.",
      tags: ["n8n", "Privacy", "Automation"], status: "private",
      href: "workflow-automation/"
    },
    {
      title: "AI Governance Scorecard", kind: "bars",
      en: "An interactive reference covering 42 AI metrics across 11 lifecycle layers: what to measure, how, and when.",
      es: "Referencia interactiva con 42 métricas de IA en 11 capas del ciclo de vida: qué medir, cómo y cuándo.",
      tags: ["Reference", "Metrics"], status: "live",
      href: "https://luispsalas.github.io/ai-governance-scorecard/"
    },
    {
      title: "Authorship Meter", kind: "meter",
      en: "A disclosure format and embeddable badge showing how much of a work came from a human and how much from a model.",
      es: "Formato de divulgación e insignia integrable que muestra cuánto de una obra viene de una persona y cuánto de un modelo.",
      tags: ["Disclosure", "Embed"], status: "live",
      href: "https://github.com/luispsalas/authorship-meter"
    },
    {
      title: "AI Strategic Context Engine", kind: "context",
      en: "My own framework for turning scattered project information into strategic context that people and AI models can both use. Applied in client sessions; its prompts and client material stay private.",
      es: "Un marco propio para convertir información dispersa de un proyecto en contexto estratégico que pueden usar tanto las personas como los modelos de IA. Aplicado en sesiones con clientes; sus prompts y el material de clientes son privados.",
      tags: ["Framework", "Strategy"], status: "described",
      href: "aisce/"
    }
  ],
  creative: [
    {
      title: "Idiorritmos", kind: "wave",
      en: "An idiorhythmic texturizer: everlasting layers of sound chopped by human rhythm. Max/MSP gen~ exported to AU/VST3.",
      es: "Un texturizador idiorrítmico: capas perpetuas de sonido cortadas por ritmo humano. Max/MSP gen~ exportado a AU/VST3.",
      tags: ["Max/MSP", "RNBO", "Plugin"], status: "soon",
      href: "https://github.com/luispsalas/Idiorritmos"
    },
    {
      title: "Live Visuals", kind: "shapes",
      en: "A browser-based audio-reactive visual engine for live performance alongside any DAW.",
      es: "Motor visual audio-reactivo en el navegador para performance en vivo junto a cualquier DAW.",
      tags: ["Three.js", "WebAudio"], status: "live",
      href: "https://github.com/luispsalas/live-visuals"
    },
    {
      title: "Videomapping with Max/MSP", kind: "quads",
      en: "A Max patch using jit.gl.meshwarp to map video clips onto one or two projection outputs.",
      es: "Un patch de Max que usa jit.gl.meshwarp para mapear clips de video a una o dos salidas de proyección.",
      tags: ["Max/MSP", "Projection"], status: "live",
      href: "https://github.com/luispsalas/Videomapping-with-Max-Msp"
    }
  ]
};

/* ---- Motifs -------------------------------------------------------------
   Drawn in the banner's language: dots, rules and one accent. They use
   currentColor, so each section's accent (blue / orange) and both themes
   come through without a second set of files. 320x180 = the 16:9 frame.

   Each motif carries a gentle SMIL animation that says something about its
   project (data flowing through lineage, a marker moving along a timeline).
   Animations are paused at rest and play only while a card is hovered or
   focused; visitors who ask for reduced motion never see them move. */
const LINE = "var(--border)";

/* One looping <animate>. `ease(n)` gives n keyframes a soft in-out curve. */
const anim = (attr, values, dur, extra = "") =>
  `<animate attributeName="${attr}" values="${values}" dur="${dur}s" repeatCount="indefinite" ${extra}/>`;
const ease = n =>
  `calcMode="spline" keyTimes="${Array.from({length: n}, (_, i) => (i / (n - 1)).toFixed(3)).join(";")}" ` +
  `keySplines="${Array(n - 1).fill(".45 0 .55 1").join(";")}"`;

/* Phase 0 is rounded exactly as the static drawing was, so the wave at rest is unchanged. */
const wavePoints = phase => Array.from({length: 30}, (_, i) =>
  `${30+i*9},${(100 - Math.sin(i*0.52 + phase)*(13+i)).toFixed(phase === 0 ? 0 : 1)}`).join(" ");

const MOTIF = {
  /* lines of text, rewritten */
  doc: () =>
    [0,1,2,3,4].map(i => {
      const w = 252-((i*53)%110);
      return `<rect x="34" y="${46+i*22}" width="${w}" height="8" rx="4" fill="${i===0 ? "currentColor" : LINE}">` +
        anim("width", `${w};${Math.round(w*.6)};${w}`, 4, `begin="${i*.35}s" ${ease(3)}`) + `</rect>`;
    }).join(""),

  /* the casebook's story: the marker rests at the incident; while playing it
     derails there (leaves the track along a dashed curve and fades), then
     comes back along the track from the start, so each loop ends at rest.
     Same shape as the casebook banner: events, an incident, a dashed stretch. */
  timeline: () => {
    const kt = `keyTimes="0;.08;.16;.24;.32;.45;.5;.6;.8;1"`;
    return `<line x1="34" y1="112" x2="286" y2="112" stroke="${LINE}" stroke-width="3"/>` +
      [0,1,2,3,4].map(i => `<circle cx="${44+i*52}" cy="112" r="5" fill="${LINE}"/>`).join("") +
      `<path d="M148,112 C175,114 196,132 214,160" fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-dasharray="5 5" stroke-linecap="round" opacity="0">` +
        anim("opacity", "0;1;1;0;0", 7, `keyTimes="0;.1;.4;.55;1"`) + `</path>` +
      `<circle cx="148" cy="112" r="10" fill="currentColor">` +
        anim("cx", "148;170;190;206;214;214;44;44;96;148", 7, kt) +
        anim("cy", "112;118;130;146;160;160;112;112;112;112", 7, kt) +
        anim("opacity", "1;1;0;0;1;1", 7, `keyTimes="0;.32;.45;.52;.6;1"`) + `</circle>` +
      [0,1].map(i => `<rect x="34" y="${52+i*18}" width="${180-i*60}" height="7" rx="3.5" fill="${LINE}"/>`).join("");
  },

  /* lineage: several sources, one governed table, several consumers; data flows through */
  lineage: () => {
    const box = (x, y, w, c) =>
      `<rect x="${x}" y="${y}" width="${w}" height="26" rx="5" fill="none" stroke="${c}" stroke-width="2.5"/>`;
    /* The drawn connector stays solid; while playing, a short packet travels along it
       (accent on grey lines, text colour on accent lines) and fades in and out each cycle. */
    const path = (d, c) =>
      `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.5"/>` +
      `<path d="${d}" fill="none" stroke="${c === LINE ? "currentColor" : "var(--fg)"}" stroke-width="3" stroke-linecap="round"
        stroke-dasharray="10 120" stroke-dashoffset="10" opacity="0">` +
      anim("stroke-dashoffset", "10;-52", 1.8) + anim("opacity", "0;1;1;0", 1.8, `keyTimes="0;.15;.85;1"`) + `</path>`;
    return box(30,48,62,LINE) + box(30,106,62,LINE) + box(132,77,66,"currentColor") +
      box(238,48,56,LINE) + box(238,106,56,LINE) +
      path("M92,61 C114,61 112,90 132,90", LINE) + path("M92,119 C114,119 112,90 132,90", LINE) +
      path("M198,90 C220,90 218,61 238,61", "currentColor") + path("M198,90 C220,90 218,119 238,119", "currentColor");
  },

  /* system calls flowing through a rule; the rule raises an alert */
  detect: () => {
    const step = 36, dur = 1.2;
    const dots = Array.from({length: 8}, (_, i) => {
      const x = 30 + i*step;
      const fade = i === 0 ? anim("opacity", "0;1", dur) : i === 7 ? anim("opacity", "1;0", dur) : "";
      return `<circle cx="${x}" cy="104" r="5" fill="${LINE}"${i === 0 ? ' opacity="0"' : ""}>` +
        anim("cx", `${x};${x+step}`, dur) + fade + `</circle>`;
    }).join("");
    return `<line x1="30" y1="104" x2="290" y2="104" stroke="${LINE}" stroke-width="3"/>` + dots +
      `<rect x="150" y="70" width="20" height="68" rx="5" fill="none" stroke="currentColor" stroke-width="2.5"/>
       <line x1="160" y1="70" x2="160" y2="52" stroke="currentColor" stroke-width="2.5"/>
       <circle cx="160" cy="44" r="7" fill="currentColor"/>
       <circle cx="160" cy="44" r="7" fill="none" stroke="currentColor" stroke-width="2" opacity=".7">` +
        anim("r", "7;20", 2.4) + anim("opacity", ".7;0", 2.4) + `</circle>` +
      [0,1].map(i => `<rect x="${184}" y="${38+i*14}" width="${76-i*28}" height="7" rx="3.5" fill="${LINE}"/>`).join("");
  },

  /* requests stream through a fixed-rule gate; the one carrying personal data
     (the ring) is turned aside to human review instead. Rests in the review box. */
  gate: () => {
    const step = 36, dur = 1.2;
    const dots = Array.from({length: 9}, (_, i) => {
      const x = 16 + i*step;
      const fade = i === 0 ? anim("opacity", "0;1", dur) : i === 8 ? anim("opacity", "1;0", dur) : "";
      return `<circle cx="${x}" cy="76" r="5" fill="${LINE}"${i === 0 ? ' opacity="0"' : ""}>` +
        anim("cx", `${x};${x+step}`, dur) + fade + `</circle>`;
    }).join("");
    const kt = `keyTimes="0;.12;.14;.2;.62;.72;1"`;
    return `<line x1="10" y1="76" x2="310" y2="76" stroke="${LINE}" stroke-width="3"/>` +
      `<path d="M128,76 C128,96 128,104 128,118" fill="none" stroke="${LINE}" stroke-width="2.5" stroke-dasharray="4 4"/>` +
      `<rect x="108" y="118" width="40" height="30" rx="7" fill="none" stroke="${LINE}" stroke-width="2.5"/>` +
      dots +
      `<rect x="154" y="46" width="12" height="60" rx="4" fill="currentColor"/>` +
      `<circle cx="128" cy="133" r="6" fill="none" stroke="currentColor" stroke-width="2.5">` +
        anim("cx", "128;128;16;16;118;128;128", 5.4, kt) +
        anim("cy", "133;133;76;76;76;96;133", 5.4, kt) +
        anim("opacity", "1;0;0;1;1;1;1", 5.4, kt) + `</circle>` +
      `<rect x="184" y="118" width="96" height="7" rx="3.5" fill="${LINE}"/>` +
      `<rect x="184" y="132" width="60" height="7" rx="3.5" fill="${LINE}"/>`;
  },

  /* metrics rising and falling */
  bars: () => {
    const h = [40,68,32,86,56,96,48];
    return h.map((v,i) => {
      const v2 = Math.round(v*.72), timing = `begin="${i*.3}s" ${ease(3)}`;
      return `<rect x="${34+i*36}" y="${146-v}" width="22" height="${v}" rx="4" fill="${i%3===0 ? "currentColor" : LINE}">` +
        anim("height", `${v};${v2};${v}`, 3.6, timing) + anim("y", `${146-v};${146-v2};${146-v}`, 3.6, timing) + `</rect>`;
    }).join("") +
    `<line x1="28" y1="148" x2="292" y2="148" stroke="${LINE}" stroke-width="2"/>`;
  },

  /* the human / AI share shifting */
  meter: () =>
    `<rect x="44" y="80" width="232" height="20" rx="10" fill="${LINE}"/>
     <rect x="44" y="80" width="128" height="20" rx="10" fill="currentColor">${anim("width", "128;158;128", 5, ease(3))}</rect>` +
    [0,1,2,3].map(i => `<rect x="${44+i*60}" y="118" width="42" height="7" rx="3.5" fill="${LINE}"/>`).join("") +
    `<rect x="44" y="52" width="92" height="9" rx="4.5" fill="${LINE}"/>`,

  /* nested frames — context inside context, pulsing inward */
  context: () =>
    [0,1,2].map(i =>
      `<rect x="${72+i*22}" y="${44+i*16}" width="${176-i*44}" height="${92-i*32}" rx="7"
       fill="none" stroke="${i===1 ? "currentColor" : LINE}" stroke-width="2.5">` +
      anim("opacity", "1;.3;1", 3.6, `begin="${i*.6}s" ${ease(3)}`) + `</rect>`).join(""),

  /* log lines written out one by one */
  code: () =>
    [0,1,2,3,4,5].map(i => {
      const w = 186-((i*31)%88);
      return `<rect x="${38+(i%3)*18}" y="${48+i*18}" width="${w}" height="7" rx="3.5"
       fill="${(i===0||i===3) ? "currentColor" : LINE}">` +
        anim("width", `${w};0;0;${w};${w}`, 6, `keyTimes="0;.06;${(.06+i*.1).toFixed(2)};${(.18+i*.1).toFixed(2)};1"`) + `</rect>`;
    }).join(""),

  /* a rolling wave over pulsing steps */
  wave: () =>
    `<polyline points="${wavePoints(0)}" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">` +
      anim("points", [0,1.6,3.2,1.6,0].map(wavePoints).join(";"), 5, ease(5)) + `</polyline>` +
    Array.from({length: 8}, (_, i) =>
      `<rect x="${30+i*34}" y="132" width="24" height="7" rx="3.5" fill="${LINE}">` +
      anim("opacity", "1;.35;1", 1.2, `begin="${(i*.15).toFixed(2)}s"`) + `</rect>`).join(""),

  /* overlapping forms drifting */
  shapes: () =>
    `<circle cx="116" cy="92" r="36" fill="none" stroke="currentColor" stroke-width="3.5"/>
     <circle cx="158" cy="92" r="36" fill="none" stroke="currentColor" stroke-width="3.5" opacity=".5">${anim("cx", "158;138;158", 4, ease(3))}</circle>
     <polygon points="232,54 274,130 190,130" fill="none" stroke="${LINE}" stroke-width="3.5">
       <animateTransform attributeName="transform" type="rotate" values="0 232 105;360 232 105" dur="14s" repeatCount="indefinite"/></polygon>`,

  /* two projection surfaces being warped */
  quads: () => {
    const a = "34,56 150,44 150,136 34,124",  a2 = "34,48 150,52 150,128 34,132";
    const b = "176,44 292,58 292,124 176,138", b2 = "176,52 292,48 292,132 176,128";
    return `<polygon points="${a}" fill="none" stroke="currentColor" stroke-width="3.5">${anim("points", `${a};${a2};${a}`, 5, ease(3))}</polygon>
      <polygon points="${b}" fill="none" stroke="${LINE}" stroke-width="3.5">${anim("points", `${b};${b2};${b}`, 5, `begin="1.2s" ${ease(3)}`)}</polygon>` +
      [1,2,3].map(i => `<line x1="${34+i*29}" y1="${53+i}" x2="${34+i*29}" y2="${127-i}"
        stroke="${LINE}" stroke-width="1.5"/>`).join("");
  }
};

function thumbHTML(p) {
  if (p.thumb) return `<div class="thumb"><img src="${p.thumb}" alt="" loading="lazy"></div>`;
  const draw = MOTIF[p.kind];
  if (!draw) return `<div class="thumb"></div>`;
  return `<div class="thumb"><svg viewBox="0 0 320 180" aria-hidden="true">${draw()}</svg></div>`;
}

/* Motion on hover or keyboard focus only. Cards are re-rendered on every
   language switch, so this runs after each render() and re-binds. */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

function attachMotion() {
  document.querySelectorAll(".card").forEach(card => {
    const svg = card.querySelector(".thumb svg");
    if (!svg || !svg.pauseAnimations) return;
    const stop = () => { svg.pauseAnimations(); svg.setCurrentTime(0); };
    const play = () => { if (!reduceMotion.matches) svg.unpauseAnimations(); };
    stop();
    card.addEventListener("mouseenter", play);
    card.addEventListener("focus", play);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("blur", stop);
  });
}

let lang = "en";

function cardHTML(p) {
  const st = STATUS[p.status];
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const inner = `
    ${thumbHTML(p)}
    <div class="body">
      <div class="head">
        <h3>${p.title}</h3>
        ${p.href ? '<span class="arrow" aria-hidden="true">→</span>' : ""}
        <span class="status ${st.cls}">${st[lang]}</span>
      </div>
      <p class="blurb">${p[lang]}</p>
      <div class="meta">${tags}</div>
    </div>`;
  return p.href
    ? `<a class="card" href="${p.href}">${inner}</a>`
    : `<div class="card">${inner}</div>`;
}

function render() {
  const word = lang === "en" ? "projects" : "proyectos";
  for (const key of ["governance", "creative"]) {
    const list = PROJECTS[key];
    document.getElementById(`cards-${key}`).innerHTML = list.map(cardHTML).join("");
    document.getElementById(`count-${key}`).textContent = `${list.length} ${word}`;
    document.getElementById(`n-${key}`).textContent = `${list.length} ${word}`;
  }
  attachMotion();
}

function applyLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const v = el.getAttribute(`data-${lang}`);
    if (v !== null) el.innerHTML = v;
  });
  document.documentElement.lang = lang;
  render();
}

/* Language switch */
document.getElementById("lang").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  lang = btn.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
  document.querySelectorAll("#lang button")
    .forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
  applyLang();
});

/* Copy the email address. mailto: opens a mail app, which not every visitor
   uses, so this puts the address on the clipboard instead. If the browser
   refuses, the button shows the address itself so it can be selected by hand. */
const copyBtn = document.getElementById("copy-email");
let copyTimer;
copyBtn.addEventListener("click", async () => {
  const address = copyBtn.dataset.email;
  clearTimeout(copyTimer);
  let hold = 2500;
  try {
    await navigator.clipboard.writeText(address);
    copyBtn.textContent = lang === "en" ? "Copied" : "Copiado";
  } catch (e) {
    copyBtn.textContent = address;
    copyBtn.classList.add("show-address");
    hold = 10000;   /* long enough to select it by hand */
  }
  copyTimer = setTimeout(() => {
    copyBtn.classList.remove("show-address");
    copyBtn.textContent = copyBtn.getAttribute(`data-${lang}`);
  }, hold);
});
/* A language switch rewrites the label, so drop any copy state with it. */
document.getElementById("lang").addEventListener("click", () => {
  clearTimeout(copyTimer);
  copyBtn.classList.remove("show-address");
});

/* Light / dark switch. Dark is the default; a visitor's choice is remembered. */
const root = document.documentElement;
const themeBtn = document.getElementById("theme");

/* Both choices are always visible, like the EN / ES control: the pressed one
   is the theme you are looking at. */
function paintThemeBtn() {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  themeBtn.querySelectorAll("button")
    .forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeChoice === current)));
}
try {
  const saved = localStorage.getItem("theme");
  root.setAttribute("data-theme", saved === "light" ? "light" : "dark");
} catch (e) {
  root.setAttribute("data-theme", "dark");
}

themeBtn.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const next = btn.dataset.themeChoice;
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  paintThemeBtn();
});

/* The language choice is remembered so the description pages open in it too. */
try {
  if (localStorage.getItem("lang") === "es") {
    lang = "es";
    document.querySelectorAll("#lang button")
      .forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === "es")));
  }
} catch (e) { /* ignore */ }

paintThemeBtn();
applyLang();
