/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Send, Github, Linkedin, Instagram, Youtube, Heart, 
  MapPin, Sparkles, Code, CheckCircle, MessageSquare, Terminal 
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Guestbook list state
  const [guestMessages, setGuestMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('azmatullah_greetings');
    return saved ? JSON.parse(saved) : [
      { name: 'Prof. Sharma', email: '', subject: 'BCA Supervisor', message: 'Wonderful portfolio, Azmat! The interactive compiler represents creative engineering at its best.', timestamp: 'May 28, 2026' },
      { name: 'Kunal Verma', email: '', subject: 'Fellow Dev', message: 'Loved the Contribution Snake game! Clean code style.', timestamp: 'May 29, 2026' }
    ];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const newMessage: ContactMessage = {
        name: name.trim(),
        email: email.trim() || 'anonymous@domain.com',
        subject: 'Guestbook Greetings',
        message: message.trim(),
        timestamp: formattedDate
      };

      const revisedList = [newMessage, ...guestMessages];
      setGuestMessages(revisedList);
      localStorage.setItem('azmatullah_greetings', JSON.stringify(revisedList));

      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset inputs
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  const socialsList = [
    { label: 'GitHub', icon: <Github className="w-4 h-4" />, href: 'https://github.com/azmatullahsofy', color: 'hover:text-white hover:bg-slate-900 border-slate-900 hover:border-slate-800' },
    { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/in/md-azmatullah', color: 'hover:text-blue-400 hover:bg-blue-950/20 border-slate-900 hover:border-blue-900/30' },
    { label: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/azmuonkavita', color: 'hover:text-rose-400 hover:bg-rose-950/20 border-slate-900 hover:border-rose-900/30' },
    { label: 'YouTube', icon: <Youtube className="w-4 h-4" />, href: 'https://youtube.com/@azmuer.7', color: 'hover:text-red-400 hover:bg-red-950/20 border-slate-900 hover:border-red-900/30' }
  ];

  return (
    <footer id="contact" className="relative bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 px-4 md:px-8 overflow-hidden">
      
      {/* Decorative gradients */}
      <div className="absolute left-10 bottom-0 w-82 h-82 rounded-full filter blur-[120px] bg-[#00FF7F]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Contact panel + Guestbook container split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* LEFT: Contact formulation and Social details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded text-xs font-mono text-[#00FF7F] font-bold uppercase">
                <Code className="w-3.5 h-3.5 animate-pulse text-[#00FF7F]" />
                <span>Let's collaborate</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                Connect With <span className="text-stroke-white text-transparent">Md Azmatullah</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg font-sans">
                Have a job opportunity, a student program proposal, or just want to discuss modern web designs? Drop a packet here. My server answers eagerly.
              </p>
            </div>

            {/* Quick specifications lists */}
            <div className="space-y-4 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded max-w-sm">
                <Mail className="w-4 h-4 text-[#00FF7F]" />
                <a href="mailto:azmatullahmd113@gmail.com" className="hover:text-white transition-colors">
                  azmatullahmd113@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded max-w-sm">
                <MapPin className="w-4 h-4 text-[#00FF7F]" />
                <span>New Delhi, India</span>
              </div>
            </div>

            {/* Direct action links row */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] block font-bold">// SOCIAL CHANNELS</span>
              <div className="flex flex-wrap gap-2">
                {socialsList.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300 hover:text-white hover:border-[#00FF7F]/40 hover:shadow-[0_0_15px_rgba(0,255,127,0.1)] transition-all flex items-center gap-2 active:scale-95 uppercase font-bold tracking-wider cursor-pointer"
                  >
                    {soc.icon}
                    <span>{soc.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Combined Interactive form & Guestbook Whiteboard preview */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-6 shadow-xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#00FF7F] font-bold tracking-widest flex items-center gap-1.5 uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>LIVE PORTFOLIO GUEST GREETINGS</span>
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
              </div>
            </div>

            {/* Guestbook Greetings list container */}
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {guestMessages.map((msg, idx) => (
                <div key={idx} className="bg-black p-3 rounded border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[9px] text-gray-500">
                    <span className="font-semibold text-gray-300 uppercase tracking-tight">{msg.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-400 text-xs italic leading-relaxed font-sans">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Input Submission Card */}
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Name *</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF7F] font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF7F] font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Guestbook Message *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a lovely portfolio review or code challenge for Azmat!"
                  rows={2}
                  className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF7F] font-sans resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#00FF7F] hover:bg-emerald-400 font-mono font-black text-xs text-black rounded uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Terminal className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message to guestbook</span>
                    </>
                  )}
                </button>
              </div>

              {/* Form Success Overlay alerts */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="bg-[#00FF7F] border border-black text-black font-mono font-black p-3 rounded text-[10px] text-center flex items-center justify-center gap-2 mt-2 uppercase tracking-wide leading-tight"
                  >
                    <CheckCircle className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Packet received! Message posted successfully.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Low brand footer credit notes */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500">
          <div>
            <p className="font-bold text-gray-400">"Code mera skill hai, consistency meri power hai, aur growth meri identity hai."</p>
            <p className="mt-1">© 2026 Md Azmatullah • BCA Student & Creative Coder</p>
          </div>

          <div className="flex items-center gap-1">
            <span>Built beautiful with React, Tailwind & Framer Motion</span>
            <Heart className="w-2.5 h-2.5 text-[#00FF7F] fill-[#00FF7F] animate-pulse ml-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
}
