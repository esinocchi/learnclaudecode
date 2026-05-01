# Peer Review Revisions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address the peer review of the Internet Resource Guide by adding labeled front matter, a two-level TOC, prominent resource link CTAs, per-page TOCs on resource detail pages, consistent abstract headings, and Next Step blocks. No writing tightening in this pass.

**Architecture:** Next.js 16 (App Router), React 19, inline styles + Tailwind utility classes. All content lives in `lib/resources.ts`. The two pages touched are `app/page.tsx` (homepage) and `app/resources/[slug]/page.tsx` (resource detail). One new field (`nextStep`) is added to the `Resource` interface; abstract field shape stays the same (only displayed labels change).

**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind 4, inline styles using OKLCH color tokens.

**Important:** This Next.js version has breaking changes from older training data. Read `node_modules/next/dist/docs/` if you hit unfamiliar APIs. The codebase has no test framework — verification is via `npx tsc --noEmit`, `npm run build`, and manual browser QA. Do not add Jest/Vitest just to satisfy TDD ceremony.

---

## File Structure

**Will modify:**
- `lib/resources.ts` — add `nextStep` field to `Resource` interface; populate it for all 7 resources.
- `app/resources/[slug]/page.tsx` — restructure: promote URL to CTA, add page-level TOC, rename abstract labels, add Next Step block, give abstract sections IDs.
- `app/page.tsx` — add front matter band between hero and TOC; expand TOC to two levels.

**Will create:** None. All new content is inline in the two pages above. Components stay where they live now (`SiteHeader`, `ClaudeLogo`); we are not introducing new files unless markup grows past ~150 lines, which it won't here.

---

## Task 1: Add `nextStep` field to the Resource interface and populate values

**Files:**
- Modify: `lib/resources.ts`

- [ ] **Step 1: Add `nextStep` to the `Resource` interface**

In `lib/resources.ts`, modify the `Resource` interface (lines 1–16) to add a required `nextStep: string` field. Final shape:

```typescript
export interface Resource {
  slug: string;
  title: string;
  url: string;
  displayUrl: string;
  category: string;
  sectionId: string;
  sectionNumber: string;
  teaser: string;
  abstract: {
    what: string;
    content: string;
    relevance: string;
    tips: string;
  };
  nextStep: string;
}
```

- [ ] **Step 2: Verify the type error surfaces**

Run: `npx tsc --noEmit`
Expected: Errors on each of the 7 resource entries in `resources` array — "Property 'nextStep' is missing in type ..."

This confirms the type is now required everywhere.

- [ ] **Step 3: Add `nextStep` value to each of the 7 resources**

Add the field at the end of each resource object (after `abstract`). Use these values verbatim:

For `claude-code-docs`:
```typescript
nextStep: "Open the Quickstart and follow it end to end — about 30 minutes.",
```

For `karpathy-claude-skills`:
```typescript
nextStep: "Read one CLAUDE.md file, then write a four-line CLAUDE.md for your own project.",
```

For `github-docs`:
```typescript
nextStep: "Complete the Hello World guide and create your first repository — about 10 minutes.",
```

For `impeccable-style`:
```typescript
nextStep: "Install the plugin and run /impeccable teach in any project to set design context.",
```

For `superpowers`:
```typescript
nextStep: "Install Superpowers and start your next feature with the brainstorming skill.",
```

For `github-portfolio`:
```typescript
nextStep: "Pin two or three repositories on your profile and write a README for each.",
```

For `penn-state-career-services`:
```typescript
nextStep: "Download the CS resume template and add a Projects section with one entry.",
```

