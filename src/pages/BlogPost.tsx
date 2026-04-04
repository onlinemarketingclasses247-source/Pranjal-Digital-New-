import { ArrowRight } from "lucide-react";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

export default function BlogPost() {
  return (
    <div className="bg-[#080c14] text-white pt-24">

      {/* FEATURED IMAGE */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <img src="https://via.placeholder.com/1200x500" className="rounded-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-10">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-4xl font-bold">
            Google Core Update March 2026 – Real Analysis
          </h1>

          {/* POINTS */}
          <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 p-6 rounded-xl">
            <h3 className="text-[#c9a84c] mb-2">Points to Note</h3>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• AEO + intent-based content dominates</li>
              <li>• Thin AI content penalized heavily</li>
              <li>• Authority & trust signals critical</li>
            </ul>
          </div>

          {/* TOC */}
          <div className="border border-white/10 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Table of Contents</h3>
            <ul className="text-sm text-white/60 space-y-1">
              <li>1. What Changed</li>
              <li>2. Impact</li>
              <li>3. Strategy</li>
              <li>4. Action Plan</li>
            </ul>
          </div>

          {/* YOUTUBE */}
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            />
          </div>

          <p className="text-white/70">
            Google’s March 2026 update has significantly changed ranking dynamics...
          </p>

          <img src="https://via.placeholder.com/800x400" className="rounded-xl" />

          <p className="text-white/70">
            Sites using thin AI content saw massive drops...
          </p>

          <img src="https://via.placeholder.com/800x400" className="rounded-xl" />

          {/* SUMMARY */}
          <div className="bg-[#040608] border border-white/10 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Quick Summary</h3>
            <p className="text-white/60 text-sm">
              Structured, helpful, authoritative content is the future.
            </p>
          </div>

          {/* AUTHOR */}
          <div className="border-t border-white/10 pt-6 flex gap-4">
            <img src="https://via.placeholder.com/80" className="rounded-full" />
            <div>
              <h4 className="font-semibold">Pranjal Digital</h4>
              <p className="text-white/50 text-sm">
                12+ years experience in SEO, PPC, SaaS & B2B marketing.
              </p>
              <div className="flex gap-4 mt-2 text-[#c9a84c] text-sm">
                <a href="https://www.linkedin.com/in/pranjal-sharma-digital-marketing-consultant/" target="_blank">LinkedIn</a>
                <a href="https://x.com/Pranjaldigitl" target="_blank">X</a>
                <a href="https://www.youtube.com/@PranjalSharmaDigital" target="_blank">YouTube</a>
              </div>
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="sticky top-24 h-fit">
          <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 p-6 rounded-xl">

            <h3 className="font-semibold mb-3">Need More Leads?</h3>

            <a href="/contact" className="gold-bg text-black px-5 py-3 rounded-lg block text-center mb-3">
              Contact Now
            </a>

            <a href={CALENDLY} target="_blank" className="border border-white/20 px-5 py-3 rounded-lg block text-center">
              Book Meeting
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
