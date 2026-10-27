# DESIGN.md — Design Language Reference

Source studied: **BrightHub — Ecommerce Chatbot SaaS One Page**
<https://brighthub.casethemes.net/ecommerce-chatbot-saas-one-page/>

Inspected live in Chrome on 2026-10-27 at a 1392px-wide desktop viewport. Values below are **computed styles read from the page**, not guesses, unless marked *(visual estimate)*.

> Note: the browser rendered at ~1.38× device-pixel scaling, so hairline borders reported as `0.72px` / `1.45px` are really **1px** / **2px** in CSS. They're written below as authored values.

> A second reference site was mentioned but no URL has been provided yet. When it arrives, add it as **Part 2** and merge the two in **Part 3 — Combined direction**.

---

## Part 1 — BrightHub

### 1.1 The vibe in one paragraph

Calm, airy, premium **"AI-SaaS light mode."** An off-white canvas (`#F6F7F8`) carries huge, soft, heavily blurred **cyan + periwinkle color glows**. On top sit **frosted-glass containers** (white at 48% opacity, 16px backdrop blur, 2px white border) and **crisp white cards** with very low-contrast, stacked shadows. Typography is **tight, large and quiet**: Geist at weight 400–500 with strongly negative letter-spacing, black on light. Almost everything is monochrome (black, white, greys). Color shows up in only **one place: a cyan→violet gradient** (`#28C6FF → #573CF1`). It's used for highlighted words, the 6px "lip" under primary buttons, the chat-mockup frame, and the scroll-revealed quote. Real product UI (chat windows, dashboards, phone mockups) does the storytelling instead of stock imagery. Motion is smooth and scroll-driven (GSAP + ScrollTrigger + SplitText), never bouncy.

Keywords: *airy · glassy · monochrome + one gradient · tight Geist type · product-UI-as-illustration · soft depth · scroll-choreographed*

### 1.2 Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#F6F7F8` | Body background (whole page, footer zone too) |
| `--surface` | `#FFFFFF` | Cards, nav bar, pills, chat bubbles |
| `--surface-muted` | `#F5F5F5` | Inner panels, tab-content wells, pricing card base, input fields |
| `--surface-glass` | `rgba(255,255,255,0.48)` + `backdrop-filter: blur(16px)` | Hero shell, CTA shell, dashboard shell |
| `--ink` | `#000000` | Headings, primary button bg, nav links |
| `--ink-strong` | `#181D27` | Alternative heading/near-black (Elementor primary; stat numbers, footer headings) |
| `--text` | `#535862` | Body copy (body default) |
| `--text-muted` | `#606060` | Sub-headings, list descriptions, footer links |
| `--border` | `#EFEFEF` | 1px hairline on cards, nav, pills |
| `--border-strong` | `#D5D7DA` | Form/input borders |
| `--placeholder` | `#CCCCCC` | Un-revealed quote text (grey half of the scroll gradient) |
| `--accent` (violet) | `#7A5AF8` | Solid accent (Elementor "secondary"); fallback color for gradient text |
| `--grad-a` (cyan) | `#28C6FF` | Gradient start |
| `--grad-b` (violet) | `#573CF1` | Gradient end |
| `--grad-quote` | `linear-gradient(84deg, #74DAFF -12%, #4A95FF 20%, #573CF1 50%, #CCCCCC 50%, #CCCCCC 100%)` | Scroll-reveal quote (hard stop at 50%) |
| `--glow-violet` | `#7985FF` @ opacity .64, `blur(200px)` | Ambient blob |
| `--glow-cyan` | `#7CFFFB` @ opacity .72, `blur(200px)` | Ambient blob |
| `--link-blue` | `#005BD3` / `#2388FF` | Small in-mockup links (product names, "Download") |
| `--online` | green dot *(visual)* `#22C55E`-ish | "Online – Ready to help" status |

**The one gradient**

```css
--brand-gradient: linear-gradient(90deg, #28C6FF 0%, #573CF1 100%);
```