- [ ] **Step 4: Verify type errors are resolved**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add lib/resources.ts
git commit -m "feat(resources): add nextStep field with values for all 7 resources"
```

---

## Task 2: Standardize abstract section labels on the resource detail page

**Files:**
- Modify: `app/resources/[slug]/page.tsx:21-26`

The current `ABSTRACT_LABELS` constant uses inconsistent question-style labels ("What is this?", "Tips for using it"). Replace with the four standardized labels from the design.

- [ ] **Step 1: Update `ABSTRACT_LABELS`**

Replace the const at lines 21–26 with:

```typescript
const ABSTRACT_LABELS = [
  { key: "what", label: "What it is", id: "what-it-is" },
  { key: "content", label: "What's in it", id: "whats-in-it" },
  { key: "relevance", label: "Why it matters for you", id: "why-it-matters" },
  { key: "tips", label: "How to use it efficiently", id: "how-to-use" },
] as const;
```

- [ ] **Step 2: Add `id` attribute to each rendered abstract section**

In the abstract rendering loop (lines 165–190), the outer wrapper currently is `<div key={key}>`. Change it to also set the `id` from the new `id` field so anchor links work. Final block:

```tsx
{ABSTRACT_LABELS.map(({ key, label, id }) => (
  <div key={key} id={id} style={{ scrollMarginTop: "2rem" }}>
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
    <p
      style={{
        fontSize: "1rem",
        color: "oklch(28% 0.012 250)",
        lineHeight: 1.75,
        maxWidth: "64ch",
      }}
    >
      {resource.abstract[key]}
    </p>
  </div>
))}
```

`scrollMarginTop` ensures anchored sections are not hidden behind the sticky header when jumped to.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verification in the browser**

Run: `npm run dev`
Visit: `http://localhost:3000/resources/claude-code-docs`
Verify: The four abstract sections now show the new headings ("What it is", "What's in it", "Why it matters for you", "How to use it efficiently").

- [ ] **Step 5: Commit**

```bash
git add app/resources/[slug]/page.tsx
git commit -m "refactor(resource-page): standardize abstract section labels"
```

---

## Task 3: Promote the resource URL into a prominent CTA

**Files:**
- Modify: `app/resources/[slug]/page.tsx:136-154`

The URL is currently a small text link under the title. Promote it to a prominent CTA — bigger, bordered, unmistakably a link, opens in a new tab.

- [ ] **Step 1: Replace the current `<a>` block with a CTA-styled anchor**

Replace lines 136–154 with:

```tsx
<a
  href={resource.url}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    border: "1px solid oklch(68% 0.2 75)",
    borderRadius: "4px",
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "oklch(56% 0.22 75)",
    textDecoration: "none",
    marginBottom: "0.75rem",
    transition: "background-color 0.2s ease, color 0.2s ease",
    cursor: "pointer",
  }}
  className="hover:bg-accent hover:text-white"
>
  Visit resource
  <span aria-hidden="true">↗</span>
</a>

<p
  style={{
    fontSize: "0.75rem",
    color: "oklch(58% 0.008 250)",
    fontFamily: "var(--font-body)",
    marginBottom: "2.5rem",
    wordBreak: "break-all",
  }}
>
  {resource.displayUrl}
</p>
```

This produces a bordered "Visit resource ↗" button with the URL displayed underneath as plain caption text (so the URL itself is still visible and copyable, but the click target is the prominent button).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev` (if not already running)
Visit: `http://localhost:3000/resources/claude-code-docs`
Verify:
- A bordered "Visit resource ↗" button appears under the title.
- Clicking it opens `https://docs.anthropic.com/en/docs/claude-code` in a new tab.
- The display URL appears as small caption text underneath.

Repeat for one resource from each section to confirm the link works across resources.

- [ ] **Step 4: Commit**

```bash
git add app/resources/[slug]/page.tsx
git commit -m "feat(resource-page): promote resource URL to prominent CTA"
```

---

## Task 4: Add a page-level TOC to resource detail pages

**Files:**
- Modify: `app/resources/[slug]/page.tsx` (insert between the URL CTA block and the existing horizontal rule on line 156)

A compact navigation block that anchor-links to the four abstract sections within the page.

- [ ] **Step 1: Insert the page-level TOC block**

Locate the `<div style={{ borderTop: ... marginBottom: "2.5rem" }} />` around line 156 (the rule that separates the URL from the abstract sections). **Immediately before** that rule, insert this new block:

