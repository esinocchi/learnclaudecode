import Link from "next/link";
import { ClaudeLogo } from "./ClaudeLogo";

interface Props {
  /** When on an inner page, make the title a link back to home */
  linked?: boolean;
}

const headerStyle: React.CSSProperties = {
  borderBottom: "1px solid oklch(87% 0.014 75)",
  padding: "1rem 3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const brandStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  color: "oklch(18% 0.015 250)",
  textDecoration: "none",
};

const metaStyle: React.CSSProperties = {
  color: "oklch(58% 0.008 250)",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
};

export function SiteHeader({ linked = false }: Props) {
  const brand = (
    <span style={brandStyle}>
      <ClaudeLogo size={18} color="oklch(68% 0.2 75)" />
      Claude Code: A Field Guide
    </span>
  );

  return (
    <header style={headerStyle}>
      {linked ? (
        <Link href="/" style={brandStyle}>
          <ClaudeLogo size={18} color="oklch(68% 0.2 75)" />
          Claude Code: A Field Guide
        </Link>
      ) : (
        brand
      )}
      <span style={metaStyle}>
        Evan Sinocchi &nbsp;·&nbsp; Penn State
      </span>
    </header>
  );
}
