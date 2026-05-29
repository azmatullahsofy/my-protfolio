/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Terminal, Timer, CheckSquare, Plus, Trash2, 
  Play, Pause, RefreshCw, Layers, ChevronRight, Check,
  BookMarked, Download, MessageSquareCode, FileCode, CheckCircle2
} from 'lucide-react';
import { BCASubject, StudyTask, ReviewFlashcard } from '../types';

const BCA_CURRICULUM: BCASubject[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    iconName: 'Layers',
    description: 'BCA Core: arrays, stacks, trees, sorting complexes and run analysis.',
    topics: [
      {
        title: 'Asymptotic Analysis & Big O',
        summary: 'Measuring program time and space complexities as inputs grow.',
        content: 'Big O defines upper bound bounds. For instance, binary searches have O(log n) complexities, whereas bubble sorting behaves in quadratic O(n²) time.',
        codeExample: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1',
        codeLanguage: 'python'
      },
      {
        title: 'Singly Linked Lists',
        summary: 'Sequence of node structures carrying data and reference links.',
        content: 'Unlike dynamic arrays, linked lists hold O(1) insertion and deletion efficiency because they do not require full-scale index shifting.',
        codeExample: 'class Node:\n    def __init__(self, val):\n      self.data = val\n      self.next = None',
        codeLanguage: 'python'
      }
    ]
  },
  {
    id: 'webdev',
    title: 'Modern Web Technologies',
    iconName: 'FileCode',
    description: 'Building semantic responsive layouts using HTML5, modern ES6+ React and tailwind.',
    topics: [
      {
        title: 'React Functional Hooks',
        summary: 'State tracking and lifestyle mounts in components without writing class structures.',
        content: 'Use useState for local React properties, and useEffect to handle api queries, subscriptions, or safe custom localstorage syncing.',
        codeExample: 'import React, { useState, useEffect } from "react";\n\nfunction ActiveTimer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <div>Time elapsed: {seconds}s</div>;\n}',
        codeLanguage: 'tsx'
      },
      {
        title: 'Tailwind CSS Grid & Flex',
        summary: 'Utility-first layout engines supporting reactive layouts easily.',
        content: 'Use grid-cols-1 md:grid-cols-3 to build fluid desktop bento architectures that adapt to mobile layouts automatically.',
        codeExample: '<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\n  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">Card 1</div>\n</div>',
        codeLanguage: 'html'
      }
    ]
  },
  {
    id: 'oops',
    title: 'Object-Oriented Coding',
    iconName: 'MessageSquareCode',
    description: 'Python, Java & C++: Encapsulation, Polymorphism, Inheritance models.',
    topics: [
      {
        title: 'Class Inheritance & Polymorphism',
        summary: 'Designing modular, re-usable base classes for student operations.',
        content: 'Allows child classes to override parent operations, enabling specialized runtimes.',
        codeExample: 'class Student:\n    def __init__(self, name, roll):\n        self.name = name\n        self.roll = roll\n\nclass BcaStudent(Student):\n    def focus_study(self):\n        return f"{self.name} is writing code!"',
        codeLanguage: 'python'
      }
    ]
  }
];

const RECRUIT_PREP: ReviewFlashcard[] = [
  {
    id: 'q-1',
    question: 'What is a Pointer in C/C++ memory management?',
    answer: 'A pointer is a variable that stores the direct memory address of another variable, instead of storing a raw data value. It is initialized using the asterisk (*) symbol and address-of operator (&).',
    category: 'C++ Systems'
  },
  {
    id: 'q-2',
    question: 'Difference between SQL and NoSQL databases?',
    answer: 'SQL are relational, table-based databases (like MySQL) with strict schema models and ACID properties. NoSQL are non-relational, document or key-value based (like MongoDB) that support dynamic, flexible schemas and scale horizontally.',
    category: 'Databases'
  },
  {
    id: 'q-3',
    question: 'How does React Virtual DOM boost page speeds?',
    answer: 'React creates a lightweight in-memory copy of the real DOM. When state changes, it reconciles differences on the virtual tree first, then performs minimal batch updates on the actual DOM (diffing algorithm), avoiding expensive full-page reflows.',
    category: 'Frontend Engineering'
  }
];

