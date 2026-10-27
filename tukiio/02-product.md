# 02 — Product & Features

Built from the app store listings, the public site, the web app's route table ([data/app-routes.txt](data/app-routes.txt)) and its 4,500 UI strings ([data/ui-strings-en-by-group.json](data/ui-strings-en-by-group.json)). The platform is **much broader than "ticketing"**, and the current marketing undersells it badly.

## Product surfaces

| Surface | Who | Notes |
|---|---|---|
| **tukiio.com** web app | Attendees and organisers | Event discovery, checkout, "My Tickets / Orders", organiser dashboard (`/app`, `/admin`). Vue SPA on the in-house "Yekonga" framework, Bootstrap 5 UI, GraphQL API. |
| **Tukiio app** (Android/iOS) | Attendees | Android `tz.co.dephics.tukiio` (5K+ downloads, ★3.8, 26 reviews). iOS id6443397470 (★3.9, 9 ratings, v3.3.0 Jul 2025; Entertainment chart #97 in TZ). |
| **Tukiio Organizer / "Tukiio Admin"** app | Organisers, staff, agents | Android `tz.co.dephics.tukiio_organizer` (500+ downloads, ★4.3). Features: sales and registration summary, ticket verification and check-in, event reports, team management, desk registration, paper ticket management. |
| **Event-specific apps** | Big clients | e.g. "Startup Week" (`com.tukiio.tsa`) |
| **White-label portals** | Institutions | `tie.tukiio.com` and `deiwaka.tukiio.com`: client branding and colours, "Powered by Tukiio". A `domainRegister` module suggests custom domains. |
| **Embeds** | Organiser websites | `/embed/tickets/single/:ticketTypeId`, `/embed/tickets/multiple/:slug` |
| **Offline channels** | Attendees without data | Terms list the "Tukiio Channels" as **website, mobile apps, USSD, SMS and paper products**. "Buy via feature-phone without internet." |

## Attendee features

- Buy or register online (web or app), **via feature phone (USSD/SMS)**, through **ticket agents**, or "sold at venue".
- **Group / multiple tickets** ("Just Me" vs "Group Registration", with a group leader).
- **Book now, pay later** (orders with expiry: "Your Order Expires In…", "Pay before").
- Tickets delivered in-app, on the web dashboard, by email and SMS; softcopy or printed.
- **Verify paper tickets with a phone camera before buying** (anti-forgery).
- Live engagement: **chatroom, live Q&A, live polls, surveys, materials/resources, event updates**, comments and likes.
- Networking: attendee directory, 1:1 chat, **appointments/meetings** booking, community/topics.
- Personal agenda: schedules, sessions, timetable, Google Calendar add.
- **Digital badges** (`/my-badge`), **certificates**, **self check-in** (`/self/check-in/:eventId`).
- **Voting** for awards and pageants with phone OTP via **SMS or WhatsApp**.
- **Raffles** ("JISAJILI na USHINDE" = "Register and Win"), **donations**, **memberships** (member numbers and fees).
- **Cards / top-up** (`/topup`, `card/:cardId`): cashless event cards and wallets.

## Organiser features (from the UI string groups)

**Ticketing & sales:** online ticket types, ticket batches and releases ("More Releases"), paper ticket generation and batches, discounts and promo codes, invitations / RSVP, group packages, fees and service charges, "sold at venue", manual payment approval, ticket agents, **affiliators**.

**Event types / templates (URL prefixes):** `experience`, `event`, `conference`, `marathon`, `meeting`, `session`, `booth`, `place`, `form`, `registration`, `voting`, `raffle`. Specialised flows include:
- *Marathon:* races, distances, race categories, **bib numbers**, **T-shirt sizes**, runner age, "Add another runner".
- *Conference/expo:* agenda, sessions, speakers, **booths**, **floor plans**, exhibitors, appointments.
- *Awards:* categories, nominees/candidates, votes, voters, "vote for me" share links.

**Engagement:** polls, surveys/live surveys, Q&A, chat, posts/updates, resources, galleries.

**Comms & CRM:** SMS and email campaigns, contact manager, notification logs, groups.

**Commerce at the event:** store, products, **inventory**, outlets and **kitchen** (F&B POS), suppliers, units.

**Operations:** devices (scanners), check-points, desk registration, team and permissions, logs.

**Finance:** transactions, revenue and income, collected/pending fees, **withdrawals** (payouts within 24h), billing.

**Platform:** API integration, domain register (white-label), partner/client profiles, themes, **English + Kiswahili** UI.

## Payments (seen in the code)

- **Mobile money push** (STK-style "Mobile Money Push"): the core flow in Tanzania (M-Pesa, Mixx by Yas/Tigo Pesa, Airtel Money, HaloPesa are the national rails; the specific operators are not named in the code).
- **USSD pay code** `*150*50*1#` appears in the payment instructions.
- **TanQR** (Tanzania's interoperable national QR payment standard).
- **Selcom** (Tanzanian payment aggregator), referenced.
- **Card payments via DPO** (credit/debit card gateway).
- **Manual payment** with organiser approval; **pay later** with order expiry.

## Physical / on-site services

- **QR-coded, verifiable paper tickets** "for as low as **500 TZS/pc**" (the homepage hero promo).
- **Wristbands**, **attendee badges**, **e-cards** (invitation cards, e.g. for weddings and harusi), **scanners**, **displays**.
- Desk registration and check-in staff (via the Organizer app).

## Event categories served (evidence)

Concerts and music · conferences and business forums · trainings and workshops · marathons and runs · awards and pageant voting · festivals and culture (comic con, anime nights, country fest) · school and university events · weddings (wedding is a category, plus e-cards and Harusi Awards) · charity/donations · membership associations · corporate dinners (prices up to TZS 20,000,000 for tables/sponsorship tiers).

## Product strengths to put front and centre on the landing page

1. **Works for everyone, even offline**: feature phone/USSD, SMS, agents, paper. ("Events & Tickets for *everyone*" is true at the infrastructure level.)
2. **Local payments built in**: mobile money, TanQR, cards.
3. **Fraud-proof tickets**: QR paper tickets you can verify with a phone camera.
4. **One platform, every event type**: ticketing → registration → check-in → engagement → voting → payouts.
5. **Free for free events; flat 7% for paid; payouts in 24h.**
6. **Physical + digital**: wristbands, badges, printing and scanners, from one partner.
7. **White-label for institutions.**
8. **10+ years of local experience** (since 2013/2015).
