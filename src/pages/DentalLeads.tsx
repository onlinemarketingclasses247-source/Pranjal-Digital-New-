import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Play,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  BarChart3,
  Search,
  Target,
  Share2,
  Building2,
  Cpu,
  Mail,
  Star,
  Zap,
  Shield,
  Clock,
  PhoneCall,
  X,
  Check,
  Award,
  Briefcase,
  Sparkles,
  Heart,
  Coffee,
  Smile,
  ThumbsUp,
  Rocket as RocketIcon,
  Layers,
  Palette,
  Grid,
  Circle,
  Triangle,
  Hexagon,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  PenTool,
  Megaphone,
  LineChart,
  PieChart,
  Settings,
  Map,
  Navigation,
  Compass,
  Activity,
  Eye,
  FileText,
  Mic,
  Bot,
  Brain,
  Zap as ZapIcon,
  TrendingUp as TrendingIcon,
  Award as AwardIcon,
  MapPin,
  Navigation2,
  Compass as CompassIcon,
  Package,
  Scale,
  Gamepad,
  Car,
  LucideIcon,
  Smartphone,
  MessageSquare,
  Calendar,
  ClipboardList,
  Image,
  Video,
  BarChart,
  ChartNoAxesCombined
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Custom hook for counting animation
function useCountUp(end: number, duration = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
}

// Meta Ads Campaign Examples
const metaCampaigns = [
  {
    name: "Summer Smile Makeover",
    platform: "Meta (FB + IG)",
    objective: "Lead Generation",
    cpl: "$10.28",
    ctr: "5.2%",
    roas: "4.2x",
    impressions: "245K",
    leads: "187",
    image: "🦷✨"
  },
  {
    name: "Emergency Dentist - Dallas",
    platform: "Meta (FB + IG)",
    objective: "Calls & Forms",
    cpl: "$12.45",
    ctr: "6.8%",
    roas: "3.8x",
    impressions: "128K",
    leads: "96",
    image: "🚨🦷"
  },
  {
    name: "Clear Aligners Offer",
    platform: "Meta (FB + IG + Reels)",
    objective: "Booking",
    cpl: "$8.97",
    ctr: "7.1%",
    roas: "5.1x",
    impressions: "356K",
    leads: "312",
    image: "✨🦷"
  }
];

// Services offered
const dentalServices = [
  {
    icon: Megaphone,
    name: "Meta Ads",
    desc: "Targeted Facebook & Instagram campaigns that generate $10-15 leads for dental clinics.",
    stats: ["$10-15 CPL", "5-7% CTR", "3-5x ROAS"],
    proof: "Generated 312 leads in 30 days for a Dallas clinic at $8.97/lead."
  },
  {
    icon: Target,
    name: "Google Ads",
    desc: "High-intent search campaigns for 'dentist near me', 'emergency dentist', 'implants'.",
    stats: ["$12-18 CPL", "Top 3 positions", "4x+ ROAS"],
    proof: "Reduced cost per booking by 52% for a dental chain using local extensions & call ads."
  },
  {
    icon: MapPin,
    name: "Google Business Profile",
    desc: "Complete GBP optimization that drives 90+ calls/month and map pack dominance.",
    stats: ["90+ calls/mo", "Top 6-10 rankings", "350% more actions"],
    proof: "Royal Lane Dental went from 15-25 calls to 90+ calls/month after GBP overhaul."
  },
  {
    icon: Search,
    name: "SEO + AEO + GEO",
    desc: "Rank on Google, ChatGPT, Perplexity, and voice search for dental queries.",
    stats: ["350% traffic↑", "Top 10 keywords", "Featured snippets"],
    proof: "Increased organic traffic from 420 to 1,900+ sessions/month for Royal Lane Dental."
  },
  {
    icon: Smartphone,
    name: "Website Optimization",
    desc: "Mobile-first design, local schema, speed optimization, and CRO to convert visitors.",
    stats: ["75% mobile traffic", "55+ inquiries/mo", "28-35 forms/mo"],
    proof: "Added chat & SMS — generated 10-20 extra inquiries/month instantly."
  }
];

