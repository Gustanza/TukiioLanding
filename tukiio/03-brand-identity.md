# 03 — Brand Identity (as it exists today)

Assets saved in [assets/brand/](assets/brand/).

## Logo

- **Wordmark:** lowercase `tukiio`, heavy geometric sans, black. Source: [assets/brand/logo.svg](assets/brand/logo.svg), viewBox 413×117, Illustrator export. `logo-dark.svg` is currently identical, and no proper inverted version exists yet.
- **The "ii" mark:** the two i's are drawn as **two arched stems with round yellow dots** (`#FEC600`). They read as **two people** side by side: attendees, community, "together at an event". This is the brand's strongest graphic idea.
- **Favicon / OG image:** `qrcode-logo-black.png` (2.5KB, low quality for a 1280×720 OG slot). It needs a proper OG image.
- **Loader:** the two yellow dots **bounce alternately** (1s ease-in-out infinite, second dot delayed 400ms, rising 10px and turning black at the top) above the two black stems. It's a lovely, ownable micro-animation, and it's the obvious source for the brand's motion language (see 06).

```css
/* the existing loader, verbatim logic */
.tukiio-dot{width:9.85px;height:9.85px;border-radius:5px;background:#FFC50B}
.left-dot{animation:tukiio-animate 1s infinite ease-in-out}
.right-dot{left:16px;animation:tukiio-animate 1s 400ms infinite ease-in-out}
@keyframes tukiio-animate{0%{top:0;background:#FFC50B}50%{top:-10px;background:#000}100%{top:0;background:#FFC50B}}
```

## Color

| Role | Value | Where found |
|---|---|---|
| **Primary yellow** | `#FFC50B` | `ProfileConfig.primaryColor`, loader dots |
| Yellow (logo dots) | `#FEC600` | logo.svg |
| Yellow (UI / buttons / links) | `#FEBF09` | Bootstrap `--bs-link-color`, `.btn-primary` bg |
| Yellow hover / active | `#FEC92E` / `#FECC3A` | `.btn-primary` hover/active |
| **Secondary / ink** | `#000000` | `ProfileConfig.secondaryColor`, logo, nav active pill, footer, hero side panel |
| Page background | `#F5F5F5` | `--bs-body-bg` (light theme) |
| Body text | `#212529` | Bootstrap default |
| Cards | `#FFFFFF`, 1px translucent border, radius .5rem | |
| Dark theme bg | `#2B2B2B`, text `#DDDDDD` | a dark theme exists in the CSS |

**Unify to one yellow.** Three near-identical yellows are in use. Recommendation: **`#FFC50B`** (the official config value) as `--accent`, with `#FEBF09` kept as the interactive/hover shade if desired.

**Contrast rules:**
- Black on yellow `#FFC50B` ≈ **13.2 : 1**. Excellent, so always put black text on yellow.
- White on yellow ≈ 1.6 : 1. **Never.** Yellow text on white is also unreadable; use yellow on **black** only (≈ 13.2 : 1).

## Typography

- **Product Sans** is used site-wide (`--bs-font-sans-serif: "Product Sans"`). It is **Google's proprietary brand font**, not licensed for third-party use. That's a legal and brand risk to fix in the redesign.
- Recommended replacement, which keeps the friendly geometric feel: **Plus Jakarta Sans** for headings and UI (already the display face in our DESIGN.md) with **Inter** for body. Other open alternatives with a similar round "Product Sans" vibe: *Outfit*, *Figtree*, *Albert Sans*.
- Icons: a custom "yekonga" icon font plus simple-line-icons (the location-pin outline icon in yellow on cards).

## Shape & components (current)

- Buttons: **yellow full pills** with **bold black text** ("Buy Ticket (50,000 TZS)", "Add Event"). Secondary is a black-outline pill ("Login"). Nav active state is a **black pill with yellow text**.
- Cards: white, ~8px radius, light border. Image on top (organiser poster, ~16:8), with a **white rounded date badge** ("30 / Oct") over the image top-left. Then title, a yellow pin icon with the venue, and a full-width yellow pill CTA.
- Hero: three-panel strip. A **black info panel** on the left (yellow event title, venue, yellow CTA), the event poster carousel in the middle, and a **yellow gradient promo panel** on the right ("Get Secured and Verifiable QR-coded paper tickets for as low as 500TZS/pc" with a photo of real printed tickets).
- Footer: **solid black**, yellow links, social icons in yellow, copyright "2015 – 2026 | Tukiio, Product of **Dephics Limited**".
- Mobile: bottom tab bar (Tickets · Orders · Home · Schedules · Likes), "Featured events" carousel, compact list cards.

## Voice

- Practical, service-minded, direct: "call now… or write to… today".
- **Bilingual**: the UI ships English and **Kiswahili**. Many events are described in Swahili ("Je, uko tayari kuwa sehemu ya event…"). Swahili CTAs already exist ("JISAJILI na USHINDE").
- Current copy has typos and grammar slips ("Dephcis", "Explorer Events", "Need Any Helps", "Inter your phone", "Servey"). Clean copy will make the redesign look far more premium.

## Brand personality (synthesis)

| Is | Isn't |
|---|---|
| Energetic, celebratory (yellow = light, stage, gold) | Corporate-cold |
| Trustworthy and secure (verified QR, "safe") | Flashy-crypto |
| Local and inclusive (Swahili, feature phones, mobile money) | Western-only SaaS |
| Practical, done-for-you (hardware, printing, staff) | Self-serve-only |
| Community / people (the two "ii" figures) | Faceless |
