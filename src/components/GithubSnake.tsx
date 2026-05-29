/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RefreshCw, Trophy, Gamepad2, Sparkles, Sliders } from 'lucide-react';
import { SnakeSegment, CommitBerry } from '../types';

// Grid size configuration
const COLS = 20;
const ROWS = 7;

export default function GithubSnake() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isManual, setIsManual] = useState(false); // false = AI auto-simulation, true = manual gameplay
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('azmatullah_snake_highscore') || 42);
  });
  
  // Grid contributions representation (0 = empty, 1-4 = light to neon green levels)
  const [grid, setGrid] = useState<number[][]>(() => {
    // Generate initial semi-random commit history
    const initialGrid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() > 0.6) {
          initialGrid[r][c] = Math.floor(Math.random() * 4) + 1; // 1 to 4
        }
      }
    }
    return initialGrid;
  });

  // State for snake and food
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 }
  ]);
  const [direction, setDirection] = useState<'RIGHT' | 'LEFT' | 'UP' | 'DOWN'>('RIGHT');
  const [berry, setBerry] = useState<CommitBerry>({ x: 12, y: 3, value: 4 });
  const [lastDirection, setLastDirection] = useState<'RIGHT' | 'LEFT' | 'UP' | 'DOWN'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  // Refs for safety in intervals
  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Generate a random spawn for a commit berry
  const spawnBerry = useCallback((currentSnake: SnakeSegment[]): CommitBerry => {
    let attempts = 0;
    while (attempts < 200) {
      const rx = Math.floor(Math.random() * COLS);
      const ry = Math.floor(Math.random() * ROWS);
      // Ensure it does not spawn on the snake
      const onSnake = currentSnake.some(seg => seg.x === rx && seg.y === ry);
      if (!onSnake) {
        return { x: rx, y: ry, value: Math.floor(Math.random() * 4) + 1 };
      }
      attempts++;
    }
    return { x: 18, y: 6, value: 4 }; // fallback
  }, []);

  // Keyboard controls for Manual Mode
  useEffect(() => {
    if (!isManual || gameOver || !isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (lastDirection !== 'DOWN') setDirection('UP');
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (lastDirection !== 'UP') setDirection('DOWN');
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (lastDirection !== 'RIGHT') setDirection('LEFT');
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (lastDirection !== 'LEFT') setDirection('RIGHT');
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isManual, lastDirection, gameOver, isPlaying]);

  // Main game loop logic
  useEffect(() => {
    if (gameOver || !isPlaying) return;

    const intervalTime = isManual ? 110 : 180; // Speed adjustment for AI vs Human

    const loop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let nextDir = directionRef.current;

        // --- AI Auto Pathfinding Mode ---
        if (!isManual) {
          // Calculate vector to food
          const dx = berry.x - head.x;
          const dy = berry.y - head.y;
          
          const possibleDirs: { dir: 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'; distance: number; score: number }[] = [];
          
          const directions: { dir: 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'; dx: number; dy: number }[] = [
            { dir: 'RIGHT', dx: 1, dy: 0 },
            { dir: 'LEFT', dx: -1, dy: 0 },
            { dir: 'UP', dx: 0, dy: -1 },
            { dir: 'DOWN', dx: 0, dy: 1 }
          ];

          directions.forEach(({ dir, dx: stepX, dy: stepY }) => {
            // Opposite of current direction is blocked
            if (
              (dir === 'RIGHT' && lastDirection === 'LEFT') ||
              (dir === 'LEFT' && lastDirection === 'RIGHT') ||
              (dir === 'UP' && lastDirection === 'DOWN') ||
              (dir === 'DOWN' && lastDirection === 'UP')
            ) {
              return;
            }

            const newX = (head.x + stepX + COLS) % COLS;
            const newY = (head.y + stepY + ROWS) % ROWS;

            // Check self-collision
            const collidesSelf = prevSnake.some((seg, idx) => {
              if (idx === prevSnake.length - 1) return false; // tail moves
              return seg.x === newX && seg.y === newY;
            });

            if (!collidesSelf) {
              // Manhattan distance to berry
              const dist = Math.abs(berry.x - newX) + Math.abs(berry.y - newY);
              possibleDirs.push({ dir, distance: dist, score: 0 });
            }
          });

          if (possibleDirs.length > 0) {
            // Sort by shortest distance to food
            possibleDirs.sort((a, b) => a.distance - b.distance);
            nextDir = possibleDirs[0].dir;
            setDirection(nextDir);
          } else {
            // Desperate move block - opposite of lastDirection
            const options: ('RIGHT' | 'LEFT' | 'UP' | 'DOWN')[] = ['RIGHT', 'LEFT', 'UP', 'DOWN'];
            nextDir = options.find(d => d !== lastDirection) || lastDirection;
          }
        }

        // Keep direction state updated
        setLastDirection(nextDir);

        // Calculate next head position (with grid wrapping for safety and fun!)
        let newHeadX = head.x;
        let newHeadY = head.y;

        if (nextDir === 'RIGHT') newHeadX += 1;
        if (nextDir === 'LEFT') newHeadX -= 1;
        if (nextDir === 'UP') newHeadY -= 1;
        if (nextDir === 'DOWN') newHeadY += 1;

        // Seamless screen wrapping to look like a infinite commit pipeline
        newHeadX = (newHeadX + COLS) % COLS;
        newHeadY = (newHeadY + ROWS) % ROWS;

        // Check self collision (only in manual mode, AI prevents it automatically above)
        if (isManual) {
          const selfHit = prevSnake.some(seg => seg.x === newHeadX && seg.y === newHeadY);
          if (selfHit) {
            setGameOver(true);
            setIsPlaying(false);
            return prevSnake;
          }
        }

        const newSnake = [{ x: newHeadX, y: newHeadY }, ...prevSnake];

        // Check food collision
        if (newHeadX === berry.x && newHeadY === berry.y) {
          // Play score & stats count
          const nextScore = score + berry.value * 10;
          setScore(nextScore);
          if (nextScore > highScore) {
            setHighScore(nextScore);
            localStorage.setItem('azmatullah_snake_highscore', nextScore.toString());
          }

          // Dynamically paint this grid block greener in Md Azmatullah's contribution chart
          setGrid((prevGrid) => {
            const nextGrid = prevGrid.map(row => [...row]);
            const currentLevel = nextGrid[berry.y][berry.x];
            nextGrid[berry.y][berry.x] = Math.min(currentLevel + berry.value, 4); // upgrade level
            return nextGrid;
          });

          // Spawn new berry
          setBerry(spawnBerry(newSnake));
        } else {
          newSnake.pop(); // standard move, remove tail
        }

        return newSnake;
      });
    }, intervalTime);

    return () => clearInterval(loop);
  }, [isPlaying, gameOver, isManual, berry, score, highScore, spawnBerry]);

  // Restart functional pipeline
  const handleRestart = () => {
    setSnake([
      { x: 5, y: 3 },
      { x: 4, y: 3 },
      { x: 3, y: 3 }
    ]);
    setDirection('RIGHT');
    setLastDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleClearGrid = () => {
    const freshGrid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    setGrid(freshGrid);
  };

  const setManualMode = (manual: boolean) => {
    setIsManual(manual);
    handleRestart();
  };

  // Color generator for github cubes
  const getContributionColor = (level: number, isSnakeSeg: boolean, isHead: boolean, isBerry: boolean) => {
    if (isHead) return 'bg-white border-2 border-[#00FF7F] shadow-[0_0_12px_rgba(0,255,127,0.8)] scale-105 z-10 animate-pulse';
    if (isSnakeSeg) return 'bg-[#00FF7F] scale-95 border border-[#00FF7F]/30 rounded-sm';
    if (isBerry) return 'bg-rose-500 scale-105 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-bounce cursor-pointer';

    // standard contribution green gradients (Tailwind custom colors)
    switch (level) {
      case 1: return 'bg-emerald-950/30 border border-emerald-900/10'; // light
      case 2: return 'bg-emerald-900/50 border border-emerald-800/25'; // medium
      case 3: return 'bg-emerald-700/70 border border-emerald-600/30'; // high
      case 4: return 'bg-[#00FF7F] border border-[#00FF7F]/50 shadow-[0_0_8px_rgba(0,255,127,0.3)]'; // intense
      default: return 'bg-white/5 border border-white/5'; // zero/default
    }
  };

  return (
    <section id="snake-widget" className="relative py-16 px-4 md:px-8 border-b border-white/10 bg-[#0A0A0A] bg-grid-pattern">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Widget Header banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded text-xs font-mono text-[#00FF7F] mb-3 font-bold uppercase">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Interactive Contribution Snake</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
              Commit <span className="text-stroke-white text-transparent">Garden</span> Simulator
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl font-sans">
              An interactive visual tribute to GitHub branding. Switch to manual mode, control the snake, eat berries, and build up Md Azmatullah's beautiful greens!
            </p>
          </div>

          {/* Metrics Displays */}
          <div className="flex items-center gap-3 font-bold">
            <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 leading-none">HIGH SCORE</p>
                <p className="text-white text-sm font-mono mt-0.5">{highScore}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF7F] animate-pulse" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 leading-none">COMMITTED CODE</p>
                <p className="text-[#00FF7F] text-sm font-mono mt-0.5">{score} pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid & Control Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Main Visual Board (3 parts) */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="border border-white/10 bg-black/60 p-5 rounded relative overflow-hidden backdrop-blur-md">
              
              {/* Wrapping grid board container */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[500px] flex flex-col gap-1 mx-auto select-none">
                  <div className="flex gap-1 justify-end font-mono text-[9px] text-gray-400 mb-1">
                    <span className="mr-auto pl-1 text-[#00FF7F] uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#00FF7F]" /> 
                      {isManual ? 'MANUAL CODER PLAYGROUND' : 'AI CODER IN AUTOPILOT'}
                    </span>
                    <span>Mon</span>
                    <span className="mx-2">Wed</span>
                    <span className="mr-1">Fri</span>
                  </div>

                  {/* Render Github Matrix */}
                  {Array(ROWS).fill(null).map((_, rIdx) => (
                    <div key={rIdx} className="flex gap-1">
                      {Array(COLS).fill(null).map((_, cIdx) => {
                        const isHead = snake[0].x === cIdx && snake[0].y === rIdx;
                        const isSnakeSeg = snake.some((seg, idx) => idx > 0 && seg.x === cIdx && seg.y === rIdx);
                        const isBerry = berry.x === cIdx && berry.y === rIdx;
                        const level = grid[rIdx][cIdx];

                        return (
                          <div
                            key={cIdx}
                            className={`w-6 h-6 rounded-[3px] transition-all duration-150 relative ${getContributionColor(level, isSnakeSeg, isHead, isBerry)}`}
                          >
                            {isBerry && (
                              <div className="absolute inset-0.5 rounded-full bg-rose-500 animate-ping opacity-60 pointer-events-none" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Over Modal overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6 z-20">
                  <span className="text-4xl">💻💥</span>
                  <h3 className="text-xl font-display font-black text-[#00FF7F] mt-2 uppercase tracking-widest">Stack Overflow!</h3>
                  <p className="text-gray-400 text-xs mt-1 max-w-xs font-sans">Your snake collided with active code blocks or itself. Re-compile to try again!</p>
                  <button
                    onClick={handleRestart}
                    className="mt-4 px-5 py-2.5 bg-[#00FF7F] hover:bg-emerald-400 text-black font-mono text-xs font-black rounded uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Re-Compile Program (Restart)
                  </button>
                </div>
              )}

              {/* Controls inside the matrix box */}
              <div className="border-t border-white/5 mt-4 pt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-gray-500 font-bold uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-white/5 border border-white/5" />
                  <span>No Commits</span>
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-emerald-950/30" />
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-emerald-700/70" />
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#00FF7F]" />
                  <span className="text-gray-400 ml-1">More Commits</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#00FF7F]" />
                  <span className="text-gray-400">Snake</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" />
                  <span className="text-gray-400">Berry (Repo Issue)</span>
                </div>
              </div>
            </div>

            {/* Mobile / Screen Controllers */}
            {isManual && !gameOver && (
              <div className="flex flex-col items-center gap-1 py-2 bg-slate-900/10 rounded-xl border border-slate-900 max-w-[200px] mx-auto md:hidden">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest text-center">Touch Controls</p>
                
                <button 
                  onClick={() => directionRef.current !== 'DOWN' && setDirection('UP')}
                  className="w-10 h-10 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-xs"
                >
                  ▲
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => directionRef.current !== 'RIGHT' && setDirection('LEFT')}
                    className="w-10 h-10 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-xs"
                  >
                    ◀
                  </button>
                  <button 
                    onClick={() => directionRef.current !== 'LEFT' && setDirection('RIGHT')}
                    className="w-10 h-10 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-xs"
                  >
                    ▶
                  </button>
                </div>
                <button 
                  onClick={() => directionRef.current !== 'UP' && setDirection('DOWN')}
                  className="w-10 h-10 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-xs"
                >
                  ▼
                </button>
              </div>
            )}
          </div>

          {/* Right Controls Panel/Configs Block (1 part) */}
          <div className="bg-white/5 border border-white/10 p-5 rounded space-y-4">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-[#00FF7F]" />
              <span>DASHBOARD CONTROLS</span>
            </span>

            {/* Mode Selector Swapper */}
            <div className="space-y-2">
              <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">Game State Mode</p>
              <div className="grid grid-cols-2 gap-1 bg-black p-1 rounded border border-white/10">
                <button
                  onClick={() => setManualMode(false)}
                  className={`py-1.5 rounded text-xs font-mono transition-all font-bold uppercase tracking-wider cursor-pointer ${
                    !isManual 
                      ? 'bg-[#00FF7F] text-black font-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  AI Autopilot
                </button>
                <button
                  onClick={() => setManualMode(true)}
                  className={`py-1.5 rounded text-xs font-mono transition-all font-bold uppercase tracking-wider cursor-pointer ${
                    isManual 
                      ? 'bg-[#00FF7F] text-black font-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Gamer Mode
                </button>
              </div>
            </div>

            {/* Simulation controls */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">Simulators Actions</p>
              <div className="space-y-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={gameOver}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded text-xs font-mono font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pause Pipeline</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#00FF7F]" />
                      <span>Resume Pipeline</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded text-xs font-mono font-bold uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#00FF7F]" />
                  <span>Restart Board</span>
                </button>

                <button
                  onClick={handleClearGrid}
                  className="w-full py-2 text-rose-500 hover:text-rose-400 text-[10px] font-mono text-center block font-bold uppercase tracking-widest cursor-pointer"
                >
                  Wipe Contribution Greens ⚡
                </button>
              </div>
            </div>

            {/* Instruction cards */}
            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[11px] leading-relaxed text-gray-400">
              <span className="text-[#00FF7F] font-bold block mb-1 uppercase tracking-wider">🎮 Instructions</span>
              {isManual ? (
                <span>
                  Control using <strong className="text-[#00FF7F]">Arrow Keys</strong> or <strong className="text-[#00FF7F]">WASD</strong>. Grow the snake and paint the contribution calendar greener! Wrapping screen mode is ON.
                </span>
              ) : (
                <span>
                  Watch the <strong className="text-[#00FF7F]">AI pathfinder</strong> autonomously hunt down berries, solving the shortest grid vectors without crashing. Perfect chill background simulator.
                </span>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
