import { EmotionConfig, TriggerConfig, NeedConfig, CommunicationLog } from "./types";

export const EMOTIONS: EmotionConfig[] = [
  // --- JOY LEVEL (Gold / Orange) ---
  {
    id: 'Happy',
    label: 'Happy',
    emoji: '☀️',
    colorClass: 'from-amber-400 to-orange-400',
    bgClass: 'bg-amber-50 hover:bg-amber-100/80',
    textClass: 'text-amber-850',
    borderColorClass: 'border-amber-205 focus:ring-amber-400',
    hoverColorClass: 'shadow-amber-100 border-amber-300',
    description: 'I feel sunny, warm, open, and ready to share classroom play moments.'
  },
  {
    id: 'Excited',
    label: 'Excited',
    emoji: '⭐',
    colorClass: 'from-amber-300 to-amber-550',
    bgClass: 'bg-yellow-50 hover:bg-yellow-100/80',
    textClass: 'text-amber-900',
    borderColorClass: 'border-amber-200 focus:ring-amber-400',
    hoverColorClass: 'shadow-amber-100 border-amber-300',
    description: 'My energy is high, bubbly, and fully sparkling!'
  },
  {
    id: 'Proud',
    label: 'Proud',
    emoji: '✨',
    colorClass: 'from-orange-400 to-amber-500',
    bgClass: 'bg-orange-50 hover:bg-orange-100/80',
    textClass: 'text-orange-900',
    borderColorClass: 'border-orange-200 focus:ring-orange-400',
    hoverColorClass: 'shadow-orange-100 border-orange-300',
    description: 'I feel a warm glow from finishing my task or creating something special.'
  },

  // --- SERENITY LEVEL (Emerald / Teal) ---
  {
    id: 'Calm',
    label: 'Calm',
    emoji: '🍃',
    colorClass: 'from-emerald-400 to-teal-500',
    bgClass: 'bg-emerald-50 hover:bg-emerald-100/80',
    textClass: 'text-emerald-800',
    borderColorClass: 'border-emerald-200 focus:ring-emerald-400',
    hoverColorClass: 'shadow-emerald-100 border-emerald-300',
    description: 'My body is fully relaxed, and my surrounding channels feel quiet.'
  },
  {
    id: 'Relaxed',
    label: 'Relaxed',
    emoji: '🌲',
    colorClass: 'from-teal-400 to-cyan-500',
    bgClass: 'bg-teal-50 hover:bg-teal-100/80',
    textClass: 'text-teal-800',
    borderColorClass: 'border-teal-200 focus:ring-teal-400',
    hoverColorClass: 'shadow-teal-100 border-teal-300',
    description: 'Feeling loose, safe, and comfortable in my environment.'
  },
  {
    id: 'Curious',
    label: 'Curious',
    emoji: '🔍',
    colorClass: 'from-emerald-350 to-amber-450',
    bgClass: 'bg-emerald-50/50 hover:bg-emerald-100/55',
    textClass: 'text-emerald-900',
    borderColorClass: 'border-emerald-200 focus:ring-emerald-450',
    hoverColorClass: 'shadow-emerald-50 border-emerald-300',
    description: 'I want to watch and learn how things function or look closely.'
  },

  // --- MISTY CLOUDS (Indigo / Purple) ---
  {
    id: 'Confused',
    label: 'Confused',
    emoji: '🌀',
    colorClass: 'from-indigo-400 to-purple-500',
    bgClass: 'bg-indigo-50 hover:bg-indigo-100/80',
    textClass: 'text-indigo-805',
    borderColorClass: 'border-indigo-200 focus:ring-indigo-400',
    hoverColorClass: 'shadow-indigo-100 border-indigo-300',
    description: 'Directions or sudden transitions feel mixed up inside my thoughts.'
  },
  {
    id: 'Embarrassed',
    label: 'Embarrassed',
    emoji: '😳',
    colorClass: 'from-purple-300 to-indigo-400',
    bgClass: 'bg-purple-50 hover:bg-purple-100/80',
    textClass: 'text-purple-850',
    borderColorClass: 'border-purple-200 focus:ring-purple-400',
    hoverColorClass: 'shadow-purple-100 border-purple-300',
    description: 'A blush of shy feeling. I want a quiet screen to shield me.'
  },
  {
    id: 'Anxious',
    label: 'Anxious',
    emoji: '🌪️',
    colorClass: 'from-indigo-450 to-purple-500',
    bgClass: 'bg-indigo-50/60 hover:bg-indigo-100/60',
    textClass: 'text-indigo-900',
    borderColorClass: 'border-indigo-200 focus:ring-indigo-500',
    hoverColorClass: 'shadow-indigo-100 border-indigo-305',
    description: 'Things are moving rapid. My heart feels like a fast-fluttering butterfly.'
  },

  // --- MOONLIT SANCTUARY (Sky / Blue) ---
  {
    id: 'Lonely',
    label: 'Lonely',
    emoji: '⚓',
    colorClass: 'from-sky-300 to-sky-505',
    bgClass: 'bg-sky-50 hover:bg-sky-100/80',
    textClass: 'text-sky-850',
    borderColorClass: 'border-sky-200 focus:ring-sky-400',
    hoverColorClass: 'shadow-sky-100 border-sky-300',
    description: 'Feeling separate or left out of current circles. Needing companion care.'
  },
  {
    id: 'Sad',
    label: 'Sad',
    emoji: '🌧️',
    colorClass: 'from-sky-400 to-blue-500',
    bgClass: 'bg-sky-50 hover:bg-sky-100/85',
    textClass: 'text-sky-800',
    borderColorClass: 'border-sky-200 focus:ring-sky-400',
    hoverColorClass: 'shadow-sky-100 border-sky-305',
    description: 'My body battery is low. Safe silence or crying helps release this.'
  },
  {
    id: 'Disappointed',
    label: 'Disappointed',
    emoji: '💧',
    colorClass: 'from-blue-400 to-indigo-600',
    bgClass: 'bg-blue-50 hover:bg-blue-100/80',
    textClass: 'text-blue-900',
    borderColorClass: 'border-blue-200 focus:ring-blue-400',
    hoverColorClass: 'shadow-blue-100 border-blue-300',
    description: 'Something I expected changed, and my confidence took a heavy step down.'
  },

  // --- OVERLOAD / CRITICAL SIGNAL (Rose / Red) ---
  {
    id: 'Overwhelmed',
    label: 'Overwhelmed',
    emoji: '⚡',
    colorClass: 'from-rose-400 to-red-500',
    bgClass: 'bg-rose-50 hover:bg-rose-100/80',
    textClass: 'text-rose-800',
    borderColorClass: 'border-rose-200 focus:ring-rose-400',
    hoverColorClass: 'shadow-rose-100 border-rose-300',
    description: 'Sensory levels have peaked. Noise, static, or crowds are locking me up.'
  },
  {
    id: 'Frustrated',
    label: 'Frustrated',
    emoji: '🌋',
    colorClass: 'from-rose-500 to-orange-600',
    bgClass: 'bg-rose-50 hover:bg-rose-100/80',
    textClass: 'text-rose-900',
    borderColorClass: 'border-rose-200 focus:ring-rose-450',
    hoverColorClass: 'shadow-rose-100 border-rose-305',
    description: 'Things did not go as predicted, and friction is pressing inside my temples.'
  },
  {
    id: 'Angry',
    label: 'Angry',
    emoji: '🔥',
    colorClass: 'from-red-500 to-rose-700',
    bgClass: 'bg-red-50 hover:bg-red-100/80',
    textClass: 'text-red-900',
    borderColorClass: 'border-red-200 focus:ring-red-400',
    hoverColorClass: 'shadow-red-150 border-red-300',
    description: 'Absolute high containment surge. I need a sensory bridge to discharge this.'
  },
  {
    id: 'Scared',
    label: 'Scared',
    emoji: '👻',
    colorClass: 'from-purple-500 to-rose-900',
    bgClass: 'bg-purple-50 hover:bg-purple-100/80',
    textClass: 'text-purple-950',
    borderColorClass: 'border-purple-200 focus:ring-purple-400',
    hoverColorClass: 'shadow-purple-150 border-purple-300',
    description: 'Uncertain surroundings feel spooky or unpredictable today.'
  }
];

