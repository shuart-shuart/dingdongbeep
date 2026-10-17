# dingdongbeep! — self-hosted website archive

Consolidated offline-friendly static archive assembled from the supplied homepage restoration and four additional Wayback saved pages. No WordPress server, npm, database, or Wayback Machine is needed to **serve** these five pages.

## Pages

- `/` — interactive homepage, including locally bundled p5.js and p5.sound; audio requires user gesture.
- `/notes/` — saved Notes page.
- `/works/` — saved Works page.
- `/info/` — saved On the Move / Info page.
- `/credits/` — saved Credits page.

## Publish to GitHub Pages

1. Extract the ZIP and upload **its contents** (especially `index.html`, the four page directories, and `assets/`) to the root of a GitHub repository.
2. In **Settings → Pages**, select **Deploy from a branch**, `main`, `/(root)`.
3. Visit the URL GitHub Pages provides. Links are relative and work at repository subpaths.

To preview locally: `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Embed into a portfolio

Use an iframe pointing to the *published* GitHub Pages URL, or host this archive in a subfolder of your portfolio's static/public directory. `embed-example.html` is provided; change its iframe `src` to your deployed archive URL if embedding elsewhere. Keep archive CSS/JS isolated from your portfolio styles.

## Preservation / limitations

- No Internet Archive playback scripts, analytics, remote scripts, server calls, or WordPress runtime are included on the additional pages.
- The **supplied files do not contain every image linked in the saved galleries**. Available original images are bundled; missing files are not invented. See `ARCHIVE-AUDIT.json` for counts and references.
- Saved content and layout are kept as closely as possible, but original Elementor slide carousels, certain animated effects, remote embeds (including sound/video players), and some missing media cannot be fully restored from these files alone. A lightweight local image enlarger replaces the Elementor lightbox.
- Some outbound **editorial/artist links** still lead to external websites by design; they are not required for the archived pages to load. There is also one homepage attribution link to the original Wayback source.
- Original externally hosted fonts are not included, so system fallbacks may change text metrics.
- Static asset/path tests are run; full browser visual and audio checks have not been performed. Please test on desktop and mobile before publishing.
- Respect the copyright and permissions of original artists, photographers, designers, and collaborators when publishing publicly.

## Source provenance

- Supplied `dingdongbeep-github-ready.zip` for restored homepage and 13 local letter PNGs.
- Supplied `Archive 2.zip` for Notes, Info, Works and Credits capture pages and their local photos and CSS.
- `ARCHIVE-AUDIT.json` gives bundled asset provenance and missing media references.