```tsx
{/* Page-level TOC */}
<nav
  aria-label="On this page"
  style={{
    marginBottom: "2.5rem",
    paddingTop: "1.75rem",
    paddingBottom: "1.75rem",
    borderTop: "1px solid oklch(87% 0.014 75)",
    borderBottom: "1px solid oklch(87% 0.014 75)",
  }}
>
  <p
    style={{
      fontSize: "0.6875rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "oklch(58% 0.008 250)",
      marginBottom: "0.875rem",
      fontWeight: 700,
    }}
  >
    On this page
  </p>
  <ol
    style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
    }}
  >
    {ABSTRACT_LABELS.map(({ id, label }, idx) => (
      <li key={id}>
        <a
          href={`#${id}`}
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "0.625rem",
            fontSize: "0.875rem",
            color: "oklch(40% 0.012 250)",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          className="hover:text-accent-deep"
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "oklch(68% 0.2 75)",
            }}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          {label}
        </a>
      </li>
    ))}
  </ol>
</nav>
```

- [ ] **Step 2: Remove the now-redundant separator rule**

The `<div style={{ borderTop: ... marginBottom: "2.5rem" }} />` immediately after the new `<nav>` block is now redundant (the nav has its own bottom border). Delete that single line.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`
Visit: `http://localhost:3000/resources/claude-code-docs`
Verify:
- A bordered "On this page" block appears between the URL CTA and the abstract.
- It lists the four abstract sections numbered 01–04.
- Clicking "Why it matters for you" scrolls to that section without hiding it under the sticky header.

- [ ] **Step 5: Commit**

```bash
git add app/resources/[slug]/page.tsx
git commit -m "feat(resource-page): add page-level TOC anchoring to abstract sections"
```

---

## Task 5: Add Next Step block to resource detail pages

**Files:**
- Modify: `app/resources/[slug]/page.tsx` (insert between the abstract section loop and the "Return link" block — currently around line 192)

A boxed one-liner with the actionable prompt for each resource.

- [ ] **Step 1: Insert the Next Step block**

After the closing `</div>` of the abstract sections wrapper (line 191), and **before** the `{/* Return link */}` block (line 193), insert:

```tsx
{/* Next Step */}
<aside
  style={{
    marginTop: "3rem",
    padding: "1.5rem 1.75rem",
    backgroundColor: "oklch(94% 0.025 75)",
    borderLeft: "3px solid oklch(68% 0.2 75)",
    borderRadius: "2px",
  }}
>
  <p
    style={{
      fontSize: "0.6875rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "oklch(56% 0.22 75)",
      marginBottom: "0.5rem",
      fontWeight: 700,
    }}
  >
    Next step
  </p>
  <p
    style={{
      fontSize: "1rem",
      color: "oklch(18% 0.015 250)",
      lineHeight: 1.6,
      margin: 0,
    }}
  >
    {resource.nextStep}
  </p>
</aside>
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`
Visit each of the 7 resource detail pages:
- `/resources/claude-code-docs`
- `/resources/karpathy-claude-skills`
- `/resources/github-docs`
- `/resources/impeccable-style`
- `/resources/superpowers`
- `/resources/github-portfolio`
- `/resources/penn-state-career-services`

Verify: Each page shows the Next Step block at the bottom (above the "Return to guide" link) with the resource-specific prompt.

- [ ] **Step 4: Commit**

```bash
git add app/resources/[slug]/page.tsx
git commit -m "feat(resource-page): add Next Step block to every resource detail page"
```

---

## Task 6: Add front matter band to the homepage

**Files:**
- Modify: `app/page.tsx` (insert between the hero meta-narrative paragraph around line 98 and the TOC block around line 100)

Five labeled subsections inserted between the hero and the TOC. Visually distinct from the hero (rule above and below, smaller scale, two-column layout on wider screens for compactness).

- [ ] **Step 1: Define the front matter content as a typed const at the top of the file**

Just inside the `Home` function (above the `return`), or above it as a module-level const, add:

