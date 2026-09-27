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
      en: "A living wiki of core AI concepts — sourced, plainly explained, each entry ending with governance notes.",
      es: "Wiki vivo de conceptos clave de IA — con fuentes, explicados con claridad y notas de gobernanza en cada entrada.",
      tags: ["Wiki", "Editorial"], status: "live",
      href: "https://luispsalas.github.io/applied-ai-concepts/"
    },
    {
      title: "Autonomous AI Casebook", kind: "timeline",
      en: "Reconstructions of incidents where an AI system's autonomy was central to real harm, built from primary sources.",
      es: "Reconstrucciones de incidentes donde la autonomía de un sistema de IA fue central al daño, desde fuentes primarias.",
      tags: ["Casebook", "Primary sources"], status: "live",
      href: "https://github.com/luispsalas/autonomous-ai-casebook"
    },
    {
      title: "AI Governance Scorecard", kind: "bars",
      en: "An interactive reference covering 42 AI metrics across 11 lifecycle layers — what to measure, how, and when.",
      es: "Referencia interactiva con 42 métricas de IA en 11 capas del ciclo de vida — qué medir, cómo y cuándo.",
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
      en: "Client work: a system for grounding strategic decisions in an organization's own context. Described here, not linked.",
      es: "Trabajo de cliente: un sistema para anclar decisiones estratégicas en el contexto propio de una organización. Aquí descrito, sin enlace.",
      tags: ["Client work", "Confidential"], status: "described",
      href: null
    },
    {
      title: "Local Governance Knowledge Base", kind: "code",
      en: "A local, deterministic pipeline that builds and maintains a governance knowledge base. Shared as a write-up.",
      es: "Pipeline local y determinista que construye y mantiene una base de conocimiento de gobernanza. Compartido como reseña.",
      tags: ["Agents", "Pipeline"], status: "private",
      href: null
    }
  ],
  creative: [
    {
      title: "Idiorritmos", kind: "wave",
      en: "An idiorhythmic texturizer — everlasting layers of sound chopped by human rhythm. Max/MSP gen~ exported to AU/VST3.",
      es: "Un texturizador idiorrítmico — capas perpetuas de sonido cortadas por ritmo humano. Max/MSP gen~ exportado a AU/VST3.",
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
   come through without a second set of files. 320x180 = the 16:9 frame. */
const LINE = "var(--border)";
const MOTIF = {
  doc: () =>
    [0,1,2,3,4].map(i =>
      `<rect x="34" y="${46+i*22}" width="${252-((i*53)%110)}" height="8" rx="4"
       fill="${i===0 ? "currentColor" : LINE}"/>`).join(""),

  timeline: () =>
    `<line x1="34" y1="112" x2="286" y2="112" stroke="${LINE}" stroke-width="3"/>` +
    [0,1,2,3,4].map(i => `<circle cx="${44+i*52}" cy="112" r="5" fill="${LINE}"/>`).join("") +
    `<circle cx="148" cy="112" r="10" fill="currentColor"/>` +
    [0,1].map(i => `<rect x="34" y="${52+i*18}" width="${180-i*60}" height="7" rx="3.5" fill="${LINE}"/>`).join(""),

  bars: () => {
    const h = [40,68,32,86,56,96,48];
    return h.map((v,i) =>
      `<rect x="${34+i*36}" y="${146-v}" width="22" height="${v}" rx="4"
       fill="${i%3===0 ? "currentColor" : LINE}"/>`).join("") +
      `<line x1="28" y1="148" x2="292" y2="148" stroke="${LINE}" stroke-width="2"/>`;
  },

  meter: () =>
    `<rect x="44" y="80" width="232" height="20" rx="10" fill="${LINE}"/>
     <rect x="44" y="80" width="128" height="20" rx="10" fill="currentColor"/>` +
    [0,1,2,3].map(i => `<rect x="${44+i*60}" y="118" width="42" height="7" rx="3.5" fill="${LINE}"/>`).join("") +
    `<rect x="44" y="52" width="92" height="9" rx="4.5" fill="${LINE}"/>`,

  /* nested frames — context inside context */
  context: () =>
    [0,1,2].map(i =>
      `<rect x="${72+i*22}" y="${44+i*16}" width="${176-i*44}" height="${92-i*32}" rx="7"
       fill="none" stroke="${i===1 ? "currentColor" : LINE}" stroke-width="2.5"/>`).join(""),

  code: () =>
    [0,1,2,3,4,5].map(i =>
      `<rect x="${38+(i%3)*18}" y="${48+i*18}" width="${186-((i*31)%88)}" height="7" rx="3.5"
       fill="${(i===0||i===3) ? "currentColor" : LINE}"/>`).join(""),

  wave: () => {
    const pts = Array.from({length: 30}, (_, i) =>
      `${30+i*9},${(100 - Math.sin(i*0.52)*(13+i)).toFixed(0)}`).join(" ");
    return `<polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>` +
      Array.from({length: 8}, (_, i) =>
        `<rect x="${30+i*34}" y="132" width="24" height="7" rx="3.5" fill="${LINE}"/>`).join("");
  },

  shapes: () =>
    `<circle cx="116" cy="92" r="36" fill="none" stroke="currentColor" stroke-width="3.5"/>
     <circle cx="158" cy="92" r="36" fill="none" stroke="currentColor" stroke-width="3.5" opacity=".5"/>
     <polygon points="232,54 274,130 190,130" fill="none" stroke="${LINE}" stroke-width="3.5"/>`,

  quads: () =>
    `<polygon points="34,56 150,44 150,136 34,124" fill="none" stroke="currentColor" stroke-width="3.5"/>
     <polygon points="176,44 292,58 292,124 176,138" fill="none" stroke="${LINE}" stroke-width="3.5"/>` +
    [1,2,3].map(i => `<line x1="${34+i*29}" y1="${53+i}" x2="${34+i*29}" y2="${127-i}"
      stroke="${LINE}" stroke-width="1.5"/>`).join("")
};

function thumbHTML(p) {
  if (p.thumb) return `<div class="thumb"><img src="${p.thumb}" alt="" loading="lazy"></div>`;
  const draw = MOTIF[p.kind];
  if (!draw) return `<div class="thumb"></div>`;
  return `<div class="thumb"><svg viewBox="0 0 320 180" aria-hidden="true">${draw()}</svg></div>`;
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
  document.querySelectorAll("#lang button")
    .forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
  applyLang();
});

/* Light / dark switch. Dark is the default; a visitor's choice is remembered. */
const root = document.documentElement;
const themeBtn = document.getElementById("theme");

function isDark() {
  return root.getAttribute("data-theme") !== "light";
}
function paintThemeBtn() {
  themeBtn.textContent = isDark() ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
}
try {
  const saved = localStorage.getItem("theme");
  root.setAttribute("data-theme", saved === "light" ? "light" : "dark");
} catch (e) {
  root.setAttribute("data-theme", "dark");
}

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  paintThemeBtn();
});

paintThemeBtn();
applyLang();
