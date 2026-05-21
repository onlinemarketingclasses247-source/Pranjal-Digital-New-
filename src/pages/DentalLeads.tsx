import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, TrendingUp, Search, Target, MapPin,
  Smartphone, MessageSquare, Calendar, PhoneCall, Shield, DollarSign,
  ChevronRight, Star, Zap, BarChart3, Users, Globe, Award,
  Facebook, Instagram, Layers, Megaphone, Eye, Activity,
  Clock, Rocket, Sparkles, Quote, Mail, Phone, Gift, ThumbsUp,
  PieChart, LineChart, Building2, Camera, Video, FileText, ClipboardCheck,
  Headphones, Wifi, Cpu, Database, Cloud, Code, Palette, Figma,
  Chrome, Apple, PlayCircle, Music, Coffee, Heart, Smile, Brain, Bot,
  Gauge, Timer, Gem, Crown, BadgeCheck, Verified, Ticket, Compass,
  Navigation, Map as MapIcon, Filter, Sliders, ToggleLeft, ToggleRight,
  Volume2, Mic, VideoIcon, Image, Layout, Grid, List, Menu, X,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Type,
  Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RotateCcw, RefreshCw,
  Download, Upload, Share2, Link as LinkIcon, ExternalLink, MoreHorizontal,
  MoreVertical, Plus, Minus, Trash2, Edit2, Copy, Cut, Paste, Save,
  Folder, File, Archive, Printer, EyeOff, EyeIcon, Lock, Unlock, Key,
  User, UserPlus, UserMinus, UsersIcon, UserCheck, UserX, Settings as SettingsIcon,
  Sliders as SlidersIcon, ToggleLeft as ToggleLeftIcon, ToggleRight as ToggleRightIcon,
  Power, LogOut, LogIn, Bell, BellOff, AlertCircle, AlertTriangle, Info,
  HelpCircle, XCircle, CheckCircle, PlusCircle, MinusCircle, Circle as CircleIcon,
  Square, CheckSquare, XSquare, PlayIcon, Pause, SkipBack, SkipForward,
  Volume1, Volume2Icon, VolumeX, MicOff, Radio, Tv, Monitor, Laptop,
  Tablet, SmartphoneIcon, Watch, CameraIcon, VideoIcon2, HeadphonesIcon,
  Speaker, MusicIcon, MicIcon, RadioIcon, TvIcon, Airplay, Cast, WifiIcon,
  Bluetooth, Battery, BatteryCharging, Plug, ZapIcon, Flame, Snowflake,
  Sun, Moon, CloudRain, CloudSnow, CloudLightning, CloudSun, CloudMoon,
  Wind, Droplet, Thermometer, CompassIcon, NavigationIcon, MapIcon2,
  Anchor, Ship, Plane, CarIcon, Train, Bus, Bike, Run, Walk, Navigation2,
  CompassIcon2, MapPinIcon, Locate, Crosshair, TargetIcon, ActivityIcon,
  Pulse, HeartPulse, Stethoscope, Syringe, Pill, Bandage, Ambulance, Hospital,
  Microscope, Dna, Flask, Beaker, Atom, Radioactive, Biohazard, Leaf, Tree,
  Flower, Sprout, AppleIcon, CoffeeIcon, Utensils, Cake, Pizza, Burger, Fish,
  Egg, Milk, Wheat, Carrot, Broccoli, Pepper, Salt, Candy, IceCream, Beer,
  Wine, Glass, Mug, Cup, Tea, Soda, Water, Droplets, Waves, ZapIcon2,
  FlameIcon, SnowflakeIcon, WindIcon, CloudIcon, Umbrella, Sunglasses,
  Hat, Shirt, Shoe, Bag, Wallet, WatchIcon, Glasses, Ring, Diamond,
  GiftIcon, PackageIcon, Box, Cube, Sphere, Cylinder, Pyramid, Cone,
  Hexagon, Pentagon, Octagon, StarIcon, HeartIcon, ShieldIcon, AwardIcon,
  Trophy, Medal, Ribbon, Flag, Check, XIcon, PlusIcon, MinusIcon, Divide,
  Equal, Percent, Hash, AtSign, DollarSignIcon, Euro, Pound, Yen, Bitcoin,
  CreditCard, WalletIcon2, Banknote, PiggyBank, Coins, Receipt, ReceiptText,
  FileTextIcon, FileCheck, FileX, FilePlus, FileMinus, FolderIcon, FolderOpen,
  FolderPlus, FolderMinus, FolderTree, FolderSearch, FileSearch, SearchIcon,
  FilterIcon, SlidersIcon2, BarChartIcon, LineChartIcon, PieChartIcon,
  AreaChart, ScatterChart, BubbleChart, Radar, Treemap, Histogram, BoxPlot,
  Candlestick, GaugeIcon, Tachometer, Speedometer, GaugeCircle, ActivityIcon2,
  HeartMonitor, BrainIcon, CpuIcon, HardDrive, Server, DatabaseIcon, CloudIcon2,
  CloudOff, CloudUpload, CloudDownload, CloudRainIcon, CloudSnowIcon,
  CloudLightningIcon, CloudSunIcon, CloudMoonIcon, WindIcon2, DropletsIcon,
  ThermometerIcon, SunIcon, MoonIcon, StarHalf, SparklesIcon, ZapIcon3,
  FlameIcon2, SnowflakeIcon2, LeafIcon, FlowerIcon, SproutIcon, TreeIcon,
  Mountain, WavesIcon, AnchorIcon, ShipIcon, PlaneIcon, CarIcon2, TrainIcon,
  BusIcon, BikeIcon, RunIcon, WalkIcon, Navigation2Icon, CompassIcon3,
  MapPinIcon2, LocateIcon, CrosshairIcon, TargetIcon2, ActivityIcon3,
  PulseIcon, HeartPulseIcon, StethoscopeIcon, SyringeIcon, PillIcon,
  BandageIcon, AmbulanceIcon, HospitalIcon, MicroscopeIcon, DnaIcon,
  FlaskIcon, BeakerIcon, AtomIcon, RadioactiveIcon, BiohazardIcon,
  LeafIcon2, TreeIcon2, FlowerIcon2, SproutIcon2, AppleIcon2, CoffeeIcon2,
  UtensilsIcon, CakeIcon, PizzaIcon, BurgerIcon, FishIcon, EggIcon,
  MilkIcon, WheatIcon, CarrotIcon, BroccoliIcon, PepperIcon, SaltIcon,
  CandyIcon, IceCreamIcon, BeerIcon, WineIcon, GlassIcon, MugIcon, CupIcon,
  TeaIcon, SodaIcon, WaterIcon, DropletsIcon2, WavesIcon2, ZapIcon4,
  FlameIcon3, SnowflakeIcon3, WindIcon3, CloudIcon3, UmbrellaIcon,
  SunglassesIcon, HatIcon, ShirtIcon, ShoeIcon, BagIcon, WalletIcon3,
  WatchIcon2, GlassesIcon, RingIcon, DiamondIcon, GiftIcon2, PackageIcon2,
  BoxIcon, CubeIcon, SphereIcon, CylinderIcon, PyramidIcon, ConeIcon,
  HexagonIcon, PentagonIcon, OctagonIcon, StarIcon2, HeartIcon2,
  ShieldIcon2, AwardIcon2, TrophyIcon, MedalIcon, RibbonIcon, FlagIcon,
  CheckIcon, XIcon2, PlusIcon2, MinusIcon2, DivideIcon, EqualIcon,
  PercentIcon, HashIcon, AtSignIcon, DollarSignIcon2, EuroIcon, PoundIcon,
  YenIcon, BitcoinIcon, CreditCardIcon, WalletIcon4, BanknoteIcon,
  PiggyBankIcon, CoinsIcon, ReceiptIcon, FileTextIcon2, FileCheckIcon,
  FileXIcon, FilePlusIcon, FileMinusIcon, FolderIcon2, FolderOpenIcon,
  FolderPlusIcon, FolderMinusIcon, FolderTreeIcon, FolderSearchIcon,
  FileSearchIcon, SearchIcon2, FilterIcon2, SlidersIcon3, BarChartIcon2,
  LineChartIcon2, PieChartIcon2, AreaChartIcon, ScatterChartIcon,
  BubbleChartIcon, RadarIcon, TreemapIcon, HistogramIcon, BoxPlotIcon,
  CandlestickIcon, GaugeIcon2, TachometerIcon, SpeedometerIcon,
  GaugeCircleIcon, ActivityIcon4, HeartMonitorIcon, BrainIcon2, CpuIcon2,
  HardDriveIcon, ServerIcon, DatabaseIcon2, CloudIcon4, CloudOffIcon,
  CloudUploadIcon, CloudDownloadIcon
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Types
interface Campaign {
  name: string;
  type: string;
  cpl: string;
  ctr: string;
  roas: string;
  leads: number;
  impressions: string;
  emoji: string;
}

