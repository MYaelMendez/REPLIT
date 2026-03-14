/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { mech } from '../services/MechCore';
import { motion, AnimatePresence } from 'motion/react';

export const MechIDE: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [code, setCode] = useState<string>('#territory = [x: 10, y: 20]\n#flux = #territory.x + 5');
    const [logs, setLogs] = useState<string[]>(['MECH_CORE_v0.2.0_INITIALIZED', 'READY_FOR_BUILD']);
    const [tables, setTables] = useState<Record<string, any>>({});
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const unsubscribe = mech.subscribe((tableName) => {
            setTables(prev => ({
                ...prev,
                [tableName]: mech.getTable(tableName)
            }));
        });
        
        // Initial load
        setTables({
            'system/core': mech.getTable('system/core'),
            'sigil/entropy': mech.getTable('sigil/entropy')
        });

        return unsubscribe;
    }, []);

    const runCode = () => {
        try {
            mech.parseAndRun(code);
            setLogs(prev => [...prev, `[OK] EXECUTED: ${code.split('\n')[0]}...`]);
        } catch (e: any) {
            setLogs(prev => [...prev, `[ERR] ${e.message}`]);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 z-[300] flex flex-col bg-[#020204]/95 border border-[#cd853f33] text-[#00FF41] font-mono p-4 md:p-6 gap-4 backdrop-blur-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        >
            <div className="flex justify-between items-center border-b border-[#cd853f22] pb-3">
                <div className="flex flex-col">
                    <div className="text-[10px] tracking-[4px] uppercase text-[#cd853f]">Mech Build Environment</div>
                    <div className="text-[8px] opacity-40 mt-1">CORE_v0.2.0 // æ_SUBSYSTEM</div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={runCode}
                        className="text-[10px] border border-[#00FF41] px-4 py-1.5 hover:bg-[#00FF41] hover:text-black transition-all font-bold"
                    >
                        RUN_BUILD
                    </button>
                    <button 
                        onClick={onClose}
                        className="text-[10px] border border-[#fb7185] px-4 py-1.5 hover:bg-[#fb7185] hover:text-black transition-all font-bold"
                    >
                        CLOSE
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Editor */}
                <div className="flex flex-col gap-2">
                    <div className="text-[8px] text-[#cd853f80] uppercase tracking-widest">Source (.mec)</div>
                    <textarea
                        ref={inputRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-black/50 p-4 text-xs resize-none outline-none border border-white/5 focus:border-[#00FF41]/30 transition-colors shadow-inner"
                        spellCheck={false}
                    />
                </div>

                {/* Tables / Output */}
                <div className="flex flex-col gap-2 overflow-hidden">
                    <div className="text-[8px] text-[#cd853f80] uppercase tracking-widest">Active Tables</div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 scrollbar-none">
                        {Object.entries(tables).map(([name, data]) => (
                            <div key={name} className="border border-white/5 bg-white/[0.02] p-3">
                                <div className="text-[9px] text-sky-400 mb-2 font-bold tracking-wider">#{name}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    {(data as any[]).map((row: any, i: number) => (
                                        <React.Fragment key={i}>
                                            {Object.entries(row).map(([k, v]) => (
                                                <React.Fragment key={`${i}-${k}`}>
                                                    <div className="text-[8px] opacity-40 uppercase">{k}:</div>
                                                    <div className="text-[10px] text-white/80 truncate">{String(v)}</div>
                                                </React.Fragment>
                                            ))}
                                            {i < (data as any[]).length - 1 && <div className="col-span-2 border-t border-white/5 my-1" />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logs */}
            <div className="h-24 border-t border-white/5 pt-3 overflow-y-auto scrollbar-none">
                {logs.map((log, i) => (
                    <div key={i} className={`text-[9px] mb-1 ${log.startsWith('[ERR]') ? 'text-red-500' : 'opacity-60'}`}>
                        <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString('en-GB')}]</span>
                        {log}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
