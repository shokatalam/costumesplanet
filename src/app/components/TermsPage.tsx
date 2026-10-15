import { Link } from "react-router";
import { motion } from "motion/react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function TermsPage() {
  useDocumentMeta({
    title: "Terms of Use — CostumesPlanet.com",
    description:
      "Read the terms of use for CostumesPlanet.com including content usage, affiliate disclosure, and intellectual property guidelines.",
  });

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using CostumesPlanet.com (the \"Website\"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Website.",
    },
    {
      title: "2. Description of Service",
      content:
        "CostumesPlanet.com provides costume guides, product recommendations, and cosplay tips. Our guides include links to products available on Amazon.com and other retailers. We do not sell products directly; we provide editorial recommendations and purchasing guidance.",
    },
    {
      title: "3. Affiliate Disclosure",
      content:
        "CostumesPlanet.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program. We earn commissions from qualifying purchases made through links on our site. Product prices and availability are subject to change. Any price and availability information displayed at the time of purchase will apply.",
    },
    {
      title: "4. Content & Intellectual Property",
      content:
        "All content on CostumesPlanet.com, including text, images, guides, and design elements, is the property of CostumesPlanet.com or its content creators. Character names, images, and trademarks referenced in our costume guides are the property of their respective owners. Our guides are created for educational and entertainment purposes under fair use principles.",
    },
    {
      title: "5. User Conduct",
      content:
        "You agree not to: (a) use any automated systems (bots, scrapers) to access the Website; (b) attempt to interfere with the Website's operation; (c) reproduce, duplicate, or sell any portion of the Website without permission; (d) use the Website for any illegal or unauthorized purpose.",
    },
    {
      title: "6. Product Information Accuracy",
      content:
        "While we strive to keep product information accurate and up-to-date, we cannot guarantee that all prices, descriptions, or availability details are current at any given time. We recommend verifying product details on the retailer's website before purchasing.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "CostumesPlanet.com is provided \"as is\" without warranties of any kind. We are not liable for any damages arising from your use of the Website, including but not limited to direct, indirect, incidental, or consequential damages. We are not responsible for the quality, safety, or legality of products linked from our guides.",
    },
    {
      title: "8. Privacy",
      content:
        "We respect your privacy. We use analytics tools to improve our service and may use cookies for functionality purposes. We do not collect personal information unless voluntarily provided. For questions about data practices, contact us through the Website.",
    },
    {
      title: "9. Changes to Terms",
      content:
        "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website constitutes acceptance of any modified terms.",
    },
    {
      title: "10. Contact",
      content:
        "If you have questions about these Terms of Use, please reach out through our website. We typically respond within 2-3 business days.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
        <Link to="/" className="hover:text-[#1a237e] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900" style={{ fontWeight: 500 }}>Terms of Use</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          className="text-4xl text-gray-900 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Terms of Use
        </h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: March 4, 2026</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2
                className="text-lg text-gray-900 mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                {s.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-lg shadow-[#1a237e]/20 hover:-translate-y-0.5 transition-all"
            style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            &larr; Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
