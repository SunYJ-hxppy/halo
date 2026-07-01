# HALO project page — asset guide

## ✅ Figures — already wired in

Your paper figures in `static/images/` are mapped to sections as follows:

| File                          | Section on page            | Paper |
|-------------------------------|----------------------------|-------|
| `fig8_final.jpg`              | Top teaser                 | Fig. 8 |
| `fig2_final.png`              | "Why head-aware control?"  | Fig. 2 |
| `fig3_final.jpg`              | Head Analysis 1 (motion)   | Fig. 3 |
| `fig4_final.jpg`              | Head Analysis 2 (structure)| Fig. 4 |
| `fig5_final.jpg`              | Method overview            | Fig. 5 |
| `fig6_final.jpg`              | Method — SCR & SRW detail  | Fig. 6 |
| `fig7_final.jpg`              | Method — SCR/SRW effect    | Fig. 7 |
| `fig11.png`                   | More qualitative results   | Fig. 11 |
| `fig9.png`                    | Movie Scene Dataset        | Fig. 9 |
| `fig_quantitative_final.jpg`  | Quantitative (CLIP–MF plot)| —     |
| `fig10_final.jpg`             | Ablation                   | Fig. 10 |

Notes:
- `fig2_final.png` and `fig9.png` were converted from your PDFs at 3× resolution
  (the original `.pdf` files are still in the folder; browsers can't display PDFs inline).
- No Fig. 1 teaser was provided, so `fig8_final.jpg` is used as the teaser. To use a
  dedicated teaser instead, drop `static/images/teaser.jpg` and change the first `<img>` in
  `index.html`.

## ⏳ Videos — you still need to add these

Path pattern: `static/videos/<example>/<method>.mp4`

Method file names (column order on the page):
```
reference   moft   conmo   motionclone   ditflow   ropecraft   gwtf   halo
```

Example folders already created:
- Benchmark: `porsche`, `motorbike`, `lion`, `penguin`
- Movie Scene: `stormtrooper`, `minions`, `spongebob`

e.g. `static/videos/porsche/halo.mp4`, `static/videos/porsche/reference.mp4`, …
Any missing `.mp4` shows a small "add this file" placeholder, so you can fill them in
incrementally. Videos autoplay muted + loop; ~16:10 aspect looks best.

To add/rename examples or change which baselines appear, edit the `BENCHMARK_EXAMPLES`,
`MOVIE_EXAMPLES`, and `METHODS` arrays at the top of `static/js/app.js`.

## ⏳ Links — fill in the TODOs

In `index.html`, search for `TODO`:
- Paper / arXiv / Code buttons (currently `#`)
- Canonical + Open Graph URLs (currently `https://your-domain.github.io/halo-eccv2026/`)
- Author profile links (some are `#`)

Also update the URL in `robots.txt` and `sitemap.xml`.

## Archived DRIFT template assets

The previous template's media is in `static/_drift_archive/`. Delete it once you're happy.
