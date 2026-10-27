# 06 — Applying Our Design Language to Tukiio

This connects the research to [../DESIGN.md](../DESIGN.md) (the EMBER and LIME study).

## The key finding

Tukiio's brand is **yellow + black on white**. That has the same structure as **LIME** (`#B9FB6A` highlighter on `#0E0E0E` ink and white). LIME's rules carry over almost one-to-one:

- The accent is a **highlighter**. Never use it as text on white.
- Text on the accent is always **ink**.
- Ink-filled hover states, ink footer and ink active-nav pill all match what Tukiio already does (black nav pill, black footer).

From **EMBER** we borrow the **warmth**: a cream tint band, soft glows and editorial moments (manifesto line, bento testimonials, dark middle pricing card). Yellow sits between lime and orange, so the warm atmosphere suits it naturally.

➡️ **Proposed variant: "GOLD"** = LIME structure + EMBER warmth + Tukiio brand assets.

## GOLD tokens

```css
:root{
  /* brand */
  --accent:        #FFC50B;   /* Tukiio primary (config) */
  --accent-hover:  #FEBF09;   /* existing button shade */
  --accent-soft:   #FFE27A;   /* light yellow for gradients / chart fills */
  --tint:          #FFF8E1;   /* warm cream band (EMBER-style #FFF0EB analogue) */
  --tint-2:        #FFFBEF;   /* lighter band / input bg */
  --ink:           #0E0E0E;   /* near-black, softer than #000 (LIME) */
  --text:          #5F5F5F;   /* body gray (between #696969 and #706F6B), passes AA on white */
  --line:          #EEEEEE;
  --line-accent:   #FFC50B26; /* 15% yellow hairline (EMBER pattern) */
  --bg:            #FFFFFF;
  /* type */
  --font-head: "Plus Jakarta Sans", sans-serif;  /* replaces proprietary Product Sans */
  --font-body: "Inter", sans-serif;
  /* shape */
  --r-card: 15px; --r-inner: 10px; --r-pill: 999px;
  --container: 1290px;
}
```

**Contrast checks:** ink `#0E0E0E` on accent ≈ 12.2:1 ✅ (and the reverse, accent on ink) · `#5F5F5F` on white ≈ 6.4:1 ✅ · accent on white ≈ 1.6:1 ❌ (decoration only).

## Mapping each pattern to Tukiio

