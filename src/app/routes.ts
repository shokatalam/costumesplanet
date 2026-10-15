import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "./components/Layout";

// Lazy-load every page component so a compile/runtime error in one route
// does NOT cascade and prevent App.tsx from loading at all.
const HomePage                  = lazy(() => import("./components/HomePage").then(m => ({ default: m.HomePage })));
const BlogPost                  = lazy(() => import("./components/BlogPost").then(m => ({ default: m.BlogPost })));
const CategoriesPage            = lazy(() => import("./components/CategoriesPage").then(m => ({ default: m.CategoriesPage })));
const CategoryPage              = lazy(() => import("./components/CategoryPage").then(m => ({ default: m.CategoryPage })));
const SearchPage                = lazy(() => import("./components/SearchPage").then(m => ({ default: m.SearchPage })));
const SitemapPage               = lazy(() => import("./components/SitemapPage").then(m => ({ default: m.SitemapPage })));
const NotFound                  = lazy(() => import("./components/NotFound").then(m => ({ default: m.NotFound })));
const CostumeBuilderPage        = lazy(() => import("./components/CostumeBuilder").then(m => ({ default: m.CostumeBuilderPage })));
const AboutPage                 = lazy(() => import("./components/AboutPage").then(m => ({ default: m.AboutPage })));
const TermsPage                 = lazy(() => import("./components/TermsPage").then(m => ({ default: m.TermsPage })));
const PaginationRedirect        = lazy(() => import("./components/PaginationRedirect").then(m => ({ default: m.PaginationRedirect })));
const HalloweenCostumeGeneratorPage = lazy(() => import("./components/generators/HalloweenCostumeGeneratorPage").then(m => ({ default: m.HalloweenCostumeGeneratorPage })));
const AICostumeGeneratorPage        = lazy(() => import("./components/generators/AICostumeGeneratorPage").then(m => ({ default: m.AICostumeGeneratorPage })));
const RandomCostumeGeneratorPage    = lazy(() => import("./components/generators/RandomCostumeGeneratorPage").then(m => ({ default: m.RandomCostumeGeneratorPage })));
const SuperheroCostumeGeneratorPage = lazy(() => import("./components/generators/SuperheroCostumeGeneratorPage").then(m => ({ default: m.SuperheroCostumeGeneratorPage })));
const CostumeGeneratorPage          = lazy(() => import("./components/generators/CostumeGeneratorPage").then(m => ({ default: m.CostumeGeneratorPage })));
const SpiritHalloweenGeneratorPage  = lazy(() => import("./components/generators/SpiritHalloweenGeneratorPage").then(m => ({ default: m.SpiritHalloweenGeneratorPage })));

// NOTE: /sitemap.xml, /robots.txt, /llms.txt etc. are NOT listed here.
// In production they are served as static files from /public/ by Cloudflare Pages,
// or proxied to the Supabase edge function by the Cloudflare Worker.

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,                                Component: HomePage },
      { path: "categories",                         Component: CategoriesPage },
      { path: "category/:name",                     Component: CategoryPage },
      { path: "category/:name/page/:page",          Component: CategoryPage },
      { path: "search",                             Component: SearchPage },
      { path: "sitemap",                            Component: SitemapPage },
      { path: "build",                              Component: CostumeBuilderPage },
      { path: "about-us",                           Component: AboutPage },
      { path: "terms-of-use",                       Component: TermsPage },
      { path: "page/:page",                         Component: PaginationRedirect },
      // ── Generator pages (before :slug catch-all) ──
      { path: "halloween-costume-generator",        Component: HalloweenCostumeGeneratorPage },
      { path: "ai-costume-generator",               Component: AICostumeGeneratorPage },
      { path: "random-costume-generator",           Component: RandomCostumeGeneratorPage },
      { path: "superhero-costume-generator",        Component: SuperheroCostumeGeneratorPage },
      { path: "costume-generator",                  Component: CostumeGeneratorPage },
      { path: "spirit-halloween-costume-generator", Component: SpiritHalloweenGeneratorPage },
      // ── Blog post catch-all (must be last specific path) ──
      { path: ":slug",                              Component: BlogPost },
      { path: "*",                                  Component: NotFound },
    ],
  },
]);