const CODE_PRACTICE_TEMPLATES = [
  {
    label: 'Bubble Sort (Python)',
    code: `# Bubble Sort sorting function\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nscores = [89, 45, 93, 12, 77]\nprint("Sorted Array:", bubble_sort(scores))`,
    output: `Executing bubble_sort.py...\n>> Initial values: [89, 45, 93, 12, 77]\n>> Inside Swaps: 12 <=> 45\n>> Inside Swaps: 45 <=> 77\n>> [RESULT] Sorted Array: [12, 45, 77, 89, 93]\nProcess finished with exit code 0`
  },
  {
    label: 'SQL Join Query (Relational)',
    code: `-- Fetch student notes along with enrollment details\nSELECT students.name, courses.subject_title, enrollments.grade\nFROM enrollments\nINNER JOIN students ON enrollments.std_id = students.id\nINNER JOIN courses ON enrollments.c_id = courses.id\nWHERE enrollments.grade = 'A+';`,
    output: `Executing database_query.sql...\n>> Connecting to Local SQLite instance...\n>> Query processed successfully:\n+---------------+-------------------------+-------+\n| name          | subject_title           | grade |\n+---------------+-------------------------+-------+\n| Md Azmatullah | Data Structures & Algos | A+    |\n| John Doe      | Web Technologies        | A+    |\n+---------------+-------------------------+-------+\n2 rows returned from memory table database.`
  },
  {
    label: 'React State Update (JS)',
    code: `// Simple dynamic state counter hook mockup\nconst [clicks, setClicks] = useState(0);\n\nconst triggerUpdate = () => {\n  setClicks(prev => prev + 1);\n  console.log("Active state modified!");\n};`,
    output: `Bundling source script...\n>> Local compilation success.\n>> Running counter simulation...\n>> Console: "Active state modified! New count: 1"\n>> State re-render completed smoothly.`
  }
];

