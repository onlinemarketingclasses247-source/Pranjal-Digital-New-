import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Gauge,
  Layers,
  LineChart,
  Lock,
  MousePointerClick,
  Play,
  Search,
  Shield,
  Sparkles,
  Table2,
  Target,
  Upload,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const TOOL_URL = "/google-search-console-reporting-tool.html";
const DASHBOARD_IMAGE =
  "https://i.ibb.co/206qD5Bv/screencapture-pranjaldigital-google-search-console-reporting-tool-html-2026-04-25-19-15-15.png";
const FALLBACK_DASHBOARD_IMAGE = "/images/opengraph.jpg";

type IconText = {
  icon: LucideIcon;
  title: string;
  text: string;
};

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

const quickWins: IconText[] = [
  {
    icon: Search,
    title: "Find winning queries",
    text: "See which search terms already bring impressions and clicks.",
  },
  {
    icon: Target,
    title: "Improve weak CTR",
    text: "Spot pages where better titles and descriptions can increase clicks.",
  },
  {
    icon: LineChart,
    title: "Track page potential",
    text: "Understand which pages need updates, internal links, or fresh content.",
  },
  {
    icon: Download,
    title: "Export PDF report",
    text: "Share a cleaner summary with clients, teams, or business owners.",
  },
];

const processSteps: Array<IconText & { step: string; result: string }> = [
  {
    step: "Step 1",
    icon: FileSpreadsheet,
    title: "Export from GSC",
    text: "Open Google Search Console, select your property, go to Performance, choose your date range, and export the data.",
    result: "You now have the raw file.",
  },
  {
    step: "Step 2",
    icon: Upload,
    title: "Open tool and upload",
    text: "Click the CTA on this page. The actual upload happens only inside the HTML tool page, not on this landing page.",
    result: "The tool reads your GSC export.",
  },
  {
    step: "Step 3",
    icon: Gauge,
    title: "Dashboard is ready",
    text: "The tool converts the export into useful views like pages, queries, clicks, impressions, CTR, and average position.",
    result: "You can start analysis.",
  },
  {
    step: "Step 4",
    icon: FileText,
    title: "Download report",
    text: "Use the dashboard to find insights, then export a PDF report for client calls, audits, or internal review.",
    result: "You have a clean report.",
  },
];

const useCases: IconText[] = [
  {
    icon: Users,
    title: "Freelancers",
    text: "Prepare for calls faster and show clients what needs attention without building a report manually.",
  },
  {
    icon: Layers,
    title: "Agencies",
    text: "Check multiple websites quickly and create a simple reporting flow for recurring SEO updates.",
  },
  {
    icon: Target,
    title: "Business owners",
    text: "Understand website performance without waiting for long technical reports or spreadsheet cleanup.",
  },
  {
    icon: Search,
    title: "Bloggers",
    text: "Find posts with impressions, low CTR, and ranking potential so you know what to update next.",
  },
  {
    icon: Play,
    title: "Trainers",
    text: "Teach GSC reporting with a visual dashboard that students can understand in a practical way.",
  },
];

const comparisonRows = [
  {
    factor: "Setup",
    tool: "Open tool, upload export, view dashboard",
    claude: "Connector setup and prompt flow needed",
    looker: "Data source, charts, filters, and layout setup needed",
  },
  {
    factor: "Speed",
    tool: "Instant report from exported data",
    claude: "Depends on prompt quality and follow-up questions",
    looker: "Fast after setup, slow for first-time users",
  },
  {
    factor: "Best for",
    tool: "Quick audits, client calls, simple SEO reporting",
    claude: "Custom analysis and deeper question-answering",
    looker: "Long-term dashboards and recurring BI reports",
  },
  {
    factor: "Skill needed",
    tool: "Beginner friendly",
    claude: "Needs good prompts and SEO understanding",
    looker: "Needs dashboard and data setup knowledge",
  },
  {
    factor: "Output",
    tool: "Ready dashboard plus PDF report",
    claude: "Text answers, tables, and generated analysis",
    looker: "Custom dashboard, if built properly",
  },
];

