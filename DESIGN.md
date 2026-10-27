# DESIGN.md — Design Language Reference

Source study of two SaaS landing pages built on the same theme system ("Sasico" by PikaThemes, WordPress + Elementor):

| Code name | URL | One-line vibe |
|---|---|---|
| **EMBER** | https://sasico.pikathemes.site/help-desk/onepage/ | Warm, soft, airy AI help-desk. Peach-cream canvas, coral-orange accent, flowing orange silk ribbons, glowing orbit icon. Gentle and premium. |
| **LIME** | https://sasico.pikathemes.site/onepage/ | Crisp, high-contrast productivity SaaS. Pure white + ink black + electric lime. Blurred lime "sunrise" glows, fine grid lines, rotating dotted rings. Confident and techy. |

Everything below was extracted from the live HTML/CSS (Elementor per-element CSS, theme `style.css`, `plugin-addon.css`, Kirki vars) and from the actual image assets, not guessed. Values are desktop unless noted.

> ⚠️ Use this as a *design language*, not a clone. Don't ship their images, logos, illustrations, or copy. Recreate the patterns with our own assets (Tukiio).

---

## 1. Shared DNA (what both pages have in common)

These are the rules that make both pages feel like the same family. Keep them no matter which palette we choose.

1. **Two-font system.** Headings, buttons, eyebrows, nav: **Plus Jakarta Sans** (600–700). Body, paragraphs, lists, prices' units: **Inter** (400–500).
2. **Tight, heavy headlines.** Bold (700) with **negative tracking ≈ −0.03em** (e.g. 48px → −1.44px, 70px → −2.1px, 48px price → −2.4px = −0.05em).
3. **Mid-gray body text, never black.** Body copy is `#706F6B` (EMBER, warm gray) or `#696969` (LIME, neutral gray). Headings are pure black / ink.
4. **One accent color, used sparingly.** Accent only on: primary buttons, icon chips, check icons, eyebrow pills, glows, chart bars. Everything else is black / white / gray.
5. **Pill everything interactive.** Buttons, nav hover states, eyebrow tags, pricing toggle, badges, email input → `border-radius: 999px`.
6. **Soft rounded cards.** Cards and panels: **14–15px** radius (inner elements 10px). Thin **1px hairline borders** using the accent or ink at 6–15% alpha. Almost no drop shadows.
7. **Button = label + circular arrow chip.** The signature CTA: a pill button with text on the left and a round icon "chip" (dark circle, white arrow) tucked inside on the right. On hover, the button and chip swap colors.
8. **Atmosphere, not illustration.** Backgrounds are huge blurred color glows (gaussian blur 100–350px), faint grids/lines, and gradients that fade to transparent. Product UI screenshots are the "illustrations".
9. **Centered section intros.** Each section opens with: eyebrow → H2 (max ~500–600px wide) → short gray paragraph (max ~500–660px), centered. Split (left-aligned) intros are used for 2-column feature rows.
10. **Gentle entrance motion.** Every block fades/slides in on scroll (fadeInUp is the default), with small staggered delays (100–800ms). Slow infinite rotations on decorative rings.
11. **Boxed 1290px content** inside full-bleed colored bands; generous vertical padding (100–220px for hero, ~100–120px between sections).

---

## 2. Color Tokens

### 2.1 EMBER (Help Desk)

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#FF6733` | Primary buttons, icon chips, checks, chart bars, orbit dots, social hover |
| `--accent-glow` | `#FF6733` @ 10–20% | Image shadows `0 0 50px rgba(255,103,51,.2)`, `10px 4px 60px rgba(255,103,51,.1)` |
| `--accent-border` | `#FF67331A` (10%) / `#FF673326` (15%) | Card & panel hairline borders |
| `--accent-tint` | `#FF67330D` (5%) | Pricing card background |
| `--cream` | `#FFF0EB` | Hero band, section bands, accordion items, inner feature panels, list boxes |
| `--ink` | `#000000` | Headings, dark pricing card, nav hover, dark button |
| `--text` | `#706F6B` | Body text, nav links, eyebrow text, footer links |
| `--text-strong` | `#0F172A` | Pricing feature list items |
| `--white` | `#FFFFFF` | Cards, header pill, footer panel |
| `--line` | `#0000001A` / `#00000012` | Neutral hairlines (pricing cards, light buttons, social icons) |

Character: **warm, sunset, peach.** Orange is luminous, never muddy. Background never pure white at the top — it's cream `#FFF0EB` with orange silk ribbons.

