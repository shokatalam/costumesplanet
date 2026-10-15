import { useState } from "react";
import { Download, CheckCircle, AlertCircle, Loader2, Bug, ShoppingCart, MessageCircle, Lock, Eye, EyeOff } from "lucide-react";
import { triggerScrape, getImageMapSize } from "../data/costumeImages";
import { triggerItemScrape, getItemMapSize, getTotalItemCount } from "../data/costumeLinks";
import { triggerRedditScrape, getRedditMapSize } from "../data/costumeReddit";
import { projectId } from "/utils/supabase/info";
import { costumes } from "../data/costumes";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;

/**
 * Admin scraper panel. Shows a tiny trigger button in bottom-right corner.
 * All operations require a valid SCRAPE_ADMIN_KEY, so the panel itself is safe to render.
 * The admin key is never persisted — must be entered each session.
 */
export function ScrapePanel() {
  const [open, setOpen] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  // Image scraper state
  const [imgScraping, setImgScraping] = useState(false);
  const [imgProgress, setImgProgress] = useState<{ page: number; totalPages: number; saved: number } | null>(null);
  const [imgResult, setImgResult] = useState<{ totalSaved: number } | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);

  // Item scraper state
  const [itemScraping, setItemScraping] = useState(false);
  const [itemProgress, setItemProgress] = useState<{ page: number; totalPages: number; saved: number; totalItems: number } | null>(null);
  const [itemResult, setItemResult] = useState<{ totalSaved: number; totalItems: number } | null>(null);
  const [itemError, setItemError] = useState<string | null>(null);

  // Reddit scraper state
  const [redditScraping, setRedditScraping] = useState(false);
  const [redditProgress, setRedditProgress] = useState<{ page: number; processed: number; saved: number; totalQuestions: number } | null>(null);
  const [redditResult, setRedditResult] = useState<{ totalSaved: number; totalQuestions: number } | null>(null);
  const [redditError, setRedditError] = useState<string | null>(null);

  // Debug
  const [allDebug, setAllDebug] = useState<string[]>([]);
  const [allErrors, setAllErrors] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  // Image diagnostics
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagData, setDiagData] = useState<{
    totalEntries: number;
    withStorage: number;
    withoutStorage: number;
    allSlugs: string[];
    missingSlugs: string[];
  } | null>(null);
  const [diagError, setDiagError] = useState<string | null>(null);

  const handleImageScrape = async () => {
    if (!adminKey.trim()) { setImgError("Enter admin key first"); return; }
    setImgScraping(true);
    setImgError(null);
    setImgResult(null);
    setImgProgress(null);
    setAllDebug([]);
    setAllErrors([]);
    try {
      const res = await triggerScrape((info) => {
        setImgProgress({ page: info.page, totalPages: info.totalPages, saved: info.saved });
        setAllErrors((prev) => [...prev, ...info.errors]);
        setAllDebug((prev) => [...prev, ...info.debug]);
      }, adminKey);
      setImgResult(res);
    } catch (err: any) {
      setImgError(err?.message || "Image scraping failed");
    } finally {
      setImgScraping(false);
    }
  };

  const handleItemScrape = async () => {
    if (!adminKey.trim()) { setItemError("Enter admin key first"); return; }
    setItemScraping(true);
    setItemError(null);
    setItemResult(null);
    setItemProgress(null);
    setAllDebug([]);
    setAllErrors([]);
    try {
      const res = await triggerItemScrape((info) => {
        setItemProgress({ page: info.page, totalPages: info.totalPages, saved: info.saved, totalItems: info.totalItems });
        setAllErrors((prev) => [...prev, ...info.errors]);
        setAllDebug((prev) => [...prev, ...info.debug]);
      }, adminKey);
      setItemResult(res);
    } catch (err: any) {
      setItemError(err?.message || "Item scraping failed");
    } finally {
      setItemScraping(false);
    }
  };

  const handleRedditScrape = async () => {
    if (!adminKey.trim()) { setRedditError("Enter admin key first"); return; }
    setRedditScraping(true);
    setRedditError(null);
    setRedditResult(null);
    setRedditProgress(null);
    setAllDebug([]);
    setAllErrors([]);
    try {
      const res = await triggerRedditScrape((info) => {
        setRedditProgress({ page: info.page, processed: info.processed || 0, saved: info.saved, totalQuestions: info.totalQuestions });
        setAllErrors((prev) => [...prev, ...info.errors]);
        setAllDebug((prev) => [...prev, ...info.debug]);
      }, adminKey);
      setRedditResult(res);
    } catch (err: any) {
      setRedditError(err?.message || "Reddit scraping failed");
    } finally {
      setRedditScraping(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-105"
        title="Scraper Admin (Authenticated)"
      >
        <Lock className="w-5 h-5" />
      </button>
    );
  }

  const isBusy = imgScraping || itemScraping || redditScraping;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-red-200 p-5 w-96 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          <Lock className="w-4 h-4 text-red-600" />
          Scraper Admin (Secured)
        </h3>
        <button onClick={() => { setOpen(false); setAdminKey(""); }} className="text-gray-400 hover:text-gray-600 text-lg leading-none">
          &times;
        </button>
      </div>

      {/* ── Admin Key Input ── */}
      <div className="mb-4">
        <label className="text-xs text-gray-600 font-medium block mb-1">Admin Key (SCRAPE_ADMIN_KEY)</label>
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter your admin key..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400"
            autoComplete="off"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">Key is never saved. Required for all scrape operations.</p>
      </div>

      <div className="text-xs text-gray-500 mb-4 space-y-1">
        <p>Images: <strong>{getImageMapSize()}</strong> in Supabase Storage</p>
        <p>Products: <strong>{getItemMapSize()}</strong> articles / <strong>{getTotalItemCount()}</strong> items</p>
        <p>Reddit: <strong>{getRedditMapSize()}</strong> posts scraped</p>
      </div>

      {/* ── Image Scrape ── */}
      <button
        onClick={handleImageScrape}
        disabled={isBusy || !adminKey.trim()}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors mb-1"
      >
        {imgScraping ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Downloading &amp; Uploading Images...</>
        ) : (
          <><Download className="w-4 h-4" /> Scrape Images</>
        )}
      </button>
      <p className="text-[10px] text-gray-400 mb-2 text-center">Downloads WP images to Supabase Storage</p>

      {imgProgress && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Images: Page {imgProgress.page}/{imgProgress.totalPages}</span>
            <span>{imgProgress.saved} saved</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mt-1">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((imgProgress.page / imgProgress.totalPages) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {imgResult && (
        <div className="mb-3 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Done! {imgResult.totalSaved} images saved.
        </div>
      )}

      {imgError && (
        <div className="mb-3 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="break-all">{imgError}</span>
        </div>
      )}

      {/* ── Item + Link Scrape ── */}
      <button
        onClick={handleItemScrape}
        disabled={isBusy || !adminKey.trim()}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors mb-2"
      >
        {itemScraping ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Scraping Products &amp; Links...</>
        ) : (
          <><ShoppingCart className="w-4 h-4" /> Scrape Product Items &amp; Amazon Links</>
        )}
      </button>

      {itemProgress && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Items: Page {itemProgress.page}/{itemProgress.totalPages}</span>
            <span>{itemProgress.saved} articles, {itemProgress.totalItems} items</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((itemProgress.page / itemProgress.totalPages) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {itemResult && (
        <div className="mb-3 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Done! {itemResult.totalSaved} articles, {itemResult.totalItems} product items scraped.
        </div>
      )}

      {itemError && (
        <div className="mb-3 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="break-all">{itemError}</span>
        </div>
      )}

      {/* ── Reddit Scrape ── */}
      <button
        onClick={handleRedditScrape}
        disabled={isBusy || !adminKey.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors mb-2"
      >
        {redditScraping ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Scraping Reddit Posts...</>
        ) : (
          <><MessageCircle className="w-4 h-4" /> Scrape Reddit Posts</>
        )}
      </button>

      {redditProgress && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Reddit: Batch {redditProgress.page}</span>
            <span>{redditProgress.saved} saved, {redditProgress.totalQuestions} questions</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mt-1">
            <div
              className="bg-orange-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, redditProgress.page * 3)}%` }}
            />
          </div>
        </div>
      )}

      {redditResult && (
        <div className="mb-3 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Done! {redditResult.totalSaved} slugs, {redditResult.totalQuestions} questions scraped.
        </div>
      )}

      {redditError && (
        <div className="mb-3 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="break-all">{redditError}</span>
        </div>
      )}

      {/* ── Image Diagnostics ── */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={async () => {
            if (!adminKey.trim()) { setDiagError("Enter admin key first"); return; }
            setDiagLoading(true);
            setDiagError(null);
            setDiagData(null);
            try {
              const res = await fetch(`${API_BASE}/image-diagnostics`, {
                headers: { Authorization: `Bearer ${adminKey}` },
              });
              if (!res.ok) {
                const errText = await res.text().catch(() => "");
                throw new Error(`${res.status}: ${errText.slice(0, 200)}`);
              }
              const data = await res.json();
              // Cross-reference with frontend costume slugs
              const allAppSlugs = costumes.map(c => c.slug);
              const dbSlugsSet = new Set(data.allSlugs || []);
              const missingSlugs = allAppSlugs.filter(s => !dbSlugsSet.has(s));
              setDiagData({ ...data, missingSlugs });
            } catch (err: any) {
              setDiagError(err?.message || "Diagnostics failed");
            } finally {
              setDiagLoading(false);
            }
          }}
          disabled={diagLoading || !adminKey.trim()}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors mb-2"
        >
          {diagLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Checking DB...</>
          ) : (
            <><Bug className="w-4 h-4" /> Check Image Coverage</>
          )}
        </button>

        {diagError && (
          <div className="mb-2 flex items-start gap-2 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="break-all">{diagError}</span>
          </div>
        )}

        {diagData && (
          <div className="bg-purple-50 rounded-lg p-3 text-xs space-y-2 mb-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-purple-400 text-[10px] uppercase">In DB</p>
                <p className="text-purple-900 font-semibold text-lg">{diagData.totalEntries}</p>
              </div>
              <div>
                <p className="text-purple-400 text-[10px] uppercase">With Storage</p>
                <p className="text-green-600 font-semibold text-lg">{diagData.withStorage}</p>
              </div>
              <div>
                <p className="text-purple-400 text-[10px] uppercase">WP URL Only</p>
                <p className="text-orange-600 font-semibold text-lg">{diagData.withoutStorage}</p>
              </div>
              <div>
                <p className="text-purple-400 text-[10px] uppercase">Missing from DB</p>
                <p className={`font-semibold text-lg ${diagData.missingSlugs.length > 0 ? "text-red-600" : "text-green-600"}`}>
                  {diagData.missingSlugs.length}
                </p>
              </div>
            </div>
            <div>
              <p className="text-purple-600 text-[10px] uppercase font-semibold">App has {costumes.length} slugs</p>
            </div>
            {diagData.missingSlugs.length > 0 && (
              <div className="mt-1">
                <p className="text-red-600 text-[10px] uppercase font-semibold mb-1">Missing slugs ({diagData.missingSlugs.length}):</p>
                <div className="max-h-40 overflow-y-auto bg-white rounded p-2">
                  {diagData.missingSlugs.map(s => (
                    <p key={s} className="text-[11px] text-red-700 leading-relaxed font-mono">{s}</p>
                  ))}
                </div>
              </div>
            )}
            {diagData.missingSlugs.length === 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">All {costumes.length} costume slugs have images in DB!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Debug ── */}
      {(allDebug.length > 0 || allErrors.length > 0) && (
        <div className="mt-2">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bug className="w-3.5 h-3.5" />
            {showDebug ? "Hide" : "Show"} debug ({allDebug.length} logs, {allErrors.length} errors)
          </button>

          {showDebug && (
            <div className="mt-2 space-y-2">
              {allDebug.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                  <p className="text-[10px] font-semibold text-blue-600 mb-1 uppercase">Debug</p>
                  {allDebug.map((d, i) => (
                    <p key={i} className="text-[11px] text-blue-800 leading-relaxed break-all">{d}</p>
                  ))}
                </div>
              )}
              {allErrors.length > 0 && (
                <div className="bg-red-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <p className="text-[10px] font-semibold text-red-600 mb-1 uppercase">Errors ({allErrors.length})</p>
                  {allErrors.slice(0, 50).map((e, i) => (
                    <p key={i} className="text-[11px] text-red-700 leading-relaxed break-all">{e}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}