import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Map, FileText, FolderOpen, BookOpen, Globe, Bot, ExternalLink, Copy, Check } from "lucide-react";
import { costumes, categories } from "../data/costumes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;
const SITE_URL = "https://costumesplanet.com";

// ── Copy button helper ──
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-600 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

export function SitemapPage() {
  useDocumentMeta({
    title: "Sitemap — CostumesPlanet.com Full Site Index & XML Sitemaps",
    description: "Complete sitemap for CostumesPlanet.com featuring 195+ costume guides, 12 categories, XML sitemaps, robots.txt, and llms.txt for search engine and AI discoverability.",
  });

  const [activeTab, setActiveTab] = useState<"visual" | "xml" | "robots" | "llms">("visual");
  const [xmlData, setXmlData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch XML sitemaps from server
  useEffect(() => {
    if (activeTab !== "visual" && Object.keys(xmlData).length === 0 && !fetchError) {
      setLoading(true);
      fetch(`${API_BASE}/sitemap-data`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      })
        .then((r) => {
          if (!r.ok) throw new Error(`Server returned ${r.status}`);
          return r.json();
        })
        .then((data) => {
          setXmlData(data);
          setFetchError(null);
        })
        .catch((err) => {
          console.error("[SitemapPage] Failed to fetch sitemap data:", err);
          setFetchError(err?.message || "Failed to load sitemap data");
        })
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const tabs = [
    { id: "visual" as const, label: "Visual Sitemap", icon: Map },
    { id: "xml" as const, label: "XML Sitemaps", icon: FileText },
    { id: "robots" as const, label: "robots.txt", icon: Globe },
    { id: "llms" as const, label: "llms.txt (AI)", icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            Sitemap
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Complete sitemap of CostumesPlanet.com — {costumes.length} costume guides, {categories.length} categories, and all pages. Optimized for Google, Bing, and AI crawlers.
          </p>
        </motion.div>

        {/* Server Endpoints Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2"><Globe className="w-4 h-4" /> Public URLs (auto-redirect to XML)</h3>
          <p className="text-xs text-blue-600 mb-3">Visiting these URLs will redirect to the server and serve actual XML/text with correct Content-Type headers.</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-white/80 px-2.5 py-1 rounded-lg text-blue-700 font-mono">{SITE_URL}/sitemap.xml</code>
              <CopyButton text={`${SITE_URL}/sitemap.xml`} label="Copy URL" />
              <a href={`${SITE_URL}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-[11px]">Test →</a>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-white/80 px-2.5 py-1 rounded-lg text-blue-700 font-mono">{SITE_URL}/robots.txt</code>
              <CopyButton text={`${SITE_URL}/robots.txt`} label="Copy URL" />
              <a href={`${SITE_URL}/robots.txt`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-[11px]">Test →</a>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-white/80 px-2.5 py-1 rounded-lg text-blue-700 font-mono">{SITE_URL}/llms.txt</code>
              <CopyButton text={`${SITE_URL}/llms.txt`} label="Copy URL" />
              <a href={`${SITE_URL}/llms.txt`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-[11px]">Test →</a>
            </div>
          </div>
        </motion.div>

        {/* Direct server endpoint — primary for search console submission */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-8 border border-green-200">
          <h3 className="text-sm font-semibold text-green-900 mb-1 flex items-center gap-2"><FileText className="w-4 h-4" /> ⭐ Submit These URLs to Google Search Console</h3>
          <p className="text-xs text-green-700 mb-3">
            These serve <strong>real XML</strong> with <code className="bg-white/60 px-1 rounded">Content-Type: application/xml</code> — no JavaScript, no redirect. 
            <strong> Copy and paste each URL directly into GSC → Sitemaps → Add a new sitemap.</strong>
          </p>
          <div className="space-y-2 text-xs">
            {[
              { url: `${API_BASE}/sitemap.xml`,              label: "Sitemap Index (submit this one first)", badge: "INDEX" },
              { url: `${API_BASE}/sitemap-posts-1.xml`,      label: `All ${costumes.length} blog posts`,    badge: "POSTS" },
              { url: `${API_BASE}/sitemap-pages-1.xml`,      label: "Static pages",                         badge: "PAGES" },
              { url: `${API_BASE}/sitemap-categories-1.xml`, label: "Category pages",                       badge: "CATS" },
            ].map(({ url, label, badge }) => (
              <div key={url} className="flex items-center gap-2 flex-wrap bg-white/60 rounded-xl p-2.5 border border-green-100">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge === "INDEX" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"}`}>{badge}</span>
                <code className="text-green-800 font-mono text-[11px] break-all flex-1">{url}</code>
                <CopyButton text={url} label="Copy" />
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-green-600 underline text-[11px] whitespace-nowrap">Open XML →</a>
                <span className="text-green-500 text-[11px] w-full ml-0">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-green-600 mt-3 bg-green-100/60 rounded-lg p-2">
            💡 <strong>Why a different domain?</strong> The SPA at costumesplanet.com returns HTML for all routes (React Router). The Supabase edge function returns real XML that Google can read. GSC accepts sitemap URLs from any domain.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Visual Sitemap ── */}
        {activeTab === "visual" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Static Pages */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <FileText className="w-5 h-5 text-orange-500" /> Pages
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { path: "/", label: "Homepage", desc: `${costumes.length} costume guides` },
                  { path: "/categories", label: "All Categories", desc: `${categories.length} categories` },
                  { path: "/search", label: "Search", desc: "Full-text search" },
                  { path: "/sitemap", label: "Sitemap", desc: "This page" },
                  { path: "/build", label: "Costume Builder", desc: "Interactive drag-and-drop builder" },
                  { path: "/about-us", label: "About Us", desc: "Our mission & team" },
                  { path: "/terms-of-use", label: "Terms of Use", desc: "Legal & affiliate disclosure" },
                ].map((p) => (
                  <Link key={p.path} to={p.path} className="block p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{p.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{p.desc}</p>
                    <p className="text-[10px] text-gray-300 mt-2 font-mono">{SITE_URL}{p.path}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <FolderOpen className="w-5 h-5 text-orange-500" /> Categories ({categories.length})
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const count = costumes.filter((c) => c.category === cat).length;
                  return (
                    <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="block p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{cat}</p>
                      <p className="text-xs text-gray-400 mt-1">{count} costume {count === 1 ? "guide" : "guides"}</p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Blog Posts by Category */}
            {categories.map((cat) => {
              const catCostumes = costumes.filter((c) => c.category === cat);
              return (
                <section key={cat}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <BookOpen className="w-5 h-5 text-orange-500" /> {cat} ({catCostumes.length})
                  </h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {catCostumes.map((c) => (
                      <Link key={c.slug} to={`/${c.slug}`} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-50 hover:border-orange-200 hover:shadow-sm transition-all group text-left">
                        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-orange-400 flex-shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-700 group-hover:text-orange-600 truncate transition-colors">{c.title}</p>
                          <p className="text-[10px] text-gray-300 mt-0.5">Updated {c.dateModified}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </motion.div>
        )}

        {/* ── XML Sitemaps ── */}
        {activeTab === "xml" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading sitemaps...</div>
            ) : (
              <>
                {[
                  { label: "Sitemap Index", key: "sitemapIndex", file: "sitemap.xml" },
                  { label: "Pages Sitemap", key: "pages", file: "sitemap-pages.xml" },
                  { label: "Posts Sitemap", key: "posts", file: "sitemap-posts.xml" },
                  { label: "Categories Sitemap", key: "categories", file: "sitemap-categories.xml" },
                ].map((item) => (
                  <div key={item.key} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <code className="text-xs text-gray-400 font-mono ml-2">{item.file}</code>
                      </div>
                      <CopyButton text={xmlData[item.key] || ""} label="Copy XML" />
                    </div>
                    <pre className="p-4 text-[11px] text-gray-600 font-mono overflow-x-auto max-h-60 leading-relaxed whitespace-pre-wrap break-all">
                      {xmlData[item.key] || "Not loaded"}
                    </pre>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        )}

        {/* ── robots.txt ── */}
        {activeTab === "robots" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-900">robots.txt</span>
                </div>
                <CopyButton text={xmlData.robots || ""} label="Copy" />
              </div>
              <pre className="p-5 text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap">
                {loading ? "Loading..." : (xmlData.robots || "Not loaded")}
              </pre>
            </div>
          </motion.div>
        )}

        {/* ── llms.txt ── */}
        {activeTab === "llms" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-100">
              <p className="text-sm text-purple-800">
                <strong>llms.txt</strong> is a proposed standard that helps AI crawlers (ChatGPT, Perplexity, Claude, Gemini) understand your site's structure, content, and purpose. Place it at your domain root alongside robots.txt.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900">llms.txt</span>
                </div>
                <CopyButton text={xmlData.llms || ""} label="Copy" />
              </div>
              <pre className="p-5 text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap">
                {loading ? "Loading..." : (xmlData.llms || "Not loaded")}
              </pre>
            </div>
          </motion.div>
        )}

        {/* SEO Stats Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total URLs", value: costumes.length + categories.length + 7 },
            { label: "Blog Posts", value: costumes.length },
            { label: "Categories", value: categories.length },
            { label: "Static Pages", value: 7 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}