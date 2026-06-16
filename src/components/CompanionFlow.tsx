import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  VolumeX, Users, Sun, Wind, Heart, RefreshCw, Clock, Map, ArrowRight,
  MessageSquareOff, HelpCircle, FileText, Volume2, MessageCircle, ShieldAlert,
  DoorOpen, Coffee, Activity, Headphones, Sparkles, RotateCcw, Check, Copy,
  Share2, Compass, Rocket, Play, EyeOff, FolderMinus, MessageSquare, Award, Info, Sparkle, Moon
} from 'lucide-react';
import { EMOTIONS, TRIGGERS, NEEDS } from '../data';
import { EmotionType, TriggerType, NeedType, CommunicationLog } from '../types';

// Constellation groupings representing stars
export type ConstellationType = 
  | 'Sunlit Joy' 
  | 'Serene Forest' 
  | 'Misty Clouds' 
  | 'Moonlit Lakes' 
  | 'Obsidian Peaks';

export interface ConstellationConfig {
  id: ConstellationType;
  label: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  description: string;
  icon: string;
  emotions: EmotionType[];
}

export const CONSTELLATIONS: ConstellationConfig[] = [
  {
    id: 'Sunlit Joy',
    label: 'Sunlit Joy & Pride',
    gradient: 'from-amber-400 via-orange-400 to-amber-200',
    borderColor: 'border-amber-400/40',
    textColor: 'text-amber-400',
    description: 'High, warm, and highly sparkling energy worlds.',
    icon: '☀️',
    emotions: ['Happy', 'Excited', 'Proud']
  },
  {
    id: 'Serene Forest',
    label: 'Serene Moss & Meadows',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-300',
    borderColor: 'border-emerald-300/40',
    textColor: 'text-emerald-400',
    description: 'Relaxed, balanced, and curious exploration worlds.',
    icon: '🍃',
    emotions: ['Calm', 'Relaxed', 'Curious']
  },
  {
    id: 'Misty Clouds',
    label: 'Misty Clouds & Static',
    gradient: 'from-indigo-400 via-purple-400 to-pink-300',
    borderColor: 'border-indigo-300/40',
    textColor: 'text-indigo-400',
    description: 'Fast, soft and fluttering thoughts worlds.',
    icon: '🌧️',
    emotions: ['Confused', 'Embarrassed', 'Anxious']
  },
  {
    id: 'Moonlit Lakes',
    label: 'Moonlit Lakes & Sanctuary',
    gradient: 'from-sky-400 via-blue-500 to-indigo-700',
    borderColor: 'border-sky-300/40',
    textColor: 'text-sky-300',
    description: 'Low-battery, separate or disappointment sanctuary pools.',
    icon: '⚓',
    emotions: ['Lonely', 'Sad', 'Disappointed']
  },
  {
    id: 'Obsidian Peaks',
    label: 'Fiery Obsidian Peaks',
    gradient: 'from-rose-500 via-red-500 to-orange-850',
    borderColor: 'border-rose-300/40',
    textColor: 'text-rose-400',
    description: 'Hot, defensive sensory overload and frustration signals.',
    icon: '🌋',
    emotions: ['Overwhelmed', 'Frustrated', 'Angry', 'Scared']
  }
];

