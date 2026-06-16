import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  School, Bell, CircleCheck, CheckCircle, Flame, 
  MapPin, HelpCircle, Activity, Sparkles, ChevronRight, Check,
  RefreshCw, Users, ShieldAlert, Heart, Sun, CloudRain, Flower
} from 'lucide-react';
import { CommunicationLog } from '../types';
import { EMOTIONS } from '../data';

interface TeacherDashboardProps {
  logs: CommunicationLog[];
  onMarkReadTeacher: (id: string) => void;
}

export default function TeacherDashboard({ logs, onMarkReadTeacher }: TeacherDashboardProps) {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unresolved'>('unresolved');
  const [aiTeacherReport, setAiTeacherReport] = useState<string>("");
  const [loadingReport, setLoadingReport] = useState(false);

  // Compile active student list
  const students = [
    { name: 'Liam O.', grade: 'Class 2-B', status: 'In Class', lastFeeling: 'Calm', emoji: '🍃', healthIndex: 92 },
    { name: 'Chloe M.', grade: 'Class 2-B', status: 'Sensory Room', lastFeeling: 'Happy', emoji: '☀️', healthIndex: 85 },
    { name: 'Aiden T.', grade: 'Class 2-B', status: 'In Class', lastFeeling: 'Overwhelmed', emoji: '⚡', healthIndex: 65 },
    { name: 'Emma K.', grade: 'Class 2-B', status: 'Speech Therapy', lastFeeling: 'Calm', emoji: '🍃', healthIndex: 88 }
  ];

  // Daily classroom entry trends for the area chart
  const classDailyTrend = [
    { name: 'Mon', Happy: 5, Overwhelmed: 2, Calm: 4, Frustrated: 1 },
    { name: 'Mon (AFT)', Happy: 4, Overwhelmed: 3, Calm: 5, Frustrated: 2 },
    { name: 'Tue', Happy: 6, Overwhelmed: 1, Calm: 6, Frustrated: 0 },
    { name: 'Tue (AFT)', Happy: 4, Overwhelmed: 4, Calm: 4, Frustrated: 3 },
    { name: 'Wed', Happy: 5, Overwhelmed: 2, Calm: 6, Frustrated: 1 },
    { name: 'Thu', Happy: 7, Overwhelmed: 1, Calm: 7, Frustrated: 1 },
    { name: 'Fri', Happy: 5, Overwhelmed: 3, Calm: 5, Frustrated: 2 }
  ];

  // Map of triggers to concrete teacher support recommendations
  const TRIGGER_SUPPORTS: Record<string, { title: string, recommendations: string[] }> = {
    'Noise': {
      title: 'Auditory Overload Protocol (Active)',
      recommendations: [
        'Offer noise-damping sound headphones located in the Blue cubby block.',
        'Allow transition paths 3 minutes before secondary class alarms trigger.',
        'Use flat, whisper dry tones when delivering direct instructions.'
      ]
    },
    'Crowded Space': {
      title: 'Somatic Space Boundaries',
      recommendations: [
        'Assign a dedicated end desk layout near the open classroom walkway.',
        'Use secondary routes (like Outer Courtyard) to access the lunch area.',
        'Designate a desk buddy partner who understands boundary cues.'
      ]
    },
    'Bright Light': {
      title: 'Visual Softening Adjustments',
      recommendations: [
        'Place custom blue tissue-screen sleeves over immediate fluorescence tubes.',
        'Dim ceiling bulbs by 55% during independent silent activities.',
        'Provide a soft bill-cap to reduce direct visual flicker.'
      ]
    },
    'Unexpected Change': {
      title: 'Visual Transition Predictors',
      recommendations: [
        'Update the Classroom Board visual timer before transitions.',
        'Walk directly to child and give a low audit warning ("We have 3 minutes").',
        'Model the transition with a familiar photographic binder guide.'
      ]
    },
    'Communication Difficulty': {
      title: 'Augmentative Voice Supports',
      recommendations: [
        'Present the physical AMI sensory/companion cards directly on their stand desk layout.',
        'Provide multiple-choice tactile cards for simple requests ("water", "washroom").',
        'Give extended pauses (10-15 seconds) for verbal processing loops.'
      ]
    }
  };

  // Default suggestions if no active trigger match is found
  const fallbackSupport = {
    title: 'Baseline Sensory Accommodations',
    recommendations: [
      'Welcome student with a predictable parallel hand wave greetings.',
      'Allow short micro-breaks with heavy-work weighted cushions.',
      'Minimize unexpected sudden sound cues in primary work areas.'
    ]
  };

  // Get active teacher insights report
  const generateTeacherInsights = async () => {
    setLoadingReport(true);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "teacher",
          logs: logs.slice(0, 5)
        })
      });
      const data = await response.json();
      if (data.insights) {
        setAiTeacherReport(data.insights);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReport(false);
    }
  };

  useEffect(() => {
    generateTeacherInsights();
  }, [logs]);

  const handleResolve = (id: string, logTitle: string) => {
    setResolvedIds(prev => [...prev, id]);
    onMarkReadTeacher(id);
  };

  // Filter logs list for educator dashboard
  const filteredRequests = logs.filter(log => {
    const isResolved = resolvedIds.includes(log.id);
    if (activeTab === 'unresolved') {
      return !isResolved && !log.isReadByTeacher;
    }
    return true; // Show all
  });

  // Pick top active stress trigger in current class logs
  const leadingClassStress = logs.find(l => l.emotion === 'Overwhelmed' || l.emotion === 'Frustrated' || l.emotion === 'Anxious')?.trigger || 'None';
  const classroomSupports = TRIGGER_SUPPORTS[leadingClassStress] || fallbackSupport;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 text-left space-y-12">
      
      {/* Header section (Stripe/Linear Inspired) */}
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-end md:space-y-0 border-b border-neutral-200/50 pb-8.5">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded inline-block">
            EDUCATOR CARE COMPANION
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 font-display mt-2.5">
            Teacher Dashboard
          </h1>
          <p className="mt-2 text-sm text-neutral-500 max-w-2xl font-sans leading-relaxed">
            Support neurodiverse learning tracks with sensory checklists, active co-regulation cards, and expert classroom accommodations.
          </p>
        </div>
        
        <div className="inline-flex items-center space-x-3 bg-indigo-50 border border-indigo-150 rounded-2xl px-5 py-3 shadow-3xs text-xs font-bold">
          <School className="h-5 w-5 text-indigo-550" />
          <div>
            <p className="font-extrabold text-indigo-950">Room 2-B Active</p>
            <p className="text-[9px] text-indigo-650 font-bold uppercase tracking-wider">PRIMARY HOMEROOM</p>
          </div>
        </div>
      </div>

      {/* TWO PANEL CLASS OVERVIEW GRID */}
      <div className="grid gap-6 md:grid-cols-12">
        
        {/* Left Side: Student tracker dashboard */}
        <div className="md:col-span-8 rounded-[32px] border border-neutral-200/80 bg-white p-8 shadow-3xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-neutral-950 font-display flex items-center space-x-2.5">
              <Activity className="h-5 w-5 text-indigo-500 animate-pulse" />
              <span>Sensory Care Ledger</span>
            </h3>
            <span className="text-[10px] bg-neutral-50 border border-neutral-150 text-neutral-500 px-2.5 py-1 rounded-md font-bold uppercase tracking-widest">
              4 IEP student profiles
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {students.map((student, i) => {
              const isLiam = student.name.startsWith('Liam');
              const activeFeeling = isLiam && logs.length > 0 ? logs[0].emotion : student.lastFeeling;
              const activeEmoji = isLiam && logs.length > 0 ? EMOTONS_MAPPING[logs[0].emotion] || '🍃' : student.emoji;

              return (
                <div key={i} className="flex items-center justify-between p-4.5 rounded-2xl border border-neutral-150/55 bg-neutral-50/20 hover:border-sky-200 transition-all">
                  <div className="flex items-center space-x-3.5">
                    <div className="h-11 w-11 rounded-xl bg-white border border-neutral-200 shadow-3xs flex items-center justify-center text-lg shrink-0">
                      {activeEmoji}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-neutral-900">{student.name}</p>
                      <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">{student.grade} • {student.status}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-xs font-black uppercase tracking-wide ${
                      activeFeeling === 'Overwhelmed' || activeFeeling === 'Frustrated' ? 'bg-rose-50 text-rose-700 border border-rose-105' : 
                      activeFeeling === 'Anxious' ? 'bg-purple-50 text-purple-750 border border-purple-105' : 'bg-emerald-50 text-emerald-700 border border-emerald-105'
                    }`}>
                      {activeFeeling}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Classroom Emotional Growth Garden */}
          <div className="pt-6 border-t border-neutral-100">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2 text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Classroom Emotional Growth Garden
                </h4>
                <p className="text-[11px] text-neutral-500 font-medium">An elegant, ecological representation of childhood regulation. Happy & Calm moments cultivate vibrant blooms; sensory frictions display areas needing care.</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded inline-flex items-center space-x-1 border border-emerald-150">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                <span>Class Biome Active</span>
              </span>
            </div>

            {/* Custom SVG Classroom Garden Meadow */}
            <div className="rounded-3xl bg-gradient-to-b from-sky-50/70 via-neutral-100/30 to-emerald-50/60 border border-neutral-200/80 p-5.5 relative overflow-hidden">
              
              {/* Backing ecological climate detail */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 text-sky-700/70 text-[9px] font-mono uppercase tracking-wide font-bold">
                <Sun className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '45s' }} />
                <span>Solar classroom environment</span>
              </div>

              <div className="relative h-48 w-full mt-2">
                <svg viewBox="0 0 740 180" className="w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="lushGrass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="cloudWater" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Ground grass hill path */}
                  <path d="M -20 150 Q 180 130, 370 145 T 760 140 L 760 190 L -20 190 Z" fill="url(#lushGrass)" opacity="0.9" />
                  <path d="M -20 158 Q 240 142, 480 158 T 760 152 L 760 190 L -20 190 Z" fill="url(#lushGrass)" className="brightness-95" />

                  {/* Render 4 classroom student seedling slots */}
                  {[
                    { name: 'Liam O.', x: 120, emotion: logs.length > 0 ? logs[0].emotion : 'Calm', need: logs.length > 0 ? logs[0].need : '' },
                    { name: 'Chloe M.', x: 280, emotion: 'Happy', need: '' },
                    { name: 'Aiden T.', x: 440, emotion: 'Overwhelmed', need: 'Auditory buffering break' },
                    { name: 'Emma K.', x: 600, emotion: 'Calm', need: '' }
                  ].map((plant, index) => {
                    const px = plant.x;
                    const py = 150 + Math.sin(px / 90) * 4;
                    const isOverstimulated = plant.emotion === 'Overwhelmed' || plant.emotion === 'Frustrated' || plant.emotion === 'Anxious';
                    
                    return (
                      <g key={index} className="group/student-plant">
                        {/* Interactive glow ring */}
                        <circle cx={px} cy={py} r={isOverstimulated ? 20 : 10} fill={
                          plant.emotion === 'Happy' ? '#F59E0B' :
                          plant.emotion === 'Calm' ? '#10B981' :
                          plant.emotion === 'Overwhelmed' ? '#EA580C' : '#A855F7'
                        } opacity="0.08" className="animate-pulse" />

                        {/* Raincloud for challenged profiles needing immediate sensory assistance */}
                        {isOverstimulated && (
                          <g transform={`translate(${px - 20}, 25)`} className="animate-bounce" style={{ animationDuration: '5s' }}>
                            {/* Cloud back shape */}
                            <path d="M 6 12 C 3 12, 0 9, 0 6 C 0 3, 3 0, 6 0 L 26 0 C 29 0, 32 3, 32 6 C 32 9, 29 12, 26 12 Z" fill="#94A3B8" opacity="0.85" />
                            <circle cx="12" cy="2" r="7" fill="#64748B" />
                            <circle cx="20" cy="4" r="6" fill="#64748B" />
                            {/* Gentle rain stream */}
                            <rect x="8" y="15" width="1.5" height="15" fill="url(#cloudWater)" />
                            <rect x="16" y="18" width="1.5" height="12" fill="url(#cloudWater)" />
                            <rect x="24" y="14" width="1.5" height="16" fill="url(#cloudWater)" />
                          </g>
                        )}

                        {/* VEG SEEDLINGS */}
                        {/* 1. SUNSHINE FLOWER (Happy) */}
                        {plant.emotion === 'Happy' && (
                          <g transform={`translate(${px}, ${py - 48})`}>
                            <path d="M 0 48 Q -4 20, 0 0" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="10" fill="#FBBF24" />
                            <circle cx="0" cy="-10" r="3" fill="#F59E0B" />
                            <circle cx="0" cy="10" r="3" fill="#F59E0B" />
                            <circle cx="-10" cy="0" r="3" fill="#F59E0B" />
                            <circle cx="10" cy="0" r="3" fill="#F59E0B" />
                            <circle cx="0" cy="0" r="5" fill="#FFFBEB" />
                          </g>
                        )}

                        {/* 2. MEADOW FERN (Calm) */}
                        {plant.emotion === 'Calm' && (
                          <g transform={`translate(${px}, ${py - 44})`}>
                            <path d="M 0 44 Q 4 18, 2 0" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M 2 12 C 8 8, 12 12, 2 20" fill="#34D399" />
                            <path d="M -1 18 C -7 14, -11 20, -1 28" fill="#059669" />
                            <circle cx="2" cy="0" r="3.5" fill="#A7F3D0" />
                          </g>
                        )}

                        {/* 3. SHUTDOWN LOTUS (Overwhelmed) */}
                        {plant.emotion === 'Overwhelmed' && (
                          <g transform={`translate(${px}, ${py - 38})`}>
                            <path d="M 0 38 Q 4 18, 0 0" fill="none" stroke="#EA580C" strokeWidth="2.5" />
                            <path d="M -10 0 C -6 -10, 6 -10, 10 0 C 6 6, -6 6, -10 0 Z" fill="#F97316" />
                            <circle cx="0" cy="-2" r="2.5" fill="#FDE047" />
                          </g>
                        )}

                        {/* 4. SPIRAL CLAY (Anxious/Frustrated/Sad) */}
                        {!(plant.emotion === 'Happy' || plant.emotion === 'Calm' || plant.emotion === 'Overwhelmed') && (
                          <g transform={`translate(${px}, ${py - 42})`}>
                            <path d="M 0 42 T -4 28 T 4 14 T 0 0" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="0" cy="0" r="5" fill="#D8B4FE" />
                          </g>
                        )}

                        {/* Student Name Board */}
                        <g transform={`translate(${px}, ${py + 20})`}>
                          <rect x="-30" y="-8" width="60" height="15" rx="5" fill="#1E293B" />
                          <text x="0" y="2" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                            {plant.name}
                          </text>
                        </g>

                        {/* Interactive floating student detail tooltip */}
                        <g className="opacity-0 group-hover/student-plant:opacity-100 transition-opacity duration-300 pointer-events-none" transform={`translate(${px}, ${py - 74})`}>
                          <rect x="-65" y="-22" width="130" height="32" rx="8" fill="#0F172A" />
                          <text x="0" y="-10" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">{plant.name} ({plant.emotion})</text>
                          <text x="0" y="2" fill="#94A3B8" fontSize="7" textAnchor="middle">{plant.need ? plant.need : 'Ecosystem Balanced & Safe'}</text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Garden legend track */}
              <div className="pt-2 flex justify-center gap-6 text-[9px] font-bold text-neutral-450 border-t border-neutral-200/50 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span>🌻 Vibrant Florals (Happy/Calm)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  <span>🌧️ Active Rainclouds (Care Attention Required)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Fast Action checklists */}
        <div className="md:col-span-4 rounded-[32px] bg-gradient-to-br from-indigo-50/40 to-purple-50/40 p-7.5 border border-indigo-150/80 shadow-3xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-indigo-100 pb-3.5">
              <span className="text-xs font-bold text-indigo-950 uppercase tracking-widest">Active Accommodations</span>
              <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
            </div>

            <div className="space-y-4 text-left">
              <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider block">
                IEP Active protocol:
              </span>
              <h4 className="text-lg font-black text-indigo-950 font-display leading-tight">
                {classroomSupports.title}
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                Classroom modifications designed in partnership with student therapists:
              </p>
            </div>

            <ul className="mt-5 space-y-4">
              {classroomSupports.recommendations.map((rec, k) => (
                <li key={k} className="flex gap-3 items-start text-xs text-neutral-700 leading-relaxed font-semibold">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-150 text-[10px] font-black text-indigo-800">
                    {k + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-4 shadow-3xs border border-indigo-150 flex items-center justify-between gap-3.5 text-left">
            <div>
              <p className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider">IEP Support Target</p>
              <h5 className="text-xs font-extrabold text-indigo-950">Visual Transition Timers</h5>
            </div>
            <span className="rounded bg-teal-50 px-2 py-0.5 text-[9px] font-bold text-teal-850 border border-teal-150">
              Active Strategy
            </span>
          </div>
        </div>

      </div>

      {/* CLINICAL COPING STRATEGIES (Generative rules panel) */}
      <div className="rounded-[36px] bg-gradient-to-tr from-indigo-950 to-neutral-900 p-8 md:p-12 text-white shadow-xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl animate-bloom-slow" />
        
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg border border-white/10">
              <Flame className="h-5.5 w-5.5 text-sky-305 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                Behavioral & Classroom Adaptation Guide
              </h2>
              <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                Augmentative rules engine based on pediatric school psychology
              </p>
            </div>
          </div>

          <button
            onClick={generateTeacherInsights}
            disabled={loadingReport}
            className="rounded-2xl bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold px-6 py-4.5 transition-all shadow-md active:scale-97 cursor-pointer inline-flex items-center space-x-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingReport ? 'animate-spin' : ''}`} />
            <span>{loadingReport ? 'Regenerating Guide...' : 'Refresh Adaptation Plan'}</span>
          </button>
        </div>

        <div className="rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6">
          {aiTeacherReport ? (
            <div className="space-y-5 text-sm text-neutral-300 leading-relaxed font-sans max-w-none">
              {aiTeacherReport.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h4 key={index} className="text-[13px] font-black text-sky-300 uppercase tracking-widest border-b border-white/10 pb-1.5 mt-5 first:mt-0 flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>{paragraph.replace('###', '').trim()}</span>
                    </h4>
                  );
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 mt-2.5 space-y-2 text-[12px] text-neutral-350">
                      {paragraph.split('\n').map((li, k) => (
                        <li key={k}>{li.replace('-', '').trim()}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index} className="text-[12px] font-medium leading-relaxed text-neutral-300" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<b class="text-white">$1</b>') }} />;
              })}
            </div>
          ) : (
            <div className="space-y-3 py-6">
              <div className="h-4 bg-white/5 animate-pulse rounded-md w-3/4" />
              <div className="h-4 bg-white/5 animate-pulse rounded-md w-full" />
              <div className="h-4 bg-white/5 animate-pulse rounded-md w-5/6" />
            </div>
          )}
        </div>
      </div>

      {/* CLASSROOM ALARMS AND INCOMING SIGNALS */}
      <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-3xs text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-100 pb-5 mb-8 gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-neutral-950 font-display flex items-center space-x-2">
              <Bell className="h-5.5 w-5.5 text-indigo-505" />
              <span>Homeroom Activity & Cues Feed</span>
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Review and respond to Student Communication Cards as they are shared.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-neutral-50 p-1.5 rounded-xl border border-neutral-150">
            <button
              onClick={() => setActiveTab('unresolved')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'unresolved' ? 'bg-white text-indigo-950 shadow-3xs' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Pending Alerts
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-indigo-950 shadow-3xs' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Entire Log Timeline
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16 rounded-[24px] border border-dashed border-neutral-200">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-900">All alerts accommodated perfectly!</p>
              <p className="text-xs text-neutral-400 font-medium mt-1">Liam's environmental baseline is secure.</p>
            </div>
          ) : (
            filteredRequests.map(log => {
              const isItemResolved = resolvedIds.includes(log.id);
              return (
                <div 
                  key={log.id} 
                  className={`rounded-[24px] border p-6 transition-all duration-300 flex flex-col justify-between md:flex-row md:items-center gap-5 ${
                    isItemResolved 
                      ? 'bg-neutral-50/50 border-neutral-200 opacity-60' 
                      : 'border-indigo-100 bg-indigo-50/5 hover:border-indigo-200 shadow-3xs'
                  }`}
                >
                  <div className="space-y-3.5 flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-neutral-900 font-display">{log.childName}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                      <span className="text-[10px] text-neutral-400 font-bold">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-105">
                        Trigger: {log.trigger}
                      </span>

                      <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-105">
                        Assistance: {log.need}
                      </span>
                    </div>

                    <blockquote className="text-sm md:text-[15px] font-bold text-neutral-800 pl-4 border-l-3 border-indigo-400 leading-relaxed text-left max-w-3xl">
                      "{log.message}"
                    </blockquote>
                  </div>

                  <button
                    disabled={isItemResolved}
                    onClick={() => handleResolve(log.id, log.message)}
                    className={`flex items-center space-x-1.5 rounded-xl px-5 py-3 text-xs font-black transition-all ${
                      isItemResolved 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-97 shadow-sm shadow-indigo-100 shrink-0'
                    }`}
                  >
                    {isItemResolved ? <Check className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    <span>{isItemResolved ? 'Accommodated' : 'Verify & Assist Now'}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}

// Map emotion triggers to emojis
const EMOTONS_MAPPING: Record<string, string> = {
  Happy: '☀️',
  Sad: '🌧️',
  Anxious: '🌀',
  Overwhelmed: '⚡',
  Frustrated: '🌋',
  Calm: '🍃'
};
