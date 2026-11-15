import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ChevronRight, CheckCircle2, HelpCircle, ArrowRight, Layers } from "lucide-react";
import { getCostumesByCategory } from "../data/costumes";
import { BlogCard } from "./BlogCard";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { hubs, resolveHub, anchorName, quickFact, isIndexable } from "../data/site";

const display = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 } as const;

// Gender filters inherited from the old WordPress taxonomy: kept working for
// visitors, but not indexed (they duplicate the franchise hubs).
const PSEUDO: Record<string, string> = { female: "Female", male: "Male" };

export function CategoryPage() {
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const hub = resolveHub(name);
  const pseudo = PSEUDO[name.toLowerCase()];

  // Old encoded or legacy URLs → canonical clean hub URL
  useEffect(() => {
    if (hub && name !== hub.slug) navigate(`/category/${hub.slug}/`, { replace: true });
  }, [hub, name, navigate]);

  const posts = hub ? getCostumesByCategory(hub.name) : pseudo ? getCostumesByCategory(pseudo) : [];
  const guides = posts.filter(isIndexable);
  const more = posts.filter((p) => !isIndexable(p));
  const relHubs = (hub?.related || []).map((s) => hubs.find((h) => h.slug === s)).filter(Boolean) as typeof hubs;

  useDocumentMeta({
    title: hub ? hub.seoTitle : `${pseudo || "Category"} Costumes | CostumesPlanet`,
    description: hub ? hub.metaDescription : "Browse costume guides on CostumesPlanet.",
    canonical: hub ? `https://costumesplanet.com/category/${hub.slug}/` : undefined,
    robots: hub ? undefined : "noindex, follow",
  });

  if (!hub && !pseudo) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <h1 className="text-gray-900 text-3xl mb-4" style={display}>Category not found</h1>
        <Link to="/categories/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a237e] text-white rounded-xl">
          Browse all categories
        </Link>
      </div>
    );
  }

  const title = hub ? hub.h1 : `${pseudo} Costumes`;
  const short = hub ? hub.h1.split(":")[0] : title;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[#fafbff]">
      {/* ── Header ── */}
      <header className="bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-8 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/categories/" className="hover:text-white">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{short}</span>
          </nav>
          <h1 className="text-3xl md:text-[2.6rem] leading-[1.12] max-w-4xl" style={display}>{title}</h1>
          {hub && (
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-lg text-white/90 leading-relaxed">{hub.intro[0]}</p>
              {hub.intro.slice(1).map((p, i) => (
                <p key={i} className="text-white/65 leading-relaxed">{p}</p>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15" style={{ fontWeight: 600 }}>
              {guides.length} detailed {guides.length === 1 ? "guide" : "guides"}
            </span>
            {more.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15" style={{ fontWeight: 600 }}>
                {more.length} more characters
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-14">
        {/* ── Comparison table ── */}
        {guides.length > 0 && (
          <section aria-labelledby="compare">
            <h2 id="compare" className="text-2xl text-gray-900 mb-4" style={display}>
              Compare {guides.length} {hub?.name ?? ""} costume guides
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-4 py-3" style={{ fontWeight: 600 }}>Character</th>
                    <th className="px-4 py-3" style={{ fontWeight: 600 }}>Difficulty</th>
                    <th className="px-4 py-3" style={{ fontWeight: 600 }}>Budget</th>
                    <th className="px-4 py-3" style={{ fontWeight: 600 }}>Time to put on</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((c) => (
                    <tr key={c.slug} className="border-t border-gray-100 hover:bg-[#FF9900]/[0.04]">
                      <td className="px-4 py-3">
                        <Link to={`/${c.slug}/`} className="text-[#1a237e] hover:underline" style={{ fontWeight: 600 }}>
                          {anchorName(c)} costume
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{quickFact(c, "difficulty").split(/[;(]/)[0].trim()}</td>
                      <td className="px-4 py-3 text-gray-600">{quickFact(c, "budget")}</td>
                      <td className="px-4 py-3 text-gray-600">{quickFact(c, "time")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Guide cards ── */}
        {guides.length > 0 && (
          <section aria-labelledby="guides">
            <h2 id="guides" className="text-2xl text-gray-900 mb-6" style={display}>{hub?.name ?? short} costume guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((c, i) => (
                <BlogCard key={c.slug} costume={c} featured={i === 0} />
              ))}
            </div>
          </section>
        )}

        {/* ── How to choose ── */}
        {hub && (
          <section aria-labelledby="choose" className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <div>
              <h2 id="choose" className="text-2xl text-gray-900 mb-3" style={display}>How to choose your {hub.name} costume</h2>
              <p className="text-gray-500 leading-relaxed">What separates a costume people recognise from one they have to ask about.</p>
            </div>
            <ul className="space-y-3">
              {hub.tips.map((t) => (
                <li key={t} className="flex gap-3 bg-white rounded-xl border border-gray-100 p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#FF9900] shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── More characters (template guides, not yet rewritten) ── */}
        {more.length > 0 && (
          <section aria-labelledby="more">
            <h2 id="more" className="text-2xl text-gray-900 mb-4" style={display}>More {hub?.name ?? short} characters</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {more.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}/`} className="text-gray-600 hover:text-[#1a237e] hover:underline">
                    {anchorName(c)} costume
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── FAQ (visible, matches FAQPage schema) ── */}
        {hub && hub.faqs.length > 0 && (
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-2xl text-gray-900 mb-6 flex items-center gap-3" style={display}>
              <HelpCircle className="w-6 h-6 text-[#1a237e]" /> {hub.name} costume FAQ
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {hub.faqs.map((f) => (
                <div key={f.question} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>{f.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Related hubs ── */}
        {relHubs.length > 0 && (
          <section aria-labelledby="related">
            <h2 id="related" className="text-2xl text-gray-900 mb-4 flex items-center gap-3" style={display}>
              <Layers className="w-6 h-6 text-[#1a237e]" /> Related costume categories
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relHubs.map((h) => (
                <Link key={h.slug} to={`/category/${h.slug}/`} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#FF9900]/40 hover:shadow-lg transition-all">
                  <p className="text-gray-900 group-hover:text-[#1a237e] mb-1" style={{ fontWeight: 700 }}>{h.h1.split(":")[0]}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{h.metaDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#1a237e]" style={{ fontWeight: 600 }}>
                    Browse <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