Rule: color is scarce. Black buttons, white cards, grey text. The gradient is a **signature accent**, never a background fill for large areas (except the thin frame around the hero chat mockup).

### 1.3 Typography

**Families**
- **Geist** (sans): display headings, section titles, card titles, most UI copy inside mockups. Load from Google Fonts / Vercel (`geist` npm).
- **Inter**: nav links, buttons, body paragraphs in pricing, big stat numbers, small UI labels.
- Fallback: `sans-serif`.

**Scale (desktop, computed)**

| Role | Font | Size / line-height | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|
| Hero H1 (rendered as h2) | Geist | 64 / 70.4 (1.1) | 500 | **-3.2px** (-0.05em) | #000 |
| Section title (H2/H3) | Geist | 48 / 60 (1.25) | 400 | -2.88px (-0.06em) | #000 |
| CTA title | Geist | 48 / 57.6 (1.2) | 500 | -2.4px | #000 |
| Scroll-quote | Geist | 48 / 57.6 | 400 | -2.88px | gradient → #CCC |
| Tab-panel title | Geist | 32 / 40 | 400 | -1.92px | #000 |
| Card title / testimonial title | Geist / Inter | 20 / 24 | 500 | -1.2px | #000 |
| Footer column heading | Geist | 20 / 26 | 500 | -1.2px | #181D27 |
| Stat number (odometer) | Inter | **80 / 88** | 400 | -4.8px | #181D27 |
| Hero lead | Geist | 18 / 24.3 | 400 | -0.48px | #000 |
| Body / section sub | Geist / Inter | 16 / 21.6 (1.35) | 400 | -0.32 to -0.48px | #606060 / #535862 |
| Nav link | Inter | 16 | 500 | -0.32px | #000 |
| Button label | Inter | 16 / 20.8 | 500 | -0.32px | #FFF on #000 |
| Badge pill | Geist | 14 | 500 | -0.42px | #000 |
| Chat bubble text | Geist | 13–14 | 400–500 | -0.32 to -0.42px | #000 |
| Micro (mockup prices/desc) | Geist | 10–12 | 500 | -0.32px | #000 / #606060 |

**Typographic personality**
- Letter-spacing is **always negative**: about -0.02em on body, up to -0.06em on display. This is the single biggest contributor to the "premium SaaS" feel.
- Display weights are **light-ish (400–500)**, never bold. Size and tightness carry the hierarchy, not weight.
- Line-height is tight: 1.1 for hero, 1.25 for section titles, 1.35 for body.
- Headings are centered for most sections. The features block ("Discover what BrightHub can do") is **left-aligned**, breaking the rhythm on purpose.
- **Highlighted phrase treatment:** inside a heading, a phrase ("with Smarter", "Your Sales") is wrapped in a **white pill** (radius 24px, padding 9px 8px 9px 16px, shadow `0 1px 10px rgba(0,0,0,.06)`). The text inside uses the brand gradient via `background-clip: text`. It reads like a highlighted word in a text editor.

### 1.4 Spacing, layout & grid

- **Content max-widths:** `1312px` (main wide container), `1096px` (narrow/centered sections), `1350px` (header bar). Hero/CTA glass shells span about **1329px** with ~24px gutters from the viewport edge.
- **Section vertical rhythm:** sections run about 900–1500px tall at desktop. Big shells use about **134px** top/bottom inner padding. Gaps between sections are generous (~120–160px *(visual)*).
- Header sits **24px** from the top and floats (sticky) as a detached white bar.
- Card grid gaps ≈ **24px** *(visual)*.
- Feature grid is bento-style: **row 1 = 2 wide cards**, **row 2 = 3 cards**, **row 3 = 1 full-width card** (text left, marquee right).
- Breakpoints present in CSS: **1366 / 1200 / 1024 / 991 / 767 / 575 / 479px** (Elementor defaults). Plan for desktop ≥1200, tablet 768–1024, mobile ≤767, small ≤479.