// Dental clinic stats from case study
const clinicStats = {
  organicTraffic: { before: 420, after: 1900, change: 352 },
  gbpCalls: { before: 20, after: 90, change: 350 },
  formSubmissions: { before: 5, after: 32, change: 540 },
  chatInquiries: { before: 0, after: 15, change: '∞' },
  rankings: {
    "dentist Dallas TX": { before: "Out of top 20", after: "Top 6-10" },
    "clear aligners Dallas": { before: "Not ranked", after: "Top 8-12" },
    "veneers Dallas": { before: "Not ranked", after: "Top 10-15" },
    "family dentist Dallas": { before: "Out of maps pack", after: "Maps pack visibility" }
  }
};

// Pricing plans
const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    features: ["SEO + GBP optimization", "Weekly posts & updates", "Review management", "Monthly reporting"],
    ads: "Ad spend not included"
  },
  {
    name: "Growth",
    price: "$999",
    features: ["Everything in Starter", "Google Ads management", "Meta Ads management", "Landing page optimization", "Chat/SMS setup"],
    ads: "Ad spend not included",
    popular: true
  },
  {
    name: "Premium",
    price: "$1,999",
    features: ["Everything in Growth", "AEO + GEO strategy", "Video ads creation", "Full funnel automation", "Dedicated strategist"],
    ads: "Ad spend not included"
  }
];

