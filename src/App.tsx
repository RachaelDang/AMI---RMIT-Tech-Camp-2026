import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CompanionFlow from './components/CompanionFlow';
import ParentDashboard from './components/ParentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StoryTransition from './components/StoryTransition';
import { CommunicationLog } from './types';
import { INITIAL_LOGS } from './data';
import { Heart, Globe, Sparkles, ShieldAlert } from 'lucide-react';

export type ActiveTab = 'home' | 'companion' | 'parent' | 'teacher';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [pendingTab, setPendingTab] = useState<ActiveTab | null>(null);
  const [logs, setLogs] = useState<CommunicationLog[]>([]);

  // Initialize logs from localStorage or fallback to high-quality INITIAL_LOGS pre-population
  useEffect(() => {
    const saved = localStorage.getItem('ami_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (err) {
        console.error("Error reading pre-existing logs:", err);
        setLogs(INITIAL_LOGS);
      }
    } else {
      setLogs(INITIAL_LOGS);
      localStorage.setItem('ami_logs', JSON.stringify(INITIAL_LOGS));
    }
  }, []);

  // Update localStorage whenever logs mutate to preserve durable persistence
  const saveLogs = (updatedLogs: CommunicationLog[]) => {
    setLogs(updatedLogs);
    localStorage.setItem('ami_logs', JSON.stringify(updatedLogs));
  };

  // Add communication card log dynamically
  const addLog = (newLog: Omit<CommunicationLog, 'id' | 'timestamp' | 'isReadByParent' | 'isReadByTeacher'>) => {
    const logItem: CommunicationLog = {
      ...newLog,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isReadByParent: false,
      isReadByTeacher: false
    };

    const updated = [logItem, ...logs];
    saveLogs(updated);
  };

  // Add caregiver/teacher notes to log
  const addNoteToLog = (id: string, notes: string) => {
    const updated = logs.map(l => {
      if (l.id === id) {
        return { ...l, notes };
      }
      return l;
    });
    saveLogs(updated);
  };

  // Mark log as read/acknowledged by teacher
  const markReadTeacher = (id: string) => {
    const updated = logs.map(l => {
      if (l.id === id) {
        return { ...l, isReadByTeacher: true };
      }
      return l;
    });
    saveLogs(updated);
  };

  // Intercept normal tab navigation to route through storytelling slides
  const handleTabChange = (tab: ActiveTab) => {
    if (tab === activeTab) return;
    if (tab !== 'home') {
      setPendingTab(tab);
    } else {
      setActiveTab('home');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F4] selection:bg-sky-100 selection:text-sky-900">
      
      {/* Premium Header across portals */}
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main router stage */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingPage 
                onStartExploring={() => handleTabChange('companion')}
                onGoToParent={() => handleTabChange('parent')}
                onGoToTeacher={() => handleTabChange('teacher')}
              />
            </motion.div>
          )}

          {activeTab === 'companion' && (
            <motion.div
              key="companion-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <CompanionFlow 
                onAddLog={addLog}
                onGoToDashboard={(tab) => handleTabChange(tab as 'parent' | 'teacher')}
              />
            </motion.div>
          )}

          {activeTab === 'parent' && (
            <motion.div
              key="parent-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <ParentDashboard 
                logs={logs}
                onAddNoteToLog={addNoteToLog}
              />
            </motion.div>
          )}

          {activeTab === 'teacher' && (
            <motion.div
              key="teacher-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <TeacherDashboard 
                logs={logs}
                onMarkReadTeacher={markReadTeacher}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Narrative Page Switch Interceptor Backdrop */}
      {pendingTab && (
        <StoryTransition 
          fromTab={activeTab}
          toTab={pendingTab}
          onComplete={() => {
            setActiveTab(pendingTab);
            setPendingTab(null);
          }}
          onCancel={() => {
            setActiveTab(pendingTab);
            setPendingTab(null);
          }}
        />
      )}

      {/* Premium Startup Footer engineered for global impact */}
      <footer className="border-t border-orange-100/35 bg-white py-12 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-left">
            
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <Heart className="h-4 w-4 fill-rose-600 text-rose-600" />
                </div>
                <span className="text-base font-extrabold tracking-tight text-gray-800">
                  AMI
                </span>
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-100">
                  Human-Centered Companion
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                AMI is an emotional communication companion helping children with ASD express themselves and be understood. It serves as a warm, supportive bridge fostering connection between children, parents, and educators.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold text-gray-400">
              <a onClick={() => handleTabChange('home')} className="hover:text-purple-600 transition-colors cursor-pointer">Start Landing</a>
              <a onClick={() => handleTabChange('companion')} className="hover:text-purple-600 transition-colors cursor-pointer">Interactive Comp</a>
              <a onClick={() => handleTabChange('parent')} className="hover:text-purple-600 transition-colors cursor-pointer">Parent Guide</a>
              <a onClick={() => handleTabChange('teacher')} className="hover:text-purple-600 transition-colors cursor-pointer">School Adaptations</a>
            </div>

          </div>

          <div className="mt-8 flex flex-col justify-between items-center gap-4 border-t border-orange-100/10 pt-8 md:flex-row">
            <p className="text-[11px] text-gray-400">
              Co-created with parents, educators, and developmental consultants. © 2026 AMI. All rights reserved.
            </p>
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <Globe className="h-3.5 w-3.5" />
              <span>English (US-Accessible) • W3C AA compliant</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
