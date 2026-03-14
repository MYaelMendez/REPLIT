/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RobotOSNavigator } from './RobotOSNavigator';
import { RobotOSSigil } from './RobotOSSigil';
import { RobotOSInference } from './RobotOSInference';
import { RobotOSLeRobot } from './RobotOSLeRobot';
import { RobotOSLLMStore } from './RobotOSLLMStore';
import { RobotOSKlaewk } from './RobotOSKlaewk';
import { RobotOSFFmpeg } from './RobotOSFFmpeg';
import { RobotOSDiveComputer } from './RobotOSDiveComputer';
import { MechIDE } from './MechIDE';
import { mech } from '../services/MechCore';
import { sovereign } from '../services/SovereignService';
import { 
    Home, 
    Database, 
    Bot, 
    Store, 
    Terminal, 
    Cpu, 
    Layers, 
    Menu, 
    X, 
    ChevronRight, 
    Zap,
    ShoppingCart,
    Code
} from 'lucide-react';

export const RobotOS: React.FC = () => {
    const [activeSec, setActiveSec] = useState(0);
    const [chainHead, setChainHead] = useState('0000000000000000');
    const [showIDE, setShowIDE] = useState(false);
    const [diveMode, setDiveMode] = useState(true);
    const [sysStatus, setSysStatus] = useState(sovereign.getSystemStatus());
    const scrollRef = useRef<HTMLDivElement>(null);

    const SECTIONS = [
        { id: 0, label: 'NAVIGATOR' },
        { id: 1, label: 'SIGIL' },
        { id: 2, label: 'INFERENCE' },
        { id: 3, label: 'ROBOTICS' },
        { id: 4, label: 'LLM.STORE' },
        { id: 5, label: 'KLÆWK' },
        { id: 6, label: 'FFMPEG' },
        { id: 7, label: 'MOLT' }
    ];

    useEffect(() => {
        const handleToggle = () => setShowIDE(prev => !prev);
        window.addEventListener('toggle-mech-ide', handleToggle);
        return () => window.removeEventListener('toggle-mech-ide', handleToggle);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const i = Math.round(scrollRef.current.scrollTop / window.innerHeight);
            setActiveSec(i);
            // Sync with mech
            mech.setTable('ui/navigation', [{ active_section: i, label: SECTIONS[i].label }]);
        };
        const el = scrollRef.current;
        el?.addEventListener('scroll', handleScroll, { passive: true });
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Initialize Mech Navigation State
        mech.parseAndRun(`
            #ui/navigation = [active_section: 0, label: "NAVIGATOR"]
            #ui/status = [mode: "standard", dive: true]
        `);

        const unsubscribe = mech.subscribe((name) => {
            if (name === 'ui/navigation') {
                const nav = mech.getTable('ui/navigation')[0];
                if (nav && typeof nav.active_section === 'number' && nav.active_section !== activeSec) {
                    scrollTo(nav.active_section);
                }
            }
            if (name === 'system/chain') {
                const table = mech.getTable('system/chain');
                if (table.length > 0) {
                    setChainHead(String(table[0].head).slice(0, 16));
                }
            }
        });
        return unsubscribe;
    }, [activeSec]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSysStatus(sovereign.getSystemStatus());
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollTo = (i: number) => {
        scrollRef.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className="fixed inset-0 bg-[#020204] text-[#f0f0ff] font-mono overflow-hidden select-none">
            {/* Background Grid */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#cd853f 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Wyoming Bar */}
            <div className="fixed top-0 left-0 right-0 h-14 bg-black/80 border-b border-[#cd853f33] flex items-center px-4 md:px-6 z-[100] backdrop-blur-md">
                <div className="text-xl md:2xl mr-2 md:mr-4">🦬</div>
                <div className="flex flex-col">
                    <div className="text-[8px] md:text-[10px] font-bold tracking-[2px] md:tracking-[4px] text-[#cd853f]">ROBOT🦬OS WYOMING DAO LLC</div>
                    <div className="hidden md:block text-[7px] tracking-[2px] text-[#cd853f66] uppercase">W.S. §§ 17-31-101 et seq. • REGISTERED LEGAL PERSONALITY ✓</div>
                    <div className="md:hidden text-[6px] tracking-[1px] text-[#cd853f66] uppercase">W.S. §§ 17-31-101</div>
                </div>
                <div className="ml-auto flex gap-2 md:gap-6 text-[7px] md:text-[8px] tracking-[1px] md:tracking-[2px] text-[#cd853f88]">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="opacity-40 uppercase">SOVÆREIGN</span>
                        <span className="text-[#ffd700]">{sysStatus.system_status}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="opacity-40 uppercase">MOLT🦬001</span>
                        <span className="text-[#ffd700]">ACTIVE</span>
                    </div>
                    <button 
                        onClick={() => setDiveMode(!diveMode)}
                        className={`px-2 md:px-3 py-0.5 md:py-1 border ${diveMode ? 'bg-[#ffd700] text-black border-[#ffd700]' : 'border-[#ffd70033] text-[#ffd700]'} text-[7px] md:text-[8px] font-bold tracking-[1px] md:tracking-[2px] transition-all hover:scale-105 active:scale-95`}
                    >
                        {diveMode ? 'DIVE' : 'SURFACE'}
                    </button>
                </div>
            </div>

            {/* Ticker */}
            <div className="fixed top-14 left-0 right-0 h-7 bg-[#8b45131a] border-b border-[#cd853f22] overflow-hidden flex items-center z-[90]">
                <div className="whitespace-nowrap animate-[tick_40s_linear_infinite] text-[8px] tracking-[3px] text-[#cd853f88] pl-full">
                    🦬 ROBOT🦬OS WYOMING DAO LLC (W.S. §§ 17-31-101) &nbsp;•&nbsp; MOLT🦬001 LIVE &nbsp;•&nbsp; MERCURY + GNOSIS + STRIPE + IO.NET &nbsp;•&nbsp; HOLOGRAPHIC CONTAINMENT + FFMPEG METABOLISM &nbsp;•&nbsp; PARALLEL OPENCLAW ROUTING &nbsp;•&nbsp; ASYMPTØTIC PRECISION &nbsp;•&nbsp;
                </div>
            </div>

            {/* Nav Dots (Desktop) */}
            <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[100]">
                {SECTIONS.map(s => (
                    <div 
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`w-1.5 h-1.5 rounded-full border border-[#cd853f33] cursor-pointer transition-all duration-300 ${activeSec === s.id ? 'bg-[#cd853f] shadow-[0_0_8px_#cd853f] scale-125' : 'bg-[#cd853f22]'}`}
                    />
                ))}
            </div>

            {/* Mobile Bottom Nav (Mech Optimized) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/90 border-t border-[#cd853f33] flex items-center justify-around z-[100] backdrop-blur-xl px-2">
                {SECTIONS.slice(0, 5).map(s => (
                    <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`flex flex-col items-center gap-1 transition-all ${activeSec === s.id ? 'text-[#ffd700]' : 'text-[#cd853f66]'}`}
                    >
                        <div className={`w-1 h-1 rounded-full ${activeSec === s.id ? 'bg-[#ffd700] shadow-[0_0_5px_#ffd700]' : 'bg-transparent'}`} />
                        <span className="text-[8px] font-bold tracking-[1px]">{s.label.split('.')[0]}</span>
                    </button>
                ))}
                <button 
                    onClick={() => setShowIDE(true)}
                    className="w-10 h-10 rounded-full bg-[#cd853f22] border border-[#cd853f44] flex items-center justify-center text-[#ffd700]"
                >
                    <Zap size={14} />
                </button>
            </div>

            {/* Main Scroll Container */}
            <div ref={scrollRef} className="fixed inset-0 z-10 overflow-y-scroll snap-y snap-mandatory scrollbar-none pt-21 pb-16 md:pb-0">
                {/* SEC 0: HOLOGRAPHIC NAVIGATOR */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
                        <div className="text-[8px] tracking-[4px] uppercase">HOLOGRAPHIC NAVIGATOR</div>
                        <div className="text-[7px] tracking-[2px]">SPD: 40</div>
                    </div>
                    <RobotOSNavigator diveMode={diveMode} />
                </section>

                {/* SEC 1: SIGIL RITUAL */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSSigil />
                </section>

                {/* SEC 2: SOFTWARE COGNITIVE INFERENCE */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSInference />
                </section>

                {/* SEC 3: ROBOTICS DEPARTMENT (LeRobot) */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSLeRobot />
                </section>

                {/* SEC 4: LLM.STORE (Global Model Store) */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSLLMStore />
                </section>

                {/* SEC 5: KLÆWK NAVIGATOR CLI */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSKlaewk />
                </section>

                {/* SEC 4: FFMPEG METABOLISM */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <RobotOSFFmpeg />
                </section>

                {/* SEC 5: MOLT TIMER */}
                <section className="w-full h-screen snap-start flex flex-col items-center justify-center relative">
                    <div className="w-full max-w-md p-8 border border-[#cd853f33] bg-black/40 backdrop-blur-xl flex flex-col items-center gap-6">
                        <div className="text-xl">🦬</div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-[10px] tracking-[4px] text-[#cd853f] uppercase">MOLT🦬001</div>
                            <div className="text-[8px] tracking-[2px] opacity-40 uppercase">CYCLE 1</div>
                            <div className="text-4xl font-bold tracking-[8px] text-[#ffd700]">47:00:00</div>
                        </div>
                        <div className="w-full h-1 bg-[#cd853f11] rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '40%' }}
                                className="h-full bg-gradient-to-r from-[#8b4513] to-[#ffd700] shadow-[0_0_10px_#ffd700]"
                            />
                        </div>
                        <div className="text-[7px] tracking-[2px] opacity-20 uppercase">ASYMPTØTIC PRECISION LOCKED</div>
                    </div>
                </section>
            </div>

            {/* Scanline */}
            <div className="fixed left-0 w-full h-[1px] bg-[#00ffe70a] z-[200] pointer-events-none animate-[scan_8s_linear_infinite]" />

            <AnimatePresence>
                {showIDE && <MechIDE onClose={() => setShowIDE(false)} />}
            </AnimatePresence>

            <AnimatePresence>
                {diveMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    >
                        <RobotOSDiveComputer />
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes scan { from { top: -2%; } to { top: 102%; } }
                @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};
