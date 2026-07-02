/* ===== HALO project page interactions ===== */

/*
 * ---------------------------------------------------------------------------
 *  HOW TO ADD YOUR VIDEOS
 * ---------------------------------------------------------------------------
 *  Video files live under:  static/videos/<exampleId>/<method>.mp4
 *
 *  Methods (column order, left -> right):
 *      reference, halo (Ours), conmo, ditflow, gwtf, motionclone, ropecraft
 *
 *  To add / rename / reorder examples, just edit the BENCHMARK_EXAMPLES and
 *  MOVIE_EXAMPLES arrays below. Any missing .mp4 automatically shows a small
 *  "add this file" placeholder instead of a broken video, so you can fill
 *  them in incrementally.
 * ---------------------------------------------------------------------------
 */

// Video Results: Reference first, then HALO (Ours), then baselines.
const METHODS = [
  { id: "reference",   label: "Reference" },
  { id: "halo",        label: "HALO (Ours)", ours: true },
  { id: "conmo",       label: "ConMo" },
  { id: "ditflow",     label: "DiTFlow" },
  { id: "gwtf",        label: "GWTF" },
  { id: "motionclone", label: "MotionClone" },
  { id: "ropecraft",   label: "RoPECraft" },
];

// Movie Scene: only Reference and HALO (Ours).
const MOVIE_METHODS = [
  { id: "reference",   label: "Reference" },
  { id: "halo",        label: "HALO (Ours)", ours: true },
];

// Teaser carousel: each sample shows Reference + HALO (Ours) side by side.
// Videos live at:  static/videos/teaser/<file>
const TEASER_SAMPLES = [
  {
    prompt: "A red Porche drives beside a lake at sunrise.",
    reference: "static/videos/teaser/carroundabout_ref.mp4",
    halo:      "static/videos/teaser/carroundabout_ours.mp4",
  },
  {
    prompt: "Two stormtroopers riding mechanical steeds across a concrete field.",
    reference: "static/videos/teaser/EMA_MVI2_ref.mp4",
    halo:      "static/videos/teaser/EMA_MVI2_ours.mp4",
  },
  {
    prompt: "A boat driving on a winding river through a serene canyon.",
    reference: "static/videos/teaser/Car_turn.mp4",
    halo:      "static/videos/teaser/Car_turn_ours.mp4",
  },
];

// Standard benchmark examples.  id -> folder name under static/videos/
const BENCHMARK_EXAMPLES = [
  { id: "driftturn",   label: "Drift turn",   prompt: "A jet plane racing through the sky, with smoke trailing behind it." },
  { id: "scootergray", label: "Scooter",      prompt: "A child riding a skateboard on a park pathway." },
  { id: "motorbike",   label: "Motorbike",    prompt: "The man is riding a horse on a bridge, passing a roadside sign." },

];

// Movie Scene Dataset examples (Reference + HALO only).
const MOVIE_EXAMPLES = [
  { id: "ms_moi",      label: "Tram",        prompt: "A sleek crystal rail-car drifts past along shimmering track." },
  { id: "ms_moisc2",   label: "Rickshaw",    prompt: "Indiana Jones pulls a vintage richshaw across a sunlit dirt field." },
  { id: "ms_tax3",     label: "Human",       prompt: "Mario walks forward with a steady bounce across a bright viallage plaza." },
];

// ---------- build one <figure> panel for a (example, method) pair ----------
function buildPanel(exampleId, method) {
  const fig = document.createElement("figure");
  fig.className = "method-cell" + (method.ours ? " ours" : "");

  const tag = document.createElement("span");
  tag.className = "tag " + (method.ours ? "ours" : (method.id === "reference" ? "ref" : "base"));
  tag.textContent = method.label;
  fig.appendChild(tag);

  const src = `static/videos/${exampleId}/${method.id}.mp4`;
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.controls = false;

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  video.appendChild(source);

  // graceful placeholder when the file is not there yet
  const ph = document.createElement("div");
  ph.className = "placeholder cell-ph";
  ph.innerHTML = `Add<br><code>${exampleId}/${method.id}.mp4</code>`;
  ph.style.display = "none";

  video.addEventListener("error", () => {
    video.style.display = "none";
    ph.style.display = "flex";
  });
  // some browsers fire error on <source>, not <video>
  source.addEventListener("error", () => {
    video.style.display = "none";
    ph.style.display = "flex";
  });

  fig.appendChild(video);
  fig.appendChild(ph);
  return fig;
}

// ---------- render a full method grid for the selected example ----------
function renderGrid(gridEl, promptEl, example, methods) {
  gridEl.innerHTML = "";
  promptEl.textContent = `“${example.prompt}”`;
  methods.forEach(m => gridEl.appendChild(buildPanel(example.id, m)));
  // (re)start playback for freshly inserted videos
  gridEl.querySelectorAll("video").forEach(v => { try { v.play(); } catch (e) {} });
}