const PLANETS: Record<EmotionType, {
  name: string;
  tagline: string;
  bgColor: string;
  borderColor: string;
  primaryColor: string;
  glowColor: string;
  sound: string;
  features: string[];
  icon: string;
  accentGradient: string;
  renderVisual: (isActive: boolean) => React.ReactNode;
}> = {
  Happy: {
    name: "Golden Islands Planet",
    tagline: "Warm floating peaks drifting inside a sunlit golden ether",
    bgColor: "from-amber-400/20 via-orange-500/10 to-transparent",
    borderColor: "border-amber-400/30",
    primaryColor: "text-amber-400",
    glowColor: "shadow-amber-400/30",
    sound: "Deep Harmonious Golden Chimes",
    features: ["Floating Celestial Spires", "Amber Solar Warmth", "Ascending Spark Dust"],
    icon: "☀️",
    accentGradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(245,158,11,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">☀️</span>
        <div className="absolute inset-2 border border-dashed border-white/20 rounded-full animate-spin" />
      </div>
    )
  },
  Excited: {
    name: "Sparkling Star-Field World",
    tagline: "Bubbly rapid star bursts and cosmic neon aurora rings",
    bgColor: "from-yellow-400/20 via-amber-400/10 to-transparent",
    borderColor: "border-yellow-400/30",
    primaryColor: "text-yellow-400",
    glowColor: "shadow-yellow-300/40",
    sound: "Flickering Supernova Spark Chords",
    features: ["Spinning Nova Rings", "Pulsating Light Beacons", "Cosmic Dust Storms"],
    icon: "⭐",
    accentGradient: "linear-gradient(135deg, #FDE047 0%, #EAB308 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(234,179,8,0.5)] ${isActive ? 'animate-pulse' : 'hover:scale-105'}`}>
        <span className="text-3xl">⭐</span>
      </div>
    )
  },
  Proud: {
    name: "Luminous Spires Peak",
    tagline: "Golden monumental prisms casting elegant crystal reflections",
    bgColor: "from-orange-400/20 via-amber-500/10 to-transparent",
    borderColor: "border-orange-400/30",
    primaryColor: "text-orange-400",
    glowColor: "shadow-orange-400/30",
    sound: "Harmonic Trumpet-like Crystal Tones",
    features: ["Prismatic Diamond Spires", "Amber Radiant Beacons", "Polished Basalt Plazas"],
    icon: "✨",
    accentGradient: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-orange-400 to-amber-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(249,115,22,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">✨</span>
      </div>
    )
  },
  Calm: {
    name: "Peaceful Forest Meadow",
    tagline: "A meadow of silent green breezes and soft rustling pines",
    bgColor: "from-emerald-400/20 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-400/30",
    primaryColor: "text-emerald-405",
    glowColor: "shadow-emerald-400/30",
    sound: "Whispering Leaf Foliage and Soft Pines",
    features: ["Ancient Forest Pillars", "Glowing Dewdrop Pods", "Luminous Emerald Carpets"],
    icon: "🍃",
    accentGradient: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(52,211,153,0.5)] ${isActive ? 'animate-pulse' : 'hover:scale-105'}`}>
        <span className="text-3xl">🍃</span>
      </div>
    )
  },
  Relaxed: {
    name: "Cozy Moss Sanctuary",
    tagline: "Warm soil paths with nesting butterflies and gentle flowing streams",
    bgColor: "from-teal-400/20 via-cyan-505/10 to-transparent",
    borderColor: "border-teal-400/30",
    primaryColor: "text-teal-400",
    glowColor: "shadow-teal-400/25",
    sound: "Tinkling Soft Stream Vibrations",
    features: ["Nesting Moss Dens", "Pebble Stream Trails", "Quiet Butterfly Swarms"],
    icon: "🌲",
    accentGradient: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(45,212,191,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">🌲</span>
      </div>
    )
  },
  Curious: {
    name: "Nebula Discovery Port",
    tagline: "Spanning blue gas clouds with floating ancient telescope stairs",
    bgColor: "from-emerald-350/20 via-amber-450/10 to-transparent",
    borderColor: "border-emerald-500/30",
    primaryColor: "text-emerald-400",
    glowColor: "shadow-emerald-350/20",
    sound: "Distant Resonating Deep Echoes",
    features: ["Floating Ancient Gazebos", "Swirling Jade Nebulas", "Flickering Mystery Seeds"],
    icon: "🔍",
    accentGradient: "linear-gradient(135deg, #10B981 0%, #FBBF24 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-450 via-teal-450 to-amber-300 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.5)] ${isActive ? 'animate-spin' : 'hover:scale-105'}`} style={{ animationDuration: '15s' }}>
        <span className="text-3xl">🔍</span>
      </div>
    )
  },
  Confused: {
    name: "Whispering Maze World",
    tagline: "Curved light path loops that shift and loop gently in lilac mists",
    bgColor: "from-indigo-400/20 via-purple-500/10 to-transparent",
    borderColor: "border-indigo-400/30",
    primaryColor: "text-indigo-400",
    glowColor: "shadow-indigo-400/30",
    sound: "Humming Harmonic Octave Swirls",
    features: ["Curving Path Labyrinths", "Soft Floating Ring Keys", "Lilac Swirling Clouds"],
    icon: "🌀",
    accentGradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(129,140,248,0.5)] ${isActive ? 'animate-spin' : 'hover:scale-105'}`}>
        <span className="text-3xl">🌀</span>
      </div>
    )
  },
  Embarrassed: {
    name: "Pink Blossom Shield",
    tagline: "Soft rose gas curtains that close cleanly to protect childrens sight",
    bgColor: "from-pink-300/20 via-indigo-405/10 to-transparent",
    borderColor: "border-pink-300/30",
    primaryColor: "text-pink-400",
    glowColor: "shadow-pink-300/20",
    sound: "Silent Feathery Falling Petals",
    features: ["Soft Pink Petal Clouds", "Whispering Protective Leaves", "Foldable Light Shields"],
    icon: "😳",
    accentGradient: "linear-gradient(135deg, #F472B6 0%, #C084FC 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-pink-400 to-rose-455 flex items-center justify-center relative shadow-[0_0_30px_rgba(244,114,182,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">😳</span>
      </div>
    )
  },
  Anxious: {
    name: "Storm Cloud Core",
    tagline: "A swirling violet tempest of hot static voltages and fluttering wind",
    bgColor: "from-indigo-950/30 via-purple-700/10 to-transparent",
    borderColor: "border-indigo-500/30",
    primaryColor: "text-indigo-400",
    glowColor: "shadow-indigo-505/30",
    sound: "Fast Static Wind Voltages",
    features: ["Swirling Lilac Vortex", "Flickering Amber Arcs", "Vapor Ring Pulses"],
    icon: "🌧️",
    accentGradient: "linear-gradient(135deg, #6366F1 0%, #475569 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(99,102,241,0.5)] ${isActive ? 'animate-pulse' : 'hover:scale-105'}`}>
        <span className="text-3xl">🌧️</span>
      </div>
    )
  },
  Lonely: {
    name: "Solitary Haven Pool",
    tagline: "A single glowing silver rock resting in cozy silent lagoon depths",
    bgColor: "from-sky-305/20 via-sky-505/10 to-transparent",
    borderColor: "border-sky-305/30",
    primaryColor: "text-sky-400",
    glowColor: "shadow-sky-300/30",
    sound: "Quiet Sub-aquatic Single Pings",
    features: ["Silver Solitary Arch", "Safe Tidal Pool Bed", "Climbing Biolum Starfish"],
    icon: "⚓",
    accentGradient: "linear-gradient(135deg, #0EA5E9 0%, #1E3A8A 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(14,165,233,0.5)] ${isActive ? 'animate-pulse' : 'hover:scale-105'}`}>
        <span className="text-3xl">⚓</span>
      </div>
    )
  },
  Sad: {
    name: "Moonlit Sanctuary Pools",
    tagline: "Silvery tranquil tides casting lazy ripples under a crescent moon",
    bgColor: "from-sky-400/20 via-blue-500/10 to-transparent",
    borderColor: "border-blue-400/30",
    primaryColor: "text-sky-405",
    glowColor: "shadow-sky-400/30",
    sound: "Soft Shimmering Ripples",
    features: ["Silver Lunar Reflections", "Low-Frequency Vibrations", "Starlight Droplets"],
    icon: "🌧️",
    accentGradient: "linear-gradient(135deg, #7DD3FC 0%, #0284C7 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-sky-300 to-blue-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(56,189,248,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">🌧️</span>
      </div>
    )
  },
  Disappointed: {
    name: "Heavy Mist Vault",
    tagline: "Damp cloud basins that catch falling energy blocks gently",
    bgColor: "from-blue-405/15 via-indigo-600/10 to-transparent",
    borderColor: "border-blue-500/30",
    primaryColor: "text-blue-400",
    glowColor: "shadow-blue-501/20",
    sound: "Slow Low-pitch Acoustic Drones",
    features: ["Spongy Fiber Catchers", "Damp Moss Grottoes", "Weighted Safety Dampers"],
    icon: "💧",
    accentGradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">💧</span>
      </div>
    )
  },
  Overwhelmed: {
    name: "Deep Ocean Chamber",
    tagline: "A quiet deep-water chamber that isolates sudden outside rushes",
    bgColor: "from-rose-400/20 via-pink-500/10 to-transparent",
    borderColor: "border-rose-450/30",
    primaryColor: "text-rose-400",
    glowColor: "shadow-rose-440/35",
    sound: "Bioluminescent Abyssal Hum",
    features: ["Soft Neon Reef Halos", "Low-Resistance Waves", "Bioluminescent Orbs"],
    icon: "⚡",
    accentGradient: "linear-gradient(135deg, #0EA5E9 0%, #EF4444 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-rose-400 to-red-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(244,63,94,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-2xl">⚡</span>
      </div>
    )
  },
  Frustrated: {
    name: "Volcanic Ash Plains",
    tagline: "Obsidian valleys that contain magma pressure in safe obsidian cups",
    bgColor: "from-rose-500/20 via-orange-655/10 to-transparent",
    borderColor: "border-rose-500/30",
    primaryColor: "text-rose-405",
    glowColor: "shadow-rose-450/35",
    sound: "Deep Mechanical Basalt Swirls",
    features: ["Basalt Steam Vents", "Obsidian Cooldown Tides", "Molten Silt Filters"],
    icon: "🌋",
    accentGradient: "linear-gradient(135deg, #F43F5E 0%, #4C0519 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-rose-400 to-orange-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(244,63,94,0.5)] ${isActive ? 'animate-bounce' : 'hover:scale-105'}`}>
        <span className="text-3xl">🌋</span>
      </div>
    )
  },
  Angry: {
    name: "Molten Magma Core",
    tagline: "Fiery thermal peaks with high basalt safe chimneys to vent steam",
    bgColor: "from-red-500/20 via-rose-700/10 to-transparent",
    borderColor: "border-red-500/30",
    primaryColor: "text-red-500",
    glowColor: "shadow-red-500/40",
    sound: "High-Frequency Magma Spark Rumblings",
    features: ["Thermal Steam Spires", "Red Obsidian Basin Plazas", "Co-regulation Cooling Grains"],
    icon: "🔥",
    accentGradient: "linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-red-500 to-rose-700 flex items-center justify-center relative shadow-[0_0_30px_rgba(239,68,68,0.5)] ${isActive ? 'animate-ping' : ''}`} style={{ animationDuration: '4s' }}>
        <span className="text-3xl">🔥</span>
      </div>
    )
  },
  Scared: {
    name: "Shadow Tree Canopy",
    tagline: "Comfortable high branches wrapping a child into thick cozy leaves",
    bgColor: "from-purple-500/20 via-rose-950/10 to-transparent",
    borderColor: "border-purple-500/35",
    primaryColor: "text-purple-400",
    glowColor: "shadow-purple-500/30",
    sound: "Silent Wind Whistles through Pine Rails",
    features: ["Thick Guarding Boughs", "Plush Leaf Hammocks", "Cozy Shadow Grottoes"],
    icon: "👻",
    accentGradient: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)",
    renderVisual: (isActive: boolean) => (
      <div className={`h-24 w-24 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-700 flex items-center justify-center relative shadow-[0_0_30px_rgba(124,58,237,0.5)] ${isActive ? 'animate-pulse' : 'hover:scale-105'}`}>
        <span className="text-3xl">👻</span>
      </div>
    )
  }
};

