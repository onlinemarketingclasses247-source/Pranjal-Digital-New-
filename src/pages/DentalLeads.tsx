import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, TrendingUp, Search, Target, MapPin,
  Smartphone, MessageSquare, Calendar, PhoneCall, Shield, DollarSign,
  ChevronRight, Star, Zap, BarChart3, Users, Globe, Award,
  Facebook, Instagram, Layers, Megaphone, Eye, Activity,
  Clock, Rocket, Sparkles, ThumbsUp, Brain, Bot, Gauge,
  Crown, BadgeCheck, Compass, Navigation, Filter, Sliders,
  Scale, HeartHandshake, Coffee, Play, Briefcase, Building2, Cpu, Mail,
  Linkedin, Twitter, Youtube, PenTool, LineChart, PieChart, Settings,
  FileText, Mic, Gem, Medal, Trophy, Flag, Handshake, ClipboardList, 
  CheckSquare, Code, Database, Cloud, Wifi, Bluetooth, Battery, Plug,
  Headphones, Speaker, Music, Radio, Tv, Monitor, Laptop, Tablet,
  Watch, Camera, Video, Image, Layout, Grid, List, Menu, X, Plus, Minus,
  Trash2, Edit2, Copy, Save, Folder, File, Printer, EyeOff, EyeIcon,
  Lock, Unlock, Key, User, UserPlus, UserMinus, UsersIcon, UserCheck,
  UserX, Bell, BellOff, AlertCircle, AlertTriangle, Info, HelpCircle,
  XCircle, CheckCircle as CheckCircleIcon, PlusCircle, MinusCircle,
  Circle, Square, CheckSquare as CheckSquareIcon, XSquare, PlayIcon,
  Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX, MicOff,
  Radio as RadioIcon, Tv as TvIcon, Airplay, Cast, WifiIcon, BluetoothIcon,
  BatteryIcon, BatteryCharging, PlugIcon, ZapIcon, Flame, Snowflake,
  Sun, Moon, CloudRain, CloudSnow, CloudLightning, CloudSun, CloudMoon,
  Wind, Droplet, Thermometer, CompassIcon, NavigationIcon, MapIcon,
  Anchor, Ship, Plane, Car, Train, Bus, Bike, Run, Walk, Navigation2,
  CompassIcon2, MapPinIcon, Locate, Crosshair, TargetIcon, ActivityIcon,
  Pulse, HeartPulse, Stethoscope, Syringe, Pill, Bandage, Ambulance,
  Hospital, Microscope, Dna, Flask, Beaker, Atom, Radioactive, Biohazard,
  Leaf, Tree, Flower, Sprout, AppleIcon, CoffeeIcon, Utensils, Cake, Pizza,
  Burger, Fish, Egg, Milk, Wheat, Carrot, Broccoli, Pepper, Salt, Candy,
  IceCream, Beer, Wine, Glass, Mug, Cup, Tea, Soda, Water, DropletsIcon,
  Waves, ZapIcon2, FlameIcon, SnowflakeIcon, WindIcon, CloudIcon,
  Umbrella, Sunglasses, Hat, Shirt, Shoe, Bag, Wallet, WatchIcon, Glasses,
  Ring, Diamond, GiftIcon, PackageIcon, Box, Cube, Sphere, Cylinder,
  Pyramid, Cone, Hexagon, Pentagon, Octagon, StarIcon, HeartIcon,
  ShieldIcon, AwardIcon, TrophyIcon, MedalIcon, RibbonIcon, FlagIcon,
  CheckIcon, XIcon, PlusIcon, MinusIcon, Divide, Equal, Percent, Hash,
  AtSign, DollarSignIcon, Euro, Pound, Yen, Bitcoin, CreditCard,
  WalletIcon2, Banknote, PiggyBank, Coins, Receipt, FileTextIcon,
  FileCheckIcon, FileXIcon, FilePlusIcon, FileMinusIcon, FolderIcon,
  FolderOpen, FolderPlus, FolderMinus, FolderTree, FolderSearch,
  FileSearchIcon, SearchIcon, FilterIcon, SlidersIcon, BarChartIcon,
  LineChartIcon, PieChartIcon, AreaChart, ScatterChart, BubbleChart,
  Radar, Treemap, Histogram, BoxPlot, Candlestick, GaugeIcon as GaugeIcon2,
  Tachometer, Speedometer, GaugeCircle, ActivityIcon2, HeartMonitor,
  BrainIcon, CpuIcon, HardDrive, Server, DatabaseIcon, CloudIcon2,
  CloudOff, CloudUpload, CloudDownload, CloudRainIcon, CloudSnowIcon,
  CloudLightningIcon, CloudSunIcon, CloudMoonIcon, WindIcon2,
  DropletsIcon2, ThermometerIcon, SunIcon, MoonIcon, StarHalf,
  SparklesIcon, ZapIcon3, FlameIcon2, SnowflakeIcon2, LeafIcon,
  FlowerIcon, SproutIcon, TreeIcon, Mountain, WavesIcon, AnchorIcon,
  ShipIcon, PlaneIcon, CarIcon, TrainIcon, BusIcon, BikeIcon, RunIcon,
  WalkIcon, Navigation2Icon, CompassIcon3, MapPinIcon2, LocateIcon,
  CrosshairIcon, TargetIcon2, ActivityIcon3, PulseIcon, HeartPulseIcon,
  StethoscopeIcon, SyringeIcon, PillIcon, BandageIcon, AmbulanceIcon,
  HospitalIcon, MicroscopeIcon, DnaIcon, FlaskIcon, BeakerIcon, AtomIcon,
  RadioactiveIcon, BiohazardIcon, LeafIcon2, TreeIcon2, FlowerIcon2,
  SproutIcon2, AppleIcon2, CoffeeIcon2, UtensilsIcon, CakeIcon, PizzaIcon,
  BurgerIcon, FishIcon, EggIcon, MilkIcon, WheatIcon, CarrotIcon,
  BroccoliIcon, PepperIcon, SaltIcon, CandyIcon, IceCreamIcon, BeerIcon,
  WineIcon, GlassIcon, MugIcon, CupIcon, TeaIcon, SodaIcon, WaterIcon,
  DropletsIcon3, WavesIcon2, ZapIcon4, FlameIcon3, SnowflakeIcon3,
  WindIcon3, CloudIcon3, UmbrellaIcon, SunglassesIcon, HatIcon, ShirtIcon,
  ShoeIcon, BagIcon, WalletIcon3, WatchIcon2, GlassesIcon, RingIcon,
  DiamondIcon, GiftIcon2, PackageIcon2, BoxIcon, CubeIcon, SphereIcon,
  CylinderIcon, PyramidIcon, ConeIcon, HexagonIcon, PentagonIcon,
  OctagonIcon, StarIcon2, HeartIcon2, ShieldIcon2, AwardIcon2,
  TrophyIcon2, MedalIcon2, RibbonIcon2, FlagIcon2, CheckIcon2, XIcon2,
  PlusIcon2, MinusIcon2, DivideIcon, EqualIcon, PercentIcon, HashIcon,
  AtSignIcon, DollarSignIcon2, EuroIcon, PoundIcon, YenIcon, BitcoinIcon,
  CreditCardIcon, WalletIcon4, BanknoteIcon, PiggyBankIcon, CoinsIcon,
  ReceiptIcon, FileTextIcon2, FileCheckIcon2, FileXIcon2, FilePlusIcon2,
  FileMinusIcon2, FolderIcon2, FolderOpenIcon2, FolderPlusIcon2,
  FolderMinusIcon2, FolderTreeIcon2, FolderSearchIcon2, FileSearchIcon2,
  SearchIcon2, FilterIcon2, SlidersIcon2, BarChartIcon2, LineChartIcon2,
  PieChartIcon2, AreaChartIcon, ScatterChartIcon, BubbleChartIcon,
  RadarIcon, TreemapIcon, HistogramIcon, BoxPlotIcon, CandlestickIcon,
  GaugeIcon3, TachometerIcon, SpeedometerIcon, GaugeCircleIcon,
  ActivityIcon4, HeartMonitorIcon, BrainIcon2, CpuIcon2, HardDriveIcon,
  ServerIcon, DatabaseIcon2, CloudIcon4, CloudOffIcon, CloudUploadIcon,
  CloudDownloadIcon, CloudRainIcon2, CloudSnowIcon2, CloudLightningIcon2,
  CloudSunIcon2, CloudMoonIcon2, WindIcon4, DropletsIcon4, ThermometerIcon2,
  SunIcon2, MoonIcon2, StarHalfIcon, SparklesIcon2, ZapIcon5, FlameIcon4,
  SnowflakeIcon4, LeafIcon3, FlowerIcon3, SproutIcon3, TreeIcon3, MountainIcon,
  WavesIcon3, AnchorIcon2, ShipIcon2, PlaneIcon2, CarIcon2, TrainIcon2,
  BusIcon2, BikeIcon2, RunIcon2, WalkIcon2
} from 'lucide-react';

