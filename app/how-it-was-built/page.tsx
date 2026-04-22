import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";

export default function HowItWasBuilt() {
  return (
    <div style={{ backgroundColor: "oklch(97% 0.008 75)", minHeight: "100vh" }}>
      <SiteHeader linked />

      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "4rem 3rem 6rem",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            fontSize: "0.8125rem",
            color: "oklch(60% 0.008 250)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            marginBottom: "2.5rem",
          }}
          className="hover:text-ink transition-colors"
        >
          ← Back to guide
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)",
            fontWeight: 400,
            color: "oklch(22% 0.012 250)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}
        >
          How this was built.
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "oklch(60% 0.008 250)",
            marginBottom: "3rem",
          }}
        >
          A guide about Claude Code, built with Claude Code.
        </p>

        <div
          style={{ borderTop: "1px solid oklch(87% 0.014 75)", marginBottom: "3rem" }}
        />

        <div className="flex flex-col" style={{ gap: "2.5rem", maxWidth: "62ch" }}>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "oklch(30% 0.012 250)",
              lineHeight: 1.7,
            }}
          >
            This guide is a demonstration of its own subject. Every page,
            design decision, and line of code was built in collaboration with
            Claude Code, the same tool described in the resources it curates.
          </p>

          {/* Step 1 */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(60% 0.008 250)",
                marginBottom: "0.625rem",
              }}
            >
              Step 1: Spec first
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "oklch(30% 0.012 250)",
                lineHeight: 1.7,
              }}
            >
              Building started with a conversation, not code. The first step
              was writing a plain-language abstract: what the guide was for,
              who it was for, and why it needed to exist. Claude Code turned
              that into structured documentation, a site specification covering
              the resources, sections, content templates, and information
              architecture. That spec drove everything that followed.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(60% 0.008 250)",
                marginBottom: "0.625rem",
              }}
            >
              Step 2: Design context
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "oklch(30% 0.012 250)",
                lineHeight: 1.7,
              }}
            >
              Visual direction came next, using the{" "}
              <a
                href="https://impeccable.style"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(65% 0.15 75)", textDecoration: "none" }}
                className="hover:underline"
              >
                impeccable.style
              </a>{" "}
              plugin for Claude Code. Rather than generating generic output,
              impeccable.style establishes a design context first: who the
              audience is, what the interface should feel like, and what to
              avoid. The font pairing (Spectral for headings, Atkinson
              Hyperlegible for body), the warm off-white palette, the centered
              layout: all of these came from a documented brief, not defaults.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(60% 0.008 250)",
                marginBottom: "0.625rem",
              }}
            >
              Step 3: Craft
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "oklch(30% 0.012 250)",
                lineHeight: 1.7,
              }}
            >
              With the spec and design context confirmed, Claude Code built the
              site structure: landing page, resource detail pages, and this
              one. The stack, Next.js 16, React 19, TypeScript, and Tailwind
              CSS v4, was selected and configured through conversation. Every
              design decision traces back to something in the brief: OKLCH
              colors for perceptual uniformity, a fluid type scale for
              headings, and a no-card layout to avoid the most recognizable
              patterns of generic AI output.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(60% 0.008 250)",
                marginBottom: "0.625rem",
              }}
            >
              Step 4: Iteration
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "oklch(30% 0.012 250)",
                lineHeight: 1.7,
              }}
            >
              The site was reviewed and refined incrementally through
              conversation. Resources were added to a sidebar, content was
              written and edited, spacing and type hierarchy were adjusted.
              Claude Code handled the code. What to say, what to keep, and
              what to cut stayed with the author.
            </p>
          </div>

          {/* Conclusion */}
          <div
            style={{
              borderTop: "1px solid oklch(87% 0.014 75)",
              paddingTop: "2rem",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "oklch(30% 0.012 250)",
                lineHeight: 1.7,
              }}
            >
              This guide makes the same argument it teaches: Claude Code, used
              with intention, lets you build real, polished projects. The
              difference between a generic AI-generated page and a well-designed
              one is not the tool. It is how deliberately you use it.
            </p>
          </div>

          <div>
            <Link
              href="/"
              style={{
                fontSize: "0.875rem",
                color: "oklch(65% 0.15 75)",
                textDecoration: "none",
              }}
              className="hover:underline"
            >
              ← Return to the guide
            </Link>
          </div>
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid oklch(87% 0.014 75)",
          marginTop: "4rem",
          padding: "2rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontSize: "0.75rem", color: "oklch(60% 0.008 250)" }}
        >
          Claude Code: A Field Guide · Penn State · 2026
        </span>
        <Link
          href="/"
          style={{
            fontSize: "0.75rem",
            color: "oklch(65% 0.15 75)",
            textDecoration: "none",
          }}
          className="hover:underline"
        >
          ← Back to guide
        </Link>
      </footer>
    </div>
  );
}