// ---------- wire up an example selector + grid ----------
function initGallery({ pillsId, gridId, promptId, examples, methods = METHODS }) {
  const pills = document.getElementById(pillsId);
  const grid = document.getElementById(gridId);
  const promptEl = document.getElementById(promptId);
  if (!pills || !grid || !promptEl || !examples.length) return;

  // let the grid columns match the number of methods (e.g. 2 for Movie Scene)
  gridEl_setCols(grid, methods.length);

  let active = 0;
  const buttons = examples.map((ex, i) => {
    const b = document.createElement("button");
    b.className = "pill" + (i === 0 ? " active" : "");
    b.textContent = ex.label;
    b.addEventListener("click", () => {
      active = i;
      buttons.forEach((x, j) => x.classList.toggle("active", j === i));
      renderGrid(grid, promptEl, examples[i], methods);
    });
    return b;
  });

  const groupWrap = document.createElement("span");
  groupWrap.className = "pill-group";
  buttons.forEach(b => groupWrap.appendChild(b));
  pills.appendChild(groupWrap);

  renderGrid(grid, promptEl, examples[active], methods);
}

// give a method-grid a sensible fixed column count on wide screens
function gridEl_setCols(grid, n) {
  if (n <= 2) grid.classList.add("cols-2");
}

// ---------- build a labelled video cell (reference / ours) ----------
function buildTeaserCell(src, label, ours) {
  const cell = document.createElement("div");
  cell.className = "teaser-cell" + (ours ? " ours" : "");

  const tag = document.createElement("span");
  tag.className = "tag " + (ours ? "ours" : "ref");
  tag.textContent = label;
  cell.appendChild(tag);

  const ph = document.createElement("div");
  ph.className = "placeholder cell-ph";
  ph.innerHTML = `Add<br><code>${src.replace("static/videos/", "")}</code>`;
  ph.style.display = "none";
  const fail = () => { media.style.display = "none"; ph.style.display = "flex"; };

  let media;
  if (/\.gif($|\?)/i.test(src)) {
    // GIFs loop/animate natively as images
    media = document.createElement("img");
    media.src = src; media.alt = label; media.loading = "lazy";
    media.addEventListener("error", fail);
  } else {
    media = document.createElement("video");
    media.muted = true; media.loop = true; media.autoplay = true;
    media.playsInline = true; media.setAttribute("playsinline", ""); media.controls = false;
    const source = document.createElement("source");
    source.src = src; source.type = "video/mp4";
    media.appendChild(source);
    media.addEventListener("error", fail);
    source.addEventListener("error", fail);
  }

  cell.appendChild(media);
  cell.appendChild(ph);
  return cell;
}

// ---------- teaser carousel (Reference | HALO, swipeable) ----------
function initTeaser() {
  const track = document.getElementById("teaser-track");
  const dotsWrap = document.getElementById("teaser-dots");
  const prev = document.getElementById("teaser-prev");
  const next = document.getElementById("teaser-next");
  if (!track || !TEASER_SAMPLES.length) return;

  TEASER_SAMPLES.forEach(s => {
    const slide = document.createElement("div");
    slide.className = "tcar-slide";
    const pair = document.createElement("div");
    pair.className = "tcar-pair";
    pair.appendChild(buildTeaserCell(s.reference, "Reference", false));
    pair.appendChild(buildTeaserCell(s.halo, "HALO (Ours)", true));
    slide.appendChild(pair);
    if (s.prompt) {
      const p = document.createElement("p");
      p.className = "slide-prompt";
      p.textContent = `“${s.prompt}”`;
      slide.appendChild(p);
    }
    track.appendChild(slide);
  });

  const dots = TEASER_SAMPLES.map((_, i) => {
    const d = document.createElement("button");
    d.className = "tcar-dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", `Sample ${i + 1}`);
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);
    return d;
  });

  let idx = 0;
  const n = TEASER_SAMPLES.length;
  function go(i) {
    idx = (i + n) % n;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle("active", j === idx));
  }
  prev && prev.addEventListener("click", () => go(idx - 1));
  next && next.addEventListener("click", () => go(idx + 1));

  // basic swipe support
  let x0 = null;
  track.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // hide arrows/dots if only one sample
  if (n < 2) { dotsWrap.style.display = "none"; if (prev) prev.style.display = "none"; if (next) next.style.display = "none"; }
}

document.addEventListener("DOMContentLoaded", () => {
  initTeaser();
  initGallery({
    pillsId: "example-pills",
    gridId: "method-grid",
    promptId: "example-prompt",
    examples: BENCHMARK_EXAMPLES,
  });
  initGallery({
    pillsId: "movie-pills",
    gridId: "movie-grid",
    promptId: "movie-prompt",
    examples: MOVIE_EXAMPLES,
    methods: MOVIE_METHODS,
  });
});