const uniquePoints = [
  "No setup",
  "Instant insights",
  "100% local processing",
  "One click PDF",
  "Simple UI",
  "Beginner friendly",
  "Works well for fast audits",
  "Useful for client reporting",
];

const faqs: FAQ[] = [
  {
    q: "Is this tool free?",
    a: "Yes, this Google Search Console Reporting Tool is free to use. You can open the tool, upload your exported GSC file, and check the dashboard without paying anything. It is made for freelancers, agencies, business owners, bloggers, and students who want faster SEO insights. You do not need to create an account. Just export your data from Google Search Console and open the tool.",
  },
  {
    q: "Is my data safe?",
    a: "Yes, your data is safe because the tool is designed for local processing. Your file is handled inside your browser instead of being sent through a complicated login flow. This is useful when you are checking client data or business data. Your Google Search Console export stays with you. There is no need to share passwords or connect private accounts.",
  },
  {
    q: "What file formats are supported?",
    a: "The tool is made for Google Search Console export files. In most cases, common GSC spreadsheet exports like CSV or Excel work best. For the cleanest result, export performance data directly from Google Search Console. Do not rename columns before upload. If the file follows the normal GSC export format, the dashboard can understand it better.",
  },
  {
    q: "Can I use it for client reporting?",
    a: "Yes, this tool is very useful for client reporting. You can quickly check top pages, top queries, clicks, impressions, CTR, and average position. The PDF export helps you share a clean summary after your analysis. It saves time before meetings and monthly reviews. It is also useful when you need a quick SEO snapshot for a new client.",
  },
  {
    q: "Do I need SEO knowledge?",
    a: "No, you do not need advanced SEO knowledge to start. The dashboard is easier to read than a raw spreadsheet. You can see which pages are performing and which queries are getting impressions. Beginners can understand their website faster. Experts can use the same tool to save time during audits and reporting.",
  },
];

function CTAButton({ children = "Upload File & Open Tool", className = "" }: CTAButtonProps) {
  return (
    <a
      href={TOOL_URL}
      className={`group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] px-6 py-3.5 text-sm font-bold text-[#080c14] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[#c9a84c]/35 sm:px-8 sm:text-base ${className}`}
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
      <span className="text-xs font-semibold uppercase tracking-wide text-[#c9a84c]">{children}</span>
    </div>
  );
}

function GlowCard({
  icon: Icon,
  title,
  text,
  index,
}: IconText & {
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9a84c]/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a84c]/10 ring-1 ring-[#c9a84c]/20">
          <Icon size={23} className="text-[#c9a84c]" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
        <p className="text-sm leading-6 text-white/58">{text}</p>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  const [src, setSrc] = useState(DASHBOARD_IMAGE);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mx-auto max-w-6xl">
      <a
        href="https://ibb.co/8nBMWXVr"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#050812] shadow-2xl shadow-black/40"
      >
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050812]">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c9a84c]/20 border-t-[#c9a84c]" />
          </div>
        )}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050812] sm:aspect-[16/9] lg:aspect-[21/10]">
          <img
            src={src}
            alt="Google Search Console Reporting Tool dashboard preview"
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (src !== FALLBACK_DASHBOARD_IMAGE) {
                setSrc(FALLBACK_DASHBOARD_IMAGE);
              }
              setLoaded(true);
            }}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.015]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
          <span className="text-xs font-medium text-white/75 sm:text-sm">Click image to enlarge</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-bold text-[#080c14]">
            <MousePointerClick size={13} />
            Open full image
          </span>
        </div>
      </a>
    </div>
  );
}