export const TRIGGERS: TriggerConfig[] = [
  // --- SENSORY ---
  {
    id: 'Loud Noise',
    label: 'Loud Noise',
    iconName: 'VolumeX',
    colorClass: 'text-rose-600 bg-rose-50 border-rose-100',
    bgClass: 'hover:bg-rose-50/50',
    description: 'Alarm chimes, shouting voices, cafeteria echoing, or sudden spikes.'
  },
  {
    id: 'Bright Light',
    label: 'Bright Light',
    iconName: 'Sun',
    colorClass: 'text-amber-500 bg-amber-50 border-amber-100',
    bgClass: 'hover:bg-amber-50/40',
    description: 'Fluorescent tubes blinking, direct high-beam sun, or flashing displays.'
  },
  {
    id: 'Strong Smell',
    label: 'Strong Smell',
    iconName: 'Wind',
    colorClass: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    bgClass: 'hover:bg-emerald-50/40',
    description: 'Sharp foods, high-odor cleaning vinegars, solvents, or paints.'
  },
  {
    id: 'Physical Discomfort',
    label: 'Physical Discomfort',
    iconName: 'Heart',
    colorClass: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    bgClass: 'hover:bg-indigo-50/40',
    description: 'Tight clothing tags, muscle exhaustion, temperature swings, or hunger.'
  },
  {
    id: 'Crowded Environment',
    label: 'Crowded Environment',
    iconName: 'Users',
    colorClass: 'text-purple-500 bg-purple-50 border-purple-100',
    bgClass: 'hover:bg-purple-50/40',
    description: 'Tightly packed corridors, playground clusters, or physical bumping.'
  },

  // --- ROUTINE ---
  {
    id: 'Unexpected Change',
    label: 'Unexpected Change',
    iconName: 'RefreshCw',
    colorClass: 'text-purple-600 bg-purple-50 border-purple-150',
    bgClass: 'hover:bg-purple-50/30',
    description: 'Unscheduled switch of teacher support or sudden cancel of a reward.'
  },
  {
    id: 'Schedule Disruption',
    label: 'Schedule Disruption',
    iconName: 'Clock',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-150',
    bgClass: 'hover:bg-blue-50/30',
    description: 'Timing deviations, delayed lunch bells, or broken intervals.'
  },
  {
    id: 'New Environment',
    label: 'New Environment',
    iconName: 'Map',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-150',
    bgClass: 'hover:bg-emerald-50/30',
    description: 'Entering unfamiliar classroom floors, off-campus trips, or labs.'
  },
  {
    id: 'Transition',
    label: 'Transition between Activities',
    iconName: 'ArrowRight',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-150',
    bgClass: 'hover:bg-amber-50/30',
    description: 'Stopping an immersive cozy project to stand up, align, and relocate.'
  },

  // --- COMMUNICATION ---
  {
    id: 'Not being Understood',
    label: 'Not being Understood',
    iconName: 'MessageSquareOff',
    colorClass: 'text-rose-500 bg-rose-50 border-rose-150',
    bgClass: 'hover:bg-rose-50/30',
    description: 'Struggling to make caregivers understand precise inner desires.'
  },
  {
    id: 'Difficulty Expressing Thoughts',
    label: 'Difficulty Expressing',
    iconName: 'HelpCircle',
    colorClass: 'text-sky-500 bg-sky-50 border-sky-150',
    bgClass: 'hover:bg-sky-50/30',
    description: 'Thoughts are rapid but physical speech cords take a protective brief break.'
  },
  {
    id: 'Social Challenges',
    label: 'Social Challenges',
    iconName: 'Users',
    colorClass: 'text-teal-500 bg-teal-50 border-teal-150',
    bgClass: 'hover:bg-teal-50/30',
    description: 'Deciphering rapid play scripts, facial expressions, or quick group talks.'
  },

  // --- SCHOOL ---
  {
    id: 'Homework Stress',
    label: 'Homework Stress',
    iconName: 'FileText',
    colorClass: 'text-red-500 bg-red-50 border-red-150',
    bgClass: 'hover:bg-red-50/30',
    description: 'Complex worksheets, spelling repetition, or unclear paper assignments.'
  },
  {
    id: 'Classroom Noise',
    label: 'Classroom Noise',
    iconName: 'Volume2',
    colorClass: 'text-indigo-500 bg-indigo-50 border-indigo-150',
    bgClass: 'hover:bg-indigo-50/30',
    description: 'Chair scrapes, pencil sharpening, humming cooling fans, or buzzers.'
  },
  {
    id: 'Group Work',
    label: 'Group Work',
    iconName: 'Users',
    colorClass: 'text-emerald-500 bg-emerald-50 border-emerald-150',
    bgClass: 'hover:bg-emerald-50/30',
    description: 'Coordinating spaces with three peer systems simultaneously.'
  },
  {
    id: 'Public Speaking',
    label: 'Public Speaking',
    iconName: 'MessageCircle',
    colorClass: 'text-amber-500 bg-amber-50 border-amber-150',
    bgClass: 'hover:bg-amber-50/30',
    description: 'Answering questions before the board or presenting items.'
  },

  // --- EMOTIONAL ---
  {
    id: 'Feeling Left Out',
    label: 'Feeling Left Out',
    iconName: 'Heart',
    colorClass: 'text-purple-500 bg-purple-50 border-purple-150',
    bgClass: 'hover:bg-purple-50/30',
    description: 'Watching play groups proceed without a soft verbal bridge of entry.'
  },
  {
    id: 'Conflict',
    label: 'Conflict or Argument',
    iconName: 'ShieldAlert',
    colorClass: 'text-rose-600 bg-rose-50 border-rose-200',
    bgClass: 'hover:bg-rose-50/30',
    description: 'Sudden voice pitch rises, correction demands, or toy grabbing.'
  },
  {
    id: 'Uncertainty',
    label: 'Uncertainty',
    iconName: 'HelpCircle',
    colorClass: 'text-blue-500 bg-blue-50 border-blue-150',
    bgClass: 'hover:bg-blue-50/30',
    description: 'Unclear directions, substitute coaches, or vague future timing.'
  },
  {
    id: 'Waiting',
    label: 'Waiting in Line',
    iconName: 'Clock',
    colorClass: 'text-teal-500 bg-teal-50 border-teal-150',
    bgClass: 'hover:bg-teal-50/30',
    description: 'Holding physical alignments waiting for buses, cafeterias, or sinks.'
  }
];