// Import funnel components (assuming they exist in your components folder)
import FunnelDesktop from '../components/FunnelDesktop';
import FunnelMobile from '../components/FunnelMobile';
import StatsDesktop from '../components/StatsDesktop';
import StatsMobile from '../components/StatsMobile';
import CostCalculator from '../components/CostCalculator';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// ==================== TYPES ====================
interface Campaign {
  name: string;
  type: string;
  cpl: string;
  ctr: string;
  roas: string;
  leads: string;
  impressions: string;
  emoji: string;
}

interface Ranking {
  term: string;
  before: string;
  after: string;
  hot: boolean;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  tag: string | null;
}

// ==================== DATA ====================
const metaCampaigns: Campaign[] = [
  { name: "Summer Smile Makeover", type: "Lead Generation", cpl: "$10.28", ctr: "5.2%", roas: "4.2x", leads: "187", impressions: "245K", emoji: "✨" },
  { name: "Emergency Dentist – Dallas", type: "Calls & Forms", cpl: "$12.45", ctr: "6.8%", roas: "3.8x", leads: "96", impressions: "128K", emoji: "🚨" },
  { name: "Clear Aligners Offer", type: "Booking Campaign", cpl: "$8.97", ctr: "7.1%", roas: "5.1x", leads: "312", impressions: "356K", emoji: "💎" },
];

