import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Layers,
  Lock,
  Play,
  Search,
  Shield,
  Sparkles,
  Target,
  Upload,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const TOOL_URL = "/google-search-console-reporting-tool.html";
const DASHBOARD_IMAGE = "/images/opengraph.jpg";

type FAQ = {
  q: string;
  a: string;
};

type CTAButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

type SectionBadgeProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

type FAQItemProps = FAQ & {
  index: number;
};

function setMeta(description: string) {
  let meta = document.querySelector<HTMLMetaElement>("meta[name='description']");

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}

const featureCards: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: BarChart3,
    title: "Top pages",
    text: "See which pages are getting clicks, impressions, and visibility from Google Search.",
  },
  {
    icon: Search,
    title: "Top queries",
    text: "Find the keywords people already use to discover your website.",
  },
  {
    icon: Target,
    title: "CTR insights",
    text: "Spot pages with high impressions but low clicks so you can improve titles and descriptions.",
  },
  {
    icon: Download,
    title: "PDF reports",
    text: "Create a clean report that is easy to share with clients, teams, or business owners.",
  },
];

const useCases = [
  {
    title: "Freelancers",
    text: "Use it before client calls to quickly understand what is working, what is dropping, and where easy SEO wins are available.",
  },
  {
    title: "Agencies",
    text: "Create fast SEO summaries for multiple clients without spending hours cleaning sheets or building dashboards.",
  },
  {
    title: "Business owners",
    text: "Check your website performance in simple language without waiting for a long agency report.",
  },
  {
    title: "Bloggers",
    text: "Find blog posts that already get impressions and update them for better clicks and rankings.",
  },
  {
    title: "Trainers",
    text: "Show students how GSC data becomes useful when it is converted into clear sections and charts.",
  },
];

const uniquePoints = [
  "No setup",
  "Instant insights",
  "100% local processing",
  "One click PDF",
  "Simple UI",
  "Beginner friendly",
  "Useful for quick SEO reviews",
];

const faqs: FAQ[] = [
  {
    q: "Is this tool free?",
    a: "Yes, this Google Search Console Reporting Tool is free to use. You can open the tool, upload your exported GSC file, and check the dashboard without paying anything. It is made for freelancers, agencies, business owners, bloggers, and students who want faster SEO insights. You do not need to book a call or create an account to use it. Just export your data from Google Search Console and open the tool.",
  },
  {
    q: "Is my data safe?",
    a: "Yes, your data is safe because the tool is designed for local processing. This means your file is handled inside your browser instead of being sent to a public server. Your Google Search Console export stays with you. This is useful when you are checking client data or business data. You can use the tool with more confidence because there is no login, no account, and no extra tracking step.",
  },
  {
    q: "What file formats are supported?",
    a: "The tool is made for Google Search Console export files. In most cases, you can use common spreadsheet exports like CSV or Excel files from GSC. The exact support depends on how the main tool page is configured. For best results, export the performance data directly from Google Search Console and upload that file inside the tool page. Do not change the column names before uploading.",
  },
  {
    q: "Can I use it for client reporting?",
    a: "Yes, this tool is useful for client reporting. You can quickly check top pages, top queries, clicks, impressions, CTR, and other important SEO numbers. The PDF export makes it easier to share a clean report after your analysis. It saves time when you have many clients or need a quick update before a meeting. It is not meant to replace deep SEO strategy, but it is very helpful for fast reporting.",
  },
  {
    q: "Do I need SEO knowledge?",
    a: "No, you do not need advanced SEO knowledge to start using this tool. The dashboard makes the data easier to read than a raw spreadsheet. You can see which pages are performing, which queries are getting impressions, and where CTR can improve. Beginners can use it to understand their website better. Experts can use it to save time and move faster during audits.",
  },
];

function CTAButton({ children = "Upload File & Open Tool", className = "" }: CTAButtonProps) {
  return (
    <a
      href={TOOL_URL}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] px-6 py-4 text-sm font-bold text-[#080c14] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#c9a84c]/30 sm:px-8 sm:text-base ${className}`}
    >
      {children}
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function SectionBadge({ icon: Icon, children }: SectionBadgeProps) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-4 py-1.5">
      <Icon size={14} className="text-[#c9a84c]" />
      <span className="text-xs font-medium uppercase tracking-wide text-[#c9a84c]">{children}</span>
    </div>
  );
}