### 2.2 LIME (Onepage)

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#B9FB6A` | Primary buttons, eyebrow pills, "popular" badge, glows, chart bars, toggle discount tag, back-to-top icon |
| `--accent-tint` | `#F1FEE1` | Section bands (features, how-it-works), popular pricing gradient, default eyebrow bg, form inputs |
| `--ink` | `#0E0E0E` | Headings, dark buttons, icon chips, hover-filled cards, back-to-top bg |
| `--text` | `#696969` | Body text, footer column titles, icons in lists |
| `--gray` | `#EEEEEE` | Borders, nav hover bg, outline button border, dividers |
| `--white` | `#FFFFFF` | Page bg, cards |
| Ink alphas | `#0E0E0E09 / 0D / 10 / 12 / 1A / B3` | Icon chip borders, card gradients, card borders, muted paragraph (`B3` = 70%) |
| Stars | `#FF9D2C` | Testimonial ratings (empty = `#0e0e0e15`) |

Character: **clean, electric, high-contrast.** Lime is used like a highlighter on a white/black page. Note: lime is too light for text — never use it as a text color on white; text on lime is always ink `#0E0E0E`.

### 2.3 Theme variable skeleton (both use the same names)

```css
:root {
  --sasi-color-primary:   #B9FB6A;   /* EMBER: #FF6733 */
  --sasi-color-dark:      #0E0E0E;   /* EMBER: #000000 */
  --sasi-color-text-main: #696969;   /* EMBER: #706F6B */
  --sasi-bg-color-green:  #F1FEE1;   /* EMBER: #FFF0EB  (the "tint" band color) */
  --sasi-color-gray:      #EEEEEE;
  --sasi-border-color:    #EEEEEE;
  --sasi-border-focus-input: #0e0e0e80;
  --sasi-color-placeholder-input: #0e0e0e60;
  --sasi-bg-dark-overlay: #0e0e0ed0;
  --sasi-radius-main: 14px;
  --sasi-radius-rounded: 999px;
}
```
The whole theme is re-skinnable by swapping **primary / dark / text / tint** — that's the key insight for us: build one component system, theme it with 4 variables.

---

## 3. Typography

Fonts (Google Fonts): `Plus Jakarta Sans` (500/600/700) and `Inter` (400/500). Body: `-webkit-font-smoothing: antialiased`.

### 3.1 Base scale (theme defaults)

| Role | Font | Size / Line-height | Weight | Notes |
|---|---|---|---|---|
| H1 | Jakarta | 85 / 92 | 700 | LIME hero |
| H2 (section title) | Jakarta | 48 / 55 | 700 | tracking −1.44px (EMBER) |
| H3 | Jakarta | 22 / 44 | 600 | |
| H4 | Jakarta | 20 / 40 | 600 | card titles |
| H5 | Jakarta | 24 / 36 | 600 | |
| H6 | Jakarta | 18 / 32 | 600 | |
| Body | Inter | 16 / 26 | 400 | color `--text` |
| Lead paragraph | Inter | 18 / 30 (EMBER), 22 / 35 (LIME hero) | 400–500 | |
| Button | Jakarta | 16 / 1 | 600 | |
| Eyebrow | Jakarta/Inter | 16–22 / 1 | 500 | |
| Nav link | Inter | 16–17 | 500 | |
| Footer link | Inter | 18 / 40 (LIME 34) | 400–500 | |

### 3.2 Hero headline — responsive steps

- **EMBER H1**: 70/75, −2.1px → 56/1.2em (tablet) → 42 (mobile). Left-aligned, ~58% column width.
- **LIME H1**: 85/92 → 75/84 (≤1399) → 62/72 (≤1199) → 56/65 (≤991) → 38/44 (≤575). Centered, max-width 985px. Eyebrow above it scales 22 → 18 → 16 → 14.

### 3.3 Specific type moments worth copying

- **Mission statement (EMBER):** a single centered H2-size paragraph (700, line-height 60px, −1.44px), max-width 830px, sitting under a glowing orbit icon. Reads like a manifesto.
- **Price:** 48/55, 700, **−2.4px**, next to a small `/month` in Inter 16/500 gray. LIME splits it as `$` + `30` + `/per month cost`.
- **Testimonial quote (EMBER):** Jakarta 16/600 black — quotes are *bolder* than body text. Name 24/600, role 14/500 gray.
- **Card titles** 20–22px/600 with −0.66px tracking; descriptions 16/26 gray.
- **"Popular" badge (LIME):** Jakarta 16/600 UPPERCASE, line-height 16px, lime pill `3px 15px`, absolute top-right 15px.
- **Footer giant wordmark (LIME):** brand name as a full-width outlined SVG (~1345px wide, stroke at 10% opacity) behind the bottom bar.

---

