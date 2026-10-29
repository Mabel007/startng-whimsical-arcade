# start.ng — Good Vibes, Good Games

A reference-led refinement of the original [start.ng](https://start.ng/) homepage, built for **HNG15 Week 5, Task 2**. It keeps the live page's cream-and-lime visual language, copy, card structure and destinations, then adds **one** small whimsical interaction to the game-selection experience: a little lime face peeks over the bottom edge of a community game card.

No arcade shell, no new games, no new navigation model.

## What was verified

Discovery was done in a real browser on **28 October 2026**:

| Source | Result |
| --- | --- |
| [start.ng](https://start.ng/) | Loaded. Full page captured at 1440px and 390px, plus the community section. Copy, cards, destinations, typography, colours and hover behaviour were read from the live DOM. |
| [start-ng-lego.vercel.app](https://start-ng-lego.vercel.app/) | Loaded. A full Start.ng homepage recreation and a useful confirmation of the approved direction. |
| [ziki-whimsy-ruby.vercel.app](https://ziki-whimsy-ruby.vercel.app/) | Loaded, but it is a separate “Ziki Den” app rather than a Start.ng page. Treated as a partial reference only. |
| [start-ng.psi.vercel.app](https://start-ng.psi.vercel.app/) | Unreachable: `ERR_CONNECTION_CLOSED` in Chromium and a TLS handshake failure via curl. Recorded as a blocker; no design was invented from it. |

The verified original uses a `#f6f5ee` cream background, `#292a23` ink, lime highlights, a Helvetica Neue-style stack, a centred ~912px content column and a sticky header. The page contains the hero (“Good vibes. Good games.”), today's tournament, daily challenge, eight categories, five new games, eight community games, a creator band, four creator picks, four build steps, an about section, six questions and a four-column footer.

## The interaction

Each community game card hides a small lime face with two eyes and a smile. It rises from the bottom edge of the cover when the card is:

- hovered with a mouse or pen;
- focused by keyboard (it stays out while focus remains inside the card);
- tapped on touch, for 900ms.

It leaves on pointer-out or focus-out. It is decorative (`aria-hidden`), so link names and screen-reader output are unchanged. Reduced motion hides it in both JavaScript and CSS. There is no sound, autoplay, canvas, particle engine or extra page.

## Deliberate deviations

The page is a rebuild, not a clone. These differences are intentional:

- **Account-gated controls cannot be reproduced.** The original header account button, “Create free account”, game favourites, leaderboard links and “Submit your game” require authentication and live APIs. They are replaced with static routes: “Play now” anchors to the community games, “Browse all games” and “Submit your game” destinations reuse verified Start.ng pages.
- **Original game thumbnails are third-party artwork.** All covers are original gradient-and-monogram artwork generated for this task. No Start.ng or creator imagery is copied.
- **“Every game on start.ng, A to Z (189)”** is omitted because it needs the live catalogue. The verified “See all 189 games” link remains.
- **Category tiles use original gradient tiles** rather than the original photographs, with a dark scrim to keep white labels readable.
- **Responsive tuning:** the header hides its primary nav below 720px (as the original does) and keeps the brand plus one action. Categories use two readable columns below 720px instead of four very narrow tiles. Community games use 4/3/2 columns and new games use 5/3/2 across desktop/tablet/mobile.

All other copy, section order, headings, card content and link destinations follow the verified original.

## Accessibility and motion

- First tab stop is **Skip to the games**.
- Semantic `header`/`main`/`footer`, one `h1`, labelled sections, and native `<details>/<summary>` for the six questions.
- Visible `:focus-visible` rings and a focused-card outline.
- The peek face is purely decorative and hidden from assistive technology.
- Hover, keyboard focus and touch each have a distinct activation path; touch lasts 900ms and does not block navigation.
- `prefers-reduced-motion: reduce` disables the face, hover lifts, sheen, transitions and smooth scrolling, both before and after JavaScript runs. The preference is subscribed live, so a runtime change settles an active peek immediately.

## Tech stack

- React 19 + TypeScript 7
- Vite 8 + plain CSS (`src/index.css`)
- Vitest 5 + Testing Library + jsdom
- Oxlint

No external fonts, images or runtime APIs are requested by the page.

## Commands

```bash
npm install
npm run dev
npm run check      # lint + typecheck + test + build
npm run build
npm run preview
```

## Validation

`npm run check` passed on the final tree:

```text
lint       oxlint: 0 warnings, 0 errors
typecheck  tsc -b: passed
test       1 file, 11 tests passed
build      vite build: passed
```

The 11 tests cover the verified hero/section copy, eight categories, five new games, eight community games and their exact destinations, four creator picks, six native FAQ items, header/footer routes, the first-stop skip link, decorative peek faces, hover/focus/blur, focus moving inside a card, the 900ms touch timer, reduced motion at load, and a live reduced-motion change.

Browser checks used the production preview in Chromium:

| Width | Result |
| --- | --- |
| 1440px | 4/5/4/4 column grids, 99.2px hero heading, no horizontal overflow (`scrollWidth 1425`) |
| 768px | 3-column games, 4-column categories, 2×2 build steps, no overflow (`scrollWidth 753`) |
| 390px | compact 64px header with nav hidden, 2-column games and categories, 44.8px hero heading, no overflow (`scrollWidth 375`) |
| 320px | same layout, no page overflow (`scrollWidth 305`) |

Also verified in the browser:

- skip link is the first tab stop and becomes visible on focus;
- “Play now” sets `#games` and scrolls to the community section;
- hover and keyboard focus both set `data-peeking="true"` and animate the face to `opacity: 1`;
- a synthetic touch `pointerdown` shows the face, still visible at 150ms and cleared after the 900ms timer;
- emulated reduced motion reports `peeking=false`, `display: none` on the face, `transition-duration: 0.00001s`, and `scroll-behavior: auto`;
- no console errors or warnings on the local page.

## Evidence

All captures are local evidence in the gitignored `.codex/` folder:

| File | What it shows |
| --- | --- |
| `refinement-original-startng-1440.png` | Live original Start.ng at 1440px |
| `refinement-original-startng-390.png` | Live original Start.ng at 390px |
| `refinement-original-community-1440.png` | Original community games section |
| `ref-lego-1440.png`, `ref-ziki-1440.png` | Approved reference captures |
| `refinement-before-arcade-1440.png`, `refinement-before-arcade-390.png` | Previous arcade deployment |
| `after-home-1440.png`, `after-home-768.png`, `after-home-390.png`, `after-home-320.png` | Rebuilt page |
| `after-peek-hover-1440.png`, `after-peek-focus-1440.png`, `after-peek-touch-390.png` | The one interaction |
| `after-reduced-motion-1440.png` | Reduced motion |
| `after-skip-link-1440.png`, `after-categories-1440.png` | Focus and category contrast |

The full task report is at `.codex/hng15-task2-reference-led-refinement.md` (gitignored).

## Project structure

```text
src/
  App.tsx                        verified homepage sections
  components/
    SiteHeader.tsx               brand, primary nav, Play now
    SiteFooter.tsx               Play / Make games / About columns
    CategoryTile.tsx             gradient category link
    CommunityGameCard.tsx        game card + the peek interaction
    MiniGameCard.tsx             new-game and creator-pick card
    CoverArt.tsx                 original gradient/monogram cover art
    Icons.tsx                    inline SVG icons and pixel mark
  data/site.ts                   verified copy, creators and destinations
  hooks/usePrefersReducedMotion.ts
  test/matchMedia.ts, setup.ts
  App.test.tsx
  index.css                      cream/ink/lime styling and responsive rules
public/favicon.svg               original pixel-mark favicon
```

## Status

Nothing has been committed, pushed, merged or deployed. The Ziki project was not modified. Link and content checks reflect the live Start.ng state on **28 October 2026**.
