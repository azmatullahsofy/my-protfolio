/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, MapPin, ExternalLink, Award, Sparkles, 
  Clock, CheckCircle, BookOpen, Map, Copy, Check, Compass 
} from 'lucide-react';

export default function ANAPromo() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const locationAddress = "ANA CLASSES, AB-375/2, Amar Puri, Nabi Karim, Paharganj, New Delhi, Delhi 110055";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(locationAddress).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ANA CLASSES, Paharganj, New Delhi")}`;

  const benefits = [
    {
      title: 'BCA & Programming Specialists',
      desc: 'Dedicated guidance in Java, C++, Python, Data Structures, and complete core university curriculum.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Interactive Code Practicals',
      desc: 'Not just reading theory — every session features active, hands-on laptop coding layouts and exam tasks.',
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Expert Academic Records',
      desc: 'Proven success guides helping students secure high GPA grades and robust portfolio presentations.',
      icon: <Award className="w-5 h-5 text-violet-400" />
    }
  ];

  return (
    <section id="ana-classes" className="relative py-20 px-4 md:px-8 bg-black border-b border-white/10">
      
      {/* Background visual highlight circles */}
      <div className="absolute right-1/4 top-1/3 w-80 h-80 rounded-full filter blur-[130px] bg-[#00FF7F]/5 pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-60 h-60 rounded-full filter blur-[100px] bg-[#00FF7F]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section title header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded text-xs font-mono text-[#00FF7F] mb-4 font-bold uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00FF7F]" />
            <span>Associated Academy</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Elevate Your GPA with <span className="text-stroke-white text-transparent">ANA Classes</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-2xl mx-auto font-sans">
            Md Azmatullah’s core recommendation for computer science students in New Delhi. Academic brilliance meets hands-on coding training with customized tuition curriculums.
          </p>
        </div>

        {/* Master Promo grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Benefits List (3 columns) */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] block mb-1 font-bold">// ACADEMY OFFERINGS</span>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {benefits.map((bene) => (
                  <div 
                    key={bene.title} 
                    className="p-5 bg-white/5 border border-white/10 hover:border-[#00FF7F]/40 rounded-lg transition-all flex items-start gap-4"
                  >
                    <div className="p-2.5 bg-black border border-white/10 rounded mt-0.5 text-[#00FF7F]">
                      {bene.icon}
                    </div>
                    <div>
                      <h4 className="text-white text-base font-display font-black uppercase tracking-tight">{bene.title}</h4>
                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-sans">{bene.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs Buttons section */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00FF7F] font-bold uppercase">
                <Clock className="w-4 h-4 animate-spin text-[#00FF7F]" style={{ animationDuration: '6s' }} />
                <span>Admission Active — Academic Year 2026-2027</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Unlock expert notes, mentorship, and complete coding guidance. Secure your batch slot easily.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://addmissionana.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#00FF7F] hover:bg-emerald-400 text-black rounded text-xs font-mono font-black tracking-widest uppercase transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply Online Today →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://anaclasses.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded text-xs font-mono tracking-widest uppercase transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>Visit ANA website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Coordinates and Maps Guide panel (2 columns) */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg h-full flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              
              {/* Styled Address heading */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#00FF7F]" />
                  <span>CAMPUS LOCATION</span>
                </span>
                
                <div className="bg-black p-4 rounded border border-white/10">
                  <h4 className="text-white text-sm font-black uppercase font-display mb-1.5">Paharganj Headquarters</h4>
                  <p className="text-gray-350 text-xs leading-relaxed font-mono">
                    AB-375/2, Amar Puri, Nabi Karim, Paharganj, New Delhi, Delhi 110055
                  </p>
                  
                  {/* Copy Button */}
                  <button
                    onClick={handleCopyAddress}
                    className="mt-3 py-1.5 px-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded text-gray-400 text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer lowercase"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3 h-3 text-[#00FF7F]" />
                        <span className="text-[#00FF7F]">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Address Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Transit helper directions block */}
              <div className="bg-black p-4 rounded border border-white/10 space-y-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#00FF7F] font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Delhi Transit Commute Guide</span>
                </div>
                
                <div className="space-y-2 text-[11px] text-gray-400 leading-relaxed font-sans">
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] mt-1.5 flex-shrink-0" />
                    <span><strong>Metro Station:</strong> Nabi Karim, RK Ashram Marg (Blue Line) or New Delhi Metro are nearest.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] mt-1.5 flex-shrink-0" />
                    <span><strong>Landmarks:</strong> Amar Puri neighborhood, near Nabi Karim police station.</span>
                  </div>
                </div>
              </div>

              {/* Stylized custom mockup map block with deep redirection CTA */}
              <div className="border border-white/10 rounded bg-black p-4 relative flex flex-col justify-between min-h-[140px] shadow-inner text-center">
                <div className="absolute inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                
                <div className="relative z-10 space-y-2 py-3 flex flex-col items-center">
                  <Map className="w-8 h-8 text-[#00FF7F] animate-bounce" style={{ animationDuration: '4s' }} />
                  <p className="text-white text-xs font-black font-display uppercase tracking-wider">ANA CLASSES LOCATOR</p>
                  <p className="text-gray-500 text-[10px] uppercase font-mono tracking-widest">Paharganj, New Delhi, Delhi 110055</p>
                </div>

                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 w-full py-2.5 bg-[#00FF7F] hover:bg-emerald-400 text-black font-mono text-[10px] uppercase tracking-widest font-black rounded transition-all text-center block cursor-pointer"
                >
                  Open in Google Maps Directions ➔
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