interface CompanionFlowProps {
  onAddLog: (newLog: Omit<CommunicationLog, 'id' | 'timestamp' | 'isReadByParent' | 'isReadByTeacher'>) => void;
  onGoToDashboard: (portal: 'parent' | 'teacher') => void;
}

export default function CompanionFlow({ onAddLog, onGoToDashboard }: CompanionFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeConstellation, setActiveConstellation] = useState<ConstellationType>('Sunlit Joy');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerType | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<NeedType | null>(null);

  const [hoveredEmotion, setHoveredEmotion] = useState<EmotionType | null>(null);
  const [warpActive, setWarpActive] = useState<boolean>(false);
  const [warpTarget, setWarpTarget] = useState<EmotionType | null>(null);

  // States for co-regulation warmups
  const [showPreRegulation, setShowPreRegulation] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<'Breathe In' | 'Hold' | 'Breathe Out'>('Breathe In');

  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Durable sandbox scores
  const [completionsCount, setCompletionsCount] = useState<number>(0);
  const [unlockedMoments, setUnlockedMoments] = useState<Omit<CommunicationLog, 'isReadByParent' | 'isReadByTeacher'>[]>([]);

  // Initialize from storage safely
  useEffect(() => {
    const counts = localStorage.getItem('ami_completions_count');
    if (counts) setCompletionsCount(parseInt(counts));

    const moments = localStorage.getItem('ami_unlocked_moments');
    if (moments) {
      try {
        setUnlockedMoments(JSON.parse(moments));
      } catch (err) {}
    }
  }, []);

  // Breathing timer co-regulation
  useEffect(() => {
    if (!showPreRegulation) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Breathe In') return 'Hold';
        if (prev === 'Hold') return 'Breathe Out';
        return 'Breathe In';
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [showPreRegulation]);

  const handleRestart = () => {
    setSelectedEmotion(null);
    setSelectedTrigger(null);
    setSelectedNeed(null);
    setHoveredEmotion(null);
    setWarpActive(false);
    setWarpTarget(null);
    setIsShared(false);
    setIsCopied(false);
    setStep(1);
    setShowPreRegulation(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const renderIcon = (name: string, className: string = "h-5 w-5") => {
    switch (name) {
      case 'VolumeX': return <VolumeX className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Map': return <Map className={className} />;
      case 'ArrowRight': return <ArrowRight className={className} />;
      case 'MessageSquareOff': return <MessageSquareOff className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Volume2': return <Volume2 className={className} />;
      case 'MessageCircle': return <MessageCircle className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'DoorOpen': return <DoorOpen className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Headphones': return <Headphones className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <HelpCircle className={className} />;
    }
  };

  const generateMessage = () => {
    if (!selectedEmotion || !selectedTrigger || !selectedNeed) return "";

    const emotionPhrase = selectedEmotion.toLowerCase();
    
    let triggerPhrase = `friction from ${selectedTrigger.toLowerCase()}`;
    if (selectedTrigger === 'Loud Noise') triggerPhrase = "the loud noise and cafeteria echoes";
    else if (selectedTrigger === 'Bright Light') triggerPhrase = "the bright fluorescent lights";
    else if (selectedTrigger === 'Strong Smell') triggerPhrase = "strong smells around the room";
    else if (selectedTrigger === 'Physical Discomfort') triggerPhrase = "body physical discomfort";
    else if (selectedTrigger === 'Crowded Environment') triggerPhrase = "the crowded spaces";
    else if (selectedTrigger === 'Unexpected Change') triggerPhrase = "unexpected schedule changes";
    else if (selectedTrigger === 'Transition') triggerPhrase = "stopping my current focus project to transition";
    else if (selectedTrigger === 'Not being Understood') triggerPhrase = "difficulty making people understand my preferences";
    else if (selectedTrigger === 'Difficulty Expressing Thoughts') triggerPhrase = "trouble formulating spoken words";
    else if (selectedTrigger === 'Classroom Noise') triggerPhrase = "humming chair scrapes and classroom buzzes";
    else if (selectedTrigger === 'Social Challenges') triggerPhrase = "complex, rapid playground social play rules";
    else if (selectedTrigger === 'Homework Stress') triggerPhrase = "unclear worksheet demands";
    else if (selectedTrigger === 'Group Work') triggerPhrase = "trying to work with multiple peers simultaneously";
    else if (selectedTrigger === 'Public Speaking') triggerPhrase = "being asked to answer questions in front of the board";
    else if (selectedTrigger === 'Feeling Left Out') triggerPhrase = "watching children play without a clear entry bridge";
    else if (selectedTrigger === 'Conflict') triggerPhrase = "sudden loud voice pitch jumps and classroom conflict";
    else if (selectedTrigger === 'Uncertainty') triggerPhrase = "unclear instructions";
    else if (selectedTrigger === 'Waiting') triggerPhrase = "having to stand waiting in long bus and cafeteria lines";

    let needPhrase = "take a brief rest break";
    if (selectedNeed === 'Quiet Space') needPhrase = "transition into a cozy quiet corner to sit or rest my body";
    else if (selectedNeed === 'Break') needPhrase = "take a complete physical sensory break to restore balance";
    else if (selectedNeed === 'More Time') needPhrase = "have extra time to process steps at my own comfortable pace";
    else if (selectedNeed === 'Help Understanding') needPhrase = "have the teacher divide instructions into tiny visual checklists";
    else if (selectedNeed === 'Emotional Support') needPhrase = "receive a supportive validator or gentle handhold";
    else if (selectedNeed === 'Water') needPhrase = "recharge my sensory cells with a cool drink of water";
    else if (selectedNeed === 'Movement Break') needPhrase = "squeeze texture toys and take a short stretching break";
    else if (selectedNeed === 'Headphones') needPhrase = "wear cushioning noise ear protectors to quiet the classroom";
    else if (selectedNeed === 'Comfort Item') needPhrase = "squeeze my soft sensory plush or weighted lappad";
    else if (selectedNeed === 'Hug') needPhrase = "receive a deep relaxing co-regulation pressure hug";
    else if (selectedNeed === 'Reduced Stimulation') needPhrase = "dim the overhead lights and lower adjacent noise sources";
    else if (selectedNeed === 'Clear Instructions') needPhrase = "use simple step cards paired with clean pictures instead of talking";
    else if (selectedNeed === 'Time Alone') needPhrase = "get a quiet 5-minute zone entirely by myself";
    else if (selectedNeed === 'Talking with Trusted Person') needPhrase = "spend a few minutes with a trusted mentor or guide";

    return `I am feeling ${emotionPhrase} because of ${triggerPhrase}. I would feel better if my environment could allow me to ${needPhrase}.`;
  };

  const textToVoice = () => {
    const speechText = generateMessage();
    if (!speechText) return;

    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.8; 
      utterance.pitch = 1.15;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const copyToClipboard = () => {
    const cardText = generateMessage();
    navigator.clipboard.writeText(cardText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleShareToPortal = () => {
    if (!selectedEmotion || !selectedTrigger || !selectedNeed) return;
    
    onAddLog({
      childName: 'Liam',
      emotion: selectedEmotion,
      trigger: selectedTrigger,
      need: selectedNeed,
      message: generateMessage()
    });

    const newMoment = {
      id: `moment-${Date.now()}`,
      timestamp: new Date().toISOString(),
      childName: 'Liam',
      emotion: selectedEmotion,
      trigger: selectedTrigger,
      need: selectedNeed,
      message: generateMessage()
    };

    const updatedMoments = [newMoment, ...unlockedMoments];
    setUnlockedMoments(updatedMoments);
    localStorage.setItem('ami_unlocked_moments', JSON.stringify(updatedMoments));

    const newCount = completionsCount + 1;
    setCompletionsCount(newCount);
    localStorage.setItem('ami_completions_count', newCount.toString());

    setIsShared(true);
  };

  const handleSelectEmotion = (emotionId: EmotionType) => {
    setWarpTarget(emotionId);
    setWarpActive(true);
    setSelectedEmotion(emotionId);
    setTimeout(() => {
      setWarpActive(false);
      setWarpTarget(null);
      setStep(2);
    }, 850);
  };

  const activeSys = CONSTELLATIONS.find(c => c.id === activeConstellation) || CONSTELLATIONS[0];

  return (
    <div className="bg-[#050510] text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500/20 selection:text-indigo-200">
      
      {/* Cosmic background stars */}
      <div className="absolute inset-0 bg-[#04040a] bg-[radial-gradient(#ffffff0a_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {/* 1. Concentric Guided Pre-Regulation Warmup Bubble */}
        <AnimatePresence>
          {showPreRegulation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-[40px] bg-[#0c0c1f]/80 border border-white/10 p-8 md:p-12 text-left relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-5">
                  <span className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
                    <Wind className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Silent Breathing Anchor</span>
                  </span>

                  <h2 className="text-3.5xl md:text-5xl font-display font-light text-white tracking-tight leading-tight">
                    Settle into your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-indigo-300 font-medium">Internal Meadows</span>
                  </h2>

                  <p className="text-slate-400 text-sm md:text-base font-sans font-light leading-relaxed">
                    Take a slow, gentle pause before finding your coordinates in the sky. Breathing synchronous cycles helps co-regulate your nervous system in moments of high classroom static.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowPreRegulation(false)}
                      id="ready-btn-sensory-companion"
                      className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold font-sans text-xs transition-transform active:scale-97 cursor-pointer"
                    >
                      I feel centered and ready
                    </button>
                    <button
                      onClick={() => setShowPreRegulation(false)}
                      className="px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono tracking-widest uppercase cursor-pointer"
                    >
                      Skip warmup
                    </button>
                  </div>
                </div>

                {/* Pulsing visual bubble helper */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="h-44 w-44 rounded-full border border-white/5 flex items-center justify-center relative">
                    {/* Concentric rings */}
                    <div className="absolute h-36 w-36 rounded-full border border-dashed border-indigo-500/10 animate-spin" style={{ animationDuration: '30s' }} />
                    
                    <motion.div 
                      className="absolute h-24 w-24 rounded-full bg-indigo-500/15 blur-lg shadow-[0_0_50px_rgba(99,102,241,0.3)]"
                      animate={{
                        scale: breathPhase === 'Breathe In' ? 1.4 : breathPhase === 'Hold' ? 1.4 : 0.8,
                      }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    <motion.div 
                      className="h-16 w-16 rounded-full bg-gradient-to-tr from-sky-450 via-indigo-500 to-purple-500 flex flex-col items-center justify-center text-white text-[10px] uppercase tracking-widest font-mono font-black border border-white/20 z-10"
                      animate={{
                        scale: breathPhase === 'Breathe In' ? 1.3 : breathPhase === 'Hold' ? 1.3 : 0.9,
                      }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    >
                      <span className="scale-75 text-center px-1 text-[8px] whitespace-normal leading-tight">{breathPhase}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 1: CONSTELLATION MAP DISCOVERY */}
        {!showPreRegulation && step === 1 && (
          <div className="space-y-8 text-left">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">Cosmic Step 1 / 4 • Emotional Galaxies</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-amber-300 font-medium">Emotional Constellations</span></h2>
              <p className="text-slate-400 text-sm max-w-2xl font-sans font-light">
                Select a Star System category below, then click any sparkling emotional coordinate on the celestial orb to warp into hyperspace support.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: List of star systems */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-black block pl-2">Select Star System</span>
                {CONSTELLATIONS.map(sys => {
                  const isActiveSys = sys.id === activeConstellation;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => {
                        setActiveConstellation(sys.id);
                        setSelectedEmotion(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start space-x-3.5 transition-all cursor-pointer ${
                        isActiveSys 
                          ? 'bg-slate-800/80 border-indigo-500/40 shadow-lg scale-[1.02]' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{sys.icon}</span>
                      <div className="space-y-1">
                        <h4 className="font-display font-medium text-white text-sm">{sys.label}</h4>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{sys.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Center Celestial Sphere (Render active star system orbits) */}
              <div className="lg:col-span-8 bg-[#090916]/60 backdrop-blur-md rounded-[36px] border border-white/5 p-8 relative min-h-[460px] flex flex-col justify-between overflow-hidden">
                {/* Visual Warp Speed effect overlay active */}
                <AnimatePresence>
                  {warpActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#050510] flex flex-col items-center justify-center z-50 text-center"
                    >
                      {/* Warping Speed Stars lines */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_10%,_#000000_90%)] z-10 pointer-events-none" />
                      <div className="animate-ping h-48 w-48 rounded-full border border-amber-300/10 mb-6" />
                      
                      <div className="space-y-2 z-25">
                        <span className="text-4xl">🚀</span>
                        <h3 className="font-display font-black text-xl text-white tracking-widest uppercase">Warping to Catalysts</h3>
                        <p className="text-xs text-amber-300 font-mono">Analyzing {warpTarget} World parameters...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[10px] font-mono tracking-widest text-[#9CA3AF] uppercase">Orbital System Canopy</span>
                  <span className="text-[9.5px] font-mono text-amber-300">SYSTEM STYLING: GLOW ACTIVE</span>
                </div>

                {/* The Orbital space area map */}
                <div className="flex-1 min-h-[280px] relative flex items-center justify-center py-6">
                  
                  {/* Decorative orbit pathways */}
                  <div className="absolute h-64 w-64 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '80s' }} />
                  <div className="absolute h-40 w-40 rounded-full border border-white/5 animate-pulse" />

                  {/* SVG glowing constellations links lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="20%" y1="50%" x2="50%" y2="20%" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                    <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                    <line x1="80%" y1="50%" x2="50%" y2="80%" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                    <line x1="50%" y1="80%" x2="20%" y2="50%" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                  </svg>

                  {/* Render orbit stars directly */}
                  <div className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-[440px] relative z-10">
                    {activeSys.emotions.map((emName) => {
                      const pl = PLANETS[emName];
                      if (!pl) return null;
                      const isHovered = hoveredEmotion === emName;
                      return (
                        <button
                          key={emName}
                          onClick={() => handleSelectEmotion(emName)}
                          onMouseEnter={() => setHoveredEmotion(emName)}
                          onMouseLeave={() => setHoveredEmotion(null)}
                          className="flex flex-col items-center group cursor-pointer relative"
                          id={`companion-star-option-${emName}`}
                        >
                          <div className="relative">
                            {/* Inner sparkling halo when system holds active */}
                            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-teal-500/10 blur-sm group-hover:scale-130 transition-transform duration-300" />
                            {pl.renderVisual(isHovered)}
                          </div>

                          <span className="mt-3.5 text-xs font-mono font-bold tracking-widest text-[#FAF8F4] uppercase group-hover:text-amber-300 block">{emName}</span>
                          <span className="text-[8px] text-slate-500 scale-90 whitespace-nowrap">{pl.icon} Planet coords</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time planet description HUD feedback at base of system */}
                <div className="pt-4 border-t border-white/5 text-left min-h-[64px]">
                  <AnimatePresence mode="wait">
                    {hoveredEmotion ? (
                      <motion.div
                        key={`desc-${hoveredEmotion}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-12 gap-3 items-center"
                      >
                        <span className="col-span-1 text-3xl">{PLANETS[hoveredEmotion].icon}</span>
                        <div className="col-span-11 space-y-1">
                          <h4 className="text-xs font-mono font-bold tracking-wide text-white uppercase">{PLANETS[hoveredEmotion].name}</h4>
                          <p className="text-[11px] text-slate-400 font-sans italic">"{PLANETS[hoveredEmotion].tagline}" • {PLANETS[hoveredEmotion].sound}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center space-x-2 text-slate-500 text-[10.5px] font-mono justify-center">
                        <Sparkles className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                        <span>Hover components or coordinates to synchronize biosignals</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 2: SENSORY COSMIC CATALYSTS (TRIGGERS) */}
        {!showPreRegulation && step === 2 && (
          <div className="space-y-8 text-left">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#B45309] uppercase block font-extrabold">Cosmic Step 2 / 4 • Cosmic Catalysts</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">Identify the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-amber-500 font-medium">Cosmic Catalyst</span></h2>
              <p className="text-slate-400 text-sm max-w-2xl font-sans font-light">
                What crystal trigger meteorite entered your canopy space to introduce friction into your baseline state? Seek and isolate.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TRIGGERS.map((trObj) => {
                const isSelected = selectedTrigger === trObj.id;
                return (
                  <button
                    key={trObj.id}
                    onClick={() => {
                      setSelectedTrigger(trObj.id);
                      setStep(3);
                    }}
                    id={`trigger-btn-${trObj.id.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`p-5 rounded-2.5xl border text-left flex flex-col justify-between h-[150px] transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-400/20 to-transparent border-orange-500 shadow-md scale-[1.02]'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/15'
                    }`}
                  >
                    <span className="bg-white/5 h-10 w-10 border border-white/10 rounded-xl flex items-center justify-center shadow">{renderIcon(trObj.iconName, "h-5 w-5 text-orange-300")}</span>
                    <div>
                      <h4 className="font-display font-medium text-white text-xs tracking-tight">{trObj.id}</h4>
                      <p className="text-[9.5px] text-slate-500 leading-normal font-sans line-clamp-1 mt-0.5">{trObj.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl border border-white/10 text-slate-400 text-xs hover:text-slate-200">
                Back to Stars
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: HEALING WISHING WELLS (NEEDS) */}
        {!showPreRegulation && step === 3 && (
          <div className="space-y-8 text-left">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-305 uppercase block font-extrabold">Cosmic Step 3 / 4 • Wishing Wells</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">Select a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-indigo-300 font-medium">Wishing Fountain</span></h2>
              <p className="text-slate-400 text-sm max-w-2xl font-sans font-light">
                What healing sanctuary well coordinates do you wish to activate to restore Liams sensory battery level?
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {NEEDS.map((ndObj) => {
                const isSelected = selectedNeed === ndObj.id;
                return (
                  <button
                    key={ndObj.id}
                    onClick={() => {
                      setSelectedNeed(ndObj.id);
                      setStep(4);
                    }}
                    id={`need-btn-${ndObj.id.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`p-5 rounded-2.5xl border text-left flex flex-col justify-between h-[155px] transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-b from-emerald-400/20 to-transparent border-emerald-550 shadow-md scale-[1.02]'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/15'
                    }`}
                  >
                    <span className="bg-white/5 h-10 w-10 border border-white/10 rounded-xl flex items-center justify-center shadow">{renderIcon(ndObj.iconName, "h-5 w-5 text-emerald-300")}</span>
                    <div>
                      <h4 className="font-display font-medium text-white text-xs tracking-tight">{ndObj.id}</h4>
                      <p className="text-[9.5px] text-slate-500 leading-normal font-sans line-clamp-1 mt-0.5">{ndObj.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl border border-white/10 text-slate-400 text-xs hover:text-slate-200">
                Back to Catalysts
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: IRIDESCENT COLLECTION KEEPSAKE STORY CARD */}
        {!showPreRegulation && step === 4 && selectedEmotion && selectedTrigger && selectedNeed && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-left"
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                <Award className="h-4 w-4 text-amber-300 animate-pulse" />
                <span>Sanctuary Keepsake Synthesis</span>
              </span>
              <h2 className="text-4xl font-display font-light text-white tracking-tight">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 font-medium">Story Card</span> is Woven</h2>
              <p className="text-sm text-slate-400 font-sans font-light">
                Liam, you bypassed verbal hurdles beautifully. Review your keepsake, co-regulate, or instantly synchronize it with parents/teachers.
              </p>
            </div>

            {/* Dynamic collectible holographic luxury card */}
            <div className="relative rounded-[40px] bg-slate-900 border border-white/15 p-8 md:p-12 shadow-2xl overflow-hidden max-w-3xl mx-auto">
              {/* Dynamic decorative backdrop radial neon glow matching targeted emotion */}
              <div 
                className="absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-15 filter blur-[40px] pointer-events-none" 
                style={{ background: PLANETS[selectedEmotion].accentGradient }}
              />

              <div className="flex flex-wrap items-center justify-between pb-5 border-b border-white/5 gap-4 mb-8">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#9CA3AF] font-bold uppercase">AMI HARMONY ARCHIVE</span>
                  <h3 className="text-base font-display font-medium text-white mt-0.5">Unified co-regulation keepsake</h3>
                </div>
                <div className="flex items-center space-x-1 bg-amber-500/15 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 font-mono">
                  ✦ CARD HOLOGRAM UNLOCKED
                </div>
              </div>

              {/* Message whisper */}
              <blockquote className="text-xl md:text-3xl font-display font-light text-slate-100 leading-relaxed border-l-4 border-amber-400 pl-6 py-1">
                "{generateMessage()}"
              </blockquote>

              <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 inline-flex items-start gap-3.5 text-xs text-slate-300 font-sans font-light">
                <Info className="h-5 w-5 text-indigo-405 flex-shrink-0 mt-0.5" />
                <span>
                  <b>Why this helps Liam:</b> Transcribing internal overloads into a beautiful visual star matrix allows caregivers and classrooms to accommodate sensory needs instantly without verbal speaking pressure, lowering adrenaline.
                </span>
              </div>

              {/* Plaque layout */}
              <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 pt-6 border-t border-white/5 font-mono text-[11px]">
                <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                  <p className="text-[8px] uppercase text-slate-500 font-bold tracking-wider">COGNITIVE SYSTEM</p>
                  <p className="text-[12px] font-extrabold mt-1 text-[#FAF8F4]">
                    {PLANETS[selectedEmotion].icon} {selectedEmotion} World
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                  <p className="text-[8px] uppercase text-slate-500 font-bold tracking-wider">COSMIC CATALYST</p>
                  <p className="text-[12px] font-extrabold mt-1 text-[#FAF8F4]">
                    {selectedTrigger}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/2 p-4 col-span-2 md:col-span-1">
                  <p className="text-[8px] uppercase text-slate-500 font-bold tracking-wider">SANCTUARY RESOLUTION</p>
                  <p className="text-[12px] font-extrabold mt-1 text-[#FAF8F4]">
                    {selectedNeed}
                  </p>
                </div>
              </div>

              {/* Action grid */}
              <div className="mt-10 flex flex-wrap gap-4 items-center justify-between pt-8 border-t border-white/5">
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={textToVoice}
                    id="companion-voice-btn"
                    className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs font-mono tracking-wide uppercase transition-all border cursor-pointer ${
                      isSpeaking 
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 animate-pulse' 
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>{isSpeaking ? 'Whispering...' : 'Voice out Loud'}</span>
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-5 py-3 text-xs font-mono tracking-wide uppercase cursor-pointer"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>

                <button
                  onClick={handleShareToPortal}
                  disabled={isShared}
                  id="companion-share-to-ecosystem"
                  className={`flex items-center space-x-2 rounded-xl px-6 py-3.5 text-xs font-sans font-bold text-slate-950 transition-all cursor-pointer ${
                    isShared 
                      ? 'bg-emerald-400 border-emerald-400 font-sans' 
                      : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400'
                  }`}
                >
                  {isShared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4 animate-bounce" />}
                  <span>{isShared ? 'Shared to Ecosystem' : 'Send to Parent & Teacher'}</span>
                </button>
              </div>

            </div>

            {isShared && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl bg-emerald-500/10 p-6 border border-emerald-400/20 text-center space-y-4 max-w-3xl mx-auto"
              >
                <p className="text-xs md:text-sm text-emerald-300 font-sans leading-relaxed max-w-xl mx-auto">
                  🌟 Brilliant, Liam! Your card coordinates are synchronized. Your family and homeroom teacher have received silent, beautiful co-regulation signals. Let's find rest.
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  <button
                    onClick={() => onGoToDashboard('parent')}
                    id="companion-jump-to-parent"
                    className="rounded-lg bg-[#0d0d1e] border border-white/10 hover:bg-[#1a1a2e] px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-purple-300 cursor-pointer"
                  >
                    View Parent Tree
                  </button>
                  <button
                    onClick={() => onGoToDashboard('teacher')}
                    id="companion-jump-to-teacher"
                    className="rounded-lg bg-[#0d0d1e] border border-white/10 hover:bg-[#1a1a2e] px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-emerald-300 cursor-pointer"
                  >
                    View Teacher Board
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Start another emotional journey</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* 4. UNDERSTANDING MOMENTS ALBUM COLLECTION (Holographic Space cards array) */}
      <div className="mt-20 pt-12 border-t border-white/10 text-left space-y-6 relative max-w-6xl mx-auto">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            Liam's Astronomy Sanctuary Album
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-light text-white mt-3">
            Understanding Collectible Album
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xl">
            Each resolved emotional storm is archived as a star keeper. These records map Liams gains in self-advocacy and natural co-regulation harmony.
          </p>
        </div>

        {unlockedMoments.length === 0 ? (
          <div className="rounded-[32px] p-12 border border-dashed border-white/10 text-center bg-white/2 space-y-3">
            <span className="text-4xl filter saturate-50 block animate-bounce" style={{ animationDuration: '6s' }}>🪐</span>
            <p className="text-sm font-display font-medium text-white">Your sanctuary album lies waiting...</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">Complete Step 4 and click 'Send' to synchronize your first collectible co-regulation card here.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unlockedMoments.map((mom, idx) => {
              const momPlanet = PLANETS[mom.emotion];
              return (
                <div 
                  key={mom.id}
                  className="rounded-[32px] bg-slate-900 border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between hover:shadow-2xl transition-all relative overflow-hidden min-h-[220px]"
                >
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full opacity-10 pointer-events-none" style={{ background: momPlanet.accentGradient }} />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-mono text-slate-500 font-bold block">STARDUST KEEPERS {unlockedMoments.length - idx}</span>
                      <span className="text-[9px] text-[#9CA3AF] font-medium font-sans">
                        {new Date(mom.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span className="text-2xl">{momPlanet.icon}</span>
                  </div>

                  <p className="text-xs italic text-slate-300 font-sans font-light mt-3 leading-relaxed line-clamp-3">
                    "{mom.message}"
                  </p>

                  <div className="pt-3 border-t border-white/5 mt-3 flex justify-between items-center text-[9.5px] font-mono">
                    <span className="font-bold text-amber-305">✦ Star System Resolved</span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-slate-400 font-black">{mom.need}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
