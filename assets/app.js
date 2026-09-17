/* Luis Salas — Projects
   Content lives in PROJECTS; the page renders from it.
   Only projects ticked in the workbook's Include tab appear here. */

const STATUS = {
  live:      { cls: "live",      en: "Live",              es: "En línea" },
  soon:      { cls: "soon",      en: "Making public soon", es: "Por publicar" },
  private:   { cls: "private",   en: "Private",           es: "Privado" },
  described: { cls: "described", en: "Described",         es: "Descrito" }
};

const PROJECTS = {
  governance: [
    {
      title: "Applied AI Concepts",
      en: "A living wiki of core AI concepts — sourced, plainly explained, each entry ending with governance notes.",
      es: "Wiki vivo de conceptos clave de IA — con fuentes, explicados con claridad y notas de gobernanza en cada entrada.",
      tags: ["Wiki", "Editorial"], status: "live",
      href: "https://luispsalas.github.io/applied-ai-concepts/"
    },
    {
      title: "Authorship Meter",
      en: "A disclosure format and embeddable badge showing how much of a work came from a human and how much from a model.",
      es: "Formato de divulgación e insignia integrable que muestra cuánto de una obra viene de una persona y cuánto de un modelo.",
      tags: ["Standard", "Embed"], status: "live",
      href: "https://luispsalas.github.io/authorship-meter/"
    },
    {
      title: "AI Governance Scorecard",
      en: "An interactive reference covering 42 AI metrics across 11 lifecycle layers — what to measure, how, and when.",
      es: "Referencia interactiva con 42 métricas de IA en 11 capas del ciclo de vida — qué medir, cómo y cuándo.",
      tags: ["Reference", "Metrics"], status: "live",
      href: "https://luispsalas.github.io/ai-governance-scorecard/"
    },
    {
      title: "Autonomous AI Casebook",
      en: "Reconstructions of incidents where an AI system's autonomy was central to real harm, built from primary sources.",
      es: "Reconstrucciones de incidentes donde la autonomía de un sistema de IA fue central al daño, desde fuentes primarias.",
      tags: ["Casebook", "Primary sources"], status: "soon",
      href: "https://github.com/luispsalas/autonomous-ai-casebook"
    },
    {
      title: "AI Strategic Context Engine",
      en: "Client work: a system for grounding strategic decisions in an organisation's own context. Described here, not linked.",
      es: "Trabajo de cliente: un sistema para anclar decisiones estratégicas en el contexto propio de una organización. Aquí descrito, sin enlace.",
      tags: ["Client work", "Confidential"], status: "described",
      href: null
    },
    {
      title: "Local Governance Knowledge Base",
      en: "A local, deterministic pipeline that builds and maintains a governance knowledge base. Shared as a write-up.",
      es: "Pipeline local y determinista que construye y mantiene una base de conocimiento de gobernanza. Compartido como reseña.",
      tags: ["Agents", "Pipeline"], status: "private",
      href: null
    }
  ],
  creative: [
    {
      title: "IDIORRITMOS",
      en: "An idiorhythmic texturizer — everlasting layers of sound chopped by human rhythm. Max/MSP gen~ exported to AU/VST3.",
      es: "Un texturizador idiorrítmico — capas perpetuas de sonido cortadas por ritmo humano. Max/MSP gen~ exportado a AU/VST3.",
      tags: ["Max/MSP", "RNBO", "Plugin"], status: "soon",
      href: "https://github.com/luispsalas/Idiorritmos"
    },
    {
      title: "Live Visuals",
      en: "A browser-based audio-reactive visual engine for live performance alongside any DAW.",
      es: "Motor visual audio-reactivo en el navegador para performance en vivo junto a cualquier DAW.",
      tags: ["Three.js", "WebAudio"], status: "live",
      href: "https://github.com/luispsalas/live-visuals"
    },
    {
      title: "Videomapping with Max/MSP",
      en: "A Max patch using jit.gl.meshwarp to map video clips onto one or two projection outputs.",
      es: "Un patch de Max que usa jit.gl.meshwarp para mapear clips de video a una o dos salidas de proyección.",
      tags: ["Max/MSP", "Projection"], status: "live",
      href: "https://github.com/luispsalas/Videomapping-with-Max-Msp"
    }
  ]
};

let lang = "en";

function cardHTML(p) {
  const st = STATUS[p.status];
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const inner = `
    <div class="head">
      <h3>${p.title}</h3>
      ${p.href ? '<span class="arrow" aria-hidden="true">→</span>' : ""}
    </div>
    <p class="blurb">${p[lang]}</p>
    <div class="meta">${tags}<span class="status ${st.cls}">${st[lang]}</span></div>`;
  return p.href
    ? `<a class="card" href="${p.href}">${inner}</a>`
    : `<div class="card">${inner}</div>`;
}

function placeholderHTML() {
  const t = lang === "en" ? "More projects" : "Más proyectos";
  const b = lang === "en" ? "Still being assessed for inclusion." : "En evaluación para incluirse.";
  return `<div class="card placeholder"><div class="head"><h3>${t}</h3></div><p class="blurb">${b}</p></div>`;
}

function render() {
  const word = lang === "en" ? "projects" : "proyectos";
  for (const key of ["governance", "creative"]) {
    const list = PROJECTS[key];
    document.getElementById(`cards-${key}`).innerHTML =
      list.map(cardHTML).join("") + placeholderHTML();
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

/* Light / dark switch — overrides the OS setting, remembered per visitor */
const root = document.documentElement;
const themeBtn = document.getElementById("theme");

function isDark() {
  const set = root.getAttribute("data-theme");
  if (set) return set === "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function paintThemeBtn() {
  themeBtn.textContent = isDark() ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
}
try {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
} catch (e) { /* storage unavailable — fall back to the OS setting */ }

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  paintThemeBtn();
});

paintThemeBtn();
applyLang();
