import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MorphicCore4D } from './MorphicCore4D';
import { MechIDE } from './MechIDE';

interface UniversalInterfaceProps {
    onClose?: () => void;
}

export const UniversalInterface: React.FC<UniversalInterfaceProps> = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [currentMode, setCurrentMode] = useState<'a' | 'e' | 'p' | 'f'>('a');
    const [tapCount, setTapCount] = useState(0);
    const [lastTapTime, setLastTapTime] = useState(0);
    const [deviceType, setDeviceType] = useState<'default' | 'car' | 'clock'>('default');
    const [output, setOutput] = useState<{ text: string; color?: string; opacity?: number }[]>([
        { text: '[OK] AGENTIC COMMERCE INITIALIZED', color: '#00FF41' },
        { text: '[MODE] Universal Interface v3.0', color: '#FF7518' },
        { text: '/ to enter command mode', opacity: 0.6 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showStructure, setShowStructure] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [activeWindow, setActiveWindow] = useState<'none' | 'spreadsheet' | 'telemetry' | 'agent' | 'build'>('none');
    
    const holdTimerRef = useRef<any>(null);
    const progressPathRef = useRef<SVGCircleElement>(null);
    const outputEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const rippleCount = useRef(0);

    // Device Detection
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1200 && window.innerHeight < 600) {
                setDeviceType('car');
            } else if (window.innerWidth < 450 && window.innerHeight > 700) {
                setDeviceType('clock');
            } else {
                setDeviceType('default');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-scroll terminal
    useEffect(() => {
        outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    const print = (text: string, color?: string, opacity?: number) => {
        setOutput(prev => [...prev, { text, color, opacity }]);
    };

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const full = inputValue.trim();
            if (!full) return;

            print(`🦞_> ${full}`, '#00FF41');

            if (full.startsWith('/')) {
                const cmd = full.substring(1).toLowerCase();
                processCommand(cmd);
            } else {
                print('Invalid Command Prefix. Use / for commands', '#D94F00');
            }
            setInputValue('');
        }
    };

    const processCommand = (cmd: string) => {
        switch (cmd) {
            case 'clear':
                setOutput([]);
                break;
            case 'help':
                print(`
Available Commands:
  /molt         Trigger protocol upgrade
  /status       Show system status
  /time         Display current time
  /clear        Clear terminal
  /mode [a/e]   Switch between modes
  /asymptote    Engage optimization
  /structure    Show command hierarchy
  /purchase     Initiate AgenticEcommerce
  /llm          Access æ llm.store
                `, '#00FF41');
                break;
            case 'status':
                print(`
[SYSTEM]      ONLINE
[MODE]        ${currentMode === 'a' ? 'AGENTIC' : currentMode === 'e' ? 'ELEKTRONIK' : currentMode === 'p' ? 'PRIVATE' : 'FAITH'}
[DEVICE]      ${deviceType}
[ASYMPTOTE]   0.9997
[MCP64]       TROPICAL CORE ONLINE
                `);
                break;
            case 'molt':
                print('INITIATING MOLT SEQUENCE...', '#FF7518');
                print('[OK] New protocol shell hardened');
                print('[OK] Quantum coherence: 0.9999');
                break;
            case 'asymptote':
                print('ENGAGING ASYMPTOTIC OPTIMIZATION...', '#00f2ff');
                print('[OK] Performance parameters adjusted');
                print('[OK] MCP64 tropical core engaged');
                break;
            case 'mode a':
                setCurrentMode('a');
                print('SWITCHED TO AGENTIC MODE', '#FF7518');
                print('[OK] Agent runtime controls activated');
                break;
            case 'mode e':
                setCurrentMode('e');
                print('SWITCHED TO ELEKTRONIK MODE', '#00f2ff');
                print('[OK] Signal routing activated');
                break;
            case 'time':
                print(`SYNC: ${new Date().toISOString()}`);
                break;
            case 'structure':
                setShowStructure(true);
                print('COMMAND STRUCTURE VISUALIZED');
                break;
            case 'build':
                setActiveWindow('build');
                print('INITIALIZING MECH BUILD ENVIRONMENT...', '#00FF41');
                break;
            case 'spreadsheet':
                setActiveWindow('spreadsheet');
                print('ENGAGING TERRITORIAL SPREADSHEET...', '#00FF41');
                break;
            case 'telemetry':
                setActiveWindow('telemetry');
                print('STREAMING MECH TELEMETRY...', '#FF7518');
                break;
            case 'close':
                setActiveWindow('none');
                print('CLOSING TRANSMORPHIC WINDOW');
                break;
            case 'purchase':
                print('INITIATING AGENTIC COMMERCE...', '#FF7518');
                print('[OK] PrivateClient.ai authenticated');
                print('[OK] AgenticEcommerce session started');
                break;
            case 'llm':
                print('CONNECTING TO æ llm.store...', '#00f2ff');
                print('[OK] LLM interface ready');
                break;
            default:
                print('Unknown Command', '#D94F00');
        }
    };

    const startHold = (e: React.MouseEvent | React.TouchEvent) => {
        // Create Quantum Ripple
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        const id = rippleCount.current++;
        setRipples(prev => [...prev, { id, x: clientX, y: clientY }]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);

        if (isUnlocked) {
            const now = Date.now();
            if (now - lastTapTime < 500) {
                setTapCount(prev => prev + 1);
            } else {
                setTapCount(1);
            }
            setLastTapTime(now);

            // Hold for faith mode
            holdTimerRef.current = setTimeout(() => {
                setCurrentMode('f');
                print('ENTERING FAITH MODE', '#00f2ff');
            }, 1000);
        } else {
            let start = Date.now();
            holdTimerRef.current = setInterval(() => {
                let elapsed = Date.now() - start;
                let p = Math.min(elapsed / 1000, 1);
                if (progressPathRef.current) {
                    progressPathRef.current.style.strokeDashoffset = (345.5 - (345.5 * p)).toString();
                }
                if (p >= 1) {
                    clearInterval(holdTimerRef.current);
                    setIsUnlocked(true);
                    print('[OK] KERNEL UNLOCKED. ROOT ACCESS GRANTED.');
                }
            }, 20);
        }
    };

    const endHold = () => {
        if (!isUnlocked) {
            clearInterval(holdTimerRef.current);
            if (progressPathRef.current) {
                progressPathRef.current.style.strokeDashoffset = "345.5";
            }
            return;
        }

        clearTimeout(holdTimerRef.current);

        setTimeout(() => {
            setTapCount(current => {
                if (current === 2) {
                    setCurrentMode('a');
                    print('SWITCHED TO COMMAND MODE', '#FF7518');
                } else if (current === 3) {
                    setCurrentMode('e');
                    print('SWITCHED TO DAO MODE', '#00f2ff');
                } else if (current === 4) {
                    setCurrentMode('p');
                    print('SWITCHED TO PRIVATE MODE', '#FF7518');
                } else if (current === 1 && isUnlocked) {
                    // Single tap when unlocked toggles spreadsheet
                    setActiveWindow(prev => prev === 'spreadsheet' ? 'none' : 'spreadsheet');
                }
                return 0;
            });
        }, 300);
    };

    const MechSpreadsheet = () => (
        <div className="w-full h-full p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex justify-between items-end border-b border-[#00FF41]/30 pb-2">
                <div className="text-[10px] font-bold tracking-[4px] uppercase opacity-50">Territorial Spreadsheet // Mech-Lang</div>
                <div className="text-[8px] opacity-30">MCP64_CORE_V3.1</div>
            </div>
            <div className="grid grid-cols-4 gap-px bg-[#00FF41]/10 border border-[#00FF41]/20">
                {['COORD', 'VECTOR', 'FLUX', 'STATUS'].map(h => (
                    <div key={h} className="bg-black/40 p-2 text-[8px] font-bold text-[#00FF41]/60">{h}</div>
                ))}
                {[
                    ['0x4A', '0.992', '↑ 4.2', 'STABLE'],
                    ['0x4B', '0.814', '↓ 1.1', 'MOLTING'],
                    ['0x4C', '1.000', '→ 0.0', 'LOCKED'],
                    ['0x4D', '0.231', '↖ 9.8', 'ACTIVE'],
                    ['0x4E', '0.556', '↘ 2.4', 'SYNCING'],
                    ['0x4F', '0.112', '↑ 0.5', 'IDLE'],
                ].map((row, i) => (
                    row.map((cell, j) => (
                        <div key={`${i}-${j}`} className="bg-black/20 p-2 text-[9px] font-mono border-t border-[#00FF41]/5">
                            {cell}
                        </div>
                    ))
                ))}
            </div>
            <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full border border-dashed border-[#00FF41] rounded-full animate-spin-slow" />
                </div>
                <div className="text-[120px] opacity-5 font-light">🦞</div>
            </div>
        </div>
    );

    const TransmorphicWindow = () => (
        <AnimatePresence mode="wait">
            {activeWindow !== 'none' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="absolute inset-0 z-[60] flex items-center justify-center"
                >
                    <div className="w-[85%] h-[85%] bg-black/80 backdrop-blur-3xl border border-[#00FF41]/40 rounded-full overflow-hidden shadow-[0_0_100px_rgba(0,255,65,0.2)] relative">
                        {/* Mech Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-10" 
                             style={{ backgroundImage: 'linear-gradient(#00FF41 1px, transparent 1px), linear-gradient(90deg, #00FF41 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                        />
                        
                        {activeWindow === 'spreadsheet' && <MechSpreadsheet />}
                        {activeWindow === 'build' && <MechIDE onClose={() => setActiveWindow('none')} />}
                        {activeWindow === 'telemetry' && (
                            <div className="w-full h-full p-12 flex flex-col items-center justify-center gap-8">
                                <div className="text-4xl font-bold tracking-[10px] text-[#FF7518]">TELEMETRY</div>
                                <div className="w-full h-1 bg-[#FF7518]/20 relative">
                                    <motion.div 
                                        className="absolute inset-y-0 left-0 bg-[#FF7518]"
                                        animate={{ width: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-12 w-full">
                                    {[
                                        { l: 'CORE_TEMP', v: '312.4 K' },
                                        { l: 'ASYMPTOTE', v: '0.9997' },
                                        { l: 'COHERENCE', v: '99.99%' },
                                        { l: 'LATENCY', v: '0.002ms' }
                                    ].map(stat => (
                                        <div key={stat.l} className="flex flex-col gap-1">
                                            <div className="text-[10px] opacity-40">{stat.l}</div>
                                            <div className="text-2xl font-mono">{stat.v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <button 
                            onClick={() => setActiveWindow('none')}
                            className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[#00FF41]/40 flex items-center justify-center hover:bg-[#00FF41]/10 transition-colors z-[70]"
                        >
                            ×
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="universal-interface-container w-full h-full relative overflow-hidden flex items-center justify-center bg-[#000205] font-mono text-[#00FF41] touch-none">
            <MorphicCore4D mode={currentMode} isUnlocked={isUnlocked} />
            
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .norway-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        linear-gradient(45deg, transparent 49.5%, rgba(186, 12, 47, 0.02) 49.5%, rgba(186, 12, 47, 0.02) 50.5%, transparent 50.5%),
                        linear-gradient(-45deg, transparent 49.5%, rgba(186, 12, 47, 0.02) 49.5%, rgba(186, 12, 47, 0.02) 50.5%, transparent 50.5%),
                        linear-gradient(to right, transparent 39.5%, rgba(0, 40, 104, 0.02) 39.5%, rgba(0, 40, 104, 0.02) 40.5%, transparent 40.5%),
                        linear-gradient(to bottom, transparent 49.5%, rgba(0, 40, 104, 0.02) 49.5%, rgba(0, 40, 104, 0.02) 50.5%, transparent 50.5%);
                    background-size: 100% 100%, 100% 100%, 100% 16.67%, 16.67% 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .ae-glyph {
                    font-size: clamp(80px, 15vw, 150px);
                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .ae-glyph.unlocked {
                    color: #00FF41;
                    text-shadow: 0 0 30px #00FF41;
                    animation: pulse 2s infinite alternate;
                }

                @keyframes pulse {
                    0% { text-shadow: 0 0 30px #00FF41; transform: scale(1); }
                    100% { text-shadow: 0 0 50px #00FF41; transform: scale(1.05); }
                }

                .terminal-container {
                    scrollbar-width: none;
                }
                .terminal-container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="norway-bg" />

            {/* Quantum Ripples */}
            {ripples.map(ripple => (
                <motion.div
                    key={ripple.id}
                    className="absolute rounded-full border border-white/20 pointer-events-none z-[100]"
                    initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y, opacity: 0.5 }}
                    animate={{ width: 500, height: 500, x: ripple.x - 250, y: ripple.y - 250, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            ))}

            <div className={`relative flex items-center justify-center transition-all duration-1000 ${
                deviceType === 'car' ? 'w-[95vw] h-[50vh] rounded-2xl' : 
                deviceType === 'clock' ? 'w-[400px] h-[600px] rounded-[40px]' : 
                'w-[min(95vw,850px)] h-[min(95vw,850px)] rounded-full'
            } bg-black/20 backdrop-blur-2xl border border-[#00FF41]/20 shadow-[0_0_50px_rgba(0,255,65,0.1)] z-10 overflow-hidden`}>
                
                {/* Mode Indicators */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-4 z-20">
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-300 ${currentMode === 'a' || currentMode === 'p' ? 'bg-[#FF7518] opacity-100 scale-125' : 'bg-[#FF7518] opacity-20'}`} />
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-300 ${currentMode === 'e' || currentMode === 'f' ? 'bg-[#00f2ff] opacity-100 scale-125' : 'bg-[#00f2ff] opacity-20'}`} />
                </div>

                {/* æ Glyph */}
                <div 
                    className={`ae-glyph select-none cursor-pointer z-50 font-light tracking-tighter ${isUnlocked ? 'unlocked' : 'text-white/10 hover:text-white/20'} ${activeWindow !== 'none' ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100'}`}
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                >
                    æ
                </div>

                <TransmorphicWindow />

                {/* Hold Ring */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none z-40" width="180" height="180" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(255, 117, 24, 0.05)" strokeWidth="1" />
                    <circle 
                        ref={progressPathRef}
                        className="transition-[stroke-dashoffset] duration-100 ease-linear"
                        cx="60" cy="60" r="55" fill="none" stroke="#FF7518" strokeWidth="2" 
                        strokeDasharray="345.5" strokeDashoffset="345.5" strokeLinecap="round" 
                    />
                </svg>

                {/* Terminal */}
                <AnimatePresence>
                    {isUnlocked && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[25%] bg-black/60 border border-[#00FF41]/30 rounded p-4 flex flex-col z-50 backdrop-blur-md"
                        >
                            <div className="terminal-container flex-1 overflow-y-auto mb-2 text-[11px] leading-relaxed">
                                {output.map((line, i) => (
                                    <div key={i} style={{ color: line.color, opacity: line.opacity }} className="mb-1">
                                        {line.text}
                                    </div>
                                ))}
                                <div ref={outputEndRef} />
                            </div>
                            <div className="flex gap-2 border-t border-[#00FF41]/10 pt-2">
                                <span className="text-[#00FF41] font-bold">🦞_&gt;</span>
                                <input 
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="bg-transparent border-none outline-none text-[#00FF41] flex-1 text-[11px] caret-[#00FF41]"
                                    autoFocus
                                    autoComplete="off"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Structure Overlay */}
                <AnimatePresence>
                    {showStructure && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-[10%] top-[25%] z-30 flex flex-col gap-2 border-l border-[#00FF41]/20 pl-4"
                        >
                            {['| controls', '/ commands', '# categories', '^ MCP', '^^ AGENTIC layer', '^^^ AgenticEcommerce', '^^^ æ llm.store'].map((item, i) => (
                                <div key={i} className="text-[10px] text-white/40 hover:text-[#00FF41] transition-colors cursor-pointer">
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Telemetry */}
                <div className="absolute top-[8%] w-full text-center text-xl tracking-[15px] font-bold opacity-40 pointer-events-none">
                    {new Date().toLocaleTimeString('en-GB', { hour12: false })}
                </div>
                <div className="absolute bottom-[8%] w-full text-center text-[8px] tracking-[10px] text-[#FF7518] font-bold uppercase opacity-60 pointer-events-none">
                    Agentic Commerce // Universal
                </div>
                <div className="absolute bottom-[4%] w-full text-center text-[7px] text-white/20 uppercase tracking-widest pointer-events-none">
                    {isUnlocked ? "COMMAND MODE ACTIVE" : "[2:CMD | 3:DAO | 4:PVT | HOLD:FAITH]"}
                </div>
            </div>
        </div>
    );
};
