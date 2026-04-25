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
    title: "Find useful queries",
    text: "See the words people already search before they visit your website.",
  },
  {
    icon: Target,
    title: "Improve low CTR",
    text: "Find pages that get seen on Google but do not get enough clicks.",
  },
  {
    icon: LineChart,
    title: "Pick pages to update",
    text: "Know which pages need a better title, fresh content, or internal links.",
  },
  {
    icon: Download,
    title: "Download PDF",
    text: "Create a clean report for clients, your team, or your own records.",
  },
];

const processSteps: Array<IconText & { step: string; result: string }> = [
  {
    step: "Step 1",
    icon: FileSpreadsheet,
    title: "Export from GSC",
    text: "Open Google Search Console. Select your website, choose the date range, and export the performance data.",
    result: "You get the raw GSC file.",
  },
  {
    step: "Step 2",
    icon: Upload,
    title: "Open the tool",
    text: "Click the big upload button on this page. It will open the actual tool page where the upload happens.",
    result: "You reach the upload screen.",
  },
  {
    step: "Step 3",
    icon: Gauge,
    title: "Upload the file",
    text: "Upload your exported file inside the tool. The tool reads the data and turns it into simple sections.",
    result: "Your dashboard is ready.",
  },
  {
    step: "Step 4",
    icon: FileText,
    title: "Read and export",
    text: "Check pages, queries, clicks, impressions, CTR, and position. Then export a PDF if you need a report.",
    result: "You know what to improve.",
  },
];

const useCases: IconText[] = [
  {
    icon: Users,
    title: "Freelancers",
    text: "Use it before client calls. You can quickly show what is working and what needs improvement.",
  },
  {
    icon: Layers,
    title: "Agencies",
    text: "Review many client exports faster. It helps your team avoid slow spreadsheet work.",
  },
  {
    icon: Target,
    title: "Business owners",
    text: "Understand your website performance without waiting for a long technical report.",
  },
  {
    icon: Search,
    title: "Bloggers",
    text: "Find posts that already get impressions and update them to get more clicks.",
  },
  {
    icon: Play,
    title: "Trainers",
    text: "Explain GSC data to students with a real visual dashboard and simple examples.",
  },
];

const comparisonRows = [
  {
    factor: "Setup",
    tool: "Open tool, upload file, view dashboard",
    claude: "Needs connector setup and clear prompts",
    looker: "Needs data source, charts, and filters",
  },
  {
    factor: "Speed",
    tool: "Fast for one-time reports and audits",
    claude: "Depends on your prompts and follow-up questions",
    looker: "Fast later, but slow to set up first",
  },
  {
    factor: "Best use",
    tool: "Quick SEO checks and client reports",
    claude: "Deep custom questions and analysis",
    looker: "Long-term dashboards",
  },
  {
    factor: "Skill needed",
    tool: "Easy for beginners",
    claude: "Needs prompt and SEO knowledge",
    looker: "Needs dashboard building knowledge",
  },
  {
    factor: "Output",
    tool: "Dashboard and PDF report",
    claude: "Text answers and tables",
    looker: "Custom dashboard",
  },
];

const uniquePoints = [
  "No login needed",
  "No dashboard setup",
  "Works from GSC export",
  "Simple SEO views",
  "Local file handling",
  "PDF report option",
  "Good for fast audits",
  "Easy for clients to understand",
];

const faqs: FAQ[] = [
  {
    q: "Is this tool free?",
    a: "Yes, the tool is free to use. You can open it, upload your Google Search Console export, and check the dashboard. You do not need to create an account. You do not need to book a call. It is made to help people understand GSC data faster.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. The tool is made to work with your exported file in the browser. You do not have to connect your Google account on this landing page. You do not have to share passwords. This makes it useful for client files and business reports.",
  },
  {
    q: "What file formats are supported?",
    a: "The tool is made for Google Search Console export files. In most cases, CSV or spreadsheet exports from GSC work best. For a clean result, export the data directly from Search Console. Do not rename the columns before upload.",
  },
  {
    q: "Can I use it for client reporting?",
    a: "Yes. It is useful for client reporting because it shows important SEO data in a clean format. You can check pages, queries, clicks, impressions, CTR, and position. You can also export a PDF report. This saves time before meetings and monthly reviews.",
  },
  {
    q: "Do I need SEO knowledge?",
    a: "No advanced SEO knowledge is needed. The dashboard is easier to read than a raw spreadsheet. You can see which pages are doing well and which pages need work. Beginners can use it to learn. Experts can use it to save time.",
  },
];

