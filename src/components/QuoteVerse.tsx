/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Copy, Check, Plus, RefreshCw, Eye, Heart, BookOpen } from 'lucide-react';
import { Quote as QuoteType } from '../types';

const INITIAL_QUOTES: QuoteType[] = [
  {
    id: 'az-1',
    text: "Code mera skill hai, consistency meri power hai, aur growth meri identity hai.",
    author: "Md Azmatullah",
    translation: "Coding is my skill, consistency is my power, and growth is my identity.",
    category: "motivation",
    moodColor: "from-cyan-500 to-emerald-500 shadow-cyan-900/40"
  },
  {
    id: 'az-2',
    text: "Har din naya seekho — chhoti chhoti jeet se badi safalta banti hai.",
    author: "Md Azmatullah",
    translation: "Learn something new every day — small wins build up to big successes.",
    category: "motivation",
    moodColor: "from-cyan-500 to-emerald-500 shadow-cyan-900/40"
  },
  {
    id: 'iq-1',
    text: "Khudi ko kar buland itna ke har taqdeer se pehle, Khuda bande se khud pooche bata teri raza kya hai.",
    author: "Allama Iqbal",
    translation: "Elevate yourself to such heights that before writing your destiny, God Himself asks what is your desire.",
    category: "sufi",
    moodColor: "from-violet-600 to-indigo-600 shadow-violet-900/40"
  },
  {
    id: 'iq-2',
    text: "Sitaron se aage jahan aur bhi hain, abhi ishq ke imtihan aur bhi hain.",
    author: "Allama Iqbal",
    translation: "There are worlds beyond the stars; there are still more tests of passion and love ahead.",
    category: "sufi",
    moodColor: "from-violet-600 to-indigo-600 shadow-violet-900/40"
  },
  {
    id: 'cd-1',
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    translation: "Coding begins with critical thinking, not syntax typing.",
    category: "coding",
    moodColor: "from-teal-500 to-cyan-500 shadow-teal-900/40"
  },
  {
    id: 'cd-2',
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    translation: "Write clear, readable, and human-friendly production code.",
    category: "coding",
    moodColor: "from-teal-500 to-cyan-500 shadow-teal-900/40"
  },
  {
    id: 'cd-3',
    text: "Patience and practice turn syntax errors into clean solutions.",
    author: "Creative Coding Rules",
    category: "coding",
    moodColor: "from-teal-500 to-cyan-500 shadow-teal-900/40"
  },
  {
    id: 'sh-1',
    text: "Zindagi to apne hi dam par jee jati hai, doosron ke kandhon par to sirf janaze uthaye jaate hain.",
    author: "Bhagat Singh",
    translation: "Life is lived on one's own terms; only funerals are carried on others' shoulders.",
    category: "shayari",
    moodColor: "from-rose-500 to-orange-500 shadow-rose-900/40"
  },
  {
    id: 'sh-2',
    text: "Mile na mile ye to muqaddar ki baat hai, hum koshish hi na karein ye to galat baat hai.",
    author: "Unknown Poet",
    translation: "Whether we succeed or not is a matter of destiny, but not even trying is a sheer failure.",
    category: "shayari",
    moodColor: "from-rose-500 to-orange-500 shadow-rose-900/40"
  },
  {
    id: 'sh-3',
    text: "Waqt lagta hai seekhne mein, magar jab seekh jao toh waqt badal deta hai.",
    author: "Creative Wisdom",
    translation: "It takes time to learn, but once learned, it changes time itself.",
    category: "shayari",
    moodColor: "from-rose-500 to-orange-500 shadow-rose-900/40"
  }
];