```typescript
const FRONT_MATTER = [
  {
    eyebrow: "Audience",
    heading: "Who this guide is for",
    body: "First-year Penn State CS students who want to use Claude Code to build a personal project from idea to deployable application. The guide assumes you are early in the major and looking for a structured starting point.",
  },
  {
    eyebrow: "Scope",
    heading: "What's in it (and what's not)",
    body: "Seven resources covering setup, building, and showcasing a project. The guide focuses on the workflow around Claude Code: documentation, expert configurations, version control, design, and how to present finished work. It does not cover programming fundamentals, computer science theory, or general AI literacy.",
  },
  {
    eyebrow: "Prerequisites",
    heading: "What you should already know",
    body: "Basic comfort writing code in any language, opening and using a terminal, and creating files in a project directory. No prior experience with Claude Code, Git, or web frameworks is assumed.",
  },
  {
    eyebrow: "Organization",
    heading: "How it's organized",
    body: "Three sections in the order you will actually need them: learn the tool, build a project, present the work. Each section contains the resources that matter at that stage. Read top to bottom for a complete arc, or jump to whichever section matches what you are doing right now.",
  },
  {
    eyebrow: "Usage",
    heading: "How to use this guide",
    body: "Start with Section 1 if you have never used Claude Code. Each resource has its own page with a direct link, a four-part abstract (what, contents, relevance, usage tips), and a one-line Next Step. Read the Next Step before you click through — it tells you exactly what to do at the resource. Return here whenever you start a new phase of the project.",
  },
] as const;
```

- [ ] **Step 2: Insert the front matter band into the homepage**

Locate the closing `</p>` of the meta-narrative paragraph (the one ending with `See how →`, around line 98) and the opening of the `{/* TOC */}` block (around line 100). **Between them**, immediately after the closing `</p>` of the meta-narrative and before `{/* TOC */}`, insert this new block:

```tsx
{/* Front matter */}
<section
  aria-label="Front matter"
  style={{
    borderTop: "1px solid oklch(87% 0.014 75)",
    borderBottom: "1px solid oklch(87% 0.014 75)",
    paddingTop: "3.5rem",
    paddingBottom: "3.5rem",
    marginBottom: "3rem",
    textAlign: "left",
  }}
>
  <p
    style={{
      fontSize: "0.6875rem",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "oklch(68% 0.2 75)",
      marginBottom: "2.5rem",
      fontFamily: "var(--font-body)",
      textAlign: "center",
    }}
  >
    About this guide
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "2.25rem 2.5rem",
      maxWidth: "780px",
      margin: "0 auto",
    }}
  >
    {FRONT_MATTER.map(({ eyebrow, heading, body }) => (
      <div key={eyebrow}>
        <p
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "oklch(68% 0.2 75)",
            marginBottom: "0.5rem",
            fontWeight: 700,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "oklch(18% 0.015 250)",
            letterSpacing: "-0.01em",
            marginBottom: "0.625rem",
            lineHeight: 1.25,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "oklch(40% 0.012 250)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`
Visit: `http://localhost:3000/`
Verify:
- An "About this guide" band appears between the hero ("Built with Claude Code... See how →") and the Contents (TOC).
- The band has a rule above and below it.
- Five subsections render: Audience, Scope, Prerequisites, Organization, Usage — each with eyebrow, heading, and body.
- On a wide viewport, sections lay out as a grid (2 or 3 columns); on a narrow viewport, they stack to one column.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): add front matter band with audience, scope, prerequisites, organization, and usage"
```

---

## Task 7: Expand homepage TOC to two levels

**Files:**
- Modify: `app/page.tsx:122-170` (the TOC table/div block)

Currently, the TOC lists only the three section titles. Add a nested list of resources under each section, each linking to its detail page. Section titles continue to anchor to the section block on the homepage.

- [ ] **Step 1: Replace the TOC inner block**

Locate the `<div style={{ display: "table", ... }}>` block (around line 122) and the `</div>` that closes it (around line 170). Replace the entire inner block (the table and everything inside it) with the following two-level list:

```tsx
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: "440px",
    margin: "0 auto",
    width: "100%",
  }}
