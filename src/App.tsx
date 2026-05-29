/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Code, Sparkles, BookOpen, Star, Eye, Terminal, 
  ArrowRight, GraduationCap, Flame, ThumbsUp, Heart, 
  ExternalLink, Layers, Laptop, ShieldCheck, Database, LaptopIcon
} from 'lucide-react';

// Subcomponents import
import Header from './components/Header';
import QuoteVerse from './components/QuoteVerse';
import GithubSnake from './components/GithubSnake';
import StudentHub from './components/StudentHub';
import ANAPromo from './components/ANAPromo';
import Footer from './components/Footer';

// Generated Avatar Image relative import
// @ts-ignore
import avatarImg from './assets/images/developer_avatar_1780039024548.png';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'other';
  level: number; // percentage
  useCase: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'HTML5', category: 'frontend', level: 95, useCase: 'Semantic modern skeletons' },
  { name: 'CSS3', category: 'frontend', level: 90, useCase: 'Tailwind layouts & grid designs' },
  { name: 'JavaScript', category: 'frontend', level: 88, useCase: 'Functional DOM triggers & modern ES6+' },
  { name: 'React', category: 'frontend', level: 85, useCase: 'Interactive SPAs & lightweight states' },
  { name: 'Python', category: 'backend', level: 85, useCase: 'Algorithm analytics & student server structures' },
  { name: 'Node.js', category: 'backend', level: 80, useCase: 'Express API routing proxies' },
  { name: 'MySQL', category: 'database', level: 82, useCase: 'Relational tables & relational queries' },
  { name: 'MongoDB', category: 'database', level: 80, useCase: 'NoSQL document objects' },
  { name: 'Git & GitHub', category: 'tool', level: 90, useCase: 'Commit version management & portfolio presentation' },
  { name: 'VS Code', category: 'tool', level: 95, useCase: 'Clean, modular student compilation' },
  { name: 'Figma', category: 'tool', level: 78, useCase: 'Creative UI mockups & UX plans' },
  { name: 'C++', category: 'other', level: 85, useCase: 'BCA core memory pointer management & DSA structures' },
  { name: 'Java', category: 'other', level: 80, useCase: 'Class OOP inheritance designs' },
  { name: 'DSA', category: 'other', level: 84, useCase: 'Searching vectors & recursive loops' },
];

const METRICS_BASE = {
  views: 1208,
  followers: 435,
  stars: 52
};

const GREETINGS = [
  "Namaste",
  "Hello World",
  "Hey there",
  "Assalamu Alaikum",
  "Welcome"
];

const PROJECTS = [
  {
    id: 'spec-1',
    title: 'QuoteVerse Widget',
    type: 'Interactive Utility App',
    desc: 'A stylish random quote and shayari generator featuring mood-based theme transitions, live board additions, and localstorage backup.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Local State'],
    liveId: '#quote-verse'
  },
  {
    id: 'spec-2',
    title: 'Github Snake Game',
    type: 'Simulated Matrix Game',
    desc: 'An interactive representation of the GitHub activity calendar, supporting automatic AI pathfinding screen-saving and manually playable key steering.',
    tech: ['HTML Canvas', 'Math Vectors', 'Tailwind 4', 'React Hooks'],
    liveId: '#snake-widget'
  },
  {
    id: 'spec-3',
    title: 'StudentHub Dashboard',
    type: 'Lobby & Productivity Tool',
    desc: 'Dual-pane notes resource database, code compilers for test cases, and a functional Pomodoro core designed with custom checklist persistence.',
    tech: ['BCA Syllabi', 'Interactive Mock Console', 'Pomodoro Thread', 'LocalStorage'],
    liveId: '#student-hub'
  },
  {
    id: 'spec-4',
    title: 'ANA Classes Promotion',
    type: 'Creative Landing Web',
    desc: 'Modern academy promo card with courses list, active redirection triggers and a New Delhi campus transit directions guide locator.',
    tech: ['Figma Blueprint', 'Responsive Bento', 'Map Redirections', 'Netlify App'],
    liveId: '#ana-classes'
  }
];

