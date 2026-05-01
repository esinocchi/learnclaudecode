# Peer Review Revisions — Design

**Date:** 2026-04-30
**Project:** Internet Resource Guide (Assignment 5)
**Source:** `tasks.md` (peer review task list) + `Instructions.md` (assignment rubric)

---

## Goal

Revise the Internet Resource Guide site to address a peer review without diluting the existing editorial design. Three priorities, in order:

1. Add a clearly labeled, scannable **front matter** block to the homepage so the guide opens with audience, scope, prerequisites, organization, and usage instructions.
2. Make every resource link **clickable and prominent** on every detail page, and give each detail page its own internal TOC.
3. Standardize the four-part **abstract format** so every resource answers the same four questions under identical headings.

A separate writing-tightening pass is **out of scope** for this implementation. The user will handle sentence-level edits after the structural work lands.

---

## Non-goals

- No changes to `/how-it-was-built`.
- No in-body link enrichment (e.g., turning "GitHub CLI documentation" into a link inside abstract prose).
- No change to the resource list (stays at 7).
- No writing tightening / audit queue in this pass.

---

## Architecture

### Homepage (`app/page.tsx`)

Five vertical bands, top to bottom:

1. **Hero** — unchanged. "Build something real." display headline, subtitle, audience line, meta-narrative pointer to `/how-it-was-built`.
2. **Front matter band** — new. Visually distinct from the hero (narrower column, accent rule above and below, or a slightly different background tone). Contains five labeled subsections, each with a small-caps eyebrow heading in the existing display font:
   - **Who this guide is for**
   - **What's in it (and what's not)**
   - **What you should already know**
   - **How it's organized**
   - **How to use this guide**
   Each subsection is 1–3 short sentences. No walls of prose.
3. **Table of contents** — expanded to two levels. Section titles remain at level 1; each section's resources are listed beneath as level 2. Every entry is a hyperlink: section titles anchor to the section block on the homepage; resource titles link to `/resources/[slug]`.
4. **Section content blocks** — unchanged structurally. Big numeral, section title, intro, resource cards.
5. **Footer** — unchanged.

### Resource detail page (`app/resources/[slug]/page.tsx`)

Six bands, top to bottom:

1. **Header strip** — existing back link to homepage section anchor, category eyebrow, resource title.
2. **Resource URL CTA** — new. Prominent clickable anchor directly under the title, styled unmistakably as a link (e.g., "Visit resource →" with the URL visible). Uses the existing `url` field, opens in a new tab with `rel="noopener noreferrer"`.
3. **Page-level TOC** — new. Compact list of anchor links to the four abstract sections within this page. Same visual register as the homepage TOC.
4. **Four labeled abstract sections** — restructured for consistency. Each section has an identical, visible heading across all 7 resources:
   - **What it is**
   - **What's in it**
   - **Why it matters for you**
   - **How to use it efficiently**
   Section IDs match the page-level TOC anchors (`#what-it-is`, `#whats-in-it`, `#why-it-matters`, `#how-to-use`).
5. **Next Step block** — new. One-line actionable prompt at the bottom of every page. Visually distinct (boxed, accent rule, or labeled "Next step:"). Format: short imperative, optionally with effort estimate (e.g., "Start with the Quickstart — 30 minutes").
6. **Footer** — unchanged.

---

## Data model changes

`lib/resources.ts`:

- Keep the four existing abstract fields (`what`, `content`, `relevance`, `tips`). Only the displayed headings change in the rendering layer.
- Add one new required field to the `Resource` interface: `nextStep: string` — a one-line actionable prompt rendered in the Next Step block.
- Draft a `nextStep` value for each of the 7 resources as part of this work.

No other shape changes.

---

## Component breakdown

New or substantially modified components:

- **FrontMatter** (homepage section) — five labeled subsections. Inline in `app/page.tsx` is acceptable if the markup stays manageable; extract to a component if it grows past ~150 lines.
- **HomepageTOC** (modified) — expanded to render section → resources, all hyperlinked.
- **ResourceCTA** (resource detail page) — clickable URL block under the title.
- **PageTOC** (resource detail page) — anchor links to the four abstract sections.
- **NextStep** (resource detail page) — boxed one-liner at the bottom.

Existing components left alone: `SiteHeader`, the section content blocks on the homepage, the `/how-it-was-built` page.

---

## Content to write

Net-new writing produced as part of this work:

1. Five front-matter subsections (homepage):
   - Who this guide is for (audience statement, ~1–2 sentences)
   - What's in it (and what's not) (scope, in/out, ~2–3 sentences)
   - What you should already know (prerequisites, ~1–2 sentences)
   - How it's organized (the learn → build → showcase progression made explicit, ~2 sentences)
   - How to use this guide (where to start, what order, how to read each entry, ~2–3 sentences)
2. Seven `nextStep` lines, one per resource.

All other prose stays untouched in this pass.

---

## Implementation order

1. Data model: add `nextStep` field to the `Resource` interface and draft the 7 values.
2. Resource detail page: URL CTA, page-level TOC, labeled section headings on the four abstracts, Next Step block.
3. Homepage: front matter band content (five subsections), expanded two-level TOC.
4. Visual QA pass in the browser. Check every link (homepage section anchors, homepage → detail page links, detail page → external resource URLs, detail page anchor TOC).

---

## Acceptance criteria

- Homepage displays five labeled front-matter subsections between the hero and the TOC.
- Homepage TOC has two levels (sections + nested resources). Every entry is a hyperlink.
- Every resource detail page shows a clickable, prominent link to the resource's external URL.
- Every resource detail page has a page-level TOC anchoring to its four abstract sections.
- All seven detail pages use identical headings for the four abstract sections.
- Every detail page ends with a Next Step block.
- `/how-it-was-built` is unchanged.
- The resource list remains at 7.
- Type-checks pass; no console errors in the browser; no broken links.
