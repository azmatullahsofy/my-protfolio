/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Github, Linkedin, Clock, Sparkles, Server } from 'lucide-react';

export default function Header() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      };
      setTimeStr(d.toLocaleTimeString('en-US', options) + ' UTC');
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const menuItems = [
    { label: 'About Me', href: '#about-dashboard' },
    { label: 'QuoteVerse', href: '#quote-verse' },
    { label: 'Snake Sim', href: '#snake-widget' },
    { label: 'StudentHub', href: '#student-hub' },
    { label: 'ANA Classes', href: '#ana-classes' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0A]/85 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-green rounded-full flex items-center justify-center text-black font-black text-xs font-sans">
            AZ
          </div>
          <div>
            <span className="text-white font-display font-black text-sm tracking-tight uppercase block">Md Azmatullah</span>
            <span className="text-[9px] font-mono text-[#00FF7F] tracking-widest uppercase block leading-none mt-1 font-bold">PORTFOLIO V.24.0</span>
          </div>
        </div>

        {/* ANCHOR LINKS (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 hover:text-[#00FF7F] hover:bg-white/5 transition-all font-bold uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* STATUS COUNTER / DIGITAL WATCH */}
        <div className="flex items-center gap-3">
          
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[10px] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] animate-pulse" />
            <span className="text-gray-300 font-medium whitespace-nowrap">
              {timeStr}
            </span>
          </div>

          <div className="text-[10px] uppercase tracking-widest font-bold text-[#00FF7F] hidden md:block">
            Open for Work
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-1.5">
            <a 
              href="https://github.com/azmatullahsofy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all active:scale-95"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/md-azmatullah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all active:scale-95"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </header>
  );
}
