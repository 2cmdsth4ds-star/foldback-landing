# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (no framework, no build step) — existing codebase, single `index.html` plus a Vercel serverless function (`api/lead.js`). Confirmed to stay this way for now; see conversation record for rationale (single-page marketing site, no complex state or routing to justify React/Astro).

## Users

Primary user: the owner or admin of a small-to-medium recording studio, usually in Mexico (pricing in MXN, contact channel WhatsApp, copy in Spanish). Today they run the studio's sessions, finances, quotes, and deliveries across Excel, WhatsApp, and post-its. They land on this page to evaluate whether to replace that patchwork with one tool.

## Product Purpose

StudioPulse is a SaaS panel for recording studios that consolidates session/room scheduling, finances (income/expense/profit), client proposals/quotes exportable to branded PDF, payment-collection reminders, and private-link delivery of mixes/masters. This landing page's job is to get studio owners to either try the live demo or submit the "solicitar acceso" lead form so the team can activate their account.

## Positioning

"One panel instead of ten loose apps." The mechanism: this isn't generic project-management or invoicing software — it's purpose-built around a recording studio's actual workflow (sessions/rooms, project-type proposal templates for single/EP/podcast/mix/master, studio-branded PDF output, and secure delivery links for audio deliverables).

## Operating Context

Studio owner works from browser (desktop or mobile), no install required, logs in with username/password. Key workflows the product supports: booking sessions/rooms and catching schedule overlaps, tracking monthly income/expense/profit, generating and exporting branded proposals to PDF, sending balance-due reminders via WhatsApp/email, and sharing mixes/masters via private link. The live demo at `blacklab-demo.vercel.app` is embedded directly on the landing page (hero iframe + feature-card iframes) as real product evidence, not a mockup.

## Capabilities and Constraints

- Multi-tenant: each studio's data is isolated with automated backups; data is exportable by the owner.
- Branding: studio can set its own name, logo, and service catalog, reflected in proposals/receipts.
- Currency support in proposals: MXN, USD, EUR.
- Lead capture backend: `/api/lead` (Vercel serverless) writes to Supabase table `sp_leads` using the service-role key server-side.
- Internal/demo codename is "Blacklab" (visible in the Vercel project name `blacklab-landing` and demo domain `blacklab-demo.vercel.app`); "StudioPulse" is the public/commercial brand name. Do not surface "Blacklab" in user-facing copy.

## Brand Commitments

- Name: StudioPulse.
- Logo assets: `studiopulse-logo.svg` (light), `studiopulse-logo-dark.svg` (dark), `icon.svg` favicon, `blacklab-logo-trans.png` (legacy/internal asset — verify before use).
- Contact email: hola@studiopulse.app.
- Existing dark theme with blue accent (`--accent:#3987e5`) is the current committed visual direction; treat as incumbent system rather than open ground unless the user asks for a redesign.

## Evidence on Hand

- Live embedded product demo (`blacklab-demo.vercel.app`) — real, treated as reliable evidence per user confirmation.
- No testimonials, case studies, customer logos, or press mentions exist yet — do not fabricate any.
- Pricing shown ($350 MXN/mo, $3,500 MXN/yr) is explicitly a temporary launch promotion for early studios, not final pricing — copy should keep signaling "promo"/"lanzamiento" framing rather than presenting it as permanent.

## Product Principles

1. Replace fragmented tools (Excel, WhatsApp, paper) with one coherent panel — every feature justified by "what a studio actually needs," not generic SaaS scaffolding.
2. Let the real product demo do the selling — prefer embedding/linking the live demo over invented screenshots or mockups.
3. Speak the studio owner's language: session, mezcla, master, propuesta, cobranza — not generic PM/CRM vocabulary.
4. Low-commitment framing: no long-term lock-in, cancel anytime, launch pricing clearly flagged as promotional.
5. Keep the site as lean as the product claim — static HTML matching a "no bloat" ethos, until real complexity (multi-page, CMS-driven content) demands more.