### 1.5 Radius scale

| Radius | Used on |
|---|---|
| `8px` | Small mockup buttons ("Add to Cart") |
| `12px` | Primary buttons, gradient lip, small cards, inputs |
| `16px` | Chat bubbles, mid cards, black inner buttons |
| `16px 16px 0 16px` | Chat bubble **with a squared "tail" corner** (bottom-right = 0) |
| `20px` | Header bar, active tab item |
| `24px` | Highlight pill in headings, step cards |
| `36px` | Pricing cards, tab panel, mockup inner frame |
| `40px` | Hero/CTA glass shell, stat cards, icon tiles (144×144), chat mockup outer gradient frame |
| `50px` / pill | Section badges |
| `1000px 1000px 0 0` | Concentric half-circles (integrations illustration) |
| `600px / 1280px` | Glow blobs |

Rule: **nested radii shrink by the padding** (outer 40px frame → inner 36px with 6px gradient frame between).

### 1.6 Elevation, borders & surfaces

Three shadow recipes, all very soft:

```css
/* 1. Hairline lift — nav, pills, cards, tabs (layered "Vercel-style") */
--shadow-hairline:
  0 1px 1px -0.5px rgba(0,0,0,.04),
  0 3px 3px -1.5px rgba(0,0,0,.04),
  0 24px 24px -12px rgba(0,0,0,.04);
border: 1px solid #EFEFEF;

/* 2. Float — chat bubbles, icon tiles, tab panel */
--shadow-float: 8px 24px 80px -10px rgba(22,52,80,.14);

/* 3. Highlight pill */
--shadow-pill: 0 1px 10px 0 rgba(0,0,0,.06);
```

Glass:
```css
background: rgba(255,255,255,.48);
backdrop-filter: blur(16px);
border: 2px solid #FFFFFF;
border-radius: 40px;
```

Cards sit in **double containers**: an outer faint-bordered "tray" (~10px padding, radius +10, very light bg/border) holding the white card. That gives the subtle "card in a slot" look seen around features and pricing.

### 1.7 Ambient background glows

Behind the hero, the CTA and the testimonial area:
```css
.glow::before { /* violet */
  width: 440px; height: 1013px; border-radius: 600px;
  background: #7985FF; opacity: .64; filter: blur(200px);
}
.glow::after { /* cyan */
  width: 440px; height: 440px; border-radius: 600px;
  background: #7CFFFB; opacity: .72; filter: blur(200px);
}
```
Large-section variant: 918×665 blobs, radius 1280px. Violet sits top/right, cyan bottom/left. The result is a pastel **lavender-to-mint wash**. The testimonial section adds a **faint concentric arc / big circle** in pale lavender behind the quote.

### 1.8 Components

**Preloader.** Full-screen black. A 120px circle with a `1px rgba(255,255,255,.1)` inset ring, a rotating 167px gradient line (`rgba(255,255,255,.44) → 0`) and the white logo mark centered. Fades out.

**Header / nav**
- Floating white bar, radius 20px, hairline border + shadow-hairline, padding `0 8px 0 24px`, height ~61px, 24px from top, sticky.
- Left: logo (black slanted "B" mark + "BrightHub" wordmark in a light geometric sans).
- Center: Home · Live Demo · Features · How It Works · Pricing · FAQs (Inter 16/500, black, ~40px apart).
- Right: "Log In" text link + **black "Sign Up (Free)" button** (145×48, radius 12px).

**Primary button ("Get Started Free")**
- Black bg, white Inter 16/500, padding 13px 20px, radius 12px, leading chat-bubble icon.
- **Gradient lip:** wrapper `padding-bottom: 6px` with an `::after` layer using `--brand-gradient`, radius 12px, behind the button. The colored strip peeks out underneath like a 3D key edge.
- **Glossy sheen:** `::before` = 200%-wide skewed (-20deg) `linear-gradient(to right, transparent, rgba(255,255,255,.35), transparent)` starting at `left:-200%`. On hover it runs `pxl_btn_shine` (1.8s ease, 0.1s delay) and sweeps across once.
- Transition: 0.3s linear.