interface Ranking {
  term: string;
  before: string;
  after: string;
  hot: boolean;
}

interface Service {
  icon: React.ElementType;
  name: string;
  tag: string;
  stats: string[];
  proof: string;
  color: string;
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  tag: string | null;
}

// Data
const metaCampaigns: Campaign[] = [
  { name: 'Summer Smile Makeover', type: 'Lead Generation', cpl: '$10.28', ctr: '5.2%', roas: '4.2x', leads: 187, impressions: '245K', emoji: '✨' },
  { name: 'Emergency Dentist – Dallas', type: 'Calls & Forms', cpl: '$12.45', ctr: '6.8%', roas: '3.8x', leads: 96, impressions: '128K', emoji: '🚨' },
  { name: 'Clear Aligners Offer', type: 'Booking Campaign', cpl: '$8.97', ctr: '7.1%', roas: '5.1x', leads: 312, impressions: '356K', emoji: '💎' },
];

const rankings: Ranking[] = [
  { term: 'dentist Dallas TX', before: 'Out of top 20', after: 'Top 6–10', hot: true },
  { term: 'clear aligners Dallas', before: 'Not ranked', after: 'Top 8–12', hot: true },
  { term: 'veneers Dallas', before: 'Not ranked', after: 'Top 10–15', hot: false },
  { term: 'family dentist Dallas', before: 'Out of maps pack', after: 'Maps pack visibility', hot: true },
];