function CTAButton({ children = "Upload File & Open Tool", className = "" }: CTAButtonProps) {
  return (
    <a
      href={TOOL_URL}
      className={`group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] px-7 py-4 text-base font-bold text-[#080c14] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[#c9a84c]/35 sm:px-9 ${className}`}
    >
      {children}
      <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9a84c]/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a84c]/10 ring-1 ring-[#c9a84c]/20">
          <Icon size={23} className="text-[#c9a84c]" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
        <p className="text-sm leading-6 text-white/60">{text}</p>
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
      "Free Google Search Console Reporting Tool by Pranjal Digital. Upload your GSC export and get simple SEO insights, top pages, queries, CTR checks, and PDF reports."
    );
  }, []);

  return (
    <main className="overflow-hidden bg-[#080c14] text-white">
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-4 py-12 sm:min-h-[78vh] md:py-16">
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
              <span className="text-xs font-semibold text-[#c9a84c] sm:text-sm">Free tool for GSC reports</span>
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
              GSC data is useful, but the export can feel messy. This tool turns that file into a
              clear dashboard. You can see your top pages, top queries, CTR problems, and simple SEO
              actions without spending time in spreadsheets.
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
                No login. Simple report. Fast result.
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
                  <p className="text-xs text-white/40">Quick view</p>
                  <p className="font-bold text-white">What you can find</p>
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
            ["Safe workflow", Lock],
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

      <section className="bg-gradient-to-b from-[#080c14] to-[#0a0f1c] px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <SectionBadge icon={Play}>Video Overview</SectionBadge>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Watch The Simple
              <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Tool Walkthrough</span>
            </h2>
            <p className="mb-5 text-base leading-8 text-white/62">
              This short video helps you understand what the tool does. You will see how a normal
              GSC export becomes a dashboard. You will also see how the report helps you find pages,
              queries, clicks, impressions, and CTR issues faster.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <Upload className="mb-3 text-[#c9a84c]" size={22} />
                <h3 className="mb-1 font-bold text-white">Upload in tool</h3>
                <p className="text-sm leading-6 text-white/55">This landing page only opens the tool. File upload happens there.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <Download className="mb-3 text-[#c9a84c]" size={22} />
                <h3 className="mb-1 font-bold text-white">Export report</h3>
                <p className="text-sm leading-6 text-white/55">Use the PDF option when you need a clean report for sharing.</p>
              </div>
            </div>
          </motion.div>

          {/* === FIXED YOUTUBE EMBED (16:9 aspect ratio) === */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-[#c9a84c]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#040608] p-2 shadow-2xl shadow-black/35">
              {/* Changed from aspect-square to aspect-video (16:9) */}
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/Tbd_q_-dTUk?si=lMiHklXHiy2KVR9a"
                  title="Google Search Console Reporting Tool overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href={TOOL_URL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-3xl border border-[#c9a84c]/25 bg-gradient-to-r from-[#c9a84c]/18 via-[#0a0f1c] to-[#f0d282]/12 p-5 text-center shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-[#c9a84c]/50 md:flex-row md:p-7 md:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#c9a84c] text-[#080c14]">
              <Upload size={26} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white md:text-2xl">Ready after watching?</h3>
              <p className="mt-1 text-sm leading-6 text-white/60">
                Open the tool, upload your GSC export there, and get your dashboard.
              </p>
            </div>
          </div>
          <span className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] px-6 py-3 font-bold text-[#080c14] md:w-auto">
            Upload File & Open Tool
            <ArrowRight size={18} />
          </span>
        </motion.a>
      </section>

      <section className="bg-[#0a0f1c] px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl text-center">
          <SectionBadge icon={Eye}>Dashboard Preview</SectionBadge>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">See The Dashboard Before You Use It</h2>
          <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            This preview shows the kind of report you can expect. The image stays inside a fixed
            frame, so it does not break the page on mobile or desktop.
          </p>
          <DashboardPreview />
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0a0f1c] to-[#040608] px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionBadge icon={Sparkles}>What This Tool Does</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              It Makes GSC Data
              <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Easy To Read</span>
            </h2>
            <div className="space-y-4 text-base leading-8 text-white/62">
              <p>
                Google Search Console gives very useful data. But the export is not always easy to
                understand. It has many rows and columns. It shows pages, queries, clicks,
                impressions, CTR, and position. If you are busy, it can take a lot of time to find
                what matters.
              </p>
              <p>
                This tool makes that work easier. You export the data from GSC and open the tool.
                Then you upload the file inside the tool page. After that, you get a simple
                dashboard. You can see which pages are getting traffic. You can see which search
                queries are bringing people to your website.
              </p>
              <p>
                It also helps you find quick SEO opportunities. For example, a page may get many
                impressions but very few clicks. That usually means the title or meta description
                can be improved. A query may be ranking close to page one. That can be a good topic
                to update or expand.
              </p>
              <p>
                The tool is also helpful for reporting. Freelancers can use it before calls.
                Agencies can use it for quick client checks. Business owners can understand their
                own website better. Bloggers can find posts to update. Trainers can use it to teach
                GSC data in a simple way.
              </p>
              <p>
                The goal is simple. Spend less time cleaning spreadsheets and more time improving
                the website.
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

      <section className="bg-[#040608] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <SectionBadge icon={Clock}>Process Flow</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">How To Use It Step By Step</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              The process is simple. Export your data, open the tool, upload the file, and read the
              report.
            </p>
          </div>

          <div className="relative grid gap-4 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent lg:block" />
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
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
                <p className="mb-4 text-sm leading-7 text-white/60">{step.text}</p>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-medium text-white/55">
                  Result: <span className="text-[#c9a84c]">{step.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
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

      <section className="bg-[#080c14] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <SectionBadge icon={Table2}>Comparison</SectionBadge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Tool vs Claude vs Looker Studio</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              All three can help, but they are not made for the same job. This table keeps the
              difference simple.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0f1c]">
            <div className="min-w-[760px]">
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
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-3 text-2xl font-bold text-white">Tool vs Claude + GSC connector</h3>
              <p className="leading-8 text-white/60">
                Claude is good when you want to ask custom questions. But you need to write good
                prompts. You also need to know what to ask. This tool is better when you want a
                ready report without thinking about prompts. It gives a fixed flow that is easy for
                clients and beginners to understand.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1c] p-6">
              <h3 className="mb-3 text-2xl font-bold text-white">Tool vs Looker Studio</h3>
              <p className="leading-8 text-white/60">
                Looker Studio is strong for long-term dashboards. But it takes time to set up. You
                have to connect data, design charts, and maintain the report. This tool is better
                when you need a quick SEO report from one GSC export.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080c14] to-[#040608] px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <SectionBadge icon={Zap}>Unique</SectionBadge>
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">Why This Tool Is Useful</h2>
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
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">Better Reports In Less Time</h2>
            <p className="leading-8 text-white/62">
              This tool saves time because it removes manual spreadsheet work. It helps you see the
              important numbers faster. It also makes reporting easier because the dashboard is
              simple to explain. Beginners can use it to understand GSC. SEO experts can use it to
              move faster during audits, content reviews, and client updates.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#040608] to-[#080c14] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-9 text-center">
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

      <section className="relative overflow-hidden px-4 py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <SectionBadge icon={Upload}>Open Tool</SectionBadge>
          <h2 className="mb-5 text-3xl font-bold text-white md:text-6xl">
            Open The Tool And
            <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Upload Your GSC File</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/62">
            The upload happens on the tool page. Click the button, upload your export there, and
            get your SEO dashboard.
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