export default function DentalLeadsPage() {
  useEffect(() => {
    document.title = "Dental Clinic Leads | $10/Lead* | SEO, Google Ads, Meta Ads";
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = "Get dental patients at $10/lead* with our proven system: Meta Ads, Google Ads, GBP optimization, SEO/AEO/GEO. Results in first month or 100% money back.";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1]);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  const animatedOrganic = useCountUp(clinicStats.organicTraffic.after, 2000, statsInView);
  const animatedCalls = useCountUp(clinicStats.gbpCalls.after, 2000, statsInView);
  const animatedForms = useCountUp(clinicStats.formSubmissions.after, 2000, statsInView);

  return (
    <div className="bg-[#080c14] overflow-hidden">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a0f1c] to-[#080c14]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c9a84c]/10 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/10 blur-[120px]"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/30 rounded-full px-5 py-2 mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]"
            />
            <span className="text-[#c9a84c] text-sm font-medium">🦷 Dental Clinic Leads System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] mb-6"
          >
            <span className="text-white">Get Dental Patients at</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent">
              As Low As $10/Lead*
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Meta Ads • Google Ads • GBP Optimization • SEO/AEO/GEO • Website Management
            <br />
            <span className="text-[#c9a84c]">Results in first month or 100% money back.</span> Service fees from <span className="font-bold text-white">$499/month</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
          >
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto text-base"
            >
              <Calendar size={18} />
              Book a Meeting
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] w-full sm:w-auto text-base">
                <MessageSquare size={18} />
                Contact for Leads
              </a>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/40 text-sm mt-8"
          >
            *$10/lead based on location, targeting, and competition. Actual costs may vary.
          </motion.p>
        </div>
      </section>

      {/* ========== META ADS RESULTS SECTION (TOP) ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a0f1c] to-[#080c14]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Megaphone size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">META ADS THAT WORK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Real Campaigns. <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Real Dental Leads.</span>
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              We've run hundreds of Meta campaigns for dental clinics. Here's what actually drives $10-15 leads.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {metaCampaigns.map((campaign, idx) => (
              <motion.div
                key={campaign.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{campaign.image}</div>
                <h3 className="text-xl font-bold text-white mb-1">{campaign.name}</h3>
                <p className="text-white/50 text-sm mb-4">{campaign.platform}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[#c9a84c] font-bold text-lg">{campaign.cpl}</div>
                    <div className="text-white/40 text-xs">Cost/Lead</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[#c9a84c] font-bold text-lg">{campaign.ctr}</div>
                    <div className="text-white/40 text-xs">CTR</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[#c9a84c] font-bold text-lg">{campaign.roas}</div>
                    <div className="text-white/40 text-xs">ROAS</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[#c9a84c] font-bold text-lg">{campaign.leads}</div>
                    <div className="text-white/40 text-xs">Leads</div>
                  </div>
                </div>
                <div className="text-white/50 text-xs text-center border-t border-white/10 pt-3">
                  {campaign.impressions} impressions
                </div>
              </motion.div>
            ))}
          </div>

          {/* Meta Ads screenshot simulation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 bg-[#0a0f1c]/60 border border-white/10 rounded-2xl p-4 md:p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1877F2]/20 flex items-center justify-center">
                <Facebook size={16} className="text-[#1877F2]" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#E4405F]/20 flex items-center justify-center">
                <Instagram size={16} className="text-[#E4405F]" />
              </div>
              <span className="text-white/60 text-sm">Meta Ads Manager Dashboard</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Spend", value: "$8,247", change: "+12%" },
                { label: "Leads Generated", value: "642", change: "+34%" },
                { label: "Avg. CPL", value: "$12.84", change: "-18%" },
                { label: "ROAS", value: "4.2x", change: "+0.8x" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-white/50 text-xs">{stat.label}</div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-[#c9a84c] text-xs">{stat.change}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-20 bg-gradient-to-r from-[#c9a84c]/20 to-transparent rounded-lg flex items-center justify-center">
              <span className="text-white/40 text-xs">📊 Performance chart: 4.2x ROAS on dental campaigns</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CLIENT CASE STUDY: ROYAL LANE DENTAL ========== */}
      <section className="py-16 md:py-24 bg-[#040608] relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23c9a84c" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <AwardIcon size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">CASE STUDY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How We Grew <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Royal Lane Dental</span>
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Dallas, TX • General & Cosmetic Dentistry • 12 months of consistent SEO + GBP optimization
            </p>
          </motion.div>

          {/* Key Stats Cards */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-2">📈</div>
              <div className="text-3xl md:text-4xl font-bold text-[#c9a84c]">{animatedOrganic}+</div>
              <div className="text-white/70 text-sm">Organic Sessions/Month</div>
              <div className="text-white/40 text-xs mt-1">↑ 352% from 420</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-2">📞</div>
              <div className="text-3xl md:text-4xl font-bold text-[#c9a84c]">{animatedCalls}+</div>
              <div className="text-white/70 text-sm">GBP Calls/Month</div>
              <div className="text-white/40 text-xs mt-1">↑ 350% from 20</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="text-3xl md:text-4xl font-bold text-[#c9a84c]">{animatedForms}+</div>
              <div className="text-white/70 text-sm">Form Submissions/Month</div>
              <div className="text-white/40 text-xs mt-1">↑ 540% from 5</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="text-3xl md:text-4xl font-bold text-[#c9a84c]">15+</div>
              <div className="text-white/70 text-sm">Chat/SMS Inquiries/Month</div>
              <div className="text-white/40 text-xs mt-1">From zero</div>
            </motion.div>
          </div>

          {/* Rankings Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0f1c]/60 border border-white/10 rounded-2xl overflow-hidden mb-8"
          >
            <div className="p-5 border-b border-white/10">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Search size={18} className="text-[#c9a84c]" />
                Google Maps & Search Rankings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/60 font-medium">Search Term</th>
                    <th className="text-left p-4 text-white/60 font-medium">Before</th>
                    <th className="text-left p-4 text-white/60 font-medium">After</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(clinicStats.rankings).map(([term, data]) => (
                    <tr key={term} className="border-t border-white/10">
                      <td className="p-4 text-white font-medium">{term}</td>
                      <td className="p-4 text-white/40">{data.before}</td>
                      <td className="p-4 text-[#c9a84c] font-medium">{data.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Before vs After Leads Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0f1c]/60 border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-white/10">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <PhoneCall size={18} className="text-[#c9a84c}" />
                Lead Volume Transformation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-5 text-center">
                <div className="text-white/50 text-sm mb-1">GBP Calls</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white/40 line-through">~20</span>
                  <ArrowRight size={16} className="text-[#c9a84c]" />
                  <span className="text-2xl font-bold text-[#c9a84c]">90+</span>
                </div>
              </div>
              <div className="p-5 text-center">
                <div className="text-white/50 text-sm mb-1">Website Forms</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white/40 line-through">~5</span>
                  <ArrowRight size={16} className="text-[#c9a84c]" />
                  <span className="text-2xl font-bold text-[#c9a84c]">28-35</span>
                </div>
              </div>
              <div className="p-5 text-center">
                <div className="text-white/50 text-sm mb-1">Chat/SMS</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white/40 line-through">0</span>
                  <ArrowRight size={16} className="text-[#c9a84c]" />
                  <span className="text-2xl font-bold text-[#c9a84c]">10-20</span>
                </div>
              </div>
            </div>
            <div className="bg-[#c9a84c]/5 p-4 text-center border-t border-white/10">
              <p className="text-[#c9a84c] text-sm font-medium">📊 Total monthly inquiries: 128+ (up from ~25)</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href="https://www.royallanedental.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#c9a84c] text-sm transition-colors"
            >
              View Royal Lane Dental Website →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== OUR DENTAL MARKETING SYSTEM ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#080c14] to-[#040608]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Layers size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">COMPLETE SYSTEM</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Fill Your Chair</span>
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Five channels working together. One dashboard. One point of contact. Proven results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalServices.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
                  <service.icon size={22} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.stats.map((stat, i) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1 text-white/50">{stat}</span>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3 mt-2">
                  <p className="text-[#c9a84c] text-xs font-medium">📌 PROOF: {service.proof}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING & GUARANTEE ========== */}
      <section className="py-16 md:py-24 bg-[#040608] relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <DollarSign size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">SIMPLE PRICING</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Service Fees From <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">$499/month</span>
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              No hidden fees. No long-term contracts. Results in first month or 100% money back on management fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-gradient-to-br from-[#0a0f1c] to-[#040608] border rounded-2xl p-6 transition-all duration-300 ${
                  plan.popular ? 'border-[#c9a84c]/60 shadow-lg shadow-[#c9a84c]/10' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#c9a84c] mb-2">{plan.price}</div>
                <div className="text-white/40 text-xs mb-4">{plan.ads}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                      <CheckCircle2 size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white/5 border border-white/10 rounded-xl py-3 text-white font-medium hover:bg-[#c9a84c] hover:text-[#080c14] hover:border-[#c9a84c] transition-all duration-300"
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-2xl p-6 text-center max-w-2xl mx-auto"
          >
            <Shield size={32} className="text-[#c9a84c] mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">100% Money Back Guarantee</h3>
            <p className="text-white/70 text-sm">
              If you don't see measurable results in the first month (increased calls, form fills, or leads), 
              we'll refund 100% of your management fees. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-6">
              <RocketIcon size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">READY FOR MORE PATIENTS?</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
              Stop Wasting Money on<br />
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                Ads That Don't Work
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Let's build a lead generation system that consistently fills your schedule with quality patients.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto text-base"
              >
                <Calendar size={18} />
                Book Free Consultation
                <ArrowRight size={16} />
              </a>
              <Link href="/contact">
                <a className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] w-full sm:w-auto text-base">
                  <MessageSquare size={18} />
                  Ask About Leads
                </a>
              </Link>
            </div>
            <p className="text-white/30 text-xs mt-6">
              🦷 Specialized in dental marketing • 12+ years experience • 400+ clients worldwide
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
