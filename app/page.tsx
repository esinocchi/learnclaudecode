import Link from "next/link";
import { sections, resources, getResourcesBySection } from "@/lib/resources";
import { SiteHeader } from "./components/SiteHeader";

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

export default function Home() {
  return (
    <div style={{ backgroundColor: "oklch(97% 0.008 75)", minHeight: "100vh" }}>
      <SiteHeader />

      {/* Centered content wrapper */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        {/* ── Hero ── */}
        <section
          style={{
            paddingTop: "7rem",
            paddingBottom: "6rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "oklch(68% 0.2 75)",
              marginBottom: "2rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Penn State CS &nbsp;·&nbsp; Internet Resource Guide
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
              fontWeight: 300,
              color: "oklch(18% 0.015 250)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              marginBottom: "2.25rem",
            }}
          >
            Build something real.
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "oklch(40% 0.012 250)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              margin: "0 auto 1rem",
            }}
          >
            A curated guide to using Claude Code for personal projects, from
            idea to deployable application. Seven resources organized around
            the three things that actually matter.
          </p>

          <p
            style={{
              fontSize: "0.875rem",
              color: "oklch(58% 0.008 250)",
              marginBottom: "3rem",
            }}
          >
            For Penn State freshman CS students.
          </p>

          {/* Meta-narrative */}
          <p
            style={{
              fontSize: "0.8125rem",
              color: "oklch(58% 0.008 250)",
              lineHeight: 1.5,
              marginBottom: "4.5rem",
            }}
          >
            Built with Claude Code, the same tool this guide teaches.{" "}
            <Link
              href="/how-it-was-built"
              style={{
                color: "oklch(68% 0.2 75)",
                textDecoration: "none",
                fontWeight: 700,
              }}
              className="hover:underline"
            >
              See how →
            </Link>
          </p>

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

          {/* TOC */}
          <div
            style={{
              borderTop: "1px solid oklch(87% 0.014 75)",
              paddingTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(58% 0.008 250)",
                marginBottom: "0.5rem",
              }}
            >
              Contents
            </p>
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
          </div>
        </section>

        {/* ── Sections ── */}
        {sections.map((section) => {
          const sectionResources = getResourcesBySection(section.id);
          return (
            <section
              key={section.id}
              id={section.id}
              style={{
                paddingTop: "1rem",
                paddingBottom: "6rem",
              }}
            >
              {/* Editorial chapter header */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "4rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "oklch(68% 0.2 75)",
                    marginBottom: "0.25rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Section
                </p>

                {/* The big number */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(6rem, 16vw, 10.5rem)",
                    fontWeight: 300,
                    color: "oklch(91% 0.03 75)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.05em",
                    userSelect: "none",
                    marginBottom: "1.25rem",
                  }}
                >
                  {section.number}
                </div>

                <div
                  style={{
                    width: "4rem",
                    borderTop: "1px solid oklch(87% 0.014 75)",
                    margin: "0 auto 1.75rem",
                  }}
                />

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 500,
                    color: "oklch(18% 0.015 250)",
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                  }}
                >
                  {section.title}
                </h2>

                <p
                  style={{
                    color: "oklch(40% 0.012 250)",
                    lineHeight: 1.65,
                    fontSize: "0.9375rem",
                    maxWidth: "52ch",
                    margin: "0 auto",
                  }}
                >
                  {section.intro}
                </p>
              </div>

              {/* Resource entries */}
              <div>
                {sectionResources.map((resource) => {
                  const globalIdx = resources.findIndex(
                    (r) => r.slug === resource.slug
                  );
                  const resourceNum = String(globalIdx + 1).padStart(2, "0");

                  return (
                    <Link
                      key={resource.slug}
                      href={`/resources/${resource.slug}?back=${section.id}`}
                      style={{ textDecoration: "none", display: "block" }}
                      className="group"
                    >
                      <article
                        style={{
                          borderTop: "1px solid oklch(87% 0.014 75)",
                          padding: "2rem 0 2rem",
                          transition: "background-color 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        {/* Top row: number + category + arrow */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "0.75rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "0.875rem",
                                fontWeight: 300,
                                color: "oklch(68% 0.2 75)",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {resourceNum}
                            </span>
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "oklch(68% 0.2 75)",
                                fontVariantCaps: "all-small-caps",
                              }}
                            >
                              {resource.category}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "0.875rem",
                              color: "oklch(68% 0.2 75)",
                              transition: "color 0.2s ease, transform 0.2s ease",
                              display: "inline-block",
                            }}
                            className="group-hover:text-accent-deep"
                          >
                            Read more →
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                            fontWeight: 500,
                            color: "oklch(18% 0.015 250)",
                            letterSpacing: "-0.015em",
                            marginBottom: "0.625rem",
                            transition: "color 0.2s ease",
                            lineHeight: 1.2,
                          }}
                          className="group-hover:text-accent-deep"
                        >
                          {resource.title}
                        </h3>

                        {/* Teaser */}
                        <p
                          style={{
                            fontSize: "0.9375rem",
                            color: "oklch(40% 0.012 250)",
                            lineHeight: 1.65,
                            maxWidth: "64ch",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {resource.teaser}
                        </p>

                        {/* URL */}
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "oklch(68% 0.2 75)",
                            fontFamily: "var(--font-body)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {resource.displayUrl}
                        </p>
                      </article>
                    </Link>
                  );
                })}
                {/* closing rule */}
                <div
                  style={{ borderTop: "1px solid oklch(87% 0.014 75)" }}
                />
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid oklch(87% 0.014 75)",
          marginTop: "2rem",
          padding: "2rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontSize: "0.75rem", color: "oklch(58% 0.008 250)" }}
        >
          Claude Code: A Field Guide &nbsp;·&nbsp; Penn State &nbsp;·&nbsp; 2026
        </span>
        <Link
          href="/how-it-was-built"
          style={{
            fontSize: "0.75rem",
            color: "oklch(68% 0.2 75)",
            textDecoration: "none",
            fontWeight: 700,
          }}
          className="hover:underline"
        >
          How this was built →
        </Link>
      </footer>
    </div>
  );
}