export const NEEDS: NeedConfig[] = [
  {
    id: 'Quiet Space',
    label: 'Quiet Space',
    iconName: 'DoorOpen',
    colorClass: 'text-teal-600 bg-teal-50 border-teal-100',
    bgClass: 'hover:bg-teal-50/30',
    description: 'A cozy corner shelter away from noise, bright lighting, or crowds.'
  },
  {
    id: 'Break',
    label: 'Take a Break',
    iconName: 'Coffee',
    colorClass: 'text-purple-600 bg-purple-50 border-purple-100',
    bgClass: 'hover:bg-purple-50/30',
    description: 'A quiet pause to rest my thoughts and stop sensor inputs.'
  },
  {
    id: 'More Time',
    label: 'More Time',
    iconName: 'Clock',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-100',
    bgClass: 'hover:bg-amber-50/30',
    description: 'Slowing down fast checklists to work with tranquility.'
  },
  {
    id: 'Help Understanding',
    label: 'Help Understanding',
    iconName: 'HelpCircle',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-150',
    bgClass: 'hover:bg-blue-50/30',
    description: 'Ask Ms. Emma to break instructions into very small, bite-sized steps.'
  },
  {
    id: 'Emotional Support',
    label: 'Emotional Support',
    iconName: 'Heart',
    colorClass: 'text-rose-600 bg-rose-50 border-rose-150',
    bgClass: 'hover:bg-rose-50/30',
    description: 'A kind word, validating support, or handhold with parents or teachers.'
  },
  {
    id: 'Water',
    label: 'Drink of Water',
    iconName: 'GlassWater',
    colorClass: 'text-sky-600 bg-sky-50 border-sky-150',
    bgClass: 'hover:bg-sky-50/30',
    description: 'A cool, refreshing pause to hydrate physical sensors.'
  },
  {
    id: 'Movement Break',
    label: 'Movement Break',
    iconName: 'Activity',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-150',
    bgClass: 'hover:bg-emerald-50/30',
    description: 'Squeezing sensor toys, taking a short lap, or stretch breaks.'
  },
  {
    id: 'Headphones',
    label: 'Noise Headphones',
    iconName: 'Headphones',
    colorClass: 'text-pink-600 bg-pink-50 border-pink-150',
    bgClass: 'hover:bg-pink-50/30',
    description: 'Access comforting pediatric ear covers to filter classroom echoes.'
  },
  {
    id: 'Comfort Item',
    label: 'Comfort Item',
    iconName: 'Heart',
    colorClass: 'text-teal-605 bg-teal-50 border-teal-150',
    bgClass: 'hover:bg-teal-50/30',
    description: 'Holding my textured sensory gel-pads, plush, or weight bands.'
  },
  {
    id: 'Hug',
    label: 'Gentle Hug',
    iconName: 'HeartHandshake',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-150',
    bgClass: 'hover:bg-amber-50/30',
    description: 'Deep mechanical pressure hug to co-regulate physical posture.'
  },
  {
    id: 'Reduced Stimulation',
    label: 'Less Light/Noises',
    iconName: 'EyeOff',
    colorClass: 'text-indigo-650 bg-indigo-50 border-indigo-150',
    bgClass: 'hover:bg-indigo-50/30',
    description: 'Dim the high lights, step under desk shadows, or silence boards.'
  },
  {
    id: 'Clear Instructions',
    label: 'Clear Directions',
    iconName: 'FileText',
    colorClass: 'text-sky-600 bg-sky-50 border-sky-150',
    bgClass: 'hover:bg-sky-50/30',
    description: 'Simple checklists paired with visual icons instead of long talks.'
  },
  {
    id: 'Time Alone',
    label: 'Time Alone',
    iconName: 'FolderMinus',
    colorClass: 'text-slate-600 bg-slate-50 border-slate-150',
    bgClass: 'hover:bg-slate-50/30',
    description: 'A completely independent, undisturbed zone for 5 minutes.'
  },
  {
    id: 'Talking with Trusted Person',
    label: 'Talk with Mentor',
    iconName: 'MessageSquare',
    colorClass: 'text-purple-650 bg-purple-50 border-purple-150',
    bgClass: 'hover:bg-purple-50/30',
    description: 'Consult a trusted guide or counselor in a calm space.'
  }
];