function FAQItem({ q, a, index }: FAQItemProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c]"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-white/5 md:px-6"
      >
        <span className="text-base font-semibold text-white md:text-lg">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="text-[#c9a84c]" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10"
          >
            <p className="px-5 py-5 text-sm leading-7 text-white/60 md:px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GoogleSearchConsoleReportingToolPage() {
  useEffect(() => {
    document.title = "Google Search Console Reporting Tool | Pranjal Digital";
    setMeta(
      "Free Google Search Console Reporting Tool by Pranjal Digital. Upload your GSC export and get instant SEO insights, top pages, queries, and client-ready PDF reports."
    );
  }, []);

  return (
    <main className="overflow-hidden bg-[#080c14] text-white">
      <section className="relative flex min-h-[88vh] items-center overflow-hidden pb-12 pt-16 md:pt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a0f1c] to-[#040608]" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-[#c9a84c]/5 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.38, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 h-[520px] w-[520px] rounded-full bg-[#f0d282]/5 blur-[120px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/20 to-[#c9a84c]/5 px-5 py-2"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9a84c]" />
            <span className="text-sm font-medium text-[#c9a84c]">Free SEO Reporting Tool</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-5 max-w-5xl text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-7xl"
          >
            Google Search Console
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent">
              Reporting Tool
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mb-8 max-w-3xl px-2 text-base leading-relaxed text-white/60 md:text-xl"
          >
            Upload your Google Search Console export in the tool page and get instant SEO insights.
            See top pages, queries, CTR issues, and client-ready PDF reports without spreadsheet work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <CTAButton className="w-full sm:w-auto">Upload File & Open Tool</CTAButton>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/50 md:text-sm">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#c9a84c]" />No login required</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
              <span className="inline-flex items-center gap-1.5"><Zap size={14} className="text-[#c9a84c]" />Works instantly</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
              <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-[#c9a84c]" />100% safe</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080c14] to-[#0a0f1c] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <SectionBadge icon={Play}>Watch Overview</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">See How The Tool Works</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#040608] shadow-2xl shadow-black/30">
            <iframe
              className="aspect-video h-full w-full"
              src="https://www.youtube.com/embed/Tbd_q_-dTUk?si=lMiHklXHiy2KVR9a"
              title="Google Search Console Reporting Tool overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0a0f1c] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <SectionBadge icon={Eye}>Dashboard Preview</SectionBadge>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Clean SEO Dashboard From GSC Data</h2>
          <a href={DASHBOARD_IMAGE} target="_blank" rel="noopener noreferrer" className="group block">
            <img
              src={DASHBOARD_IMAGE}
              alt="Google Search Console Reporting Tool dashboard preview"
              className="w-full rounded-2xl border border-white/10 bg-[#040608] object-cover shadow-2xl shadow-black/30 transition duration-300 group-hover:border-[#c9a84c]/40"
            />
          </a>
          <p className="mt-3 text-sm text-white/40">Click image to enlarge</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0a0f1c] to-[#040608] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionBadge icon={Sparkles}>What This Tool Does</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              Turn Raw GSC Data Into
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Clear SEO Insights</span>
            </h2>
            <p className="text-base leading-8 text-white/60 md:text-lg">
              Google Search Console gives very useful data. But for many people, the raw export feels confusing. You get rows, columns, numbers, dates, pages, queries, clicks, impressions, CTR, and average position. If you are not used to reading SEO data every day, it can take time to understand what is actually important.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 md:text-lg">
              This Google Search Console Reporting Tool makes that job simple. You export your data from GSC, open the tool page, upload the file there, and the dashboard is ready. You do not need to clean sheets manually. You do not need to create formulas. You do not need to build charts from zero. The tool helps you see the important things faster.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 md:text-lg">
              You can check top pages, top queries, clicks, impressions, CTR, and average position in a clean way. You can quickly understand which pages are already bringing traffic and which pages need improvement. You can also find queries where impressions are high but clicks are low. These are good chances to improve your title, meta description, content angle, or page structure.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 md:text-lg">
              The tool is also useful for reporting. If you work with clients, you can create a PDF report and share it after your review. If you run your own business, you can use the report to discuss SEO with your team. The main benefit is speed. Instead of spending hours inside spreadsheets, you can focus on decisions. What should be updated? Which page needs attention? Which keyword has potential? The tool helps you reach those answers faster.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 md:text-lg">
              Another important point is local processing. Your file is handled in the browser, so you can review data without a complicated setup. It is made for practical SEO work. Simple, fast, and useful.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-5 transition duration-300 hover:border-[#c9a84c]/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a84c]/10">
                  <feature.icon size={24} className="text-[#c9a84c]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-white/55">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#040608] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <SectionBadge icon={Clock}>30 Second Overview</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">From Export To Dashboard In 3 Steps</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Step 1", "Export from GSC", "Go to Google Search Console and export your performance data for the date range you want to check."],
              ["Step 2", "Upload", "Open the tool page and upload the exported file there. No login or setup is needed."],
              ["Step 3", "Dashboard ready", "See pages, queries, clicks, impressions, CTR, position, and useful SEO views in one place."],
            ].map(([step, title, text]) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
                <div className="mb-4 text-sm font-semibold text-[#c9a84c]">{step}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-white/60">
            The process is simple because the tool removes the boring spreadsheet work. You do not have to sort columns again and again. You see the useful parts of your GSC export directly in a readable format.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <SectionBadge icon={Users}>Use Cases</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Who Can Use This Tool?</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {useCases.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-5">
                <h3 className="mb-3 text-lg font-bold text-[#c9a84c]">{item.title}</h3>
                <p className="text-sm leading-7 text-white/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080c14] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <SectionBadge icon={Layers}>Comparison</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Tool vs Other Options</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-4 text-2xl font-bold text-white">Tool vs Claude + GSC Connector</h3>
              <p className="leading-8 text-white/60">
                Claude with a GSC connector can be useful, but it depends on prompts. You need to know what to ask, how to ask, and how to check the answer. For many users, that becomes another task. This tool is different. It gives a ready dashboard instantly. No prompt writing. No repeated instructions. No setup. It is better when you want quick reporting and clear SEO views without thinking about the right prompt.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-4 text-2xl font-bold text-white">Tool vs Looker Studio</h3>
              <p className="leading-8 text-white/60">
                Looker Studio is powerful, but it needs setup. You have to connect sources, design dashboards, manage filters, and keep the report clean. That is good for long-term reporting, but not always needed for quick checks. This tool is made for instant results from a GSC export. It is useful before calls, during audits, while checking content performance, or when you need a simple report quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080c14] to-[#040608] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <SectionBadge icon={Zap}>Unique</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">What Makes This Tool Unique?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {uniquePoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a0f1c] px-4 py-3">
                  <CheckCircle2 size={18} className="shrink-0 text-[#c9a84c]" />
                  <span className="text-sm font-medium text-white/75">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionBadge icon={FileText}>Benefits</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">Simple Benefits For Real SEO Work</h2>
            <p className="leading-8 text-white/60">
              The biggest benefit is time saving. You can move from raw export to useful insight quickly. The tool is easy to use, so beginners do not feel lost. At the same time, experts can use it to speed up audits and reporting. It helps you find quick SEO wins like pages with low CTR, queries with strong impressions, and content that deserves an update. For client work, it gives a cleaner way to explain performance. For business owners, it makes GSC data less scary and more useful.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <SectionBadge icon={Shield}>FAQ</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <SectionBadge icon={Upload}>Open Tool</SectionBadge>
          <h2 className="mb-5 text-3xl font-bold text-white md:text-6xl">
            Ready To Turn GSC Data Into
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Clear SEO Insights?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/60">
            Open the Google Search Console Reporting Tool, upload your export there, and get a clean dashboard in minutes.
          </p>
          <CTAButton className="w-full sm:w-auto">Open Google Search Console Reporting Tool</CTAButton>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
            <span className="inline-flex items-center gap-1.5"><Lock size={13} className="text-[#c9a84c]" />Local processing</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-[#c9a84c]" />Instant dashboard</span>
            <span className="inline-flex items-center gap-1.5"><Download size={13} className="text-[#c9a84c]" />PDF export</span>
          </div>
        </div>
      </section>
    </main>
  );
}
