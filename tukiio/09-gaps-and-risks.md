# 09 — Gaps, Inconsistencies & Risks

## ⚠️ Security issue found (tell the Tukiio team privately)

The public `https://tukiio.com/config` script exposes **`googleClientSecret`** and **`cryptojsKey` / `cryptojsIv`** in plain text to every visitor. An OAuth client secret should never ship to the browser, and any "encryption" using a key published in the page gives no protection. **Recommendation:** rotate the Google OAuth client secret, remove server-only secrets from `/config`, and review what the CryptoJS key protects. (The values are deliberately not copied into this repo.)

## Facts to confirm with the client before publishing

| Item | Why |
|---|---|
| Founding year: 2013 vs 2015 | Press says TiME Tickets started mid-2013; Tukiio copy says 2015 |
| Founders and current leadership | Only press from 2015 and LinkedIn snippets are available |
| "200+ events / 20,000+ users" | Copy unchanged since ~2023; ask for current numbers (events, tickets sold, TZS processed, check-ins) |
| Supported mobile-money operators | The code shows mobile-money push, TanQR, Selcom, DPO cards and `*150*50*1#`, but no operator names |
| 7% fee details | Does it apply to card and mobile money equally? Who pays it, the buyer or the organiser? Any minimums? |
| 500 TZS/pc paper tickets | Minimum order? Delivery? |
| Client logo usage | Written permission is needed for every logo in a trust strip |
| Testimonials | None public. Collect 3–6 quotes with name, role, event and photo |
| Brand font | Product Sans is Google-proprietary; confirm they accept a switch to Plus Jakarta Sans / Inter |
| Domain of record | tukiio.com vs tukiio.co.tz: which one goes in emails and on the landing page? |

## Inconsistencies seen

- "Dephcis" typo in the official description, and "Dephics Limited" vs "Dephics Co. Ltd" vs "Dephics Company Limited".
- Three yellows (`#FFC50B`, `#FEC600`, `#FEBF09`).
- `logo-dark.svg` is identical to `logo.svg`, so there's no real dark logo.
- The FAQ page says "Coming Soon", and the pricing page promises packages "soon".
- Minor copy errors: "Explorer Events", "Need Any Helps", "Servey", "Inter your phone".

## Research limits

- X, Facebook, Instagram and LinkedIn are login-walled, so follower counts and recent posts came only through search snippets.
- No independent press since 2015 was found. No reviews of substance (the App Store's two written reviews are empty).
- Competitors' pricing wasn't publicly available.
