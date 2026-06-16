/**
 * Shared Type Declarations for AMI Emotional Companion
 */

export type EmotionType = 
  | 'Happy' | 'Excited' | 'Proud' | 'Calm' | 'Relaxed' | 'Curious'
  | 'Confused' | 'Embarrassed' | 'Lonely' | 'Sad' | 'Disappointed'
  | 'Anxious' | 'Overwhelmed' | 'Frustrated' | 'Angry' | 'Scared';

export type TriggerType =
  // Sensory
  | 'Loud Noise' | 'Bright Light' | 'Strong Smell' | 'Physical Discomfort' | 'Crowded Environment'
  // Routine
  | 'Unexpected Change' | 'Schedule Disruption' | 'New Environment' | 'Transition'
  // Communication
  | 'Not being Understood' | 'Difficulty Expressing Thoughts' | 'Social Challenges'
  // School
  | 'Homework Stress' | 'Classroom Noise' | 'Group Work' | 'Public Speaking'
  // Emotional
  | 'Feeling Left Out' | 'Conflict' | 'Uncertainty' | 'Waiting';

export type NeedType =
  | 'Quiet Space' | 'Break' | 'More Time' | 'Help Understanding' | 'Emotional Support'
  | 'Water' | 'Movement Break' | 'Headphones' | 'Comfort Item' | 'Hug'
  | 'Reduced Stimulation' | 'Clear Instructions' | 'Time Alone' | 'Talking with Trusted Person';

export interface EmotionConfig {
  id: EmotionType;
  label: string;
  emoji: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  borderColorClass: string;
  hoverColorClass: string;
  description: string;
}

export interface TriggerConfig {
  id: TriggerType;
  label: string;
  iconName: string; // Lucide icon reference
  colorClass: string;
  bgClass: string;
  description: string;
}

export interface NeedConfig {
  id: NeedType;
  label: string;
  iconName: string;
  colorClass: string;
  bgClass: string;
  description: string;
}

export interface CommunicationLog {
  id: string;
  timestamp: string; // ISO string
  childName: string;
  emotion: EmotionType;
  trigger: TriggerType;
  need: NeedType;
  message: string;
  isReadByParent: boolean;
  isReadByTeacher: boolean;
  notes?: string;
}

export interface AIRecordInsight {
  recipient: 'parent' | 'teacher';
  text: string;
  lastUpdated: string;
  isMock: boolean;
}