**Secondary button ("Watch Demo").** No background; play-circle outline icon + black Geist 16/500 text.

**Section badge (eyebrow).** White pill, radius 50px, padding 7px 16px, hairline border + shadow, Geist 14/500 black. It starts with a **small blue-violet 4-point sparkle icon** ✦. Texts: "Smart AI Chatbot", "Smart Conversations", "Easy Setup", "Trusted by Stores Worldwide", "Pricing Plans", "Got Questions?".

**Floating chat bubble with crop-marks.** White bubble (radius 16px, shadow-float, ~284×75) with short message text and a small round avatar of the logo overlapping the bottom-right corner. It's surrounded by **thin grey L-shaped corner brackets** (like design-tool selection handles / camera crop marks) sitting ~10px outside the bubble. The same bracket frame wraps **icon tiles** (144×144 white, radius 40px, 3D glassy violet/blue icons: gallery, shopping cart). They're placed asymmetrically around the hero headline and float gently.

**Hero chat mockup (Live Demo)**
- Center: chat window inside a **gradient frame** (outer 695×805, radius 40px, brand gradient). The inner #F5F5F5 panel has radius 36px, so the gradient shows as a ~6px border.
- Header: back chevron, logo avatar, "BrightHub Assistant", green dot + "Online – Ready to help", expand icon.
- "Today" divider. The user message is a **black bubble with white text** (right). The bot reply is a white card containing 3 product cards (image, blue name, price, desc, outlined "Add to Cart").
- Composer: white, "Ask me anything…", icons (+, emoji, link, sliders), black circular send button.
- Flanked left/right by **ghosted skeleton dashboard panels**: order tracking, customer info, FAQ search, help topics on the left; Multi-Language AI, Analytics line chart with `$25.00` tooltip, Ask a Question, Product Data list on the right. They're low-contrast grey placeholders, which keeps focus on the chat.
- The whole thing sits in a glass shell (radius 40px). Scroll effect: it starts as a tiny thumbnail under the quote and **zooms up to full size** as you scroll (`scroll-item-zoom`).

**Scroll-reveal quote.** Large 48px centered quote in curly quotes. Text is split into lines (SplitText). Each line's background is the `--grad-quote` with a hard 50% stop, and the background position is scrubbed by scroll, so words **fill in from grey to cyan→violet left to right** as you scroll. A thin vertical line with an arrow points down into it. A small **mouse-scroll pill** icon sits below.

**Tabs (agents).** Left: vertical list of 6 agents with line icons (Order Tracking, Product Recommendation, Checkout Support, Returns & Refunds, Multi-Language, Seamless Human Handoff). The active item is a white pill (radius 20px, hairline shadow) and inactive items are grey text. Right: big white panel (radius 36px, shadow-float) with a 32px title, description, primary button, and a **chat mockup illustration** (order-tracking timeline: Store Warehouse → Customer Address, product thumbnails). The user message shows as a grey pill bubble. The tabs auto-advance/fade.

**Feature bento cards.** White cards inside faint trays, radius ~36px, hairline shadow. The top ~70% is an illustration and the bottom has an emoji-prefixed title (🎙️ "Custom Voice & Tone", 🤖 "Multiple AI Engines", 🎨 "Theme & Preset Controls", 📊 "Advanced Analytics", 🌍 "Multi-Language Customization") plus a grey subline. Illustrations, all built from UI elements rather than images:
- *Voice & Tone:* center iridescent glass orb, with dashed connector lines to white pills (Friendly, Professional, Formal, Helpful, Enthusiastic).
- *Integrations:* 3 concentric half-circles (`#F5F5F5→#FFF`, `#EFEFEF→#FFF`, `#EAEAEA→#FFF`), with 48px white circular logo chips (Zapier, Slack, PayPal, Shopify, Zendesk, Webflow) orbiting the logo avatar.
- *AI engines:* dashed tree joining GPT-4, GPT-5, Gemini, Copilot pills into an empty center box.
- *Theme presets:* phone mockup with gradient bezel, 5 color dots above, "Hi, Alex 👋 How can i help you?" and quick-action chips.
- *Analytics:* "+586 ↑ Weekly Conversations", cyan area-chart with a vertical cursor line and dot.
- *Multi-language:* two rows of flag + language pills in an **infinite horizontal marquee** (opposite directions), with faded edges.

