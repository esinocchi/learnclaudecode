# Rubric Gap Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development for Track A. Track B is user-driven (the user runs `/impeccable` themselves). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining rubric gaps from `Instructions.md` — accessibility, audience-specific writing, multicultural readability, and footer informativeness — using a hybrid approach: direct technical and voice-matched writing edits in Track A, then `/impeccable` for visual design refinement in Track B.

**Architecture:** Track A makes surgical edits to `app/page.tsx`, `app/resources/[slug]/page.tsx`, `app/how-it-was-built/page.tsx`, and `lib/resources.ts` for accessibility (skip link, semantic `<h2>`), em-dash cleanup, and voice-matched content rewrites. Track B uses the impeccable plugin to redesign the footer, fix prose-text contrast, and add a focus-ring system.

**Tech Stack:** Next.js 16.2.4, React 19, TypeScript 5, Tailwind 4, inline styles + OKLCH color tokens. No test framework — verification is `npx tsc --noEmit`, `npm run build`, and manual browser QA. The user does not commit per task; they review and commit once at the end.

**Voice signals to preserve in writing tasks** (extracted from the existing site):
- Short declarative sentences. Deductive: lead with the main point.
- **No em dashes anywhere.** Use commas, periods, colons, or restructured sentences.
- Concrete numbers and specifics ("two or three", "thirty minutes") over vague qualifiers ("several", "quickly").
- No corporate filler ("leverage", "robust", "comprehensive", "cutting-edge").
- Mention Penn State by name when relevant; speak directly to the audience.
- Imperative or impersonal frame ("Start with the Quickstart", "Without a GitHub repository...") over "you can" hedging.
- Comparison via concrete contrast ("the difference between X and Y").
- Period-separated short clauses preferred over compound sentences with "and" pile-ups.

---

## File Structure

**Will modify:**
- `app/page.tsx` — add skip-link target, fix em dash in front matter Usage body.
- `app/resources/[slug]/page.tsx` — add skip-link target, convert abstract section labels from `<p>` to `<h2>` while preserving visual style.
- `app/how-it-was-built/page.tsx` — add skip-link target only.
- `app/components/SiteHeader.tsx` — add skip-to-content link as the first focusable element.
- `lib/resources.ts` — fix em dash in `claude-code-docs.nextStep`; rewrite 2 `relevance` fields and 2 `tips` fields in user voice; expand abbreviations on first use across resources.

**Track B (impeccable) will additionally touch:**
- The footer block in each page file (homepage, resource detail, how-it-was-built).
- A global token file or inline style values for the accent color used on prose-sized text.
- A focus-ring style applied to interactive elements.

The exact files for Track B will be set by the impeccable workflow; this plan does not pre-specify implementation details for those tasks because the impeccable shape brief drives them.

---

# Track A — Direct technical and writing fixes (subagent-driven)

## Task 1: Add skip-to-content link

**Files:**
- Modify: `app/components/SiteHeader.tsx`
- Modify: `app/page.tsx` (add `id="main-content"` to the centered content wrapper)
- Modify: `app/resources/[slug]/page.tsx` (add `id="main-content"` to the `<main>` element)
- Modify: `app/how-it-was-built/page.tsx` (add `id="main-content"` to the centered content wrapper)

A visually hidden link that becomes visible on focus, allowing keyboard and screen-reader users to skip past the masthead and TOC.

- [ ] **Step 1: Read `app/components/SiteHeader.tsx`**

This is the component that already wraps every page. The skip link should be the first focusable element so a `Tab` press surfaces it immediately.

- [ ] **Step 2: Add the skip link as the first child of the SiteHeader root**

At the very top of the component's returned JSX, before any other element, insert:

```tsx
<a
  href="#main-content"
  style={{
    position: "absolute",
    left: "-9999px",
    top: "0.5rem",
    zIndex: 100,
    padding: "0.625rem 1rem",
    backgroundColor: "oklch(18% 0.015 250)",
    color: "oklch(97% 0.008 75)",
    fontSize: "0.875rem",
    fontWeight: 700,
    borderRadius: "4px",
    textDecoration: "none",
  }}
  className="focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2"
>
  Skip to main content
</a>
```