const services: Service[] = [
  { icon: Megaphone, name: 'Meta Ads', tag: 'FB + IG', stats: ['$10–15 CPL', '5–7% CTR', '3–5x ROAS'], proof: '312 leads in 30 days for a Dallas clinic at $8.97/lead', color: '#1877F2' },
  { icon: Target, name: 'Google Ads', tag: 'Search + Call Ads', stats: ['$12–18 CPL', 'Top 3 positions', '4x+ ROAS'], proof: 'Reduced cost per booking by 52% for a dental chain', color: '#EA4335' },
  { icon: MapPin, name: 'Google Business', tag: 'GBP Optimization', stats: ['90+ calls/mo', 'Top 6–10 map rank', '350% more actions'], proof: 'Royal Lane went from 20 calls → 90+ calls/month', color: '#34A853' },
  { icon: Search, name: 'SEO + AEO + GEO', tag: 'Organic Growth', stats: ['350% traffic↑', 'Top 10 keywords', 'Featured snippets'], proof: '420 → 1,900+ organic sessions/month for Royal Lane', color: '#FBBC05' },
  { icon: Smartphone, name: 'Website + CRO', tag: 'Conversion Rate', stats: ['75% mobile traffic', '55+ inquiries/mo', '28–35 forms/mo'], proof: 'Chat & SMS added — 10–20 extra inquiries/month instantly', color: '#c9a84c' },
];

const plans: Plan[] = [
  { name: 'Starter', price: 499, features: ['SEO + GBP optimization', 'Weekly posts & updates', 'Review management', 'Monthly reporting'], tag: null },
  { name: 'Growth', price: 999, features: ['Everything in Starter', 'Google Ads management', 'Meta Ads management', 'Landing page optimization', 'Chat/SMS setup'], tag: 'MOST POPULAR' },
  { name: 'Premium', price: 1999, features: ['Everything in Growth', 'AEO + GEO strategy', 'Video ads creation', 'Full funnel automation', 'Dedicated strategist'], tag: 'BEST RESULTS' },
];

// Custom hooks
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

