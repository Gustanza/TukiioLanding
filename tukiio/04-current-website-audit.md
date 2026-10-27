# 04 — Current Website Audit (tukiio.com, 27 Oct 2026)

Screenshots: [assets/screenshots/](assets/screenshots/). These are headless Chrome renders: desktop 1440px wide, mobile 390px, the event page, About, Pricing and the TIE white-label.

## Tech

- Vue 3 SPA (Vite build, `vue-component` mount), in-house **Yekonga** framework (`/yekonga/yekonga.js`, `/config` globals), **GraphQL** at `/graphql`, Bootstrap 5.3 with custom themes (light/dark).
- **Content is client-rendered.** Crawlers that don't execute JS see only a loader, so SEO is weak. Meta description is truncated ("…paper tic…"), OG image is a 2.5KB logo, and the `<title>` is just "tukiio".
- Google Analytics `G-CSWG1ZFPM0`.

## Information architecture

Top nav: **Home · About · Voting · Pricing · Contact** + **Add Event** (yellow) + **Login** (outline).
Footer: About/Terms/Privacy/Refund · Address & Contacts · Our apps (Play/App Store) · socials (Facebook, WhatsApp, Instagram, X).

| Page | What's there | Verdict |
|---|---|---|
| **Home** | Hero carousel of featured events + "500 TZS/pc paper tickets" promo → **Upcoming Events** grid (14) → **Past Events** grid (24) | A marketplace feed, **not a landing page**. No value proposition for organisers, no features, no proof, no "how it works". |
| **About** | 5 paragraphs (mission, tailored solutions, physical services, TiME Tickets history, contact) | Good raw material, presented as a plain text card |
| **Voting** | Ongoing (3) / Past (14) voting campaigns grid | Hidden gem; it should be a product story |
| **Pricing** | One paragraph: free events free forever, 7% on paid, payouts within 24h, custom packages "coming soon" | Strong offer presented as plain text, with no table |
| **Contact** | "Leave message" form (name, email, phone with country code, message) | OK |
| **FAQs** | "Coming Soon" | Missing |
| **Event page** (`/experience/:slug`) | Poster, title, venue, start/end, Buy → ticket types with −/+ steppers, totals, T&C checkbox, Continue; description (often Swahili) | Functional; the yellow steppers on cards fit the brand |
| **White-label** (`tie.tukiio.com`) | Same templates re-themed in client blue, client logo, EN switcher, "Powered by Tukiio" | Proves the platform is themeable |

## Gaps → opportunities for the new landing page

1. **No organiser-facing pitch.** The #1 CTA "Add Event" has no supporting story. Build a real B2B landing page: value prop → features → how it works → pricing → proof → FAQ → CTA.
2. **Biggest differentiators are invisible:** feature-phone/USSD buying, mobile money and TanQR, verifiable paper tickets, wristbands and badges, voting, marathons, white-label, payouts in 24h, 10-year history.
3. **No social proof section:** they have huge recognisable events (Startup Week, Miss World TZ, BSS, Simba SC Marathon, Women in Energy Forum, TEDx) but no logos, numbers or testimonials.
4. **Pricing is a paragraph**, though "free forever + 7%" is a great headline offer.
5. **Typos and inconsistent yellows** reduce trust.
6. **SEO / share previews** are poor because of client-side rendering and a weak OG image. The new landing should be static/SSG (our Vite project fits) with proper meta tags.
7. **Proprietary font** (Product Sans) needs replacing.
8. **Swahili** exists in the product but not in marketing; a bilingual landing page will reach more people.
9. **Mobile-first reality:** most of the audience is on phones (bottom tab bar exists). The landing must be excellent at 360–390px.

## What to keep (brand equity)

- Yellow + black, pill buttons, the **black active-nav pill with yellow text**, white event cards with the **date badge**, the yellow location pin, the black footer, the two-dot loader, and the "ii" people mark.