const rankings: Ranking[] = [
  { term: "dentist Dallas TX", before: "Out of top 20", after: "Top 6–10", hot: true },
  { term: "clear aligners Dallas", before: "Not ranked", after: "Top 8–12", hot: true },
  { term: "veneers Dallas", before: "Not ranked", after: "Top 10–15", hot: false },
  { term: "family dentist Dallas", before: "Out of maps pack", after: "Maps pack visibility", hot: true },
];

const plans: Plan[] = [
  { 
    name: "Essentials", 
    price: 499, 
    description: "Perfect for new practices wanting to dominate local social media.",
    features: [
      "Meta Ads (Facebook + Instagram) – full management",
      "Landing page design & optimization",
      "Creative design (static & carousel ads)",
      "Ad copy & content creation",
      "Monthly performance reporting"
    ],
    tag: null 
  },
  { 
    name: "Growth", 
    price: 999, 
    description: "Ideal for practices ready to scale with multi-channel campaigns.",
    features: [
      "Everything in Essentials",
      "Google Ads (Search + Call Ads) management",
      "Video ad creation (15-30 sec)",
      "Advanced graphics & motion design",
      "A/B testing & creative optimization"
    ],
    tag: "MOST POPULAR" 
  },
  { 
    name: "Dominator", 
    price: 1999, 
    description: "Full‑funnel domination – from awareness to long‑term organic growth.",
    features: [
      "Everything in Growth",
      "SEO + AEO + GEO (full strategy & execution)",
      "Complete website management & CRO",
      "Technical SEO & ongoing design changes",
      "Dedicated account strategist"
    ],
    tag: "BEST VALUE" 
  },
];

