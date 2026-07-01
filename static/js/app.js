/* ===== HALO project page interactions ===== */

/*
 * ---------------------------------------------------------------------------
 *  HOW TO ADD YOUR VIDEOS
 * ---------------------------------------------------------------------------
 *  Video files live under:  static/videos/<exampleId>/<method>.mp4
 *
 *  Methods (column order, left -> right):
 *      reference, moft, conmo, motionclone, ditflow, ropecraft, gwtf, halo
 *
 *  To add / rename / reorder examples, just edit the BENCHMARK_EXAMPLES and
 *  MOVIE_EXAMPLES arrays below. Any missing .mp4 automatically shows a small
 *  "add this file" placeholder instead of a broken video, so you can fill
 *  them in incrementally.
 * ---------------------------------------------------------------------------
 */

const METHODS = [
  { id: "reference",   label: "Reference" },
  { id: "moft",        label: "MoFT" },
  { id: "conmo",       label: "ConMo" },
  { id: "motionclone", label: "MotionClone" },
  { id: "ditflow",     label: "DiTFlow" },
  { id: "ropecraft",   label: "RoPECraft" },
  { id: "gwtf",        label: "GWTF" },
  { id: "halo",        label: "HALO (Ours)", ours: true },
];

// Standard benchmark examples.  id -> folder name under static/videos/
const BENCHMARK_EXAMPLES = [
  { id: "porsche",     label: "Red Porsche",   prompt: "A red Porsche drives beside a lake at sunrise." },
  { id: "motorbike",   label: "Motorbike",     prompt: "The person is riding a motorbike on a muddy course." },
  { id: "lion",        label: "Lion",          prompt: "A lion walking on a sandy path in a wildlife reserve." },
  { id: "penguin",     label: "Penguin",       prompt: "The penguin is walking in a zoo enclosure, towards its habitat pool." },
];

// Movie Scene Dataset examples.
const MOVIE_EXAMPLES = [
  { id: "stormtrooper", label: "Stormtroopers", prompt: "Two stormtroopers riding mechanical steeds across a concrete field." },
  { id: "minions",      label: "Minions",       prompt: "A small Minions walks past one another in a loose line, moving steadily across the green space." },
  { id: "spongebob",    label: "SpongeBob",     prompt: "A SpongeBob-style adventurer rides a bouncing anemone-creature across a smooth open ground." },
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
function renderGrid(gridEl, promptEl, example) {
  gridEl.innerHTML = "";
  promptEl.textContent = `“${example.prompt}”`;
  METHODS.forEach(m => gridEl.appendChild(buildPanel(example.id, m)));
  // (re)start playback for freshly inserted videos
  gridEl.querySelectorAll("video").forEach(v => { try { v.play(); } catch (e) {} });
}

// ---------- wire up an example selector + grid ----------
function initGallery({ pillsId, gridId, promptId, examples }) {
  const pills = document.getElementById(pillsId);
  const grid = document.getElementById(gridId);
  const promptEl = document.getElementById(promptId);
  if (!pills || !grid || !promptEl || !examples.length) return;

  let active = 0;
  const buttons = examples.map((ex, i) => {
    const b = document.createElement("button");
    b.className = "pill" + (i === 0 ? " active" : "");
    b.textContent = ex.label;
    b.addEventListener("click", () => {
      active = i;
      buttons.forEach((x, j) => x.classList.toggle("active", j === i));
      renderGrid(grid, promptEl, examples[i]);
    });
    return b;
  });

  const groupWrap = document.createElement("span");
  groupWrap.className = "pill-group";
  buttons.forEach(b => groupWrap.appendChild(b));
  pills.appendChild(groupWrap);

  renderGrid(grid, promptEl, examples[active]);
}

document.addEventListener("DOMContentLoaded", () => {
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
  });
});
