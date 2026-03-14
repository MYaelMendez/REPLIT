/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Globe, Shield, Terminal, Brain, Zap, Layers, Camera, BookOpen, Globe2 } from 'lucide-react';

const DOMAINS = [
    { id: 'llm.store', label: 'LLM.STORE', category: 'Foundation', icon: ShoppingBag, color: 'text-blue-400', description: 'The Global Model & Software Store' },
    { id: 'privateclient.ai', label: 'PRIVATECLIENT.AI', category: 'Sovereign', icon: Shield, color: 'text-emerald-400', description: 'Sovereign Client Infrastructure' },
    { id: 'commandprompt.ai', label: 'COMMANDPROMPT.AI', category: 'Interface', icon: Terminal, color: 'text-purple-400', description: 'Agentic Command Interface' },
    { id: 'neuromitosis.com', label: 'NEUROMITOSIS.COM', category: 'Cognitive', icon: Brain, color: 'text-orange-400', description: 'Fractal Model Replication' },
    { id: 'æ.store', label: 'Æ.STORE', category: 'Asset', icon: Zap, color: 'text-yellow-400', description: 'Universal Agentic Assets' },
    { id: 'soværeign.com', label: 'SOVÆREIGN.COM', category: 'Identity', icon: Layers, color: 'text-white', description: 'Sovereign Identity Protocol' },
    { id: 'molt.school', label: 'MOLT.SCHOOL', category: 'Education', icon: BookOpen, color: 'text-blue-300', description: 'Cognitive Evolution Academy' },
    { id: 'moltcontextprotocol.com', label: 'MOLTCONTEXTPROTOCOL.COM', category: 'Protocol', icon: Globe, color: 'text-indigo-400', description: 'Universal Context Bridge' },
    { id: 'molt.earth', label: 'MOLT.EARTH', category: 'Planetary', icon: Globe2, color: 'text-emerald-500', description: 'Planetary Computing Mesh' },
    { id: 'molt.photos', label: 'MOLT.PHOTOS', category: 'Media', icon: Camera, color: 'text-pink-400', description: 'Agentic Media Synthesis' }
];

export const RobotOSLLMStore: React.FC = () => {
    const [selected, setSelected] = useState(DOMAINS[0]);

    return (
        <div className="w-full max-w-6xl h-full md:h-[700px] bg-[#050505] border border-white/10 md:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            {/* Header: LLM.STORE Foundation */}
            <div className="h-14 md:h-16 border-b border-white/10 bg-white/5 flex items-center px-4 md:px-6 justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <ShoppingBag size={18} className="text-white md:hidden" />
                        <ShoppingBag size={24} className="text-white hidden md:block" />
                    </div>
                    <div>
                        <div className="text-[10px] md:text-[12px] font-bold tracking-[2px] md:tracking-[3px] text-white uppercase">LLM.STORE</div>
                        <div className="text-[7px] md:text-[9px] text-white/40 font-mono uppercase tracking-widest truncate max-w-[120px] md:max-w-none">Wyoming DAOLLC.ai Foundation</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[8px] md:text-[9px] text-white/30 uppercase font-mono">Inventory</span>
                        <span className="text-[10px] md:text-xs font-bold text-blue-400">10 Assets</span>
                    </div>
                    <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] md:text-[9px] text-white/30 uppercase font-mono">Status</span>
                        <span className="text-[10px] md:text-xs font-bold text-emerald-400 uppercase">Live</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Domain Navigation */}
                <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex md:flex-col gap-2 scrollbar-none">
                    <div className="hidden md:block text-[9px] text-white/20 uppercase tracking-[4px] font-bold mb-4 px-2">Asset Portfolio</div>
                    {DOMAINS.map((domain) => (
                        <button
                            key={domain.id}
                            onClick={() => setSelected(domain)}
                            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl transition-all group ${
                                selected.id === domain.id 
                                ? 'bg-white/10 border border-white/20 shadow-lg' 
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <div className={`p-1.5 md:p-2 rounded-lg bg-black/40 border border-white/5 ${domain.color}`}>
                                <domain.icon size={14} className="md:hidden" />
                                <domain.icon size={16} className="hidden md:block" />
                            </div>
                            <div className="text-left">
                                <div className={`text-[9px] md:text-[10px] font-bold tracking-wider ${selected.id === domain.id ? 'text-white' : 'text-white/60'}`}>
                                    {domain.label.split('.')[0]}
                                </div>
                                <div className="hidden md:block text-[8px] text-white/30 font-mono uppercase">{domain.category}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Asset Detail & UX Journey */}
                <div className="flex-1 bg-[#080808] p-6 md:p-10 flex flex-col relative overflow-hidden">
                    {/* Background Fractal Grid */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="relative z-10 flex-1 flex flex-col"
                        >
                            <div className="flex flex-col md:flex-row items-start justify-between mb-6 md:mb-12 gap-4">
                                <div className="space-y-2 md:space-y-4">
                                    <div className={`inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-full bg-white/5 border border-white/10 ${selected.color}`}>
                                        <selected.icon size={12} />
                                        <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">{selected.category}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">{selected.label}</h2>
                                    <p className="text-sm md:text-lg text-white/60 font-light max-w-md">{selected.description}</p>
                                </div>
                                <div className="text-left md:text-right space-y-1">
                                    <div className="text-[8px] md:text-[10px] text-white/20 uppercase font-mono tracking-widest">Asset ID</div>
                                    <div className="text-[10px] md:text-xs font-mono text-white/40 truncate">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                                {[
                                    { label: 'Market', value: 'Global', icon: Globe },
                                    { label: 'Inference', value: 'Fractal', icon: Brain },
                                    { label: 'Ownership', value: 'DAO', icon: Shield }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                                        <stat.icon size={18} className="text-white/40" />
                                        <div>
                                            <div className="text-[8px] md:text-[10px] text-white/30 uppercase font-mono">{stat.label}</div>
                                            <div className="text-lg md:text-xl font-bold text-white">{stat.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1 flex flex-col justify-end">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <button className="flex-1 bg-white text-black py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] uppercase hover:bg-blue-400 transition-colors">
                                        Deploy Asset
                                    </button>
                                    <button className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/20 rounded-lg md:rounded-xl text-white hover:bg-white/10 transition-colors">
                                        <Zap size={20} className="md:hidden" />
                                        <Zap size={24} className="hidden md:block" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer: Global Store Status */}
            <div className="h-8 md:h-10 border-t border-white/10 bg-black/60 flex items-center px-4 md:px-6 justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-[7px] md:text-[9px] text-white/20 font-mono uppercase tracking-widest truncate max-w-[100px] md:max-w-none">Wyoming DAOLLC.ai</span>
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-[7px] md:text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    <span className="hidden sm:inline">Molt Context: v2.5</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Neuromitosis: Active</span>
                </div>
            </div>
        </div>
    );
};