## 4. Spacing, Layout & Breakpoints

- **Container:** content width **1290px** (LIME sets `--content-width:1290px`); Elementor base 1140px. Side gutter 15px on mobile.
- **Section rhythm:** hero top padding 220px (EMBER) / 210px (LIME) to clear the floating header → 180/170 → 160/135 on smaller screens. Section bands use 70–100px inner padding; CTA bands 90–100px.
- **Column gaps:** 30px standard; 50–60px for split feature rows; 15px for tight bento; 100px between logo items.
- **Column ratios:** 58.34% / 41.66% (7:5) splits are used constantly in EMBER (hero, feature bento, testimonials). 50/50 in LIME. Pricing = 3-col grid, gap 30px. LIME features = 3×2 grid.
- **Intro widths:** H2 block 490–570px; paragraph 480–660px.
- **Widget spacing:** 20px default between widgets; heading→paragraph 20px; paragraph→button 30–50px; intro→content 50–70px.

**Breakpoints** (Elementor custom): `≤1399` (laptop), `≤1199`, `≤991` (tablet — 2-col → stack), `≤767` (mobile landscape), `≤575` (mobile). Mobile header swaps to logo + search + hamburger.

---

## 5. Radius, Borders, Shadows

| Thing | Value |
|---|---|
| Cards / panels / images | **14px** (EMBER) / **15px** (LIME) |
| Inner panels, list boxes, icon chips | 10px |
| Large feature mockup images | 30px (EMBER chat image) |
| Header bar (EMBER) | 50px (full pill) |
| Buttons, pills, inputs, switch | 999px |
| Circular avatars / icon chips | 50% |
| Default hairline | `1px solid` accent @10–15% (EMBER) or `#EEEEEE` / ink @10% (LIME) |
| Shadows | Basically none. Exceptions: sticky header `0 0 10px rgba(0,0,0,.1)`; EMBER image glow `0 0 50px rgba(255,103,51,.2)` and `10px 4px 60px rgba(255,103,51,.1)`; EMBER orbit chip `0 4px 60px #FF6733`; testimonial hover `10px 4px 60px rgba(179,179,179,.25)` |

Rule: **depth comes from color glows and tints, not from shadows.**

---

## 6. Backgrounds & Atmosphere (the "vibe" makers)

### 6.1 EMBER
- **Hero band:** cream `#FFF0EB` + a wide **flowing orange silk/wave ribbon** image anchored bottom-center, plus a second faint gray line-wave texture layer at the top-left. Feels like warm light through fabric.
- **Mid-page band** ("Revolutionary AI tools"): same recipe — cream + orange wave at bottom + faint wave lines on top.
- **Panels:** cream panels with very soft peach→transparent radial corner gradients (`bg-group1/2`, `bg-testi`, `bg-dash-small`): white card with a peach glow bleeding in from one corner.
- **Graph backdrop:** a big peach-to-white soft gradient panel behind floating chart cards.
- **Dark pricing card:** pure black with a subtle orange glow image.
- **3D accents:** two iridescent glass torus/ring shapes (holographic blue/purple/cyan) floating absolutely at the hero image edges (300px / 260px wide, left/right 16px), with slow float animation. They add a "premium AI" futurism to the warm palette.
- **Orbit icon:** 300×300 SVG — two concentric circles (r=148, r=98, orange stroke @10%), tiny orange dots orbiting (outer ring 30s clockwise, inner ring 20s counter-clockwise, 2 dots each, offset by negative animation-delay). In the center, an orange circle chip (padding 29px, 40px icon) with a strong `0 4px 60px #FF6733` glow.

### 6.2 LIME
- **Hero glow (`hero-banner.svg`, 1920×1793):** a huge lime ellipse (rx≈1075) blurred with `stdDeviation=150`, then a white circle blurred on top of it, plus a small lime circle peeking from above → a **lime "sunrise" halo** at the top of the page fading into white. Over it, a **square grid pattern** (70px cells) in ink @7% that fades out.
- **Section washes (`bg-linear` SVGs):** lime circle blurred `stdDeviation 200–350` sitting *above* the section's top edge (so only the bottom of the glow shows) + **thin vertical lines every 57px** (1px, ink @2–10%, fading via linear gradient). Used on the features band (bg `#F1FEE1`), how-it-works card, and pricing.
- **Rotating rings:** two gigantic (48vw) dotted rings placed at −460px left / −440px right of the hero, top −320px. SVG circle r=457, ink stroke @10% 0.5px, with 8 small black dots on it; `.rotating { animation: spin 15s linear infinite }`, pauses on hover.
- **Icon-box corner glow:** each feature card has a small lime blurred circle (stdDeviation 100) in the top-right corner (`::after`).
- **CTA band:** solid lime with a faint dotted world-map texture and vertical stripes, 15px radius.
- **Footer:** a lime blurred half-circle glowing up from the bottom center + giant outlined brand wordmark.

