/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { mech } from '../services/MechCore';
import { sovereign } from '../services/SovereignService';

export const RobotOSDiveComputer: React.FC = () => {
    const [depth, setDepth] = useState(0);
    const [clarity, setClarity] = useState(0);
    const [ndl, setNdl] = useState(4700); // No Decompression Limit (seconds)
    const [asymptote, setAsymptote] = useState(0);

    useEffect(() => {
        const unsubscribe = mech.subscribe((name) => {
            if (name === 'system/chain') {
                const table = mech.getTable('system/chain');
                setDepth(table.length * 1.25);
            }
        });

        const timer = setInterval(() => {
            // Asymptotic clarity calculation: C = 100 * (1 - e^(-kt))
            setClarity(prev => {
                const target = 100;
                const k = 0.05;
                const next = prev + (target - prev) * k;
                return next;
            });

            setNdl(prev => Math.max(0, prev - 1));
            
            // Asymptotic curve value for visualization
            setAsymptote(Math.sin(Date.now() * 0.001) * 0.5 + 0.5);
        }, 1000);

        return () => {
            unsubscribe();
            clearInterval(timer);
        };
    }, []);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-[220px] md:w-64 bg-black/90 border-2 border-[#ffd700] p-3 md:p-4 rounded-lg shadow-[0_0_20px_#ffd70044] z-[200] font-mono scale-90 md:scale-100 origin-bottom-right">
            <div className="flex justify-between items-center border-b border-[#ffd70033] pb-2 mb-3">
                <div className="text-[9px] md:text-[10px] font-bold text-[#ffd700] tracking-[1px] md:tracking-[2px]">MCP DIVE COMPUTER</div>
                <div className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="flex flex-col">
                    <span className="text-[7px] md:text-[8px] text-[#ffd70066] uppercase">Depth (m)</span>
                    <span className="text-xl md:text-2xl font-bold text-[#ffd700]">{depth.toFixed(1)}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[7px] md:text-[8px] text-[#ffd70066] uppercase">NDL (min)</span>
                    <span className="text-xl md:text-2xl font-bold text-[#ffd700]">{formatTime(ndl)}</span>
                </div>
            </div>

            <div className="mt-3 md:mt-4 flex flex-col gap-1">
                <div className="flex justify-between text-[7px] md:text-[8px] text-[#ffd70066] uppercase">
                    <span>Asymptotic Clarity</span>
                    <span>{clarity.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 bg-[#ffd70011] rounded-full overflow-hidden border border-[#ffd70022]">
                    <motion.div 
                        animate={{ width: `${clarity}%` }}
                        className="h-full bg-[#ffd700] shadow-[0_0_10px_#ffd700]"
                    />
                </div>
                {clarity < 80 && (
                    <div className="text-[6px] md:text-[7px] text-[#ba0c2f] font-bold animate-pulse mt-1">
                        ⚠ DECOMPRESSION WARNING
                    </div>
                )}
            </div>

            <div className="mt-3 md:mt-4 h-10 md:h-12 relative overflow-hidden border border-[#ffd70022] bg-black/40">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40">
                    <path 
                        d={`M 0 20 Q 25 ${20 - asymptote * 15}, 50 20 T 100 20`}
                        fill="none"
                        stroke="#ffd700"
                        strokeWidth="0.5"
                        className="opacity-40"
                    />
                    <path 
                        d={`M 0 20 Q 25 ${20 + asymptote * 15}, 50 20 T 100 20`}
                        fill="none"
                        stroke="#ffd700"
                        strokeWidth="0.5"
                        className="opacity-20"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[7px] text-[#ffd70044] tracking-[2px] md:tracking-[3px] uppercase">
                    Metacortex Waveform
                </div>
            </div>

            <div className="mt-2 md:mt-3 flex justify-between items-center text-[6px] md:text-[7px] text-[#ffd70066] uppercase tracking-widest">
                <span className="truncate max-w-[120px]">ID: {sovereign.getSystemStatus().system_status}</span>
                <span className="text-[#ffd700]">LOCKED</span>
            </div>
        </div>
    );
};