export default function StudentHub() {
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'pomo'>('notes');
  const [selectedSubject, setSelectedSubject] = useState<BCASubject>(BCA_CURRICULUM[0]);
  const [openedTopicIndex, setOpenedTopicIndex] = useState<number | null>(0);
  const [revealedFlashcard, setRevealedFlashcard] = useState<string | null>(null);
  const [hubAlert, setHubAlert] = useState<string | null>(null);

  const showHubAlert = (msg: string) => {
    setHubAlert(msg);
    setTimeout(() => setHubAlert(null), 5000);
  };

  // Practice Editor States
  const [editorCode, setEditorCode] = useState(CODE_PRACTICE_TEMPLATES[0].code);
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('Write or select code above, then click [Run Code Compiler] to trigger simulated feedback.');

  // Pomodoro States
  const [pomoTime, setPomoTime] = useState(1500); // 25 mins in seconds
  const [pomoActive, setPomoActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  // Todo Task states inside student workspace
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('azmatullah_study_todos');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Revise Single Linked List operations', completed: true, priority: 'high' },
      { id: '2', title: 'Revise Big O time complexities for QuickSort', completed: false, priority: 'high' },
      { id: '3', title: 'Build interactive map component for ANA promotion', completed: false, priority: 'medium' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('azmatullah_study_todos', JSON.stringify(todos));
  }, [todos]);

  // Pomodoro dynamic Countdown loop
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (pomoActive && pomoTime > 0) {
      timerId = setInterval(() => {
        setPomoTime(prev => prev - 1);
      }, 1000);
    } else if (pomoActive && pomoTime === 0) {
      // Toggle Focus / Break modes
      if (isBreak) {
        setIsBreak(false);
        setPomoTime(1500); // 25 mins focus
        showHubAlert('Break over! Time to focus on core coding.');
      } else {
        setIsBreak(true);
        setPomoTime(300); // 5 min break
        showHubAlert('Deep work study block finished! Take a 5 minute break.');
      }
      setPomoActive(false);
    }
    return () => clearInterval(timerId);
  }, [pomoActive, pomoTime, isBreak]);

  const handleRunCode = () => {
    setIsCompiling(true);
    setConsoleOutput('Checking syntax trees... Compiling packages...\n>> Building local binary references...');
    
    setTimeout(() => {
      // Check if custom code matches any template, else output standard fallback success
      const matched = CODE_PRACTICE_TEMPLATES.find(t => t.code.trim().substring(0, 40) === editorCode.trim().substring(0, 40));
      if (matched) {
        setConsoleOutput(matched.output);
      } else {
        setConsoleOutput(`Interpreting user program...\n>> Dynamic analysis successful.\n>> Running developer script output:\n-------------------------\nProgram ran with zero terminal errors!\nCustom content feedback: ${editorCode.length} characters successfully read.\n-------------------------\nProcess execution finished safely.`);
      }
      setIsCompiling(false);
    }, 1200);
  };

  const handleLoadTemplate = (txt: string) => {
    setEditorCode(txt);
    setConsoleOutput('Template loaded. Click [Run Code Compiler] to see console feedback.');
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: todoText.trim(),
      completed: false,
      priority: 'medium'
    };
    setTodos([...todos, newTask]);
    setTodoText('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const formatPomoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="student-hub" className="py-16 px-4 md:px-8 border-b border-white/10 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Floating custom top alert block if present */}
        <AnimatePresence>
          {hubAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 z-50 px-6 py-3 bg-[#00FF7F] text-black font-mono font-black text-xs uppercase tracking-widest text-center rounded shadow-[0_0_20px_rgba(0,255,127,0.3)] border border-black flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              <span>{hubAlert}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hub header banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded text-xs font-mono text-[#00FF7F] mb-3 font-bold uppercase">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Educational Workspace Sandbox</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            The <span className="text-stroke-white text-transparent">StudentHub</span> Sandbox
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto font-sans">
            A real-world workspace mimicking a BCA study station. Learn subjects, simulate code testing compilations, and focus with our built-in Pomodoro desk.
          </p>

          {/* Master Tabs Swapper buttons */}
          <div className="flex items-center justify-center gap-2.5 mt-8 max-w-md mx-auto bg-white/5 p-1 rounded border border-white/10">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-mono transition-all font-bold uppercase tracking-wider cursor-pointer ${
                activeTab === 'notes' 
                  ? 'bg-[#00FF7F] text-black border border-[#00FF7F]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notes Prep</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-mono transition-all font-bold uppercase tracking-wider cursor-pointer ${
                activeTab === 'code' 
                  ? 'bg-[#00FF7F] text-black border border-[#00FF7F]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Code Pad</span>
            </button>
            <button
              onClick={() => setActiveTab('pomo')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-mono transition-all font-bold uppercase tracking-wider cursor-pointer ${
                activeTab === 'pomo' 
                  ? 'bg-[#00FF7F] text-black border border-[#00FF7F]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Pomodoro desk</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display area depends on ActiveTab */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: NOTES PREP DRAWERS AND FLASH CARDS */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Subjects index */}
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-wide text-slate-500 uppercase block mb-1">BCA SUBJECT SYLLABI</span>
                {BCA_CURRICULUM.map((subj) => {
                  const isSel = selectedSubject.id === subj.id;
                  return (
                    <button
                      key={subj.id}
                      onClick={() => { setSelectedSubject(subj); setOpenedTopicIndex(0); }}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isSel 
                          ? 'bg-slate-900 border-slate-700 glow-emerald' 
                          : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-slate-950 border border-slate-900 ${isSel ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-display font-medium">{subj.title}</h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">{subj.description}</p>
                      </div>
                    </button>
                  );
                })}

                {/* Simulated Study Plan Downloader */}
                <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl space-y-3">
                  <h5 className="text-white text-xs font-mono flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SYLLABUS COMPLETED</span>
                  </h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Md Azmatullah regularly updates these active notebooks during BCA test cycles. You can pull his study log below.
                  </p>
                  <button 
                    onClick={() => showHubAlert("Successfully prepared and initiated download of Azmat_BCA_Syllabus_Guide.pdf!")}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all active:scale-95 uppercase font-bold tracking-widest cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Study Planner PDF</span>
                  </button>
                </div>
              </div>

              {/* Subtopic details center panel */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-xs font-mono tracking-wide text-slate-500 uppercase block mb-3">
                    {selectedSubject.title.toUpperCase()} — ACTIVE TOPICS
                  </span>
                  <div className="space-y-3">
                    {selectedSubject.topics.map((topic, index) => {
                      const isOpened = openedTopicIndex === index;
                      return (
                        <div 
                          key={topic.title} 
                          className="border border-slate-900 bg-slate-950/40 rounded-xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => setOpenedTopicIndex(isOpened ? null : index)}
                            className="w-full text-left p-4 flex items-center justify-between gap-3 bg-slate-950 border-b border-transparent"
                          >
                            <div>
                              <h4 className="text-white text-sm font-display font-medium">{topic.title}</h4>
                              <p className="text-slate-500 text-xs mt-0.5">{topic.summary}</p>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpened ? 'rotate-90' : ''}`} />
                          </button>

                          {isOpened && (
                            <div className="p-4 bg-slate-900/30 border-t border-slate-900 space-y-3">
                              <p className="text-slate-300 text-xs leading-relaxed font-sans">{topic.content}</p>
                              {topic.codeExample && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 px-2.5 py-1 bg-slate-950 rounded-t-lg border-b border-slate-900">
                                    <span>SYNTAX SNIPPET ({topic.codeLanguage?.toUpperCase()})</span>
                                    <span>READ ONLY</span>
                                  </div>
                                  <pre className="p-3 bg-slate-950 text-cyan-300 font-mono text-xs rounded-b-lg overflow-x-auto leading-relaxed border border-slate-900">
                                    <code>{topic.codeExample}</code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Collapsible Interview prep center */}
                <div className="bg-slate-900/20 border border-slate-850 p-5 rounded-2xl">
                  <h4 className="text-emerald-400 text-sm font-mono tracking-wide border-b border-slate-900 pb-2 mb-4 flex items-center gap-1.5">
                    <span>📌 BCA Interview Prep FAQ</span>
                  </h4>
                  <div className="space-y-3.5">
                    {RECRUIT_PREP.map((item) => {
                      const isRev = revealedFlashcard === item.id;
                      return (
                        <div key={item.id} className="bg-slate-950 border border-slate-900 rounded-xl p-3.5">
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h5 className="text-white text-xs font-sans font-medium mt-2 leading-relaxed">{item.question}</h5>
                          
                          <AnimatePresence>
                            {isRev ? (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-slate-400 text-xs leading-relaxed mt-2.5 pt-2 border-t border-slate-900/50"
                              >
                                {item.answer}
                              </motion.p>
                            ) : (
                              <button
                                onClick={() => setRevealedFlashcard(item.id)}
                                className="text-slate-500 hover:text-slate-300 transition-colors text-xs font-mono mt-2 cursor-pointer flex items-center gap-1"
                              >
                                Click to reveal concept answer...
                              </button>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: LIVE CODE COMPILER PLAYGROUND */}
          {activeTab === 'code' && (
            <motion.div
              key="code-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Sidebar templates selector */}
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wide text-slate-500 uppercase block mb-1">CODE EXPERIMENT REPOS</span>
                {CODE_PRACTICE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    onClick={() => handleLoadTemplate(tmpl.code)}
                    className="w-full text-left p-3 bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center justify-between"
                  >
                    <span>{tmpl.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
                
                <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl font-mono text-[11px] text-slate-500 leading-relaxed space-y-2">
                  <span className="text-slate-300 font-semibold block">📐 Developer Note</span>
                  <span>
                    Try editing variables or console statements! Click <strong>[Compile Program]</strong> to see local environment logs simulate standard code feedback.
                  </span>
                </div>
              </div>

              {/* Main code editor box and simulation console */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-black/40">
                  {/* Editor top-bar indicator */}
                  <div className="flex items-center justify-between bg-slate-950 px-4 py-2 border-b border-slate-900 font-mono text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>STUDENT_WORKPAD.py</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  {/* Real TextArea code editor */}
                  <div className="flex">
                    {/* Line counters sidebar column */}
                    <div className="bg-slate-950/40 w-10 font-mono text-xs text-slate-600 text-right pr-2.5 py-4 select-none leading-relaxed border-r border-slate-950">
                      {Array(11).fill(null).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    
                    <textarea
                      value={editorCode}
                      onChange={(e) => setEditorCode(e.target.value)}
                      spellCheck={false}
                      className="w-full bg-transparent font-mono text-xs text-cyan-300 p-4 leading-relaxed focus:outline-none min-h-[220px]"
                    />
                  </div>

                  {/* Submit Run bar */}
                  <div className="bg-slate-950 px-4 py-3 border-t border-slate-900 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-slate-500">Press Compile button to trigger terminal emulator</span>
                    <button
                      onClick={handleRunCode}
                      disabled={isCompiling}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 font-mono font-medium text-xs text-white rounded-lg transition-all active:scale-95 flex items-center gap-2"
                    >
                      {isCompiling ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Compiling...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                          <span>Run Code Compiler</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Output Console simulation panel */}
                <div className="bg-black/90 p-4 rounded-xl border border-slate-900 font-mono text-xs space-y-1.5">
                  <div className="text-[10px] text-slate-500 font-semibold mb-2 uppercase tracking-widest border-b border-slate-950 pb-1 flex justify-between items-center">
                    <span>Terminal Output Console</span>
                    <span className="text-emerald-500">Live Emulator Active</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto leading-relaxed max-h-[140px] whitespace-pre-wrap">
                    <code>{consoleOutput}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: POMODORO CLOCK DESK WITH TASK checklist */}
          {activeTab === 'pomo' && (
            <motion.div
              key="pomo-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
            >
              {/* Pomodoro Clock Widget Card */}
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] glow-violet">
                
                {/* Visual pulse background decoration */}
                <div className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full filter blur-[80px] opacity-10 transition-colors ${
                  isBreak ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                }`}></div>

                <div className="relative z-10 space-y-6 flex flex-col items-center">
                  <span className={`text-[11px] font-mono tracking-wider px-3 py-1 border rounded-full uppercase leading-none ${
                    isBreak 
                      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30' 
                      : 'text-rose-400 bg-rose-950/40 border-rose-800/30'
                  }`}>
                    {isBreak ? '☕ REST BREAK PHASE' : '⚡ DEEP FOCUS SESSION'}
                  </span>

                  {/* Main Time Counter text display */}
                  <h3 className="text-6xl md:text-7xl font-mono text-white tracking-tighter">
                    {formatPomoTime(pomoTime)}
                  </h3>

                  <p className="text-slate-400 text-sm max-w-xs leading-relaxed italic">
                    {isBreak 
                      ? '"Grab a glass of water, stretch your back. Azmatullah recommends a small break so consistency persists."' 
                      : '"Zero notifications. Deep core programming focus. Code mera skill hai!"'}
                  </p>

                  {/* Buttons interface */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setPomoActive(!pomoActive)}
                      className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold rounded-xl tracking-wide transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      {pomoActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Session</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Start Study Focus</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => { setPomoActive(false); setPomoTime(isBreak ? 300 : 1500); }}
                      className="p-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all active:scale-95"
                      title="Reset clock"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Study goals task list checklist */}
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-4">ACTIVE STUDY GOALS</span>
                
                {/* Form to append tasks */}
                <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
                  <input
                    required
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="e.g. Redo Binary Search algorithm"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-slate-100 hover:bg-white text-slate-950 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                {/* Loops task details */}
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {todos.length === 0 ? (
                    <div className="text-center py-8 bg-slate-950/20 rounded-xl border border-slate-900/40">
                      <p className="text-xs text-slate-500 font-mono">No active goals configured.</p>
                      <p className="text-[10px] text-slate-600 font-sans mt-0.5">Focus is complete! Feel free to add some study tasks.</p>
                    </div>
                  ) : (
                    todos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`flex items-center justify-between p-3 border rounded-xl transition-all ${
                          todo.completed 
                            ? 'bg-slate-950/20 border-slate-900 opacity-55' 
                            : 'bg-slate-950/80 border-slate-850'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleToggleTodo(todo.id)}
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              todo.completed 
                                ? 'bg-violet-500 border-violet-400 text-white' 
                                : 'border-slate-700 hover:border-slate-500'
                            }`}
                          >
                            {todo.completed && <Check className="w-3 h-3" />}
                          </button>
                          <span className={`text-xs text-slate-200 mt-0.5 ${todo.completed ? 'line-through text-slate-500' : ''}`}>
                            {todo.title}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-900"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