**Steps (How It Works).** Two columns in a tray. Left is a grey well with a sign-in form mockup (logo, "Welcome to BrightHub", email/password inputs on grey, black "Get Started" button with gradient lip, "Or sign in with" divider, Google/Facebook/Apple buttons). Right is an accordion of "Step 1…4", where the active step is a white card with bullet list and the rest are plain text rows. Steps likely auto-advance with the left visual swapping.

**Logo marquee.** "Trusted by Stores Worldwide" badge + a continuous row of black wordmark logos (Epicurious, Luminous, etc.).

**Testimonial.** Quote (scroll-reveal), then title "Fashion Brand – 40% Fewer Tickets" (20/500) and attribution "Emily Tran, Support Manager, StyleX" (16, grey). Pale lavender circle/arc behind.

**Stats.** 3 white cards (radius 40px). The **middle card is raised higher** and has a **gradient lip** along its bottom edge (same trick as the button). The side cards sit lower. Each card: huge odometer-animated number (Inter 80/400, -4.8px), label (20/500), grey description. Values: 10K+ Active Stores · 23% Sales Lift · 98% Customer Satisfaction.

**Pricing.** Toggle "20% Discount-Per Yearly ⬤○ Pay Monthly". Two plan cards: white top section (radius 36px, padding 32px) holding plan name (20/500), giant price "$25" + "/month", grey description, divider, a checklist with blue ✓, bold item title and small grey description. A **grey base slab** extends below the card with centered "Subscribe This Plan →" (Inter 16). Black "Popular" pill on the featured card.

**FAQ.** A single white rounded container (radius ~32px) with rows separated by hairlines. Each row: "+"/"−" icon, numbered question (16/500 black), and an answer in grey when open.

**Final CTA.** Mirrors the hero: glass shell, glows, bracketed chat bubbles at the corners, "Ready to Boost / [Your Sales] & Support?" with the highlight pill, "Start free today or see it in action first.", and primary + "Watch Demo".

**Footer.** White rounded card (radius ~32px) inside the glow-tinted CTA area. Left: logo, "Stay Updated", email input in a grey rounded field with a white "Subscribe" button inside it, small caption. Right: 5 link columns (Product, Company, Resources, Legal, Social Media) with 20/500 headings and 16/400 grey links. Below a hairline: centered "© 2026 BrightHub. All rights reserved."

**Floating utilities**
- Right-edge vertical white tab strip (cart, docs, support headset, grid). This belongs to the theme demo, so skip it unless useful.
- Back-to-top: 40px **navy/black circle** with a white up-arrow and a subtle ring, bottom-right.

### 1.9 Motion & interaction

Libraries detected: **GSAP, ScrollTrigger, SplitText, Odometer, Waypoints** (+ custom `scroll-effect`, `text-animation`).

| Pattern | Behavior |
|---|---|
| Preloader | Black screen + rotating ring → fade |
| Hero entrance | Headline lines rise/fade in. Bracketed bubbles and icon tiles float in with gentle idle bobbing |
| Gradient button | Shine sweep on hover (1.8s), 0.3s transitions |
| Scroll-quote | Scroll-scrubbed grey → gradient text fill, per line |
| Dashboard zoom | Thumbnail → full-width scale on scroll (pinned) |
| Tabs / steps | Auto-rotating active item, panel crossfade |
| Marquees | Logos + language pills loop infinitely, opposite directions |
| Counters | Odometer roll-up when in view |
| Section reveals | Fade-up on enter |
| Sticky header | Stays floating; same style throughout |
| Respects | `prefers-reduced-motion` media queries present |