// Components
const Particles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 6 + 1,
          height: Math.random() * 6 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(201,168,76,${Math.random() * 0.3 + 0.05})`,
          filter: 'blur(1px)',
        }}
        animate={{
          y: [0, -50, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 4,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const Orb: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 10, repeat: Infinity }}
    className={`absolute rounded-full blur-[120px] pointer-events-none ${className || ''}`}
    style={style}
  />
);

const GlowCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative group ${className || ''}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
    <div className="relative bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#c9a84c]/40 transition-all duration-300">
      {children}
    </div>
  </div>
);

// Main Component
export default function DentalLeadsPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const organic = useCountUp(1900, 2200, statsInView);
  const calls = useCountUp(90, 2000, statsInView);
  const forms = useCountUp(35, 2000, statsInView);
  const traffic = useCountUp(350, 2000, statsInView);

  useEffect(() => {
    document.title = 'Dental Leads | $10/Lead* | SEO, Google Ads, Meta Ads';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Get dental patients at $10/lead* with our proven system: Meta Ads, Google Ads, GBP optimization, SEO/AEO/GEO. Results in first month or 100% money back.';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="bg-[#070b12] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Particles />
        <Orb style={{ width: 800, height: 800, top: '-20%', left: '-20%', background: 'rgba(201,168,76,0.1)' }} />
        <Orb style={{ width: 1000, height: 1000, bottom: '-30%', right: '-30%', background: 'rgba(201,168,76,0.08)' }} />

        {/* Background pattern - safe CSS */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-24 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/10 to-[#c9a84c]/5 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]"
            />
            <span className="text-[#c9a84c] text-sm font-semibold tracking-wide">🦷 Specialized Dental Growth System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            <span className="text-white">Get Dental Patients</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent bg-[length:200%] animate-gradient-x">
              at $10/Lead*
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Meta Ads · Google Ads · GBP Optimization · SEO/AEO/GEO · Website CRO
            <br />
            <span className="text-[#c9a84c] font-semibold">Results in first month or 100% money back.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]"
            >
              <Calendar size={20} />
              Book Free Strategy Call
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                <MessageSquare size={20} />
                Contact for Leads
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-5 mt-12"
          >
            {[
              { icon: Shield, label: 'Money Back Guarantee' },
              { icon: Users, label: '400+ Clients Served' },
              { icon: Award, label: '12+ Years Experience' },
              { icon: Star, label: '4.9/5 Client Rating' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <badge.icon size={14} className="text-[#c9a84c]" />
                <span className="text-white/60 text-xs font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          <p className="text-white/30 text-xs mt-8">*$10/lead based on location, targeting & competition. Actual costs may vary.</p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Meta Ads Campaigns Section */}
      <section className="py-24 bg-gradient-to-b from-[#070b12] to-[#080d15] relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Megaphone size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">REAL META ADS RESULTS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Real Campaigns.{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                Real Dental Leads.
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Campaign-level data from active Facebook + Instagram lead generation campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {metaCampaigns.map((campaign, idx) => (
              <motion.div
                key={campaign.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative bg-gradient-to-br from-[#0d1422] to-[#060a10] border border-white/10 rounded-2xl overflow-hidden group shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{campaign.emoji}</div>
                      <h3 className="text-white font-bold text-xl">{campaign.name}</h3>
                      <span className="text-white/40 text-xs">{campaign.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">Active</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <div className="text-white/40 text-[10px] uppercase">Cost/Lead</div>
                      <div className="text-[#c9a84c] font-bold text-xl">{campaign.cpl}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <div className="text-white/40 text-[10px] uppercase">CTR</div>
                      <div className="text-white font-bold text-xl">{campaign.ctr}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <div className="text-white/40 text-[10px] uppercase">ROAS</div>
                      <div className="text-white font-bold text-xl">{campaign.roas}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <div className="text-white/40 text-[10px] uppercase">Leads</div>
                      <div className="text-white font-bold text-xl">{campaign.leads}</div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white/40 text-xs mb-2">
                      <span>Impressions</span>
                      <span>{campaign.impressions}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] rounded-full"
                        style={{ width: `${Math.min(100, (campaign.leads / 312) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
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
              </motion.div>
            ))}
          </div>

          {/* Aggregate Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0d1422] to-[#070b12]"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-[#1877F2]/20 flex items-center justify-center">
                <Facebook size={16} className="text-[#1877F2]" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#E4405F]/20 flex items-center justify-center">
                <Instagram size={16} className="text-[#E4405F]" />
              </div>
              <span className="text-white/40 text-sm">Meta Ads Manager — Aggregate Dashboard</span>
              <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { label: 'Total Ad Spend', value: '$8,247', delta: '+12% MoM', up: true },
                { label: 'Leads Generated', value: '642', delta: '+34% MoM', up: true },
                { label: 'Avg. Cost/Lead', value: '$12.84', delta: '−18% MoM', up: false },
                { label: 'Blended ROAS', value: '4.2×', delta: '+0.8× MoM', up: true },
              ].map((stat, i) => (
                <div key={i} className="p-5 text-center bg-black/20">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-white font-bold text-3xl">{stat.value}</div>
                  <div className={`text-sm mt-1 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>{stat.delta}</div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-white/10">
              <div className="text-white/30 text-xs mb-2">LEADS OVER TIME (30 DAYS)</div>
              <div className="flex items-end gap-1 h-16">
                {[22, 35, 28, 45, 38, 55, 48, 62, 51, 70, 63, 78, 68, 85, 72, 90, 78, 95, 82, 100, 88, 96, 91, 98, 86, 94, 89, 97, 93, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.02, duration: 0.4 }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#c9a84c]/40 to-[#c9a84c]"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study: Royal Lane Dental */}
      <section className="py-24 bg-[#060a10] relative">
        <Orb style={{ width: 900, height: 900, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(201,168,76,0.05)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Award size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">VERIFIED CASE STUDY</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              How We Transformed{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                Royal Lane Dental
              </span>
            </h2>
            <p className="text-white/50 text-lg">Dallas, TX · General & Cosmetic Dentistry · 12 months of SEO + GBP optimization</p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { emoji: '📈', value: organic, suffix: '+', label: 'Organic Sessions/Mo', change: '↑ 352% from 420', color: '#4ade80' },
              { emoji: '📞', value: calls, suffix: '+', label: 'GBP Calls/Month', change: '↑ 350% from 20', color: '#60a5fa' },
              { emoji: '📝', value: forms, suffix: '+', label: 'Form Submissions/Mo', change: '↑ 540% from 5', color: '#f472b6' },
              { emoji: '📊', value: traffic, suffix: '%', label: 'Organic Traffic Growth', change: 'Full year 2025', color: '#c9a84c' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: stat.color }}>
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-white/70 text-sm mt-2">{stat.label}</div>
                <div className="text-white/40 text-xs mt-1">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Rankings */}
            <GlowCard className="overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#EA4335]/20 flex items-center justify-center">
                  <Search size={14} className="text-[#EA4335]" />
                </div>
                <span className="text-white font-bold">Google Maps & Search Rankings</span>
              </div>
              <div className="divide-y divide-white/5">
                <div className="grid grid-cols-3 px-5 py-2 text-white/40 text-xs uppercase tracking-wider">
                  <span>Keyword</span>
                  <span>Before</span>
                  <span>After</span>
                </div>
                {rankings.map((r, i) => (
                  <motion.div
                    key={r.term}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="grid grid-cols-3 px-5 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {r.hot && <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />}
                      <span className="text-white/80 text-sm font-medium">{r.term}</span>
                    </div>
                    <span className="text-white/40 text-sm">{r.before}</span>
                    <span className="text-green-400 text-sm font-semibold">{r.after}</span>
                  </motion.div>
                ))}
              </div>
            </GlowCard>

            {/* Lead Flow */}
            <GlowCard className="overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                  <PhoneCall size={14} className="text-[#c9a84c]" />
                </div>
                <span className="text-white font-bold">Monthly Lead Volume — Before vs After</span>
              </div>
              <div className="p-5 space-y-5">
                {[
                  { label: 'GBP Calls', before: 20, after: 90, color: '#60a5fa' },
                  { label: 'Website Forms', before: 5, after: 35, color: '#4ade80' },
                  { label: 'Chat / SMS', before: 0, after: 15, color: '#f472b6' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 line-through">{item.before}/mo</span>
                        <ArrowRight size={12} className="text-[#c9a84c]" />
                        <span style={{ color: item.color }} className="font-bold">{item.after}+/mo</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <span>Before</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/20 rounded-full" style={{ width: `${(item.before / item.after) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <span>After</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${item.color}80, ${item.color})` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl text-center">
                  <span className="text-[#c9a84c] text-sm font-bold">📊 Total: ~25/mo → 140+/mo in patient inquiries</span>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Strategy Timeline */}
          <GlowCard>
            <div className="p-6">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Zap size={20} className="text-[#c9a84c]" />
                What We Did (2025 Strategy)
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { num: '01', title: 'Technical & On-Page SEO', items: ['Fixed crawl errors & mobile UX', 'Implemented local + service schema', 'Rewrote title tags', 'Optimized site speed'] },
                  { num: '02', title: 'GBP Management', items: ['Completed all GBP fields', 'Weekly posts with offers', 'Geo-tagged images', 'Review request strategy'] },
                  { num: '03', title: 'Local Citations', items: ['Cleaned NAP listings', 'Added healthcare directories', 'Built local backlinks', 'Monitored consistency'] },
                  { num: '04', title: 'Conversion Focus', items: ['Added CTAs & forms', 'SMS chat integration', 'Analytics tracking', 'A/B tested landing pages'] },
                ].map((item) => (
                  <div key={item.num}>
                    <div className="text-[#c9a84c] font-mono text-3xl font-bold opacity-40 mb-2">{item.num}</div>
                    <h4 className="text-white font-bold text-sm mb-3">{item.title}</h4>
                    <ul className="space-y-2">
                      {item.items.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-white/50 text-xs">
                          <CheckCircle2 size={12} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

          <div className="text-center mt-8">
            <a
              href="https://www.royallanedental.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/40 hover:text-[#c9a84c] text-sm transition-colors"
            >
              View Royal Lane Dental Website <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Services System */}
      <section className="py-24 bg-gradient-to-b from-[#070b12] to-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Layers size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">COMPLETE SYSTEM</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Everything to{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                Fill Your Chair
              </span>
            </h2>
            <p className="text-white/50 text-lg">5 channels. One dashboard. One point of contact. Proven results.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/40 transition-all duration-300">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full" />
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
                    <service.icon size={22} className="text-[#c9a84c]" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-bold text-lg">{service.name}</h3>
                    <span className="text-white/40 text-xs bg-white/5 px-2 py-0.5 rounded-full">{service.tag}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.stats.map((stat) => (
                      <span key={stat} className="text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-2 py-1 rounded-full">
                        {stat}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex gap-2 text-xs">
                      <Zap size={14} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <p className="text-white/50 leading-relaxed">
                        <span className="text-[#c9a84c] font-semibold">Proof: </span>
                        {service.proof}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#060a10]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <DollarSign size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">TRANSPARENT PRICING</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Service Fees from{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                $499/month
              </span>
            </h2>
            <p className="text-white/50 text-lg">No hidden fees. No long-term contracts. Ad spend billed separately.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  plan.tag === 'MOST POPULAR'
                    ? 'bg-gradient-to-br from-[#0f1927] to-[#0a0f1a] border border-[#c9a84c]/40 shadow-xl shadow-[#c9a84c]/10'
                    : 'bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10'
                }`}
              >
                {plan.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] text-xs font-extrabold px-3 py-1 rounded-full">
                    {plan.tag}
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[#c9a84c] font-extrabold text-4xl">${plan.price}</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="text-white/30 text-xs mb-6">Ad spend billed separately</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-white/70 text-sm">
                      <CheckCircle2 size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-bold transition-all ${
                    plan.tag === 'MOST POPULAR'
                      ? 'bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] hover:scale-105'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-[#c9a84c] hover:text-[#070b12]'
                  }`}
                >
                  Get Started →
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-2xl p-8"
          >
            <Shield size={40} className="text-[#c9a84c] mx-auto mb-4" />
            <h3 className="text-white font-bold text-2xl mb-2">100% Money-Back Guarantee</h3>
            <p className="text-white/60 text-sm">
              If you don't see measurable results in the first month — increased calls, form fills, or leads — we'll refund 100% of your management fees. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28 overflow-hidden">
        <Orb style={{ width: 1000, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(201,168,76,0.12)' }} />
        <Particles />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <TrendingUp size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">READY FOR MORE PATIENTS?</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-5">
              Stop Paying for Ads{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                That Don't Convert
              </span>
            </h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">
              Let's build a system that consistently fills your schedule with quality patients — every month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]"
              >
                <Calendar size={20} />
                Book Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/contact">
                <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                  <MessageSquare size={20} />
                  Ask About Leads
                </a>
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-8">🦷 Dental marketing specialists · 12+ years · 400+ clients worldwide</p>
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