// Why Choose Us data
const whyChooseUs = [
  { icon: Shield, title: "Flat $499/month Starting", desc: "Transparent pricing – no hidden fees or surprise bills. All services clearly defined per tier." },
  { icon: Award, title: "12+ Years Dental Focus", desc: "We only work with dental practices. We know patient psychology, seasonality, and compliance." },
  { icon: Users, title: "Proven Results", desc: "Royal Lane Dental grew from 20 to 90+ calls/month and 350% more organic traffic in 2026." },
  { icon: Rocket, title: "First Month Guarantee", desc: "See measurable results in 30 days or we refund 100% of management fees." },
];

// Our Process Steps
const processSteps = [
  { num: "01", title: "Discovery & Audit", desc: "We analyze your current marketing, website, GBP, and competitors to create a custom plan.", icon: Search },
  { num: "02", title: "Strategy & Setup", desc: "We build your ad accounts, design creatives, optimize GBP, and install tracking.", icon: Settings },
  { num: "03", title: "Launch & Monitor", desc: "Campaigns go live. We monitor performance daily, adjust bids, and test new angles.", icon: Activity },
  { num: "04", title: "Scale & Optimize", desc: "We double down on winning channels, add new services, and grow your patient base.", icon: TrendingUp },
];

// US Dental Clients Map Data (10 states)
const dentalClients = [
  { state: "Texas", city: "Dallas", lat: 32.7767, lng: -96.7970, clients: 12, name: "Royal Lane Dental Center" },
  { state: "California", city: "Los Angeles", lat: 34.0522, lng: -118.2437, clients: 8, name: "LA Smile Studio" },
  { state: "New York", city: "Manhattan", lat: 40.7128, lng: -74.0060, clients: 7, name: "Fifth Avenue Dental" },
  { state: "Florida", city: "Miami", lat: 25.7617, lng: -80.1918, clients: 6, name: "Sunshine Dental Group" },
  { state: "Illinois", city: "Chicago", lat: 41.8781, lng: -87.6298, clients: 5, name: "Windy City Dentistry" },
  { state: "Georgia", city: "Atlanta", lat: 33.7490, lng: -84.3880, clients: 4, name: "Peachtree Dental Care" },
  { state: "Washington", city: "Seattle", lat: 47.6062, lng: -122.3321, clients: 4, name: "Emerald City Dental" },
  { state: "Colorado", city: "Denver", lat: 39.7392, lng: -104.9903, clients: 3, name: "Mile High Dentistry" },
  { state: "Arizona", city: "Phoenix", lat: 33.4484, lng: -112.0740, clients: 3, name: "Desert Smiles" },
  { state: "Massachusetts", city: "Boston", lat: 42.3601, lng: -71.0589, clients: 4, name: "Boston Family Dental" },
];

// ==================== HOOKS & COMPONENTS ====================
function useCountUp(end: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, trigger]);
  return count;
}

