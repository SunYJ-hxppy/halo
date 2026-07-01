# HALO — Controlling Motion Transfer in Diffusion Transformers via Attention Heads

Project page for **HALO** (ECCV 2026), a head-aware, training-free controllable motion
transfer framework for video Diffusion Transformers.

🌐 **Live page:** https://sunyj-hxppy.github.io/halo/

> HALO reveals that video Diffusion Transformers encode motion and structure in distinct
> attention heads, and leverages these heads with semantic-aware motion guidance and
> selective structural injection to enable training-free, prompt-aligned motion transfer
> with improved motion fidelity and structural alignment.

---

## Authors

Sunyoung Jung¹\*, Jiwoo Park¹²\*, Yoonseok Choi¹, Kyobin Choo¹, Ming-Hsuan Yang³, Seong Jae Hwang¹†

¹ Yonsei University · ² LG Electronics · ³ University of California, Merced
<br>\* Equal contribution · † Corresponding author

---

## Repository structure

```
.
├── index.html              # the whole page (content + section markup)
├── static/
│   ├── css/style.css        # styles (theme, layout, tables, video grid)
│   ├── js/app.js            # example selectors + data-driven video grids
│   ├── images/              # paper figures (fig2–fig11, quantitative plot)
│   ├── videos/<example>/    # result videos, per method (see below)
│   └── favicon.*            # 🎥 site icons
├── ASSETS.md               # detailed guide to figures / videos / links
├── robots.txt · sitemap.xml
└── .nojekyll               # serve static assets as-is on GitHub Pages
```

## Run locally

Any static file server works — no build step:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding result videos

Videos are loaded by `static/js/app.js` from:

```
static/videos/<example>/<method>.mp4
```

Method file names (column order on the page):

```
reference  moft  conmo  motionclone  ditflow  ropecraft  gwtf  halo
```

Example folders: `porsche`, `motorbike`, `lion`, `penguin` (benchmark) and
`stormtrooper`, `minions`, `spongebob` (Movie Scene). Any missing `.mp4` shows a small
placeholder instead of breaking the page, so you can fill them in incrementally. To add or
rename examples, edit the `BENCHMARK_EXAMPLES`, `MOVIE_EXAMPLES`, and `METHODS` arrays at the
top of `app.js`. See [`ASSETS.md`](ASSETS.md) for the full figure/video/link map.

## Deploying updates

The page is served from the `main` branch via GitHub Pages. To publish changes:

```bash
git add -A
git commit -m "Update page"
git push
```

## Citation

```bibtex
@inproceedings{jung2026halo,
  title     = {Controlling Motion Transfer in Diffusion Transformers via Attention Heads},
  author    = {Jung, Sunyoung and Park, Jiwoo and Choi, Yoonseok and
               Choo, Kyobin and Yang, Ming-Hsuan and Hwang, Seong Jae},
  booktitle = {European Conference on Computer Vision (ECCV)},
  year      = {2026}
}
```
