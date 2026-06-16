import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Sparkles, BrainCircuit, History, Calendar, 
  TrendingUp, Compass, ChevronDown, CheckCircle2, ShieldAlert,
  HelpCircle, Star, Heart, Activity, Sliders, RefreshCw,
  Flower, CloudRain, Sun, Moon, Flame, AlertCircle, Wind, Info, Eye, Printer, X
} from 'lucide-react';
import { CommunicationLog } from '../types';
import { EMOTIONS } from '../data';

interface ParentDashboardProps {
  logs: CommunicationLog[];
  onAddNoteToLog: (id: string, note: string) => void;
}

export default function ParentDashboard({ logs, onAddNoteToLog }: ParentDashboardProps) {
  const [aiInsights, setAiInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [activeHistoryFilter, setActiveHistoryFilter] = useState<string>("All");
  const [newNotes, setNewNotes] = useState<Record<string, string>>({});
  const [showNoteFormId, setShowNoteFormId] = useState<string | null>(null);
  const [showPassportModal, setShowPassportModal] = useState(false);

  // Compute stats for visualization based on current state of logs
  const emotionDataDict: Record<string, number> = {};
  const triggerDataDict: Record<string, number> = {};
  const weeklyDayDict: Record<string, number> = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0 };

  logs.forEach(log => {
    // Collect Emotion totals
    emotionDataDict[log.emotion] = (emotionDataDict[log.emotion] || 0) + 1;
    // Collect Trigger totals
    triggerDataDict[log.trigger] = (triggerDataDict[log.trigger] || 0) + 1;
    
    // Day of week calculator
    try {
      const date = new Date(log.timestamp);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = days[date.getDay()];
      if (dayName in weeklyDayDict) {
        weeklyDayDict[dayName]++;
      }
    } catch (e) {}
  });

  const emotionChartData = Object.keys(emotionDataDict).map(key => ({
    name: key,
    value: emotionDataDict[key]
  }));

  const triggerChartData = Object.keys(triggerDataDict).map(key => ({
    name: key,
    count: triggerDataDict[key]
  })).sort((a, b) => b.count - a.count);

  const computedTopTrigger = Object.keys(triggerDataDict).length > 0 
    ? Object.keys(triggerDataDict).reduce((a, b) => triggerDataDict[a] > triggerDataDict[b] ? a : b)
    : "Noise";

  const parentNeedDataDict: Record<string, number> = {};
  logs.forEach(log => {
    parentNeedDataDict[log.need] = (parentNeedDataDict[log.need] || 0) + 1;
  });

  const computedTopNeed = Object.keys(parentNeedDataDict).length > 0
    ? Object.keys(parentNeedDataDict).reduce((a, b) => parentNeedDataDict[a] > parentNeedDataDict[b] ? a : b)
    : "Quiet Space";

  // Recharts Pie Colors matching our Emotion Palettes
  const EMOTION_COLORS: Record<string, string> = {
    Happy: '#F59E0B',      // Amber
    Sad: '#38BDF8',        // Sky Blue
    Anxious: '#A855F7',    // Purple/Lavender
    Overwhelmed: '#F97316',// Orange
    Frustrated: '#F43F5E',  // Rose Red
    Calm: '#10B981'        // Emerald Mint
  };

  // Generate customized AI Clinical recommendations
  const generateAIRecommendation = async () => {
    setLoadingInsights(true);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "parent",
          logs: logs.slice(0, 5) // Send the 5 most recent records context
        })
      });
      const data = await response.json();
      if (data.insights) {
        setAiInsights(data.insights);
      } else {
        setAiInsights("Unable to analyze trends dynamically. Please test again shortly.");
      }
    } catch (err) {
      console.error(err);
      setAiInsights("Failed to contact the AMI companion service. Providing warm suggestion.");
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    generateAIRecommendation();
  }, [logs]);

  const handleSaveNote = (logId: string) => {
    const noteText = newNotes[logId] || "";
    if (noteText.trim() === "") return;
    onAddNoteToLog(logId, noteText);
    setNewNotes(prev => ({ ...prev, [logId]: "" }));
    setShowNoteFormId(null);
  };

  const filteredLogs = logs.filter(log => {
    if (activeHistoryFilter === "All") return true;
    return log.emotion === activeHistoryFilter;
  });

  // Calculate high-level summary counts
  const totalEntries = logs.length;
  const sensoryLoadOverwhelmedList = logs.filter(l => l.emotion === "Overwhelmed" || l.emotion === "Anxious");
  const percentSensoryTriggered = totalEntries > 0 ? Math.round((sensoryLoadOverwhelmedList.length / totalEntries) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 text-left space-y-12">
      
      {/* Header section (Stripe Style) */}
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-end md:space-y-0 border-b border-neutral-200/50 pb-8.5">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-500 bg-neutral-100 border border-neutral-150 px-2.5 py-1 rounded inline-block">
            CO-REGULATION SYSTEM ACTIVE
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 font-display mt-2.5">
            Parent Support Portal
          </h1>
          <p className="mt-2 text-sm text-neutral-500 max-w-2xl font-sans leading-relaxed">
            AMI bridges the supportive connection between the home and the homeroom. Track Liam's real-time sensory triggers, register progress notes, and view curated companion suggestions.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowPassportModal(true)}
            className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-xs px-5 py-3.5 rounded-2xl shadow-md transition-all hover:-translate-y-0.5 active:scale-97 cursor-pointer"
          >
            <Award className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>IEP Sensory Passport</span>
          </button>

          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-3.5 rounded-2xl border border-emerald-100/60 shadow-3xs text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Real-time co-regulation sync active</span>
          </div>
        </div>
      </div>

      {/* THREE CARD METRIC ROW */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Metric 1: Total logs */}
        <div className="rounded-[28px] border border-neutral-200/80 bg-white p-7.5 shadow-3xs hover:border-neutral-300 transition-all duration-300">
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">COMMUNICATION PULSE</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
              <Calendar className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black font-display text-neutral-950">{totalEntries}</span>
            <span className="ml-2.5 text-[11px] font-bold text-teal-650 bg-teal-50 px-2 py-0.5 rounded border border-teal-100/40">
              Active Session
            </span>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              Daily logs processed and relayed to classroom educators.
            </p>
          </div>
        </div>

        {/* Metric 2: Sensory overlap */}
        <div className="rounded-[28px] border border-neutral-200/80 bg-white p-7.5 shadow-3xs hover:border-neutral-300 transition-all duration-300">
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">SENSORY OVERHEAD RATIO</span>
            <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-505 border border-rose-100 flex items-center justify-center">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black font-display text-rose-900">{percentSensoryTriggered}%</span>
            <span className="ml-2.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100/30">
              Felt Stress
            </span>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              Requires calming environment adjustments to reduce fatigue.
            </p>
          </div>
        </div>

        {/* Metric 3: Self-advocacy skill status */}
        <div className="rounded-[28px] bg-gradient-to-br from-amber-50 to-orange-50/50 p-7.5 border border-amber-200/40 shadow-3xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-amber-850 uppercase tracking-widest">CLINICAL OBSERVATION</span>
            <Award className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-xs leading-relaxed text-amber-950 font-semibold">
            Liam utilizes the <b>Quiet Space</b> and comfort item cards <b>75% of times</b> when overstimulated. This indicates excellent, independent self-advocacy skill building!
          </p>
          <div className="pt-3.5 border-t border-amber-250/20 flex items-center space-x-1.5 mt-4">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-100" />
            <span className="text-[10px] text-amber-900 font-extrabold uppercase tracking-wide">
              PROVER THERAPEUTIC OUTCOME
            </span>
          </div>
        </div>

      </div>

      {/* EMOTIONAL WELLBEING GARDEN DECK */}
      <div className="rounded-[40px] bg-gradient-to-b from-[#EDF4FF] via-[#F4F9FF] to-[#ECFDF5] border border-neutral-200/60 p-8 shadow-xl text-left relative overflow-hidden transition-all duration-300">
        {/* Subtle decorative background sparkles */}
        <div className="absolute top-10 right-1/4 h-24 w-24 rounded-full bg-amber-200/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-emerald-200/20 blur-2xl pointer-events-none" />

        {/* Garden controls and metadata headers */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-neutral-200/70 pb-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">BIOMETRIC GARDEN ORBIT</span>
            </div>
            <h3 className="text-2xl font-black text-neutral-950 font-display">
              Liam's Emotional Wellbeing Garden
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-xl">
              Every self-reported card below is planted as an organic co-regulation seed. Watch the flora mature over time depending on Liam's daily emotional states.
            </p>
          </div>

          {/* Timeframe Slider - "Garden evolves over time" constraint */}
          <div className="flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-3xs p-2 rounded-2xl border border-neutral-200 shadow-3xs">
            <span className="text-xs font-bold text-neutral-500 px-2 inline-flex items-center gap-1">
              <Sliders className="h-3.5 w-3.5 text-neutral-400" />
              <span>Time Horizon:</span>
            </span>
            {[
              { label: "Whole Week", value: "all" },
              { label: "Last 3 Days", value: "3days" },
              { label: "Past 24h", value: "24h" }
            ].map(horizon => {
              const isActive = (activeHistoryFilter === horizon.value || (horizon.value === "all" && activeHistoryFilter === "All"));
              return (
                <button
                  key={horizon.value}
                  onClick={() => setActiveHistoryFilter(horizon.value === "all" ? "All" : horizon.value)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-neutral-950 text-white shadow-3xs' 
                      : 'hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {horizon.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN GARDEN LAYOUT CONTENT WITH GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* THE SVG MEADOW INTERACTIVE VIEWPORT (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl bg-gradient-to-b from-sky-100/70 via-[#F3F4F6]/40 to-emerald-50/60 border border-neutral-200 p-6 shadow-sm relative overflow-hidden min-h-[460px]">
            {/* Atmospheric Sky Backdrop Accessories depending on weather */}
            <div className="absolute top-4 left-6 pointer-events-none">
              {logs.length > 0 && (logs[logs.length - 1].emotion === 'Happy' || logs[logs.length - 1].emotion === 'Calm') ? (
                <div className="flex items-center gap-2">
                  <Sun className="h-8 w-8 text-amber-500 animate-spin" style={{ animationDuration: '40s' }} />
                  <span className="text-[10px] font-mono text-amber-700/80 font-bold uppercase tracking-wider">Sunshine microclimate active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CloudRain className="h-8 w-8 text-indigo-400 animate-bounce" style={{ animationDuration: '6s' }} />
                  <span className="text-[10px] font-mono text-indigo-700/80 font-bold uppercase tracking-wider">Nourishing raindrops active</span>
                </div>
              )}
            </div>

            {/* Empty State warning if no logs planted */}
            {logs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <Flower className="h-14 w-14 text-neutral-300 animate-bounce mb-3" />
                <h4 className="text-base font-black text-neutral-955 font-display">Tender Meadow in Standby</h4>
                <p className="text-xs text-neutral-495 max-w-xs mt-1">This digital canvas is readied with nutritious organic fertile soil. Once classroom logs stream in, your emotional plants will self-assemble.</p>
              </div>
            ) : (
              <div className="relative flex-1 flex flex-col justify-end">
                {/* SVG Visual Garden Engine */}
                <svg viewBox="0 0 740 340" className="w-full h-full max-h-[360px]" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="35%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#065F46" />
                    </linearGradient>
                    <linearGradient id="wetPuddle" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>

                  {/* Gentle grass hills layer */}
                  <path d="M -10 290 Q 180 250, 370 280 T 750 270 L 750 350 L -10 350 Z" fill="url(#groundGrad)" opacity="0.9" />
                  <path d="M -10 305 Q 240 280, 480 305 T 750 295 L 750 350 L -10 350 Z" fill="url(#groundGrad)" className="brightness-95" />

                  {/* Map the dynamic log plants onto meadow coordinates under timeframe filters */}
                  {logs
                    .filter(log => {
                      if (activeHistoryFilter === "All") return true;
                      if (activeHistoryFilter === "3days") {
                        const daysAgo = new Date();
                        daysAgo.setDate(daysAgo.getDate() - 3);
                        return new Date(log.timestamp) >= daysAgo;
                      }
                      if (activeHistoryFilter === "24h") {
                        const dayAgo = new Date();
                        dayAgo.setHours(dayAgo.getHours() - 24);
                        return new Date(log.timestamp) >= dayAgo;
                      }
                      return log.emotion === activeHistoryFilter;
                    })
                    .slice(-8) // Max 8 beautifully rendering plants spaced nicely
                    .map((log, index, filteredList) => {
                      const totalCount = filteredList.length;
                      const x = totalCount === 1 ? 370 : 80 + (index * ((740 - 160) / (totalCount - 1 || 1)));
                      const y = 290 + Math.sin(x / 90) * 8; // Perfectly aligned to rolling ground curve
                      const isHovered = showNoteFormId === log.id;

                      return (
                        <motion.g 
                          key={log.id} 
                          initial={{ scale: 0, y: 30 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.05 }}
                          whileHover={{ scale: 1.12 }}
                          className="cursor-pointer group/plant"
                          onClick={() => setShowNoteFormId(log.id)}
                          style={{ transformOrigin: `${x}px ${y}px` }}
                        >
                          {/* Pulsing interactive base glow */}
                          <circle cx={x} cy={y} r={isHovered ? 24 : 12} fill={
                            log.emotion === 'Happy' ? '#F59E0B' :
                            log.emotion === 'Calm' ? '#10B981' :
                            log.emotion === 'Sad' ? '#38BDF8' :
                            log.emotion === 'Anxious' ? '#A855F7' :
                            log.emotion === 'Overwhelmed' ? '#EA580C' : '#F43F5E'
                          } opacity={isHovered ? 0.25 : 0.08} className="animate-pulse" />

                          {/* Hover highlight halo indicator */}
                          <circle cx={x} cy={y} r="6" fill="#FFFFFF" className="opacity-0 group-hover/plant:opacity-75 transition-opacity" />

                          {/* PLANT RENDERING CONDITIONS ACCORDING TO EMOTION TYPES */}
                          {/* 1. HAPPY (Sunshine Flower) */}
                          {log.emotion === 'Happy' && (
                            <g transform={`translate(${x}, ${y - 65})`}>
                              {/* Stem */}
                              <path d="M 0 65 Q -8 35, 0 0" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                              <path d="M 0 45 Q 12 30, 8 25" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                              {/* Solar petals surrounding */}
                              <circle cx="0" cy="0" r="16" fill="#FBBF24" />
                              <g className="animate-spin" style={{ transformOrigin: '0px 0px', animationDuration: '20s' }}>
                                <circle cx="0" cy="-16" r="4.5" fill="#F59E0B" />
                                <circle cx="0" cy="16" r="4.5" fill="#F59E0B" />
                                <circle cx="-16" cy="0" r="4.5" fill="#F59E0B" />
                                <circle cx="16" cy="0" r="4.5" fill="#F59E0B" />
                                <circle cx="-11" cy="-11" r="3.5" fill="#D97706" />
                                <circle cx="11" cy="11" r="3.5" fill="#D97706" />
                                <circle cx="11" cy="-11" r="3.5" fill="#D97706" />
                                <circle cx="-11" cy="11" r="3.5" fill="#D97706" />
                              </g>
                              <circle cx="0" cy="0" r="10" fill="#FFE082" />
                            </g>
                          )}

                          {/* 2. CALM (Gentle Meadow Fern) */}
                          {log.emotion === 'Calm' && (
                            <g transform={`translate(${x}, ${y - 60})`}>
                              {/* Tall mint green organic stem branch */}
                              <path d="M 0 60 Q 5 25, 3 0" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                              {/* Delicate organic compound leaves */}
                              <path d="M 2 15 C 10 10, 15 15, 2 28" fill="#34D399" opacity="0.9" />
                              <path d="M 3 35 C 12 30, 16 38, 3 48" fill="#34D399" opacity="0.9" />
                              <path d="M -1 22 C -10 16, -14 24, -1 32" fill="#059669" opacity="0.9" />
                              <path d="M -1 42 C -12 36, -15 44, -1 52" fill="#059669" opacity="0.9" />
                              <circle cx="2" cy="0" r="5" fill="#A7F3D0" />
                              {/* Calm floaty sparkle */}
                              <circle cx="8" cy="-5" r="1.5" fill="#34D399" className="animate-ping" style={{ animationDuration: '3s' }} />
                            </g>
                          )}

                          {/* 3. SAD (Drooping Celestial Moonflower) */}
                          {log.emotion === 'Sad' && (
                            <g transform={`translate(${x}, ${y - 50})`}>
                              {/* Drooping blue bell stem */}
                              <path d="M 0 50 Q -15 25, -5 0 Q 2 -10, 12 -2" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                              {/* Weeping Bell Blossom looking down */}
                              <g transform="translate(11, -2) rotate(45)">
                                <path d="M -6 0 C -12 -12, 12 -12, 6 0 L 10 15 C 8 18, -8 18, -10 15 Z" fill="#7DD3FC" />
                                <circle cx="0" cy="14" r="3" fill="#0284C7" />
                              </g>
                              {/* Tiny teardrop dew pool at base */}
                              <ellipse cx="2" cy="46" rx="8" ry="2" fill="url(#wetPuddle)" opacity="0.7" />
                            </g>
                          )}

                          {/* 4. ANXIOUS (Swirling Purple Storm Sprout) */}
                          {log.emotion === 'Anxious' && (
                            <g transform={`translate(${x}, ${y - 55})`}>
                              {/* Spiral lilac vine representing nervous mental energy */}
                              <path d="M 0 55 T -5 35 T 5 20 T 0 0" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
                              {/* Tender buds huddled together tightly */}
                              <circle cx="0" cy="0" r="6.5" fill="#D8B4FE" />
                              <circle cx="-5" cy="5" r="4.5" fill="#C084FC" />
                              <circle cx="5" cy="5" r="4.5" fill="#C084FC" />
                              {/* Local tiny shielding mist above */}
                              <path d="M -12 -18 C -18 -18, -18 -26, -10 -26 C -6 -26, -4 -22, -2 -22 C 2 -22, 6 -18, 2 -15 Z" fill="#E9D5FF" opacity="0.6" className="animate-bounce" style={{ animationDuration: '4s' }} />
                            </g>
                          )}

                          {/* 5. OVERWHELMED (Deep Wave Lotus Root) */}
                          {log.emotion === 'Overwhelmed' && (
                            <g transform={`translate(${x}, ${y - 45})`}>
                              {/* Short dense stem */}
                              <path d="M 0 45 Q 8 25, 0 0" fill="none" stroke="#EA580C" strokeWidth="3" />
                              {/* Rippled blue puddle at base */}
                              <ellipse cx="3" cy="42" rx="14" ry="3.5" fill="#93C5FD" opacity="0.8" className="animate-pulse" />
                              {/* Dynamic water lily/lotus petals colliding wave details */}
                              <path d="M -14 0 C -10 -15, 10 -15, 14 0 C 8 8, -8 8, -14 0 Z" fill="#F97316" />
                              <path d="M -8 -4 C -5 -18, 5 -18, 8 -4 C 4 2, -4 2, -8 -4 Z" fill="#EF4444" />
                              <circle cx="0" cy="-3" r="3.5" fill="#FDE047" />
                            </g>
                          )}

                          {/* 6. FRUSTRATED (Obsidian Lava Shoot) */}
                          {log.emotion === 'Frustrated' && (
                            <g transform={`translate(${x}, ${y - 48})`}>
                              {/* Cone volcano shaped clay stalk */}
                              <path d="M -10 48 L -2 0 L 2 0 L 10 48 Z" fill="#4B5563" stroke="#F43F5E" strokeWidth="1" />
                              {/* Erupting magma crown with peaceful yellow dust */}
                              <ellipse cx="0" cy="0" rx="4" ry="1.5" fill="#EF4444" />
                              <circle cx="0" cy="-6" r="3.5" fill="#F43F5E" className="animate-bounce" />
                              <circle cx="-5" cy="-12" r="1.5" fill="#FBBF24" opacity="0.7" className="animate-pulse" />
                              <circle cx="6" cy="-16" r="2" fill="#FBBF24" opacity="0.8" />
                            </g>
                          )}

                          {/* Little identifier tag above plant on active selection */}
                          {isHovered && (
                            <g transform="translate(0, -90)">
                              <rect x="-35" y="-12" width="70" height="18" rx="6" fill="#171717" />
                              <text x="0" y="0" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                                {log.emotion.toUpperCase()} STATE
                              </text>
                            </g>
                          )}
                        </motion.g>
                      );
                    })}
                </svg>
              </div>
            )}

            {/* Interactive hint footer */}
            <div className="pt-4 border-t border-neutral-200/50 flex flex-wrap justify-between items-center text-[10px] text-neutral-450 font-medium">
              <span>✦ Hover or tap any emotional seedling to load the corresponding journal capsule notes</span>
              <span className="font-mono text-[9px] bg-white/70 px-2 py-0.5 rounded border border-neutral-200/50">Ecosystem Size: {logs.slice(-10).length} Stalks</span>
            </div>
          </div>

          {/* THE FLOURISHING PANEL SIDEBAR (4 Columns) - Apple/Pixar Insight Core */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* 1. GARDEN STATUS SCOREBOARD */}
            <div className="rounded-2xl bg-white border border-neutral-250/60 p-5 shadow-3xs space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 block border-b border-neutral-100 pb-2">
                ACTIVE BIOME STATISTICS
              </span>

              <div className="space-y-3">
                {/* Seedling types ratio summary bars */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Positive Florals:</span>
                  </span>
                  <span className="text-xs font-extrabold text-neutral-900 font-mono">
                    {logs.filter(l => l.emotion === 'Happy' || l.emotion === 'Calm').length} planted
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    <span>Nourishing Water Stalks:</span>
                  </span>
                  <span className="text-xs font-extrabold text-neutral-900 font-mono">
                    {logs.filter(l => l.emotion === 'Sad' || l.emotion === 'Overwhelmed').length} planted
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Resilient Storm Sprouts:</span>
                  </span>
                  <span className="text-xs font-extrabold text-neutral-900 font-mono">
                    {logs.filter(l => l.emotion === 'Anxious' || l.emotion === 'Frustrated').length} planted
                  </span>
                </div>
              </div>

              {/* Dynamic Soil Health Progress Meter */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-neutral-700">Garden Flourishing Index:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">
                    {logs.length > 0 
                      ? Math.round(((logs.filter(l => l.emotion === 'Happy' || l.emotion === 'Calm').length) / logs.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 transition-all duration-500" 
                    style={{ 
                      width: `${logs.length > 0 ? Math.max(15, Math.round(((logs.filter(l => l.emotion === 'Happy' || l.emotion === 'Calm').length) / logs.length) * 100)) : 0}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. THE FLOATING INTERACTIVE MEMORY CAPSULE CARD */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-950 to-neutral-950 p-5 text-white shadow-md relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Grid overlay */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="space-y-3.5 relative z-10 text-left">
                <span className="text-[9px] font-mono tracking-widest text-[#818CF8] font-bold uppercase block border-b border-white/10 pb-2">
                  EXPLODING CO-REGULATION MEMORY CAPSULE
                </span>

                {showNoteFormId && logs.find(l => l.id === showNoteFormId) ? (() => {
                  const focusedLog = logs.find(l => l.id === showNoteFormId)!;
                  return (
                    <div className="space-y-3 animate-fadeIn duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold bg-[#818CF8]/10 text-[#A5B4FC] px-2.5 py-1 rounded-lg border border-[#818CF8]/20">
                          ✦ Seed {focusedLog.emotion} State
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {new Date(focusedLog.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <p className="text-[13px] font-medium leading-relaxed italic text-white/90">
                        "{focusedLog.message}"
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-white/10 text-left">
                        <p className="text-[10px] text-white/60">
                          <b className="text-[#818CF8]">Primary Stress Trigger:</b> {focusedLog.trigger}
                        </p>
                        <p className="text-[10px] text-white/60">
                          <b className="text-teal-400">Classroom Support Need:</b> {focusedLog.need}
                        </p>
                      </div>

                      {focusedLog.notes && (
                        <div className="bg-white/5 border border-white/5 p-2 rounded-lg text-[11px] text-white/80 leading-relaxed italic">
                          ✍️ {focusedLog.notes}
                        </div>
                      )}
                    </div>
                  );
                })() : (
                  <div className="text-center py-6 text-white/30 space-y-2">
                    <Compass className="h-8 w-8 text-white/20 mx-auto animate-pulse" />
                    <p className="text-xs leading-relaxed max-w-[200px] mx-auto font-medium">
                      Select or hover over any emotional seedling inside the garden on the left to unlock Liam's core verbal thoughts.
                    </p>
                  </div>
                )}
              </div>

              {showNoteFormId && (
                <div className="pt-4 mt-4 border-t border-white/5 flex justify-end">
                  <a 
                    href="#btn-parent-reanalyze"
                    className="text-[10px] font-bold text-[#818CF8]/90 hover:text-white transition-all flex items-center gap-1"
                    onClick={() => {
                      const el = document.getElementById(showNoteFormId);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Inspect note below</span>
                    <Info className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* CLINICAL RECOMMENDATIONS (Highly premium Headspace aesthetic) */}
      <div className="rounded-[36px] bg-gradient-to-tr from-[#FAF5FF] via-white to-[#F0F9FF] p-8 md:p-12 border border-white shadow-xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-gradient-to-bl from-purple-100 to-sky-100 opacity-20 blur-2xl" />
        
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950 text-white shadow-lg shadow-indigo-150">
              <BrainCircuit className="h-5.5 w-5.5 text-sky-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-950 font-display">
                Therapist-Curated Neurodiversity Insights
              </h2>
              <p className="text-xs text-indigo-700 font-semibold uppercase tracking-wider">
                Custom clinic rules and active sensory recommendations
              </p>
            </div>
          </div>

          <button
            id="btn-parent-reanalyze"
            onClick={generateAIRecommendation}
            disabled={loadingInsights}
            className="rounded-2xl bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold px-6 py-4.5 transition-all active:scale-97 cursor-pointer shadow-md inline-flex items-center space-x-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingInsights ? 'animate-spin' : ''}`} />
            <span>{loadingInsights ? 'Recalibrating Trends...' : 'Refresh Insights'}</span>
          </button>
        </div>

        {loadingInsights ? (
          <div className="space-y-4 py-8">
            <div className="h-5 bg-neutral-100 rounded-lg animate-pulse w-3/4" />
            <div className="h-4.5 bg-neutral-50 animate-pulse rounded-lg w-full" />
            <div className="h-4.5 bg-neutral-50 animate-pulse rounded-lg w-5/6" />
            <div className="h-4.5 bg-neutral-50 animate-pulse rounded-lg w-2/3" />
          </div>
        ) : (
          <div className="rounded-[28px] bg-white p-6.5 sm:p-8 border border-neutral-150 shadow-2xs space-y-6">
            {aiInsights ? (
              <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
                {aiInsights.split('\n\n').map((paragraph, pi) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={pi} className="text-base font-black text-indigo-950 uppercase tracking-widest flex items-center space-x-2 border-b border-neutral-100 pb-2 mt-6 first:mt-0">
                        <Sparkles className="h-4.5 w-4.5 text-purple-600 shrink-0" />
                        <span>{paragraph.replace('###', '').trim()}</span>
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={pi} className="list-disc pl-5 mt-3 space-y-2.5 text-[13px] leading-relaxed font-semibold text-neutral-600">
                        {paragraph.split('\n').map((li, liKey) => (
                          <li key={liKey} className="pl-1">
                            {li.replace('-', '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p 
                      key={pi} 
                      className="text-[13px] font-semibold leading-relaxed text-neutral-600" 
                      dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<b class="text-neutral-900">$1</b>') }} 
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-neutral-400 text-xs italic text-center">Your co-regulation data has not returned static suggestions. Click refresh.</p>
            )}
          </div>
        )}
      </div>

      {/* DIARY LOGS AND HISTORY FEED */}
      <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-3xs text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-100 pb-5 mb-8 gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-neutral-950 font-display">
              AMI Observation Journal
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Map family updates alongside Liam's shared communication cards.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['All', 'Happy', 'Sad', 'Anxious', 'Overwhelmed', 'Frustrated', 'Calm'].map(emojiFilter => {
              const isSelected = activeHistoryFilter === emojiFilter;
              return (
                <button
                  key={emojiFilter}
                  onClick={() => setActiveHistoryFilter(emojiFilter)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-neutral-950 text-white shadow-3xs' 
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {emojiFilter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 rounded-[24px] border border-dashed border-neutral-200">
              <ShieldAlert className="h-10 w-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-bold">No registered communication cards match your filters.</p>
            </div>
          ) : (
            filteredLogs.map(log => {
              const emotionObj = EMOTIONS.find(e => e.id === log.emotion);
              return (
                <div 
                  key={log.id} 
                  className="rounded-[24px] border border-neutral-150/80 bg-[#FAF8F5]/30 hover:bg-[#FAF8F5]/60 p-6 transition-all duration-300 shadow-3xs"
                >
                  <div className="flex flex-col justify-between md:flex-row md:items-start gap-4">
                    <div className="space-y-4 flex-1">
                      
                      {/* Interactive meta tag labels */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center space-x-1.5 rounded-xl bg-white border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-800 shadow-3xs">
                          <span>{emotionObj?.emoji}</span>
                          <span>{log.emotion}</span>
                        </span>

                        <span className="text-[10px] text-neutral-400 font-bold bg-neutral-100 px-2 py-1 rounded">
                          {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>

                        <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wide bg-purple-50 px-2.5 py-1 rounded border border-purple-105">
                          Trig: {log.trigger}
                        </span>

                        <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wide bg-teal-50 px-2.5 py-1 rounded border border-teal-105">
                          Need: {log.need}
                        </span>
                      </div>

                      {/* Calming verbatim quote */}
                      <blockquote className="text-neutral-900 font-bold text-base md:text-lg pl-4.5 border-l-3 border-sky-400 text-left pointer-events-none">
                        "{log.message}"
                      </blockquote>

                      {/* Parent Diary Observation notes */}
                      {log.notes && (
                        <div className="bg-purple-50/50 border border-purple-100 p-4.5 rounded-2xl text-left shadow-3xs">
                          <span className="text-[10px] font-black uppercase text-purple-650 block mb-1">Caregiver Progress Diary Note:</span>
                          <p className="text-xs text-neutral-700 font-semibold leading-relaxed">{log.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Manage notes button */}
                    <div className="shrink-0 self-start">
                      {showNoteFormId !== log.id ? (
                        <button
                          onClick={() => setShowNoteFormId(log.id)}
                          className="rounded-xl border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 px-4.5 py-2.5 text-xs font-bold text-neutral-600 transition-all cursor-pointer"
                        >
                          {log.notes ? 'Edit Progress Note' : 'Add Progress Note'}
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowNoteFormId(null)}
                          className="rounded-xl bg-neutral-100 text-xs font-bold text-neutral-500 px-4.5 py-2.5 hover:bg-neutral-150 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notes collapsible edit manager */}
                  {showNoteFormId === log.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 p-5.5 rounded-22 bg-white border border-neutral-200 flex flex-col space-y-4 shadow-3xs"
                    >
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-left">
                        Identify supportive triggers, coping toys, or environments used:
                      </label>
                      <textarea
                        rows={3}
                        value={newNotes[log.id] || log.notes || ""}
                        placeholder="e.g., Liam squeezed his weighted dinosaur. Sound headphones were critical during dinner. He felt co-regulated after 4 minutes."
                        onChange={(e) => setNewNotes(prev => ({ ...prev, [log.id]: e.target.value }))}
                        className="w-full rounded-xl border border-neutral-200 p-3 text-xs focus:border-neutral-400 focus:outline-hidden font-bold"
                      />
                      <button
                        onClick={() => handleSaveNote(log.id)}
                        className="self-end rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs px-5 py-3 cursor-pointer shadow-sm transition-all"
                      >
                        Commit Diary Note
                      </button>
                    </motion.div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Dynamic Modal for IEP Sensory Passport */}
      <AnimatePresence>
        {showPassportModal && (
          <div className="fixed inset-0 z-55 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-8 md:p-10 shadow-2xl border border-neutral-200 relative overflow-hidden"
            >
              {/* Top Action Header */}
              <div className="flex justify-between items-center pb-5 border-b border-neutral-100 gap-4 mb-6 print:hidden">
                <div className="flex items-center space-x-2">
                  <Award className="h-5.5 w-5.5 text-purple-600" />
                  <h3 className="text-lg font-extrabold text-neutral-950 font-display">
                    IEP Accommodations Passport Plan
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center space-x-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Passport</span>
                  </button>
                  <button
                    onClick={() => setShowPassportModal(false)}
                    className="bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 h-9 w-9 rounded-xl flex items-center justify-center border border-neutral-200 transition-all cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* The Passport Sheet */}
              <div id="sensory-passport-print-area" className="space-y-6 text-left font-sans">
                {/* Header Passport Block */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-neutral-950 pb-5">
                  <div>
                    <span className="text-[9px] font-mono font-black tracking-widest text-indigo-650 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded uppercase">
                      AMI Sensory Profile
                    </span>
                    <h2 className="text-2xl font-black font-display text-neutral-950 tracking-tight mt-1">
                      Liam O'Connor
                    </h2>
                    <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                      Age: 8 • Grade: Primary Hub (Block 2-B) • Assessment: Sensory Processing Passport
                    </p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] font-mono text-neutral-400 font-bold block">EFFECTIVE DATE</span>
                    <span className="text-xs font-extrabold text-neutral-900 font-mono">June 15, 2026</span>
                  </div>
                </div>

                {/* Sub-block of Biometrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#FAF8F5] border border-neutral-150 p-4">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">FLOURISHING INDEX</span>
                    <p className="text-xl font-extrabold text-emerald-700 mt-1 font-mono">
                      {totalEntries > 0 ? Math.round(((logs.filter(l => l.emotion === 'Happy' || l.emotion === 'Calm').length) / totalEntries) * 100) : 100}%
                    </p>
                    <p className="text-[10px] text-neutral-550 mt-1 leading-normal font-semibold">Safe neural state ratio</p>
                  </div>

                  <div className="rounded-2xl bg-[#FAF8F5] border border-neutral-150 p-4">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">PRIMARY SENSORY TRIGGER</span>
                    <p className="text-base font-extrabold text-purple-700 mt-1 font-display truncate">
                      ⚠️ {computedTopTrigger}
                    </p>
                    <p className="text-[10px] text-neutral-550 mt-1 leading-normal font-semibold font-sans">Flagged on homeroom tickets</p>
                  </div>

                  <div className="rounded-2xl bg-[#FAF8F5] border border-neutral-150 p-4">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">RECOMMENDED ACCOMMODATION</span>
                    <p className="text-base font-extrabold text-[#0D9488] mt-1 font-display truncate">
                      🍃 {computedTopNeed}
                    </p>
                    <p className="text-[10px] text-neutral-550 mt-1 leading-normal font-semibold font-sans">Primary calming response need</p>
                  </div>
                </div>

                {/* Clinical Calibrator Accordance guidelines */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-1.5">
                    Authorized Class Accommodations Plan
                  </h4>
                  <ul className="space-y-2 text-xs leading-relaxed text-neutral-600 font-semibold pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-0.5">✦</span>
                      <span><b>Acoustic Shield Buffers:</b> Noise-canceling headphones allowed on desk during transitions, assembly, recess shifts, or any high dB audio cycles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-0.5">✦</span>
                      <span><b>Sensory Escape Ticket:</b> Pre-approved, non-verbal corridor transit pass to exit Block-B quiet room for 5-minute wind down on active button request.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-0.5">✦</span>
                      <span><b>Coping Item Proximity:</b> Keeping a silent anxiety stress squeeze toy or textured comfort dinosaur accessible at Liam's station.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-0.5">✦</span>
                      <span><b>Processing Lag Allowance:</b> Give at least 15 seconds of silent wait-time after asking a thoughtful question, without forcing continuous verbal speed.</span>
                    </li>
                  </ul>
                </div>

                {/* Legal and Therapeutic Sign-off blocks */}
                <div className="pt-6 border-t border-dashed border-neutral-200 grid grid-cols-3 gap-4 mt-8">
                  <div className="space-y-4">
                    <div className="border-b border-neutral-300 h-6" />
                    <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider text-center">PARENT/GUARDIAN SIGNATURE</p>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-neutral-300 h-6" />
                    <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider text-center">HOMEROOM TEACHER SIGNATURE</p>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-neutral-300 h-6" />
                    <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider text-center">LICENSED O.T. SIGNATURE</p>
                  </div>
                </div>

                <div className="pt-4 text-center text-[9px] font-mono text-neutral-500">
                  <span>AMI Secure Supportive Companion • Fully Private & Caring Space</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