const Particles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(201,168,76,${Math.random() * 0.4 + 0.1})`,
        }}
        animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, delay: Math.random() * 4 }}
      />
    ))}
  </div>
);

const Orb: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className = "" }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
    transition={{ duration: 10, repeat: Infinity }}
    className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
    style={style}
  />
);

// US Map Component (SVG based with dots)
const USMap: React.FC = () => {
  const [hoveredClient, setHoveredClient] = useState<typeof dentalClients[0] | null>(null);
  return (
    <div className="relative bg-[#0a0f1c] rounded-2xl border border-white/10 p-6 overflow-hidden">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <MapPin size={18} className="text-[#c9a84c]" />
        Our Dental Clients Across the USA
      </h3>
      <div className="relative w-full aspect-[1.4/1] bg-[url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 959 593\"%3E%3Cpath fill=\"%231a202c\" stroke=\"%23374a5e\" stroke-width=\"1.5\" d=\"M...\" /%3E%3C/svg%3E')] bg-contain bg-center bg-no-repeat">
        {/* Simplified SVG map background – replace with actual US map outline if available */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states%29.svg)' }} />
        {dentalClients.map((client, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.05, type: "spring" }}
            className="absolute w-4 h-4 cursor-pointer group"
            style={{
              left: `${(client.lng + 125) * 1.2}%`,
              top: `${(50 - client.lat / 2.5)}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredClient(client)}
            onMouseLeave={() => setHoveredClient(null)}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-[#c9a84c] rounded-full animate-pulse shadow-lg shadow-[#c9a84c]/50" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {client.name} ({client.clients}+ practices)
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {hoveredClient && (
        <div className="mt-4 text-center text-white/70 text-xs">
          {hoveredClient.state}: {hoveredClient.name} – {hoveredClient.clients}+ locations
        </div>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {dentalClients.map(c => (
          <span key={c.state} className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-white/60">{c.state}</span>
        ))}
      </div>
    </div>
  );
};

// Campaign Card Component (same as before)
const CampaignCard: React.FC<{ campaign: Campaign; idx: number }> = ({ campaign, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.12, duration: 0.6 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative bg-gradient-to-br from-[#0d1422] to-[#060a10] border border-white/10 rounded-2xl overflow-hidden group"
    style={{ boxShadow: '0 0 40px rgba(201,168,76,0.05)' }}
  >
    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-white/30 text-xs font-mono">Meta Ads Manager · Campaign Results</span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl mb-1">{campaign.emoji}</div>
          <h3 className="text-white font-bold text-lg leading-tight">{campaign.name}</h3>
          <span className="text-xs text-white/40 font-mono">{campaign.type}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Active</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Cost Per Lead", value: campaign.cpl, highlight: true },
          { label: "CTR", value: campaign.ctr, highlight: false },
          { label: "ROAS", value: campaign.roas, highlight: false },
          { label: "Total Leads", value: campaign.leads, highlight: false },
        ].map((m, i) => (
          <div key={i} className={`p-3 rounded-xl border ${m.highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30' : 'bg-white/[0.03] border-white/8'}`}>
            <div className="text-white/40 text-[10px] uppercase mb-1">{m.label}</div>
            <div className={`font-bold text-xl ${m.highlight ? 'text-[#c9a84c]' : 'text-white'}`}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 pt-4">
        <div className="text-white/30 text-[10px] uppercase mb-2 flex items-center gap-1">
          <Activity size={10} /> Impressions: {campaign.impressions}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 65, 45, 80, 70, 90, 75, 100, 85, 95, 88, 92].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className="flex-1 rounded-sm"
              style={{ background: `rgba(201,168,76,${0.2 + (h / 100) * 0.6})` }}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full">
          <Facebook size={10} className="text-[#1877F2]" />
          <span className="text-[#1877F2] text-[10px] font-medium">Facebook</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E4405F]/10 border border-[#E4405F]/20 rounded-full">
          <Instagram size={10} className="text-[#E4405F]" />
          <span className="text-[#E4405F] text-[10px] font-medium">Instagram</span>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.06)' }} />
  </motion.div>
);

// ==================== MAIN PAGE ====================
export default function DentalLeadsPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const organic = useCountUp(1900, 2200, statsInView);
  const calls = useCountUp(90, 2000, statsInView);
  const forms = useCountUp(35, 2000, statsInView);
  const traffic = useCountUp(350, 2000, statsInView);

  useEffect(() => {
    document.title = 'Dental Leads | Plans from $499/mo | Meta, Google, SEO';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Get more dental patients with flat‑fee marketing: Meta Ads, Google Ads, SEO, GBP optimization. Results guaranteed.';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="bg-[#070b12] text-white font-sans overflow-x-hidden">
      <Particles />
      <Orb style={{ width: 800, height: 800, top: '-20%', left: '-20%', background: 'rgba(201,168,76,0.1)' }} />
      <Orb style={{ width: 1000, height: 1000, bottom: '-30%', right: '-30%', background: 'rgba(201,168,76,0.08)' }} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-24 pb-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/10 to-[#c9a84c]/5">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-semibold">🦷 Dental Marketing That Works</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="text-white">Get More Dental Patients</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent bg-[length:200%] animate-gradient-x">
              Plans from $499/month
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/60 text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Meta Ads • Google Ads • SEO/AEO/GEO • GBP • Website CRO
            <br />
            <span className="text-[#c9a84c] font-semibold">Flat‑fee, no surprises. Results in first month or 100% money back.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
              <Calendar size={20} /> Book Free Strategy Call <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                <MessageSquare size={20} /> Contact for Leads
              </a>
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            {[
              { icon: Shield, label: "Money Back Guarantee" },
              { icon: Users, label: "400+ Clients Served" },
              { icon: Award, label: "12+ Years Experience" },
              { icon: Star, label: "4.9/5 Client Rating" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <b.icon size={14} className="text-[#c9a84c]" />
                <span className="text-white/60 text-xs">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Money Back Guarantee Badge (early) */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 mb-12">
        <div className="bg-gradient-to-r from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-[#c9a84c]" />
            <div>
              <h3 className="text-white font-bold">100% Money‑Back Guarantee</h3>
              <p className="text-white/60 text-sm">No results in first month? We refund 100% of your management fees.</p>
            </div>
          </div>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-[#c9a84c] text-[#070b12] font-semibold text-sm hover:bg-[#f0d282] transition">
            Claim Your Guarantee →
          </a>
        </div>
      </div>

      {/* ========== META ADS CAMPAIGNS ========== */}
      <section className="py-16 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Megaphone size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">REAL META ADS RESULTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Real Campaigns. <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Real Dental Leads.</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {metaCampaigns.map((c, i) => <CampaignCard key={c.name} campaign={c} idx={i} />)}
          </div>
          {/* CTA after campaigns */}
          <div className="text-center mt-10">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Get Campaigns Like These → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== CASE STUDY: ROYAL LANE DENTAL (Updated to 2026) ========== */}
      <section className="py-16 bg-[#060a10] relative">
        <Orb style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.04)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Award size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">VERIFIED CASE STUDY 2026</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">How We Transformed <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Royal Lane Dental</span></h2>
            <p className="text-white/50 text-lg">Dallas, TX · 12 months of SEO + GBP + Ads (2025–2026)</p>
          </motion.div>
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { emoji: '📈', value: organic, suffix: '+', label: 'Organic Sessions/Mo', change: '↑ 352% from 420', color: '#4ade80' },
              { emoji: '📞', value: calls, suffix: '+', label: 'GBP Calls/Month', change: '↑ 350% from 20', color: '#60a5fa' },
              { emoji: '📝', value: forms, suffix: '+', label: 'Form Submissions/Mo', change: '↑ 540% from 5', color: '#f472b6' },
              { emoji: '📊', value: traffic, suffix: '%', label: 'Organic Traffic Growth', change: 'Full year 2026', color: '#c9a84c' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}{s.suffix}</div>
                <div className="text-white/70 text-sm mt-2">{s.label}</div>
                <div className="text-white/40 text-xs mt-1">{s.change}</div>
              </motion.div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Search size={18} className="text-[#c9a84c]" /> Google Maps Rankings</h3>
              {rankings.map(r => (
                <div key={r.term} className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/80">{r.term}</span>
                  <span className="text-green-400 font-semibold">{r.after}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><PhoneCall size={18} className="text-[#c9a84c]" /> Lead Volume Growth</h3>
              {[
                { label: 'GBP Calls', before: 20, after: 90 },
                { label: 'Website Forms', before: 5, after: 35 },
                { label: 'Chat / SMS', before: 0, after: 15 },
              ].map(item => (
                <div key={item.label} className="mb-3">
                  <div className="flex justify-between text-sm"><span>{item.label}</span><span><span className="line-through text-white/40">{item.before}</span> → <span className="text-green-400">{item.after}</span></span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282]" style={{ width: `${(item.after / 100) * 100}%` }} /></div>
                </div>
              ))}
              <div className="mt-4 p-2 bg-[#c9a84c]/10 rounded-xl text-center text-[#c9a84c] text-sm">📊 25 → 140+ monthly inquiries</div>
            </div>
          </div>
          <div className="text-center">
            <a href="https://www.royallanedental.com/" target="_blank" className="text-white/40 hover:text-[#c9a84c] text-sm inline-flex items-center gap-1">View Case Study <ChevronRight size={14} /></a>
          </div>
          {/* CTA after case study */}
          <div className="text-center mt-8">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition">
              Get Same Results for Your Practice → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== FUNNEL SECTION (TOFU/MOFU/BOFU) ========== */}
      <FunnelDesktop />
      <FunnelMobile />

      {/* ========== PRICING PLANS (3 Tiers) ========== */}
      <section className="py-16 bg-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <DollarSign size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">SIMPLE PRICING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Choose Your <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Growth Plan</span></h2>
            <p className="text-white/50 text-lg">Flat monthly fee – no hidden costs. Cancel anytime.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }}
                className={`relative rounded-2xl p-6 transition-all ${plan.tag ? 'bg-gradient-to-br from-[#0f1927] to-[#0a0f1a] border border-[#c9a84c]/40 shadow-xl' : 'bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10'}`}>
                {plan.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] text-xs font-extrabold px-3 py-1 rounded-full">{plan.tag}</div>}
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2"><span className="text-[#c9a84c] font-extrabold text-4xl">${plan.price}</span><span className="text-white/40 text-sm">/month</span></div>
                <p className="text-white/50 text-sm mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => <li key={f} className="flex items-start gap-2 text-white/70 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />{f}</li>)}
                </ul>
                <a href={CALENDLY} target="_blank" className="block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] hover:scale-105 transition">Get Started →</a>
              </motion.div>
            ))}
          </div>
          {/* CTA after pricing */}
          <div className="text-center">
            <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Need a Custom Plan? Talk to Us → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US + US MAP ========== */}
      <section className="py-16 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                <BadgeCheck size={14} className="text-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs font-bold">WHY DENTISTS CHOOSE US</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Why Choose <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Pranjal Digital</span></h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, idx) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0"><item.icon size={18} className="text-[#c9a84c]" /></div>
                    <div><h3 className="text-white font-bold">{item.title}</h3><p className="text-white/60 text-sm">{item.desc}</p></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <USMap />
          </div>
          {/* CTA after Why Choose Us */}
          <div className="text-center mt-12">
            <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition">
              Grow Your Dental Business Revenue → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== OUR PROCESS (Animated) ========== */}
      <section className="py-16 bg-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Rocket size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">OUR PROVEN PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">From Zero to <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Full Chair</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }}
                className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center group">
                <div className="absolute -top-3 left-6 text-[#c9a84c] font-mono text-4xl font-black opacity-20">{step.num}</div>
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition"><step.icon size={24} className="text-[#c9a84c]" /></div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Start Your Process Today → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== US VS OTHER DENTAL AGENCIES ========== */}
      <section className="py-16 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Scale size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">COMPARISON</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Pranjal Digital vs <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Other Dental Agencies</span></h2>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0f1a]">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr><th className="p-4 text-left text-white/60">Feature</th><th className="p-4 text-left text-[#c9a84c] font-bold">Pranjal Digital</th><th className="p-4 text-left text-white/60">Others</th></tr>
              </thead>
              <tbody>
                {[
                  { feature: "Monthly Fee", us: "$499–$1999 all-inclusive", them: "$2,000–$10,000+ à la carte" },
                  { feature: "Dental Specialization", us: "12+ years exclusively dental", them: "Generalist / one-size-fits-all" },
                  { feature: "Meta + Google + GBP + SEO", us: "✓ All included", them: "Separate fees for each channel" },
                  { feature: "Creative & Content", us: "In-house designers & copywriters", them: "Outsourced / extra cost" },
                  { feature: "Reporting & Transparency", us: "Live dashboards + monthly deep-dive", them: "Fancy PDFs with no insights" },
                  { feature: "Money-Back Guarantee", us: "First month results or refund", them: "6–12 month lock-in contracts" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-4 text-white/80">{row.feature}</td><td className="p-4 text-[#c9a84c] font-semibold">{row.us}</td><td className="p-4 text-white/50">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition">
              Switch to a Smarter Agency → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== COST CALCULATOR (Optional) ========== */}
      <CostCalculator />

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-20 overflow-hidden">
        <Orb style={{ width: 900, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.1)' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <TrendingUp size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">READY TO GROW?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-5">Stop Wasting Money on <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Ineffective Marketing</span></h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">Let's build a predictable patient acquisition system – starting at $499/month.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={CALENDLY} target="_blank" className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
                <Calendar size={20} /> Book Free Consultation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/contact"><a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">Get Dental Leads Now</a></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