The `focus:left-4` Tailwind utility moves it on-screen when focused. The inline absolute positioning with `left: -9999px` keeps it off-screen otherwise. (If the SiteHeader's root element is not `position: relative` or `position: absolute` already, also ensure the root is `position: relative` so the absolute child anchors correctly.)

- [ ] **Step 3: Add `id="main-content"` to the homepage wrapper**

In `app/page.tsx`, locate the outer centered content wrapper `<div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 3rem" }}>` and add `id="main-content"` to it. The element's opening tag becomes:

```tsx
<div
  id="main-content"
  style={{
    maxWidth: "960px",
    margin: "0 auto",
    padding: "0 3rem",
  }}
>
```

- [ ] **Step 4: Add `id="main-content"` to the resource detail `<main>`**

In `app/resources/[slug]/page.tsx`, locate the `<main>` element (currently `<main>` with no attributes, around the existing layout) and add `id="main-content"`:

```tsx
<main id="main-content">
```

- [ ] **Step 5: Add `id="main-content"` to the how-it-was-built page**

In `app/how-it-was-built/page.tsx`, locate the outer centered content wrapper (a `<div>` similar to the homepage's, with a `maxWidth` style) and add `id="main-content"`. If multiple wrappers exist, choose the outermost wrapper that contains the page's primary heading and content — not the `SiteHeader`.

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Manual verification**

Run: `npm run dev`. On any page, press `Tab` immediately after the page loads. Expected: a black "Skip to main content" pill appears in the top-left. Press `Enter`. Expected: focus jumps to the main content area.

---

## Task 2: Convert abstract section labels to `<h2>`

**Files:**
- Modify: `app/resources/[slug]/page.tsx`

The four abstract section labels ("What it is", "What's in it", "Why it matters for you", "How to use it efficiently") are currently styled `<p>` elements. Make them semantic `<h2>` so screen-reader users can navigate by heading. Visual style stays identical.

- [ ] **Step 1: Update the abstract rendering loop**

Locate the `{ABSTRACT_LABELS.map(({ key, label, id }) => (` block. The inner label is currently:

```tsx
<p
  style={{
    fontSize: "0.6875rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "oklch(68% 0.2 75)",
    marginBottom: "0.625rem",
    fontWeight: 700,
  }}
>
  {label}
</p>
```

Replace that `<p>` element with an `<h2>` and add inline overrides for default browser margin/font-size/font-weight so the visual rendering stays identical:

```tsx
<h2
  style={{
    fontSize: "0.6875rem",
    lineHeight: 1.3,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "oklch(68% 0.2 75)",
    margin: "0 0 0.625rem 0",
    fontWeight: 700,
    fontFamily: "var(--font-body)",
  }}
>
  {label}
</h2>
```

The `margin: "0 0 0.625rem 0"` zeroes out the default `<h2>` top margin while preserving the original bottom margin. The `fontFamily: "var(--font-body)"` prevents the browser from picking up the display font default for `<h2>`.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visual diff check**

Run: `npm run dev`. Visit `/resources/claude-code-docs`. Compare the four abstract section labels visually before and after the change (open another browser tab to a deployed version or use git stash). Expected: identical appearance — same size, color, letter-spacing, weight, and spacing.

- [ ] **Step 4: Heading order check**

In DevTools, in the Accessibility tab (or via the "Outline" feature in Firefox), inspect the page heading hierarchy. Expected: one `<h1>` (the resource title), then four `<h2>` (one per abstract section). No skipped levels.

---

## Task 3: Remove introduced em dashes

**Files:**
- Modify: `lib/resources.ts` (the `claude-code-docs` resource's `nextStep` field)
- Modify: `app/page.tsx` (the FRONT_MATTER `Usage` body)

Two em dashes were introduced into recently added content. The site otherwise has zero em dashes by design.

- [ ] **Step 1: Fix `claude-code-docs.nextStep`**

In `lib/resources.ts`, find the `nextStep: "Open the Quickstart and follow it end to end — about 30 minutes."` line and replace with:

```typescript
nextStep: "Open the Quickstart and follow it end to end. About thirty minutes.",
```

(The number is also spelled out for consistency with the rest of the site, which writes time durations as words.)

- [ ] **Step 2: Fix the FRONT_MATTER Usage body**

In `app/page.tsx`, find the Usage entry inside `FRONT_MATTER`. Its `body` currently contains:

```
Read the Next Step before you click through — it tells you exactly what to do at the resource.
```

Replace that single sentence with two sentences (no em dash):

```
Read the Next Step before you click through. It tells you exactly what to do at the resource.
```

The full Usage body becomes:

```typescript
{
  eyebrow: "Usage",
  heading: "How to use this guide",
  body: "Start with Section 1 if you have never used Claude Code. Each resource has its own page with a direct link, a four-part abstract (what, contents, relevance, usage tips), and a one-line Next Step. Read the Next Step before you click through. It tells you exactly what to do at the resource. Return here whenever you start a new phase of the project.",
},
```

- [ ] **Step 3: Confirm zero em dashes site-wide**

Run: `grep -rn "—" app/ lib/`
Expected: no matches.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

---

## Task 4: Sharpen two `relevance` fields for Penn State audience specificity

**Files:**
- Modify: `lib/resources.ts` (the `karpathy-claude-skills` and `github-portfolio` resources' `abstract.relevance` fields)

Two of the six abstracts open `relevance` with general statements ("Seeing how an expert...", "Employers in software engineering..."). The rubric's Audience Adaptation criterion wants every abstract tied to the specific audience. Rewrites use the user's voice signals and stay close in length and shape to the originals.

- [ ] **Step 1: Replace `karpathy-claude-skills.abstract.relevance`**

Find the current value:

```
"Seeing how an expert uses a tool is often more useful than reading the documentation. The CLAUDE.md file is one of the most underused Claude Code features for beginners, and Karpathy's examples show why it matters. A well-written CLAUDE.md changes the quality of everything Claude generates for your project. Adapting even a few lines to a personal project will produce noticeably better results than running Claude Code without one."
```

Replace with:

```
"For a Penn State student new to Claude Code, seeing how an expert uses the tool teaches more than the documentation alone. The CLAUDE.md file is the most underused Claude Code feature for first-time users, and Karpathy's examples show why it matters. A well-written CLAUDE.md changes the quality of everything Claude generates for your project. Even four or five adapted lines will produce noticeably better results than running Claude Code without one."
```

Changes: opening sentence names the audience; "is often more useful" tightens to "teaches more than"; "is one of the most underused" tightens to "is the most underused"; "Adapting even a few lines to a personal project" tightens to "Even four or five adapted lines".

- [ ] **Step 2: Replace `github-portfolio.abstract.relevance`**

Find the current value:

```
"Employers in software engineering routinely check GitHub profiles during hiring. A profile with documented projects shows that you can build things, understand version control, and explain your work. A profile with no activity, or with repositories that have no README, communicates the opposite. The projects you build with Claude Code belong on GitHub, presented in a way that communicates clearly."
```

Replace with:

```
"Recruiters interviewing Penn State CS students check GitHub profiles before the interview. A profile with documented projects shows that you can build things, understand version control, and explain your work. A profile with no activity, or with repositories that have no README, communicates the opposite. The projects you build with Claude Code belong on GitHub, presented in a way that reads clearly to a hiring manager."
```

Changes: opening names the Penn State audience and a concrete moment (before the interview); closing sentence "communicates clearly" sharpens to "reads clearly to a hiring manager".

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify both abstracts still display correctly**

Run: `npm run dev`. Visit `/resources/karpathy-claude-skills` and `/resources/github-portfolio`. Confirm the rewritten paragraphs render in the "Why it matters for you" section.

---

## Task 5: Trim two `tips` fields for length

**Files:**
- Modify: `lib/resources.ts` (the `karpathy-claude-skills` and `github-portfolio` resources' `abstract.tips` fields)

Both of these `tips` blocks run long (5+ sentences with internal redundancy). Rewrites preserve every concrete instruction while collapsing redundancy.

- [ ] **Step 1: Replace `karpathy-claude-skills.abstract.tips`**

Find the current value:

```
"Read the CLAUDE.md files before anything else in the repository. Notice how they are written: short, imperative sentences that state constraints and conventions without explanation. Then open a blank file in your own project and start adding instructions. What language are you using? What should Claude never change? What conventions matter? Three or four lines is enough to see an immediate improvement. Do not copy these files directly. Understand why each instruction is there and include only what applies to your project."
```

Replace with:

```
"Read the CLAUDE.md files before anything else in the repository. Notice the structure: short imperative sentences stating constraints and conventions without explanation. Open a blank file in your own project and add three or four lines covering what language you use, what Claude should never change, and what conventions matter. That is enough to see an immediate improvement. Do not copy Karpathy's files directly. Understand why each instruction is there and keep only what applies to your project."
```

Changes: rhetorical questions collapsed into a single instructional sentence; "Three or four lines is enough" pulled forward; final two sentences kept verbatim because they carry the "do not copy" warning.

- [ ] **Step 2: Replace `github-portfolio.abstract.tips`**

Find the current value:

```
"Pin your two or three best projects. Write a README for every project that answers three questions: what it does, how to run it, and what you decided while building it. If there is a live demo, link to it prominently. Add a brief bio mentioning Penn State and your intended major, and include a LinkedIn link if you have one. Commit regularly as you build, not just at the end. A commit history showing a project evolving over several days is more credible than a single large commit."
```

Replace with:

```
"Pin your two or three best projects. Write a README for each that answers three questions: what it does, how to run it, and what you decided while building it. Link to a live demo if there is one. Add a brief bio mentioning Penn State and your intended major, and include a LinkedIn link if you have one. Commit regularly as you build. A history showing a project evolving over several days is more credible than a single large commit."
```

Changes: "for every project" becomes "for each"; "If there is a live demo, link to it prominently" tightens to "Link to a live demo if there is one"; "not just at the end" cut as redundant with "regularly"; "A commit history" trims to "A history".

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

---

## Task 6: Expand abbreviations on first use (multicultural readability pass)

**Files:**
- Modify: `lib/resources.ts`

Three abbreviations appear in body copy without expansion: `CLI`, `AI`, `TDD`. The hero already uses "Penn State CS" as a brand-style label, and the front matter says "computer science theory", so "CS" is sufficiently introduced and does not need further expansion. Each abbreviation gets expanded the first time it appears in body prose.

- [ ] **Step 1: Expand `CLI` in `claude-code-docs.abstract.what`**

Find:

```
"...Covers installation, prompt strategies, CLI commands, and workflow integrations..."
```

Replace with:

```
"...Covers installation, prompt strategies, command-line interface (CLI) commands, and workflow integrations..."
```

- [ ] **Step 2: Expand `AI` in `karpathy-claude-skills.abstract.what`**

Find:

```
"...Karpathy co-founded OpenAI, led Tesla Autopilot AI, and is an active Claude Code user..."
```

Replace with:

```
"...Karpathy co-founded OpenAI, led Tesla Autopilot's artificial intelligence (AI) work, and is an active Claude Code user..."
```

- [ ] **Step 3: Expand `TDD` in `superpowers.abstract.content`**

Find:

```
"...TDD enforces the red-green-refactor cycle: write the test first, make it pass, then clean up the code..."
```

Replace with:

```
"...Test-driven development (TDD) enforces the red-green-refactor cycle: write the test first, make it pass, then clean up the code..."
```

- [ ] **Step 4: Verify subsequent uses of `TDD` still work**

In the same `superpowers.abstract.tips` field, the phrase "If you are new to test-driven development, the TDD skill..." already expands TDD in-line. Leave it as is — it is the second mention and still reads cleanly.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Verify display in browser**

Run: `npm run dev`. Spot-check the three resource pages: `/resources/claude-code-docs`, `/resources/karpathy-claude-skills`, `/resources/superpowers`. Confirm the expanded abbreviations render correctly in the abstract sections.

---

# Track B — Impeccable design refinement (user-driven)

These tasks are run by the user via the `/impeccable` slash command, not by subagents. The plan documents the inputs (briefs) the user should provide so the impeccable workflow has clear targets.

## Task 7: Footer redesign via /impeccable

**Files (will be modified by impeccable):**
- `app/page.tsx` (homepage footer block)
- `app/resources/[slug]/page.tsx` (resource detail footer block)
- `app/how-it-was-built/page.tsx` (how-it-was-built footer block)

The current footer is a single line: `Claude Code: A Field Guide · Penn State · 2026 · How this was built →`. The rubric calls out "informative headers and footers." Goal: a more substantive footer carrying course context, navigation, and a last-reviewed date — without breaking the editorial restraint of the design.

- [ ] **Step 1: Run `/impeccable teach` if PRODUCT.md does not exist**

Check: does `PRODUCT.md` exist at the project root?
- If yes, skip this step.
- If no, run `/impeccable teach` to create it. The teach prompt will ask about audience, brand, tone, anti-references, and strategic principles. Use the existing front matter content (Audience, Scope, Prerequisites, Organization, Usage) as the basis for your answers.

- [ ] **Step 2: Provide this shape brief to `/impeccable shape`**

```
Redesign the footer of an editorial Internet resource guide. The site is for first-year Penn State CS students learning Claude Code. The current footer is one line of meta and feels under-built. The new footer must:

- Carry: course byline (ENGL 202C, Spring 2026), site name, year, last-reviewed date (April 2026), and a small set of navigation links (Home, How this was built, top of page).
- Match the editorial voice: small caps eyebrows, light display-font weights, generous spacing, an oklch palette with cream background and gold accents. No corporate filler.
- No em dashes. No emojis.
- Stay restrained: a single horizontal band, not a sitemap.
- Render identically across all three page types (homepage, resource detail, how-it-was-built).

Anti-references: Bootstrap-style three-column footers with social icons. Sitemap-heavy footers. Gradient backgrounds.
```

- [ ] **Step 3: Confirm the shape brief, then run `/impeccable craft`**

Wait for impeccable to produce a confirmed shape design brief before allowing it to edit files. Once approved, let `/impeccable craft` implement.

- [ ] **Step 4: Verify the footer renders consistently across all three page types**

Visit `/`, `/resources/claude-code-docs`, and `/how-it-was-built`. Confirm the footer is byte-identical across pages (or factor it into a shared `SiteFooter` component if impeccable proposes one).

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

---

## Task 8: Contrast adjustment for prose-sized accent text via /impeccable

**Files (will be modified by impeccable):**
- The files where the gold accent (`oklch(68% 0.2 75)`) is applied to prose-sized text. Likely candidates: `app/page.tsx`, `app/resources/[slug]/page.tsx`, possibly a shared design tokens location.

The accent color `oklch(68% 0.2 75)` fails WCAG AA contrast against the cream `oklch(97% 0.008 75)` background for body-size text. It is currently used on caption text (display URLs, eyebrow labels). Decorative use (numerals, borders) can stay.

- [ ] **Step 1: Provide this shape brief to `/impeccable shape`**

```
Audit and fix prose-sized accent-color text on this site. Constraints:
- The accent gold is oklch(68% 0.2 75). It is acceptable for decorative numerals (e.g., "01", "02") and 1px borders, but must not be used for prose at small (≤0.875rem) sizes against the cream oklch(97% 0.008 75) background.
- Where prose readability is at stake, swap to a darker variant of the same hue — propose a value that hits WCAG AA against the cream background. The existing "deep" hover variant oklch(56% 0.22 75) is a candidate.
- Eyebrow labels (uppercase, 0.6875rem, letter-spacing 0.14em, fontWeight 700) are borderline by spec; large letter-spacing and weight raise effective legibility. Decide based on actual contrast measurement, not assumption.
- Do not change decorative numerals or borders.
- Do not introduce new colors. Use only the existing OKLCH palette.

Output: a list of specific style sites where the color was changed, and the new value used. Confirm WCAG AA pass for each changed site.
```

- [ ] **Step 2: Confirm the shape brief, then run `/impeccable craft`**

- [ ] **Step 3: Manual contrast verification**

Use a contrast checker (e.g., DevTools' built-in accessibility pane or webaim.org/resources/contrastchecker) to verify every changed site passes WCAG AA against the cream background.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

---

## Task 9: Focus-ring system via /impeccable

**Files (will be modified by impeccable):**
- A global style location (`app/globals.css` or wherever the site's base utilities live) and/or per-component additions.

Default browser focus styles vary across browsers. A consistent focus-ring system supports keyboard accessibility and visually reinforces interactive elements.

- [ ] **Step 1: Provide this shape brief to `/impeccable shape`**

```
Add a consistent keyboard focus-ring system to all interactive elements on this site:
- All anchor links (homepage TOC, page-level TOC, resource cards, "Visit resource" CTA, "Skip to main content", footer links).
- The skip-to-content link already has its own focus styles (focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2). Reuse or extend that pattern.
- Use the deep accent oklch(56% 0.22 75) at 2px outline width with 2px offset.
- Apply only on :focus-visible (not :focus), so mouse clicks do not trigger the ring.
- Do not affect hover states or any non-focus state.
- The ring must be visible against both the cream background (most pages) and any dark elements introduced by the footer redesign (Task 7).

Output: a single source of truth (one CSS class or one Tailwind utility) that handles every interactive element on the site, plus a list of every place it was applied.
```

- [ ] **Step 2: Confirm the shape brief, then run `/impeccable craft`**

- [ ] **Step 3: Manual keyboard verification**

Run: `npm run dev`. On `/`, press `Tab` repeatedly from the start of the page. Every interactive element should show a visible 2px deep-gold focus ring with offset. No element should be silently skipped or unfocusable. Repeat on `/resources/claude-code-docs`.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

---

# Final verification

## Task 10: Full-site QA pass

**Files:** None (verification only)

After Tracks A and B both complete, run a final pass to confirm nothing regressed and every rubric gap is closed.

- [ ] **Step 1: Type-check and build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 2: Em-dash audit**

Run: `grep -rn "—" app/ lib/`
Expected: no matches.

- [ ] **Step 3: Heading hierarchy audit**

Use DevTools accessibility pane on `/` and `/resources/claude-code-docs`. Verify:
- Each page has exactly one `<h1>`.
- `<h2>` levels do not skip to `<h4>` etc.
- The four abstract sections on every resource detail page are `<h2>`.

- [ ] **Step 4: Keyboard navigation walkthrough**

On `/`:
- Tab from page load. The skip-to-content link should appear first.
- Activate it. Focus should land in the main content area.
- Continue tabbing. Every interactive element gets a focus ring.

Repeat on `/resources/claude-code-docs` and `/how-it-was-built`.

- [ ] **Step 5: Content QA — voice spot-check**

Read the rewritten passages on these pages and confirm the voice matches the surrounding prose:
- `/resources/karpathy-claude-skills` — "Why it matters for you" and "How to use it efficiently" sections.
- `/resources/github-portfolio` — same two sections.
- `/resources/claude-code-docs` — Next Step block ("About thirty minutes.").
- Homepage — front matter Usage section.

- [ ] **Step 6: Footer consistency**

Confirm the redesigned footer renders identically on all three page types: `/`, `/resources/claude-code-docs`, `/how-it-was-built`.

- [ ] **Step 7: Untouched-page check**

Confirm the resource cards, section blocks, hero, and `/how-it-was-built` body content all still render correctly. Nothing in scope should have changed inside resource detail page abstracts beyond the heading-tag swap, content rewrites, and footer.

---

## Done criteria

- All 10 tasks checked off.
- `npx tsc --noEmit` and `npm run build` both pass.
- Skip-to-content link works on every page.
- Every abstract section label is an `<h2>` with identical visual presentation to before.
- No em dashes anywhere in `app/` or `lib/`.
- The two rewritten `relevance` and two rewritten `tips` fields read in the user's voice.
- Three abbreviations (CLI, AI, TDD) are expanded on first use.
- Footer carries course byline, site name, year, last-reviewed date, and basic navigation; renders identically across all three page types.
- All prose-sized accent text passes WCAG AA contrast.
- Every interactive element shows a visible focus ring on `:focus-visible`.
- Working tree contains uncommitted changes ready for the user to review and commit.
