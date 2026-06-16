import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Star, Sun, CloudRain, Wind, Flame, Eye, EyeOff,
  ChevronRight, ArrowRight, Volume2, Globe, Sparkle, Award, BookOpen,
  Compass, Laptop, Moon, Lightbulb, Check, ShieldAlert, HeartHandshake
} from 'lucide-react';

interface LandingPageProps {
  onStartExploring: () => void;
  onGoToParent: () => void;
  onGoToTeacher: () => void;
}

type DemoEmotion = 'Happy' | 'Calm' | 'Sad' | 'Anxious' | 'Overwhelmed' | 'Frustrated';

interface LightBridge {
  emotion: DemoEmotion;
  poetry: string;
  color: string;
  glowColor: string;
  outcome: string;
  need: string;
  trigger: string;
}

export default function LandingPage({ onStartExploring, onGoToParent, onGoToTeacher }: LandingPageProps) {
  const [selectedOrbit, setSelectedOrbit] = useState<DemoEmotion | null>('Overwhelmed');
  const [constellationActive, setConstellationActive] = useState<Record<DemoEmotion, boolean>>({
    Happy: false,
    Calm: false,
    Sad: false,
    Anxious: false,
    Overwhelmed: true,
    Frustrated: false
  });
  
  const [treeGrowth, setTreeGrowth] = useState<number>(75); // percent
  const [treeSeason, setTreeSeason] = useState<'blossom' | 'starlight' | 'serene'>('blossom');
  const [demoSpeaking, setDemoSpeaking] = useState(false);
  const [activeConstellationGroup, setActiveConstellationGroup] = useState<string>('all');

  useEffect(() => {
    document.title = "AMI | A Visual World of Emotional Connection";
  }, []);

  // Emotional stargazing datasets with poetic lore
  const LIGHT_BRIDGES: Record<DemoEmotion, LightBridge> = {
    Happy: {
      emotion: 'Happy',
      trigger: 'Classroom Achievement',
      need: 'Shared Celebration',
      outcome: 'A sunlit ripple through the classroom meadow.',
      poetry: 'Liam feels sunny, warm, and open. His heart radiates a bright solar frequency, inviting peers to join his play without requiring complex conversational icebreakers.',
      color: 'from-amber-400 to-orange-400',
      glowColor: 'rgba(251, 191, 36, 0.5)'
    },
    Calm: {
      emotion: 'Calm',
      trigger: 'Steady Sensory Corner',
      need: 'Mindful Settle',
      outcome: 'Mossy roots sink deep, stabilizing the heartbeat.',
      poetry: 'The steady rustling of mossy pines. This is Liams baseline of peace. His breathing is steady, his focus is serene, and the ambient static of the school completely dissolves.',
      color: 'from-emerald-400 to-teal-500',
      glowColor: 'rgba(52, 211, 153, 0.5)'
    },
    Sad: {
      emotion: 'Sad',
      trigger: 'Classmates Gathering Too Fast',
      need: 'Tears & Solitary Drift',
      outcome: 'A silvery crescent pool of safe, quiet release.',
      poetry: 'Liams energy runs low, dark clouds gather. Instead of forcing a forced smile, AMI casts a silvery moonlit path. Quiet hours are respected, allowing co-regulation to take its time.',
      color: 'from-sky-400 to-indigo-500',
      glowColor: 'rgba(56, 189, 248, 0.5)'
    },
    Anxious: {
      emotion: 'Anxious',
      trigger: 'Sudden Classroom Alarm',
      need: 'Predictable Sensory Rhythm',
      outcome: 'Swirling lavender vapors wrap tightly like a protective knit.',
      poetry: 'Internal tempos speed up. The world seems to rush at double speed. Direct question cards with clear icons guide him back to a secure rhythm, calming the internal storm.',
      color: 'from-purple-400 to-indigo-600',
      glowColor: 'rgba(168, 85, 247, 0.5)'
    },
    Overwhelmed: {
      emotion: 'Overwhelmed',
      trigger: 'Cafeteria Echoes (90dB)',
      need: 'Acoustic Safeguard Room',
      outcome: 'A quiet deep-water chamber that silences the outer static.',
      poetry: 'Visual static reaches peak levels. Shouting voices feel like needles. Liam taps Overwhelmed. A glowing beam of coral teal instantly alerts the teacher to supply his soft headphones.',
      color: 'from-rose-500 to-red-600',
      glowColor: 'rgba(244, 63, 94, 0.5)'
    },
    Frustrated: {
      emotion: 'Frustrated',
      trigger: 'Schedule Switch-up Class',
      need: 'Tactile Grounding Break',
      outcome: 'Amber geysers release internal pressure beautifully.',
      poetry: 'Expectations broke, cortisol rises. The internal gears jam. Tapping the Amber Plains, a therapeutic sandbox is assigned, transforming sudden friction into safe creative construction.',
      color: 'from-orange-500 to-amber-600',
      glowColor: 'rgba(249, 115, 22, 0.5)'
    }
  };

  const handleToggleStar = (emotion: DemoEmotion) => {
    setSelectedOrbit(emotion);
    setConstellationActive(prev => ({
      ...prev,
      [emotion]: !prev[emotion]
    }));
  };

  const playPoeticVoice = (emotion: DemoEmotion) => {
    const speechText = `Liams ${emotion} transition is bridged. Triggered by ${LIGHT_BRIDGES[emotion].trigger}, needing ${LIGHT_BRIDGES[emotion].need}. Outcome: ${LIGHT_BRIDGES[emotion].outcome}`;
    if ('speechSynthesis' in window) {
      setDemoSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.onend = () => setDemoSpeaking(false);
      utterance.onerror = () => setDemoSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setDemoSpeaking(true);
      setTimeout(() => setDemoSpeaking(false), 2500);
    }
  };

  // Celestial locations on screen for orbiting stars relative to child in center
  const ORBIT_POSITIONS: Record<DemoEmotion, { x: string; y: string; index: number; symbol: string; label: string }> = {
    Happy: { x: '24%', y: '16%', index: 1, symbol: '☀️', label: 'Sunlit joy' },
    Calm: { x: '72%', y: '18%', index: 2, symbol: '🍃', label: 'Quiet forest' },
    Sad: { x: '18%', y: '68%', index: 3, symbol: '🌧️', label: 'Silvery oasis' },
    Anxious: { x: '82%', y: '58%', index: 4, symbol: '🌀', label: 'Misty sky' },
    Overwhelmed: { x: '50%', y: '15%', index: 5, symbol: '⚡', label: 'Cosmic overload' },
    Frustrated: { x: '45%', y: '78%', index: 6, symbol: '🌋', label: 'Amber plains' }
  };

  return (
    <div className="bg-[#05050C] text-slate-100 selection:bg-amber-500/20 selection:text-amber-200 min-h-screen">
      
      {/* =========================================================
          SECTION 1: CINEMATIC HERO FIELD OF FLOATING EMOTIONS
          ========================================================= */}
      <section className="relative w-full min-h-[96vh] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050510] to-[#030308]">
        
        {/* Sky constellations dots & stars background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-20 right-15 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Ambient Top Title */}
        <div className="max-w-7xl mx-auto w-full text-center pt-8 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300"
          >
            <Sparkle className="h-3 w-3 animate-spin text-amber-300" style={{ animationDuration: '8s' }} />
            <span>AMI • A Living Emotional Universe</span>
          </motion.div>
        </div>

        {/* Dynamic Center Node (The Child & Orbiting Stars Nebula Grid) */}
        <div className="flex-1 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center py-6 min-h-[580px] z-10 relative">
          
          {/* THE CINEMATIC CANVAS (Cols 1-7) */}
          <div className="lg:col-span-8 h-[460px] md:h-[520px] rounded-[36px] bg-black/40 border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Water Ripple Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/10 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Space Ring of Orbit */}
            <div className="absolute h-80 w-80 rounded-full border border-white/5 pointer-events-none animate-pulse" />
            <div className="absolute h-[420px] w-[420px] rounded-full border border-dashed border-white/5 pointer-events-none animate-spin" style={{ animationDuration: '120s' }} />

            {/* Interactive Signal Spark Lines (Light Bridges) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                {/* Neon Glow filters */}
                <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Render dynamic light beams for active constellation star clicks */}
              {(Object.keys(ORBIT_POSITIONS) as DemoEmotion[]).map((em) => {
                if (!constellationActive[em]) return null;
                const pos = ORBIT_POSITIONS[em];
                // Connect with child position: roughly center of the box (50%, 50%)
                return (
                  <g key={`beam-${em}`}>
                    {/* Glowing outer shadow line */}
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                      x1="50%"
                      y1="50%"
                      x2={pos.x}
                      y2={pos.y}
                      stroke={em === 'Overwhelmed' ? '#EF4444' : em === 'Sad' ? '#38BDF8' : em === 'Anxious' ? '#C084FC' : em === 'Calm' ? '#10B981' : em === 'Happy' ? '#FBBF24' : '#F97316'}
                      strokeWidth="5"
                      opacity="0.32"
                      filter="url(#neonGlow)"
                      strokeLinecap="round"
                    />
                    {/* Inner high-intensity laser line */}
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                      x1="50%"
                      y1="50%"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Tiny sparking particles moving along the line */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="4"
                      fill="#FFFFFF"
                      animate={{
                        cx: ["50%", pos.x],
                        cy: ["50%", pos.y],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* CENTER: THE CHILD (Glowing grass mound silhouette) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
              
              {/* Ground Pedestal of Light */}
              <div className="absolute -bottom-6 w-32 h-14 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
              
              {/* Atmospheric particle ring */}
              <div className="absolute h-24 w-24 rounded-full border-2 border-dashed border-amber-300/10 animate-spin" style={{ animationDuration: '40s' }} />

              {/* Glowing Child Avatar (Traveler look) */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="h-24 w-24 rounded-full bg-slate-900 border-2 border-white/30 flex flex-col items-center justify-center relative shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-amber-300/80 cursor-pointer transition-colors"
                id="child-hero-silhouette"
                onClick={() => setSelectedOrbit(null)}
              >
                {/* Sparkling Cape Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 to-purple-500/20 animate-pulse pointer-events-none" />
                
                {/* Face Silhouette */}
                <span className="text-4xl filter drop-shadow">👦</span>

                {/* Sparkling Halo above head */}
                <div className="absolute -top-3 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-3 w-3 rounded-full bg-amber-300/90 blur-[1px] shadow-[0_0_12px_#FCD34D]"
                  />
                </div>
                
                {/* Floating scarf tails */}
                <div className="absolute bottom-1 right-2 translate-y-3 font-mono text-[8px] uppercase font-black text-amber-300 px-1 bg-black/80 rounded border border-amber-300/30">
                  Liam
                </div>
              </motion.div>
            </div>

            {/* FLOATING ORBITING EMOTION STARS (ABSOLUTE POSITIONS) */}
            {(Object.keys(ORBIT_POSITIONS) as DemoEmotion[]).map((em) => {
              const pos = ORBIT_POSITIONS[em];
              const isSelected = selectedOrbit === em;
              const isActive = constellationActive[em];
              const config = LIGHT_BRIDGES[em];

              return (
                <motion.div
                  key={`star-${em}`}
                  id={`hero-orbit-star-${em}`}
                  style={{ top: pos.y, left: pos.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    y: isSelected ? ["0px", "-4px", "0px"] : ["-10px", "10px", "-10px"],
                    x: isSelected ? ["0px", "0px", "0px"] : ["-5px", "5px", "-5px"]
                  }}
                  transition={{
                    duration: (4 + pos.index),
                    repeat: isSelected ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <button
                    onClick={() => handleToggleStar(em)}
                    className={`flex flex-col items-center group cursor-pointer relative p-2 rounded-2xl transition-all ${
                      isSelected 
                        ? 'bg-white/10 border-white/30 saturate-125' 
                        : 'hover:bg-white/5 border-transparent'
                    }`}
                  >
                    {/* Pulsing Star Beacon */}
                    <div className="relative">
                      {/* Interactive ring of glow */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.3 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={`absolute -inset-4 rounded-full bg-gradient-to-r ${config.color} filter blur-sm`}
                            style={{ animation: 'pulse 3s infinite' }}
                          />
                        )}
                      </AnimatePresence>

                      <div 
                        className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl border transition-all ${
                          isActive 
                            ? `bg-gradient-to-br ${config.color} text-white border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110` 
                            : 'bg-[#0d0d1e] text-slate-400 border-white/10 group-hover:border-white/30 group-hover:text-slate-200'
                        }`}
                      >
                        {pos.symbol}
                      </div>

                      {/* Spark indicator for active bridge */}
                      {isActive && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 border border-white text-[8px] font-bold text-slate-900 animate-bounce">
                          ✨
                        </div>
                      )}
                    </div>

                    <span className="mt-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">
                      {em}
                    </span>
                    <span className="text-[8px] text-slate-500 scale-90 -mt-0.5 whitespace-nowrap block">
                      {pos.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
            
            {/* Soft instruction overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 bg-black/60 border border-white/10 px-3 py-1 rounded-full pointer-events-auto cursor-pointer leading-relaxed inline-block">
                👆 Tap emotion stars to weave glowing <span className="text-amber-300">Bridges of Understanding</span>
              </span>
            </div>

          </div>

          {/* POETIC STORYTELLING STORY CARD (Cols 8-12) */}
          <div className="lg:col-span-4 h-full flex flex-col justify-between space-y-6">
            
            <AnimatePresence mode="wait">
              {selectedOrbit ? (
                <motion.div
                  key={`poetry-${selectedOrbit}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-8 rounded-[36px] bg-[#0c0c1f]/80 backdrop-blur border border-white/15 shadow-2xl relative flex-1 flex flex-col justify-between text-left"
                >
                  {/* Subtle decorative glowing corner */}
                  <div className={`absolute -top-4 -right-4 w-28 h-28 rounded-full bg-gradient-to-r ${LIGHT_BRIDGES[selectedOrbit].color} opacity-10 filter blur-[20px]`} />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">Interactive Bridge</span>
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[8px] font-mono uppercase bg-slate-800 text-amber-300 border border-amber-300/20`}>
                        {constellationActive[selectedOrbit] ? 'Bridge Woven ⚡' : 'Closed Star ☁️'}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-4xl font-display font-medium tracking-tight text-white mb-1 flex items-center space-x-2">
                        <span>{ORBIT_POSITIONS[selectedOrbit].symbol}</span>
                        <span>{selectedOrbit}</span>
                      </h2>
                      <span className="text-xs text-amber-300 font-mono italic">
                        Connected to child Liam
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-widest border-l-2 border-slate-700 pl-2">
                      Trigger: {LIGHT_BRIDGES[selectedOrbit].trigger}
                    </p>

                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans italic font-light pt-2">
                      "{LIGHT_BRIDGES[selectedOrbit].poetry}"
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase text-slate-500 block">Bridge Understanding Outcome</span>
                      <p className="text-xs text-slate-400 font-medium">
                        {LIGHT_BRIDGES[selectedOrbit].outcome}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => playPoeticVoice(selectedOrbit)}
                        id="hero-play-poetic-voice"
                        className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase border transition-all cursor-pointer ${
                          demoSpeaking
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 animate-pulse'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                        }`}
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>{demoSpeaking ? 'Whispers drifting...' : 'Listen to Whisper'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleStar(selectedOrbit)}
                        id="hero-toggle-bridge-btn"
                        className="px-3.5 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/40 text-[10px] font-mono tracking-widest uppercase cursor-pointer"
                      >
                        {constellationActive[selectedOrbit] ? 'Sever Bridge' : 'Weave Bridge'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default-lore"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 rounded-[36px] bg-[#0c0c1f]/40 backdrop-blur border border-white/5 shadow-2xl relative flex-1 flex flex-col justify-center text-center space-y-6"
                >
                  <div className="text-4xl">🪐</div>
                  <div className="space-y-2">
                    <h3 className="font-display font-medium text-lg text-white">Weave a Canopy of Light</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Autistic children process sensory overloads in visual silence. Connect multiple constellations to bridge homeroom communication.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block h-1 w-12 rounded bg-[#34d399]/40 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Entrance Action Row */}
            <div className="space-y-2">
              <button
                id="hero-cinematic-explorer"
                onClick={onStartExploring}
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Enter Companion Deck</span>
                <ChevronRight className="h-4 w-4 text-slate-950 stroke-[3]" />
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="choice-parent-btn"
                  onClick={onGoToParent}
                  className="px-4 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-slate-300 hover:text-white text-xs font-bold font-mono tracking-wider cursor-pointer"
                >
                  🏡 Parents Hub
                </button>
                <button
                  id="choice-teacher-btn"
                  onClick={onGoToTeacher}
                  className="px-4 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-slate-300 hover:text-white text-xs font-bold font-mono tracking-wider cursor-pointer"
                >
                  🏫 Teachers Deck
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Ambient bottom footer scroll ticker */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-[9.5px] text-slate-500 font-mono pt-4 border-t border-white/5">
          <span>CO-CREATED BY AUTISM FOUNDATIONS • THERAPEUTIC SEEDLINGS APPROVED</span>
          <span className="text-slate-400 mt-2 md:mt-0 flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>ENVIRONMENT FEED IN REAL-TIME</span>
          </span>
        </div>

      </section>

      {/* =========================================================
          SECTION 2: INTERACTIVE GALAXY CONSTELLATION OF EMOTIONS
          ========================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#030308] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-indigo-300">
              🌌 Discovering the emotional sky
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">
              An Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-amber-300 font-medium">Constellation of Emotions</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Gone are dry assessment grids. Each emotion is a glowing star coordinate. We group them into comforting star maps where related feelings forge immediate pathways of light and therapeutic support.
            </p>
          </div>

          {/* Interactive Constellation Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'all', label: '🌠 Complete Galaxy' },
              { id: 'joy', label: '☀️ Sunlit Joy (Excited, Proud)', col: 'text-amber-300' },
              { id: 'serene', label: '🍃 Serene Meadows (Calm, Confused)', col: 'text-emerald-300' },
              { id: 'storm', label: '🌋 Heavy Peaks (Anxious, Overloaded)', col: 'text-rose-300' }
            ].map(group => (
              <button
                key={group.id}
                onClick={() => setActiveConstellationGroup(group.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-black transition-all cursor-pointer ${
                  activeConstellationGroup === group.id 
                    ? 'bg-slate-850 border border-indigo-400/30 text-white' 
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* CONSTELLATION MAP 1: SUNLIT JOY */}
            {(activeConstellationGroup === 'all' || activeConstellationGroup === 'joy') && (
              <motion.div 
                layout
                className="p-8 rounded-[32px] bg-gradient-to-b from-[#14121a] to-[#04040a] border border-amber-300/10 flex flex-col justify-between hover:border-amber-300/30 transition-all shadow-xl group min-h-[340px]"
              >
                <div className="space-y-4 text-left">
                  <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xl flex items-center justify-center">
                    ☀️
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B45309] font-extrabold block">Constellation Category</span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    Golden Canopy Constellation
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                    Includes **Happy**, **Excited**, and **Proud**. Linked by warm golden coordinates. When multiple joy states connect, they grow sun-flowers inside the Meadow.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">3 Stars Active</span>
                  <button 
                    onClick={onStartExploring} 
                    className="text-amber-300 font-black tracking-widest flex items-center space-x-1 hover:translate-x-1 transition-all"
                  >
                    <span>CONNECT</span>
                    <ChevronRight className="h-3 w-3 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CONSTELLATION MAP 2: SERENE */}
            {(activeConstellationGroup === 'all' || activeConstellationGroup === 'serene') && (
              <motion.div 
                layout
                className="p-8 rounded-[32px] bg-gradient-to-b from-[#0e1614] to-[#04040a] border border-emerald-300/10 flex flex-col justify-between hover:border-emerald-300/30 transition-all shadow-xl group min-h-[340px]"
              >
                <div className="space-y-4 text-left">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-xl flex items-center justify-center">
                    🍃
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block">Constellation Category</span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-white group-hover:text-emerald-250 transition-colors">
                    Serene Emerald Forest
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                    Includes **Calm**, **Relaxed**, and **Curious**. Forms the mossy core of Liams co-regulation system. Teaches the child mindfulness pathways through nature patterns.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">4 Stars Active</span>
                  <button 
                    onClick={onStartExploring} 
                    className="text-emerald-300 font-black tracking-widest flex items-center space-x-1 hover:translate-x-1 transition-all"
                  >
                    <span>EXPLORE</span>
                    <ChevronRight className="h-3 w-3 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CONSTELLATION MAP 3: HEAVY PEAKS */}
            {(activeConstellationGroup === 'all' || activeConstellationGroup === 'storm') && (
              <motion.div 
                layout
                className="p-8 rounded-[32px] bg-gradient-to-b from-[#1c1114] to-[#04040a] border border-rose-300/10 flex flex-col justify-between hover:border-rose-300/30 transition-all shadow-xl group min-h-[340px]"
              >
                <div className="space-y-4 text-left">
                  <div className="h-10 w-10 rounded-2xl bg-rose-500/10 border border-rose-400/20 text-xl flex items-center justify-center">
                    🌋
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-extrabold block">Constellation Category</span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-white group-hover:text-rose-200 transition-colors">
                    Fiery Obsidian Peaks
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                    Includes **Overwhelmed**, **Frustrated**, and **Angry**. High static sensors. Automatically activates silent alerts on educator desk systems to deliver dim lights and ear protection.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold uppercase tracking-wider">🔒 Auto-Guard Active</span>
                  <button 
                    onClick={onStartExploring} 
                    className="text-rose-300 font-black tracking-widest flex items-center space-x-1 hover:translate-x-1 transition-all"
                  >
                    <span>ANCHOR</span>
                    <ChevronRight className="h-3 w-3 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 3: LIVING EMOTION TREE PROGRESS VISUALIZATION
          ========================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#050510] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#050510] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Concept Description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-400/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-300">
                🌱 The Co-Regulation Meadow
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight">
                Behold the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-indigo-300 font-semibold">Living Emotion Tree</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
                We replaced cold progress tables and clinical percentiles with an organic growing sanctuary. Every communication Liam completes fuels growth, sprouts glowing blossoms, and drifts tiny fireflies of light around the canopy.
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <span className="text-lg mt-0.5">🌿</span>
                  <div>
                    <strong className="text-emerald-300 block font-black uppercase">Successful Bridges Grow Branches</strong>
                    <span className="text-slate-400 font-medium">As daily communications increase, the digital tree shoots taller, stronger branches.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <span className="text-lg mt-0.5">🌸</span>
                  <div>
                    <strong className="text-amber-300 block font-black uppercase">Emotional Breakthroughs Create Flowers</strong>
                    <span className="text-slate-400 font-bold">Linking complex overload triggers directly to calming accommodations sprouts golden blossoms.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <span className="text-lg mt-0.5">✨</span>
                  <div>
                    <strong className="text-indigo-300 block font-black uppercase">Moments of Co-Regulation Spark Light</strong>
                    <span className="text-slate-400">When teachers or parents mark notes or resolve alerts, floating glowing spores drift through the air.</span>
                  </div>
                </div>
              </div>

              {/* Simulation buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-black">Test Meadow Growth Simulator</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => { setTreeGrowth(95); setTreeSeason('starlight'); }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                  >
                    ✨ Starlight Bloom (Late)
                  </button>
                  <button 
                    onClick={() => { setTreeGrowth(60); setTreeSeason('blossom'); }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                  >
                    🌸 Sprout Golden Flowers
                  </button>
                  <button 
                    onClick={() => { setTreeGrowth(100); setTreeSeason('serene'); }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                  >
                    🌲 Serene Canopy Full
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column - Tree SVG Canvas */}
            <div className="lg:col-span-7 h-[440px] md:h-[500px] rounded-[40px] bg-black/50 border border-white/10 p-6 relative overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* Star background on SVGs */}
              <div className="absolute inset-0 bg-[#020205] opacity-60 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-[#9CA3AF] bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                LIVING BIOME SCREEN
              </div>

              {/* Animated Tree Canvas */}
              <div className="w-full h-full flex items-end justify-center pb-4 relative">
                
                {/* Simulated Floating Spores */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full filter blur-[1px] ${
                        treeSeason === 'starlight' ? 'bg-indigo-300 shadow-[0_0_8px_#818cf8]' :
                        treeSeason === 'blossom' ? 'bg-amber-300 shadow-[0_0_8px_#fbbf24]' :
                        'bg-emerald-300 shadow-[0_0_8px_#34d399]'
                      }`}
                      style={{
                        width: Math.random() * 6 + 2,
                        height: Math.random() * 6 + 2,
                        bottom: `${15 + Math.random() * 80}%`,
                        left: `${10 + Math.random() * 80}%`
                      }}
                      animate={{
                        y: [-20, -180],
                        opacity: [0, 0.85, 0],
                        x: [0, Math.sin(i) * 55]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 8,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                {/* Main Tree SVG */}
                <svg viewBox="0 0 400 400" className="w-[85%] h-[85%]" style={{ overflow: 'visible' }}>
                  <defs>
                    <radialGradient id="canopyGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Gentle background glow */}
                  <circle cx="200" cy="180" r="140" fill="url(#canopyGlow)" opacity="0.6" className="animate-pulse" style={{ animationDuration: '10s' }} />

                  {/* Hill/Mound */}
                  <path d="M 50,380 M 100,380 Q 200,350 300,380 Z" fill="none" />
                  <path d="M 50,380 Q 200,340 350,380 L 350,420 L 50,420 Z" fill="#064E3B" opacity="0.65" />
                  
                  {/* Tree Trunk & Branches */}
                  <g stroke="#1F2937" strokeLinecap="round">
                    {/* Main Trunk */}
                    <path d="M 200,385 L 200,300 M 200,300 Q 180,240 170,210 T 150,150" fill="none" strokeWidth="12" stroke="#1d140e" />
                    <path d="M 200,300 Q 220,240 230,210 T 250,160" fill="none" strokeWidth="10" stroke="#1d140e" />
                    
                    {/* Staggered Canopy Branches */}
                    <path d="M 170,210 Q 120,180 100,160" fill="none" strokeWidth="6" stroke="#1d140e" opacity={treeGrowth >= 60 ? 1 : 0} />
                    <path d="M 230,210 Q 280,180 300,160" fill="none" strokeWidth="6" stroke="#1d140e" opacity={treeGrowth >= 60 ? 1 : 0} />
                    
                    <path d="M 150,150 Q 100,110 80,90" fill="none" strokeWidth="4.5" stroke="#1d140e" opacity={treeGrowth >= 80 ? 1 : 0} />
                    <path d="M 250,160 Q 300,120 320,105" fill="none" strokeWidth="4.5" stroke="#1d140e" opacity={treeGrowth >= 80 ? 1 : 0} />

                    <path d="M 190,260 Q 140,210 130,190" fill="none" strokeWidth="5.5" stroke="#1d140e" />
                    <path d="M 210,265 Q 260,220 270,195" fill="none" strokeWidth="5.5" stroke="#1d140e" />
                  </g>

                  {/* Leaf Canopy Blobs */}
                  <g opacity="0.8">
                    {/* Main dense center bloom */}
                    <motion.circle cx="200" cy="180" r="45" fill="#047857" opacity="0.85" animate={{ scale: [0.98, 1.02, 0.98] }} transition={{ duration: 7, repeat: Infinity }} />
                    
                    {/* Side blooms (Left, Right) */}
                    <motion.circle cx="140" cy="170" r="38" fill="#059669" opacity="0.8" animate={{ scale: [1.02, 0.98, 1.02] }} transition={{ duration: 8, repeat: Infinity }} />
                    <motion.circle cx="260" cy="170" r="38" fill="#059669" opacity="0.85" animate={{ scale: [0.97, 1.03, 0.97] }} transition={{ duration: 9, repeat: Infinity }} />
                    
                    {/* High canopy blooms */}
                    <motion.circle cx="160" cy="115" r="32" fill="#10B981" opacity="0.75" animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ duration: 6, repeat: Infinity }} />
                    <motion.circle cx="240" cy="120" r="32" fill="#10B981" opacity="0.75" />
                    <circle cx="200" cy="100" r="26" fill="#34D399" opacity="0.8" />
                  </g>

                  {/* Blossoms & Breakthrough Flowers */}
                  {treeSeason === 'blossom' && (
                    <g className="animate-pulse">
                      {/* Left side flower */}
                      <circle cx="110" cy="165" r="7" fill="#FCD34D" />
                      <circle cx="103" cy="165" r="5" fill="#FB923C" />
                      <circle cx="117" cy="165" r="5" fill="#FB923C" />
                      <circle cx="110" cy="158" r="5" fill="#FB923C" />
                      <circle cx="110" cy="172" r="5" fill="#FB923C" />

                      {/* Right top flower */}
                      <circle cx="290" cy="140" r="6" fill="#FCD34D" />
                      <circle cx="284" cy="140" r="4.5" fill="#F59E0B" />
                      <circle cx="296" cy="140" r="4.5" fill="#F59E0B" />
                      <circle cx="290" cy="134" r="4.5" fill="#F59E0B" />
                      <circle cx="290" cy="146" r="4.5" fill="#F59E0B" />

                      {/* Center lower blossom */}
                      <circle cx="190" cy="210" r="5" fill="#FEF08A" />
                      <circle cx="220" cy="190" r="5" fill="#FEF08A" />
                    </g>
                  )}

                  {/* Starlight Constellation Sparkles Overlay */}
                  {treeSeason === 'starlight' && (
                    <g className="animate-pulse">
                      <polygon points="150,90 152,95 157,95 153,98 155,103 150,100 145,103 147,98 143,95 148,95" fill="#FFF" />
                      <polygon points="250,95 252,100 257,100 253,103 255,108 250,105 245,108 247,103 243,100 248,100" fill="#FFF" />
                      <circle cx="200" cy="65" r="3.5" fill="#FEF08A" />
                    </g>
                  )}

                </svg>

                {/* Mini-stats plaque */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 p-3 rounded-2xl flex items-center space-x-3 text-left w-[85%] max-w-[280px]">
                  <div className="text-2xl">🌱</div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Liam's Emotion Tree</span>
                    <span className="text-xs font-sans text-slate-300 font-bold block">Height: {treeGrowth}% • Blossom Phase</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4: KEEPSAKE STORY CARDS SYSTEM
          ========================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030308] relative border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-400/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-amber-300 animate-pulse">
              🏆 NOMINATED FOR APPLE DESIGN AWARD
            </span>
            <h2 className="text-3.5xl md:text-5xl font-display font-light text-white tracking-tight">
              Precious <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300 font-medium">Story Cards</span> Keepsakes
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Every resolved emotional storm generates a digital trading card keepsake. It illustrates their experience as a collectible token of co-regulation history, helping children feel proud and families feel connected.
            </p>
          </div>

          {/* Keepsake Cards Mock Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* ILLUSTRATED CARD 1 */}
            <div className="relative p-1 rounded-[32px] bg-gradient-to-b from-rose-400/30 via-orange-400/10 to-transparent shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-900/90 rounded-[30px] z-0" />
              
              <div className="p-6 relative z-10 flex flex-col justify-between h-[380px] text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>STORY CARD #104</span>
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                  </div>
                  
                  {/* Decorative core illustration placeholder layout */}
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-rose-950/40 to-[#101025] border border-rose-500/20 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl animate-bounce" style={{ animationDuration: '4s' }}>⚡</span>
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:12px_12px]" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-xl font-medium text-white">Storm of Cafeteria Echoes</h4>
                    <span className="text-[10px] font-mono text-rose-300">Overwhelmed • Liam O.</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Felt overwhelming sensory pressure when lunch voices triggered high noise levels. Bypassed speech pressure using his tactile card.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                  <div className="text-slate-500">
                    <span className="block uppercase text-[8px]">Accommodated</span>
                    <strong className="text-emerald-400">Quiet Space Den</strong>
                  </div>
                  <span className="text-amber-400 font-extrabold font-mono text-xs">✨ GOLD RARE</span>
                </div>
              </div>
            </div>

            {/* ILLUSTRATED CARD 2 */}
            <div className="relative p-1 rounded-[32px] bg-gradient-to-b from-emerald-400/30 via-teal-400/10 to-transparent shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-900/90 rounded-[30px] z-0" />
              
              <div className="p-6 relative z-10 flex flex-col justify-between h-[380px] text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>STORY CARD #102</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  
                  {/* Decorative core illustration placeholder layout */}
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#101025] border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl animate-pulse" style={{ animationDuration: '6s' }}>🍃</span>
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:12px_12px]" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-xl font-medium text-white">Quiet Afternoon Moss Clearing</h4>
                    <span className="text-[10px] font-mono text-emerald-300">Calm & Centered • Liam O.</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Classroom desk alignments settled in peaceful co-regulation patterns. Restored tranquility through breathing exercises.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                  <div className="text-slate-500">
                    <span className="block uppercase text-[8px]">Accommodated</span>
                    <strong className="text-emerald-400">Sensory Meadow</strong>
                  </div>
                  <span className="text-emerald-400 font-extrabold font-mono text-xs">🌲 UNCOMMON</span>
                </div>
              </div>
            </div>

            {/* ILLUSTRATED CARD 3 */}
            <div className="relative p-1 rounded-[32px] bg-gradient-to-b from-indigo-400/30 via-sky-400/10 to-transparent shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-900/90 rounded-[30px] z-0" />
              
              <div className="p-6 relative z-10 flex flex-col justify-between h-[380px] text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>STORY CARD #103</span>
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                  </div>
                  
                  {/* Decorative core illustration placeholder layout */}
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-[#101025] border border-indigo-500/20 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl animate-bounce" style={{ animationDuration: '5s' }}>🌧️</span>
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:12px_12px]" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-xl font-medium text-white">Moonlit sanctuary pools</h4>
                    <span className="text-[10px] font-mono text-sky-300">Sad/Low Battery • Liam O.</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Energy cells depleted near lunchtime. Avoided vocal demands, secured peaceful parallel drawing hours, and co-regulated successfully.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                  <div className="text-slate-500">
                    <span className="block uppercase text-[8px]">Accommodated</span>
                    <strong className="text-indigo-400">Time Alone Hour</strong>
                  </div>
                  <span className="text-sky-305 font-extrabold font-mono text-xs">🌕 CO-REGULATED</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onStartExploring}
              className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-mono tracking-widest uppercase text-xs px-8 py-3.5 rounded-2xl shadow-xl transition-all cursor-pointer"
            >
              <span>Build a Personal Card Keepsake Library</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: ENTER SENSORY PORTALS GATEWAY
          ========================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] relative">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-indigo-300">
              ⚡ Sandbox Gateway
            </span>
            <h2 className="text-3.5xl md:text-5xl font-display font-light text-white tracking-tight">
              Enter the Co-Regulation Sandbox
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-sans font-light">
              We provide three custom interfaces designed directly for childrens sensory freedom, comfortable family tracking, and high-support classrooms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* CARD 1: EXPLOER */}
            <div className="p-8 rounded-[36px] bg-[#0c0c1f]/60 backdrop-blur border border-white/5 flex flex-col justify-between h-full hover:border-white/15 hover:shadow-xl transition-all group text-left">
              <div className="space-y-4">
                <span className="text-4xl bg-white/5 h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-3xs">🪐</span>
                <h3 className="font-display font-medium text-xl text-white tracking-tight">
                  Tactile Children Companion
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Liam’s main controller. Interactive emotional constellations, sensory trigger selection as cosmic catalysts, and needs choosing as magic glowing wishing fountains.
                </p>
              </div>
              <button
                onClick={onStartExploring}
                id="portal-btn-companion-celestial"
                className="mt-8 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs flex justify-between items-center hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>Launch Space Sandbox</span>
                <ChevronRight className="h-4 w-4 text-slate-950 stroke-[3]" />
              </button>
            </div>

            {/* CARD 2: PARENTS */}
            <div className="p-8 rounded-[36px] bg-[#0c0c1f]/60 backdrop-blur border border-white/5 flex flex-col justify-between h-full hover:border-white/15 hover:shadow-xl transition-all group text-left">
              <div className="space-y-4">
                <span className="text-4xl bg-white/5 h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-3xs">🏡</span>
                <h3 className="font-display font-medium text-xl text-white tracking-tight">
                  Family & Parents Portal
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Daily logs visual tracking. Home modifications suggestion feed from occupational experts, and coordination with homeroom teachers using keepsake Story Cards.
                </p>
              </div>
              <button
                onClick={onGoToParent}
                id="portal-btn-parent-celestial"
                className="mt-8 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex justify-between items-center border border-white/10 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>Parents Dashboard</span>
                <ChevronRight className="h-4 w-4 text-white stroke-[2]" />
              </button>
            </div>

            {/* CARD 3: TEACHERS */}
            <div className="p-8 rounded-[36px] bg-[#0c0c1f]/60 backdrop-blur border border-white/5 flex flex-col justify-between h-full hover:border-white/15 hover:shadow-xl transition-all group text-left">
              <div className="space-y-4">
                <span className="text-4xl bg-white/5 h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-3xs">🏫</span>
                <h3 className="font-display font-medium text-xl text-white tracking-tight">
                  Teachers Classroom Board
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Educator classroom station. Monitor the growing Classroom Meadow, receive immediate non-verbal alerts, and access immediate school IEP adjustments.
                </p>
              </div>
              <button
                onClick={onGoToTeacher}
                id="portal-btn-teacher-celestial"
                className="mt-8 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex justify-between items-center border border-white/10 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>Teachers Dashboard</span>
                <ChevronRight className="h-4 w-4 text-white stroke-[2]" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 6: INTERACTIVE SACRED PROMISE QUOTE
          ========================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030308] relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-400/20 px-3.5 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#B45309] font-extrabold uppercase">
            Designed for Neurological Dignity
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight leading-tight">
            "We translate silent friction into <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-amber-300 font-semibold">glorious universes of care.</span>"
          </h2>

          <div className="max-w-2xl mx-auto rounded-3xl bg-white/5 p-8 border border-white/10 relative shadow-inner">
            <span className="text-5xl absolute -top-4 -left-2 text-slate-800 select-none font-serif font-black">“</span>
            
            <p className="text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed italic z-20 relative">
              Autistic children do not struggle because they lack emotions. They struggle because our current apps force them to translate deep, complex sensory hurricanes into sterile buttons in the middle of a storm. AMI respects the internal cloud, restoring sensory freedom and co-regulation.
            </p>

            <span className="text-3xl absolute -bottom-10 -right-2 text-slate-800 select-none font-serif font-black">”</span>
          </div>
        </div>
      </section>

    </div>
  );
}
