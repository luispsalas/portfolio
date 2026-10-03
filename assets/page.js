/* Luis P. Salas — project description pages (aisce/, local-kb/)
   The same language and theme switches as the home page, without the cards.
   Both choices are remembered, so a visitor who reads the hub in Spanish
   lands on these pages in Spanish too. */

const root = document.documentElement;
let lang = "en";

function applyLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const v = el.getAttribute(`data-${lang}`);
    if (v !== null) el.innerHTML = v;
  });
  labelCells();
  document.querySelectorAll("#lang button")
    .forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  root.lang = lang;
}

/* Tables stack as cards on phones (style.css); each cell shows its column name,
   taken from the header so it follows the current language. */
function labelCells() {
  document.querySelectorAll(".doc table").forEach(table => {
    const heads = [...table.querySelectorAll("thead th")].map(th => th.textContent.trim());
    table.querySelectorAll("tbody tr").forEach(tr =>
      [...tr.children].forEach((td, i) => { if (heads[i]) td.dataset.label = heads[i]; }));
  });
}

document.getElementById("lang").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  lang = btn.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
  applyLang();
});

/* Light / dark switch. Dark is the default; a visitor's choice is remembered. */
const themeBtn = document.getElementById("theme");

/* Both choices are always visible, like the EN / ES control: the pressed one
   is the theme you are looking at. */
function paintThemeBtn() {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  themeBtn.querySelectorAll("button")
    .forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeChoice === current)));
}

themeBtn.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const next = btn.dataset.themeChoice;
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  paintThemeBtn();
});

try {
  root.setAttribute("data-theme", localStorage.getItem("theme") === "light" ? "light" : "dark");
  if (localStorage.getItem("lang") === "es") lang = "es";
} catch (e) { /* ignore */ }

paintThemeBtn();
applyLang();
