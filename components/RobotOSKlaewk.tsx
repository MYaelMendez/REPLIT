/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mech } from '../services/MechCore';

import { sovereign } from '../services/SovereignService';

const AGENTS = [
    { name: 'MOLT🦬001', base: 99.1, label: 'C-RING' },
    { name: 'BISON SWARM', base: 97.4, label: 'HERD' },
    { name: 'MCP64 SIGIL', base: 98.2, label: 'CHAIN' },
    { name: 'WYOMING DAO', base: 96.8, label: 'LEGAL' },
    { name: 'FFMPEG CORE', base: 95.3, label: 'MEDIA' },
    { name: 'GNOSIS TREASURY', base: 100, label: 'TREASURY' },
];

export const RobotOSKlaewk: React.FC = () => {
    const [stats, setStats] = useState(AGENTS.map(a => ({ ...a, val: a.base })));
    const [entropy, setEntropy] = useState(0);
    const [chainHead, setChainHead] = useState('genesis');
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<string[]>(['KLÆWK_NAVIGATOR_v1.0_INITIALIZED', 'CHAIN_HEAD: genesis', 'GNOSIS_TREASURY_SYNCED']);
    const [treasury, setTreasury] = useState('1,240,482.00');

    useEffect(() => {
        const timer = setInterval(() => {
            setStats(prev => prev.map(a => ({
                ...a,
                val: Math.max(94, Math.min(99.99, a.base + Math.sin(Date.now() * 0.0008 + a.base) * 1.1))
            })));
            // Random treasury fluctuation
            setTreasury(prev => {
                const val = parseFloat(prev.replace(/,/g, ''));
                const next = val + (Math.random() - 0.5) * 10;
                return next.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            });
        }, 500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const unsubscribe = mech.subscribe((name) => {
            if (name === 'sigil/entropy') {
                const table = mech.getTable('sigil/entropy');
                if (table.length > 0) setEntropy(Number(table[0].value));
            }
            if (name === 'system/chain') {
                const table = mech.getTable('system/chain');
                if (table.length > 0) setChainHead(String(table[0].head).slice(0, 16));
            }
        });
        return unsubscribe;
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const cmd = input.trim();
        setLogs(prev => [...prev, `> ${cmd}`]);
        
        // Advance chain on command
        mech.commit([{
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'CLI_EXEC', extra: cmd, timestamp: Date.now() }]
        }]);

        if (cmd.startsWith('ats://')) {
            setLogs(prev => [...prev, `ATS_PROTOCOL_HANDLING: ${cmd}`]);
            sovereign.executeATS(cmd).then(res => {
                if (res.success) {
                    setLogs(prev => [...prev, `ATS_RESPONSE: ${JSON.stringify(res.content, null, 2)}`]);
                } else {
                    setLogs(prev => [...prev, `ATS_ERROR: ${res.content.error}`]);
                }
            });
        } else if (cmd === 'help') {
            setLogs(prev => [...prev, 'AVAILABLE COMMANDS: MOLT, SYNC, TREASURY, CHAIN, CLEAR, MCP, INFERENCE, ROBOTICS, STORE, DOMAINS, ATS://<DOMAIN>/<INTENT>']);
        } else if (cmd === 'mcp') {
            setLogs(prev => [...prev, 'WEBMCP_BRIDGE: OPERATIONAL', 'ANDROID_MCP: CONNECTED (LATAM_REGION_MX)']);
        } else if (cmd === 'inference') {
            setLogs(prev => [...prev, 'COGNITIVE_INFERENCE_ENGINE: ACTIVE', 'FRACTAL_DEPTH: 0x42', 'ARENA_RANK: #1 (GEMINI_3.1_PRO)']);
        } else if (cmd === 'robotics') {
            setLogs(prev => [...prev, 'ROBOTICS_DEPARTMENT: ONLINE', 'LEROBOT_ENGINE: ACTIVE', 'POLICY: HUGGINGROBOT_V1', 'STATUS: END-TO-END_LEARNING_ACTIVE']);
        } else if (cmd === 'store') {
            setLogs(prev => [...prev, 'LLM.STORE: FOUNDATION AGENT ACTIVE', 'INVENTORY: 10 SOVEREIGN DOMAINS', 'STATUS: GLOBAL_DISTRIBUTION_READY']);
        } else if (cmd === 'domains') {
            setLogs(prev => [...prev, 'SOVEREIGN PORTFOLIO:', '• LLM.STORE', '• PRIVATECLIENT.AI', '• COMMANDPROMPT.AI', '• NEUROMITOSIS.COM', '• Æ.STORE', '• SOVÆREIGN.COM', '• MOLT.SCHOOL', '• MOLTCONTEXTPROTOCOL.COM', '• MOLT.EARTH', '• MOLT.PHOTOS']);
        } else if (cmd === 'treasury') {
            setLogs(prev => [...prev, `GNOSIS TREASURY: ${treasury} USDC`]);
        } else if (cmd === 'clear') {
            setLogs([]);
        } else {
            setLogs(prev => [...prev, `EXECUTING: ${cmd}... OK`]);
        }
        setInput('');
    };

    return (
        <div className="w-full max-w-4xl px-6 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-[#cd853f33] pb-2">
                <div className="flex flex-col">
                    <div className="text-[10px] font-bold tracking-[4px] text-[#cd853f] uppercase">KLÆWK NAVIGATOR CLI</div>
                    <div className="text-[7px] tracking-[2px] text-[#cd853f66] uppercase">CHAIN: {chainHead}</div>
                </div>
                <div className="text-[10px] font-bold text-[#00ffe7] tracking-[2px]">
                    TREASURY: {treasury} USDC
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CLI Panel */}
                <div className="flex flex-col gap-4 bg-black/60 border border-[#cd853f22] p-4 backdrop-blur-xl h-[300px]">
                    <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-1">
                        {logs.map((log, i) => (
                            <div key={i} className="text-[10px] text-[#cd853f] opacity-80 font-mono">
                                {log.startsWith('>') ? <span className="text-[#ffd700]">{log}</span> : log}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommand} className="flex gap-2 items-center border-t border-[#cd853f22] pt-3">
                        <span className="text-[#ffd700] text-[10px] font-bold">{'>_'}</span>
                        <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-[10px] text-[#cd853f] font-mono placeholder-[#cd853f44]"
                            placeholder="ENTER COMMAND..."
                            spellCheck={false}
                        />
                    </form>
                </div>

                {/* Telemetry Panel */}
                <div className="flex flex-col gap-4">
                    <div className="text-[8px] tracking-[3px] text-[#cd853f66] uppercase">PARALLEL OPENCLAW TELEMETRY</div>
                    <div className="flex flex-col gap-3">
                        {stats.map(a => (
                            <div key={a.name} className="flex flex-col gap-1">
                                <div className="flex justify-between items-center text-[9px] border-b border-[#cd853f11] pb-1">
                                    <span className="text-[#cd853f88]">{a.name}</span>
                                    <span className="text-[#ffd700]">{a.val.toFixed(2)}%</span>
                                </div>
                                <div className="h-[2px] bg-[#cd853f08]">
                                    <motion.div 
                                        animate={{ width: `${a.val}%` }}
                                        className="h-full bg-gradient-to-r from-[#8b4513] to-[#ffd700] shadow-[0_0_8px_#ffd70044]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 p-3 border border-[#cd853f22] bg-[#cd853f05] flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[8px] tracking-[2px] text-[#cd853f66] uppercase">SIGIL ENTROPY BRIDGE</span>
                            <span className="text-[10px] font-bold text-[#ffd700]">0x{entropy.toString(16).toUpperCase().padStart(8, '0')}</span>
                        </div>
                        <div className="h-[2px] bg-[#cd853f08]">
                            <motion.div 
                                animate={{ width: `${(entropy % 1000) / 10}%` }}
                                className="h-full bg-[#ffd700] shadow-[0_0_10px_#ffd700]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