export default function QuoteVerse() {
  const [quotes, setQuotes] = useState<QuoteType[]>(() => {
    const saved = localStorage.getItem('azmatullah_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [activeCategory, setActiveCategory] = useState<'motivation' | 'coding' | 'shayari' | 'sufi'>('motivation');
  const [currentQuote, setCurrentQuote] = useState<QuoteType>(INITIAL_QUOTES[0]);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('azmatullah_quote_likes');
    return saved ? JSON.parse(saved) : {};
  });
  const [likedList, setLikedList] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);

  // Custom user input quote state
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  // Setup initial quote filter on category change
  useEffect(() => {
    const filtered = quotes.filter(q => q.category === activeCategory);
    if (filtered.length > 0) {
      // Pick a random one from the category
      const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentQuote(randomQuote);
    }
  }, [activeCategory, quotes]);

  const handleNextQuote = () => {
    setSpinning(true);
    const filtered = quotes.filter(q => q.category === activeCategory);
    if (filtered.length > 1) {
      let nextQuote = filtered[Math.floor(Math.random() * filtered.length)];
      while (nextQuote.id === currentQuote.id) {
        nextQuote = filtered[Math.floor(Math.random() * filtered.length)];
      }
      setCurrentQuote(nextQuote);
    } else if (filtered.length === 1) {
      setCurrentQuote(filtered[0]);
    }
    setTimeout(() => setSpinning(false), 500);
  };

  const handleCopy = () => {
    const fullText = `"${currentQuote.text}" — ${currentQuote.author || 'Anonymous'}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLike = () => {
    const quoteId = currentQuote.id;
    if (likedList.includes(quoteId)) return; // Already liked in this session

    const updatedLikes = {
      ...likes,
      [quoteId]: (likes[quoteId] || 0) + 1
    };
    setLikes(updatedLikes);
    setLikedList([...likedList, quoteId]);
    localStorage.setItem('azmatullah_quote_likes', JSON.stringify(updatedLikes));
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    let defaultColor = 'from-cyan-500 to-emerald-500 shadow-cyan-900/40';
    if (activeCategory === 'sufi') {
      defaultColor = 'from-violet-600 to-indigo-600 shadow-violet-900/40';
    } else if (activeCategory === 'coding') {
      defaultColor = 'from-teal-500 to-cyan-500 shadow-teal-900/40';
    } else if (activeCategory === 'shayari') {
      defaultColor = 'from-rose-500 to-orange-500 shadow-rose-900/40';
    }

    const created: QuoteType = {
      id: `user-${Date.now()}`,
      text: newText,
      author: newAuthor.trim() || 'Guest Thinker',
      translation: newTranslation.trim() || undefined,
      category: activeCategory,
      moodColor: defaultColor
    };

    const updatedQuotes = [created, ...quotes];
    setQuotes(updatedQuotes);
    localStorage.setItem('azmatullah_quotes', JSON.stringify(updatedQuotes));
    setCurrentQuote(created);

    // Reset Form
    setNewText('');
    setNewAuthor('');
    setNewTranslation('');
    setIsAdding(false);
  };

  const categoryThemes = {
    motivation: {
      label: '🚀 Motivation',
      bg: 'bg-cyan-950/40 border-cyan-800/30 text-cyan-400',
      glow: 'glow-cyan',
      heading: 'from-cyan-400 to-emerald-400',
      accentText: 'text-cyan-400'
    },
    coding: {
      label: '💻 Tech & Logic',
      bg: 'bg-teal-950/40 border-teal-800/30 text-teal-400',
      glow: 'glow-emerald',
      heading: 'from-teal-400 to-cyan-400',
      accentText: 'text-teal-400'
    },
    shayari: {
      label: '✍️ Shayari & Poetry',
      bg: 'bg-rose-950/40 border-rose-800/30 text-rose-400',
      glow: 'glow-rose',
      heading: 'from-rose-400 to-orange-400',
      accentText: 'text-rose-400'
    },
    sufi: {
      label: '✨ Sufi & Deep Word',
      bg: 'bg-violet-950/40 border-violet-800/30 text-violet-400',
      glow: 'glow-violet',
      heading: 'from-violet-400 to-fuchsia-400',
      accentText: 'text-violet-400'
    }
  };

  const currentTheme = categoryThemes[activeCategory];

  return (
    <section id="quote-verse" className="relative py-16 px-4 md:px-8 border-b border-white/10 bg-[#0A0A0A]">
      {/* Absolute Neon Glow background decorations */}
      <div className="absolute left-1/3 top-1/4 w-72 h-72 rounded-full filter blur-[120px] bg-[#00FF7F]/5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded text-xs font-mono text-gray-400 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00FF7F] animate-pulse" />
            <span>Interactive QuoteVerse Widget</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
            Creative <span className="text-stroke-white text-transparent">Thought</span> Greenhouse
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto font-sans">
            Explore wisdom, poetry, and programmer philosophies sorted by mood. Feel free to leave your own quote or shayari on the live board!
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {(['motivation', 'coding', 'shayari', 'sufi'] as const).map((cat) => {
            const isSel = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setIsAdding(false); }}
                className={`px-4 py-2 rounded text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-300 border font-bold cursor-pointer ${
                  isSel 
                    ? `bg-[#00FF7F] text-black border-[#00FF7F]` 
                    : `bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10`
                }`}
              >
                {categoryThemes[cat].label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Display Card */}
          <div className="md:col-span-2">
            <div className={`overflow-hidden rounded-2xl border bg-slate-900/60 backdrop-blur-xl ${currentTheme.bg} transition-all duration-500 ${currentTheme.glow}`}>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between pointer-events-none mb-6">
                  <span className="text-xs font-mono tracking-wider uppercase opacity-45">MD AZMATULLAH WORD CLOUD</span>
                  <Quote className="w-8 h-8 opacity-20 text-slate-300" />
                </div>

                <div className="min-h-[140px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuote.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <p className="text-white text-lg md:text-xl font-display font-medium leading-relaxed italic">
                        "{currentQuote.text}"
                      </p>
                      
                      {currentQuote.translation && (
                        <div className="border-l-2 border-slate-700/60 pl-4 py-1">
                          <p className="text-slate-400 text-sm italic font-sans">
                            {currentQuote.translation}
                          </p>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500">
                          — {currentQuote.author || 'Anonymous'}
                        </span>

                        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800/40">
                          <button
                            onClick={handleLike}
                            className={`flex items-center gap-1 text-xs group transition-colors ${
                              likedList.includes(currentQuote.id) 
                                ? 'text-red-400' 
                                : 'text-slate-400 hover:text-rose-400'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 transition-transform ${
                              likedList.includes(currentQuote.id) ? 'fill-red-400 scale-110' : 'group-hover:scale-110'
                            }`} />
                            <span className="font-mono text-[11px]">
                              {likes[currentQuote.id] || 0}
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Interaction Bar */}
                <div className="border-t border-slate-800/50 mt-8 pt-5 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-slate-900/30 hover:bg-slate-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Your Wisdom</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      title="Copy Quote"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800/50 relative active:scale-95"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleNextQuote}
                      title="Next Quote"
                      disabled={spinning}
                      className={`p-2 rounded-lg bg-slate-950 border border-slate-800 font-semibold ${currentTheme.accentText} hover:bg-slate-900 transition-all flex items-center justify-center active:scale-95`}
                    >
                      <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Drawer: Active Whiteboard Activity/Submit Form */}
          <div className="w-full">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {!isAdding ? (
                  <motion.div
                    key="board-status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>WHITEBOARD STATS</span>
                    </div>
                    <div className="space-y-3.5">
                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/50">
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider font-mono">Quotes Pool Size</div>
                        <div className="text-white text-xl font-display font-semibold mt-0.5">{quotes.length} total thoughts</div>
                      </div>

                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/50">
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider font-mono">My Contributions</div>
                        <div className="text-white text-xl font-display font-semibold mt-0.5">
                          {quotes.filter(q => q.id.startsWith('user')).length} quotes uploaded
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <span className="text-slate-400 text-xs font-mono block">Recent Added Quotes:</span>
                        <div className="max-h-[100px] overflow-y-auto space-y-1.5 pr-1">
                          {quotes.slice(0, 3).map((q) => (
                            <div 
                              key={q.id} 
                              onClick={() => setCurrentQuote(q)}
                              className="text-[11px] text-slate-400 bg-slate-900/80 p-1.5 rounded border border-slate-800/40 hover:text-white cursor-pointer truncate transition-all flex items-center justify-between"
                            >
                              <span className="truncate">"{q.text}"</span>
                              <span className="text-[9px] text-slate-500 font-mono flex items-center px-1">
                                <Eye className="w-2.5 h-2.5 mr-0.5" /> preview
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAdding(true)}
                      className="w-full mt-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl text-xs font-mono border border-slate-800 transition-all text-center block"
                    >
                      Post Your Custom Quote →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="add-quote-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmitQuote}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">NEW BOARD QUOTE</span>
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="text-slate-500 hover:text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px] font-mono block">Quote / Shayari Text *</label>
                      <textarea
                        required
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Write your creative coding quote or classic shayari here..."
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px] font-mono block">Author Name</label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Mirza Ghalib, Md Azmatullah (blank = Guest)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px] font-mono block">English Translation (Optional)</label>
                      <input
                        type="text"
                        value={newTranslation}
                        onChange={(e) => setNewTranslation(e.target.value)}
                        placeholder="Provide translation so international readers can enjoy"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-mono rounded-xl text-xs font-semibold hover:shadow-cyan-900/20 hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      Publish to Live Board ✨
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
