/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mcp, MCPInferenceStep } from '../services/MCPProtocol';
import { Terminal, Cpu, ShoppingCart, Code, Zap, Layers } from 'lucide-react';

export const RobotOSInference: React.FC = () => {
    const [history, setHistory] = useState<MCPInferenceStep[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isThinking]);

    const handleInference = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        const prompt = input;
        setInput('');
        setIsThinking(true);

        // Add user prompt to history (simulated)
        const steps = await mcp.executeInference(prompt);
        
        // Simulate streaming steps
        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, 600));
            setHistory(prev => [...prev, step]);
        }

        setIsThinking(false);
    };

    return (
        <div className="w-full max-w-5xl h-full md:h-[600px] bg-[#050505] border border-white/10 md:rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-blue-500/5">
            {/* Header: Cloudflare Code Mode Style */}
            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    <span className="text-[9px] md:text-[11px] font-bold tracking-[1px] md:tracking-[2px] text-white/80 uppercase truncate max-w-[150px] md:max-w-none">Software Cognitive Inference</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                        <Cpu size={12} className="text-blue-400" />
                        <span className="text-[9px] text-white/60 font-mono uppercase">WebMCP</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                        <Layers size={12} className="text-emerald-400" />
                        <span className="text-[9px] text-white/60 font-mono uppercase">0x42</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left: Inference Stream */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-[#080808]">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-none">
                        <AnimatePresence mode="popLayout">
                            {history.length === 0 && !isThinking && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30"
                                >
                                    <Terminal size={32} md:size={48} strokeWidth={1} />
                                    <div className="text-[10px] md:text-xs font-mono tracking-widest uppercase">Awaiting Cognitive Input...</div>
                                </motion.div>
                            )}
                            {history.map((step, i) => (
                                <motion.div 
                                    key={step.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-3 md:gap-4"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[8px] md:text-[10px] text-blue-400 font-mono">
                                            {i + 1}
                                        </div>
                                        <div className="w-[1px] flex-1 bg-gradient-to-b from-blue-500/30 to-transparent mt-2" />
                                    </div>
                                    <div className="flex-1 space-y-2 md:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] md:text-[10px] font-mono text-blue-400/80 uppercase tracking-wider">{step.model}</span>
                                            <span className="text-[8px] md:text-[9px] font-mono text-white/20">{new Date(step.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="text-[11px] md:text-xs text-white/90 leading-relaxed font-mono bg-white/5 p-2 md:p-3 rounded-lg border border-white/5">
                                            {step.thought}
                                        </div>
                                        {step.action && (
                                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2 md:p-3 space-y-1 md:space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Code size={10} className="text-emerald-400" />
                                                    <span className="text-[8px] md:text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Tool: {step.action.tool}</span>
                                                </div>
                                                <pre className="text-[8px] md:text-[10px] text-emerald-400/70 font-mono overflow-x-auto">
                                                    {JSON.stringify(step.action.input, null, 2)}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 md:gap-4"
                                >
                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                                    </div>
                                    <div className="text-[8px] md:text-[10px] font-mono text-blue-400/50 animate-pulse uppercase tracking-widest mt-1">
                                        Inference in Progress...
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Bar */}
                    <div className="p-3 md:p-4 bg-white/5 border-t border-white/10">
                        <form onSubmit={handleInference} className="relative">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter intent..."
                                className="w-full bg-black border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                            <button 
                                type="submit"
                                disabled={isThinking || !input.trim()}
                                className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 p-1 md:p-1.5 rounded bg-blue-500 text-white disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                <Zap size={12} md:size={14} fill="currentColor" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Agentic E-commerce Dashboard */}
                <div className="hidden md:flex w-80 bg-black flex-col p-6 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white/40 uppercase tracking-[3px] text-[9px] font-bold">
                            <ShoppingCart size={14} />
                            <span>Agentic E-commerce</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                                <div className="text-[8px] text-white/30 uppercase mb-1">Market</div>
                                <div className="text-xs font-bold text-white/80">LATAM (MX)</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                                <div className="text-[8px] text-white/30 uppercase mb-1">Bridge</div>
                                <div className="text-xs font-bold text-emerald-400">Android MCP</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-[9px] text-white/40 uppercase tracking-[3px] font-bold">Arena Rank Leaderboard</div>
                        <div className="space-y-2">
                            {[
                                { name: "Gemini 3.1 Pro", score: 1482, delta: "+12" },
                                { name: "Gemini 3 Flash", score: 1420, delta: "+8" },
                                { name: "Sovereign-æ", score: 1395, delta: "+45" }
                            ].map((agent, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-white/30">#{i+1}</span>
                                        <span className="text-[10px] text-white/80">{agent.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-white/60">{agent.score}</span>
                                        <span className="text-[8px] font-mono text-emerald-400">{agent.delta}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                            <div className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">System Status</div>
                            <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Inference Load</span>
                                <span className="font-mono">14.2%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