---

## 7. Components

### 7.1 Header / Navigation
**EMBER:** Floating **white pill bar** (radius 50px, padding 16px 22px), 20px from the top, over the cream hero. Logo (130px) left · nav center (gap 32–45px, Inter 500, `#706F6B`, hover → black with underline `::after`) · single primary **"Sign Up" icon button** right. Becomes sticky: full white with `0 0 10px rgba(0,0,0,.1)`.

**LIME:** Transparent full-width bar, 10px from top. Logo (177px) 16–20% · nav 65% centered, each link padded `8px 21px`, 17px, and on hover gets a **gray pill background** (`#EEEEEE`, radius 30px) · right side: **two buttons** "Sign Up" (primary lime) + "Log In" (dark/outline). Sticky: white bg + soft shadow.

Mobile: logo + search icon + 3-bar hamburger (bars 26×3px, `#0E0E0E`, rotate to X when active, 0.3s ease).

### 7.2 Buttons (`.sasi-btn`)
Base:
```css
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:10px;
  font: 600 16px/1 "Plus Jakarta Sans";
  padding:16px 25px; border-radius:999px; border:1px solid var(--btn-border);
  color:var(--btn-color); background:var(--btn-bg);
  transition:all .3s linear;
}
.btn .chip {           /* circular arrow chip */
  padding:12px; font-size:14px; line-height:0; border-radius:100%;
  background:var(--ink); color:#fff; border:1px solid var(--ink);
  transition:all .3s;
}
/* Icon variant: tight padding so the chip hugs the edge */
.btn--icon { padding:4px 5px 4px 25px; }   /* header: 5px 5px 5px 21px, chip padding 8px, icon 12px */
```
Variants (hover in brackets):
| Variant | Default | Hover |
|---|---|---|
| **primary** | accent bg, ink label, ink chip w/ white arrow | ink bg, white label, **white chip w/ ink arrow** |
| **dark** | ink bg, white label, white chip w/ ink arrow | accent bg, ink label, ink chip w/ white arrow |
| **outline_1** | transparent, `#EEE` border, accent chip | accent fill, chip → ink |
| **outline_2** | transparent, no border, ink chip | ink fill, chip → white |
| **light (pricing)** | white bg, ink @10% border, ink chip | (LIME: border → lime) |
| **long** | full-width, `justify-content:space-between` (label left, chip far right) | — used in pricing cards, EMBER uses gap 60px / left padding 70px |

The chip-swap on hover is the single most recognizable micro-interaction. Always arrow → (`ss-arrow-right` icon).