export default function App() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tool' | 'other'>('all');
  
  // Dynamic persisted stats states
  const [viewsCount, setViewsCount] = useState(METRICS_BASE.views);
  const [followersCount, setFollowersCount] = useState(METRICS_BASE.followers);
  const [starsCount, setStarsCount] = useState(METRICS_BASE.stars);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [hasStarred, setHasStarred] = useState(false);

  // Profile views counter logic (increments once per initial load)
  useEffect(() => {
    const isNewLoad = !sessionStorage.getItem('azmatullah_session_counted');
    const existingViews = Number(localStorage.getItem('azmatullah_cumulative_views') || METRICS_BASE.views);
    
    if (isNewLoad) {
      const incremented = existingViews + 1;
      setViewsCount(incremented);
      localStorage.setItem('azmatullah_cumulative_views', incremented.toString());
      sessionStorage.setItem('azmatullah_session_counted', 'true');
    } else {
      setViewsCount(existingViews);
    }

    // Load follow/star states
    setHasFollowed(localStorage.getItem('azmatullah_followed_state') === 'true');
    setHasStarred(localStorage.getItem('azmatullah_starred_state') === 'true');
  }, []);

  // Sync Follower counter state
  useEffect(() => {
    const baseVal = METRICS_BASE.followers;
    setFollowersCount(hasFollowed ? baseVal + 1 : baseVal);
  }, [hasFollowed]);

  // Sync Star counter state
  useEffect(() => {
    const baseVal = METRICS_BASE.stars;
    setStarsCount(hasStarred ? baseVal + 1 : baseVal);
  }, [hasStarred]);

  // Greetings cyclic rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleFollowToggle = () => {
    const nextVal = !hasFollowed;
    setHasFollowed(nextVal);
    localStorage.setItem('azmatullah_followed_state', nextVal.toString());
  };

  const handleStarToggle = () => {
    const nextVal = !hasStarred;
    setHasStarred(nextVal);
    localStorage.setItem('azmatullah_starred_state', nextVal.toString());
  };

  const filteredTech = TECH_ITEMS.filter((item) => {
    if (techFilter === 'all') return true;
    return item.category === techFilter;
  });

  const triggerScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] flex flex-col font-sans border-[12px] border-[#1A1A1A] relative">
      {/* Visual background lines / starry elements */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-neon-green/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* NAVBAR */}
      <Header />

      {/* CORE WRAPPER */}
      <main className="flex-1 w-full flex flex-col">

        {/* HERO SECTION - ABOUT ME AND QUICK DYNAMIC METRICS */}
        <section id="about-dashboard" className="relative border-b border-white/10">
          <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* 1. LEFT SIDEBAR INFO (col-span-3) */}
            <div className="lg:col-span-3 border-r border-[#1A1A1A] lg:border-white/10 p-6 md:p-8 flex flex-col justify-between gap-8 bg-[#0F0F0F]/50">
              <div className="space-y-6">
                <p className="text-[#00FF7F] text-xs font-mono font-bold tracking-[0.2em]">// WHO AM I</p>
                
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF7F] to-cyan-500 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative rounded-xl overflow-hidden bg-black p-2 border border-white/10">
                    <img
                      src={avatarImg}
                      alt="Md Azmatullah"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg grayscale contrast-120 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black leading-tight text-white mb-2 italic tracking-tight">Md Azmatullah</h2>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    BCA Student & Web Developer based in New Delhi. I turn abstract ideas into clean, functional code.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Current Focus</span>
                    <span className="text-xs font-semibold text-white">Full-Stack Mastery & DSA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Organization</span>
                    <span className="text-xs font-semibold text-white">ANA Classes (Founder/Dev)</span>
                  </div>
                </div>
              </div>

              {/* Terminal Uptime Badge */}
              <div className="bg-white/5 p-4 rounded border border-white/10 font-mono text-[10px] leading-relaxed">
                <span className="text-[#00FF7F]">Terminal:</span> azmat:~$ uptime<br/>
                <span className="text-gray-500 italic">"Consistency is my power."</span>
              </div>
            </div>

            {/* 2. CENTRAL DISPLAY PANEL (col-span-6) */}
            <div className="lg:col-span-6 border-r border-[#1A1A1A] lg:border-white/10 flex flex-col justify-between bg-black">
              <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12">
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tighter uppercase text-white">
                  Creative<br/><span className="text-stroke-white text-transparent">Coder</span>
                </h1>
                
                <p className="mt-8 text-sm md:text-base font-light text-gray-300 max-w-md leading-relaxed font-sans">
                  Building modern digital experiences with <span className="text-[#00FF7F] font-bold">HTML, CSS, React, and Python</span>.
                </p>

                {/* Simulated Jump Links */}
                <div className="flex flex-wrap gap-2 mt-8">
                  <button 
                    onClick={() => triggerScroll('#quote-verse')}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all font-semibold rounded cursor-pointer"
                  >
                    QuoteVerse
                  </button>
                  <button 
                    onClick={() => triggerScroll('#snake-widget')}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all font-semibold rounded cursor-pointer"
                  >
                    Snake Game
                  </button>
                  <button 
                    onClick={() => triggerScroll('#student-hub')}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all font-semibold rounded cursor-pointer"
                  >
                    StudentHub
                  </button>
                </div>
              </div>

              {/* Features Bottom Row */}
              <div className="h-36 border-t border-white/10 p-6 md:p-8 grid grid-cols-2 gap-8 bg-[#0B0B0B]">
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-[#00FF7F] font-black mb-1">Featured Project</span>
                  <h3 className="text-lg font-bold text-white uppercase">QuoteVerse</h3>
                  <p className="text-xs text-gray-500 mt-1 font-sans">Mood-based quote generator.</p>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-[#00FF7F] font-black mb-1">Featured Project</span>
                  <h3 className="text-lg font-bold text-white uppercase">StudentHub</h3>
                  <p className="text-xs text-gray-500 mt-1 font-sans">Production dashboard for BCA.</p>
                </div>
              </div>
            </div>

            {/* 3. RIGHT STATS PANEL (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-between bg-[#0F0F0F]/50">
              
              {/* Telemetry Block */}
              <div className="p-6 md:p-8 border-b border-white/10 space-y-6">
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500 block">Telemetry Panel</span>
                
                {/* 3 Metrics Block */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded text-center">
                    <span className="text-lg font-mono font-bold text-white block">{viewsCount}</span>
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mt-1">Views</span>
                  </div>

                  <button 
                    onClick={handleFollowToggle}
                    className={`border p-2.5 rounded text-center transition-all active:scale-[0.97] cursor-pointer ${
                      hasFollowed 
                        ? 'bg-[#00FF7F] text-black border-[#00FF7F]' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg font-mono font-bold block">{followersCount}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest block mt-1">
                      {hasFollowed ? 'Joined' : 'Join'}
                    </span>
                  </button>

                  <button 
                    onClick={handleStarToggle}
                    className={`border p-2.5 rounded text-center transition-all active:scale-[0.97] cursor-pointer ${
                      hasStarred 
                        ? 'bg-[#00FF7F] text-black border-[#00FF7F]' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg font-mono font-bold block">{starsCount}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest block mt-1">
                      {hasStarred ? 'Starred' : 'Star'}
                    </span>
                  </button>
                </div>

                {/* Rotated Motto Badge */}
                <div className="bg-[#00FF7F] text-black p-4 rotate-2 rounded shadow-xl relative overflow-hidden select-none">
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Random Quote</span>
                  <p className="text-xs font-bold leading-relaxed italic">
                    "Har din naya seekho — chhoti chhoti jeet se badi safalta banti hai."
                  </p>
                </div>
              </div>

              {/* Contributor widget */}
              <div className="p-6 md:p-8 flex flex-col justify-end bg-white/5 min-h-[160px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#00FF7F] animate-pulse"></div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#00FF7F]">Active Simulator Status</span>
                </div>
                
                {/* Visual block pattern */}
                <div className="grid grid-cols-4 gap-1">
                  <div className="h-4 bg-[#00FF7F]/20 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/40 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/60 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/80 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/40 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/80 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/100 rounded-sm"></div>
                  <div className="h-4 bg-[#00FF7F]/20 rounded-sm"></div>
                </div>
                
                <p className="text-[9px] mt-2 opacity-50 font-mono text-gray-400">
                  azmatullahsofy / contribution_snake
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* PORTFOLIO CLINT GALLERY WORKSHOWS - "WHAT I BUILD" */}
        <section id="what-i-build" className="py-20 px-4 md:px-8 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#00FF7F] uppercase block mb-2 font-bold">// PORTFOLIO OF FEATURES</span>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
                Interactive <span className="text-stroke-white text-transparent">Modules</span>
              </h3>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto leading-relaxed font-sans">
                No mock grids or empty pages here. In this portfolio, every feature index leads directly into a fully interactive sandbox module embedded on the screen!
              </p>
            </div>

            {/* Grid of 4 portfolio sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROJECTS.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white/5 border border-white/10 hover:border-[#00FF7F]/40 hover:shadow-[0_0_15px_rgba(0,255,127,0.15)] rounded-lg p-5 flex flex-col justify-between space-y-4 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-[#00FF7F] bg-[#00FF7F]/10 border border-[#00FF7F]/20 px-2 py-0.5 rounded">
                      {proj.type}
                    </span>
                    <h4 className="text-white text-base font-display font-black uppercase tracking-tight pt-1">{proj.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans">{proj.desc}</p>
                  </div>

                  {/* Core Tags and Navigate Trigger */}
                  <div className="space-y-3.5 pt-2 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => triggerScroll(proj.liveId)}
                      className="text-xs font-mono text-[#00FF7F] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider"
                    >
                      <span>Engage play widget</span>
                      <ArrowRight className="w-3 h-3 text-[#00FF7F] mt-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SKILLS BENTO FILTERABLE GRID BOARD */}
        <section className="py-20 px-4 md:px-8 border-b border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Filter controls column (4 grids) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] block mb-1 font-bold">// SKILL MATRIX INDEX</span>
                <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter uppercase leading-tight">
                  Languages & <br />
                  <span className="text-stroke-white text-transparent">Tech Stack</span>
                </h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed font-sans">
                  Review confidence levels and practical student use-cases. Use filters to query the full-stack computer science toolkit.
                </p>
              </div>

              {/* Skill category filters */}
              <div className="flex flex-col gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10 max-w-xs">
                {(['all', 'frontend', 'backend', 'database', 'tool', 'other'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTechFilter(filter)}
                    className={`w-full text-left px-4 py-2 rounded text-xs font-mono transition-all uppercase tracking-widest font-bold ${
                      techFilter === filter 
                        ? 'bg-[#00FF7F] text-black font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {filter === 'other' ? 'Java, C++ & DSA' : `${filter} stacks`}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bento list column (8 grids) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredTech.map((tech) => (
                    <motion.div
                      layout
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 shadow flex flex-col justify-between min-h-[110px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-black uppercase tracking-tight font-display">{tech.name}</span>
                        <span className="text-[9px] uppercase font-mono text-[#00FF7F] bg-[#00FF7F]/10 px-1.5 py-0.5 rounded font-bold">{tech.category}</span>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-gray-400 text-[11px] leading-snug font-sans">{tech.useCase}</p>
                        
                        {/* Custom visual level bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center font-mono text-[9px] text-gray-500">
                            <span>CONFIDENCE</span>
                            <span className="text-white font-bold">{tech.level}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#00FF7F] rounded-full transition-all duration-500"
                              style={{ width: `${tech.level}%` }}
                            />
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </section>

        {/* MODULE 1: QUOTEVERSE - RANDOM SHAYARI AND WISDOM GENERATOR */}
        <QuoteVerse />

        {/* MODULE 2: GITHUB SNAKE SIMULATION / GAMEPLAY */}
        <GithubSnake />

        {/* MODULE 3: STUDENT WORKSPACE HUB - ACADEMY NOTES & POMODORO */}
        <StudentHub />

        {/* MODULE 4: ANA ACADEMY PROMOTIONAL LANDING ZONE */}
        <ANAPromo />

        {/* FOOTER & CONNECT & PORTFOLIO REVIEW GUESTBOOK */}
        <Footer />

      </main>
    </div>
  );
}
