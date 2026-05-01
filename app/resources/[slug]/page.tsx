import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  resources,
  getResourceBySlug,
  getSectionById,
  sections,
  getResourcesBySection,
} from "@/lib/resources";

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ back?: string }>;
}

const ABSTRACT_LABELS = [
  { key: "what", label: "What it is", id: "what-it-is" },
  { key: "content", label: "What's in it", id: "whats-in-it" },
  { key: "relevance", label: "Why it matters for you", id: "why-it-matters" },
  { key: "tips", label: "How to use it efficiently", id: "how-to-use" },
] as const;

export default async function ResourcePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { back } = await searchParams;
  const resource = getResourceBySlug(slug);

  if (!resource) notFound();

  const section = getSectionById(resource.sectionId);
  const backHref = back ? `/#${back}` : "/";
  const globalIdx = resources.findIndex((r) => r.slug === slug);
  const resourceNum = String(globalIdx + 1).padStart(2, "0");

  return (
    <div
      style={{ backgroundColor: "oklch(97% 0.008 75)", minHeight: "100vh" }}
    >
      <SiteHeader linked />

      {/* Centered wrapper */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 240px",
            gap: "5rem",
            paddingTop: "3.5rem",
            paddingBottom: "5rem",
          }}
        >
          {/* ── Main ── */}
          <main>
            {/* Back */}
            <Link
              href={backHref}
              style={{
                fontSize: "0.8125rem",
                color: "oklch(58% 0.008 250)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                marginBottom: "3rem",
                transition: "color 0.2s ease",
              }}
              className="hover:text-ink"
            >
              ← Back to guide
            </Link>

            {/* Resource number + category */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                marginBottom: "0.875rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  color: "oklch(68% 0.2 75)",
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
                }}
              >
                {resource.category}
                {section && (
                  <span style={{ color: "oklch(75% 0.01 250)" }}>
                    {" "}
                    · Section {section.number}
                  </span>
                )}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "oklch(18% 0.015 250)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              {resource.title}
            </h1>

            {/* URL */}
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

            {/* Abstract sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
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
            </div>

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

            {/* Return link */}
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: "1px solid oklch(87% 0.014 75)",
              }}
            >
              <Link
                href={backHref}
                style={{
                  fontSize: "0.875rem",
                  color: "oklch(68% 0.2 75)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
                className="hover:underline"
              >
                ← Return to guide
              </Link>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside style={{ paddingTop: "3.5rem" }}>
            <div style={{ position: "sticky", top: "2rem" }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "oklch(58% 0.008 250)",
                  marginBottom: "1.5rem",
                }}
              >
                All Resources
              </p>

              {sections.map((sec) => {
                const secResources = getResourcesBySection(sec.id);
                return (
                  <div key={sec.id} style={{ marginBottom: "1.75rem" }}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        color: "oklch(68% 0.2 75)",
                        marginBottom: "0.5rem",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.005em",
                        fontWeight: 500,
                      }}
                    >
                      {sec.number} · {sec.title}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                      {secResources.map((r) => {
                        const isCurrent = r.slug === slug;
                        const rIdx = resources.findIndex(
                          (res) => res.slug === r.slug
                        );
                        const rNum = String(rIdx + 1).padStart(2, "0");
                        return (
                          <Link
                            key={r.slug}
                            href={`/resources/${r.slug}?back=${sec.id}`}
                            style={{
                              fontSize: "0.8125rem",
                              color: isCurrent
                                ? "oklch(56% 0.22 75)"
                                : "oklch(40% 0.012 250)",
                              textDecoration: "none",
                              padding: "0.375rem 0.625rem",
                              borderRadius: "4px",
                              backgroundColor: isCurrent
                                ? "oklch(92% 0.04 75)"
                                : "transparent",
                              fontWeight: isCurrent ? 700 : 400,
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "baseline",
                              lineHeight: 1.4,
                              transition:
                                "background-color 0.15s ease, color 0.15s ease",
                              cursor: "pointer",
                            }}
                            className={isCurrent ? "" : "hover:bg-surface"}
                          >
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                color: isCurrent
                                  ? "oklch(68% 0.2 75)"
                                  : "oklch(68% 0.2 75)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 300,
                                flexShrink: 0,
                              }}
                            >
                              {rNum}
                            </span>
                            {r.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid oklch(87% 0.014 75)",
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