### 7.3 Eyebrow / Section heading (`.sasi-heading`)
```html
<div class="heading">
  <span class="heading__sub">Best SaaS Features</span>
  <h2 class="heading__title">Intelligent Features. Real Results.</h2>
</div>
```
- **LIME eyebrow = pill tag:** `padding:12px 28px; border:1px solid #EEE; border-radius:999px; font:500 16px/1; background:#F1FEE1` (most sections override to solid lime `#B9FB6A`; on the lime CTA band it's white). Optional inner mini-pill (`span` absolutely positioned, accent bg, white text) for "NEW"-style tags.
- **EMBER eyebrow = plain text:** same element but transparent bg/border, padding 0, `#706F6B`, **20px**. Softer, editorial.
- Title: 700, 48/55 (LIME pricing uses 32px; CTA 30px), EMBER adds −1.44px tracking. `<br>` hidden on mobile.
- Alignment centered by default; left-aligned for split rows. Mobile: eyebrow 14px, padding 10px 20px.

### 7.4 Icon box / feature card (`.sasi-icon-box`)
Base: flex column, gap 46px, padding 50px, 1px border `rgba(0,0,0,.1)`, radius 15px, `overflow:hidden`, white `::before` layer and a hidden `::after` layer that fades in on hover (opacity 0 → 1, 0.25s linear). Icon chip is a rounded square (14–15px radius).

Variants seen:
- **LIME feature grid (3×2):** left-aligned, padding 40px, gap 40px, border `#FFFFFF10`, icon chip with **lime→transparent vertical gradient** background (`linear-gradient(180deg,#B9FB6A,#B9FB6A00)`) and ink @4% border, title 21px, small lime glow in top-right corner. Hover: border → ink.
- **LIME "How it works" steps (3 cards):** padding 40px 30px, border `#EEE`, `::after` = solid ink. **Hover: whole card fills black**, title → white, description → `#EEE`. Big, satisfying inversion.
- **EMBER tools (4 cards around a center panel):** left-aligned, padding 40px 40px 35px, border accent @15%, orange 40px line icon (no chip), **title then a big 145px gap** (80px on tablet) before the description → tall, airy cards that anchor content to top & bottom.
- **EMBER orbit chip:** centered, circular, orange glow (see 6.1).
- **Pricing header (LIME):** icon chip with ink @7% → transparent gradient, title 24px, description.

### 7.5 Bento feature panels (EMBER "Unlock the potential of AI features")
Two rows of 2 cards with alternating widths **41.66% / 58.34%**, then flipped (row-reverse) on the next row. Each card: outer 1px accent @10% border, 14px radius, **10px padding** → inner cream panel (`#FFF0EB` + corner glow image, radius 10px, min-height 370px) holding a floating UI snippet (integration icon cluster, "How can I help you?" chat prompt with orange mic/send button, mind-map nodes "Research / Wireframe / Prototype / Idea & Design" around an orange node, a target chart). Below the panel: title 22/600 (−0.66px) and description 16/26 gray, both indented 20px. Inner chips: Jakarta, centered inline list with small black icons ("Conversational Actions · Seamless Conversational Flow").

### 7.6 LIME feature collage
Hero-adjacent section with 3 columns (25% / 53% / 25%): left and right columns stack tall rounded feature tiles (transparent-bg illustrations: big lime "brand mark", chat bubbles with lime bot avatars, app-icon orbit, database/sync circles) each with a 2-line caption baked in at the bottom (24–28px, 500). Center column: a wide analytics tile ("2h 20m Average time…" bar chart in ink + lime) above two text features (title 20/600 ink, text gray) and an icon list ("Easy Drag-and-Drop Builder", "Multi-Channel Support") with 50px spacing.

### 7.7 Product screenshots / data cards
- Dashboard hero image: light UI, rounded 14px, soft accent glow shadow (EMBER) or plain (LIME, zooms in).
- Floating stat cards: white, rounded, minimal: "Target $569K" area chart, "March 2025 · 45623 visitors this month" donut ring, "Watchlist" sparklines rows, "Today: High spending" bar chart with accent bars and a pill tooltip. **All in accent + black + gray only.** LIME equivalents: "Overview Income" horizontal bars alternating ink and lime gradient with white value pills; "Performance by Device" donut (lime/orange/ink); sales dashboard with lime highlight card.
- Placed on a soft gradient panel (EMBER peach panel, LIME `#F1FEE1` with faint grid), image border 1px accent @15%, radius 14px, inner padding 30px.

### 7.8 Icon lists
- Default: 16px icon, `margin-right:10px`, ink color, label beside.
- **Stacked:** icon in a circle (padding .5em, accent bg, white glyph) — EMBER hero eyebrow ("AI-Powered Automation", 20px/500 black), pricing checks (14px icon, 5px padding).
- Accent-colored checks for feature bullets (EMBER `#FF6733`, label black 500).
- Numbered list in a cream box (EMBER: `#FFF0EB`, 1px `#0000001A`, radius 14px, padding 20px 50px, line-height 40px): "1. Intelligent Workflow Automation…".
- Pricing feature list (LIME) is inside its own white rounded box (`#EEE` border, radius 10px, padding 7% 9%).

### 7.9 Accordion / FAQ (`.sasi-acc`)
- Items separated by 10–15px ("has-distance"), each its own rounded box (radius 10–14px), 1px border.
- Title: Jakarta 18–20/600, padding ~24px 80px 24px 50px (EMBER tightens to 25px 20px 25px 25px). Toggle icon = small **circular chip** on the right (13px icon, 10px padding): idle gray bg, **open → accent bg** with white icon, chevron flips down→up.
- Content: gray text, padding 0 60px 28px 25px.
- EMBER "build & scale" accordion: cream items (`#FFF0EB`), accent @10% border, orange plain chevron. EMBER FAQ: white items, accent @15% border, orange filled chip. Questions numbered "1. What is AI automation?".
- Style-2 (available): borderless rows with bottom hairline, current row becomes a bordered rounded box.

### 7.10 Pricing
**EMBER:** 3-col grid, gap 30. Cards: radius 14px, padding 40px, border `#00000012`. Side cards: bg accent @5% (`#FF67330D`). **Middle card: solid black** with subtle orange glow, all text white. Structure: plan name (20/600) → `$39` (48/700, −2.4px) + `/month` → tagline "Powerful & Simple Solution" (30px top margin) → **long button** "Choose Package" (white bg, chip black) → "Features:" (20/600) → check list (stacked orange circle checks, Inter 16, 20px spacing).

**LIME:** Section opens with eyebrow + 32px title + paragraph + **pill toggle**: white pill container (padding 10px, `#EEE` border) with `Monthly` / `Yearly [Save 23%]` options (Jakarta 500, padding 13px 20px); active option = **ink pill with white text**; the discount is a tiny lime pill (12px, padding 5.5px 10px). Two complete card sets swap (monthly/yearly). Cards (450px): ink @5% → transparent vertical gradient bg, ink @10% border, padding 9%. **Popular card: lime-tint gradient (`#F1FEE1` → transparent)** + absolute "POPULAR" lime badge. Structure: gradient icon chip → plan name 24px → description → `$ 49 /per month cost` → full-width button ("Start 14th Days Free Trial") → "No credit card required" note → white features box. Cards bounceIn on entry.

### 7.11 Testimonials
**EMBER (editorial bento):** 2 rows, 58/42 then 42/58. Big card = portrait photo (250px wide, radius 14px, dramatic colorful AI-art style portraits) + name "James Anderson," 24/600 + role 14/500 gray + **bold quote** (Jakarta 16/600) + company logo at the bottom. Small card = text only with logo. White cards with peach corner glow, accent @15% border, padding 40–50px.

**LIME (carousel):** owl carousel of cards: padding 27px 30px, 1px `#EEE`, radius 15px. Content: **bold title quote** ("This platform transformed how we manage.") → quote text → 40–50px round avatar → "Name, Role" inline → orange star rating. Hover: soft gray shadow. Dots below (25px margin): active dot scales 1.5× and turns accent / custom dots get an ink ring.

### 7.12 Logo strip ("Trusted by over 1.7 million companies worldwide")
- **EMBER:** inside a 14px-radius panel with accent @10% border and peach glow bg, padding 70px; centered heading 20/600; 5 monochrome SVG logos (gray `#706F6B`, 25–30px tall) gap 100px, **hover → orange**. fadeInUp staggered.
- **LIME:** headline 500 ink, then an autoplay **carousel of 8 logos** (70px margin, 7s, loop, no arrows/dots), gray → **ink on hover**.

### 7.13 Forms & inputs
- Base input: white bg, ink text, 1px `#EEE` border, padding 20px, no radius by default, focus → border ink @50%, 0.3s transition. Placeholder ink @38%.
- **Hero email capture (LIME):** 700px wide pill input (`padding:24px 230px 24px 30px; border-radius:35px`) with the primary "Request a Demo" icon button **absolutely inside the input on the right** (top 10px, right 10px). Dark variant available (black input, white button on hover).
- **Contact block (LIME):** left column = left-aligned heading with bottom divider (`#EEE`, 60px padding below) then a 2-col grid of contact items (big 35px icons: "Need Helps" email/phone in Jakarta 18/600 ink, "Main Address"); right column = bordered form card (padding 50px, radius 14px, `#EEE` border) titled "Need Any Helps? Say Hello", fields Name + Phone (2-col), Email, Message (textarea 130px), primary icon button "Send Message Us".

### 7.14 CTA band (pre-footer)
- **EMBER:** cream `#FFF0EB` band with soft glow bg, two side images (bordered rounded chart cards, peach gradient backdrops) flanking a centered block: plain eyebrow "Simplify Your Finances" → H2 "Begin automating smarter workflows today" (max 572px) → gray paragraph → primary button "Get 14-days Free Trials".
- **LIME:** solid lime rounded (15px) band, padding 100px 30px: white eyebrow pill "Launch with ease" → 30px title → ink paragraph (540px) → button (hover white). Margin-bottom 120px before the footer.

### 7.15 Footer
- **EMBER:** white rounded panel (radius 14px, padding 70px 70px 45px) sitting on cream. Left (≈66%): logo, one-line mission (gray), social icons (18px icons in white circles with `#0000001A` border, **hover → orange fill, white icon**). Right: 3 link columns ("Product / Company / Support"), headings Jakarta 18/500 black, links Inter 18/40 gray. Bottom bar: "© All rights reserved" left, Terms/Privacy right.
- **LIME:** brand column (40%: logo 177px, 70%-width description, social icons transparent with ink @6% border, hover `#EEE` bg) + 4 link columns ("Product / Company / Features / Links"): headings 18/500 **gray**, links **ink** 18/34-40 500, hover → gray (inverted from EMBER). Below: **giant outlined brand wordmark** full width, lime glow ellipse rising behind it, then a white bar (border top/bottom, pulled up −50px over the wordmark) with copyright left and a **"Back to top"** text button with a tiny ink chip that turns lime on hover.
- Floating `#back-to-top`: 45px circle, ink bg / lime icon (EMBER: orange bg / white icon), fixed bottom-right 40px, fades in on scroll, lifts 5px on hover.

### 7.16 Preloader
Full-screen white overlay, centered logo (180px) pulsing (scale 1 → 1.1, opacity .8 → 1, 1.5s infinite) + optional blinking caption (letter-spacing 2px). Fades out over 0.8s when the page loads.

---

## 8. Motion

| Pattern | Spec |
|---|---|
| Scroll entrance | Elementor/animate.css: **fadeInUp** (default for headings, text, buttons), fadeIn (EMBER hero), fadeInLeft/Right (side cards), zoomIn (hero dashboard, charts), bounceIn (LIME pricing cards, integration diagram), slideInLeft/Up/Right (LIME 3 steps), fadeInDown (LIME logo heading). Duration ~1s. |
| Stagger | Delays in 50–150ms steps (EMBER: 100/150/200/250/300…), LIME uses broader 200/400/600/800ms. Eyebrow → title → text → button cascade. |
| Hover transitions | `all .3s linear` on buttons, links, icons, cards; `.25s linear` on card overlay layers; nav `.2s ease-out`. |
| Button hover | color swap + chip inverts (see 7.2). |
| Card hover | border → ink; LIME steps fill black; testimonial gets soft shadow. |
| Decorative loops | Orbit dots: 30s / 20s linear infinite, opposite directions. LIME rings: `spin 15s linear infinite`, paused on hover. Floating 3D shapes: `image_animation` keyframes = slow wander `translate(0,0) → (25px,-25px) → (0,-35px) → (-25px,-25px) → (0,0)`. |
| Marquee (available) | `translateX(0) → translateX(calc(-100% - var(--gap)))` for logo/text strips. |
| Carousels | Logos autoplay 7s loop; testimonials with dots. |
| Sticky header | Pinned on scroll, white bg + `0 0 10px rgba(0,0,0,.1)`. |

Overall motion personality: **calm and slow.** Nothing bouncy except pricing cards. Respect `prefers-reduced-motion` in our build (they don't).

---

## 9. Page Blueprints (section order)

### EMBER — Help Desk
1. **Header** — floating white pill nav.
2. **Hero** (cream + orange silk) — split 58/42: left = stacked-icon eyebrow "AI-Powered Automation" + H1 "Boost productivity through AI-Powered automation"; right (indented 90px) = avatar stack (3 faces + orange "+" circle) "10m+ trusted clients" + lead text + "Request a Demo". Below: full-width dashboard screenshot with orange glow, two iridescent 3D rings floating at its edges.
3. **Mission** — orbit glow icon + big centered manifesto sentence.
4. **Logo panel** — "Trusted by over 1.7 million companies".
5. **AI features bento** — 4 cards (41/58 alternating).
6. **Tools** — cream band with orange wave; 4 tall icon cards around a center "How can I help you?" AI prompt mock + numbered feature list.
7. **Scale AI teams** — split: heading + text + accordion (3 items) | chart image on peach gradient panel.
8. **No-code** — reversed split: chart image | heading + text + orange check list + "Get Started With Free".
9. **Testimonials** — editorial bento (photo cards + quote cards).
10. **Pricing** — 3 cards, black middle.
11. **FAQ** — bordered split panel: heading + numbered accordion | image.
12. **CTA** — cream band, side images, centered pitch.
13. **Footer** — white rounded panel.

### LIME — Onepage
1. **Header** — transparent, nav pills, Sign Up + Log In.
2. **Hero** (lime sunrise glow + grid + rotating rings) — centered: lime eyebrow "Run Your Business on Autopilot" → H1 "Next-Gen Tools for High-Performing Teams" (85px) → lead (765px) → email pill + "Request a Demo" → big dashboard (zoomIn).
3. **Logo carousel**.
4. **Feature collage** (25/53/25 tiles).
5. **Feature grid** — `#F1FEE1` band, 6 icon cards (3×2).
6. **Integrations** — centered intro + button + wide integration diagram SVG (bordered rounded strip with app-logo circles on dividers).
7. **How it works** — lime-tint rounded card, 3 step cards that turn black on hover.
8. **All-in-one** — split: text + button | performance card.
9. **Analytics** — reversed split: analytics card | text + list + button.
10. **Pricing** — toggle + 3 cards (popular in the middle).
11. **Testimonials carousel**.
12. **Contact** — info grid + form card.
13. **CTA** — lime band.
14. **Footer** — columns + giant outlined wordmark + lime glow + back-to-top.

---

## 10. Imagery & Iconography

- **Product UI is the hero art.** Light-mode dashboards, floating stat cards, chat prompts — rendered only in the page's accent + ink + gray. Rounded corners, lots of white.
- **Illustrations are mini UI fragments**, not characters: icon clusters of real app logos, chat bubbles, mind-map nodes, sync circles.
- **Icons:** thin-line custom SVG icons (40px in cards, 30px in steps, 24px in pricing); arrow-right glyph in every button chip. Mono, filled with `currentColor`.
- **People:** EMBER uses dramatic, saturated, AI-art-style portrait photos (rounded rectangles). LIME uses small circular headshots on solid colored backgrounds.
- **3D:** EMBER only — iridescent glass rings for a futuristic sparkle against the warm palette.
- **Logos:** monochrome, hover to accent/ink.

---

## 11. Voice & Copy Patterns

- Short, benefit-led headlines, often two short sentences or a "X. Y." rhythm: "Intelligent Features. Real Results.", "Flexible Pricing for Every Stage", "Easy Steps to Get Started".
- Eyebrows are 2–4 word category labels: "AI-Driven Features", "How It Works", "Choose a plan", "Valuable Feedback", "Launch with ease".
- Social proof numbers everywhere: "10m+ trusted clients", "1.7 million companies", "Save 23%", "60% fewer manual tasks".
- CTAs are action + low friction: "Request a Demo", "Get 14-days Free Trial", "No credit card required", "Explore All Integration".
- (Their copy has typos — "Need Any Helps", "Start 14th Days" — don't inherit those.)

---

## 12. Building It for Tukiio — Recommendations

1. **Pick one base mode** (or offer both as themes):
   - **EMBER mode** if Tukiio should feel warm, human, supportive (help, community, service).
   - **LIME mode** if Tukiio should feel sharp, fast, technical (tools, productivity, dev).
   - Or a **hybrid**: LIME's crisp white/ink structure, grid lines and pill eyebrows + EMBER's editorial touches (plain-text eyebrows for some sections, manifesto statement, bento testimonials, dark middle pricing card), all driven by Tukiio's own accent color.
2. **Implement tokens first** (4 core vars: `--accent`, `--ink`, `--text`, `--tint` + alpha variants) so the whole system re-skins like the original theme.
3. **Core components to build** (in order): Button (with chip + variants) → Eyebrow/SectionHeading → Card/IconBox (+ hover-invert variant) → Header (pill + sticky) → Accordion → Pricing card + toggle → Testimonial card/carousel → Logo strip → Email capture → CTA band → Footer (with giant wordmark).
4. **Atmosphere helpers:** reusable `<Glow>` (blurred circle, color, size, blur, position), `<GridLines>` (vertical lines / square grid with fade mask), `<Orbit>` / `<RotatingRing>` SVG components.
5. **Motion:** IntersectionObserver-based fadeInUp with stagger (100ms steps), `transition: all .3s linear` defaults, slow infinite spins, all wrapped in `prefers-reduced-motion`.
6. **Accessibility upgrades over the source:** don't put white or gray text on lime; ensure `#706F6B`/`#696969` body text stays ≥ 16px on white (both pass AA at ~5:1); real `<button>`s for accordion/toggle; visible focus rings (use ink @50% like their inputs).

### Quick-start CSS (LIME default, EMBER override)

```css
:root{
  --accent:#B9FB6A; --ink:#0E0E0E; --text:#696969; --tint:#F1FEE1;
  --line:#EEEEEE; --bg:#FFFFFF;
  --font-head:"Plus Jakarta Sans",sans-serif; --font-body:"Inter",sans-serif;
  --r-card:15px; --r-inner:10px; --r-pill:999px;
  --container:1290px; --ease:all .3s linear;
}
[data-theme="ember"]{
  --accent:#FF6733; --ink:#000000; --text:#706F6B; --tint:#FFF0EB;
  --line:#FF67331A; --r-card:14px;
}
body{font:400 16px/26px var(--font-body);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,h5,h6{font-family:var(--font-head);color:var(--ink);margin:0 0 20px}
h1{font-size:85px;line-height:92px;font-weight:700;letter-spacing:-.03em}
h2{font-size:48px;line-height:55px;font-weight:700;letter-spacing:-.03em}
.eyebrow{display:inline-block;padding:12px 28px;border:1px solid var(--line);border-radius:var(--r-pill);
  background:var(--accent);color:var(--ink);font:500 16px/1 var(--font-head);margin-bottom:10px}
.card{border:1px solid var(--line);border-radius:var(--r-card);padding:40px;background:#fff;transition:var(--ease)}
```