>
  {sections.map((section) => {
    const sectionResources = getResourcesBySection(section.id);
    return (
      <div key={section.id} style={{ textAlign: "left" }}>
        <a
          href={`#${section.id}`}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.875rem",
            textDecoration: "none",
            color: "oklch(18% 0.015 250)",
            marginBottom: "0.75rem",
          }}
          className="hover:text-accent-deep"
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.875rem",
              fontWeight: 300,
              color: "oklch(68% 0.2 75)",
              minWidth: "1.75rem",
            }}
          >
            {section.number}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.0625rem",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            {section.title}
          </span>
        </a>
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.375rem",
            paddingLeft: "2.625rem",
          }}
        >
          {sectionResources.map((r) => {
            const rIdx = resources.findIndex((res) => res.slug === r.slug);
            const rNum = String(rIdx + 1).padStart(2, "0");
            return (
              <li key={r.slug}>
                <Link
                  href={`/resources/${r.slug}?back=${section.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "0.625rem",
                    fontSize: "0.875rem",
                    color: "oklch(40% 0.012 250)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  className="hover:text-accent-deep"
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "oklch(68% 0.2 75)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                    }}
                  >
                    {rNum}
                  </span>
                  {r.title}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    );
  })}
</div>
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`
Visit: `http://localhost:3000/`
Verify:
- The Contents block now shows three section entries.
- Under each section, the resources for that section are listed (2 + 3 + 2 = 7 total).
- Clicking a section title (e.g., "Setting Up Claude Code") scrolls down to that section block on the homepage.
- Clicking a resource title (e.g., "Claude Code Official Documentation") navigates to the resource detail page.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): expand TOC to two levels with hyperlinked resource entries"
```

---

## Task 8: Final verification — build, link audit, browser QA

**Files:** None (verification only)

A consolidated check that everything works end-to-end before declaring the work done.

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: Build succeeds with no type errors and no warnings about missing pages or invalid links.

If the build fails, fix the underlying error (do not bypass with `next.config.ts` ignore flags).

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

- [ ] **Step 3: Homepage QA checklist**

Visit: `http://localhost:3000/`

Verify each of the following:

- [ ] Hero renders unchanged ("Build something real.").
- [ ] Front matter band ("About this guide") appears between the hero and the TOC, with five labeled subsections.
- [ ] TOC has two levels: 3 sections, each with their resources nested beneath.
- [ ] Every TOC entry is a hyperlink (cursor changes to pointer on hover).
- [ ] Clicking each section title scrolls to the corresponding section block on the homepage.
- [ ] Clicking each resource title navigates to that resource's detail page.
- [ ] Section content blocks below the TOC are unchanged (numerals, intros, resource cards).

- [ ] **Step 4: Resource detail page QA checklist**

Visit each of the seven resource detail pages and verify all items below for each:

- `/resources/claude-code-docs`
- `/resources/karpathy-claude-skills`
- `/resources/github-docs`
- `/resources/impeccable-style`
- `/resources/superpowers`
- `/resources/github-portfolio`
- `/resources/penn-state-career-services`

For each page, verify:

- [ ] "Visit resource ↗" CTA button is prominent under the title.
- [ ] Clicking the CTA opens the resource's external URL in a new tab.
- [ ] Display URL appears underneath the CTA as caption text.
- [ ] "On this page" page-level TOC lists the four abstract sections numbered 01–04.
- [ ] Each TOC link jumps to its corresponding section.
- [ ] The four abstract sections use the standardized headings: "What it is", "What's in it", "Why it matters for you", "How to use it efficiently".
- [ ] Next Step block appears at the bottom with the resource-specific prompt.
- [ ] "Return to guide" link still works.

- [ ] **Step 5: Untouched-page verification**

Visit: `http://localhost:3000/how-it-was-built`
Verify: The page renders unchanged. (No regressions from this work.)

- [ ] **Step 6: Browser console check**

With DevTools open, navigate the homepage and one resource detail page. Verify: no errors or warnings in the console.

- [ ] **Step 7: Final commit (only if any fix-up edits were needed during QA)**

If steps 1–6 surfaced any small fixes, commit them:

```bash
git add -A
git commit -m "fix(qa): address issues found during final verification"
```

If no issues, skip this step.

---

## Done criteria

The plan is complete when:

- All 8 tasks are checked off.
- `npm run build` exits with code 0.
- `npx tsc --noEmit` exits with code 0.
- All seven resource detail pages and the homepage pass the QA checklists in Task 8.
- `/how-it-was-built` renders unchanged.
- Git log shows distinct, descriptive commits per task (one commit per task at minimum).
