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
  document.querySelectorAll("#lang button")
    .forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  root.lang = lang;
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

function isDark() {
  return root.getAttribute("data-theme") !== "light";
}
function paintThemeBtn() {
  themeBtn.textContent = isDark() ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
}

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
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
