import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Shield, Users, Star, ArrowRight, BookOpen, ShoppingBag } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function AboutPage() {
  useDocumentMeta({
    title: "About Us — CostumesPlanet.com",
    description:
      "About CostumesPlanet.com: what our costume guides cover, how they are put together, and how the site is funded.",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
        <Link to="/" className="hover:text-[#1a237e] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900" style={{ fontWeight: 500 }}>About Us</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center shadow-lg shadow-[#1a237e]/20">
            <span className="text-4xl">🎭</span>
          </div>
          <h1
            className="text-4xl md:text-5xl text-gray-900 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            About CostumesPlanet
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We're a team of costume enthusiasts, cosplayers, and pop culture fans dedicated to helping you create the perfect look for any character.
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 mb-12">
          <h2
            className="text-2xl text-gray-900 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CostumesPlanet.com was created with one goal: to make costume-building easy, accessible, and fun for everyone. Whether you're preparing for Halloween, a comic convention, a themed party, or just want to cosplay your favorite character, we put together guides that list the pieces you need and how to wear them.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each of our 200+ costume guides is carefully curated with real Amazon product picks, step-by-step dressing instructions, and community tips sourced from platforms like Reddit and cosplay forums. We believe everyone deserves to feel amazing in their costume, regardless of budget or experience level.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Shield, title: "Honest Recommendations", desc: "We link to products as examples of each piece, and we say so when we haven't tried something ourselves. We earn a commission on Amazon purchases." },
            { icon: Heart, title: "Passion-Driven", desc: "We're cosplayers ourselves. We understand what makes a great costume and we share that knowledge freely." },
            { icon: Users, title: "Community-Sourced", desc: "Tips and tricks from Reddit, cosplay forums, and real convention-goers make our guides practical and authentic." },
            { icon: Star, title: "Always Updated", desc: "We regularly update product links, add new guides, and refresh our recommendations to keep everything current." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="w-10 h-10 rounded-xl bg-[#1a237e]/5 flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-[#1a237e]" />
              </div>
              <h3 className="text-gray-900 text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 md:p-12 mb-12">
          <h2
            className="text-2xl text-gray-900 mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            What We Offer
          </h2>
          <div className="space-y-4">
            {[
              { icon: BookOpen, text: "200+ detailed costume guides covering Marvel, DC, Disney, anime, gaming, and more" },
              { icon: ShoppingBag, text: "Curated Amazon product picks with real prices and direct purchase links" },
              { icon: Star, text: "Interactive Costume Builder tool to create custom costume recipes with drag-and-drop" },
              { icon: Users, text: "Practical tips and FAQs for each costume" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF9900]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-[#FF9900]" />
                </div>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 mb-12">
          <h3 className="text-gray-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
            Affiliate Disclosure
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            CostumesPlanet.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you purchase through our links, we may earn a small commission at no extra cost to you. This helps us maintain and improve our free costume guides.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-lg shadow-[#1a237e]/20 hover:-translate-y-0.5 transition-all"
            style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Browse All Costumes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
