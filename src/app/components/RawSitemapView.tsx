// =============================================================================
// RawSitemapView — Preview viewer for XML/TXT sitemap files
//
// In PRODUCTION (Cloudflare Pages): static files in /public/*.xml are served
// directly with application/xml — this component never runs for real crawlers.
//
// In the Figma Make PREVIEW: the SPA intercepts all routes, so this component
// fetches the XML from the edge function and renders it as a styled viewer.
// =============================================================================

import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;

interface RawSitemapViewProps {
  endpoint: string;
  isXml?: boolean;
}

// ── Simple XML syntax highlighter ─────────────────────────────────────────────
function highlightXml(xml: string): React.ReactNode[] {
  const lines = xml.split("\n");
  return lines.map((line, i) => {
    if (line.trim().startsWith("<?")) {
      return (
        <div key={i} className="leading-6">
          <span style={{ color: "#8B5CF6" }}>{line}</span>
        </div>
      );
    }
    if (line.trim().startsWith("<!--")) {
      return (
        <div key={i} className="leading-6">
          <span style={{ color: "#9CA3AF" }}>{line}</span>
        </div>
      );
    }

    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partKey = 0;

    while (remaining.length > 0) {
      const closeMatch = remaining.match(/^(<\/[a-zA-Z0-9:_-]+>)/);
      if (closeMatch) {
        parts.push(<span key={partKey++} style={{ color: "#3B82F6" }}>{closeMatch[1]}</span>);
        remaining = remaining.slice(closeMatch[1].length);
        continue;
      }

      const tagMatch = remaining.match(/^(<[a-zA-Z0-9:_-]+)((?:\s+[a-zA-Z0-9:_-]+="[^"]*")*\s*)(\/?>)/);
      if (tagMatch) {
        parts.push(<span key={partKey++} style={{ color: "#3B82F6" }}>{tagMatch[1]}</span>);
        if (tagMatch[2]) {
          const attrParts = tagMatch[2].split(/((?:[a-zA-Z0-9:_-]+)="(?:[^"]*)")/g);
          attrParts.forEach((ap) => {
            const attrMatch = ap.match(/^([a-zA-Z0-9:_-]+)="([^"]*)"$/);
            if (attrMatch) {
              parts.push(
                <span key={partKey++}>
                  <span style={{ color: "#F59E0B" }}> {attrMatch[1]}</span>
                  <span style={{ color: "#6B7280" }}>=</span>
                  <span style={{ color: "#10B981" }}>"{attrMatch[2]}"</span>
                </span>,
              );
            } else if (ap.trim()) {
              parts.push(<span key={partKey++} style={{ color: "#6B7280" }}>{ap}</span>);
            }
          });
        }
        parts.push(<span key={partKey++} style={{ color: "#3B82F6" }}>{tagMatch[3]}</span>);
        remaining = remaining.slice(tagMatch[0].length);
        continue;
      }

      const textMatch = remaining.match(/^([^<]+)/);
      if (textMatch) {
        const text = textMatch[1];
        parts.push(
          <span key={partKey++} style={{ color: text.match(/https?:\/\//) ? "#EC4899" : "#E5E7EB" }}>
            {text}
          </span>,
        );
        remaining = remaining.slice(text.length);
        continue;
      }

      parts.push(<span key={partKey++} style={{ color: "#E5E7EB" }}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return (
      <div key={i} className="leading-6">
        {parts.length > 0 ? parts : "\u00A0"}
      </div>
    );
  });
}

// ── Core viewer component ──────────────────────────────────────────────────────
export function RawSitemapView({ endpoint, isXml = true }: RawSitemapViewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = endpoint;

    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        setContent(await res.text());
      } catch (err: any) {
        console.error(`[RawSitemapView] Failed to fetch ${endpoint}:`, err);
        setError(err?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint]);

  const page: React.CSSProperties = {
    position:   "fixed",
    inset:      0,
    zIndex:     9999,
    overflow:   "auto",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
    fontSize:   "13px",
    background: "#1E1E2E",
  };

  const topBar: React.CSSProperties = {
    position:       "sticky",
    top:            0,
    zIndex:         10,
    background:     "#161622",
    borderBottom:   "1px solid #2D2D44",
    padding:        "10px 20px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    backdropFilter: "blur(12px)",
  };

  const rawLink = (
    <a
      href={`${API_BASE}/${endpoint}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color:        "#64748B",
        fontSize:     "11px",
        textDecoration: "none",
        padding:      "4px 10px",
        borderRadius: "6px",
        border:       "1px solid #334155",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = "#475569"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "#334155"; }}
    >
      Open raw ↗
    </a>
  );

  if (loading) {
    return (
      <div style={{ ...page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <div className="inline-block w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mb-3" />
          <p style={{ color: "#94A3B8", fontSize: "13px" }}>Loading {endpoint}…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...page, padding: "24px" }}>
        <div style={{ background: "#2D1B1B", border: "1px solid #7F1D1D", borderRadius: "8px", padding: "16px", maxWidth: "600px" }}>
          <p style={{ color: "#FCA5A5", fontWeight: 600, marginBottom: "8px" }}>Failed to load {endpoint}</p>
          <p style={{ color: "#F87171", fontSize: "12px", marginBottom: "12px" }}>{error}</p>
          <a href={`${API_BASE}/${endpoint}`} target="_blank" rel="noopener noreferrer" style={{ color: "#60A5FA", fontSize: "12px", textDecoration: "underline" }}>
            Open edge function directly ↗
          </a>
        </div>
      </div>
    );
  }

  if (!content) return null;

  if (isXml) {
    return (
      <div style={page}>
        <div style={topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#3B82F6", fontSize: "14px" }}>&#x2731;</span>
            <span style={{ color: "#CBD5E1", fontWeight: 600, fontSize: "13px" }}>{endpoint}</span>
            <span style={{ background: "#1E3A5F", color: "#60A5FA", fontSize: "10px", padding: "2px 8px", borderRadius: "9999px", fontWeight: 500 }}>
              XML
            </span>
            <span style={{ color: "#4B5563", fontSize: "10px" }}>
              Preview only — static file served in production
            </span>
          </div>
          {rawLink}
        </div>

        <div style={{ padding: "16px 0", display: "flex" }}>
          <div style={{
            padding: "0 12px 0 20px", textAlign: "right", userSelect: "none",
            color: "#4B5563", fontSize: "12px", lineHeight: "24px",
            minWidth: "48px", borderRight: "1px solid #2D2D44",
          }}>
            {content.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <pre style={{ margin: 0, padding: "0 20px", flex: 1, overflow: "auto", lineHeight: "24px" }}>
            {highlightXml(content)}
          </pre>
        </div>
      </div>
    );
  }

  // Plain-text viewer (robots.txt, llms.txt)
  return (
    <div style={page}>
      <div style={topBar}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#10B981", fontSize: "14px" }}>&#x2263;</span>
          <span style={{ color: "#CBD5E1", fontWeight: 600, fontSize: "13px" }}>{endpoint}</span>
          <span style={{ background: "#14332A", color: "#34D399", fontSize: "10px", padding: "2px 8px", borderRadius: "9999px", fontWeight: 500 }}>
            TXT
          </span>
        </div>
        {rawLink}
      </div>

      <div style={{ padding: "16px 0", display: "flex" }}>
        <div style={{
          padding: "0 12px 0 20px", textAlign: "right", userSelect: "none",
          color: "#4B5563", fontSize: "12px", lineHeight: "24px",
          minWidth: "48px", borderRight: "1px solid #2D2D44",
        }}>
          {content.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <pre style={{ margin: 0, padding: "0 20px", flex: 1, overflow: "auto", lineHeight: "24px", color: "#E2E8F0" }}>
          {content.split("\n").map((line, i) => {
            if (line.startsWith("#")) {
              return <div key={i} style={{ color: "#6B7280" }}>{line}</div>;
            }
            const directive = line.match(/^([A-Za-z-]+):\s*(.*)/);
            if (directive) {
              return (
                <div key={i}>
                  <span style={{ color: "#F59E0B" }}>{directive[1]}</span>
                  <span style={{ color: "#6B7280" }}>: </span>
                  <span style={{ color: line.includes("http") ? "#EC4899" : "#E2E8F0" }}>{directive[2]}</span>
                </div>
              );
            }
            return <div key={i}>{line || "\u00A0"}</div>;
          })}
        </pre>
      </div>
    </div>
  );
}

// ── Named route wrapper components ─────────────────────────────────────────────

export function SitemapXml()            { return <RawSitemapView endpoint="sitemap.xml"              isXml />; }
export function SitemapPosts1Xml()      { return <RawSitemapView endpoint="sitemap-posts-1.xml"      isXml />; }
export function SitemapPages1Xml()      { return <RawSitemapView endpoint="sitemap-pages-1.xml"      isXml />; }
export function SitemapCategories1Xml() { return <RawSitemapView endpoint="sitemap-categories-1.xml" isXml />; }

export function SitemapPostsXml()       { return <RawSitemapView endpoint="sitemap-posts.xml"        isXml />; }
export function SitemapPagesXml()       { return <RawSitemapView endpoint="sitemap-pages.xml"        isXml />; }
export function SitemapCategoriesXml()  { return <RawSitemapView endpoint="sitemap-categories.xml"   isXml />; }

export function RobotsTxt()             { return <RawSitemapView endpoint="robots.txt"               isXml={false} />; }
export function LlmsTxt()               { return <RawSitemapView endpoint="llms.txt"                 isXml={false} />; }