// Helper relative date generator
const relativeDateStr = (daysAgo: number, timeStr: string): string => {
  const baseDate = new Date("2026-06-15");
  baseDate.setDate(baseDate.getDate() - daysAgo);
  return `${baseDate.toISOString().split('T')[0]}T${timeStr}:00`;
};

export const INITIAL_LOGS: CommunicationLog[] = [
  {
    id: 'log-1',
    timestamp: relativeDateStr(6, '08:45'),
    childName: 'Liam',
    emotion: 'Overwhelmed',
    trigger: 'Loud Noise',
    need: 'Quiet Space',
    message: 'I am feeling overwhelmed because of cafeteria echoes. I would feel better if index steps could allow me to use a quiet sensory corner.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-2',
    timestamp: relativeDateStr(5, '10:15'),
    childName: 'Liam',
    emotion: 'Frustrated',
    trigger: 'Unexpected Change',
    need: 'More Time',
    message: 'I am feeling frustrated because spelling schedule switched. I would feel better if I had extra transition time.',
    isReadByParent: true,
    isReadByTeacher: true,
    notes: 'Using the classroom countdown timers stabilized Liam during spelling class.'
  },
  {
    id: 'log-3',
    timestamp: relativeDateStr(4, '13:30'),
    childName: 'Liam',
    emotion: 'Anxious',
    trigger: 'Crowded Environment',
    need: 'Comfort Item',
    message: 'I am feeling anxious because hallways are crowded. I would feel better holding my sensory gel-pad.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-4',
    timestamp: relativeDateStr(4, '14:45'),
    childName: 'Liam',
    emotion: 'Calm',
    trigger: 'Difficulty Expressing Thoughts',
    need: 'Break',
    message: 'I am feeling calm but my speech cords took a break. Resorted to companion card to transition.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-5',
    timestamp: relativeDateStr(3, '09:00'),
    childName: 'Liam',
    emotion: 'Overwhelmed',
    trigger: 'Bright Light',
    need: 'Headphones',
    message: 'I am feeling overwhelmed because fluorescent bulbs are flickering. Using noise headphones dampens classroom pressure.',
    isReadByParent: true,
    isReadByTeacher: true,
    notes: 'Reported flicker in cafeteria lights to school management. Liam calmed with headphone filters.'
  },
  {
    id: 'log-6',
    timestamp: relativeDateStr(3, '11:45'),
    childName: 'Liam',
    emotion: 'Confused',
    trigger: 'Group Work',
    need: 'Clear Instructions',
    message: 'I am feeling confused because group instructions have lots of text. Clear numbered visual cards help.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-7',
    timestamp: relativeDateStr(2, '09:30'),
    childName: 'Liam',
    emotion: 'Anxious',
    trigger: 'Classroom Noise',
    need: 'Time Alone',
    message: 'I am feeling anxious because desk sharpening noises are loud today. I would feel better sitting in the cozy shadow floor.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-8',
    timestamp: relativeDateStr(2, '14:00'),
    childName: 'Liam',
    emotion: 'Happy',
    trigger: 'Uncertainty',
    need: 'Emotional Support',
    message: 'I am feeling happy and proud because I completed math! A warm congratulations makes me glow.',
    isReadByParent: true,
    isReadByTeacher: false
  },
  {
    id: 'log-9',
    timestamp: relativeDateStr(1, '10:30'),
    childName: 'Liam',
    emotion: 'Overwhelmed',
    trigger: 'Loud Noise',
    need: 'Reduced Stimulation',
    message: 'I am feeling overwhelmed because recess bell is extremely sudden. I need reduced classroom stimulation.',
    isReadByParent: true,
    isReadByTeacher: true
  },
  {
    id: 'log-10',
    timestamp: relativeDateStr(1, '15:15'),
    childName: 'Liam',
    emotion: 'Calm',
    trigger: 'Difficulty Expressing Thoughts',
    need: 'Comfort Item',
    message: 'I am feeling calm and aligned now. Standard after school co-regulation with parents complete.',
    isReadByParent: true,
    isReadByTeacher: true
  }
];
