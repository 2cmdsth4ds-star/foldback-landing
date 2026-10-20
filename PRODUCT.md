# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (no framework, no build step) — existing codebase, single `landing.html` (served at `/` through api/home.js) plus a Vercel serverless function (`api/lead.js`). Confirmed to stay this way for now; see conversation record for rationale (single-page marketing site, no complex state or routing to justify React/Astro).

## Users

Primary user: the owner or admin of a small-to-medium recording studio, usually in Mexico (pricing in MXN, contact channel WhatsApp, copy in Spanish). Today they run the studio's sessions, finances, quotes, and deliveries across Excel, WhatsApp, and post-its. They land on this page to evaluate whether to replace that patchwork with one tool.

## Product Purpose

FoldBack is a SaaS panel for recording studios that consolidates session/room scheduling, finances (income/expense/profit), client proposals/quotes exportable to branded PDF, payment-collection reminders, and private-link delivery of mixes/masters. This landing page's job is to get studio owners to either try the live demo or submit the "solicitar acceso" lead form so the team can activate their account.

## Positioning

"One panel instead of ten loose apps." The mechanism: this isn't generic project-management or invoicing software — it's purpose-built around a recording studio's actual workflow (sessions/rooms, project-type proposal templates for single/EP/podcast/mix/master, studio-branded PDF output, and secure delivery links for audio deliverables).

## Operating Context

Studio owner works from browser (desktop or mobile), no install required, logs in with username/password. Key workflows the product supports: booking sessions/rooms and catching schedule overlaps, tracking monthly income/expense/profit, generating and exporting branded proposals to PDF, sending balance-due reminders via WhatsApp/email, and sharing mixes/masters via private link. The live demo at `demo.foldback.io` is embedded directly on the landing page (hero iframe + feature-card iframes) as real product evidence, not a mockup.

## Capabilities and Constraints

- Also in the app (live as of 2026-10-19, described on the landing): client portal (private link, no account), prepaid hour packages, loyalty rewards, post-session survey with Google review request, leads by stage, waiting list, roles (owner/admin/engineer, engineers see no money), several studios per account, rates by room/time/engineer, recurring sessions, room blocks and buffers, multi-day bookings, equipment rental, consumables and damage log, calendar subscription (Google/iPhone/Outlook), pre-session form, reminders and change alerts, home-screen install with push alerts and a daily summary.
- Multi-tenant: each studio's data is isolated with automated backups; data is exportable by the owner.
- Branding: studio can set its own name, logo, and service catalog, reflected in proposals/receipts.
- Currency support in proposals: MXN, USD, EUR.
- Lead capture backend: `/api/lead` (Vercel serverless) writes to Supabase table `sp_leads` using the service-role key server-side.
- Former internal/demo codename was "Blacklab"; the product was originally launched publicly as "StudioPulse" and was renamed again to "FoldBack" after the "StudioPulse" name became unavailable. Do not surface "Blacklab" or "StudioPulse" in user-facing copy going forward.

## Brand Commitments

- Name: FoldBack (renamed from StudioPulse; do not reuse the old name in new copy).
- Logo: `icon.svg` (waveform mark, used as favicon and as the icon half of the live nav/hero wordmark lockup) + a live HTML "Fold<span>Back</span>" text lockup (white + accent-2 blue), not a flattened image — this lets the nav logo and the animated hero logo stay pixel-identical and easy to re-theme. The old flattened StudioPulse/Blacklab logo files were deleted.
- Contact email: hola@foldback.io.
- Production domain: https://foldback.io (landing, Vercel project `foldback-landing`); GitHub repo `2cmdsth4ds-star/foldback-landing`.
- Existing dark theme with blue accent (`--accent:#3987e5`) is the current committed visual direction; treat as incumbent system rather than open ground unless the user asks for a redesign.

## Evidence on Hand

- Live embedded product demo (`demo.foldback.io`) — real, treated as reliable evidence per user confirmation.
- No testimonials, case studies, customer logos, or press mentions exist yet — do not fabricate any.
- Pricing shown (MXN 350/mo, MXN 3,500/yr for Mexico; USD 29/290 for the rest of the world; only MXN and USD exist, matching the app — see NOTES.md) is a founder price for the first 30 studios, locked while they stay subscribed; regular price will be higher (MXN 499 / USD 39). Copy should keep the "fundador"/"lanzamiento" framing.

## Product Principles

1. Replace fragmented tools (Excel, WhatsApp, paper) with one coherent panel — every feature justified by "what a studio actually needs," not generic SaaS scaffolding.
2. Let the real product demo do the selling — prefer embedding/linking the live demo over invented screenshots or mockups.
3. Speak the studio owner's language: session, mezcla, master, propuesta, cobranza — not generic PM/CRM vocabulary.
4. Low-commitment framing: no long-term lock-in, cancel anytime, launch pricing clearly flagged as promotional.
5. Keep the site as lean as the product claim — static HTML matching a "no bloat" ethos, until real complexity (multi-page, CMS-driven content) demands more.
