/* AISCE "framing" motion: a first draft toward a motion logo.
   Scattered points drift, two fingertips trace a dotted frame around them
   (the dashed rectangle drawn in the air), and the points settle into order.

   At rest it shows the finished frame. Hovering plays the whole sequence
   once, at a calm pace; visitors who ask for reduced motion never see it move.
   Chosen 2026-10-05 from four mocked options (option C, dotted, calm). */

(() => {
  const host = document.getElementById("aisce-frame");
  if (!host) return;

  const NS = "http://www.w3.org/2000/svg";
  const DURATION = 3.4;                                   /* seconds, "calm" */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const make = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  };
  const clamp = x => Math.max(0, Math.min(1, x));
  const seg = (p, a, b) => clamp((p - a) / (b - a));
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /* 320 x 180 stage. The frame is traced from the top centre outwards and
     closes at the bottom centre, the way two index fingers draw it. */
  const X0 = 70, Y0 = 40, X1 = 250, Y1 = 140, CX = 160;
  const LEFT  = `M${CX},${Y0} L${X0},${Y0} L${X0},${Y1} L${CX},${Y1}`;
  const RIGHT = `M${CX},${Y0} L${X1},${Y0} L${X1},${Y1} L${CX},${Y1}`;

  const svg = make("svg", { viewBox: "0 0 320 180", "aria-hidden": "true", focusable: "false" }, host);
  const defs = make("defs", {}, svg);

  /* Fifteen scattered points and the 5 x 3 grid they settle into. */
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const from = Array.from({ length: 15 }, () => [20 + rand() * 280, 14 + rand() * 152]);
  const to = Array.from({ length: 15 }, (_, i) => [X0 + 30 + (i % 5) * 30, Y0 + 25 + Math.floor(i / 5) * 25]);
  const dots = from.map((_, i) =>
    make("circle", { r: 3.6, fill: i % 4 === 0 ? "var(--accent)" : "var(--fg-subtle)" }, svg));

  /* A dotted stroke revealed by a mask, so the dots appear as the line is drawn. */
  let maskId = 0;
  function stroke(d) {
    const id = `aisce-frame-mask-${maskId++}`;
    const mask = make("mask", { id, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 320, height: 180 }, defs);
    const reveal = make("path", { d, fill: "none", stroke: "#fff", "stroke-width": 12,
      "stroke-linecap": "butt", "stroke-linejoin": "round" }, mask);
    make("path", { d, fill: "none", stroke: "var(--fg)", "stroke-width": 3.6, "stroke-dasharray": "0.1 8",
      "stroke-dashoffset": 4.05,                      /* start mid-gap, so both halves read as one line */
      "stroke-linecap": "round", mask: `url(#${id})` }, svg);
    const len = reveal.getTotalLength();
    reveal.setAttribute("stroke-dasharray", `${len} ${len}`);
    return {
      set(p) { reveal.setAttribute("stroke-dashoffset", len * (1 - p)); },
      at(p)  { return reveal.getPointAtLength(len * clamp(p)); },
      dir(p) {
        const a = reveal.getPointAtLength(len * clamp(p - .01)), b = reveal.getPointAtLength(len * clamp(p + .01));
        return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      }
    };
  }
  const left = stroke(LEFT), right = stroke(RIGHT);

  /* Two small rounded fingertips that lead the line. */
  const tip = () => {
    const g = make("g", { opacity: 0 }, svg);
    make("rect", { x: -7, y: -3.5, width: 12, height: 7, rx: 3.5, fill: "var(--accent)" }, g);
    return g;
  };
  const tipL = tip(), tipR = tip();
  const place = (g, pt, deg, op) => {
    g.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${deg})`);
    g.setAttribute("opacity", op);
  };

  function draw(p) {
    const drift = seg(p, 0, .3), settle = ease(seg(p, .62, .98));
    dots.forEach((dot, i) => {
      const wobble = (1 - settle) * Math.sin(p * 9 + i) * 3 * drift;
      dot.setAttribute("cx", from[i][0] + (to[i][0] - from[i][0]) * settle + wobble);
      dot.setAttribute("cy", from[i][1] + (to[i][1] - from[i][1]) * settle + wobble * .6);
    });
    const q = ease(seg(p, .18, .7));
    left.set(q); right.set(q);
    const op = seg(p, .18, .24) * (1 - seg(p, .66, .74));
    place(tipL, left.at(q), left.dir(q), op);
    place(tipR, right.at(q), right.dir(q), op);
  }

  /* Rest on the finished frame; play once per hover, and let a play finish. */
  let start = null;
  function frame(now) {
    const p = clamp((now - start) / (DURATION * 1000));
    draw(p);
    if (p < 1) requestAnimationFrame(frame); else start = null;
  }
  host.addEventListener("mouseenter", () => {
    if (reduce.matches || start !== null) return;
    start = performance.now();
    requestAnimationFrame(frame);
  });

  draw(1);
})();