| DESIGN.md pattern | Tukiio version |
|---|---|
| **Pill button + arrow chip** (§7.2) | Primary = yellow pill, ink label, **ink chip with white arrow**. Hover: ink pill, white label, **yellow chip**. The "Add Event" and "Buy Ticket" buttons already are yellow pills, so we just add the chip. |
| **Eyebrow pill** (§7.3, LIME) | Yellow pill, ink text, `#EEE` border. On the yellow CTA band, invert to a white pill. |
| **Plain eyebrow** (EMBER) | For editorial sections (story, manifesto): gray 20px text. |
| **Hero glow** (§6.2 LIME sunrise) | A huge **blurred yellow ellipse** rising from the top + white blur + **square grid** at ink 6%. It reads as stage lights / sunrise, which suits events. |
| **Rotating dotted rings** (LIME) | Make the dots the **two Tukiio dots**. Two big rings with yellow and ink dots, slow 15–30s spin, paused on hover. The orbit motif ties back to the logo dots. |
| **Orbit glow icon** (EMBER mission) | Center chip = the **"ii" people mark** in yellow with a yellow glow; dots orbit around it. Use it for the manifesto ("Events & tickets for everyone"). |
| **Preloader** (§7.16) | Use **Tukiio's existing two-dot bounce loader** as is. It's already on-brand. |
| **Icon cards 3×2** (LIME) | Features grid. Icon chips get a yellow→transparent gradient and a soft yellow corner glow. |
| **Steps that invert to ink on hover** (LIME how-it-works) | Create → Sell → Check-in & get paid. |
| **Bento panels 41/58** (EMBER) | Channel bento: "Web & App", "USSD & feature phones", "Agents", "Paper QR tickets", each with a floating UI fragment (phone USSD screen, ticket stub, mobile-money push prompt). |
| **Floating stat cards** (both) | Organiser dashboard snippets: tickets sold, check-ins live, revenue in TZS, payout "within 24h", vote counts, all in yellow, ink and gray. |
| **Pricing with dark middle card** (EMBER) | Three cards: **Free events: TZS 0, forever** · **Paid events: 7% per ticket** (ink card, yellow accents, "Most popular") · **Custom / Enterprise: quote** (hardware, white-label, on-site team). |
| **Monthly/Yearly toggle** (LIME) | Don't use it, because Tukiio isn't a subscription. Use a **revenue calculator** instead: ticket price × quantity → organiser payout after 7%. |
| **Logo strip** (both) | "Trusted at Tanzania's biggest events": Startup Week, TIE, Women in Energy Forum, TEDxKivukoni, Simba SC Marathon, Miss World TZ, BSS… (**get written permission** before using client logos). |
| **Testimonials** (EMBER bento / LIME carousel) | We have none yet, so collect 3–6 quotes from organisers (see 09). |
| **FAQ accordion** | The real FAQ page is "Coming soon", so write one (drafts in 07). |
| **CTA band** (LIME lime band) | **Solid yellow band**, ink text, white eyebrow pill: "Launch your next event on Tukiio". |
| **Footer + giant outlined wordmark** (LIME) | **Ink footer** (Tukiio already uses black) with a giant outlined `tukiio` (from logo.svg paths, stroke at 10% white), a yellow glow rising behind it, and the **two yellow dots** left filled as the only solid elements. |
| **Event cards** (keep Tukiio's own) | White card, 15px radius, poster image, **date badge**, yellow pin and venue, yellow pill CTA with chip. This is a live "Happening now" carousel pulled from the real events. |

## Motion language

- Scroll entrances: fadeInUp, 100ms stagger (EMBER timing), as in DESIGN.md §8.
- **Signature micro-interaction:** on hover of primary CTAs, the arrow chip swaps colours. On first load and on page transitions, the **two-dot bounce** plays.
- Ambient: rings spin slowly; hero dots drift with the `image_animation` wander path; numbers count up in stat cards.
- Everything respects `prefers-reduced-motion`.

## Proposed landing page blueprint (organiser-first)

1. **Header:** logo · Events · Features · Voting · Pricing · Contact · [EN/SW] · *Login* (outline pill) · **Add Event** (yellow chip button). Sticky white with soft shadow.
2. **Hero** (yellow sunrise glow + grid + dotted rings):
   - Eyebrow: *Events & Tickets for everyone*
   - H1: **Sell tickets. Fill the venue. Get paid in 24 hours.**
   - Sub: *From concerts to conferences, marathons to awards. Sell on web, app, USSD and paper, take mobile money, and check in every guest with Tukiio.*
   - CTAs: **Create your event: it's free** · *Browse events*
   - Proof row: "200+ events · 20,000+ attendees · since 2015" (update the numbers)
   - Visual: phone with a QR ticket + floating cards ("M-Pesa payment received", "Checked in 1,248", "Payout sent").
3. **Logo strip**: trusted at…
4. **Manifesto** (EMBER orbit): *"Every event deserves a full house, and every fan deserves a fair, safe ticket."*
5. **Sell everywhere** (bento): Web & App · USSD / feature phone · Agents & at the venue · QR paper tickets from TZS 500/pc.
6. **Everything you need** (3×2 grid): Mobile money & cards · Fraud-proof check-in · Live engagement (chat, Q&A, polls) · Voting & awards · Marathons & registrations · Reports & payouts.
7. **How it works** (3 inverting steps): Create your event → Sell & promote → Check in & get paid.
8. **Built for every event** (tabs or chips): Concerts · Conferences · Marathons · Awards & Voting · Weddings · Trainings · Festivals. Each shows a real example card.
9. **On-site services** (warm tint band): wristbands, badges, paper tickets, scanners, displays, desk team. CTA: *Request a quote*.
10. **Voting spotlight**: split layout, vote UI mock, "Run transparent public voting with SMS/WhatsApp verification".
11. **White-label for institutions**: "Your brand. Our engine." with the TIE portal as the example.
12. **Live events carousel**: real upcoming events (from the API, or a static JSON snapshot for v1).
13. **Pricing**: Free / 7% / Custom, plus a payout calculator.
14. **Apps**: Tukiio (attendees) + Tukiio Organizer (teams) with store badges.
15. **Testimonials** (once collected).
16. **FAQ.**
17. **CTA band** (yellow).
18. **Footer** (ink, giant outlined wordmark, contacts, socials, "A product of Dephics").

## Assets we need to create (not copy)

- A proper **inverted logo** (white wordmark + yellow dots) for the ink footer and dark sections.
- Product **UI mockups**: checkout, USSD menu, organiser dashboard, check-in scanner, voting screen.
- **Photography**: real Tanzanian event crowds and check-ins (with consent), or tasteful illustrations.
- A **1200×630 OG image**.
- Client **logos with permission**.
