import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldAlert, Sparkles, CheckCircle2, 
  HelpCircle, Sparkle, Heart, Ear, MessageSquare, Volume2, Globe
} from 'lucide-react';

interface StoryTransitionProps {
  fromTab: string;
  toTab: string;
  onComplete: () => void;
  onCancel?: () => void;
}

export default function StoryTransition({ fromTab, toTab, onComplete, onCancel }: StoryTransitionProps) {
  const [slide, setSlide] = useState<number>(0);

  const getPortalLabel = (tab: string) => {
    if (tab === 'companion') return 'Tactile Companion';
    if (tab === 'parent') return 'Caregiver Dashboard';
    if (tab === 'teacher') return 'Homeroom Board';
    return 'AMI Portal';
  };

  const storySlides = [
    {
      title: "I. The Velvet Static",
      badge: "A child feeling overwhelmed",
      bgClass: "from-neutral-950 via-neutral-950 to-red-950/20",
      accentText: "text-red-400",
      accentBorder: "border-red-500/20",
      accentBg: "bg-red-500/10",
      description: "Meet Liam. He is eight years old. When the classroom volume rises, his nervous system registers the noise like physical pressure. Whispers, scraping chairs, and buzzing lights dissolve into an impenetrable cloud of static. His pulse races, his chest tenses, and the neural pathways hosting spoken language suddenly block. Liam wants to request comfort, but the words cease to exist.",
      meta: "Liam's physical indicators: ⚡ Spoken verbal channels offline • 📈 Heart-rate fluctuations",
      renderArtwork: () => (
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56">
          <defs>
            <radialGradient id="staticChaos" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0B0B0F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#staticChaos)" />
          
          {/* Static particles */}
          <g className="animate-pulse">
            <line x1="40" y1="60" x2="160" y2="140" stroke="#F87171" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="160" y1="60" x2="40" y2="140" stroke="#F87171" strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="70" cy="65" r="2" fill="#EF4444" />
            <circle cx="140" cy="135" r="3" fill="#F43F5E" />
            <circle cx="50" cy="120" r="2" fill="#F59E0B" />
          </g>

          {/* Child's vulnerable silhouette */}
          <g transform="translate(65, 55)">
            <rect x="15" y="15" width="40" height="50" rx="20" fill="#3F3F46" opacity="0.8" />
            <circle cx="35" cy="20" r="16" fill="#FCE7F3" />
            {/* Hands covering ears */}
            <path d="M 12 18 C 12 5, 20 5, 20 18 Z" fill="#F3A8D2" transform="rotate(-15 15 15)" />
            <path d="M 58 18 C 58 5, 50 5, 50 18 Z" fill="#F3A8D2" transform="rotate(15 55 15)" />
            {/* Rapid heart heartbeat signal */}
            <path d="M 28 45 L 32 45 L 34 38 L 37 52 L 40 42 L 42 45 L 47 45" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
          </g>
        </svg>
      )
    },
    {
      title: "II. The Silent Friction",
      badge: "Inadvertent Misunderstanding",
      bgClass: "from-neutral-950 via-neutral-950 to-amber-950/20",
      accentText: "text-amber-400",
      accentBorder: "border-amber-500/20",
      accentBg: "bg-amber-500/10",
      description: "To well-meaning educators and peers, Liam appears to be acting out. He retreats under his desk, pressing his hands strictly against his head. 'Liam, tell me what is wrong!' Ms. Emma asks gently. But the verbal demand feels like an additional threat. Her simple question requires speech-assembly structures Liam's overloaded brain cannot access. His protective silence is mistaken for defiance, compounding the friction.",
      meta: "Ms. Emma's view of behavior: 'Liam is hiding and refuses to speak or participate.'",
      renderArtwork: () => (
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56">
          <defs>
            <radialGradient id="demandForce" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0B0B0F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#demandForce)" />

          {/* Heavy desk structure outline representing isolation bar */}
          <path d="M 30 140 L 170 140 M 50 140 L 50 180 M 150 140 L 150 180" stroke="#4B5563" strokeWidth="5" strokeLinecap="round" />
          
          {/* Liam curled up small */}
          <g transform="translate(75, 138)">
            <circle cx="25" cy="-12" r="12" fill="#FFE4E6" />
            <path d="M 13 -12 C 13 -25, 37 -25, 37 -12" fill="#52525B" />
            <path d="M 12 0 C 12 -15, 38 -15, 38 0 Z" fill="#27272A" />
          </g>

          {/* Adult demanding shadow bubbles pressing down on desktop */}
          <g transform="translate(10, 15)">
            <path d="M 80 40 Q 110 10, 150 20 Q 180 35, 140 60" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="25" y="15" width="105" height="42" rx="12" fill="#1F2937" border="1px solid #374151" />
            <text x="75" y="32" fill="#FBBF24" fontSize="9" fontWeight="extrabold" textAnchor="middle">"WHAT IS WRONG?"</text>
            <text x="75" y="44" fill="#F59E0B" fontSize="7" fontWeight="bold" textAnchor="middle">Tell me using your words.</text>
            <polygon points="120,57 125,65 110,55" fill="#1F2937" stroke="#F59E0B" strokeWidth="0.5" />
          </g>
        </svg>
      )
    },
    {
      title: "III. The Glass Wall",
      badge: "Sufferance of emotional isolation",
      bgClass: "from-neutral-950 via-neutral-950 to-indigo-950/30",
      accentText: "text-indigo-400",
      accentBorder: "border-indigo-500/20",
      accentBg: "bg-indigo-500/10",
      description: "Locked inside his own sensory solar system, Liam feels entirely isolated. He sits in a bright, beautiful classroom full of resources, active teachers, and peers—yet he slides behind a cold, thick glass wall of internal panic. He is physically close to help, but completely out of functional reach. Traditional speech tools offer no rescue, leaving him stranded in deep, silent isolation.",
      meta: "Result of isolation: 🙍‍♂️ Emotional feedback withdrawal • 🌌 Cosmic distance from peers",
      renderArtwork: () => (
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56">
          <defs>
            <radialGradient id="isolationFog" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B0B0F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#isolationFog)" />

          {/* Golden peers castle glowing at a distance */}
          <g transform="translate(140, 40)" opacity="0.4">
            <circle cx="20" cy="20" r="14" fill="#FBBF24" />
            <text x="20" y="24" fontSize="11" textAnchor="middle">🏫</text>
            <circle cx="20" cy="20" r="18" fill="none" stroke="#FBBF24" strokeWidth="0.5" strokeDasharray="2 3" />
          </g>

          {/* Soft glass orb sphere enclosing Liam */}
          <circle cx="75" cy="115" r="36" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.75" />
          <circle cx="75" cy="115" r="32" fill="#1E3A8A" fillOpacity="0.15" />
          
          <g transform="translate(60, 100)">
            {/* Lonely Liam child floating inside orb */}
            <circle cx="15" cy="12" r="8" fill="#FFE4E6" />
            <path d="M 5 28 C 5 20, 25 20, 25 28 Z" fill="#4B5563" />
            {/* Float paths */}
            <path d="M 0 5 L -8 15 Q -12 20 -6 24" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          </g>
          
          <path d="M 125 150 Q 95 105, 125 45" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    },
    {
      title: "IV. The Spanning Light",
      badge: "How communication creates understanding",
      bgClass: "from-neutral-950 via-neutral-900 to-emerald-950/20",
      accentText: "text-emerald-400",
      accentBorder: "border-emerald-500/20",
      accentBg: "bg-emerald-500/10",
      description: "AMI dismantles the glass wall entirely. Instead of demanding speech, we empower Liam to touch a sensory planet card on his gentle child companion device. Instantly, Ms. Emma's board chimes softly under his co-regulation ticket: 'I feel overwhelmed because of loud noise. I need a quiet space.' No verbal demands. Ms. Emma steps over, hands him noise-canceling headphones, and smiles. The isolation dissolves. Liam's emotional garden greens and begins to flourish.",
      meta: "Resolution achieved: 🍃 Classroom trust established • ⚙️ 24h co-regulation loop active",
      renderArtwork: () => (
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56">
          <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          
          {/* Ground */}
          <path d="M 10 160 Q 100 135, 190 160 L 190 200 L 10 200 Z" fill="url(#emeraldGrad)" />

          {/* Growing vibrant flowers blooming directly from soil */}
          <g transform="translate(50, 145)">
            <line x1="0" y1="15" x2="-2" y2="-15" stroke="#34D399" strokeWidth="2.5" />
            <circle cx="-2" cy="-15" r="6" fill="#FBBF24" />
            <circle cx="3" cy="-18" r="3" fill="#FFE082" />
            <circle cx="-7" cy="-12" r="3" fill="#FFE082" />
          </g>
          <g transform="translate(150, 148)">
            <line x1="0" y1="15" x2="3" y2="-20" stroke="#34D399" strokeWidth="2" />
            <circle cx="3" cy="-20" r="7" fill="#A855F7" />
            <circle cx="3" cy="-20" r="3.5" fill="#FFE082" />
          </g>

          {/* Golden bridge spanning down to Liam */}
          <path d="M 50 140 Q 100 60, 150 65" fill="none" stroke="#FBBF24" strokeWidth="3" strokeDasharray="3 3" className="animate-pulse" />
          
          {/* Safe Liam with headphone buffer */}
          <g transform="translate(35, 105)">
            <circle cx="15" cy="12" r="9" fill="#FFE4E6" />
            <path d="M 5 28 C 5 20, 25 20, 25 28 Z" fill="#10B981" />
            {/* Headphones */}
            <path d="M 4 12 A 11 11 0 0 1 26 12" fill="none" stroke="#3B82F6" strokeWidth="3" />
            <circle cx="3" cy="12" r="3.5" fill="#3B82F6" />
            <circle cx="27" cy="12" r="3.5" fill="#3B82F6" />
          </g>

          <g transform="translate(135, 45)">
            {/* Friendly supporting adult avatar card */}
            <rect x="0" y="0" width="30" height="30" rx="10" fill="#047857" stroke="#34D399" strokeWidth="1" />
            <text x="15" y="19" fontSize="12" textAnchor="middle">👩‍🏫</text>
          </g>
        </svg>
      )
    }
  ];

  const activeSlide = storySlides[slide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 text-white font-sans overflow-y-auto"
    >
      {/* Cinematic Starfield Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Dynamic colorful fog matching emotional state */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${activeSlide.bgClass} opacity-80 blur-3xl transition-all duration-1000 -z-10`} />

      <div className="w-full max-w-5xl px-6 py-12 mx-auto flex flex-col justify-between min-h-screen md:min-h-[640px]">
        
        {/* Storytelling Header */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400">
              AMI Narrative Arc: CONNECTING {getPortalLabel(fromTab).toUpperCase()} ➜ {getPortalLabel(toTab).toUpperCase()}
            </span>
          </div>

          {onCancel && (
            <button 
              onClick={onCancel}
              className="text-xs font-bold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              Skip Story
            </button>
          )}
        </div>

        {/* Visual Story Theatre Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center py-10 my-auto">
          
          {/* Narrative description column */}
          <div className="md:col-span-7 space-y-6 text-left">
            <span className={`inline-flex items-center space-x-1.5 rounded-full ${activeSlide.accentBg} ${activeSlide.accentBorder} border px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${activeSlide.accentText} animate-pulse`}>
              <Sparkle className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{activeSlide.badge}</span>
            </span>

            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              {activeSlide.title}
            </h2>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-medium">
              {activeSlide.description}
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-neutral-400 font-bold leading-normal">
              {activeSlide.meta}
            </div>
          </div>

          {/* Cinematic responsive SVG column */}
          <div className="md:col-span-5 flex justify-center py-6 md:py-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0,
                  y: [0, -6, 0] 
                }}
                exit={{ scale: 0.85, opacity: 0, rotate: 3 }}
                transition={{ 
                  scale: { type: "spring", stiffness: 100, damping: 15 },
                  rotate: { type: "spring", stiffness: 100, damping: 15 },
                  opacity: { duration: 0.4 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="p-8 rounded-3xl bg-neutral-900/40 border border-white/10 shadow-2xl relative flex flex-col items-center justify-center max-w-sm w-full min-h-[300px]"
              >
                {/* Floating ambient lights */}
                <div className="absolute top-2 left-3 h-10 w-10 rounded-full bg-white/5 blur-md" />
                <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/5 blur-lg" />
                
                {activeSlide.renderArtwork()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Narrative footer controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/5 font-sans">
          
          {/* Story dots */}
          <div className="flex gap-2">
            {storySlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-white' : 'w-2 bg-neutral-700 hover:bg-neutral-500'}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3.5">
            {slide > 0 && (
              <button
                onClick={() => setSlide(prev => prev - 1)}
                className="text-xs font-bold text-neutral-400 hover:text-white px-4 py-2 bg-white/5 rounded-xl border border-white/5 cursor-pointer"
              >
                Previous Step
              </button>
            )}

            {slide < storySlides.length - 1 ? (
              <button
                onClick={() => setSlide(prev => prev + 1)}
                className="inline-flex items-center space-x-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-extrabold text-xs px-5 py-3.5 transition-all cursor-pointer shadow-md"
              >
                <span>Continue Story</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-950" />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs px-6 py-4 transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
                id="finish-story-button"
              >
                <span>Acknowledge & Connect to {getPortalLabel(toTab)}</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