Easing feels like `power2/power3.out`. Durations 0.3s (hover), 0.6–1s (reveals). Nothing springy.

### 1.10 Imagery & iconography

- **No stock photos.** Imagery is (a) UI mockups built in HTML, (b) a few product photos (sneakers) inside mockups, (c) **soft 3D glassy icons** in violet/blue gradients (gallery, cart, orb).
- Line icons are thin (1.5px), black/grey, rounded caps (Lucide/Phosphor style).
- Emoji used deliberately in microcopy and card titles (👋 🚚 👟 🎙️ 🤖 🎨 📊 🌍).
- The brand mark is a bold slanted "B" made of two stacked swooshes.

### 1.11 Voice & copy

Short, benefit-led, ecommerce-specific. Headline formula: **"[Verb] [Outcome] & [Outcome] / with [Highlighted Differentiator] [Noun]"**. Sections open with a stat-hook ("70% of shoppers abandon carts due to slow support"). Supporting lines stay under ~15 words. CTAs: "Get Started Free", "Watch Demo", "Sign Up (Free)", "Subscribe This Plan →".

### 1.12 Page structure (order)

1. Preloader
2. Floating header
3. Hero (glass shell, glows, bracketed bubbles/icons, badge, headline w/ highlight pill, lead, CTA pair)
4. Scroll arrow → scroll-reveal quote → zooming chat/dashboard mockup
5. Problem hook + tabs of AI agents
6. Features bento ("Discover what BrightHub can do")
7. How it works, 4 steps
8. Logo marquee + testimonial quote
9. Stats trio (raised center card)
10. Pricing (toggle + 2 plans)
11. FAQ accordion
12. Final CTA (glass shell mirrors hero)
13. Footer card

### 1.13 Starter CSS tokens

```css
:root {
  --bg-page: #F6F7F8;
  --surface: #FFFFFF;
  --surface-muted: #F5F5F5;
  --ink: #000000;
  --ink-strong: #181D27;
  --text: #535862;
  --text-muted: #606060;
  --border: #EFEFEF;
  --border-strong: #D5D7DA;
  --accent: #7A5AF8;
  --grad-a: #28C6FF;
  --grad-b: #573CF1;
  --brand-gradient: linear-gradient(90deg, var(--grad-a), var(--grad-b));
  --glow-violet: #7985FF;
  --glow-cyan: #7CFFFB;

  --font-display: "Geist", sans-serif;
  --font-ui: "Inter", sans-serif;

  --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --r-xl: 20px;
  --r-2xl: 24px; --r-3xl: 36px; --r-4xl: 40px; --r-pill: 999px;

  --shadow-hairline: 0 1px 1px -.5px rgba(0,0,0,.04), 0 3px 3px -1.5px rgba(0,0,0,.04), 0 24px 24px -12px rgba(0,0,0,.04);
  --shadow-float: 8px 24px 80px -10px rgba(22,52,80,.14);
  --shadow-pill: 0 1px 10px 0 rgba(0,0,0,.06);

  --container: 1312px;
  --container-narrow: 1096px;
}
```

### 1.14 Do / Don't

**Do:** keep the canvas light and quiet. Use one gradient, sparingly. Use tight negative tracking. Build illustrations out of real UI. Use soft layered shadows plus 1px #EFEFEF borders. Use large radii that nest correctly. Let scroll drive the storytelling.

**Don't:** use bold (700+) display weights, saturated full-bleed color blocks, hard/dark shadows, stock photography, multiple accent colors, or springy/bouncy animation.

---

## Part 2 — Second reference site

*Pending: URL not provided yet.*

## Part 3 — Combined direction

*To be written once Part 2 is analyzed.*