function FAQItem({ q, a, index }: FAQItemProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
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
      "Free Google Search Console Reporting Tool by Pranjal Digital. Upload your GSC export and get instant SEO insights, top pages, queries, CTR, and client-ready PDF reports."
    );
  }, []);

  return (
    <main className="overflow-hidden bg-[#080c14] text-white">
      <section className="relative flex min-h-[76vh] items-center overflow-hidden px-4 py-14 sm:min-h-[82vh] md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1a2030_0,#080c14_42%,#040608_100%)]" />
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute left-[8%] top-[18%] h-[280px] w-[280px] rounded-full bg-[#c9a84c]/10 blur-[100px] md:h-[460px] md:w-[460px]"
          />
          <motion.div
            animate={{ y: [0, 18, 0], opacity: [0.16, 0.28, 0.16] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-[12%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#f0d282]/10 blur-[110px] md:h-[520px] md:w-[520px]"
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/20 to-[#c9a84c]/5 px-4 py-2"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9a84c]" />
              <span className="text-xs font-semibold text-[#c9a84c] sm:text-sm">Free reporting tool for GSC exports</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-5 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Google Search Console
              <span className="block bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent">
                Reporting Tool
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mx-auto mb-7 max-w-2xl text-base leading-8 text-white/62 md:text-lg lg:mx-0"
            >
              Convert your Google Search Console export into a clean SEO dashboard. Find top pages,
              top queries, CTR gaps, content opportunities, and client-ready PDF reports without
              spreadsheet cleanup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <CTAButton className="w-full sm:w-auto">Upload File & Open Tool</CTAButton>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
                <Shield size={17} className="text-[#c9a84c]" />
                No login. Local processing. Fast report.
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[#c9a84c]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1c] p-4 shadow-2xl shadow-black/40">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#050812] px-4 py-3">
                <div>
                  <p className="text-xs text-white/40">Instant report</p>
                  <p className="font-bold text-white">GSC performance overview</p>
                </div>
                <BarChart3 className="text-[#c9a84c]" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickWins.map((item, index) => (
                  <GlowCard key={item.title} {...item} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050812] px-4 py-5">
        <div className="mx-auto grid max-w-7xl gap-3 text-center sm:grid-cols-3">
          {[
            ["No login required", Shield],
            ["Works instantly", Zap],
            ["100% safe workflow", Lock],
          ].map(([label, Icon]) => {
            const TrustIcon = Icon as LucideIcon;
            return (
              <div key={label as string} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/65">
                <TrustIcon size={16} className="text-[#c9a84c]" />
                {label}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080c14] to-[#0a0f1c] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 text-center">
            <SectionBadge icon={Play}>Video Overview</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">See How The Tool Works</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#040608] shadow-2xl shadow-black/35"
          >
            <iframe
              className="aspect-video h-full w-full"
              src="https://www.youtube.com/embed/Tbd_q_-dTUk?si=lMiHklXHiy2KVR9a"
              title="Google Search Console Reporting Tool overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0a0f1c] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <SectionBadge icon={Eye}>Dashboard Preview</SectionBadge>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Dashboard Image That Loads Cleanly</h2>
          <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            The preview uses a fixed responsive frame, object-contain rendering, and fallback image support so it does not break the page layout.
          </p>
          <DashboardPreview />
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0a0f1c] to-[#040608] px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionBadge icon={Sparkles}>What This Tool Does</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              Turn Raw GSC Data Into
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Clear SEO Insights</span>
            </h2>
            <div className="space-y-4 text-base leading-8 text-white/62">
              <p>
                Google Search Console gives very useful data. But the raw export is not always easy to read. You see rows, columns, URLs, queries, clicks, impressions, CTR, average position, dates, and filters. For many users, this becomes confusing. Even for SEO people, it takes time to clean and explain.
              </p>
              <p>
                This tool solves that problem by turning your GSC export into a simple dashboard. You export the file from Search Console, open the tool page, upload it there, and the report becomes ready. The React landing page only sends users to the tool. The upload stays inside the HTML tool page.
              </p>
              <p>
                Inside the dashboard, users can check top pages, top queries, clicks, impressions, CTR, and average position. This makes it easier to find what is growing, what is stuck, and what can be improved. A page with high impressions and low CTR can be updated with a stronger title. A query with good position but low traffic can become a content opportunity.
              </p>
              <p>
                The tool is also useful for client reporting. You can create a PDF report and share a clean summary. Freelancers can save time before calls. Agencies can review multiple exports faster. Business owners can understand their website without opening complex dashboards. Bloggers can find posts that deserve updates. Trainers can explain GSC data in a practical way.
              </p>
              <p>
                The main value is speed. You spend less time sorting sheets and more time taking action. It keeps SEO reporting simple, visual, and useful.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickWins.map((item, index) => (
              <GlowCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#040608] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <SectionBadge icon={Clock}>Process Flow</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Step By Step Reporting Flow</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              This section shows exactly what happens from GSC export to final report, so users understand the process before opening the tool.
            </p>
          </div>

          <div className="relative grid gap-4 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent lg:block" />
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-2xl border border-white/10 bg-[#0a0f1c] p-5"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c9a84c] text-[#080c14]">
                    <step.icon size={22} />
                  </div>
                  <span className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-3 py-1 text-xs font-bold text-[#c9a84c]">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="mb-4 text-sm leading-7 text-white/58">{step.text}</p>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-medium text-white/55">
                  Result: <span className="text-[#c9a84c]">{step.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <SectionBadge icon={Users}>Use Cases</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Who Can Use This Tool?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {useCases.map((item, index) => (
              <GlowCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080c14] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <SectionBadge icon={Table2}>Comparison</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Tool vs Claude vs Looker Studio</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              First see the direct comparison table. Then read the simple explanation below it.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c]">
            <div className="grid grid-cols-4 bg-[#050812] text-xs font-bold uppercase tracking-wide text-white/50">
              <div className="p-3 md:p-4">Factor</div>
              <div className="border-l border-white/10 p-3 text-[#c9a84c] md:p-4">This Tool</div>
              <div className="border-l border-white/10 p-3 md:p-4">Claude + GSC</div>
              <div className="border-l border-white/10 p-3 md:p-4">Looker Studio</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.factor} className="grid grid-cols-4 border-t border-white/10 text-xs leading-6 md:text-sm">
                <div className="p-3 font-semibold text-white md:p-4">{row.factor}</div>
                <div className="border-l border-[#c9a84c]/20 bg-[#c9a84c]/5 p-3 text-white/78 md:p-4">{row.tool}</div>
                <div className="border-l border-white/10 p-3 text-white/55 md:p-4">{row.claude}</div>
                <div className="border-l border-white/10 p-3 text-white/55 md:p-4">{row.looker}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-3 text-2xl font-bold text-white">Tool vs Claude + GSC connector</h3>
              <p className="leading-8 text-white/60">
                Claude can help with analysis, but the user needs to ask the right questions. If the prompt is weak, the output may not be useful. This tool is better for users who want a ready dashboard without prompt writing. It gives a fixed reporting flow, quick views, and PDF export.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-3 text-2xl font-bold text-white">Tool vs Looker Studio</h3>
              <p className="leading-8 text-white/60">
                Looker Studio is powerful for long-term dashboards, but it needs setup and design time. This tool is faster for audits, content checks, and client reporting from exported GSC data. It is not trying to replace BI dashboards. It is made for instant SEO reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080c14] to-[#040608] px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
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
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">Benefits For Real SEO Work</h2>
            <p className="leading-8 text-white/62">
              The tool saves time, makes GSC data easier to understand, and helps users find quick SEO wins. Beginners can use it without feeling lost. Experts can use it to speed up audits and monthly reports. It is useful when you want to explain SEO performance in a simple way, especially during client calls or internal meetings.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
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

      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <SectionBadge icon={Upload}>Open Tool</SectionBadge>
          <h2 className="mb-5 text-3xl font-bold text-white md:text-6xl">
            Ready To Turn GSC Data Into
            <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Clear SEO Insights?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/62">
            Open the Google Search Console Reporting Tool, upload your export there, and get a clean dashboard in minutes.
          </p>
          <CTAButton className="w-full sm:w-auto">Open Google Search Console Reporting Tool</CTAButton>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-white/45">
            <span className="inline-flex items-center gap-1.5"><Lock size={13} className="text-[#c9a84c]" />Local processing</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-[#c9a84c]" />Instant dashboard</span>
            <span className="inline-flex items-center gap-1.5"><Download size={13} className="text-[#c9a84c]" />PDF export</span>
          </div>
        </div>
      </section>
    </main>
  );
}
